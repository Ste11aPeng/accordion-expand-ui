import AccordionList from "@/components/AccordionList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2 font-mono uppercase">
        Laws of UX
      </h1>
      <p className="text-muted-foreground text-sm mb-8 font-mono">
        Your ticket to better design
      </p>
      <AccordionList />
    </div>
  );
};

export default Index;
