"use client";
import { motion } from "framer-motion";
import { Baby, Cloud, Star } from "lucide-react";

const FAQHeader = () => {
  return (
    <>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -top-10 left-10"
      >
        <Cloud className="w-16 h-16 text-sky-300" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        className="absolute -top-5 right-10"
      >
        <Star className="w-12 h-12 text-yellow-300" />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Baby className="w-20 h-20 text-rose-400" />
      </motion.div>
    </>
  );
};

export default FAQHeader;
