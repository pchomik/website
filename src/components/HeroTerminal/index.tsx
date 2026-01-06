import React, {useState, useEffect} from 'react';

/**
 * HeroTerminal - Typing effect component for authentic technical feel
 * Features:
 * - Typing animation at natural 45 WPM pace
 * - Code snippet display with syntax-like structure
 * - Blinking cursor effect
 * - Monospace font integration
 * - Auto-scroll on long lines
 */

interface HeroTerminalProps {
  code?: string;
  typingSpeed?: number;
  showLineNumbers?: boolean;
}

const DEFAULT_CODE = `class Developer:
    def __init__(self):
        self.passion = "Build the Future"
        self.mission = "One Line at a Time"
        self.stack = ["Python", "TypeScript", "Go", "Bash", "Full‑Stack"]

    def create(self, vision):
        return vision.to_reality()`;

export default function HeroTerminal({
  code = DEFAULT_CODE,
  typingSpeed = 45,
  showLineNumbers = true,
}: HeroTerminalProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const charsPerSecond = typingSpeed / 3; // Adjusted for faster typing
    const charDelay = 1000 / charsPerSecond;

    const typeNextChar = () => {
      if (index < code.length) {
        setDisplayText(code.slice(0, index + 1));
        index++;
        // Add slight random variation for natural feel
        const randomDelay = charDelay * (0.7 + Math.random() * 0.6);
        setTimeout(typeNextChar, randomDelay);
      } else {
        setIsTyping(false);
        // Restart typing after a pause
        setTimeout(() => {
          index = 0;
          setDisplayText('');
          setIsTyping(true);
          typeNextChar();
        }, 3000);
      }
    };

    // Initial delay before starting
    const initialDelay = setTimeout(typeNextChar, 500);

    return () => {
      clearTimeout(initialDelay);
    };
  }, [code, typingSpeed]);

  const lines = displayText.split('\n');

  return (
    <div
      className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 max-w-3xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="400">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-sm text-white/40 font-mono">developer.py</span>
      </div>

      {/* Terminal Content */}
      <div className="flex font-mono text-sm leading-relaxed">
        {showLineNumbers && (
          <div className="text-white/20 select-none pr-4 text-right">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <div className="flex-1 text-left">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {/* Simple syntax highlighting for Python-like code */}
              {line.split(/(class|def|self|return|import|from|passion|mission|stack|create|vision|to_reality)/).map((part, j) => {
                const isKeyword = ['class', 'def', 'return', 'import', 'from'].includes(part);
                const isSelf = part === 'self';
                const isString = part.startsWith('"') || part.startsWith("'");

                let className = 'text-white/90';
                if (isKeyword) className = 'text-purple-400';
                else if (isSelf) className = 'text-blue-400';
                else if (isString) className = 'text-green-400';

                return (
                  <span key={j} className={className}>
                    {part}
                  </span>
                );
              })}
              {/* Blinking cursor on last line */}
              {i === lines.length - 1 && isTyping && (
                <span
                  className="inline-block w-2 h-4 bg-white/80 ml-1 animate-pulse"
                  style={{animationDuration: '1s'}}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
