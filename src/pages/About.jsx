import {
  ArrowRight,
  Building2,
  Flag,
  Globe2,
  Layers3,
  Sparkles,
} from "lucide-react";

import {
  CTA,
  PageHero,
  PremiumCard,
  Section,
  SectionHeader,
} from "../components/Layout";

const journey = [
  "Idea",
  "Foundation",
  "Rudraa Cash",
  "Network",
  "Technology Platform",
  "Fintech Ecosystem",
];

const productHighlights = [
  {
    icon: <Building2 />,
    title: "Retailer-Centric",
    text: "Designed around the retailer.",
  },
  {
    icon: <Layers3 />,
    title: "Technology-Driven",
    text: "Built on digital infrastructure.",
  },
  {
    icon: <Sparkles />,
    title: "Growth-Focused",
    text: "Designed for long-term scalability.",
  },
  {
    icon: <Flag />,
    title: "India-Focused",
    text: "Built with India's business ecosystem in mind.",
  },
  {
    icon: <Globe2 />,
    title: "Long-Term Vision",
    text: "A journey from foundation to ecosystem.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Rudraa"
        title="Building With Purpose. Growing With Vision."
        subtitle="Rudraa Business Solutions Pvt. Ltd. is being built with a vision to create technology-driven business solutions that connect businesses, retailers and distribution networks."
      />

      <Section>
        <div className="two-col">
          <div className="copy-block reveal">
            <span className="eyebrow">Who We Are</span>

            <h2>
              Creating a professional, connected digital business ecosystem.
            </h2>

            <p>
              Rudraa is focused on creating a professional, technology-driven
              business ecosystem designed around connectivity, operational
              efficiency and sustainable growth.
            </p>
          </div>

          <div className="copy-block reveal">
            <span className="eyebrow">Our Purpose</span>

            <h2>Infrastructure that helps businesses connect.</h2>

            <p>
              Create technology and business infrastructure that helps
              businesses and retailers operate in a more connected digital
              environment.
            </p>
          </div>
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader
          eyebrow="Our Journey"
          title="From idea to ecosystem."
          text="A long-term journey from a focused product foundation toward a connected business ecosystem."
        />

        <div className="timeline">
          {journey.map((item, index) => (
            <div
              className="timeline-item reveal"
              key={item}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <b>{item}</b>

              {index < journey.length - 1 && (
                <ArrowRight aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Rudraa Cash's Role"
          title="The flagship product through which the ecosystem begins taking shape."
          text="Rudraa Cash is the starting point for a broader retailer-centric digital business vision."
        />

        <div className="card-grid five">
          {productHighlights.map(
            ({ icon, title, text }) => (
              <PremiumCard
                key={title}
                icon={icon}
                title={title}
                text={text}
              />
            )
          )}
        </div>
      </Section>

      <CTA />
    </>
  );
}
