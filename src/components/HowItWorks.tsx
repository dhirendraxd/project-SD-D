import { Search, CalendarCheck, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse restaurants by location, cuisine, and ratings to find your perfect dining spot.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve",
    description: "Pick your table, choose your time slot, and optionally pre-order your favorite dishes.",
  },
  {
    icon: UtensilsCrossed,
    title: "Enjoy",
    description: "Arrive and enjoy a seamless dining experience with everything prepared for you.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="section-padding text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
          Three easy steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
