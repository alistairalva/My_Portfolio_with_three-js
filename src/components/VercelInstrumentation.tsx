import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const VercelInstrumentation: React.FC = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default VercelInstrumentation;
