import { motion as _motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-[3rem]
      bg-gradient-to-br from-orange-50 via-white to-pink-50
      px-8 py-16 shadow-xl transition-colors duration-300
      dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 lg:px-16"
    >

      {/* Animated Background Blobs */}
      <_motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-10 right-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl"
      />

      <_motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
      />

      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <_motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600 shadow-sm dark:bg-orange-500/20 dark:text-orange-300">
            🍴 Smart Recipe Platform
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-7xl">
            Cook.
            <br />
            Share.
            <br />
            Discover.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Discover delicious recipes from food lovers
            around the world. Register to create your
            own recipes, upload food images, rate dishes,
            save favorites and manage your cooking ideas
            easily.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link to="/register">
              <_motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="rounded-2xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-orange-600"
              >
                Get Started →
              </_motion.button>
            </Link>

            <Link to="/add-recipe">
              <button
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                Add Recipe
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">

            {[
              {
                emoji: "🍲",
                title: "Recipes",
              },

              {
                emoji: "❤️",
                title: "Favorites",
              },

              {
                emoji: "⭐",
                title: "Ratings",
              },

              {
                emoji: "📷",
                title: "Uploads",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white px-5 py-4 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
              >
                <div className="text-3xl">
                  {item.emoji}
                </div>

                <h3 className="mt-2 font-semibold text-slate-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </_motion.div>

        {/* RIGHT SIDE */}
        <_motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: 1,
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="relative flex justify-center"
        >

          {/* Glow */}
          <div className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-300/30 to-pink-300/30 blur-3xl"></div>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
            alt="Food"
            className="relative z-10 h-[520px] w-full max-w-lg rounded-[3rem] object-cover shadow-2xl"
          />

          {/* Rating Card */}
          <_motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute left-[-20px] top-16 z-20 rounded-3xl bg-white px-6 py-4 shadow-2xl dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Top Rated
            </p>

            <h3 className="mt-1 text-2xl font-bold text-orange-500">
              ⭐ 4.9
            </h3>
          </_motion.div>

          {/* Recipe Card */}
          <_motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute bottom-8 right-[-20px] z-20 rounded-3xl bg-orange-500 px-6 py-4 text-white shadow-2xl"
          >
            <p className="text-sm opacity-90">
              Community Recipes
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              500+
            </h3>
          </_motion.div>

          {/* Floating Icons */}
          <div className="absolute right-0 top-24 z-20 rounded-full bg-white p-4 shadow-xl dark:bg-slate-800">
            🥬
          </div>

          <div className="absolute bottom-20 left-0 z-20 rounded-full bg-white p-4 shadow-xl dark:bg-slate-800">
            🍅
          </div>
        </_motion.div>
      </div>
    </section>
  );
};

export default HeroSection;