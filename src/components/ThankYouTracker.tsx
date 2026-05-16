import { useEffect } from "react";
import { track } from "@vercel/analytics";

const ThankYouTracker = () => {
  useEffect(() => {
    track("SEO Audit Thank You Viewed");
  }, []);

  return null;
};

export default ThankYouTracker;
