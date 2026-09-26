// import React from "react";
// import TextType from "../../../assets/TextType";

// export const Hero = () => {
//   return (
//     <section className="min-h-screen flex items-center justify-center">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p className="text-5xl md:text-9xl font-bold mb-4">
//           &lt;CODESHACK/&gt;
//         </p>
//         <TextType
//           text={["Text typing effect", "for your websites", "Happy coding!"]}
//           typingSpeed={75}
//           pauseDuration={5500}
//           showCursor={true}
//           cursorCharacter="_"
//         />
//       </div>
//     </section>
//   );
// };

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TextType from "../../../assets/TextType";
import collegeLogo from "../../../assets/collegeLogo.png";

export const Hero = () => {
  return (
    <section
      className="
  relative
  min-h-[85vh] sm:min-h-screen
  flex items-start sm:items-center
  justify-center
  pt-20 sm:pt-0
"
    >
      {/* Bottom orange glow */}
      <div
        className="
  absolute
  bottom-[-120px] sm:bottom-[-200px]
  left-1/2 -translate-x-1/2
  w-[700px] sm:w-[1200px]
  h-[250px] sm:h-[400px]
  bg-orange-500/40
  blur-[120px] sm:blur-[150px]
  rounded-full
"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* College Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-4 sm:mb-8 mt-0 sm:mt-2"
        >
          <img
            src={collegeLogo}
            alt="College Logo"
            className="h-10 sm:h-14 md:h-16 mb-2 sm:mb-3 mx-auto"
          />

          <p className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-gray-400 text-center">
            Sir M. Visvesvaraya Institute of Technology, Bengaluru
          </p>
        </motion.div>

        {/* Hiring banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/40 text-orange-400 hover:bg-orange-500/20 rounded-full px-4 py-1.5 text-sm font-medium transition"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            CodeShack is hiring — come be a part of it!
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 sm:mb-6 inline-flex items-center justify-center bg-black/60 border border-orange-500/30 rounded-md px-3 sm:px-4 py-2 font-mono text-xs sm:text-sm text-orange-400"
        >
          <span className="text-green-400">student@codeshack</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>${" "}
          <span className="animate-pulse">_</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-6xl md:text-7xl font-extrabold mb-4 sm:mb-6"
        >
          &lt;<span className="text-orange-500">CODESHACK</span>/&gt;
        </motion.h1>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-base sm:text-xl md:text-2xl text-gray-300 mb-5 sm:mb-8"
        >
          <TextType
            text={[
              "Official Technical Club",
              "Open Source • Development • Innovation",
              "GLUG × TECHHUB",
            ]}
            typingSpeed={70}
            pauseDuration={2600}
            showCursor={true}
            cursorCharacter="_"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed text-center"
        >
          CODESHACK is the official student technical community fostering
          open-source culture, hands-on development, and problem-solving skills.
          We bridge academic learning with real-world technology through
          workshops, projects, and collaborative events.
        </motion.p>

        {/* SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="flex items-center justify-center mx-auto mt-2 sm:mt-6"
        >
          <svg
            width="320"
            height="120"
            viewBox="0 0 320 120"
            fill="none"
            className="mx-auto"
          >
            <rect
              x="20"
              y="10"
              width="280"
              height="100"
              rx="14"
              fill="#111"
              stroke="#f97316"
              strokeWidth="2"
            />
            <text
              x="40"
              y="50"
              fill="#f97316"
              fontFamily="monospace"
              fontSize="14"
            >
              $ learn • build • contribute
            </text>
            <text
              x="40"
              y="75"
              fill="#aaa"
              fontFamily="monospace"
              fontSize="12"
            >
              linux | open-source | community
            </text>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
