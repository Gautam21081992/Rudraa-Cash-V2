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

        <small>RUDRAA BUSINESS SOLUTIONS PVT. LTD.</small>
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

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
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
            {navItems.map((item) => {
              const active =
                location.pathname === item.path ||
                (item.path !== "/" &&
                  location.pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link className="nav-cta" to="/contact">
            Join Rudraa
            <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            className={`menu-button ${
              menuOpen ? "menu-button--open" : ""
            }`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-menu ${
            menuOpen ? "mobile-menu--open" : ""
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-menu-inner">
            {navItems.map((item) => {
              const active =
                location.pathname === item.path ||
                (item.path !== "/" &&
                  location.pathname.startsWith(`${item.path}/`));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  tabIndex={menuOpen ? 0 : -1}
                  className={`mobile-link ${
                    active ? "active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={17} />
                </Link>
              );
            })}

            <a
              className="mobile-contact"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
            >
              WhatsApp Us
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
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
            Building India’s Next-Generation Fintech Ecosystem
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
          © {new Date().getFullYear()} Rudraa Business Solutions Pvt. Ltd.
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

      <div className="container hero-content reveal is-visible">
        {eyebrow && (
          <span className="eyebrow">
            {eyebrow}
          </span>
        )}

        <h1>{title}</h1>

        {subtitle && (
          <p>{subtitle}</p>
        )}

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

      {text && (
        <p>{text}</p>
      )}
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
        target={external ? "_blank" : undefined}
        rel={
          external
            ? "noreferrer"
            : undefined
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
   FINAL RUDRAA CASH INFINITY VISUAL
   ========================================================= */

export function InfinityVisual({
  compact = false,
}) {
  const suffix = compact
    ? "compact"
    : "hero";

  const pathId =
    `infinity-path-${suffix}`;

  const gradientId =
    `infinity-gradient-${suffix}`;

  const glowId =
    `infinity-glow-${suffix}`;

  const strongGlowId =
    `infinity-strong-glow-${suffix}`;

  const platformGradientId =
    `infinity-platform-gradient-${suffix}`;

  return (
    <div
      className={`infinity-visual ${
        compact
          ? "infinity-visual--compact"
          : ""
      }`}
      role="img"
      aria-label="Animated neon infinity symbol representing continuity, limitless growth and endless possibilities"
    >
      <div
        className="infinity-bg"
        aria-hidden="true"
      >
        <div className="infinity-particles" />
        <div className="infinity-grid" />
      </div>

      <div className="infinity-container">
        <div
          className="infinity-glow"
          aria-hidden="true"
        />

        <svg
          className="infinity-svg"
          viewBox="0 0 900 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Main neon gradient */}
            <linearGradient
              id={gradientId}
              x1="120"
              y1="80"
              x2="780"
              y2="440"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="#075BFF"
              />

              <stop
                offset="35%"
                stopColor="#008CFF"
              />

              <stop
                offset="65%"
                stopColor="#00D9FF"
              />

              <stop
                offset="100%"
                stopColor="#0876FF"
              />
            </linearGradient>

            {/* Soft glow */}
            <filter
              id={glowId}
              x="-80%"
              y="-80%"
              width="260%"
              height="260%"
            >
              <feGaussianBlur
                stdDeviation="10"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong neon glow */}
            <filter
              id={strongGlowId}
              x="-150%"
              y="-150%"
              width="400%"
              height="400%"
            >
              <feGaussianBlur
                stdDeviation="18"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Infinity path */}
            <path
              id={pathId}
              d="
                M 170 260
                C 105 195, 125 105, 220 105
                C 315 105, 355 260, 450 260
                C 545 260, 585 105, 680 105
                C 775 105, 795 195, 730 260
                C 665 325, 775 415, 680 415
                C 585 415, 545 260, 450 260
                C 355 260, 315 415, 220 415
                C 125 415, 105 325, 170 260
              "
            />

            {/* Platform glow */}
            <radialGradient
              id={platformGradientId}
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(450 430) rotate(90) scale(70 300)"
            >
              <stop
                offset="0%"
                stopColor="rgba(0,198,255,0.45)"
              />

              <stop
                offset="55%"
                stopColor="rgba(0,110,255,0.18)"
              />

              <stop
                offset="100%"
                stopColor="rgba(0,0,0,0)"
              />
            </radialGradient>
          </defs>

          {/* Atmospheric glow behind infinity */}
          <ellipse
            cx="450"
            cy="300"
            rx="330"
            ry="145"
            fill="rgba(0,145,255,0.08)"
            filter={`url(#${strongGlowId})`}
          />

          {/* Outer neon glow */}
          <use
            href={`#${pathId}`}
            stroke="rgba(0,170,255,0.20)"
            strokeWidth="42"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${strongGlowId})`}
          />

          {/* Blue glow layer */}
          <use
            href={`#${pathId}`}
            stroke="rgba(0,119,255,0.45)"
            strokeWidth="25"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
          />

          {/* Main infinity body */}
          <use
            href={`#${pathId}`}
            stroke={`url(#${gradientId})`}
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cyan inner highlight */}
          <use
            href={`#${pathId}`}
            stroke="rgba(110,235,255,0.85)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fine white-blue highlight */}
          <use
            href={`#${pathId}`}
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Moving white energy point */}
          <circle
            className="infinity-energy-point"
            r="10"
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

          {/* Bright core */}
          <circle
            className="infinity-energy-core"
            r="4"
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

          {/* Futuristic platform */}
          <ellipse
            cx="450"
            cy="435"
            rx="285"
            ry="55"
            fill={`url(#${platformGradientId})`}
          />

          <ellipse
            cx="450"
            cy="432"
            rx="235"
            ry="34"
            stroke="rgba(0,198,255,0.35)"
            strokeWidth="2"
          />

          <ellipse
            cx="450"
            cy="432"
            rx="185"
            ry="24"
            stroke="rgba(0,119,255,0.5)"
            strokeWidth="2"
          />

          <ellipse
            cx="450"
            cy="432"
            rx="120"
            ry="15"
            stroke="rgba(0,224,255,0.65)"
            strokeWidth="2"
          />

          <ellipse
            cx="450"
            cy="432"
            rx="70"
            ry="8"
            fill="rgba(0,198,255,0.35)"
            filter={`url(#${glowId})`}
          />
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
    </div>
  );
}

/* =========================================================
   RUDRAA CASH APP MOCKUP
   ========================================================= */

export function AppMockup() {
  const rows = [
    [
      "Dashboard",
      "Business overview",
    ],
    [
      "Wallet",
      "Digital wallet",
    ],
    [
      "Transactions",
      "Activity view",
    ],
    [
      "Settlement",
      "Settlement flow",
    ],
    [
      "Support",
      "Business assistance",
    ],
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
            Conceptual interface — no real financial data
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

/* =========================================================
   CTA
   ========================================================= */

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
