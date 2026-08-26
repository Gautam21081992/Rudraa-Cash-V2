import { Activity, Database, Lock, Network, Scale, ServerCog, ShieldCheck } from "lucide-react";
import { CTA, PageHero, PremiumCard, Section, SectionHeader } from "../components/Layout";

export default function Technology() {
  return (
    <>
      <PageHero eyebrow="Technology, Security & Support" title="Technology Built for Trust" subtitle="Reliable. Scalable. Secure. Connected." />
      <Section>
        <SectionHeader eyebrow="Technology Infrastructure" title="A modern architecture designed for reliable digital business operations." text="The platform is structured to evolve as retailer networks, transaction requirements and business operations grow." />
        <div className="card-grid three">
          <PremiumCard icon={<ServerCog />} title="Reliable Platform" text="Designed for operational consistency, availability and dependable user experience." />
          <PremiumCard icon={<Scale />} title="Scalability" text="Designed to evolve as retailer networks and business requirements grow." />
          <PremiumCard icon={<Activity />} title="Performance" text="Focused on efficient workflows, responsive interfaces and smooth digital experiences." />
        </div>
      </Section>
      <Section className="dark-panel">
        <SectionHeader eyebrow="Security-First Approach" title="Security is a fundamental part of platform design and operations." text="This website intentionally avoids claiming certifications, encryption standards or regulatory approvals that have not been officially supplied." />
        <div className="security-grid">
          <PremiumCard icon={<ShieldCheck />} title="Security by Design" text="Security and responsible technology remain fundamental to a digital business platform." />
          <PremiumCard icon={<Lock />} title="Data Protection" text="Responsible handling of business and transaction-related information with a strong focus on privacy and protection." />
          <PremiumCard icon={<Database />} title="Responsible Infrastructure" text="Technology decisions are structured to support dependable business operations." />
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Support" title="Technology alone is not enough." text="Our support approach is designed to provide retailers and business partners with responsive assistance." />
        <div className="support-callout reveal"><Network /><div><h3>People + Platform</h3><p>Connected technology works better when business partners can access clear, responsive support.</p></div></div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Technology Roadmap" title="Foundation → Automation → Analytics → Advanced Infrastructure → Connected Fintech Ecosystem" />
        <div className="tech-roadmap">{["Foundation", "Automation", "Analytics", "Advanced Infrastructure", "Connected Fintech Ecosystem"].map((x, i) => <div className="tech-step reveal" key={x}><span>{String(i + 1).padStart(2, "0")}</span><b>{x}</b></div>)}</div>
      </Section>
      <CTA title="Technology We Build. Trust We Earn." text="A technology-first approach grounded in responsible business practices." />
    </>
  );
}
