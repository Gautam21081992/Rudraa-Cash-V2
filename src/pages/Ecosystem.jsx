import { useState } from "react";
import {
  Building2,
  ChevronRight,
  Network,
  Store,
  UserRound,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  CTA,
  PageHero,
  Section,
  SectionHeader,
} from "../components/Layout";

const nodes = [
  [
    "Company",
    "Technology, infrastructure, business strategy and ecosystem development.",
    Building2,
  ],
  [
    "Distributor",
    "Network development, retailer support and regional connectivity.",
    Network,
  ],
  [
    "Retailer",
    "The core business touchpoint of the ecosystem.",
    Store,
  ],
  [
    "Customer",
    "The end user receiving services through the connected network.",
    UserRound,
  ],
];

const connections = [
  ["Company ↔ Distributor", "Network strategy and regional connectivity."],
  ["Distributor ↔ Retailer", "Retailer support and network development."],
  ["Retailer ↔ Customer", "Services delivered through the connected business network."],
  ["Technology ↔ Entire Network", "Digital infrastructure connecting every layer."],
];

const milestones = [
  ["01", "1", "Retailer", "One connected business point."],
  ["02", "100", "Retailers", "A growing connected network."],
  ["03", "1,000", "Retailers", "A stronger distribution network."],
  ["04", "10,000+", "Retailers", "A scalable ecosystem vision."],
];

export default function Ecosystem() {
  const [active, setActive] = useState(2);

  return (
    <>
      <PageHero
        eyebrow="Retailer & Distributor Ecosystem"
        title="One Network. Multiple Connections."
        subtitle="The Rudraa Ecosystem connects company, distributor, retailer and customer through a shared technology vision."
      />

      <Section>
        <SectionHeader
          eyebrow="Main Interactive Flow"
          title="Company → Distributor → Retailer → Customer"
          text="Each layer has a distinct role while remaining connected through the wider Rudraa ecosystem."
        />

        <div className="node-flow">
          {nodes.map(([title, text, Icon], i) => (
            <div className="node-wrap" key={title}>
              <button
                type="button"
                className={`ecosystem-node reveal ${
                  active === i ? "active" : ""
                }`}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={`View ${title} ecosystem details`}
              >
                <Icon />
                <span>{title}</span>
                <small>{String(i + 1).padStart(2, "0")}</small>
              </button>

              {i < nodes.length - 1 && (
                <ChevronRight className="node-arrow" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className="node-detail reveal" aria-live="polite">
          <span className="eyebrow">{nodes[active][0]}</span>
          <h3>{nodes[active][1]}</h3>
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader
          eyebrow="Business Connectivity"
          title="Every connection strengthens the network."
          text="A connected ecosystem works when every participant contributes to a clear and scalable business flow."
        />

        <div className="connection-grid">
          {connections.map(([title, text], i) => (
            <div className="connection-card reveal" key={title}>
              <span>0{i + 1}</span>
              <b>{title}</b>
              <p>{text}</p>
              <ArrowRight size={17} aria-hidden="true" />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Network Effect"
          title="Growth begins with one connected business."
          text="Illustrative milestones for explaining the ecosystem model — not current company statistics or guaranteed targets."
        />

        <div className="network-ladder">
          {milestones.map(([number, count, title, description]) => (
            <div className="ladder-card reveal" key={number}>
              <span>{number}</span>
              <strong>{count}</strong>
              <b>{title}</b>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="split-section">
        <div className="split-copy reveal">
          <span className="eyebrow">Connected Growth</span>

          <h2>Technology connects the network. People create the growth.</h2>

          <p>
            Rudraa's ecosystem vision brings infrastructure, distributors,
            retailers and customers together through connected digital
            operations.
          </p>

          <p className="muted">
            The ecosystem described here represents the long-term product and
            business vision, not a claim of current network size or operating
            scale.
          </p>
        </div>

        <div className="premium-card ecosystem-highlight reveal">
          <div className="card-icon">
            <Network />
          </div>

          <h3>Connected by Design</h3>

          <p>
            Company, distributor, retailer and customer form a connected
            business journey supported by technology and operational
            infrastructure.
          </p>

          <div className="ecosystem-highlight-points">
            <div>
              <ShieldCheck size={18} />
              <span>Trust</span>
            </div>

            <div>
              <TrendingUp size={18} />
              <span>Growth</span>
            </div>

            <div>
              <Network size={18} />
              <span>Connectivity</span>
            </div>
          </div>
        </div>
      </Section>

      <CTA
        title="Support the Retailer. Strengthen the Network. Build the Ecosystem."
        text="Connectivity, operational efficiency, network growth, business support and scalability."
      />
    </>
  );
}
