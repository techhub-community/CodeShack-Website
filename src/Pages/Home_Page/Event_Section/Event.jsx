import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import HacknocturneImg from "../../../assets/Hacknocturne.jpeg";
import csocImg from "../../../assets/csoc.jpeg";
import techvistaraImg from "../../../assets/Techvistara.jpg";
import codecafeImg from "../../../assets/CodeCafe.jpg";
gsap.registerPlugin(ScrollTrigger);

export const Event = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  const events = [
    {
      id: 1,
      slug: "hacknocturne",
      name: "HackNocturne",
      number: 0,
      image: HacknocturneImg,
      description:
        "HackNocturne is CodeShack's flagship annual inter-college hackathon where students participate in a 24-hour non-stop coding challenge.",
      buttonText: "VIEW DETAILS"
    },
    {
      id: 2,
      slug: "tech-vistara",
      name: "Tech Vistara",
      number: 1,
      image: techvistaraImg,
      description:
        "Orientation program designed to introduce freshers to tech culture.",
      buttonText: "LEARN MORE"
    },
    {
      id: 3,
      slug: "codecafe",
      name: "CodeCafe",
      number: 2,
      image: codecafeImg,
      description:
        "Webinar and talk series on technology, placements, and careers.",
      buttonText: "EXPLORE"
    },
    {
      id: 4,
      slug: "csoc",
      name: "CSoC (CodeShack Summer of Code)",
      number: 3,
      image: csocImg,
      description:
        "A structured summer learning program focused on real-world skills.",
      buttonText: "JOIN NOW"
    }
  ];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const numberEl = card.querySelector(".event-number");
      const glowEl = card.querySelector(".event-glow");

      const valueObj = { value: 0 };
      const targetValue = events[index].number;

      /* Timeline (paused by default) */
      const tl = gsap.timeline({ paused: true });

      /* Card animation */
      tl.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        },
        0
      );

      /* Glow animation */
      tl.fromTo(
        glowEl,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 0.8,
          scale: 1.2,
          duration: 0.6,
          ease: "power2.out"
        },
        0.1
      );

      tl.to(
        glowEl,
        {
          opacity: 0.25,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        },
        0.8
      );

      /* Number animation */
      tl.to(
        valueObj,
        {
          value: targetValue,
          duration: 1.2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            numberEl.textContent = String(valueObj.value).padStart(2, "0");
          }
        },
        0
      );

      /* ScrollTrigger */
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",

        onEnter: () => {
          tl.restart();
        },

        onLeaveBack: () => {
          // Fade out smoothly when scrolling up
          gsap.to(card, {
            opacity: 0,
            y: 80,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              // Reset everything AFTER fade-out
              tl.pause(0);

              valueObj.value = 0;
              numberEl.textContent = "00";

              gsap.set(glowEl, {
                opacity: 0,
                scale: 0.6
              });
            }
          });
        }
      });

    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);



  return (
    <section className="py-32 px-6 max-w-6xl mx-auto text-white">
      <h2 className="text-5xl font-bold mb-20 text-center">EVENTS</h2>

      <div className="space-y-32">
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <img
              src={event.image}
              alt={event.name}
              className="rounded-xl shadow-lg"
            />

            {/* Content */}
            <div>
              <p className="event-number text-orange-500 text-5xl font-mono mb-4">
                00
              </p>
              <h3 className="text-3xl font-bold mb-4">{event.name}</h3>
              <p className="text-gray-400 mb-6">{event.description}</p>

              <button
                onClick={() => navigate(`/event/${event.slug}`)}
                className="px-6 py-2 border border-orange-500 text-orange-400 rounded-full hover:bg-orange-500 hover:text-black transition"
              >
                {event.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
