import React, { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaWhatsapp,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Codeshack from "../../../assets/CodeShack.png";

const CommandMenu = ({ open, onClose, title, links }) => {
  const ref = useRef(null);

  // Outside click + ESC
  useEffect(() => {
    if (!open) return;

    const closeOnScroll = () => onClose();

    const closeOnEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    const closeOnOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("keydown", closeOnEsc);

    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("keydown", closeOnEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Desktop palette */}
      <div
        ref={ref}
        className="hidden sm:block absolute bottom-14 right-0 z-50
        w-52 rounded-xl bg-black/95 backdrop-blur
        border border-orange-500/20
        shadow-[0_0_40px_rgba(255,140,0,0.15)]"
      >
        <div className="px-3 py-2 text-xs font-mono text-orange-400 border-b border-white/10">
          $ open {title.toLowerCase()}
        </div>

        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onClose()}
            className="block px-4 py-3 text-sm border-b border-white/5"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile bottom sheet */}
      <div
        className="sm:hidden fixed inset-x-4 bottom-6 z-50
      rounded-2xl bg-black border border-orange-500/30
      shadow-[0_0_60px_rgba(255,140,0,0.2)]"
      >
        <div className="px-4 py-3 text-xs text-orange-400 border-b border-white/10">
          {title}
        </div>

        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onClose()}
            className="block px-4 py-3 text-sm
            border-b border-white/5 last:border-none"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

const SocialMenuButton = ({ id, data, activeMenu, setActiveMenu }) => {
  const Icon = data.icon;
  const isOpen = activeMenu === id;

  return (
    <div className="relative">
      <button
        onClick={() => setActiveMenu(isOpen ? null : id)}
        className={`w-10 h-10 sm:w-11 sm:h-11
        flex items-center justify-center rounded-full text-white
        ${data.color}
        transition-all duration-300
        hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30`}
      >
        <Icon size={16} />
      </button>

      <CommandMenu
        open={isOpen}
        onClose={() => setActiveMenu(null)}
        title={data.label}
        links={data.links}
      />
    </div>
  );
};

export const Contact = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const isMembersPage = location.pathname === "/members";
  const isBlogsPage =
    location.pathname === "/blogs" || location.pathname.startsWith("/blog/");

  const SocialButton = ({ href, label, bgColor, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative"
    >
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11
        flex items-center justify-center rounded-full text-white
        ${bgColor}
        transition-all duration-300
        group-hover:scale-110
        group-hover:shadow-lg group-hover:shadow-white/20`}
      >
        {children}
      </div>

      {/* Tooltip (hidden on mobile) */}
      <span
        className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2
        bg-white text-black text-xs px-2 py-1 rounded
        opacity-0 scale-90 transition-all duration-300
        group-hover:opacity-100 group-hover:scale-100"
      >
        {label}
      </span>
    </a>
  );

  const SOCIAL_MENUS = {
    twitter: {
      label: "Twitter",
      color: "bg-sky-500",
      icon: FaTwitter,
      links: [{ label: "TechHub", url: "https://x.com/_techhub" }],
    },
    instagram: {
      label: "Instagram",
      color: "bg-pink-500",
      icon: FaInstagram,
      links: [
        {
          label: "CodeShack",
          url: "https://www.instagram.com/codeshack_community?igsh=NWNoNHYydWhxYmFk",
        },
        {
          label: "TechHub",
          url: "https://www.instagram.com/techhub_community?igsh=ZmJ4ajMxNnJiYWVv",
        },
        {
          label: "GLUG",
          url: "https://www.instagram.com/glugmvit?igsh=Z3lhbjh6d2poMWl1",
        },
      ],
    },
    discord: {
      label: "Discord",
      color: "bg-indigo-500",
      icon: FaDiscord,
      links: [
        { label: "CodeShack", url: "https://discord.gg/QHppctmGue" },
        { label: "TechHub", url: "https://discord.gg/FcHD2MWnNU" },
        { label: "GLUG", url: "https://discord.gg/fpVDjRh23a" },
      ],
    },
    linkedin: {
      label: "LinkedIn",
      color: "bg-blue-600",
      icon: FaLinkedinIn,
      links: [
        {
          label: "TechHub",
          url: "https://www.linkedin.com/company/techhub-community/",
        },
        { label: "GLUG", url: "https://www.linkedin.com/company/glugmvit/" },
      ],
    },
    whatsapp: {
      label: "WhatsApp",
      color: "bg-green-500",
      icon: FaWhatsapp,
      links: [
        {
          label: "CodeShack",
          url: "https://chat.whatsapp.com/IVacQkwPYNtDMCE0FllJSK",
        },
      ],
    },
  };

  return (
    <footer>
      <div className="relative">
        <div
          className="bg-black/90 backdrop-blur
      border border-orange-500/30
      shadow-[0_0_60px_rgba(255,140,0,0.25)]"
        >
          <div
            className="flex items-center gap-2 px-4 py-3
        border-b border-orange-500/20
        bg-black/80"
          >
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-3 text-sm font-mono text-gray-400">
              codeshack@community:~/contact$
            </span>
          </div>

          <div className="p-6 sm:p-10 font-mono text-gray-300 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-orange-400 mb-3">$ contact --info</p>

                <a
                  href="https://www.google.com/maps?q=Sir%20M.%20Visvesvaraya%20Institute%20of%20Technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm leading-relaxed hover:text-orange-400 transition"
                >
                  Sir M. Visvesvaraya Institute of Technology
                  <br />
                  International Airport Road
                  <br />
                  Yelahanka, Bengaluru, Karnataka 562157
                </a>

                <p className="mt-4 text-sm">
                  <span className="text-orange-400">$</span>{" "}
                  <a
                    href="mailto:codeshackcommunity@gmail.com"
                    className="hover:underline hover:text-orange-400"
                  >
                    codeshackcommunity@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex justify-center md:justify-end items-center">
                <img
                  src={Codeshack}
                  alt="CodeShack Logo"
                  className=" opacity-90"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
              <div className="text-xs text-gray-500 mt-auto">
                <span className="text-orange-400">$</span> echo "© 2026
                CodeShack. All Rights Reserved."
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                {Object.entries(SOCIAL_MENUS).map(([id, data]) => (
                  <SocialMenuButton
                    key={id}
                    id={id}
                    data={data}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
