import { gradientText } from "@/lib/colors";

export default function ServicesSection() {
  return (
    <section id="services">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold" style={gradientText.primary}>
            Our Services
          </h2>
          <p className="mt-2 text-white/70">
            Comprehensive quantitative trading solutions
          </p>
        </div>

        <p className="services-intro text-center text-white/85 max-w-3xl mx-auto">
          We offer a complete suite of quantitative trading services designed
          for individual traders and institutional investors. From idea
          generation to execution and monitoring, we help you build disciplined,
          data-driven trading processes.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Algorithmic Trading
            </h3>
            <p className="text-white/80 mt-2">
              Automated trading strategies powered by machine learning and
              statistical analysis, designed to capture market inefficiencies
              consistently.
            </p>
          </div>

          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Strategy Development
            </h3>
            <p className="text-white/80 mt-2">
              Custom quantitative strategies tailored to your trading style,
              risk tolerance, and market preferences. Backtested and optimized
              for performance.
            </p>
          </div>

          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Risk Management
            </h3>
            <p className="text-white/80 mt-2">
              Advanced portfolio optimization and risk management techniques to
              protect your capital while maximizing returns.
            </p>
          </div>

          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Data Analysis
            </h3>
            <p className="text-white/80 mt-2">
              In-depth market analysis using advanced statistical methods and
              big data technologies to identify trading opportunities.
            </p>
          </div>

          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Performance Tracking
            </h3>
            <p className="text-white/80 mt-2">
              Real-time monitoring and reporting of trading performance with
              detailed metrics and analytics.
            </p>
          </div>

          <div className="service-card">
            <h3 className="text-lg font-semibold text-[--accent1]">
              Training & Support
            </h3>
            <p className="text-white/80 mt-2">
              Comprehensive training programs and dedicated support to help you
              maximize the effectiveness of your trading systems.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h4 className="text-xl font-semibold" style={gradientText.subtitle}>
            Why Choose The Quant Project?
          </h4>
          <p className="mt-3 text-white/85 max-w-3xl mx-auto">
            Our track record speaks for itself. With years of experience in
            quantitative finance and a team of world-class experts, we deliver
            results that matter. We combine rigorous data science with practical
            trading expertise to create solutions that work in real market
            conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
