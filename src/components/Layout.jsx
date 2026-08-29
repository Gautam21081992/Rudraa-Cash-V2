import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, contact } from "../data/siteData";
import { usePageMeta } from "../hooks/usePageMeta";

function Logo({ compact = false }) {
  return (
    <Link
      className={`brand ${compact ? "brand--compact" : ""}`}
      to="/"
      aria-label="Rudraa Cash home"
    >
      <img
        src="/assets/logo/rudraa_logo_clean_transparent.png"
        alt="Rudraa logo"
      />

      <span className="brand-copy">
        <strong className="rudraa-wordmark">
          RUDRA<span className="brand-last-a">A</span>
        </strong>
      </span>
    </Link>
  );
}

export function Layout({ children }) {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  usePageMeta(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(
      ".reveal:not(.is-visible)"
    );

    if (!revealItems.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <div className="container nav-inner">
          <Logo />

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                className={
                  location.pathname === item.path
                    ? "nav-link active"
                    : "nav-link"
                }
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="nav-cta"
            to="/contact"
          >
            Join Rudraa
            <ArrowUpRight size={16} />
          </Link>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "mobile-link active"
                    : "mobile-link"
                }
              >
                {item.label}
              </Link>
            ))}

            <a
              className="mobile-contact"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo compact />

          <p className="footer-tag">
            <span>प्रारंभ से</span>{" "}
            <b>अनंत तक</b>
          </p>

          <p className="muted">
            Building India’s Next-Generation Fintech
            Ecosystem
          </p>
        </div>

        <div>
          <h3>Explore</h3>

          <div className="footer-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Contact</h3>

          <div className="footer-links">
            <a href={contact.phoneHref}>
              {contact.phone}
            </a>

            <a href={contact.emailHref}>
              {contact.email}
            </a>

            <span>{contact.address}</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Rudraa Business
          Solutions Pvt. Ltd.
        </span>

        <span>
          RUDRAA BUSINESS SOLUTIONS PVT. LTD.
        </span>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}) {
  return (
    <section className="page-hero">
      <div
        className="hero-orb orb-a"
        aria-hidden="true"
      />

      <div
        className="hero-orb orb-b"
        aria-hidden="true"
      />

      <div className="container hero-content reveal">
        {eyebrow && (
          <span className="eyebrow">
            {eyebrow}
          </span>
        )}

        <h1>{title}</h1>

        {subtitle && <p>{subtitle}</p>}

        {children}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  id,
}) {
  return (
    <section
      id={id}
      className={`section ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
}) {
  return (
    <div
      className={`section-header ${
        align === "center" ? "center" : ""
      } reveal`}
    >
      {eyebrow && (
        <span className="eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

export function Button({
  to,
  href,
  children,
  variant = "primary",
  external = false,
}) {
  const cls = `button button--${variant}`;

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={
          external ? "_blank" : undefined
        }
        rel={
          external ? "noreferrer" : undefined
        }
      >
        {children}
        <ArrowUpRight size={17} />
      </a>
    );
  }

  return (
    <Link
      className={cls}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}

export function PremiumCard({
  icon,
  title,
  text,
  className = "",
}) {
  return (
    <article
      className={`premium-card reveal ${className}`}
    >
      {icon && (
        <div className="card-icon">
          {icon}
        </div>
      )}

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

export function InfinityVisual({
  compact = false,
}) {
  const pathId = `infinity-path-${
    compact ? "compact" : "hero"
  }`;

  const gradientId = `infinity-gradient-${
    compact ? "compact" : "hero"
  }`;

  const glowFilterId = `infinity-glow-filter-${
    compact ? "compact" : "hero"
  }`;

  const trailFilterId = `infinity-trail-filter-${
    compact ? "compact" : "hero"
  }`;

  return (
    <div
      className={`infinity-visual ${
        compact
          ? "infinity-visual--compact"
          : ""
      }`}
      aria-label="Animated infinity symbol representing continuity and limitless growth"
    >
      <div
        className="infinity-glow"
        aria-hidden="true"
      />

      <div
        className="infinity-platform"
        aria-hidden="true"
      />

      <svg
        className="infinity-svg"
        viewBox="0 0 240 180"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#0877ff"
            />

            <stop
              offset="50%"
              stopColor="#00d5ff"
            />

            <stop
              offset="100%"
              stopColor="#176dff"
            />
          </linearGradient>

          <filter
            id={glowFilterId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id={trailFilterId}
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="3.5"
              result="trailBlur"
            />

            <feMerge>
              <feMergeNode in="trailBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <path
            id={pathId}
            d="
              M 120 90
              C 95 45 75 25 50 25
              C 20 25 20 65 50 90
              C 75 115 95 135 120 90
              C 145 45 165 25 190 25
              C 220 25 220 65 190 90
              C 165 115 145 135 120 90
            "
            fill="none"
          />
        </defs>

        {/* Ambient blue aura */}
        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#008cff"
          strokeWidth="24"
          strokeLinecap="round"
          opacity="0.16"
          filter={`url(#${glowFilterId})`}
        />

        {/* Secondary glow */}
        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#00c6ff"
          strokeWidth="15"
          strokeLinecap="round"
          opacity="0.18"
          filter={`url(#${trailFilterId})`}
        />

        {/* Main infinity body */}
        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fine white highlight */}
        <use
          href={`#${pathId}`}
          fill="none"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Moving blue aura */}
        <circle
          r="10"
          fill="#39cfff"
          opacity="0.30"
          filter={`url(#${trailFilterId})`}
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* Soft white glow point */}
        <circle
          r="7"
          fill="#ffffff"
          opacity="0.45"
          filter={`url(#${glowFilterId})`}
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* Main white point */}
        <circle
          r="4.8"
          fill="#ffffff"
          filter={`url(#${glowFilterId})`}
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* White-hot center */}
        <circle
          r="2"
          fill="#ffffff"
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>
      </svg>

      {!compact && (
        <div className="infinity-caption">
          <span>Continuity</span>
          <i>•</i>
          <span>Limitless Growth</span>
          <i>•</i>
          <span>Endless Possibilities</span>
        </div>
      )}
    </div>
  );
}

export function AppMockup() {
  const rows = [
    ["Dashboard", "Business overview"],
    ["Wallet", "Digital wallet"],
    ["Transactions", "Activity view"],
    ["Settlement", "Settlement flow"],
    ["Support", "Business assistance"],
  ];

  return (
    <div className="phone-wrap reveal">
      <div className="phone">
        <div className="phone-notch" />

        <div className="phone-top">
          <span>Rudraa Cash</span>
          <span className="status-dot" />
        </div>

        <div className="app-balance">
          <small>
            Prototype dashboard
          </small>

          <strong>
            Business Hub
          </strong>

          <span>
            Conceptual interface — no real
            financial data
          </span>
        </div>

        <div className="app-grid">
          {rows.map(
            ([name, desc], index) => (
              <div
                className="app-tile"
                key={name}
              >
                <span>
                  0{index + 1}
                </span>

                <b>{name}</b>

                <small>
                  {desc}
                </small>
              </div>
            )
          )}
        </div>

        <div className="app-footer">
          <span>Home</span>
          <span>Activity</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  );
}

export function CTA({
  title = "Build the Future With Rudraa",
  text = "Join the Rudraa ecosystem.",
  primary = "Explore Rudraa Cash",
}) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-card reveal">
          <div>
            <span className="eyebrow">
              RUDRAA CASH
            </span>

            <h2>{title}</h2>

            <p>{text}</p>
          </div>

          <div className="cta-actions">
            <Button to="/rudraa-cash">
              {primary}
            </Button>

            <Button
              to="/contact"
              variant="ghost"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
