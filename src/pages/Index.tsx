import AccordionList from "@/components/AccordionList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Motion Accordion
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Smooth spring animations with a subtle bounce
      </p>
      <AccordionList />
    </div>
  );
};

export default Index;
