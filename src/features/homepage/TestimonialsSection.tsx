"use client";
import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "J'ai vendu ma PS5 en moins de 24 heures ! Le contact direct par WhatsApp simplifie énormément les échanges et les négociations.",
    name: "Marc L.",
    role: "Vendeur de consoles",
    image: "/7.jpg",
  },
  {
    text: "J'ai enfin trouvé une Nintendo Switch d'occasion à un super prix près de chez moi. Le site est ultra fluide et très agréable à utiliser.",
    name: "Sarah M.",
    role: "Acheteuse & Joueuse",
    image: "/8.jpg",
  },
  {
    text: "En tant que vendeur de jeux rétro, Assigame est devenu mon outil de prédilection. La publication d'annonces est gratuite et instantanée.",
    name: "David K.",
    role: "Boutique Rétrogaming",
    image: "/9.jpg",
  },
  {
    text: "Une communauté géniale pour dénicher des perles rares. J'ai pu compléter ma collection de jeux Zelda facilement.",
    name: "Alexandre P.",
    role: "Collectionneur",
    image: "/10.jpg",
  },
  {
    text: "Le design sombre et moderne est incroyable. La publication de produits est tellement intuitive par rapport à d'autres plateformes.",
    name: "Émilie R.",
    role: "Joueuse occasionnelle",
    image: "/8.jpg",
  },
  {
    text: "Idéal pour vider ses placards de vieux jeux. J'ai vendu mes jeux PS4 en quelques clics sans aucune commission.",
    name: "Thomas B.",
    role: "Vendeur occasionnel",
    image: "/7.jpg",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-3xl border bg-card/50 backdrop-blur-xs text-card-foreground shadow-md max-w-xs w-full hover:border-primary/50 transition-colors" 
                  key={i}
                >
                  <div className="text-[14px] leading-relaxed text-muted-foreground">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                  
                      src={image}
                      alt={name}
                      className="h-10 w-10 object-cover rounded-full bg-muted border"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm tracking-tight leading-none">{name}</div>
                      <div className="text-[12px] opacity-60 tracking-tight mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function TestimonialsSection() {
  const col1 = testimonials.slice(0, 2);
  const col2 = testimonials.slice(2, 4);
  const col3 = testimonials.slice(4, 6);

  return (
    <section className="w-full py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Ce que dit notre communauté
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Découvrez les retours d'expérience des joueurs et vendeurs qui font vivre Assigame au quotidien.
          </p>
        </div>

        {/* 3 Columns scrolling layout */}
        <div className="relative flex justify-center gap-6 h-[500px] overflow-hidden w-full max-w-5xl mx-auto rounded-3xl">
          {/* Fading overlay at top and bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

          <TestimonialsColumn 
            testimonials={col1} 
            duration={15} 
            className="flex flex-col w-full max-w-xs" 
          />
          <TestimonialsColumn 
            testimonials={col2} 
            duration={19} 
            className="hidden sm:flex flex-col w-full max-w-xs" 
          />
          <TestimonialsColumn 
            testimonials={col3} 
            duration={12} 
            className="hidden md:flex flex-col w-full max-w-xs" 
          />
        </div>
      </div>
    </section>
  );
}
