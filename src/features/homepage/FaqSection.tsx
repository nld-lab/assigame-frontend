import { motion } from "motion/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeUp, viewportOnce } from "@/lib/motion";

const FAQ_ITEMS = [
    {
        question: "Dois-je créer un compte pour acheter un produit ?",
        answer: "Non. Le catalogue est entièrement public : vous pouvez parcourir les annonces, consulter les fiches produits et contacter le vendeur sans aucune inscription.",
    },
    {
        question: "Comment contacter un vendeur ?",
        answer: "Sur chaque fiche produit, deux boutons vous permettent de joindre directement le vendeur par WhatsApp ou par email. Le message est pré-rempli avec le nom du produit pour faciliter la prise de contact.",
    },
    {
        question: "Comment publier un produit à vendre ?",
        answer: "Créez un compte vendeur gratuitement, connectez-vous à votre tableau de bord, puis cliquez sur « Publier un produit ». Renseignez le nom, la catégorie, le prix, une description et une photo : votre annonce est mise en ligne immédiatement.",
    },
    {
        question: "La publication d'annonces est-elle payante ?",
        answer: "Non, la publication est 100 % gratuite et sans commission. Assigame met simplement en relation acheteurs et vendeurs ; aucune transaction financière ne transite par la plateforme.",
    },
    {
        question: "Comment rechercher un produit précis ?",
        answer: "Utilisez la barre de recherche ou filtrez par catégorie depuis la page « Produits ». Vous pouvez combiner une recherche par mot-clé et un filtre de catégorie pour affiner les résultats.",
    },
    {
        question: "Puis-je modifier ou supprimer une annonce déjà publiée ?",
        answer: "Oui. Depuis votre tableau de bord vendeur, la section « Mes produits » vous permet à tout moment de modifier les informations, changer l'image ou supprimer une annonce.",
    },
    {
        question: "Comment se déroule le paiement et la livraison ?",
        answer: "Le paiement et la remise du produit se font directement entre l'acheteur et le vendeur, hors plateforme. Nous vous recommandons de privilégier une rencontre dans un lieu public et de vérifier le produit avant tout paiement.",
    },
];

export default function FaqSection() {
    return (
        <section className="w-full px-4 pb-20">
            <div className="mx-auto max-w-3xl">
                <motion.div
                    className="mb-10 flex flex-col items-center gap-3 text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Questions fréquentes
                    </h2>
                    <p className="max-w-md text-sm text-muted-foreground">
                        Tout ce qu'il faut savoir pour acheter et vendre
                        sereinement sur Assigame.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                >
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="faq-0"
                        className="rounded-2xl border bg-card px-5 shadow-sm sm:px-6"
                    >
                        {FAQ_ITEMS.map((item, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                                <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
