import { useState } from "react";
import { ArrowRight, CheckCircle2, Compass, Flag, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import { CTA, PageHero, Section, SectionHeader } from "../components/Layout";
import { longRoadmap, roadmap } from "../data/siteData";

export default function VisionMission() {
  const [active, setActive] = useState(0);
  const [activeYear, setActiveYear] = useState(0);
  return (
    <>
      <PageHero eyebrow="Vision & Mission" title="Our Vision. Our Mission." subtitle="A retailer-centric technology vision built around trust, simplicity and sustainable growth." />
      <Section>
        <div className="vision-card reveal">
          <span className="eyebrow">Our Vision</span>
          <h2>To build Rudraa Cash into a trusted, technology-driven B2B fintech ecosystem that empowers retailers, simplifies financial transactions, and creates sustainable business growth across India.</h2>
          <p>Rudraa Cash is not intended to be just a Digital Money Transfer service. Our vision is to build a retailer-centric ecosystem where technology, transaction infrastructure, wallet support, efficient settlement and dedicated business support work together.</p>
        </div>
      </Section>
      <Section className="dark-panel">
        <SectionHeader eyebrow="Our Mission" title="Empower Retailers. Simplify Transactions. Build Trust. Create Growth." />
        <div className="mission-grid">
          {[
            [Compass, "Empower Retailers", "Provide reliable technology, business support and transaction infrastructure that helps retailers strengthen and grow their businesses."],
            [CheckCircle2, "Simplify Transactions", "Make financial transactions simple, fast, reliable, secure and transparent through efficient technology and business processes."],
            [ShieldCheck, "Build Trust", "Build long-term relationships through transparency, reliability, responsible practices and consistent service."],
            [TrendingUp, "Create Growth", "Create an ecosystem where retailer growth and Rudraa growth move together."],
          ].map(([Icon, title, text], i) => <button className={`mission-card reveal ${active === i ? "active" : ""}`} key={title} onClick={() => setActive(i)}><Icon /><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></button>)}
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Three-Year Roadmap" title="Foundation → Expansion → Scale" text="A strategic vision, not a guarantee or current operating status." />
        <div className="roadmap-grid">
          {roadmap.map(([year, title, text], i) => <article className="roadmap-card reveal" key={year}><span>{year}</span><h3>{title}</h3><p>{text}</p><b>0{i + 1}</b></article>)}
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Seven-Year Vision" title="A longer journey from build to ecosystem." />
        <div className="seven-roadmap">
          {longRoadmap.map(([year, title], i) => <button type="button" className={`seven-node reveal ${activeYear === i ? "active" : ""}`} key={year} onClick={() => setActiveYear(i)} aria-pressed={activeYear === i}><span>{i + 1}</span><b>{year}</b><small>{title}</small></button>)}
        </div>
      </Section>
      <div className="container roadmap-focus reveal" aria-live="polite"><span className="eyebrow">Selected Roadmap Stage</span><strong>{longRoadmap[activeYear][0]} — {longRoadmap[activeYear][1]}</strong></div>
      <CTA title="Rudraa Cash — A Trusted B2B Fintech Ecosystem" text="A long-term vision built around retailers, technology and connected growth." />
    </>
  );
}
