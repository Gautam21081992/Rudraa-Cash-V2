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
          RUDRA
          <span className="brand-last-a">A</span>
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
            type="button"
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

/* =========================================================
   PREMIUM 3D INFINITY VISUAL
   ========================================================= */

export function InfinityVisual({
  compact = false,
}) {
  const pathId = `infinity-tube-path-${
    compact ? "compact" : "hero"
  }`;

  const blueGradientId = `infinity-blue-${
    compact ? "compact" : "hero"
  }`;

  const highlightGradientId =
    `infinity-highlight-${
      compact ? "compact" : "hero"
    }`;

  const glowId = `infinity-glow-${
    compact ? "compact" : "hero"
  }`;

  const strongGlowId =
    `infinity-strong-glow-${
      compact ? "compact" : "hero"
    }`;

  const trailGlowId =
    `infinity-trail-${
      compact ? "compact" : "hero"
    }`;

  return (
    <div
      className={`infinity-visual ${
        compact
          ? "infinity-visual--compact"
          : ""
      }`}
      aria-label="Animated 3D infinity symbol representing continuity and limitless growth"
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
        className="infinity-svg infinity-svg--3d"
        viewBox="0 0 240 180"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Main blue/cyan tube material */}
          <linearGradient
            id={blueGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#001957"
            />

            <stop
              offset="18%"
              stopColor="#003eb8"
            />

            <stop
              offset="42%"
              stopColor="#00aaff"
            />

            <stop
              offset="58%"
              stopColor="#0080ff"
            />

            <stop
              offset="80%"
              stopColor="#0043c5"
            />

            <stop
              offset="100%"
              stopColor="#00133f"
            />
          </linearGradient>

          {/* Glossy surface highlight */}
          <linearGradient
            id={highlightGradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity="0.78"
            />

            <stop
              offset="20%"
              stopColor="#a8efff"
              stopOpacity="0.62"
            />

            <stop
              offset="45%"
              stopColor="#ffffff"
              stopOpacity="0.12"
            />

            <stop
              offset="100%"
              stopColor="#00164d"
              stopOpacity="0.72"
            />
          </linearGradient>

          {/* Wide ambient glow */}
          <filter
            id={glowId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="10"
            />
          </filter>

          {/* Strong glow */}
          <filter
            id={strongGlowId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              stdDeviation="4.5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Energy trail glow */}
          <filter
            id={trailGlowId}
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="5"
              result="trailBlur"
            />

            <feMerge>
              <feMergeNode in="trailBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Actual infinity path */}
          <path
            id={pathId}
            d="
              M 120 90
              C 94 44 72 22 49 22
              C 27 22 18 39 22 57
              C 26 76 43 90 63 90
              C 84 90 101 77 120 90
              C 139 103 156 90 177 90
              C 197 90 214 76 218 57
              C 222 39 213 22 191 22
              C 168 22 146 44 120 90
              C 94 136 72 158 49 158
              C 27 158 18 141 22 123
              C 26 104 43 90 63 90
              C 84 90 101 103 120 90
              C 139 77 156 90 177 90
              C 197 90 214 104 218 123
              C 222 141 213 158 191 158
              C 168 158 146 136 120 90
            "
            fill="none"
          />
        </defs>

        {/* =================================================
            AMBIENT LIGHT
           ================================================= */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#007cff"
          strokeWidth="34"
          strokeLinecap="round"
          opacity="0.12"
          filter={`url(#${glowId})`}
        />

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#00c8ff"
          strokeWidth="25"
          strokeLinecap="round"
          opacity="0.18"
          filter={`url(#${strongGlowId})`}
        />

        {/* =================================================
            OUTER 3D EDGE
           ================================================= */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#000c2b"
          strokeWidth="19"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />

        {/* =================================================
            SOLID BLUE TUBE
           ================================================= */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${blueGradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* =================================================
            INNER ELECTRIC BLUE LIGHT
           ================================================= */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#008fff"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.88"
        />

        {/* =================================================
            GLOSSY SPECULAR HIGHLIGHT
           ================================================= */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${highlightGradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.92"
        />

        {/* =================================================
            MOVING ENERGY AURA
           ================================================= */}

        <circle
          r="14"
          fill="#00d5ff"
          opacity="0.26"
          filter={`url(#${trailGlowId})`}
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

        {/* =================================================
            ENERGY TRAIL
           ================================================= */}

        <circle
          r="9"
          fill="#8deeff"
          opacity="0.28"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.28s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        <circle
          r="7"
          fill="#d9fbff"
          opacity="0.42"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.18s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        <circle
          r="5.5"
          fill="#ffffff"
          opacity="0.68"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.09s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* =================================================
            MAIN WHITE ENERGY POINT
           ================================================= */}

        <circle
          r="11"
          fill="#ffffff"
          opacity="0.22"
          filter={`url(#${strongGlowId})`}
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

        <circle
          r="6"
          fill="#ffffff"
          filter={`url(#${strongGlowId})`}
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
          r="2.4"
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
