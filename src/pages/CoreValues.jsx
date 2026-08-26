import { ShieldCheck, UsersRound, Target, Lightbulb, HeartHandshake, LockKeyhole, TrendingUp, BadgeCheck } from "lucide-react";
import { CTA, PageHero, PremiumCard, Section, SectionHeader } from "../components/Layout";
import { values } from "../data/siteData";

const icons = [BadgeCheck, Lightbulb, ShieldCheck, LockKeyhole, TrendingUp, UsersRound, HeartHandshake, Target];

export default function CoreValues() {
  return (
    <>
      <PageHero eyebrow="Our Core Values" title="What We Stand For" subtitle="Our values guide how we build, operate and grow." />
      <Section>
        <div className="card-grid four">
          {values.map(([title, lead, text], i) => {
            const Icon = icons[i];
            return <PremiumCard key={title} icon={<Icon />} title={title} text={<><b>{lead}</b><br />{text}</>} />;
          })}
        </div>
      </Section>
      <Section className="formula-section">
        <div className="formula reveal">
          <span className="eyebrow">Value Formula</span>
          <h2>Trust + Innovation + Integrity + Security + Growth</h2>
          <p>That is the Rudraa way.</p>
        </div>
      </Section>
      <CTA title="Values That Move With Us" text="Trust, innovation and responsible growth remain central to the Rudraa journey." />
    </>
  );
}
