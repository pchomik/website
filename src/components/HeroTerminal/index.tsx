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

const DEFAULT_CODE = `class Feature:
    def __init__(self):
        self.idea = "Your next big thing"
        self.status = "Shipped before coffee gets cold"

    def build(self, requirements):
        return requirements.to_reality()

    def test(self):
        assert self.idea, "No idea, no test"
        return True

    def deploy(self):
        if self.test():
            return "Shipped to production"
        raise RuntimeError("Fix first")

    def fix(self):
        raise NotImplementedError`;

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

  // Full code sets the final height from the start; untyped text stays invisible.
  const typedLines = displayText.split('\n');
  const lines = code.split('\n');

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
        <span className="ml-2 text-sm text-white/40 font-mono">feature.py</span>
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
          {lines.map((line, i) => {
            const typed = typedLines[i] ?? '';
            return (
            <div key={i} className="whitespace-pre-wrap break-words">
              {/* Simple syntax highlighting for Python-like code */}
              {typed.split(/(class|def|self|return|raise|import|from|passion|mission|stack|create|vision|to_reality)/).map((part, j) => {
                const isKeyword = ['class', 'def', 'return', 'raise', 'import', 'from'].includes(part);
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
              {/* Blinking cursor on last typed line */}
              {i === typedLines.length - 1 && isTyping && (
                <span
                  className="inline-block w-2 h-4 bg-white/80 ml-1 animate-pulse"
                  style={{animationDuration: '1s'}}
                />
              )}
              <span className="invisible">{line.slice(typed.length) || '\u00a0'}</span>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
