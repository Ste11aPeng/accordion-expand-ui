import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Palette, Zap, Eye } from "lucide-react";

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: "mission",
    icon: <Heart className="w-5 h-5 text-muted-foreground" />,
    title: "What is LoveUX?",
    description:
      "LoveUX is a design philosophy that puts empathy at the core of every interaction, crafting digital experiences people genuinely enjoy using.",
  },
  {
    id: "emotion",
    icon: <Sparkles className="w-5 h-5 text-muted-foreground" />,
    title: "Emotional Design",
    description:
      "We believe great UX goes beyond usability — it sparks delight, builds trust, and creates meaningful emotional connections with users.",
  },
  {
    id: "system",
    icon: <Palette className="w-5 h-5 text-muted-foreground" />,
    title: "Design Systems",
    description:
      "Scalable, consistent, and beautiful. Our design systems ensure every component speaks the same visual language across your product.",
  },
  {
    id: "micro",
    icon: <Zap className="w-5 h-5 text-muted-foreground" />,
    title: "Micro-interactions",
    description:
      "The tiny moments that make a product feel alive — hover states, transitions, loading animations, and feedback loops that users love.",
  },
  {
    id: "research",
    icon: <Eye className="w-5 h-5 text-muted-foreground" />,
    title: "User Research",
    description:
      "Data-driven empathy. We combine qualitative interviews with quantitative analytics to uncover what users truly need.",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 10,
  mass: 0.8,
};

const textSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 12,
  mass: 0.6,
};

export default function AccordionList() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* SVG gooey filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        className="flex flex-col gap-[3px]"
        style={{ filter: "url(#gooey)" }}
      >
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              transition={spring}
              className="rounded-2xl bg-card overflow-hidden"
              style={{ isolation: "isolate" }}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-[15px] font-semibold text-foreground tracking-tight">
                  {item.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={spring}
                  className="flex-shrink-0 text-muted-foreground"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -4, opacity: 0, filter: "blur(4px)" }}
                      transition={{ ...textSpring, delay: 0.05 }}
                      className="px-5 pb-4 pt-0 text-[14px] leading-relaxed text-muted-foreground"
                    >
                      {item.description.split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            ...textSpring,
                            delay: 0.04 + i * 0.018,
                          }}
                          className="inline-block mr-[0.25em]"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
