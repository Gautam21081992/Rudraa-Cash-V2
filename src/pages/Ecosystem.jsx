import { useState } from "react";
import { Building2, ChevronRight, Network, Store, UserRound } from "lucide-react";
import { CTA, PageHero, Section, SectionHeader } from "../components/Layout";

const nodes = [
  ["Company", "Technology, infrastructure, business strategy and ecosystem development.", Building2],
  ["Distributor", "Network development, retailer support and regional connectivity.", Network],
  ["Retailer", "The core business touchpoint of the ecosystem.", Store],
  ["Customer", "The end user receiving services through the connected network.", UserRound],
];

export default function Ecosystem() {
  const [active, setActive] = useState(2);
  return (
    <>
      <PageHero eyebrow="Retailer & Distributor Ecosystem" title="One Network. Multiple Connections." subtitle="The Rudraa Ecosystem connects company, distributor, retailer and customer through a shared technology vision." />
      <Section>
        <SectionHeader eyebrow="Main Interactive Flow" title="Company → Distributor → Retailer → Customer" />
        <div className="node-flow">
          {nodes.map(([title, text, Icon], i) => (
            <div className="node-wrap" key={title}>
              <button className={`ecosystem-node reveal ${active === i ? "active" : ""}`} onClick={() => setActive(i)} aria-pressed={active === i}>
                <Icon /><span>{title}</span><small>{i === 0 ? "01" : i === 1 ? "02" : i === 2 ? "03" : "04"}</small>
              </button>
              {i < 3 && <ChevronRight className="node-arrow" />}
            </div>
          ))}
        </div>
        <div className="node-detail reveal"><span className="eyebrow">{nodes[active][0]}</span><h3>{nodes[active][1]}</h3></div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader eyebrow="Business Connectivity" title="Every connection strengthens the network." />
        <div className="connection-grid">
          {["Company ↔ Distributor", "Distributor ↔ Retailer", "Retailer ↔ Customer", "Technology ↔ Entire Network"].map((x, i) => <div className="connection-card reveal" key={x}><span>0{i + 1}</span><b>{x}</b></div>)}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Retailer Network Effect" title="Illustrative milestones, not current company statistics." />
        <div className="network-ladder">
          {[["1", "Retailer", "1 Business Point"], ["100", "Retailers", "1 Growing Network"], ["1,000", "Retailers", "A Strong Distribution Network"], ["10,000+", "Retailers", "A Scalable Fintech Ecosystem"]].map(([num, title, desc], i) => <div className="ladder-card reveal" key={num}><span>0{i + 1}</span><strong>{num}</strong><b>{title}</b><p>{desc}</p></div>)}
        </div>
      </Section>
      <CTA title="Support the Retailer. Strengthen the Network. Build the Ecosystem." text="Connectivity, operational efficiency, network growth, business support and scalability." />
    </>
  );
}
