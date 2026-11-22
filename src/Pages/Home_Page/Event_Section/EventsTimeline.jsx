import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const EventsTimeline = ({ events }) => {
  const navigate = useNavigate();

  return (
    <section className="py-32 max-w-6xl mx-auto px-6 relative">
      <h2 className="text-5xl font-bold text-center mb-24">EVENTS</h2>

      <div className="relative border-l border-orange-500/40">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-24 pl-12"
          >
            <span className="absolute -left-3 w-6 h-6 rounded-full bg-orange-500" />

            <p className="text-orange-400 font-mono mb-2">{event.number}</p>
            <h3 className="text-3xl font-bold mb-4">{event.name}</h3>

            <img
              src={event.image}
              alt={event.name}
              className="rounded-xl mb-6 shadow-lg"
            />

            <p className="text-gray-400 mb-6">{event.description}</p>

            <button
              onClick={() => navigate(`/event/${event.slug}`)}
              className="border border-orange-500 px-6 py-2 rounded-full text-orange-400 hover:bg-orange-500 hover:text-black transition"
            >
              View Event
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
