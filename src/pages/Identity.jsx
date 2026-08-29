import { useState } from "react";
import {
  Button,
  PageHero,
  Section,
  SectionHeader,
  CTA,
} from "../components/Layout";

const identity = [
  [
    "R",
    "RUDRAA",
    "Identity • Foundation • Brand",
    "The R represents Rudraa and forms the foundation of the brand identity.",
    "R",
  ],
  [
    "Trident",
    "TRIDENT",
    "Strength • Direction • Identity",
    "The Trident represents strength, direction and distinctive identity.",
    "🔱",
  ],
  [
    "∞",
    "INFINITY",
    "Continuity • Limitless Growth • Endless Possibilities",
    "Infinity represents the continuous journey of Rudraa and its long-term ambition.",
    "∞",
  ],
];

const brandColors = [
  [
    "Dark Navy",
    "Trust · Stability · Professionalism",
    "#020b1d",
  ],
  [
    "Royal Blue",
    "Confidence · Technology · Leadership",
    "#064ed7",
  ],
  [
    "Electric / Cyan Blue",
    "Innovation · Energy · Digital Future",
    "#00bff9",
  ],
  [
    "White",
    "Clarity · Transparency · Simplicity",
    "#ffffff",
  ],
];

export default function Identity() {
  const [active, setActive] = useState(0);

  const activeIdentity = identity[active];

  return (
    <>
      <PageHero
        eyebrow="Rudraa Identity"
        title="The Identity Behind Rudraa"
        subtitle="Every symbol has a purpose. Every element represents a part of our journey."
      />

      <Section>
        <SectionHeader
          eyebrow="Logo Philosophy"
          title="One mark. Three ideas. One journey."
          text="The supplied official logo remains the brand identity; this section explains its conceptual elements without redesigning the mark."
        />

        <div className="identity-layout">
          <div className="logo-stage reveal">
            <img
              src="/assets/logo/rudraa_logo_clean_transparent.png"
              alt="Official Rudraa R, Trident and Infinity logo"
            />
          </div>

          <div className="identity-controls">
            {identity.map(
              ([label, title, tags, text, symbol], index) => (
                <button
                  key={label}
                  type="button"
                  className={`identity-tab ${
                    active === index ? "active" : ""
                  }`}
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                >
                  <span
                    className="symbol-badge"
                    aria-hidden="true"
                  >
                    {symbol}
                  </span>

                  <span>
                    <b>{title}</b>
                    <small>{tags}</small>
                  </span>
                </button>
              )
            )}

            <div className="identity-detail reveal">
              <span className="eyebrow">
                {activeIdentity[1]}
              </span>

              <h3>{activeIdentity[2]}</h3>

              <p>{activeIdentity[3]}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Colour Philosophy"
          title="A visual language built for trust and technology."
          text="Our visual system combines depth, confidence, energy and clarity to create a consistent digital identity."
        />

        <div className="color-grid">
          {brandColors.map(([name, text, color]) => (
            <div
              className="color-card reveal"
              key={name}
            >
              <i
                style={{ background: color }}
                aria-hidden="true"
              />

              <b>{name}</b>

              <span>{text}</span>
            </div>
          ))}
        </div>
      </Section>

      <CTA
        title="One Identity. One Philosophy. An Endless Journey."
        text="प्रारंभ से अनंत तक"
        primary="Explore Rudraa Cash"
      />
    </>
  );
}
