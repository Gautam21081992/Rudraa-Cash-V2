import { ArrowDown, CheckCircle2, CircleDollarSign, Handshake, LayoutDashboard, Repeat2, WalletCards } from "lucide-react";
import { AppMockup, Button, CTA, PageHero, PremiumCard, Section, SectionHeader } from "../components/Layout";

export default function RudraaCash() {
  return (
    <>
      <PageHero eyebrow="RUDRAA CASH" title="Technology Designed Around Business" subtitle="Rudraa Cash is being built as a retailer-centric B2B fintech platform focused on simplifying digital transactions, supporting retailers and creating a connected business ecosystem.">
        <div className="hero-actions"><Button to="/contact">Join the Ecosystem</Button><Button to="/technology" variant="ghost">Explore Technology</Button></div>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Why Rudraa Cash?" title="Infrastructure for connected digital business." text="The platform vision brings reliable technology and practical business support together." />
        <div className="card-grid six">
          {[
            [<CircleDollarSign />, "Digital Money Transfer", "Technology designed to support digital transaction workflows."],
            [<WalletCards />, "Wallet Infrastructure", "A conceptual wallet layer for connected business operations."],
            [<Repeat2 />, "Settlement Operations", "Designed around clear, efficient settlement workflows."],
            [<LayoutDashboard />, "Retailer Management", "Business-focused tools designed around the retailer."],
            [<Handshake />, "Business Support", "Responsive assistance for retailers and business partners."],
            [<CheckCircle2 />, "Technology Platform", "A scalable foundation for future ecosystem capabilities."],
          ].map(([icon, title, text]) => <PremiumCard key={title} icon={icon} title={title} text={text} />)}
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader eyebrow="Product Workflow" title="From retailer to settlement." text="A conceptual workflow showing how connected operations can move through the platform." />
        <div className="flow">
          {["Retailer", "Rudraa Cash Platform", "Transaction Processing", "Settlement", "Business Visibility"].map((x, i) => (
            <div className="flow-step reveal" key={x}><span>{String(i + 1).padStart(2, "0")}</span><b>{x}</b>{i < 4 && <ArrowDown className="flow-arrow" />}</div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Retailer Benefits" title="Built around the realities of business." />
        <div className="benefit-grid">
          {[
            ["Simple", "Easy-to-understand business experience."],
            ["Reliable", "Focused on operational reliability."],
            ["Connected", "Part of a wider ecosystem."],
            ["Supported", "Dedicated retailer/business support."],
            ["Scalable", "Designed for future growth."],
          ].map(([t, d]) => <div className="benefit-card reveal" key={t}><b>{t}</b><p>{d}</p></div>)}
        </div>
      </Section>

      <Section className="split-section app-section">
        <AppMockup />
        <div className="split-copy reveal">
          <span className="eyebrow">App Experience</span>
          <h2>A modern interface for connected operations.</h2>
          <p>Dashboard, wallet, transactions, settlement and support are represented as conceptual product surfaces until actual app screens are supplied.</p>
          <Button to="/contact">Discuss the Ecosystem</Button>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Future Scalability" title="Foundation → Expansion → Scale → Ecosystem" />
        <div className="scale-line">
          {["Foundation", "Expansion", "Scale", "Ecosystem"].map((x, i) => <div key={x} className="scale-node reveal"><span>{i + 1}</span><b>{x}</b></div>)}
        </div>
      </Section>
      <CTA title="More Than a Transaction Platform" text="Rudraa Cash is the beginning of a larger Rudraa ecosystem." />
    </>
  );
}
