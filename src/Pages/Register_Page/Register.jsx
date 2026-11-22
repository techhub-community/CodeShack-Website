import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertCircle,
  Terminal,
  Code2,
  Rocket,
  Users,
  Award,
  Lock,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import TextType from "../../assets/TextType";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GJGVtjhGgMbL0P530GfYgP?mode=gi_t";

// Flip this back to true to reopen the form next recruitment cycle.
const REGISTRATIONS_OPEN = false;

// Deployed Google Apps Script Web App URL (see google-apps-script/README.md for setup).
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz45EihKkyGpETX4-Ot_kUkSJ0ragAmT7iWJYooYjsNIduQ-yulGxQTMUcPgKKXa8eZ/exec";

const HIGHLIGHTS = [
  { icon: Rocket, text: "Keynote talks & technical showcases" },
  { icon: Code2, text: "Exciting competitions & build challenges" },
  { icon: Users, text: "Networking with developers & mentors" },
  { icon: Award, text: "Certificates, goodies & recognition" },
];

const WindowChrome = ({ label }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
    <span className="w-3 h-3 rounded-full bg-red-500/80" />
    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
    <span className="w-3 h-3 rounded-full bg-green-500/80" />
    <span className="ml-3 text-xs font-mono text-gray-500 truncate">{label}</span>
  </div>
);

const FieldLabel = ({ children, required = true }) => (
  <label className="flex items-center gap-1.5 text-xs font-mono text-orange-400/90 mb-2">
    <span className="text-gray-600">$</span>
    {children}
    {!required && <span className="text-gray-500 text-[10px]">// optional</span>}
  </label>
);

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    usn: "",
    branch: "",
    questionsAndQueries: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | duplicate | error
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isComplete = form.name.trim() && form.usn.trim() && form.branch.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isComplete) return;

    if (!SCRIPT_URL) {
      console.error(
        "Missing VITE_GOOGLE_SCRIPT_URL. Set it in your .env file to your deployed Apps Script Web App URL."
      );
      setStatus("error");
      setErrorMessage("Configuration error: Script URL is missing in environment.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const submittedName = form.name.trim();
    const submittedUsn = form.usn.trim().toUpperCase();
    const submittedBranch = form.branch.trim();

    const body = new URLSearchParams();
    body.append("name", submittedName);
    body.append("usn", submittedUsn);
    body.append("branch", submittedBranch);
    body.append("questionsAndQueries", form.questionsAndQueries.trim());

    try {
      // Await network submission to Google Apps Script Web App
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      setStatus("success");
      setForm({ name: "", usn: "", branch: "", questionsAndQueries: "" });
      setTouched(false);
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage("Could not reach the registration server. Please check your connection and try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-[-200px] left-1/4 w-[700px] h-[400px] bg-orange-500/25 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-200px] right-1/4 w-[700px] h-[400px] bg-purple-500/10 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-orange-500/20 bg-black/70 backdrop-blur-xl shadow-[0_0_80px_rgba(249,115,22,0.08)]"
      >
        {/* Left info panel */}
        <div className="lg:col-span-2 relative flex flex-col justify-between bg-gradient-to-b from-white/[0.04] to-transparent p-8 border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs mb-6">
              <Terminal size={14} />
              <span>~/codeshack/techvistara-2026</span>
            </div>

            <h1 className="text-3xl font-extrabold mb-2 leading-tight">
              Register for <span className="text-orange-500">TechVistara 2026</span>
            </h1>

            <div className="font-mono text-sm text-gray-400 mb-8 min-h-[1.5em]">
              <span className="text-green-400">&gt;</span>{" "}
              <TextType
                text={[
                  "annual_flagship_tech_summit",
                  "connect_innovate_inspire",
                  "reserve_your_spot_now",
                ]}
                typingSpeed={55}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="_"
                className="inline"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent" />
              <ul className="space-y-5">
                {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                  <li key={text} className="relative flex items-center gap-4">
                    <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#0b0b0b] border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.2)]">
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <span className="text-sm text-gray-300">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-lg bg-black/60 border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-gray-500 hidden sm:block">
            <p><span className="text-purple-400">$</span> ./register --event <span className="text-orange-400">"techvistara-2026"</span></p>
            <p><span className="text-purple-400">$</span> echo <span className="text-orange-400">"status: 200 OK"</span></p>
          </div>
        </div>

        {/* Right form / success panel */}
        <div className="lg:col-span-3 flex flex-col">
          <WindowChrome label={REGISTRATIONS_OPEN ? "register.sh — recruitment-form" : "register.sh — closed"} />

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!REGISTRATIONS_OPEN ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Lock size={22} />
                  </div>
                  <p className="font-mono text-sm text-orange-400">[CLOSED] registrations_closed_for_this_year</p>
                  <p className="text-lg font-semibold">We're closed for this year!</p>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Recruitment for this cycle has wrapped up — thanks to everyone who applied.
                    If you missed the window, don't sweat it: you're always welcome to just show
                    up for the interview rounds when we announce them. We'd love to meet you anyway.
                  </p>

                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold font-mono rounded-lg px-5 py-2.5 transition shadow-[0_0_25px_rgba(34,197,94,0.25)] hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
                  >
                    <FaWhatsapp size={18} />
                    Stay in the loop on WhatsApp
                  </a>
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  {/* Glowing Success Badge */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                    <div className="relative w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.35)]">
                      <CheckCircle2 size={46} strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs mb-3">
                    <Sparkles size={13} />
                    <span>STATUS: REGISTERED_SUCCESSFULLY</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Registration Confirmed!
                  </h2>

                  <p className="text-gray-300 text-sm max-w-md mb-6 leading-relaxed">
                    You have successfully registered for <span className="text-orange-400 font-semibold">TechVistara 2026</span>. We've recorded your entry and look forward to having you!
                  </p>

                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold font-mono rounded-lg px-5 py-2.5 transition shadow-[0_0_25px_rgba(34,197,94,0.25)] hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
                  >
                    <FaWhatsapp size={18} />
                    Join our WhatsApp group
                  </a>

                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-orange-400 text-sm underline underline-offset-4"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Name Field */}
                  <div>
                    <FieldLabel>enter_full_name</FieldLabel>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ada Lovelace"
                      className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 transition"
                    />
                    {touched && !form.name.trim() && (
                      <p className="text-red-400 text-xs mt-1 font-mono">// required</p>
                    )}
                  </div>

                  {/* USN Field */}
                  <div>
                    <FieldLabel>enter_usn</FieldLabel>
                    <input
                      id="usn"
                      name="usn"
                      type="text"
                      value={form.usn}
                      onChange={handleChange}
                      placeholder="1MV23CS042"
                      className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 font-mono text-sm uppercase focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 transition"
                    />
                    {touched && !form.usn.trim() && (
                      <p className="text-red-400 text-xs mt-1 font-mono">// required</p>
                    )}
                  </div>

                  {/* Branch Field */}
                  <div>
                    <FieldLabel>enter_branch</FieldLabel>
                    <input
                      id="branch"
                      name="branch"
                      type="text"
                      value={form.branch}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science and Engineering"
                      className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 transition"
                    />
                    {touched && !form.branch.trim() && (
                      <p className="text-red-400 text-xs mt-1 font-mono">// required</p>
                    )}
                  </div>

                  {/* Questions and Queries Field */}
                  <div>
                    <FieldLabel required={false}>questions_and_queries</FieldLabel>
                    <textarea
                      id="questionsAndQueries"
                      name="questionsAndQueries"
                      rows={3}
                      value={form.questionsAndQueries}
                      onChange={handleChange}
                      placeholder="Any questions about TechVistara 2026 or events?"
                      className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 transition resize-none"
                    />
                  </div>

                  {status === "duplicate" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                      <AlertCircle size={16} />
                      <span>{errorMessage || "[DUPLICATE] This USN is already registered."}</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                      <AlertCircle size={16} />
                      <span>{errorMessage || "[ERROR] Something went wrong — please try again."}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold font-mono rounded-lg py-3 transition shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:shadow-[0_0_35px_rgba(249,115,22,0.45)] cursor-pointer"
                  >
                    <span className="text-black/60">&gt;</span>{" "}
                    {status === "submitting" ? "submitting_registration..." : "run register --event TechVistara"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
