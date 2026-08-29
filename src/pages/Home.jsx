import {
  ArrowRight,
  BriefcaseBusiness,
  Link2,
  MonitorCog,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import {
  AppMockup,
  Button,
  CTA,
  InfinityVisual,
  PremiumCard,
  Section,
  SectionHeader,
  PageHero,
} from "../components/Layout";

export default function Home() {
  return (
    <div className="home-page">
      <PageHero
        title={
          <>
            <span className="brand-white">Rudraa</span>{" "}
            <span className="brand-blue">Cash</span>
          </>
        }
        subtitle={
          <>
            <span className="hero-tagline-white">प्रारंभ से</span>{" "}
            <span className="hero-tagline-blue">अनंत तक</span>
          </>
        }
      >
        <div className="hero-copy hero-copy--brand">
          <p className="hero-supporting">
            <span>Empowering Retailers,</span>{" "}
            <strong>Empowering India.</strong>
            <br />
            <span>Your Growth,</span>{" "}
            <strong>Our Commitment.</strong>
          </p>

          <div className="hero-actions">
            <Button to="/rudraa-cash">
              Explore Rudraa Cash
            </Button>

            <Button
              to="/contact"
              variant="ghost"
            >
              Join the Rudraa Ecosystem
            </Button>
          </div>
        </div>

        <InfinityVisual />
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Why Rudraa Cash"
          title="A business ecosystem designed to move forward."
          text="Premium technology, practical support and long-term thinking come together around the retailer."
        />

        <div className="card-grid four">
          <PremiumCard
            icon={<BriefcaseBusiness />}
            title="Retailer First"
            text="Technology and support built around retailers."
          />

          <PremiumCard
            icon={<Link2 />}
            title="Connected Business"
            text="Connecting businesses through a scalable ecosystem."
          />

          <PremiumCard
            icon={<MonitorCog />}
            title="Technology Driven"
            text="Modern infrastructure designed for digital business."
          />

          <PremiumCard
            icon={<TrendingUp />}
            title="Built to Grow"
            text="Designed with long-term scalability in mind."
          />
        </div>
      </Section>

      <Section className="split-section">
        <div className="split-copy reveal">
          <span className="eyebrow">
            Mobile Experience
          </span>

          <h2>Your Business. Connected.</h2>

          <p>
            A modern mobile experience designed to make
            business operations simple, accessible and
            connected.
          </p>

          <p className="muted">
            The interface shown is conceptual/prototype UI
            only and does not represent real company data.
          </p>

          <Button to="/rudraa-cash">
            Explore Rudraa Cash
          </Button>
        </div>

        <AppMockup />
      </Section>

      <Section className="brand-section">
        <div className="brand-statement reveal">
          <span className="eyebrow">
            Brand Philosophy
          </span>

          <h2>
            <span className="brand-white">
              प्रारंभ से
            </span>{" "}
            <span className="brand-blue">
              अनंत तक
            </span>
          </h2>

          <p>
            Begin. Connect. Grow. Evolve.
          </p>

          <InfinityVisual compact />
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Our Values"
          title="The principles behind the platform."
        />

        <div className="value-strip">
          {["Trust", "Growth", "Partnership", "Innovation"].map(
            (value, index) => (
              <Link
                className="value-chip reveal"
                key={value}
                to="/core-values"
              >
                <span>
                  0{index + 1}
                </span>

                {value}

                <ArrowRight size={16} />
              </Link>
            )
          )}
        </div>
      </Section>

      <CTA />
    </div>
  );
}
