import React, { useEffect, useRef, useState } from "react";
import Team from "../../assets/Team.jpg";
import { useNavigate } from "react-router-dom";
import { ChromaGrid } from "../../assets/ChromaGrid";
import { members } from "../../data/members";

export const Members = () => {
  const navigate = useNavigate();
  const gridContainerRef = useRef(null);
  const [gridHeight, setGridHeight] = useState("auto");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Convert members into ChromaGrid format
  const items = members.map((member) => ({
    image: member.image,
    title: member.name,
    subtitle: member.role,
    handle: member.handle,
    borderColor: member.borderColor,
    gradient: member.gradient,
    url: `/members/${member.slug}`,
    onClick: () => navigate(`/members/${member.slug}`),
  }));

  // Measure actual grid height after render
  useEffect(() => {
    const measureGridHeight = () => {
      if (gridContainerRef.current) {
        const actualHeight = gridContainerRef.current.scrollHeight;
        setGridHeight(`${actualHeight}px`);
      }
    };

    // Measure after initial render
    const timer = setTimeout(measureGridHeight, 100);

    // Remeasure on window resize
    const handleResize = () => {
      setGridHeight("auto");
      setTimeout(measureGridHeight, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length]);

  return (
    <div className="min-h-screen bg-tech-grid text-white overflow-x-clip">
      {/* HERO */}
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-150">
        <img src={Team} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex mt-20 justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wider">
            Members_
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div
        ref={gridContainerRef}
        className="relative overflow-x-hidden"
        style={{
          minHeight: gridHeight === "auto" ? "500px" : gridHeight,
        }}
      >
        <ChromaGrid items={items} radius={260} damping={0.45} fadeOut={0.6} />
      </div>
    </div>
  );
};
