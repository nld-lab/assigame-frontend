import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { OriginButton } from "@/components/ui/origin-button";
import { Button } from "@/components/ui/button";

function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Vaplénou", "Nassanou", "eeh Loméyaa!!", "gbimgbance!!"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 lg:pt-16 pb-6 lg:pb-10 items-center">

          <div className="flex flex-col items-start text-left gap-6 lg:max-w-xl">
            <div className="flex gap-4 flex-col w-full">
              <h1 className="text-5xl md:text-7xl tracking-tighter font-regular flex flex-col items-start">
                <span className="text-spektr-cyan-50">Avec Assigame</span>
                <span className="relative flex w-full justify-start overflow-hidden text-left md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold left-0"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                            y: 0,
                            opacity: 1,
                          }
                          : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground">
                La plateforme de référence pour acheter, vendre ou échanger vos articles en toute simplicité au Togo. Connectez-vous directement avec d'autres acheteurs et vendeurs de votre région pour faire de bonnes affaires.
              </p>
            </div>

            <div className="flex flex-row gap-3 mt-4 relative z-20">
              <Button className="h-12 px-8 rounded-xl font-medium text-[15px] tracking-[-0.02em] gap-4" variant="outline">
                Vendre
              </Button>
              <OriginButton>
                Acheter <MoveRight className="w-4 h-4" />
              </OriginButton>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end relative z-20">
            <div className="relative flex items-center justify-center">
              <img
                src="/togo.png"
                alt="Togo Background"
                className="absolute w-[300%] h-[300%] max-w-none object-contain opacity-20 pointer-events-none z-0"
              />
              <img
                src="/landing.png"
                alt="Assigame Hero"
                className="relative w-full max-w-[530px] object-contain rounded-2xl drop-shadow-xl z-20"
              />
            </div>
          </div>

        </div>
      </div>
      <div
        className="w-full relative z-30 h-36 md:h-56 -mt-20 md:-mt-32"
        style={{
          backgroundImage: 'url("/bandeau_horizontal.png")',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}

export default HeroSection;
