import { ArrowDown, BarChart3, Link2, LifeBuoy, Smartphone, Store, TrendingUp } from "lucide-react";
import { CTA, PageHero, PremiumCard, Section, SectionHeader } from "../components/Layout";

export default function Retailers() {
  return (
    <>
      <PageHero eyebrow="Empowering India. Empowering Retailers." title="Technology becomes powerful when it creates opportunity." subtitle="Rudraa Cash is being shaped around the retailer as a core business touchpoint of a connected ecosystem." />
      <Section>
        <SectionHeader eyebrow="Indian Retail Ecosystem" title="Retailers are part of India's everyday business network." text="A connected digital future depends on practical tools, reliable support and technology that works around real business needs." />
        <div className="ecosystem-banner reveal"><Store /><span>Retailer</span><b>→</b><span>Digital Tools</span><b>→</b><span>Connected Operations</span><b>→</b><span>Business Visibility</span><b>→</b><span>Growth</span></div>
      </Section>
      <Section className="dark-panel">
        <SectionHeader eyebrow="Retailer Challenges" title="The opportunity is not only digital. It is operational." />
        <div className="card-grid five">
          {["Fragmented Operations", "Limited Technology Access", "Operational Complexity", "Need for Reliable Support", "Growing Digital Expectations"].map((x, i) => <PremiumCard key={x} icon={<span className="number-icon">0{i + 1}</span>} title={x} text="A business challenge that connected technology can help address." />)}
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Digital Transformation" title="From traditional business to connected growth." />
        <div className="transformation">
          {["Traditional Business", "Digital Tools", "Connected Operations", "Business Visibility", "Growth"].map((x, i) => <div className="transform-step reveal" key={x}><span>{i + 1}</span><b>{x}</b>{i < 4 && <ArrowDown />}</div>)}
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Retailer Empowerment" title="Five practical pillars." />
        <div className="card-grid five">
          <PremiumCard icon={<Smartphone />} title="Technology" text="Access to a modern digital business experience." />
          <PremiumCard icon={<Link2 />} title="Connectivity" text="A connected point within the wider network." />
          <PremiumCard icon={<LifeBuoy />} title="Support" text="Business-focused assistance when it matters." />
          <PremiumCard icon={<BarChart3 />} title="Efficiency" text="Clearer workflows and better business visibility." />
          <PremiumCard icon={<TrendingUp />} title="Growth" text="A platform vision designed to grow with the network." />
        </div>
      </Section>
      <CTA title="One Retailer at a Time." text="Today — One Retailer · Tomorrow — Thousands · Future — A Nationwide Network · प्रारंभ से अनंत तक" />
    </>
  );
}
