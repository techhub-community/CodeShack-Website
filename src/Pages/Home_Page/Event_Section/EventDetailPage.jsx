import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  X,
  FileText,
  Key,
  Camera,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HacknocturneImg from "../../../assets/Hacknocturne.jpeg";
import HacknocturneCat1 from "../../../assets/hacknocturneCat1.jpeg";
import HacknocturneCat2 from "../../../assets/hacknocturneCat2.jpeg";
import Winner1Img from "../../../assets/winner1.png";
import Winner2Img from "../../../assets/winner2.png";
import Winner3Img from "../../../assets/winner3.png";
import TechvistaraImg from "../../../assets/Techvistara.jpg";
import CodeCafeImg from "../../../assets/CodeCafe.jpg";
import CsocImg from "../../../assets/csoc.jpeg";

// Placeholder imports for Tech Vistara domains - replace with actual images
import DsaImg from "../../../assets/dsa.png";
import WebDevImg from "../../../assets/webdev.png";
import ComputerFundamentalsImg from "../../../assets/Techvistara.jpg"; // Placeholder
import RosImg from "../../../assets/cybersecurity.png";
import PersonalBrandingImg from "../../../assets/uiux.png";
import VideoEditingImg from "../../../assets/aiml.png";
import LaptopGuideImg from "../../../assets/laptopguide.png";
import AppDevImg from "../../../assets/appdev.png";
import GameDevImg from "../../../assets/gamedev.png";

// Placeholder imports for CodeCafe episodes - replace with actual images
import Episode1Img from "../../../assets/codecafeep1.png";
import Episode2Img from "../../../assets/codecafeep2.png";

// Event Gallery Images for CodeCafe Episode 2
import EventImg1 from "../../../assets/eventimg1.png";
import EventImg2 from "../../../assets/eventimg2.jpg";

gsap.registerPlugin(ScrollTrigger);

export const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const winnerCardsRef = useRef([]);
  const domainItemsRef = useRef([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const episodeCardsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId]);

  // Carousel state and auto-play
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hacknocturneImages = [
    HacknocturneCat1,
    HacknocturneImg,
    HacknocturneCat2,
  ];

  useEffect(() => {
    if (eventId === "hacknocturne") {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % hacknocturneImages.length,
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [eventId]);

  // GSAP animation for winner cards
  useEffect(() => {
    if (eventId === "hacknocturne") {
      winnerCardsRef.current.forEach((card) => {
        if (!card) return;

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            tl.restart();
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 80,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                tl.pause(0);
              },
            });
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, [eventId]);

  // GSAP animation for Tech Vistara and CSoC domain timeline
  useEffect(() => {
    if (eventId === "tech-vistara" || eventId === "csoc") {
      domainItemsRef.current.forEach((item) => {
        if (!item) return;

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          item,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
        );

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            tl.restart();
          },
          onLeaveBack: () => {
            gsap.to(item, {
              opacity: 0,
              scale: 0.8,
              y: 30,
              duration: 0.4,
              ease: "power2.in",
              onComplete: () => {
                tl.pause(0);
              },
            });
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, [eventId]);

  // GSAP animation for CodeCafe episode cards
  useEffect(() => {
    if (eventId === "codecafe") {
      episodeCardsRef.current.forEach((card) => {
        if (!card) return;

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            tl.restart();
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 60,
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => {
                tl.pause(0);
              },
            });
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }
  }, [eventId]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % hacknocturneImages.length,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hacknocturneImages.length - 1 : prevIndex - 1,
    );
  };

  const events = {
    hacknocturne: {
      id: 1,
      name: "HackNocturne",
      image: HacknocturneImg,
      description:
        "HackNocturne is CodeShack's flagship annual inter-college hackathon where students participate in a 24-hour non-stop coding challenge. Teams work together to build innovative solutions for real-world problems while learning new technologies and collaborating under time pressure. The event promotes creativity, teamwork, and hands-on experience. HackNocturne features a prize money, along with certificates, swag, and recognition for top-performing teams.",
    },
    "tech-vistara": {
      id: 2,
      name: "Tech Vistara",
      image: TechvistaraImg,
      description:
        "Tech Vistara is the official orientation program by CodeShack for first-year students. It is designed to help freshers understand what engineering and technology are really about beyond classrooms and exams. The session acts as a beginner-friendly guide that introduces different tech domains, learning paths, useful resources, and opportunities available in college. Tech Vistara helps first-year students take their first confident step into their technical journey and avoid common mistakes early on.",
    },
    codecafe: {
      id: 3,
      name: "CodeCafe",
      image: CodeCafeImg,
      description:
        "CodeCafe is a webinar and talk series conducted by CodeShack that focuses on technology, placements, career guidance, and industry insights. The sessions are interactive and beginner-friendly, featuring seniors, alumni, and industry professionals who share their experiences and practical advice. CodeCafe aims to create an open and relaxed environment where students can learn, ask questions, and gain clarity about their academic and career paths.",
    },
    csoc: {
      id: 4,
      name: "CSoC (CodeShack Summer of Code)",
      image: CsocImg,
      description:
        "CSoC (CodeShack Summer of Code) is a structured 4–5 week summer learning program focused on helping students upskill in various technical domains such as Web Development, App Development, and Data Structures & Algorithms. The program includes guided learning, hands-on assignments, and mentor support. It concludes with a hackathon where participants apply what they have learned to build real projects, making CSoC a complete learning-to-building experience.",
    },
  };

  const DOMAINS_TV = [
    {
      title: "Data Structures & Algorithms",
      description:
        "Learn the fundamentals of DSA, essential for coding interviews and competitive programming. Master arrays, linked lists, trees, graphs, and algorithmic problem-solving techniques.",
      image: DsaImg,
    },
    {
      title: "Web Development",
      description:
        "Master modern web technologies including HTML5, CSS3, JavaScript, and React. Build responsive, interactive websites and web applications from scratch to deployment.",
      image: WebDevImg,
    },
    {
      title: "Cyber Security",
      description:
        "Protect systems and networks from digital attacks. Learn ethical hacking, cryptography, and security protocols.",
      image: RosImg,
    },
    {
      title: "UI/UX Design",
      description:
        "Design intuitive and beautiful user interfaces. Learn wireframing, prototyping, and user research.",
      image: PersonalBrandingImg,
    },
    {
      title: "AI & Machine Learning",
      description:
        "Explore machine learning algorithms, deep learning, and neural networks to build intelligent systems.",
      image: VideoEditingImg,
    },
    {
      title: "Laptop Buying Guide",
      description:
        "Learn how to choose the right laptop based on specs, performance, and budget.",
      image: LaptopGuideImg,
    },
    {
      title: "App Development",
      description:
        "Build mobile applications using native or cross-platform frameworks like React Native and Flutter.",
      image: AppDevImg,
    },
    {
      title: "Game Development",
      description:
        "Create immersive games using engines like Unity and Unreal with scripting and 3D modeling.",
      image: GameDevImg,
    },
  ];

  const WINNERS = [
    {
      team: "Team Losers",
      position: 1,
      label: "🏆 Champion",
      prize: "₹25,000",
      image: Winner1Img,
      accent: "yellow",
    },
    {
      team: "Team CodeWin",
      position: 2,
      label: "🥈 2nd Place",
      prize: "₹15,000",
      image: Winner2Img,
      accent: "gray",
    },
    {
      team: "Team CodeX",
      position: 3,
      label: "🥉 3rd Place",
      prize: "₹10,000",
      image: Winner3Img,
      accent: "orange",
    },
  ];

  const DOMAINS_CSOC = [
    {
      title: "Web Development",
      description:
        "Master the art of building modern web applications. Learn HTML, CSS, JavaScript, and popular frameworks like React. Build responsive, interactive websites and deploy them to production.",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    },
    {
      title: "App Development",
      description:
        "Create powerful mobile applications for Android and iOS. Learn native development or cross-platform frameworks like React Native and Flutter. Build apps that solve real-world problems.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    },
    {
      title: "Data Structures & Algorithms",
      description:
        "Build a strong foundation in DSA for coding interviews and competitive programming. Master essential data structures, algorithmic techniques, and problem-solving strategies to excel in technical assessments.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
  ];

  const event = events[eventId];

  if (!event) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-[60vh] min-h-[320px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[600px] mb-12 overflow-hidden rounded-2xl border border-orange-500/20">
          <img
            src={event.image}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="text-center max-w-5xl">
              <p className="mb-3 text-xs sm:text-sm md:text-base font-mono text-orange-400 tracking-widest">
                $ codeshack.event
              </p>

              <h1
                className="
          font-bold uppercase tracking-wider text-white
          text-[clamp(1.8rem,6vw,5rem)]
          leading-tight
        "
              >
                {event.name}
              </h1>

              <div className="w-16 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-orange-400 mx-auto mt-4 sm:mt-6" />
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="space-y-8">
          <h2
            className="text-2xl sm:text-3xl font-mono font-semibold mb-6
  text-orange-400 tracking-wide"
          >
            <span className="text-orange-500">$</span> about --event
          </h2>

          <div className="space-y-6 border-b border-orange-700 pb-8">
            <p className="text-gray-300 text-sm text-justify leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Episodes Section - Only for CodeCafe */}
          {eventId === "codecafe" && (
            <div className="mt-10 pb-12 border-b border-orange-500">
              {/* Section Heading */}
              <h2
                className="text-2xl sm:text-3xl font-mono font-semibold mb-6
  text-orange-400 tracking-wide"
              >
                <span className="text-orange-500">$</span> episodes --list
              </h2>

              {/* Episodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                {/* ================= EPISODE 1 ================= */}
                <div
                  ref={(el) => (episodeCardsRef.current[0] = el)}
                  onClick={() => setSelectedEpisode(1)}
                  className="
          bg-gradient-to-br from-gray-900 to-black
          border border-orange-800
          rounded-xl
          overflow-hidden
          cursor-pointer
          transition-all duration-300
          hover:border-orange-600/50
          active:scale-[0.98]
        "
                >
                  {/* Image */}
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <img
                      src={Episode1Img}
                      alt="Episode 1"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-600 text-white px-2.5 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm">
                      EP-01
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-white mb-2">
                      Breaking Into Tech: A Freshman's Guide
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
                      A beginner-focused session on choosing the right tech
                      stack, building projects, and preparing for internships.
                    </p>

                    {/* Speaker */}
                    <div className="border-t border-orange-800 pt-3 mt-3">
                      <p className="text-[10px] text-gray-500 mb-1">SPEAKER</p>

                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          SP
                        </div>

                        <div className="min-w-0">
                          <p className="text-white text-sm sm:text-base font-medium leading-tight">
                            Sumit Pathak
                          </p>
                          <p className="text-gray-400 text-[11px] sm:text-xs leading-snug">
                            Software Engineer @ Tally Solutions
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                          <Calendar size={12} className="text-orange-500" />
                          <span>Sept 14, 2025</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                          <Clock size={12} className="text-orange-500" />
                          <span>1.5 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= EPISODE 2 ================= */}
                <div
                  ref={(el) => (episodeCardsRef.current[1] = el)}
                  onClick={() => setSelectedEpisode(2)}
                  className="
          bg-gradient-to-br from-gray-900 to-black
          border border-orange-800
          rounded-xl
          overflow-hidden
          cursor-pointer
          transition-all duration-300
          hover:border-orange-600/50
          active:scale-[0.98]
        "
                >
                  {/* Image */}
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <img
                      src={Episode2Img}
                      alt="Episode 2"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-600 text-white px-2.5 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm">
                      EP-02
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-semibold text-white mb-2">
                      AI in Software Engineering
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
                      A discussion on AI’s impact on software engineering,
                      career paths, and real-world applications.
                    </p>

                    {/* Speaker */}
                    <div className="border-t border-orange-800 pt-3 mt-3">
                      <p className="text-[10px] text-gray-500 mb-1">SPEAKER</p>

                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          KA
                        </div>

                        <div className="min-w-0">
                          <p className="text-white text-sm sm:text-base font-medium leading-tight">
                            Khushagra Agarwal
                          </p>
                          <p className="text-gray-400 text-[11px] sm:text-xs leading-snug">
                            Co-founder @ Zryth Solutions
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                          <Calendar size={12} className="text-orange-500" />
                          <span>Dec 27, 2025</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                          <Clock size={12} className="text-orange-500" />
                          <span>1.5 hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domain Timeline Section - Only for Tech Vistara */}
          {eventId === "tech-vistara" && (
            <div className="mt-12 pb-16 border-b border-orange-700">
              {/* Terminal Heading */}
              <h2 className="text-2xl sm:text-3xl font-mono font-semibold mb-10 text-orange-400 tracking-wide">
                <span className="text-orange-500">$</span> domains --list
              </h2>

              <div className="relative">
                {/* Vertical dotted line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 h-full w-0.5
      border-l-2 border-dotted border-orange-500/40 hidden md:block"
                />

                <div className="space-y-16">
                  {DOMAINS_TV.map((domain, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        ref={(el) => (domainItemsRef.current[index] = el)}
                        className="relative grid md:grid-cols-2 gap-8 items-center"
                      >
                        {/* Content */}
                        <div
                          className={`order-2 ${
                            isLeft ? "md:order-1 md:text-right" : "md:text-left"
                          }`}
                        >
                          <div
                            className={`border border-orange-700 rounded-2xl p-6
                bg-black/30 backdrop-blur
                ${isLeft ? "md:mr-8" : "md:ml-8"}`}
                          >
                            <h3 className="text-xl sm:text-2xl font-mono font-bold text-orange-400 mb-3">
                              <span className="text-orange-500">$</span>{" "}
                              {domain.title.toLowerCase()}
                            </h3>

                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                              {domain.description}
                            </p>
                          </div>
                        </div>

                        {/* Center Dot */}
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-4 h-4 bg-orange-500 rounded-full border-4 border-black
              hidden md:block z-10"
                        />

                        {/* Image */}
                        <div
                          className={`order-1 ${isLeft ? "md:order-2" : ""}`}
                        >
                          <div
                            className={`overflow-hidden rounded-2xl
                border border-orange-700 shadow-xl
                ${isLeft ? "md:ml-8" : "md:mr-8"}`}
                          >
                            <img
                              src={domain.image}
                              alt={domain.title}
                              className="w-full h-64 object-cover
                  transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Domain Timeline Section - Only for CSoC */}
          {eventId === "csoc" && (
            <div className="mt-12 pb-16 border-b border-orange-700">
              {/* Terminal Heading */}
              <h2 className="text-2xl sm:text-3xl font-mono font-semibold mb-6 text-orange-400 tracking-wide">
                <span className="text-orange-500">$</span> domains --list
              </h2>

              <div className="relative">
                {/* Vertical Dotted Line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 h-full w-0.5
      border-l-2 border-dotted border-orange-500/50 hidden md:block"
                />

                <div className="space-y-16">
                  {DOMAINS_CSOC.map((domain, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        ref={(el) => (domainItemsRef.current[index] = el)}
                        className="relative grid md:grid-cols-2 gap-8 items-center"
                      >
                        {/* Content */}
                        <div
                          className={`order-2 ${
                            isLeft ? "md:order-1 md:text-right" : "md:text-left"
                          }`}
                        >
                          <div
                            className={`border border-orange-700 rounded-2xl p-6 bg-black/20
                ${isLeft ? "md:mr-8" : "md:ml-8"}`}
                          >
                            <h3 className="text-2xl font-mono font-bold text-orange-400 mb-3">
                              <span className="text-orange-500">$</span>{" "}
                              {domain.title.toLowerCase()}
                            </h3>

                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                              {domain.description}
                            </p>
                          </div>
                        </div>

                        {/* Center Dot */}
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-4 h-4 bg-orange-500 rounded-full border-4 border-black
              hidden md:block z-10"
                        />

                        {/* Image */}
                        <div
                          className={`order-1 ${isLeft ? "md:order-2" : ""}`}
                        >
                          <div
                            className={`overflow-hidden rounded-2xl border border-orange-700 shadow-xl
                ${isLeft ? "md:ml-8" : "md:mr-8"}`}
                          >
                            <img
                              src={domain.image}
                              alt={domain.title}
                              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Winners Section - Only for HackNocturne */}
          {eventId === "hacknocturne" && (
            <div className="">
              <div className="space-y-20">
                {/* 1st Place - Photo Right, Description Left */}
                <div className="mt-16">
                  {/* Terminal Header */}
                  <h2 className="text-2xl sm:text-3xl font-mono font-semibold mb-10 text-orange-400 tracking-wide">
                    <span className="text-orange-500">$</span> winners --list
                  </h2>

                  <div className="space-y-16">
                    {WINNERS.map((winner, index) => {
                      const isLeft = index % 2 === 0;

                      return (
                        <div
                          key={index}
                          ref={(el) => (winnerCardsRef.current[index] = el)}
                          className="grid md:grid-cols-2 gap-8 items-center"
                        >
                          {/* Description */}
                          <div
                            className={`order-2 ${isLeft ? "md:order-1" : ""}`}
                          >
                            <div
                              className={`
                bg-black/40 backdrop-blur
                border border-orange-500/30
                rounded-2xl p-8
                ${winner.accent === "yellow" && "shadow-yellow-500/20"}
                ${winner.accent === "orange" && "shadow-orange-500/20"}
                ${winner.accent === "gray" && "shadow-gray-500/20"}
              `}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    text-xl font-bold
                    ${winner.accent === "yellow" && "bg-yellow-500 text-black"}
                    ${winner.accent === "orange" && "bg-orange-600 text-white"}
                    ${winner.accent === "gray" && "bg-gray-400 text-black"}
                  `}
                                >
                                  {winner.position}
                                </div>

                                <h3 className="text-3xl font-mono font-bold text-white">
                                  {winner.team}
                                </h3>
                              </div>

                              <p
                                className={`
                  text-xl font-semibold mb-4
                  ${winner.accent === "yellow" && "text-yellow-400"}
                  ${winner.accent === "orange" && "text-orange-400"}
                  ${winner.accent === "gray" && "text-gray-300"}
                `}
                              >
                                {winner.label}
                              </p>

                              <div className="bg-black/60 rounded-lg p-4 border border-orange-500/20">
                                <p className="text-gray-400 text-sm mb-2 font-mono">
                                  prize.amount
                                </p>
                                <p
                                  className={`
                    text-3xl font-bold
                    ${winner.accent === "yellow" && "text-yellow-400"}
                    ${winner.accent === "orange" && "text-orange-400"}
                    ${winner.accent === "gray" && "text-gray-300"}
                  `}
                                >
                                  {winner.prize}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Image */}
                          <div
                            className={`order-1 ${isLeft ? "md:order-2" : ""}`}
                          >
                            <div
                              className={`
                overflow-hidden rounded-2xl border-2 border-orange-500/30
                shadow-2xl
                ${winner.accent === "yellow" && "shadow-yellow-500/20"}
                ${winner.accent === "orange" && "shadow-orange-500/20"}
                ${winner.accent === "gray" && "shadow-gray-500/20"}
              `}
                            >
                              <img
                                src={winner.image}
                                alt={winner.team}
                                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Carousel - Only for HackNocturne */}
          {eventId === "hacknocturne" && (
            <div className="mt-20">
              <h2
                className="text-2xl sm:text-3xl font-mono font-semibold mb-6
  text-orange-400 tracking-wide"
              >
                <span className="text-orange-500">$</span> event --gallery
              </h2>

              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
                {/* Carousel Container with Sliding Animation */}
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {hacknocturneImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`HackNocturne ${index + 1}`}
                      className="w-full h-full object-cover flex-shrink-0"
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {hacknocturneImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-orange-500 w-8"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Episode 1 Modal */}
        {selectedEpisode === 1 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-orange-400/20 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar">
              {/* Header */}
              <div className="sticky top-0 bg-orange-900/30 backdrop-blur-md border-b border-orange-400/20 px-4 py-3 sm:p-6 flex justify-between items-start z-10">
                <div>
                  <div className="bg-white/10 text-white px-2.5 py-1 rounded-full font-bold text-[10px] sm:text-xs inline-block mb-1">
                    EP-01
                  </div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    Breaking Into Tech: A Freshman's Guide
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] sm:text-sm text-white/80">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>Sept 14, 2025</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>1.5 hrs</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-1.5 sm:p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* Speaker */}
                <div className="bg-white/5 border border-orange-400/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">
                    Featured Speaker
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      SP
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-semibold text-white">
                        Sumit Pathak
                      </h3>
                      <p className="text-orange-300 text-sm">
                        Software Engineer @ Tally Solutions
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Alumnus & Industry Professional
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="text-orange-400" size={20} /> Overview
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    The session focused on placement fundamentals including DSA,
                    core CS subjects, and understanding the difference between
                    product-based and service-based companies.
                  </p>
                </div>

                {/* Key Themes */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Key className="text-orange-400" size={20} /> Key Insights
                  </h3>

                  {[
                    {
                      title: "Placement Fundamentals",
                      points: [
                        "DSA is the backbone of technical interviews.",
                        "OS, DBMS & CN are critical for shortlisting.",
                      ],
                    },
                    {
                      title: "Company Landscape",
                      points: [
                        "Product companies focus on problem solving.",
                        "Service companies emphasize aptitude & basics.",
                      ],
                    },
                    {
                      title: "Preparation Strategy",
                      points: [
                        "Consistency matters more than speed.",
                        "Strong projects boost resumes significantly.",
                      ],
                    },
                  ].map((theme, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-orange-400/20 rounded-lg sm:rounded-xl p-4 sm:p-6"
                    >
                      <h4 className="text-sm sm:text-xl font-semibold text-orange-300 mb-2">
                        {i + 1}. {theme.title}
                      </h4>
                      <ul className="space-y-1.5 text-gray-300 text-xs sm:text-base">
                        {theme.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-orange-400">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episode 2 Modal */}
        {selectedEpisode === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
            <div className="bg-black/50 backdrop-blur-xl border border-orange-400/20 rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
              {/* ===== Header ===== */}
              <div className="sticky top-0 bg-orange-900/30 backdrop-blur-md border-b border-orange-400/20 px-4 py-3 sm:p-6 flex justify-between items-start z-10">
                <div>
                  <div className="bg-white/10 text-white px-2.5 py-1 rounded-full font-bold text-[10px] sm:text-xs inline-block mb-1">
                    EP-02
                  </div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    AI in Software Engineering: The Future is Here
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] sm:text-sm text-white/80">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>Dec 27, 2025</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>1.5 hrs</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-1.5 sm:p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* ===== Content ===== */}
              <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 space-y-6 sm:space-y-8">
                {/* Speaker */}
                <div className="bg-white/5 border border-orange-400/20 rounded-lg sm:rounded-xl p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                    Featured Speaker
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                      KA
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        Khushagra Agarwal
                      </h3>
                      <p className="text-orange-300 text-xs sm:text-sm">
                        Co-founder @ Zryth Solutions
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Alumnus & AI Startup CEO
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white mb-3">
                    <FileText size={18} className="text-orange-400" />
                    Event Overview
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    This session explored how AI is reshaping software
                    engineering — from faster development cycles to new
                    challenges in debugging, architecture, and production
                    systems. The speaker shared industry insights and advice for
                    students and aspiring founders.
                  </p>
                </div>

                {/* Themes */}
                <div className="space-y-5 sm:space-y-6">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
                    <Key size={18} className="text-orange-400" />
                    Key Themes & Insights
                  </h3>

                  {/* Theme Card */}
                  {[
                    {
                      title: "1. From Writing Code to Reviewing It",
                      points: [
                        "Engineers increasingly review AI-generated code instead of writing everything manually.",
                        "Speed increases, but debugging suffers without strong fundamentals.",
                        "Core CS subjects remain non-negotiable.",
                      ],
                    },
                    {
                      title: "2. AI Across the SDLC",
                      points: [
                        "Automated requirement summaries reduce miscommunication.",
                        "Prompt-based UI & wireframe generation speeds prototyping.",
                        "Humans still own HLD & LLD decisions.",
                        "AI agents drastically cut testing time.",
                      ],
                    },
                    {
                      title: "3. Production Challenges",
                      points: [
                        "Debugging is still context-heavy and difficult for AI.",
                        "Hallucinations require agentic workflows & tool usage.",
                        "Smaller prompts often beat fine-tuning.",
                      ],
                    },
                  ].map((theme, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-orange-400/20 rounded-lg sm:rounded-xl p-4 sm:p-5"
                    >
                      <h4 className="text-orange-300 font-semibold text-sm sm:text-base mb-3">
                        {theme.title}
                      </h4>

                      <ul className="space-y-2 text-gray-300 text-sm">
                        {theme.points.map((point, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Gallery */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-white">
                    <Camera size={18} className="text-orange-400" />
                    Event Gallery
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[EventImg1, EventImg2].map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-lg border border-orange-700"
                      >
                        <img
                          src={img}
                          alt={`Event ${i + 1}`}
                          className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
