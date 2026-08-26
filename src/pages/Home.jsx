import { ArrowRight, BriefcaseBusiness, Link2, MonitorCog, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { AppMockup, Button, CTA, InfinityVisual, PremiumCard, Section, SectionHeader, PageHero } from "../components/Layout";

export default function Home() {
  return (
    <>
      <PageHero eyebrow="Rudraa Business Solutions Pvt. Ltd." title="RUDRAA CASH" subtitle="प्रारंभ से अनंत तक">
        <div className="hero-copy">
          <p className="hero-lead">Building India’s Next-Generation Fintech Ecosystem</p>
          <p>Rudraa Cash is being built as a technology-driven B2B platform designed to connect retailers, businesses and distribution networks through reliable digital infrastructure and business-focused solutions.</p>
          <div className="hero-actions">
            <Button to="/rudraa-cash">Explore Rudraa Cash</Button>
            <Button to="/contact" variant="ghost">Join the Rudraa Ecosystem</Button>
          </div>
        </div>
        <InfinityVisual />
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Why Rudraa Cash" title="A business ecosystem designed to move forward." text="Premium technology, practical support and long-term thinking come together around the retailer." />
        <div className="card-grid four">
          <PremiumCard icon={<BriefcaseBusiness />} title="Retailer First" text="Technology and support built around retailers." />
          <PremiumCard icon={<Link2 />} title="Connected Business" text="Connecting businesses through a scalable ecosystem." />
          <PremiumCard icon={<MonitorCog />} title="Technology Driven" text="Modern infrastructure designed for digital business." />
          <PremiumCard icon={<TrendingUp />} title="Built to Grow" text="Designed with long-term scalability in mind." />
        </div>
      </Section>

      <Section className="split-section">
        <div className="split-copy reveal">
          <span className="eyebrow">Mobile Experience</span>
          <h2>Your Business. Connected.</h2>
          <p>A modern mobile experience designed to make business operations simple, accessible and connected.</p>
          <p className="muted">The interface shown is conceptual/prototype UI only and does not represent real company data.</p>
          <Button to="/rudraa-cash">Explore Rudraa Cash</Button>
        </div>
        <AppMockup />
      </Section>

      <Section className="brand-section">
        <div className="brand-statement reveal">
          <span className="eyebrow">Brand Philosophy</span>
          <h2>प्रारंभ से अनंत तक</h2>
          <p>Begin. Connect. Grow. Evolve.</p>
          <InfinityVisual compact />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Our Values" title="The principles behind the platform." />
        <div className="value-strip">
          {["Trust", "Growth", "Partnership", "Innovation"].map((v, i) => (
            <Link className="value-chip reveal" key={v} to="/core-values"><span>0{i + 1}</span>{v}<ArrowRight size={16} /></Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
