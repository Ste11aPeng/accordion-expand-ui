import AccordionList from "@/components/AccordionList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Laws of UX
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Fundamental principles that shape user experience design
      </p>
      <AccordionList />
      <div className="fixed bottom-4 left-4 text-xs text-muted-foreground">
        Designed by{" "}
        <a
          href="https://ruocanpeng.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          Stella P
        </a>
      </div>
    </div>
  );
};

export default Index;
