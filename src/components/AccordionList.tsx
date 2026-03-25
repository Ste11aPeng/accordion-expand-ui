import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Target, Sparkles, Eye, Fingerprint } from "lucide-react";

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}

const items: AccordionItem[] = [
  {
    id: "hick",
    icon: <Clock className="w-5 h-5" />,
    title: "Hick's Law",
    number: "01",
    description:
      "The time it takes to make a decision increases with the number and complexity of choices available. Simplify choices to improve response time.",
  },
  {
    id: "fitts",
    icon: <Target className="w-5 h-5" />,
    title: "Fitts's Law",
    number: "02",
    description:
      "The time to acquire a target is a function of the distance to and size of the target. Make important actions large and place them close to users.",
  },
  {
    id: "miller",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Miller's Law",
    number: "03",
    description:
      "The average person can only keep about 7 (±2) items in their working memory. Chunk information into manageable groups.",
  },
  {
    id: "jacob",
    icon: <Eye className="w-5 h-5" />,
    title: "Jakob's Law",
    number: "04",
    description:
      "Users spend most of their time on other sites. They prefer your site to work the same way as all the other sites they already know.",
  },
  {
    id: "gestalt",
    icon: <Fingerprint className="w-5 h-5" />,
    title: "Law of Proximity",
    number: "05",
    description:
      "Objects that are near each other tend to be grouped together. Proximity helps create relationships between elements and organise content.",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
  mass: 0.8,
};

const textSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 12,
  mass: 0.6,
};

/* Semi-circle notch for ticket perforation */
function TicketNotches() {
  return (
    <>
      <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
      <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
    </>
  );
}

export default function AccordionList() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            layout
            transition={spring}
            className="relative bg-card rounded-lg shadow-[0_1px_4px_hsl(var(--border)/0.5)] overflow-visible"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 19px, hsl(var(--border)) 19px, hsl(var(--border)) 20px)",
              backgroundSize: "100% 20px",
              backgroundPositionY: "60px",
            }}
          >
            {/* Ticket top stub */}
            <button
              onClick={() => toggle(item.id)}
              className="relative w-full flex items-center gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring z-10"
            >
              {/* Number badge */}
              <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-dashed border-foreground/20 flex items-center justify-center text-[11px] font-mono font-bold text-muted-foreground">
                {item.number}
              </span>
              <span className="flex-1 text-[15px] font-semibold text-foreground tracking-tight font-mono uppercase">
                {item.title}
              </span>
              <span className="flex-shrink-0 text-muted-foreground">
                {item.icon}
              </span>
            </button>

            {/* Perforation line with notches */}
            <div className="relative mx-3 h-0 border-t-2 border-dashed border-foreground/10">
              <TicketNotches />
            </div>

            {/* Expandable stub */}
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
                  <motion.div
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{ ...textSpring, delay: 0.05 }}
                    className="px-5 pb-4 pt-3"
                  >
                    <p className="text-[13px] leading-relaxed text-muted-foreground font-mono">
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
                    </p>
                    {/* Barcode-style footer */}
                    <div className="mt-3 flex items-center gap-[2px] opacity-20">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-foreground"
                          style={{
                            width: i % 3 === 0 ? 3 : 1.5,
                            height: 16,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed barcode hint */}
            {!isOpen && (
              <div className="px-5 pb-3 pt-2 flex items-center gap-[2px] opacity-10">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-foreground"
                    style={{
                      width: i % 3 === 0 ? 3 : 1.5,
                      height: 12,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
