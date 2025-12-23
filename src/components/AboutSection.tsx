import { gradientText } from "@/lib/colors";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold" style={gradientText.primary}>
            About The Quant Project
          </h2>
          <p className="mt-2 text-white/70">
            Our story, mission, and the team behind the innovation
          </p>
        </div>

        <h3 className="text-2xl font-semibold" style={gradientText.subtitle}>
          Our Story
        </h3>
        <p className="mt-3 text-white/85 leading-relaxed">
          Founded with a vision to revolutionize quantitative trading, We've
          been at the forefront of algorithmic trading innovation, developing
          strategies that consistently outperform traditional investment
          approaches.
        </p>

        <h3
          className="text-2xl font-semibold mt-6"
          style={gradientText.subtitle}
        >
          Our Mission
        </h3>
        <p className="mt-3 text-white/85 leading-relaxed">
          We believe in developing quantitative trading strategies and let your
          money grow by itself while staying emotionally sane.
        </p>

        <h3
          className="text-2xl font-semibold mt-6"
          style={gradientText.subtitle}
        >
          Our Values
        </h3>
        <ul className="mt-3 ml-6 list-disc text-white/90 space-y-1">
          <li>Innovation through data-driven insights</li>
          <li>Transparency in all trading operations</li>
          <li>Commitment to risk management excellence</li>
          <li>Continuous learning and improvement</li>
        </ul>

        <h3
          className="text-2xl font-semibold mt-6"
          style={gradientText.subtitle}
        >
          Our Team
        </h3>
        <p className="mt-3 text-white/85">
          Our team consists of market enthusiasts, we got into markets
          accidentally and ended up here.
        </p>
      </div>
    </section>
  );
}
