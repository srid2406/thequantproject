import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import Starfield from "@/components/StarCanvas";
import { gradientText } from "@/lib/colors";
import { supabase } from "@/lib/supabase";

interface StrategyDetail {
  id: string;
  title: string;
  category: string;
  date: string;
  read_time: string;
  performance: string;
  overview: string;
  methodology: string[];
  key_features: string[];
  risk_management: string[];
  ytd: string;
  sharpe: string;
  max_drawdown: string;
  win_rate: string;
}

async function getStrategy(id: string): Promise<StrategyDetail | null> {
  const { data, error } = await supabase
    .from("strategies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching strategy:", error);
    return null;
  }

  return data;
}

interface StrategyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StrategyDetailPage({
  params,
}: StrategyDetailPageProps) {
  const { id } = await params;
  const strategy = await getStrategy(id);

  if (!strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Starfield />
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">Strategy Not Found</h1>
          <Link href="/strategies" className="text-[--accent1] hover:underline">
            Back to Strategies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProgressBar />
      <div className="min-h-screen relative">
        <Starfield />

        <div className="relative z-10 pb-12">
          {/* Header */}
          <header className="pt-24 pb-8 px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/strategies"
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
                Back to Strategies
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[--accent1]/20 text-[--accent1] border border-[--accent1]/30">
                  {strategy.category}
                </span>
                <span className="text-sm text-white/50">{strategy.date}</span>
                <span className="text-sm text-white/50">•</span>
                <span className="text-sm text-white/50">
                  {strategy.read_time}
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={gradientText.primary}
              >
                {strategy.title}
              </h1>
            </div>
          </header>

          {/* Content */}
          <main className="px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              {/* Performance Metrics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">YTD Return</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      {strategy.ytd}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">
                      Sharpe Ratio
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {strategy.sharpe}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">
                      Max Drawdown
                    </div>
                    <div className="text-2xl font-bold text-red-400">
                      {strategy.max_drawdown}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Win Rate</div>
                    <div className="text-2xl font-bold text-white">
                      {strategy.win_rate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="service-card mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">Overview</h3>
                <p className="text-white/85 leading-relaxed">
                  {strategy.overview}
                </p>
              </div>

              {/* Methodology */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Methodology
                </h3>
                <ul className="space-y-2">
                  {strategy.methodology.map((item, idx) => (
                    <li key={idx} className="flex items-start text-white/85">
                      <span className="text-[--accent1] mr-3 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {strategy.key_features.map((item, idx) => (
                    <li key={idx} className="flex items-start text-white/85">
                      <span className="text-[--accent2] mr-3 mt-1">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risk Management */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Risk Management
                </h3>
                <ul className="space-y-2">
                  {strategy.risk_management.map((item, idx) => (
                    <li key={idx} className="flex items-start text-white/85">
                      <span className="text-[--accent3] mr-3 mt-1">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="section-shell bg-gradient-to-br from-[--accent1]/10 to-[--accent2]/10 border-[--accent1]/30">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    Interested in This Strategy?
                  </h3>
                  <p className="text-white/70 mb-6">
                    Contact us to learn more about implementing this strategy or
                    creating a custom solution for your needs.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-block font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    style={gradientText.subtitle}
                  >
                    Get in Touch
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
