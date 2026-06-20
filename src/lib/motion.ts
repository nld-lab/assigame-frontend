import type { Variants, Transition } from "motion/react";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Apparition vers le haut (fade + slide) — pour titres, blocs de texte. */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut },
    },
};

/** Apparition simple en fondu. */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: easeOut },
    },
};

/** Apparition depuis la gauche. */
export const fadeRight: Variants = {
    hidden: { opacity: 0, x: -28 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easeOut },
    },
};

/** Conteneur qui orchestre l'apparition échelonnée de ses enfants. */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

/** Élément enfant d'un conteneur "stagger" (carte, item de grille). */
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: easeOut },
    },
};

/** Réglage commun pour déclencher l'animation au scroll. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
