/**
 * Optimized Particle Entity - manages individual particle lifecycle
 */

export interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 1; // Speed: 0.5px/frame max
    this.vy = (Math.random() - 0.5) * 1;
    this.size = Math.random() * 2 + 2; // Size: 2-4px
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    // Wall collision with bounce
    if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, color: string): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

/**
 * Optimized Particle Engine - manages system-wide animation
 */
export class ParticleEngine {
  private particles: Particle[];
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private hasMouseInteraction: boolean = false;
  private readonly particleCount: number;
  private readonly connectionDistance: number = 150;
  private readonly particleColor: string = 'oklch(0.4386 0 0 / 0.25)'; // muted foreground with opacity
  private readonly lineColor: string = 'oklch(0.4386 0 0 / 0.12)';

  constructor(canvas: HTMLCanvasElement, particleCount: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.particleCount = particleCount;
    this.particles = [];
    this.resize();
    this.initParticles();
    this.setupEventListeners();
  }

  private initParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  private setupEventListeners(): void {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.hasMouseInteraction = true;
    };

    const handleMouseLeave = () => {
      this.hasMouseInteraction = false;
    };

    this.canvas.addEventListener('mousemove', handleMouseMove);
    this.canvas.addEventListener('mouseleave', handleMouseLeave);
  }

  resize(): void {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.offsetWidth;
      this.canvas.height = parent.offsetHeight;
    }
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = 1 - distance / this.connectionDistance;
          this.ctx.strokeStyle = `oklch(0.4386 0 0 / ${opacity * 0.12})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private applyMouseParallax(particle: Particle): void {
    if (!this.hasMouseInteraction) return;

    const dx = particle.x - this.mouseX;
    const dy = particle.y - this.mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      particle.x += dx * force * 0.02;
      particle.y += dy * force * 0.02;
    }
  }

  animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      this.applyMouseParallax(particle);
      particle.update();
      particle.draw(this.ctx, this.particleColor);
    });

    // Draw connections
    this.drawConnections();

    this.animationId = requestAnimationFrame(this.animate);
  }

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
