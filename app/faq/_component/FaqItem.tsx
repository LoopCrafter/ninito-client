"use client";
import { motion } from "framer-motion";
import { Cloud, Star, Baby } from "lucide-react";
import { useState } from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-md py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-lg  text-sky-600 dark:text-sky-300 flex justify-between items-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Star className="w-6 h-6 text-rose-400" />
        </motion.div>
      </motion.button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="mt-2 text-base  text-gray-600 dark:text-gray-300 py-4">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FAQItem;
