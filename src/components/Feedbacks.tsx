import React from "react";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../motion";
import { testimonials } from "../constants";
import type { Testimonial } from "../constants";

const FeedbackCard: React.FC<{
  index: number;
  testimonial: Testimonial;
}> = ({ index, testimonial }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="bg-black-200 p-10 rounded-3xl w-full xs:w-[320px]"
    >
      <p className="text-white font-black text-[48px]">"</p>
      <div className="mt-1">
        <p>{testimonial.testimonial}</p>
        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[16px]">
              <span className="blue-text-gradient">@</span> {testimonial.name}
            </p>
            <p className="mt-1 text-secondary text-[12px]">
              {testimonial.designation} of {testimonial.company}
            </p>
          </div>
          <img
            src={testimonial.image}
            alt={`feedback-by-${testimonial.name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};
const Feedbacks: React.FC = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div
        className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials</h2>
        </motion.div>
      </div>
      <div className={`${styles.padding} -mt-20 pb-14 flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

const FeedbackSection = SectionWrapper(Feedbacks, "");
export default FeedbackSection;
