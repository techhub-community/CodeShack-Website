import React from "react";
import glugLogo from "../../../assets/glug.png";
import techhubLogo from "../../../assets/techhub.png";
import ScrollVelocity from "../../../assets/ScrollVelocity";

export const About = () => {
  return (
    <section className="pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2
            className="text-center font-mono font-bold tracking-widest
               text-[clamp(1.6rem,4vw,3rem)] text-white mb-6"
          >
            OUR MISSION
          </h2>

          <ScrollVelocity
            texts={[
              "collaborate • build • share • contribute • innovate • learn •",
            ]}
            className="
    custom-scroll-text
    font-mono
    text-xs sm:text-sm
    text-orange-400/60
    tracking-wider
  "
          />

          <p className="text-gray-400 max-w-3xl mx-auto mt-10 leading-relaxed text-sm">
            Our mission is to create a collaborative and inclusive technical
            ecosystem where students can explore, learn, and innovate. Through
            hands-on experiences, peer learning, and real-world projects, we aim
            to empower students with practical skills and a strong foundation in
            emerging technologies.
          </p>
        </div>

        {/* Clubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* GLUG Terminal */}
          <div className="bg-black/80 border border-orange-500/30 rounded-xl shadow-lg hover:shadow-orange-500/20 transition">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-orange-500/20">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-3 text-sm font-mono text-gray-400">
                glug@codeshack:~$
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-gray-300 space-y-6 text-sm">
              <div className="flex items-center gap-4">
                <img
                  src={glugLogo}
                  alt="GLUG Logo"
                  className="w-16 h-16 rounded-full"
                />
                <h3 className="text-2xl text-orange-400 font-semibold">
                  GLUG (GNU/Linux User Group)
                </h3>
              </div>

              <p className="leading-relaxed">
                <span className="text-orange-400">$</span> GLUG focuses on
                spreading awareness and adoption of free and open-source
                software. Members explore Linux, system administration,
                open-source tools, and community-driven development.
              </p>

              <p className="leading-relaxed">
                <span className="text-orange-400">$</span> Through install
                fests, workshops, and technical talks, GLUG nurtures ethical
                computing, collaboration, and contributions to global
                open-source communities.
              </p>

              <a
                href="https://www.linkedin.com/company/glugmvit/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link flex items-center gap-3 text-orange-400 hover:text-orange-300 transition group"
              >
                <span className="text-orange-400">$</span>
                <span className="font-mono text-sm group-hover:underline">
                  linkedin --glug
                </span>
              </a>
            </div>
          </div>

          {/* TECHHUB Terminal */}
          <div className="bg-black/80 border border-orange-500/30 rounded-xl shadow-lg hover:shadow-orange-500/20 transition text-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-orange-500/20">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-3 text-sm font-mono text-gray-400">
                techhub@codeshack:~$
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-gray-300 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={techhubLogo}
                  alt="TechHub Logo"
                  className="w-16 h-16 rounded-full"
                />
                <h3 className="text-2xl text-orange-400 font-semibold">
                  TECHHUB
                </h3>
              </div>

              <p className="leading-relaxed">
                <span className="text-orange-400">$</span> TechHub is a
                student-led technical club dedicated to innovation, skill
                development, and practical learning across multiple tech
                domains.
              </p>

              <p className="leading-relaxed">
                <span className="text-orange-400">$</span> Through hackathons,
                project-based learning, and peer mentoring, TechHub bridges the
                gap between academics and industry expectations.
              </p>

              <a
                href="https://www.linkedin.com/company/techhub-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link flex items-center gap-3 text-orange-400 hover:text-orange-300 transition group"
              >
                <span className="text-orange-400">$</span>
                <span className="font-mono text-sm group-hover:underline">
                  linkedin --techhub
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
