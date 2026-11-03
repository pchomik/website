/**
 * Project engine: each cluster is a repository growing a tree of modules and leaves.
 * Leaves get added and pruned, modules switch language colors, projects retire and respawn.
 */

type RGB = [number, number, number];

const LANGUAGES: RGB[] = [
  [59, 130, 246], // blue
  [168, 85, 247], // violet
  [34, 211, 238], // cyan
  [34, 245, 160], // green
  [255, 92, 122], // coral
  [245, 158, 11], // amber
];
const ROOT_COLOR: RGB = [229, 231, 235];
const MAX_DEPTH = 12;
const BASE_CHANCE = 0.1; // grow and prune chance at max size
const SIZE_SWING = 0.5; // extra grow chance when empty, extra prune chance when over max
const LANG_CHANCE = 0.006;
const RETIRE_CHANCE = 0.003;
const COLOR_EASE = 0.03;
const FADE = 0.015;
const LINK_ALPHA = 0.15;
const EDGE_GAP = 14; // extra length added to every edge, spreads branches apart
const EDGE_MARGIN = 60;
const MAX_PACKETS = 30;
const USER_SPEED = 1.2;
const USER_HOPS = 4;

const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];
const rand = (min: number, max: number): number => min + Math.random() * (max - min);
const rgba = (c: RGB, alpha: number): string => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;

interface TreeNode {
  parent: TreeNode | null;
  depth: number;
  angle: number; // direction from parent
  len: number;
  x: number;
  y: number;
  rgb: RGB; // drawn color, eases toward target
  target: RGB;
  alpha: number;
  dying: boolean;
  pulse: number;
}

interface Project {
  nodes: TreeNode[]; // nodes[0] is the root; parents always precede children
  max: number;
}

interface Packet {
  node: TreeNode; // edge from node to its parent
  up: boolean; // true: node to parent, false: parent to node
  progress: number;
  speed: number;
}

interface Point {
  x: number;
  y: number;
}

interface User {
  x: number;
  y: number;
  target: TreeNode | null;
  exit: Point | null;
  hops: number;
}

const radius = (n: TreeNode): number => (n.parent ? Math.max(1.6, 3 - n.depth * 0.3) : 4);

export class ParticleEngine {
  private projects: Project[] = [];
  private packets: Packet[] = [];
  private users: User[] = [];
  private readonly projectCount: number;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement, nodeCount: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.projectCount = Math.max(4, Math.round(nodeCount / 12));
    this.resize();
  }

  resize(): void {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = parent.offsetWidth;
    this.height = parent.offsetHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.projects = [];
    for (let i = 0; i < this.projectCount; i++) this.projects.push(this.spawnProject());
    this.packets = [];
    this.users = [];
  }

  private newNode(parent: TreeNode | null, angle: number, len: number, target: RGB): TreeNode {
    return {
      parent,
      depth: parent ? parent.depth + 1 : 0,
      angle,
      len,
      x: 0,
      y: 0,
      rgb: [...target],
      target,
      alpha: 0,
      dying: false,
      pulse: 0,
    };
  }

  // best-candidate sampling: pick the spot farthest from existing roots so repos spread out
  private placeRoot(): Point {
    let best: Point = {x: 0, y: 0};
    let bestDistance = -1;
    for (let i = 0; i < 12; i++) {
      const candidate = {
        x: rand(EDGE_MARGIN, this.width - EDGE_MARGIN),
        y: rand(EDGE_MARGIN, this.height - EDGE_MARGIN),
      };
      const distance = Math.min(
        ...this.projects.map((p) => Math.hypot(p.nodes[0].x - candidate.x, p.nodes[0].y - candidate.y)),
      );
      if (distance > bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
    return best;
  }

  private spawnProject(): Project {
    const spot = this.placeRoot();
    const root = this.newNode(null, 0, 0, ROOT_COLOR);
    root.x = spot.x;
    root.y = spot.y;
    const project: Project = {
      nodes: [root],
      max: Math.round(rand(20, 50)),
    };
    for (let i = 0; i < project.max * 0.8; i++) this.grow(project);
    return project;
  }

  private grow(p: Project): void {
    const candidates = p.nodes.filter((n) => !n.dying && n.depth < MAX_DEPTH);
    if (!candidates.length) return;
    const parent = pick(candidates);
    const angle = parent.depth === 0 ? rand(0, Math.PI * 2) : parent.angle + rand(-0.7, 0.7);
    // modules pick a language, deeper leaves inherit it
    const target = parent.depth === 0 ? pick(LANGUAGES) : parent.target;
    p.nodes.push(this.newNode(parent, angle, rand(24, 42) + EDGE_GAP, target));
  }

  // mostly removes leaf files, sometimes a whole branch
  private prune(p: Project): void {
    const alive = p.nodes.filter((n) => n.parent && !n.dying);
    const leaves = alive.filter((n) => !alive.some((c) => c.parent === n));
    const pool = Math.random() < 0.2 ? alive : leaves;
    if (pool.length) pick(pool).dying = true;
  }

  private changeLanguage(p: Project): void {
    const modules = p.nodes.filter((n) => n.depth === 1 && !n.dying);
    if (modules.length) pick(modules).target = pick(LANGUAGES);
  }

  private layout(p: Project): void {
    const root = p.nodes[0];
    for (const n of p.nodes) {
      if (n.parent) {
        // parents come before children, so dying spreads down the subtree in one pass
        if (n.parent.dying) n.dying = true;
        if (n.depth > 1) n.target = n.parent.target;
        n.x = n.parent.x + Math.cos(n.angle) * n.len;
        n.y = n.parent.y + Math.sin(n.angle) * n.len;
      }
      for (let k = 0; k < 3; k++) n.rgb[k] += (n.target[k] - n.rgb[k]) * COLOR_EASE;
      n.alpha = n.dying ? Math.max(0, n.alpha - FADE) : Math.min(1, n.alpha + FADE);
      n.pulse *= 0.93;
    }
    p.nodes = p.nodes.filter((n) => n === root || !(n.dying && n.alpha <= 0));
  }

  private update(): void {
    for (const p of this.projects) {
      if (p.nodes[0].dying) continue;
      // small repos grow faster, big repos shrink faster, equal chance at max
      const fill = p.nodes.filter((n) => !n.dying).length / p.max;
      const growChance = BASE_CHANCE + SIZE_SWING * (1 - fill);
      const pruneChance = BASE_CHANCE + SIZE_SWING * (fill - 1);
      if (Math.random() < Math.max(0, growChance)) this.grow(p);
      if (Math.random() < Math.max(0, pruneChance)) this.prune(p);
      if (Math.random() < LANG_CHANCE) this.changeLanguage(p);
    }

    const live = this.projects.filter((p) => !p.nodes[0].dying);
    if (live.length > 1 && Math.random() < RETIRE_CHANCE) pick(live).nodes[0].dying = true;

    for (const p of this.projects) this.layout(p);
    this.projects = this.projects.filter((p) => !(p.nodes[0].dying && p.nodes.length === 1));
    while (this.projects.filter((p) => !p.nodes[0].dying).length < this.projectCount) {
      this.projects.push(this.spawnProject());
    }

    this.updatePackets();
    this.updateUsers();
  }

  private updatePackets(): void {
    const edges = this.projects.flatMap((p) => p.nodes.filter((n) => n.parent));
    if (this.packets.length < MAX_PACKETS && edges.length && Math.random() < 0.15) {
      this.packets.push({node: pick(edges), up: Math.random() < 0.5, progress: 0, speed: rand(0.02, 0.04)});
    }
    this.packets = this.packets.filter((k) => {
      if (k.node.dying) return false;
      k.progress += k.speed;
      if (k.progress < 1) return true;
      (k.up ? k.node.parent! : k.node).pulse = 1;
      return false;
    });
  }

  private edgePoint(): Point {
    return pick([
      {x: rand(0, this.width), y: -10},
      {x: rand(0, this.width), y: this.height + 10},
      {x: -10, y: rand(0, this.height)},
      {x: this.width + 10, y: rand(0, this.height)},
    ]);
  }

  // users (white dots) visit a few random nodes, then leave by the edge
  private updateUsers(): void {
    const nodes = this.projects.flatMap((p) => p.nodes.filter((n) => !n.dying));
    if (nodes.length && this.users.length < this.projectCount * 2 && Math.random() < 0.05) {
      const {x, y} = this.edgePoint();
      this.users.push({x, y, target: pick(nodes), exit: null, hops: 0});
    }

    this.users = this.users.filter((u) => {
      if (u.target?.dying) u.target = null;
      if (!u.target && !u.exit) u.exit = this.edgePoint();
      const goal = u.target ?? u.exit!;
      const dx = goal.x - u.x;
      const dy = goal.y - u.y;
      const d = Math.hypot(dx, dy);
      if (d > USER_SPEED) {
        u.x += (dx / d) * USER_SPEED;
        u.y += (dy / d) * USER_SPEED;
        return true;
      }
      if (!u.target) return false; // reached the edge
      u.target.pulse = 1;
      u.hops++;
      if (u.hops < USER_HOPS) {
        u.target = pick(nodes);
      } else {
        u.target = null;
        u.exit = this.edgePoint();
      }
      return true;
    });
  }

  private drawUsers(): void {
    const {ctx} = this;
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#ffffff';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (const u of this.users) {
      ctx.beginPath();
      ctx.arc(u.x, u.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  private draw(): void {
    const {ctx} = this;
    ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.projects) {
      for (const n of p.nodes) {
        if (!n.parent) continue;
        const a = Math.min(n.alpha, n.parent.alpha) * LINK_ALPHA;
        if (a <= 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(n.parent.x, n.parent.y);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = rgba(n.rgb, a);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    for (const p of this.projects) {
      for (const n of p.nodes) {
        if (n.alpha <= 0.01) continue;
        const r = radius(n);
        if (n.pulse > 0.01) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + (1 - n.pulse) * 14, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(n.rgb, n.pulse * 0.8 * n.alpha);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.shadowBlur = 10;
        ctx.shadowColor = rgba(n.rgb, n.alpha);
        ctx.fillStyle = rgba(n.rgb, n.alpha);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (const k of this.packets) {
      const child = k.node;
      const parent = child.parent!;
      const [a, b] = k.up ? [child, parent] : [parent, child];
      const x = a.x + (b.x - a.x) * k.progress;
      const y = a.y + (b.y - a.y) * k.progress;
      ctx.shadowBlur = 14;
      ctx.shadowColor = rgba(child.rgb, 1);
      ctx.fillStyle = rgba(child.rgb, 1);
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  animate = (): void => {
    this.update();
    this.draw();
    this.drawUsers();
    this.animationId = requestAnimationFrame(this.animate);
  };

  start(): void {
    if (this.animationId === null) {
      this.animate();
    }
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
