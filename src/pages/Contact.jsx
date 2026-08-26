import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button, PageHero, Section, SectionHeader } from "../components/Layout";
import { contact } from "../data/siteData";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", business: "", mobile: "", email: "", city: "", interest: "Retailer", message: "" });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const mobileOk = /^[+\d][\d\s-]{7,15}$/.test(form.mobile.trim());
    const emailOk = !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    if (!form.name.trim() || !form.mobile.trim() || !form.message.trim()) {
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
    setStatus("Thanks. Your enquiry is validated locally and ready for future backend integration.");
  };

  return (
    <>
      <PageHero eyebrow="Contact / Support / Join Rudraa" title="Let's Build the Future Together." subtitle="Join the Rudraa Ecosystem. Whether you are a retailer, distributor, business partner or potential collaborator, we would like to hear from you." />
      <Section>
        <div className="contact-grid">
          <div>
            <SectionHeader eyebrow="Connect With Rudraa" title="Choose the channel that works for you." text="Rudraa Business Solutions Pvt. Ltd. · Product: Rudraa Cash" />
            <div className="contact-list">
              <a href={contact.phoneHref} className="contact-card reveal"><Phone /><span><small>Mobile</small><b>{contact.phone}</b></span></a>
              <a href={contact.emailHref} className="contact-card reveal"><Mail /><span><small>Email</small><b>{contact.email}</b></span></a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="contact-card reveal"><MessageCircle /><span><small>WhatsApp</small><b>WhatsApp Us</b></span></a>
              <div className="contact-card reveal"><MapPin /><span><small>Office Address</small><b>{contact.address}</b></span></div>
            </div>
            <div className="contact-actions">
              <Button href={contact.phoneHref}>Call Us</Button>
              <Button href={contact.whatsapp} external variant="ghost">WhatsApp Us</Button>
              <Button href={contact.emailHref} variant="ghost">Email Us</Button>
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={submit} noValidate>
            <span className="eyebrow">Contact Form</span>
            <h2>Send an Enquiry</h2>
            <p className="muted">No message is sent from this demo until a backend/email service is configured.</p>
            <div className="form-grid">
              <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" required /></label>
              <label>Business Name<input name="business" value={form.business} onChange={update} placeholder="Business name" /></label>
              <label>Mobile Number<input name="mobile" value={form.mobile} onChange={update} placeholder="+91..." required /></label>
              <label>Email<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
              <label>City / State<input name="city" value={form.city} onChange={update} placeholder="Bilaspur, Chhattisgarh" /></label>
              <label>Interested In<select name="interest" value={form.interest} onChange={update}>{["Retailer", "Distributor", "Business Enquiry", "Partnership", "Collaboration", "Support", "Other"].map((x) => <option key={x}>{x}</option>)}</select></label>
              <label className="full">Message<textarea name="message" value={form.message} onChange={update} placeholder="Tell us how we can help." rows="5" required /></label>
            </div>
            <button className="button button--primary" type="submit">Send Enquiry <Send size={17} /></button>
            {status && <div className="form-status" role="status" aria-live="polite"><CheckCircle2 size={18} />{status}</div>}
          </form>
        </div>
      </Section>

      <Section className="dark-panel">
        <SectionHeader eyebrow="Business & Partnership" title="Let's Create Something Bigger." text="We welcome opportunities to work with businesses, technology providers and strategic partners who share our vision for a connected digital ecosystem." />
        <div className="center-actions"><Button to="/contact">Business Enquiry</Button><Button to="/contact" variant="ghost">Partnership Enquiry</Button></div>
      </Section>

      <section className="final-brand">
        <div className="container reveal">
          <span className="eyebrow">RUDRAA CASH</span>
          <h2>प्रारंभ से अनंत तक</h2>
          <p>Building India’s Next-Generation Fintech Ecosystem</p>
          <strong>Your Business. Our Support. Together We Grow.</strong>
          <div><Button to="/contact">Join the Rudraa Ecosystem</Button></div>
        </div>
      </section>
    </>
  );
}
