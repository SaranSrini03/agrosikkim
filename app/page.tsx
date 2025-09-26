"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Sprout, TreePine, TrendingUp } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 left-10"
        >
          <Leaf className="w-12 h-12 text-green-600 opacity-60" />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-20 right-10"
        >
          <TreePine className="w-16 h-16 text-emerald-600 opacity-60" />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/3 right-20"
        >
          <Sprout className="w-10 h-10 text-teal-600 opacity-60" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-16 h-16 text-green-600" />
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AgroSikkim
            </h1>
          </div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed"
          >
            Transforming Agriculture in Sikkim through Technology and Innovation. 
            Join us in cultivating a sustainable future for farmers.
          </motion.p>
        </motion.div>


        {/* CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px -10px rgba(5, 150, 105, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/signin")}
          className="group relative cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Get Started
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          
          {/* Button shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: -100 }}
            whileHover={{ x: 400 }}
            transition={{ duration: 0.8 }}
          />
        </motion.button>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-sm mt-12 text-center"
        >
        </motion.p>
      </div>
    </div>
  );
}