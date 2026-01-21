import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Clock, X, FileText, Key, Camera } from "lucide-react";
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
  const hacknocturneImages = [HacknocturneCat1, HacknocturneImg, HacknocturneCat2];

  useEffect(() => {
    if (eventId === "hacknocturne") {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % hacknocturneImages.length
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
            ease: "power3.out"
          }
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
              }
            });
          }
        });
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
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
            ease: "back.out(1.2)"
          }
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
              }
            });
          }
        });
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
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
            ease: "power3.out"
          }
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
              }
            });
          }
        });
      });

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, [eventId]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % hacknocturneImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hacknocturneImages.length - 1 : prevIndex - 1
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
    <div className="min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image Section with Overlay Text */}
        <div className="relative h-96 sm:h-[500px] md:h-[600px] mb-12 overflow-hidden rounded-2xl">
          {/* Background Image */}
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0"></div>

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Small number indicator */}

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider">
                {event.name}
              </h1>

              {/* Decorative underline */}
              <div className="w-32 h-1 bg-white mx-auto mt-6"></div>
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            About the Event
          </h2>

          <div className="space-y-6 border-b border-gray-700 pb-8">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Episodes Section - Only for CodeCafe */}
          {eventId === "codecafe" && (
            <div className="mt-12 pb-16 border-b border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-white">
                Episodes So Far
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Episode 1 */}
                <div
                  ref={(el) => (episodeCardsRef.current[0] = el)}
                  onClick={() => setSelectedEpisode(1)}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Episode Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={Episode1Img}
                      alt="Episode 1"
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                      EP-01
                    </div>
                  </div>

                  {/* Episode Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Breaking Into Tech: A Freshman's Guide
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      An insightful session covering the essential steps for first-year students to kickstart their tech journey. Topics included choosing the right tech stack, building projects, and preparing for internships.
                    </p>

                    {/* Speaker Info */}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <p className="text-xs text-gray-500 mb-2">SPEAKER</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
                          SP
                        </div>
                        <div>
                          <p className="text-white font-semibold">Sumit Pathak</p>
                          <p className="text-gray-400 text-xs">Software Engineer @ Tally Solutions Pvt. Ltd.</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={14} className="text-purple-500" />
                          <span>Date: September 14, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} className="text-purple-500" />
                          <span>Duration: 1.5 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Episode 2 */}
                <div
                  ref={(el) => (episodeCardsRef.current[1] = el)}
                  onClick={() => setSelectedEpisode(2)}
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Episode Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={Episode2Img}
                      alt="Episode 2"
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                      EP-02
                    </div>
                  </div>

                  {/* Episode Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      AI in Software Engineering: The Future is Here
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      An insightful session on how Artificial Intelligence is transforming software engineering, the shifting role of engineers, and practical advice for students and aspiring founders.
                    </p>

                    {/* Speaker Info */}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <p className="text-xs text-gray-500 mb-2">SPEAKER</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
                          KA
                        </div>
                        <div>
                          <p className="text-white font-semibold">Khushagra Agarwal</p>
                          <p className="text-gray-400 text-xs">Co-founder @ Zryth Solutions</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={14} className="text-purple-500" />
                          <span>Date: December 27, 2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} className="text-purple-500" />
                          <span>Duration: 1.5 hours</span>
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
            <div className="mt-12 pb-16 border-b border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-white">
                Domains Covered
              </h2>

              {/* Timeline Container */}
              <div className="relative">
                {/* Vertical Dotted Line in the Middle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 border-l-2 border-dotted border-orange-500/50 hidden md:block"></div>

                {/* Timeline Items */}
                <div className="space-y-16">
                  {/* 1. DSA - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[0] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Data Structures & Algorithms</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Learn the fundamentals of DSA, essential for coding interviews and competitive programming. Master arrays, linked lists, trees, graphs, and algorithmic problem-solving techniques.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src={DsaImg}
                          alt="DSA Domain"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Web Development - Right Content, Left Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[1] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Image Left */}
                    <div className="order-1">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:mr-8">
                        <img
                          src={WebDevImg}
                          alt="Web Development"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Content Right */}
                    <div className="md:text-left order-2">
                      <div className="border border-gray-700 rounded-2xl p-6 md:ml-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Web Development</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Master modern web technologies including HTML5, CSS3, JavaScript, and React. Build responsive, interactive websites and web applications from scratch to deployment.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Cyber Security - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[2] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Cyber Security</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Protect systems and networks from digital attacks. Learn about ethical hacking, network security, cryptography, and security protocols to safeguard information.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src={RosImg}
                          alt="Cyber Security"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. UI/UX Design - Right Content, Left Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[3] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Image Left */}
                    <div className="order-1">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:mr-8">
                        <img
                          src={PersonalBrandingImg}
                          alt="UI/UX Design"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Content Right */}
                    <div className="md:text-left order-2">
                      <div className="border border-gray-700 rounded-2xl p-6 md:ml-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">UI/UX Design</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Design intuitive and beautiful user interfaces. Master design principles, wireframing, prototyping, and user research to create exceptional digital experiences.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 5. AI/ML - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[4] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">AI & Machine Learning</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Explore the world of Artificial Intelligence. Learn about machine learning algorithms, deep learning, neural networks, and how to build intelligent systems.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src={VideoEditingImg}
                          alt="AI/ML"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6. Laptop Guide - Right Content, Left Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[5] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Image Left */}
                    <div className="order-1">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:mr-8">
                        <img
                          src={LaptopGuideImg}
                          alt="Laptop Guide"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Content Right */}
                    <div className="md:text-left order-2">
                      <div className="border border-gray-700 rounded-2xl p-6 md:ml-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Laptop Buying Guide</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Make informed decisions when purchasing a laptop for engineering and development. Learn about specs, performance requirements, and budget-friendly options.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 7. App Development - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[6] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">App Development</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Create powerful mobile applications for Android and iOS. Learn native development or cross-platform frameworks like React Native and Flutter.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src={AppDevImg}
                          alt="App Development"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 8. Game Development - Right Content, Left Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[7] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Image Left */}
                    <div className="order-1">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:mr-8">
                        <img
                          src={GameDevImg}
                          alt="Game Development"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Content Right */}
                    <div className="md:text-left order-2">
                      <div className="border border-gray-700 rounded-2xl p-6 md:ml-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Game Development</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Dive into the world of game creation. Learn about game engines like Unity and Unreal, game physics, scripting, and 3D modeling to build immersive gaming experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Domain Timeline Section - Only for CSoC */}
          {eventId === "csoc" && (
            <div className="mt-12 pb-16 border-b border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-white">
                Domains Covered
              </h2>

              {/* Timeline Container */}
              <div className="relative">
                {/* Vertical Dotted Line in the Middle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 border-l-2 border-dotted border-purple-500/50 hidden md:block"></div>

                {/* Timeline Items */}
                <div className="space-y-16">
                  {/* 1. Web Development - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[0] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Web Development</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Master the art of building modern web applications. Learn HTML, CSS, JavaScript, and popular frameworks like React. Build responsive, interactive websites and deploy them to production.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80"
                          alt="Web Development"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. App Development - Right Content, Left Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[1] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Image Left */}
                    <div className="order-1">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:mr-8">
                        <img
                          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                          alt="App Development"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Content Right */}
                    <div className="md:text-left order-2">
                      <div className="border border-gray-700 rounded-2xl p-6 md:ml-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">App Development</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Create powerful mobile applications for Android and iOS. Learn native development or cross-platform frameworks like React Native and Flutter. Build apps that solve real-world problems.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. DSA - Left Content, Right Image */}
                  <div
                    ref={(el) => (domainItemsRef.current[2] = el)}
                    className="relative grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Content Left */}
                    <div className="md:text-right order-2 md:order-1">
                      <div className="border border-gray-700 rounded-2xl p-6 md:mr-8 bg-black/20">
                        <h3 className="text-2xl font-bold text-white mb-3">Data Structures & Algorithms</h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          Build a strong foundation in DSA for coding interviews and competitive programming. Master essential data structures, algorithmic techniques, and problem-solving strategies to excel in technical assessments.
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-black hidden md:block z-10"></div>

                    {/* Image Right */}
                    <div className="order-1 md:order-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl md:ml-8">
                        <img
                          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
                          alt="DSA"
                          className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Winners Section - Only for HackNocturne */}
          {eventId === "hacknocturne" && (
            <div className="mt-12 pb-16 border-b border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-white">
                Winners
              </h2>

              <div className="space-y-20">
                {/* 1st Place - Photo Right, Description Left */}
                <div
                  ref={(el) => (winnerCardsRef.current[0] = el)}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Description Left */}
                  <div className="order-2 md:order-1">
                    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                          1
                        </div>
                        <h3 className="text-3xl font-bold text-white">Team Losers</h3>
                      </div>
                      <div className="mb-4">
                        <p className="text-yellow-400 text-xl font-semibold">🏆 Champion</p>
                      </div>
                      <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/20">
                        <p className="text-gray-300 text-sm mb-2">Prize Amount</p>
                        <p className="text-yellow-400 text-3xl font-bold">₹25,000</p>
                      </div>
                    </div>
                  </div>

                  {/* Photo Right */}
                  <div className="order-1 md:order-2">
                    <div className="overflow-hidden rounded-2xl border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
                      <img
                        src={Winner1Img}
                        alt="Team Losers"
                        className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* 2nd Place - Photo Left, Description Right */}
                <div
                  ref={(el) => (winnerCardsRef.current[1] = el)}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Photo Left */}
                  <div className="order-1">
                    <div className="overflow-hidden rounded-2xl border-2 border-gray-500/30 shadow-2xl shadow-gray-500/20">
                      <img
                        src={Winner2Img}
                        alt="Team CodeWin"
                        className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Description Right */}
                  <div className="order-2">
                    <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-500/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gray-400 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                          2
                        </div>
                        <h3 className="text-3xl font-bold text-white">Team CodeWin</h3>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-300 text-xl font-semibold">🥈 2nd Place</p>
                      </div>
                      <div className="bg-black/40 rounded-lg p-4 border border-gray-500/20">
                        <p className="text-gray-300 text-sm mb-2">Prize Amount</p>
                        <p className="text-gray-300 text-3xl font-bold">₹15,000</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3rd Place - Photo Right, Description Left */}
                <div
                  ref={(el) => (winnerCardsRef.current[2] = el)}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Description Left */}
                  <div className="order-2 md:order-1">
                    <div className="bg-gradient-to-br from-orange-700/20 to-orange-900/20 border border-orange-500/30 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                          3
                        </div>
                        <h3 className="text-3xl font-bold text-white">Team CodeX</h3>
                      </div>
                      <div className="mb-4">
                        <p className="text-orange-400 text-xl font-semibold">🥉 3rd Place</p>
                      </div>
                      <div className="bg-black/40 rounded-lg p-4 border border-orange-500/20">
                        <p className="text-gray-300 text-sm mb-2">Prize Amount</p>
                        <p className="text-orange-400 text-3xl font-bold">₹10,000</p>
                      </div>
                    </div>
                  </div>

                  {/* Photo Right */}
                  <div className="order-1 md:order-2">
                    <div className="overflow-hidden rounded-2xl border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20">
                      <img
                        src={Winner3Img}
                        alt="Team CodeX"
                        className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Image Carousel - Only for HackNocturne */}
          {eventId === "hacknocturne" && (
            <div className="mt-20">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                Event Gallery
              </h2>

              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden group">
                {/* Carousel Container with Sliding Animation */}
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
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
                      className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-400/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8 custom-scrollbar">
              {/* Modal Header */}
              <div className="sticky top-0 bg-purple-900/30 backdrop-blur-md border-b border-purple-400/20 p-6 flex justify-between items-start z-10">
                <div>
                  <div className="bg-white/10 text-white px-3 py-1 rounded-full font-bold text-xs inline-block mb-2">
                    EP-01
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Breaking Into Tech: A Freshman's Guide
                  </h2>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>September 14, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>1.5 hours</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Speaker Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Featured Speaker</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-purple-600/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      SP
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Sumit Pathak</h3>
                      <p className="text-purple-300">Software Engineer @ Tally Solutions Pvt. Ltd.</p>
                      <p className="text-gray-400 text-sm mt-1">Alumnus & Experienced Engineer</p>
                    </div>
                  </div>
                </div>

                {/* Event Overview */}
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="text-purple-400" size={24} /> Event Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    The session featured Sumit Pathak, an alumnus and Software Engineer at Tally Solutions.
                    The talk focused on essential topics for placements, including Data Structures & Algorithms (DSA),
                    core concepts, and the distinction between product-based and service-based companies.
                  </p>
                </div>

                {/* Key Themes Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Key className="text-purple-400" size={24} /> Key Themes & Insights
                  </h3>

                  {/* Theme 1 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      1. Placement Fundamentals
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <div>
                          <strong className="text-white">Data Structures & Algorithms (DSA):</strong> The backbone of technical interviews at top product companies.
                          Focus on arrays, linked lists, trees, graphs, and dynamic programming.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <div>
                          <strong className="text-white">Core Computer Science Subjects:</strong> Strong grasp of Operating Systems (OS),
                          Database Management Systems (DBMS), and Computer Networks (CN) is crucial for interviews.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme 2 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      2. Company Landscape
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Product-Based Companies:</strong> Companies like Google, Amazon, Microsoft that build their own products.
                          Interviews focus heavily on DSA, problem-solving, and system design.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Service-Based Companies:</strong> Companies like TCS, Infosys, Wipro that provide services to other clients.
                          Interviews often focus on aptitude, communication skills, and basic technical knowledge.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme 3 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      3. Preparation Strategy
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-300 mt-1">•</span>
                        <div>
                          <strong className="text-white">Consistency is Key:</strong> Solve coding problems daily on platforms like LeetCode or GeeksforGeeks.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-300 mt-1">•</span>
                        <div>
                          <strong className="text-white">Projects:</strong> Build good projects (Web/App/ML) to showcase your practical skills on your resume.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episode 2 Modal */}
        {selectedEpisode === 2 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-purple-400/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8 custom-scrollbar">
              {/* Modal Header */}
              <div className="sticky top-0 bg-purple-900/30 backdrop-blur-md border-b border-purple-400/20 p-6 flex justify-between items-start z-10">
                <div>
                  <div className="bg-white/10 text-white px-3 py-1 rounded-full font-bold text-xs inline-block mb-2">
                    EP-02
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    AI in Software Engineering: The Future is Here
                  </h2>
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>December 27, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>1.5 hours</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Speaker Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Featured Speaker</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-purple-600/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      KA
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Khushagra Agarwal</h3>
                      <p className="text-purple-300">Co-founder @ Zryth Solutions</p>
                      <p className="text-gray-400 text-sm mt-1">Alumnus & CEO of an AI Solutions Company</p>
                    </div>
                  </div>
                </div>

                {/* Event Overview */}
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="text-purple-400" size={24} /> Event Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    The session featured Kushagra Agarwal, an alumnus and CEO of Zit Solutions, an AI solutions company.
                    The talk focused on how Artificial Intelligence is transforming software engineering, the shifting role
                    of engineers, and practical advice for students and aspiring founders.
                  </p>
                </div>

                {/* Key Themes Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Key className="text-purple-400" size={24} /> Key Themes & Insights
                  </h3>

                  {/* Theme 1 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      1. The Shift from Writing to Reviewing
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <div>
                          <strong className="text-white">Changing Landscape:</strong> The engineering role is shifting
                          from writing raw code to reviewing AI-generated code and designing architectures.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <div>
                          <strong className="text-white">The "Chaos" of Speed:</strong> While AI allows developers to
                          build in 5 minutes what used to take hours, debugging can now take significantly longer if
                          the developer does not understand the underlying code.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-500 mt-1">•</span>
                        <div>
                          <strong className="text-white">Core Fundamentals:</strong> Despite AI's capabilities, core
                          computer science concepts (Operating Systems, Databases, Networks, DSA) remain crucial.
                          Engineers must understand how things work "under the hood" to effectively review and debug AI outputs.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme 2 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      2. AI in the Software Development Lifecycle
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Requirements:</strong> AI tools can now automate note-taking
                          and summarize client requirements, reducing human error in translation.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Prototyping:</strong> Tools can generate wireframes and designs
                          (e.g., Figma) from prompts, speeding up the initial design phase.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Coding & Architecture:</strong> AI can handle boilerplate code
                          and implementation, but humans must define the High-Level Design (HLD) and Low-Level Design (LLD)
                          to ensure the system is scalable and correct.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-400 mt-1">•</span>
                        <div>
                          <strong className="text-white">Testing:</strong> AI agents can automate testing (e.g., using
                          frameworks like Playwright) by simulating user interactions, drastically reducing testing time.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme 3 */}
                  <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">
                      3. Challenges in Production
                    </h4>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-3">
                        <span className="text-purple-300 mt-1">•</span>
                        <div>
                          <strong className="text-white">Debugging:</strong> This remains a weak point for AI because
                          it lacks the full business and code context required to understand complex interdependencies.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-300 mt-1">•</span>
                        <div>
                          <strong className="text-white">Hallucinations & Limits:</strong> The speaker shared case
                          studies where AI failed at specific tasks like mathematics or physics due to "hallucinations."
                          The solution involved breaking problems into smaller chunks and using "Agentic AI" or external
                          tools (like calculators) rather than relying on one large prompt.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-purple-300 mt-1">•</span>
                        <div>
                          <strong className="text-white">Context Window:</strong> Early attempts failed because prompts
                          were too large; optimizing prompts is often more effective than fine-tuning models.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Pictures Placeholder */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Camera className="text-purple-400" size={24} /> Event Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="overflow-hidden rounded-xl border border-gray-700">
                      <img
                        src={EventImg1}
                        alt="Event Photo 1"
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-700">
                      <img
                        src={EventImg2}
                        alt="Event Photo 2"
                        className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
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
