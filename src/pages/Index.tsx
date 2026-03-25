import AccordionList from "@/components/AccordionList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 animate-gradient-move" style={{ background: 'linear-gradient(135deg, hsl(210 40% 96%), hsl(200 60% 90%), hsl(220 50% 94%), hsl(190 45% 92%)', backgroundSize: '400% 400%' }}>
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Laws of UX
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Fundamental principles that shape user experience design
      </p>
      <AccordionList />
    </div>
  );
};

export default Index;
