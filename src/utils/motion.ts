interface Transition {
    type: string;
    duration: number;
    delay?: number;
    damping?: number;
    stiffness?: number;
    restDelta?: number;
    delayChildren?: number;
}

export const transition: Transition = { type: "spring", duration: 0.8 };

interface Animation {
    initial: {
        x?: number;
        y?: number;
        opacity?: number;
        transition?: Transition;
    };
    animate: {
        x?: number;
        y?: number;
        opacity?: number;
        transition?: Transition;
    };
    exit?: {
        x?: number;
        y?: number;
        opacity?: number;
        transition: Transition;
    };
    transition?: Transition;
}
export const slideAnimation = (direction: string): Animation => {
    return {
        initial: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
            transition: { ...transition, delay: 0.5 },
        },
        animate: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { ...transition, delay: 0 },
        },
        exit: {
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            transition: { ...transition, delay: 0 },
        },
    };
};

export const fadeAnimation: Animation = {
    initial: {
        opacity: 0,
        transition: { ...transition, delay: 0.5 },
    },
    animate: {
        opacity: 1,
        transition: { ...transition, delay: 0 },
    },
    exit: {
        opacity: 0,
        transition: { ...transition, delay: 0 },
    },
};

export const headTextAnimation: Animation = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: {
        type: "spring",
        damping: 5,
        stiffness: 40,
        restDelta: 0.001,
        duration: 0.3,
    },
};

export const headContentAnimation: Animation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
        type: "spring",
        damping: 7,
        stiffness: 30,
        restDelta: 0.001,
        duration: 0.6,
        delay: 0.2,
        delayChildren: 0.2,
    },
};

export const headContainerAnimation: Animation = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};