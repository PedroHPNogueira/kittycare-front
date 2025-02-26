import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
}

interface DescriptionCarouselProps {
  currentIndex: number;
  items: CarouselItem[];
}

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = ({
  currentIndex,
  items,
}) => {
  return (
    <div className="relative mb-6 flex h-[170px] flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-black md:text-3xl">
            {items[currentIndex].title}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-darkGray">
            {items[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DescriptionCarousel;
