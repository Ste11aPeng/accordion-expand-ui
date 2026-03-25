import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Layers, Hand, Send, Radio } from "lucide-react";

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: "interaction",
    icon: <Wifi className="w-5 h-5 text-muted-foreground" />,
    title: "What is Interaction Design?",
    description:
      "Interaction design focuses on creating engaging interfaces with well-thought-out behaviors, making the experience intuitive and delightful.",
  },
  {
    id: "principles",
    icon: <Layers className="w-5 h-5 text-muted-foreground" />,
    title: "Principles & Patterns",
    description:
      "Design principles provide a foundation of best practices, while patterns offer reusable solutions to common interaction challenges.",
  },
  {
    id: "accessibility",
    icon: <Hand className="w-5 h-5 text-muted-foreground" />,
    title: "Usability & Accessibility",
    description:
      "Focusing on making digital designs easy to use and accessible for everyone, including those with disabilities.",
  },
  {
    id: "prototyping",
    icon: <Send className="w-5 h-5 text-muted-foreground" />,
    title: "Prototyping & Testing",
    description:
      "Building interactive prototypes to validate ideas early, gather feedback, and iterate toward a polished final product.",
  },
  {
    id: "optimisation",
    icon: <Radio className="w-5 h-5 text-muted-foreground" />,
    title: "UX Optimisation",
    description:
      "Continuously refining the user experience through data analysis, A/B testing, and user research to maximise engagement.",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
  mass: 0.8,
};

export default function AccordionList() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            layout
            transition={spring}
            className="rounded-2xl bg-card overflow-hidden shadow-sm"
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
                  <p className="px-5 pb-4 pt-0 text-[14px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
