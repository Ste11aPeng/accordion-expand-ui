import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, LayoutGrid, MousePointer, ScanEye, Scaling } from "lucide-react";

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: "fitts",
    icon: <MousePointer className="w-5 h-5 text-muted-foreground" />,
    title: "Fitts's Law",
    description:
      "The time to acquire a target is a function of the distance to and size of the target. Make interactive elements large and place them in easily accessible areas.",
  },
  {
    id: "hick",
    icon: <Timer className="w-5 h-5 text-muted-foreground" />,
    title: "Hick's Law",
    description:
      "The time it takes to make a decision increases with the number and complexity of choices. Simplify choices to reduce cognitive load.",
  },
  {
    id: "miller",
    icon: <LayoutGrid className="w-5 h-5 text-muted-foreground" />,
    title: "Miller's Law",
    description:
      "The average person can only keep about 7 (±2) items in their working memory. Chunk information into manageable groups.",
  },
  {
    id: "gestalt",
    icon: <ScanEye className="w-5 h-5 text-muted-foreground" />,
    title: "Law of Proximity",
    description:
      "Objects that are near each other tend to be grouped together. Use spatial relationships to indicate related content and hierarchy.",
  },
  {
    id: "aesthetic",
    icon: <Scaling className="w-5 h-5 text-muted-foreground" />,
    title: "Aesthetic-Usability Effect",
    description:
      "Users often perceive aesthetically pleasing designs as more usable. Good visual design creates a positive response and increases tolerance for minor issues.",
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
  );
}
