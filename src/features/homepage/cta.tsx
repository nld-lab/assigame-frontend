import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { fadeRight, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const CTA = () => {
  return (
    <div className="px-0 py-16 sm:px-6">
      <motion.div
        className="mx-auto max-w-6xl border-y bg-muted/50 p-1 sm:rounded-xl sm:border-x"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <div className="sm:shadow/5 relative flex flex-col justify-between gap-10 overflow-hidden border bg-background px-10 sm:rounded-lg md:flex-row md:gap-8">
          {/* Circuit Board - Light Pattern */}
          <div
            className="max-sm:mask-b-from-75% pointer-events-none absolute inset-0 -top-0.5 -left-1 z-0 not-dark:opacity-60"
            style={{
              backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
              backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
            }}
          />

          <motion.div
            className="relative isolate pt-12 pb-0 md:pb-12"
            variants={fadeUp}
          >
            <h2 className="font-medium text-4xl tracking-[-0.04em] lg:text-5xl/[1.2]">
              Alors, tu attends quoi pour vendre tes produits ?
            </h2>
            <p className="mt-2 text-muted-foreground text-sm tracking-[-0.015em] sm:mt-4 max-w-md">
              Publiez vos produits gratuitement et laissez les acheteurs intéressés vous contacter directement par WhatsApp ou email.
            </p>
            <Link to="/register">
              <Button className="mt-5 sm:mt-10" size="lg">
                Créer un compte <ArrowUpRight />
              </Button>
            </Link>
          </motion.div>
          <motion.img
            alt="Mobile view"
            className="mask-b-from-75% relative isolate mt-auto md:h-75 w-full max-w-xs  md:w-auto md:max-w-none"
            src="/mobile-view.png"
            variants={fadeRight}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;
