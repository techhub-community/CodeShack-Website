import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Terminal,
  Code2,
  Rocket,
  Users,
  Award,
} from "lucide-react";
import TextType from "../../assets/TextType";

// Deployed Google Apps Script Web App URL (see google-apps-script/README.md for setup).
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

const YEARS = ["2nd Year", "3rd Year", "4th Year"];

const PERKS = [
  { icon: Code2, text: "Real projects, not just theory" },
  { icon: Rocket, text: "Hackathons & build sprints" },
  { icon: Users, text: "Mentorship from seniors" },
  { icon: Award, text: "Certificates, swag & community" },
];

const WindowChrome = ({ label }) => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
    <span className="w-3 h-3 rounded-full bg-red-500/80" />
    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
    <span className="w-3 h-3 rounded-full bg-green-500/80" />
    <span className="ml-3 text-xs font-mono text-gray-500 truncate">{label}</span>
  </div>
);

const Pill = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`px-3.5 py-2 rounded-lg text-sm font-mono border transition-all duration-200
      ${
        active
          ? "bg-orange-500 border-orange-500 text-black font-semibold shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          : "bg-white/[0.03] border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white"
      }`}
  >
    {children}
  </button>
);

const FieldLabel = ({ children }) => (
  <label className="flex items-center gap-1.5 text-xs font-mono text-orange-400/90 mb-2">
    <span className="text-gray-600">$</span>
    {children}
  </label>
);

export const Register = () => {
  const [form, setForm] = useState({ name: "", usn: "", branch: "", year: "" });
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isComplete = form.name.trim() && form.usn.trim() && form.branch.trim() && form.year;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isComplete) return;

    if (!SCRIPT_URL) {
      console.error(
        "Missing VITE_GOOGLE_SCRIPT_URL. Set it in your .env file to your deployed Apps Script Web App URL."
      );
      setStatus("error");
      return;
    }

    const body = new FormData();
    body.append("name", form.name.trim());
    body.append("usn", form.usn.trim().toUpperCase());
    body.append("branch", form.branch.trim());
    body.append("year", form.year);

    // Apps Script round-trips take a couple of seconds (script boot + sheet
    // write + redirect), and mode:"no-cors" makes the response opaque anyway
    // (we can't read success/failure from it), so we don't await it — fire
    // the request and let the UI move on immediately instead of stalling
    // on Google's latency.
    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body,
    }).catch((err) => {
      console.error("Registration submit failed:", err);
    });

    setStatus("success");
    setForm({ name: "", usn: "", branch: "", year: "" });
    setTouched(false);
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
              <span>~/codeshack/recruitment</span>
            </div>

            <h1 className="text-3xl font-extrabold mb-2 leading-tight">
              Join <span className="text-orange-500">&lt;CodeShack/&gt;</span>
            </h1>

            <div className="font-mono text-sm text-gray-400 mb-8 min-h-[1.5em]">
              <span className="text-green-400">&gt;</span>{" "}
              <TextType
                text={[
                  "building_open_source_since_day_one",
                  "hackathon_winners_in_the_making",
                  "your_next_favorite_club",
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
                {PERKS.map(({ icon: Icon, text }) => (
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
            <p><span className="text-purple-400">$</span> git commit -m <span className="text-orange-400">"joined codeshack"</span></p>
            <p><span className="text-purple-400">$</span> echo <span className="text-orange-400">"let's build something."</span></p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 flex flex-col">
          <WindowChrome label="register.sh — recruitment-form" />

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-12 text-center"
                >
                  <CheckCircle2 className="text-green-400" size={48} />
                  <p className="font-mono text-sm text-green-400">[OK] registration_successful</p>
                  <p className="text-lg font-semibold">You're on the list!</p>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Thanks for applying — we'll reach out with next steps soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-orange-400 text-sm underline underline-offset-4"
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

                  <div>
                    <FieldLabel>enter_branch</FieldLabel>
                    <input
                      id="branch"
                      name="branch"
                      type="text"
                      value={form.branch}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science"
                      className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 transition"
                    />
                    {touched && !form.branch.trim() && (
                      <p className="text-red-400 text-xs mt-1 font-mono">// required</p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>select_year --one</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {YEARS.map((year) => (
                        <Pill
                          key={year}
                          active={form.year === year}
                          onClick={() => setForm((prev) => ({ ...prev, year }))}
                        >
                          {year}
                        </Pill>
                      ))}
                    </div>
                    {touched && !form.year && (
                      <p className="text-red-400 text-xs mt-1 font-mono">// required</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center font-mono">
                      [ERROR] something went wrong — try again in a moment.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-semibold font-mono rounded-lg py-3 transition shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]"
                  >
                    <span className="text-black/60">&gt;</span> run register --submit
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
