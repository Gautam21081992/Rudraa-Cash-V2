import {
  Activity,
  Database,
  Lock,
  Network,
  Scale,
  ServerCog,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers3,
} from "lucide-react";
import {
  CTA,
  PageHero,
  PremiumCard,
  Section,
  SectionHeader,
} from "../components/Layout";

const technologyPillars = [
  [
    ServerCog,
    "Reliable Platform",
    "Designed for operational consistency, availability and dependable digital experiences.",
  ],
  [
    Scale,
    "Scalability",
    "Designed to evolve as retailer networks, transaction requirements and business operations grow.",
  ],
  [
    Activity,
    "Performance",
    "Focused on efficient workflows, responsive interfaces and smooth digital experiences.",
  ],
];

const securityPillars = [
  [
    ShieldCheck,
    "Security by Design",
    "Security and responsible technology remain fundamental to a digital business platform.",
  ],
  [
    Lock,
    "Data Protection",
    "Responsible handling of business and transaction-related information with a strong focus on privacy and protection.",
  ],
  [
    Database,
    "Responsible Infrastructure",
    "Technology decisions are structured to support dependable and responsible business operations.",
  ],
];

const roadmap = [
  ["01", "Foundation", "Core digital infrastructure and dependable platform capabilities."],
  ["02", "Automation", "Streamlined workflows designed to reduce operational complexity."],
  ["03", "Analytics", "Better visibility through data-driven business intelligence."],
  ["04", "Advanced Infrastructure", "Technology designed to support larger and more connected operations."],
  ["05", "Connected Fintech Ecosystem", "A broader technology foundation connecting businesses across the ecosystem."],
];

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology, Security & Support"
        title="Technology Built for Trust"
        subtitle="Reliable. Scalable. Secure. Connected."
      />

      <Section>
        <SectionHeader
          eyebrow="Technology Infrastructure"
          title="A modern architecture designed for reliable digital business operations."
          text="The platform is structured to evolve as retailer networks, transaction requirements and business operations grow."
        />

        <div className="card-grid three">
          {technologyPillars.map(([Icon, title, text]) => (
            <PremiumCard
              key={title}
              icon={<Icon />}
              title={title}
              text={text}
            />
          ))}
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader
          eyebrow="Security-First Approach"
          title="Security is a fundamental part of platform design and operations."
          text="This website intentionally avoids claiming certifications, encryption standards or regulatory approvals that have not been officially supplied."
        />

        <div className="security-grid">
          {securityPillars.map(([Icon, title, text]) => (
            <PremiumCard
              key={title}
              icon={<Icon />}
              title={title}
              text={text}
            />
          ))}
        </div>

        <div className="security-note reveal">
          <ShieldCheck size={20} />
          <div>
            <strong>Responsible Technology</strong>
            <p>
              Security, privacy and responsible technology practices remain
              important principles in the long-term Rudraa Cash vision.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Technology Principles"
          title="Built around four practical principles."
          text="Technology should make connected business simpler, more dependable and easier to scale."
        />

        <div className="card-grid four">
          <PremiumCard
            icon={<Zap />}
            title="Speed"
            text="Responsive digital experiences and efficient operational workflows."
          />

          <PremiumCard
            icon={<ShieldCheck />}
            title="Trust"
            text="Responsible technology and dependable business infrastructure."
          />

          <PremiumCard
            icon={<Layers3 />}
            title="Scalability"
            text="A foundation designed to evolve with business requirements."
          />

          <PremiumCard
            icon={<BarChart3 />}
            title="Visibility"
            text="Technology that can support clearer business information and decision-making."
          />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Support"
          title="Technology alone is not enough."
          text="Our support approach is designed to provide retailers and business partners with responsive assistance."
        />

        <div className="support-callout reveal">
          <Network />

          <div>
            <span className="eyebrow">People + Platform</span>
            <h3>Connected technology works better with connected support.</h3>
            <p>
              Business partners should be able to access clear, responsive
              assistance while using technology designed around their needs.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Technology Roadmap"
          title="Foundation → Automation → Analytics → Advanced Infrastructure → Connected Fintech Ecosystem"
          text="A long-term technology direction, not a representation of current production capabilities."
        />

        <div className="tech-roadmap">
          {roadmap.map(([number, title, text]) => (
            <article className="tech-step reveal" key={title}>
              <span>{number}</span>

              <div>
                <b>{title}</b>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTA
        title="Technology We Build. Trust We Earn."
        text="A technology-first approach grounded in responsible business practices."
      />
    </>
  );
}
