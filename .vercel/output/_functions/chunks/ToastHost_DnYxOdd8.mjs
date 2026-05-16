import { jsx } from 'react/jsx-runtime';
import { ToastContainer } from 'react-toastify';

const resolveTransitionType = (type) => {
  return type === "" ? void 0 : type;
};
const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay
      }
    }
  };
};
const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: resolveTransitionType(type),
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};
const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: resolveTransitionType(type),
        delay,
        duration,
        ease: "easeOut"
      }
    }
  };
};
const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delayChildren || 0
      }
    }
  };
};

const ToastHost = () => {
  return /* @__PURE__ */ jsx(ToastContainer, {});
};

export { ToastHost as T, staggerContainer as a, fadeIn as f, slideIn as s, textVariant as t };
