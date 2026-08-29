import { useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ArrowRight,
  Building2,
  Handshake,
} from "lucide-react";
import {
  Button,
  PageHero,
  Section,
  SectionHeader,
} from "../components/Layout";
import { contact } from "../data/siteData";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    business: "",
    mobile: "",
    email: "",
    city: "",
    interest: "Retailer",
    message: "",
  });

  const update = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
    setStatus("");
  };

  const submit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const mobile = form.mobile.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    const mobileOk = /^[+\d][\d\s-]{7,15}$/.test(mobile);
    const emailOk =
      !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !mobile || !message) {
      setStatus("Please complete Name, Mobile Number and Message.");
      return;
    }

    if (!mobileOk) {
      setStatus("Please enter a valid mobile number.");
      return;
    }

    if (!emailOk) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setStatus(
      "Thanks. Your enquiry is validated locally and ready for future backend integration."
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact / Support / Join Rudraa"
        title="Let's Build the Future Together."
        subtitle="Join the Rudraa Ecosystem. Whether you are a retailer, distributor, business partner or potential collaborator, we would like to hear from you."
      />

      <Section>
        <div className="contact-grid">
          <div>
            <SectionHeader
              eyebrow="Connect With Rudraa"
              title="Choose the channel that works for you."
              text="Rudraa Business Solutions Pvt. Ltd. · Product: Rudraa Cash"
            />

            <div className="contact-list">
              <a
                href={contact.phoneHref}
                className="contact-card reveal"
                aria-label={`Call ${contact.phone}`}
              >
                <Phone />
                <span>
                  <small>Mobile</small>
                  <b>{contact.phone}</b>
                </span>
                <ArrowRight size={17} />
              </a>

              <a
                href={contact.emailHref}
                className="contact-card reveal"
                aria-label={`Email ${contact.email}`}
              >
                <Mail />
                <span>
                  <small>Email</small>
                  <b>{contact.email}</b>
                </span>
                <ArrowRight size={17} />
              </a>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="contact-card reveal"
                aria-label="Contact Rudraa on WhatsApp"
              >
                <MessageCircle />
                <span>
                  <small>WhatsApp</small>
                  <b>WhatsApp Us</b>
                </span>
                <ArrowRight size={17} />
              </a>

              <div className="contact-card reveal">
                <MapPin />
                <span>
                  <small>Office Address</small>
                  <b>{contact.address}</b>
                </span>
              </div>
            </div>

            <div className="contact-actions">
              <Button href={contact.phoneHref}>Call Us</Button>

              <Button
                href={contact.whatsapp}
                external
                variant="ghost"
              >
                WhatsApp Us
              </Button>

              <Button
                href={contact.emailHref}
                variant="ghost"
              >
                Email Us
              </Button>
            </div>
          </div>

          <form
            className="contact-form reveal"
            onSubmit={submit}
            noValidate
          >
            <span className="eyebrow">Contact Form</span>

            <h2>Send an Enquiry</h2>

            <p className="muted">
              Submit your details and tell us how we can help.
              This demo currently validates the form locally and does
              not send or store your message.
            </p>

            <div className="form-grid">
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Business Name
                <input
                  name="business"
                  value={form.business}
                  onChange={update}
                  placeholder="Business name"
                  autoComplete="organization"
                />
              </label>

              <label>
                Mobile Number
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={update}
                  placeholder="+91..."
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>

              <label>
                City / State
                <input
                  name="city"
                  value={form.city}
                  onChange={update}
                  placeholder="Bilaspur, Chhattisgarh"
                  autoComplete="address-level2"
                />
              </label>

              <label>
                Interested In
                <select
                  name="interest"
                  value={form.interest}
                  onChange={update}
                >
                  {[
                    "Retailer",
                    "Distributor",
                    "Business Enquiry",
                    "Partnership",
                    "Collaboration",
                    "Support",
                    "Other",
                  ].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="full">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us how we can help."
                  rows="5"
                  required
                />
              </label>
            </div>

            <button
              className="button button--primary"
              type="submit"
            >
              Send Enquiry
              <Send size={17} />
            </button>

            {status && (
              <div
                className="form-status"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 size={18} />
                <span>{status}</span>
              </div>
            )}
          </form>
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader
          eyebrow="Business & Partnership"
          title="Let's Create Something Bigger."
          text="We welcome opportunities to work with businesses, technology providers and strategic partners who share our vision for a connected digital ecosystem."
        />

        <div className="card-grid two">
          <div className="premium-card reveal">
            <div className="card-icon">
              <Building2 />
            </div>
            <h3>Business Enquiry</h3>
            <p>
              Connect with Rudraa for business, retailer, distributor
              or operational enquiries.
            </p>
            <Button to="/contact">Start a Conversation</Button>
          </div>

          <div className="premium-card reveal">
            <div className="card-icon">
              <Handshake />
            </div>
            <h3>Partnership</h3>
            <p>
              Explore opportunities to collaborate and contribute to
              the wider Rudraa ecosystem.
            </p>
            <Button to="/contact" variant="ghost">
              Explore Partnership
            </Button>
          </div>
        </div>
      </Section>

      <section className="final-brand">
        <div className="container reveal">
          <span className="eyebrow">RUDRAA CASH</span>

          <h2>
            <span className="brand-white">प्रारंभ से</span>{" "}
            <span className="brand-blue">अनंत तक</span>
          </h2>

          <p>
            Building India’s Next-Generation Fintech Ecosystem
          </p>

          <strong>
            Your Business. Our Support. Together We Grow.
          </strong>

          <div>
            <Button to="/contact">
              Join the Rudraa Ecosystem
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
