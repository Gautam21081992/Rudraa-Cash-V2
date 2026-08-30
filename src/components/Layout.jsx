import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, contact } from "../data/siteData";
import { usePageMeta } from "../hooks/usePageMeta";

/* =========================================================
   LOGO
   ========================================================= */

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
          RUDR
          <span className="brand-last-a">A</span>
        </strong>

        <span className="brand-separator" />

        <span className="brand-business">
          BUSINESS SOLUTIONS
        </span>

        <span className="brand-separator" />

        <span className="brand-private">
          PRIVATE LIMITED
        </span>
      </span>
    </Link>
  );
}

/* =========================================================
   LAYOUT
   ========================================================= */

export function Layout({ children }) {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  usePageMeta(location.pathname);

  /* ---------------------------------------------------------
     Close mobile menu + reset scroll on route change
     --------------------------------------------------------- */

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  /* ---------------------------------------------------------
     Navbar scroll state
     --------------------------------------------------------- */

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

  /* ---------------------------------------------------------
     Lock body scroll while mobile menu is open
     --------------------------------------------------------- */

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  /* ---------------------------------------------------------
     Reveal animation observer
     --------------------------------------------------------- */

  useEffect(() => {
    const revealItems = document.querySelectorAll(
      ".reveal:not(.is-visible)"
    );

    if (!revealItems.length) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((element) => {
        element.classList.add("is-visible");
      });

      return undefined;
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

  /* ---------------------------------------------------------
     Escape key closes mobile menu
     --------------------------------------------------------- */

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="site-shell">
      {/* =====================================================
          NAVBAR
         ===================================================== */}

      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        } ${menuOpen ? "navbar--menu-open" : ""}`}
      >
        <div className="container nav-inner">
          {/* Logo */}

          <Logo />

          {/* Desktop Navigation */}

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  className={
                    isActive
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={item.path}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}

          <Link
            className="nav-cta"
            to="/contact"
          >
            <span>Join Rudraa</span>
            <ArrowUpRight size={16} />
          </Link>

          {/* Mobile Menu Button */}

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            type="button"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* ===================================================
            MOBILE NAVIGATION
           =================================================== */}

        <div
          id="mobile-navigation"
          className={`mobile-menu ${
            menuOpen ? "mobile-menu--open" : ""
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-menu-inner">
            <div className="mobile-menu-label">
              Navigation
            </div>

            <nav aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={
                      isActive
                        ? "mobile-link active"
                        : "mobile-link"
                    }
                    aria-current={
                      isActive ? "page" : undefined
                    }
                  >
                    <span>{item.label}</span>

                    <ArrowUpRight size={17} />
                  </Link>
                );
              })}
            </nav>

            <a
              className="mobile-contact"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp Us</span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}

      <main>{children}</main>

      {/* =====================================================
          FOOTER
         ===================================================== */}

      <Footer />
    </div>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* ---------------------------------------------------
            Brand
           --------------------------------------------------- */}

        <div className="footer-brand">
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

        {/* ---------------------------------------------------
            Explore
           --------------------------------------------------- */}

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

        {/* ---------------------------------------------------
            Contact
           --------------------------------------------------- */}

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

      {/* -----------------------------------------------------
          Footer Bottom
         ----------------------------------------------------- */}

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Rudraa Business
          Solutions Pvt. Ltd.
        </span>

        <span className="footer-bottom-mark">
          RUDRAA CASH
        </span>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE HERO
   ========================================================= */

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

/* =========================================================
   SECTION
   ========================================================= */

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

/* =========================================================
   SECTION HEADER
   ========================================================= */

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

/* =========================================================
   BUTTON
   ========================================================= */

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
        <span>{children}</span>
        <ArrowUpRight size={17} />
      </a>
    );
  }

  return (
    <Link
      className={cls}
      to={to}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} />
    </Link>
  );
}

/* =========================================================
   PREMIUM CARD
   ========================================================= */

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
        <div
          className="card-icon"
          aria-hidden="true"
        >
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
  const suffix = compact
    ? "compact"
    : "hero";

  const pathId =
    `rudraa-infinity-path-${suffix}`;

  const blueGradientId =
    `rudraa-infinity-blue-${suffix}`;

  const highlightGradientId =
    `rudraa-infinity-highlight-${suffix}`;

  const glowId =
    `rudraa-infinity-glow-${suffix}`;

  const strongGlowId =
    `rudraa-infinity-strong-glow-${suffix}`;

  const trailGlowId =
    `rudraa-infinity-trail-${suffix}`;

  /*
    Clean horizontal infinity geometry.

    The curve is intentionally kept as a single path so
    the animated energy point follows one continuous route.
  */

  const infinityPath = `
    M 120 90
    C 103 63, 86 38, 58 38
    C 33 38, 18 58, 24 78
    C 30 99, 51 106, 70 96
    C 83 89, 96 78, 120 90
    C 144 102, 157 91, 170 84
    C 189 74, 210 81, 216 102
    C 222 122, 207 142, 182 142
    C 154 142, 137 117, 120 90
    C 103 63, 86 38, 58 38
    C 33 38, 18 58, 24 78
    C 30 99, 51 106, 70 96
    C 83 89, 96 78, 120 90
    C 144 102, 157 117, 170 124
    C 189 134, 210 127, 216 106
    C 222 86, 207 66, 182 66
    C 154 66, 137 63, 120 90
  `;

  return (
    <div
      className={`infinity-visual ${
        compact
          ? "infinity-visual--compact"
          : ""
      }`}
      aria-label="Animated 3D infinity symbol representing continuity and limitless growth"
    >
      {/* Ambient glow */}

      <div
        className="infinity-glow"
        aria-hidden="true"
      />

      {/* Ground platform */}

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
          {/* =================================================
              BLUE TUBE MATERIAL
             ================================================= */}

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
              offset="40%"
              stopColor="#00aaff"
            />

            <stop
              offset="57%"
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

          {/* =================================================
              GLASS / METAL HIGHLIGHT
             ================================================= */}

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
              stopOpacity="0.9"
            />

            <stop
              offset="18%"
              stopColor="#b8f4ff"
              stopOpacity="0.7"
            />

            <stop
              offset="42%"
              stopColor="#ffffff"
              stopOpacity="0.16"
            />

            <stop
              offset="100%"
              stopColor="#00164d"
              stopOpacity="0.72"
            />
          </linearGradient>

          {/* =================================================
              WIDE GLOW
             ================================================= */}

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

          {/* =================================================
              STRONG GLOW
             ================================================= */}

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

          {/* =================================================
              ENERGY TRAIL GLOW
             ================================================= */}

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

          {/* =================================================
              INFINITY PATH
             ================================================= */}

          <path
            id={pathId}
            d={infinityPath}
            fill="none"
            stroke="none"
          />
        </defs>

        {/* ===================================================
            AMBIENT BLUE AURA
           =================================================== */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#007cff"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
          filter={`url(#${glowId})`}
        />

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#00c8ff"
          strokeWidth="25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
          filter={`url(#${strongGlowId})`}
        />

        {/* ===================================================
            DARK 3D OUTER DEPTH
           =================================================== */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#00091f"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.98"
        />

        {/* ===================================================
            BLUE TUBE BODY
           =================================================== */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${blueGradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ===================================================
            ELECTRIC BLUE INNER CORE
           =================================================== */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke="#008fff"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* ===================================================
            WHITE / CYAN SPECULAR EDGE
           =================================================== */}

        <use
          href={`#${pathId}`}
          fill="none"
          stroke={`url(#${highlightGradientId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
          style={{
            mixBlendMode: "screen",
          }}
        />

        {/* ===================================================
            MOVING ENERGY AURA
           =================================================== */}

        <circle
          r="14"
          fill="#00d5ff"
          opacity="0.25"
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

        {/* ===================================================
            ENERGY TRAIL — LAYER 1
           =================================================== */}

        <circle
          r="10"
          fill="#4ee8ff"
          opacity="0.22"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.32s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* ===================================================
            ENERGY TRAIL — LAYER 2
           =================================================== */}

        <circle
          r="8"
          fill="#a9f4ff"
          opacity="0.34"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.22s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* ===================================================
            ENERGY TRAIL — LAYER 3
           =================================================== */}

        <circle
          r="6"
          fill="#d9fbff"
          opacity="0.5"
          filter={`url(#${trailGlowId})`}
        >
          <animateMotion
            dur="8s"
            begin="-0.12s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath
              href={`#${pathId}`}
            />
          </animateMotion>
        </circle>

        {/* ===================================================
            MAIN ENERGY HALO
           =================================================== */}

        <circle
          r="12"
          fill="#ffffff"
          opacity="0.2"
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

        {/* ===================================================
            MAIN WHITE ENERGY POINT
           =================================================== */}

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

        {/* ===================================================
            WHITE-HOT CORE
           =================================================== */}

        <circle
          r="2.5"
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

      {/* Caption */}

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

/* =========================================================
   APP MOCKUP
   ========================================================= */

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
        {/* Phone notch */}

        <div className="phone-notch" />

        {/* App top bar */}

        <div className="phone-top">
          <span>Rudraa Cash</span>

          <span
            className="status-dot"
            aria-label="Prototype status"
          />
        </div>

        {/* Balance / dashboard card */}

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

        {/* App navigation tiles */}

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

        {/* App footer */}

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
          <div className="cta-content">
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
