import Link from "next/link";
import StarsCanvas from "../../components/StarCanvas";
import { gradientText } from "@/lib/colors";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Trading Strategies - The Quant Project",
  description:
    "Explore our quantitative trading strategies and algorithmic approaches",
};

interface Strategy {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  performance: string;
}

async function getStrategies(): Promise<Strategy[]> {
  const { data, error } = await supabase
    .from("strategies")
    .select("id, title, overview, category, date, read_time, ytd");

  if (error) {
    console.error("Error fetching strategies:", error);
    return [];
  }

  return (
    data?.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.overview,
      category: s.category,
      date: s.date,
      readTime: s.read_time,
      performance: `+${s.ytd} YTD`,
    })) || []
  );
}

export default async function StrategiesPage() {
  const strategies = await getStrategies();

  return (
    <>
      <div className="min-h-screen relative">
        <StarsCanvas />

        <div className="relative z-10">
          {/* Header */}
          <header className="pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/"
                className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>

              <h1
                className="text-5xl md:text-6xl font-extrabold mb-4"
                style={gradientText.primary}
              >
                Trading Strategies
              </h1>
              <p className="text-xl text-white/70 max-w-3xl">
                Explore our quantitative trading strategies, backtested results,
                and algorithmic approaches to modern markets.
              </p>
            </div>
          </header>

          {/* Strategies Grid */}
          <main className="px-4 pb-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategies.map((strategy) => (
                  <Link
                    key={strategy.id}
                    href={`/strategies/${strategy.id}`}
                    className="service-card block group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[--accent1]/20 text-[--accent1] border border-[--accent1]/30">
                        {strategy.category}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        {strategy.performance}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[--accent1] transition-colors">
                      {strategy.title}
                    </h3>

                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {strategy.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>{strategy.date}</span>
                      <span>{strategy.readTime}</span>
                    </div>

                    <div className="mt-4 flex items-center text-[--accent1] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-16 section-shell">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl font-extrabold mb-4">
                    Want Custom Strategies?
                  </h2>
                  <p className="text-white/80 mb-6">
                    Our team can develop tailored quantitative strategies based
                    on your specific requirements, risk tolerance, and market
                    preferences.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-block font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    style={gradientText.subtitle}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
