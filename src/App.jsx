import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Calendar, HeartHandshake, Shield, MapPin, Mail, Clock, CheckCircle2, Leaf, ExternalLink, Globe, Menu, X
} from "lucide-react";

/* ----------------------------------------------------------------
   Simple EN/ES translations
------------------------------------------------------------------*/
const I18nContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

const i18n = {
  en: {
    nav: { home: "Home", services: "Services", values: "Values", about: "About", faq: "FAQ", careers: "Careers", contact: "Contact" },
    hero: {
      accepting: "Now accepting new clients",
      entity: "Home Health Care LLC",
      blurb:
        "We provide reliable in-home support so you can thrive where you’re most comfortable. Our caregivers bring presence, skill, and heart to every visit.",
      explore: "Explore Services",
      payers: "Medicaid • Private Pay",
    },
    common: {
      call: "Call", bookConsult: "Book a Free Consultation", startIntake: "Start Client Intake",
      explore: "Explore", contact: "Contact", coverage: "Coverage:", coverageNote:
      "We accept Medicaid and Private Pay. Talk with us about options and authorizations.",
      careThatCenters: "Care that centers you",
      careThatCentersBlurb:
        "Every person is unique. Our plans are crafted around preferences, culture, and clinical needs. We’re here for the everyday moments—meals, conversations, walks—as much as the important ones."
    },
    sections: { services: "Core Services", values: "Our Core Values" },
    valuesHow: {
      title: "How we live our values",
      a: "We co-create care plans around individual rhythms and preferences.",
      b: "We train caregivers in trauma-informed, culturally humble practices.",
      c: "We invest in team wellbeing so our care remains steady and kind.",
    },
    servicesPage: {
      title: "Services",
      intro: "Choose the level of support that fits your day—from companionship to 24-hour care. All services are customizable and can be combined.",
    },
    valuesPage: { title: "Our Core Values", intro: "We practice mindfulness in action—grounded in compassion, dignity, and trust." },
    about: {
      title: "About",
      intro: "We’re a locally owned agency dedicated to elevating home care standards. Our team blends clinical expertise with genuine presence.",
      mission: "Mission",
      missionText: "To provide compassionate, reliable home care that supports holistic wellness and independence.",
      vision: "Vision",
      visionText: "A community where aging and healing at home are honored with dignity, mindfulness, and connection.",
      standards: "Caregiver Standards",
      standardsList: ["Background checks & references", "Ongoing training & supervision", "CPR / First Aid certifications", "Clear communication & reliability"],
    },
    faq: {
      title: "Frequently Asked Questions",
      intro: "Answers to common questions about scheduling, services, and payment.",
      qas: [
        ["How soon can services begin?", "Often within 48–72 hours after an assessment and availability match."],
        ["Do you offer 24-hour care?", "Yes—continuous support with rotating caregivers."],
        ["Can I change my schedule?", "Absolutely. We’ll work with you to adjust visit frequency and timing."],
        ["What are my payment options?", "We accept Medicaid and Private Pay; we’ll help navigate authorizations."],
      ],
    },
    careers: {
      title: "Careers",
      intro: "Join a mindful team that values growth, rest, and meaningful connection.",
      roles: [
        { title: "Home Health Aide (HHA)", type: "Part-time", location: "Local Area" },
        { title: "Certified Nursing Assistant (CNA)", type: "Full-time", location: "Local Area" },
      ],
      apply: "Apply",
    },
    intake: {
      title: "Client Intake",
      intro: "Tell us a little about your needs and we’ll follow up the same day.",
      name: "Full name", phone: "Phone number", email: "Email",
      needs: "What support do you need?", schedule: "Preferred schedule",
      submit: "Submit Intake Request", thanksTitle: "Thank you!", thanksBody: "We’ve received your information and will reach out shortly.",
    },
    contact: {
      title: "Contact",
      intro: (phone) => `Call us at ${phone} or send a message below.`,
      sameDay: "Same-day consultations available. We’ll listen first, then recommend a plan.",
      form: { name: "Name", email: "Email", message: "Message", send: "Send Message", sentTitle: "Message sent!", sentBody: "Thanks for reaching out—we’ll reply soon." },
    },
    policy: {
      privacy: "Privacy Policy", terms: "Terms of Service",
      placeholder: (title) => `Placeholder legal text. Replace with your official ${title.toLowerCase()} content. This site does not collect or store personal health information; do not submit PHI through forms.`,
      infoWeCollect: "Information we collect", choices: "Your choices", delete: "You may request deletion of form submissions at any time by contacting us.",
      bullets: ["Basic contact details you share in forms", "Site usage analytics (aggregate)"],
    },
    footer: { explore: "Explore", contact: "Contact", rights: (y, name) => `© ${y} ${name}. All rights reserved.`, demo: "Website designed for demo purposes based on marketing flyer content." },
    valuesList: [
      "Holistic Wellness","Individualized Care","Compassion & Empathy","Integrity & Trust",
      "Respect & Dignity","Mindfulness in Action","Community & Connection",
    ],
    servicesList: [
      ["Companionship","Meaningful social interaction, outings, and engagement."],
      ["Cleaning","Light housekeeping, laundry, and tidying common areas."],
      ["Cooking","Meal prep aligned with preferences and dietary needs."],
      ["Errands","Groceries, pharmacy pickups, and appointment accompaniment."],
      ["Lawn Care","Basic outdoor upkeep to keep your space welcoming."],
      ["Respite Care","Short-term relief so family caregivers can rest."],
      ["24-Hour Care","Round-the-clock support for safety and comfort."],
      ["Transportation","Safe rides to appointments, community, and family events."],
    ],
  },
  es: {
    nav: { home: "Inicio", services: "Servicios", values: "Valores", about: "Quiénes somos", faq: "Preguntas", careers: "Empleos", contact: "Contacto" },
    hero: {
      accepting: "Aceptamos nuevos clientes",
      entity: "Cuidado de Salud en el Hogar LLC",
      blurb: "Ofrecemos apoyo confiable en el hogar para que pueda prosperar donde se siente más cómodo. Nuestros cuidadores brindan presencia, habilidad y corazón en cada visita.",
      explore: "Ver servicios", payers: "Medicaid • Pago privado",
    },
    common: {
      call: "Llamar", bookConsult: "Agenda una consulta gratis", startIntake: "Iniciar admisión",
      explore: "Explorar", contact: "Contacto", coverage: "Cobertura:",
      coverageNote: "Aceptamos Medicaid y pago privado. Conversemos sobre opciones y autorizaciones.",
      careThatCenters: "Cuidado que te centra",
      careThatCentersBlurb: "Cada persona es única. Creamos planes según preferencias, cultura y necesidades clínicas. Estamos para los momentos cotidianos—comidas, charlas, paseos—y los importantes."
    },
    sections: { services: "Servicios principales", values: "Nuestros valores" },
    valuesHow: {
      title: "Cómo vivimos nuestros valores",
      a: "Co-creamos planes según ritmos y preferencias individuales.",
      b: "Capacitamos al equipo en prácticas informadas por el trauma y con humildad cultural.",
      c: "Invertimos en el bienestar del equipo para mantener un cuidado constante y amable.",
    },
    servicesPage: { title: "Servicios", intro: "Elige el nivel de apoyo que se ajuste a tu día—desde compañía hasta cuidado 24/7. Todo es personalizable y combinable." },
    valuesPage: { title: "Nuestros valores", intro: "Practicamos la atención plena en acción—con compasión, dignidad y confianza." },
    about: {
      title: "Quiénes somos",
      intro: "Somos una agencia local dedicada a elevar el estándar del cuidado en casa. Nuestro equipo combina experiencia clínica con presencia genuina.",
      mission: "Misión", missionText: "Brindar cuidado compasivo y confiable que apoye el bienestar integral y la independencia.",
      vision: "Visión", visionText: "Una comunidad donde envejecer y sanar en casa se honran con dignidad, atención plena y conexión.",
      standards: "Estándares del personal",
      standardsList: ["Antecedentes y referencias","Capacitación y supervisión continua","Certificaciones de RCP / Primeros Auxilios","Comunicación clara y confiabilidad"],
    },
    faq: {
      title: "Preguntas frecuentes",
      intro: "Respuestas sobre programación, servicios y pagos.",
      qas: [
        ["¿Cuándo pueden comenzar los servicios?","Generalmente dentro de 48–72 horas después de la evaluación y disponibilidad."],
        ["¿Ofrecen cuidado 24/7?","Sí—apoyo continuo con cuidadores rotativos."],
        ["¿Puedo cambiar mi horario?","Claro. Ajustamos la frecuencia y los horarios contigo."],
        ["¿Qué opciones de pago hay?","Aceptamos Medicaid y pago privado; te ayudamos con autorizaciones."],
      ],
    },
    careers: {
      title: "Empleos",
      intro: "Únete a un equipo consciente que valora el crecimiento, el descanso y la conexión.",
      roles: [
        { title: "Asistente de Salud en el Hogar (HHA)", type: "Medio tiempo", location: "Área local" },
        { title: "Asistente de Enfermería Certificado (CNA)", type: "Tiempo completo", location: "Área local" },
      ],
      apply: "Postular",
    },
    intake: {
      title: "Admisión de cliente",
      intro: "Cuéntanos un poco sobre tus necesidades y te contactaremos el mismo día.",
      name: "Nombre completo", phone: "Número de teléfono", email: "Correo electrónico",
      needs: "¿Qué apoyo necesitas?", schedule: "Horario preferido",
      submit: "Enviar solicitud", thanksTitle: "¡Gracias!", thanksBody: "Hemos recibido tu información y te contactaremos pronto.",
    },
    contact: {
      title: "Contacto",
      intro: (phone) => `Llámanos al ${phone} o envía un mensaje abajo.`,
      sameDay: "Consultas el mismo día. Primero escuchamos y luego proponemos un plan.",
      form: { name: "Nombre", email: "Correo", message: "Mensaje", send: "Enviar", sentTitle: "¡Mensaje enviado!", sentBody: "Gracias por escribir—responderemos pronto." },
    },
    policy: {
      privacy: "Política de privacidad", terms: "Términos del servicio",
      placeholder: (title) => `Texto legal de ejemplo. Reemplaza con tu ${title.toLowerCase()}. Este sitio no almacena información de salud; no envíes PHI en los formularios.`,
      infoWeCollect: "Información que recopilamos", choices: "Tus opciones", delete: "Puedes solicitar la eliminación de tus envíos en cualquier momento.",
      bullets: ["Datos de contacto que compartes en formularios","Analítica de uso del sitio (agregada)"],
    },
    footer: { explore: "Explorar", contact: "Contacto", rights: (y, name) => `© ${y} ${name}. Todos los derechos reservados.`, demo: "Sitio de demostración basado en el volante de marketing." },
    valuesList: [
      "Bienestar holístico","Atención individualizada","Compasión y empatía","Integridad y confianza",
      "Respeto y dignidad","Atención plena en acción","Comunidad y conexión",
    ],
    servicesList: [
      ["Compañía","Interacción social, salidas y actividades significativas."],
      ["Limpieza","Quehaceres ligeros, lavandería y orden del hogar."],
      ["Cocina","Preparación de comidas según preferencias y dietas."],
      ["Mandados","Supermercado, farmacia y acompañamiento a citas."],
      ["Corte de césped","Mantenimiento básico del exterior."],
      ["Cuidado de relevo","Alivio temporal para que la familia descanse."],
      ["Cuidado 24 horas","Apoyo continuo para seguridad y comodidad."],
      ["Transporte","Traslados seguros a citas y eventos."],
    ],
  },
};

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const t = (key) => {
    const parts = key.split(".");
    return parts.reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), i18n[lang]) ?? key;
  };
  const setLanguage = (l) => { setLang(l); localStorage.setItem("lang", l); };
  return <I18nContext.Provider value={{ lang, setLang: setLanguage, t }}>{children}</I18nContext.Provider>;
}
const useT = () => useContext(I18nContext);

/* ----------------------------------------------------------------
   Brand theme
------------------------------------------------------------------*/
const brand = {
  name: "Mindful Living",
  tagline: "Compassionate Care for Mind, Body, and Soul",
  phone: "(531) 263-9409",
  palette: { ivory: "#FAF7F1" },
};

const Container = ({ children, className = "" }) => (<div className={`mx-auto w-full max-w-6xl px-4 md:px-8 ${className}`}>{children}</div>);
const Badge = ({ children }) => (<span className="inline-flex items-center rounded-full border border-yellow-400/60 bg-yellow-50 px-3 py-1 text-xs font-medium tracking-wide text-yellow-900">{children}</span>);
const CTAButton = ({ to = "/contact", children, icon: Icon = Phone }) => (<Link to={to} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300"><Icon size={18} aria-hidden="true" /> {children}</Link>);
const OutlineButton = ({ to = "/services", children }) => (<Link to={to} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/20 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-200">{children}</Link>);
const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `rounded-xl px-3 py-2 text-sm font-medium transition ${
        isActive ? "bg-white/70 text-emerald-900" : "text-emerald-900 hover:bg-white/60"
      }`
    }
  >
    {children}
  </NavLink>
);

/* ----------------------------------------------------------------
   Header (desktop + mobile drawer)
------------------------------------------------------------------*/
const Header = () => {
  const { lang, setLang, t } = useT();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onClick }) => (
    <nav className="flex flex-col md:flex-row gap-3 md:gap-1">
      <NavItem to="/" onClick={onClick}>{t("nav.home")}</NavItem>
      <NavItem to="/services" onClick={onClick}>{t("nav.services")}</NavItem>
      <NavItem to="/values" onClick={onClick}>{t("nav.values")}</NavItem>
      <NavItem to="/about" onClick={onClick}>{t("nav.about")}</NavItem>
      <NavItem to="/faq" onClick={onClick}>{t("nav.faq")}</NavItem>
      <NavItem to="/careers" onClick={onClick}>{t("nav.careers")}</NavItem>
      <NavItem to="/contact" onClick={onClick}>{t("nav.contact")}</NavItem>
    </nav>
  );

  return (
    <header
      className="sticky top-0 z-40 border-b border-emerald-900/10 backdrop-blur supports-[backdrop-filter]:bg-white/30"
      style={{ background: `#9FB6A299` }}
    >
      <Container className="flex items-center justify-between py-3">
        {/* Logo + brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Mindful Living logo" className="h-10 w-auto shrink-0" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-emerald-950">Mindful Living</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-900/80">{t("hero.entity")}</div>
          </div>
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/20 bg-white/80 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm"
          >
            <Globe size={16} /> {lang === "en" ? "ES" : "EN"}
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <Phone size={18} /> {i18n[lang].common.call} {brand.phone}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-emerald-900/20 bg-white/80 p-2 text-emerald-900 shadow-sm"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </Container>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
          <div
            className="ml-auto h-full w-80 max-w-[85%] bg-white shadow-xl p-5 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Mindful Living" className="h-8 w-auto" />
                <span className="text-sm font-semibold">Mindful Living</span>
              </div>
              <button
                className="rounded-lg border border-emerald-900/20 p-2 text-emerald-900"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-t border-emerald-900/10 pt-4">
              <NavLinks onClick={() => setOpen(false)} />
            </div>

            <div className="mt-auto flex items-center gap-3 pt-4 border-t border-emerald-900/10">
              <button
                onClick={() => setLang(lang === "en" ? "es" : "en")}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm"
              >
                <Globe size={16} /> {lang === "en" ? "ES" : "EN"}
              </button>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/10 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                <Phone size={18} /> {i18n[lang].common.call}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

/* ----------------------------------------------------------------
   Homepage sections
------------------------------------------------------------------*/
const serviceIcons = [HeartHandshake, Leaf, Leaf, Leaf, Leaf, Shield, Shield, Calendar];

const ServicesGrid = () => {
  const { t } = useT();
  const list = t("servicesList");
  return (
    <Container className="py-16">
      <h2 className="mb-2 text-center text-3xl font-semibold text-emerald-950">{t("sections.services")}</h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-emerald-900/80">Personalized support tailored to your routines and goals.</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map(([title, desc], i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <div key={title} className="group rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-50"><Icon size={18} /></div>
              <div className="text-lg font-semibold text-emerald-950">{title}</div>
              <p className="mt-1 text-sm text-emerald-900/80">{desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <CTAButton to="/contact" icon={Calendar}>{i18n.en.common.bookConsult}</CTAButton>
        <OutlineButton to="/intake">{i18n.en.common.startIntake}</OutlineButton>
      </div>
    </Container>
  );
};

const ValuesStripe = () => {
  const { t } = useT();
  const vals = t("valuesList");
  return (
    <div style={{ background: brand.palette.ivory }} className="border-y border-emerald-900/10 py-10">
      <Container>
        <h3 className="mb-6 text-center text-xl font-semibold text-emerald-950">{t("sections.values")}</h3>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {vals.map((v) => (
            <li key={v} className="flex items-start gap-2 text-emerald-950/90"><CheckCircle2 className="mt-0.5" size={18} /> {v}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

const Testimonial = ({ quote, author }) => (
  <figure className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm"><blockquote className="text-emerald-950/90">“{quote}”</blockquote><figcaption className="mt-3 text-sm font-medium text-emerald-900/80">— {author}</figcaption></figure>
);

const Hero = () => {
  const { t } = useT();
  return (
    <div className="relative overflow-hidden border-b border-yellow-700/10" style={{ background: `linear-gradient(135deg, #F2EFE7, #CDBBD840)` }}>
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge>{t("hero.accepting")}</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-emerald-950 md:text-5xl">Mindful Living</h1>
          <p className="mt-2 text-lg tracking-wide text-emerald-900/90">{t("hero.entity")}</p>
          <p className="mt-6 max-w-prose text-emerald-950/90">{t("hero.blurb")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton>{i18n.en.common.call} {brand.phone}</CTAButton>
            <OutlineButton>{t("hero.explore")}</OutlineButton>
          </div>
          <div className="mt-6 text-sm text-emerald-900/70">{t("hero.payers")}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] border border-yellow-500/30 bg-white/50 shadow-2xl" />
          <img alt="Flyer art" src="/flyer.png" className="block w-full rounded-3xl object-cover" />
        </motion.div>
      </Container>
    </div>
  );
};

const HomePage = () => (
  <main>
    <Hero />
    <ServicesGrid />
    <ValuesStripe />
    <Container className="py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold text-emerald-950">{i18n.en.common.careThatCenters}</h3>
          <p className="mt-2 text-emerald-900/80">{i18n.en.common.careThatCentersBlurb}</p>
          <div className="mt-6 flex gap-3">
            <CTAButton to="/contact">{i18n.en.common.call} {brand.phone}</CTAButton>
            <OutlineButton to="/about">{i18n.en.nav.about}</OutlineButton>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Testimonial quote="They treat Mom like family—dependable and kind." author="T. Nguyen" />
          <Testimonial quote="Responsive, organized, and truly mindful care." author="D. Alvarez" />
          <Testimonial quote="Compassion shines through in every visit." author="K. Patel" />
          <Testimonial quote="Scheduling was easy and flexible for our needs." author="M. Johnson" />
        </div>
      </div>
    </Container>
  </main>
);

/* ----------------------------------------------------------------
   Simple pages
------------------------------------------------------------------*/
const ServicesPage = () => {
  const { t } = useT();
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{t("servicesPage.title")}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{t("servicesPage.intro")}</p></Container></div>
      <ServicesGrid />
      <Container className="py-8"><div className="rounded-2xl border border-yellow-500/30 bg-yellow-50 p-6 text-yellow-900"><p className="font-medium">{i18n.en.common.coverage}</p><p className="text-sm opacity-90">{i18n.en.common.coverageNote}</p></div></Container>
    </main>
  );
};

const ValuesPage = () => {
  const { t } = useT();
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{t("valuesPage.title")}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{t("valuesPage.intro")}</p></Container></div>
      <ValuesStripe />
      <Container className="py-16">
        <div className="prose max-w-none">
          <h3 className="text-emerald-950">{t("valuesHow.title")}</h3>
          <ul className="list-disc pl-5">
            <li>{t("valuesHow.a")}</li>
            <li>{t("valuesHow.b")}</li>
            <li>{t("valuesHow.c")}</li>
          </ul>
        </div>
      </Container>
    </main>
  );
};

const AboutPage = () => {
  const { t } = useT();
  const s = t("about");
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{s.title} {brand.name}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{s.intro}</p></Container></div>
      <Container className="py-16 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6"><h3 className="font-semibold text-emerald-950">{s.mission}</h3><p className="text-emerald-900/80">{s.missionText}</p></div>
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6"><h3 className="font-semibold text-emerald-950">{s.vision}</h3><p className="text-emerald-900/80">{s.visionText}</p></div>
        </div>
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-50 p-6 text-yellow-900"><h3 className="font-semibold">{s.standards}</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{s.standardsList.map((x) => (<li key={x}>{x}</li>))}</ul></div>
      </Container>
    </main>
  );
};

const FAQPage = () => {
  const { t } = useT();
  const f = t("faq");
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{f.title}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{f.intro}</p></Container></div>
      <Container className="py-12"><dl className="space-y-6">{f.qas.map(([q,a]) => (<div key={q} className="rounded-2xl border border-emerald-900/10 bg-white p-5"><dt className="font-medium text-emerald-950">{q}</dt><dd className="mt-2 text-emerald-900/80">{a}</dd></div>))}</dl></Container>
    </main>
  );
};

const CareersPage = () => {
  const { t } = useT();
  const c = t("careers");
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{c.title}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{c.intro}</p></Container></div>
      <Container className="py-12"><div className="grid gap-6 md:grid-cols-2">{c.roles.map((j) => (<div key={j.title} className="rounded-2xl border border-emerald-900/10 bg-white p-6"><div className="flex items-start justify-between"><div><div className="text-lg font-semibold text-emerald-950">{j.title}</div><div className="text-sm text-emerald-900/70">{j.location} • {j.type}</div></div><a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-900 hover:underline">{c.apply} <ExternalLink size={16} /></a></div><ul className="mt-3 list-disc pl-5 text-sm text-emerald-900/80"><li>Provide compassionate ADL support, light housekeeping, and companionship.</li><li>Document visits and communicate changes promptly.</li><li>Certification and background check required.</li></ul></div>))}</div></Container>
    </main>
  );
};

const IntakePage = () => {
  const { t } = useT();
  const s = t("intake");
  const [form, setForm] = useState({ name: "", phone: "", email: "", needs: "", schedule: "" });
  const [submitted, setSubmitted] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{s.title}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{s.intro}</p></Container></div>
      <Container className="py-12">{submitted ? (<div className="rounded-2xl border border-emerald-900/10 bg-white p-6 text-emerald-950"><h3 className="text-xl font-semibold">{s.thanksTitle}</h3><p className="mt-2 text-emerald-900/80">{s.thanksBody}</p></div>) : (<form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{s.name}</span><input required name="name" type="text" value={form.name} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label><label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{s.phone}</span><input required name="phone" type="tel" value={form.phone} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label><label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{s.email}</span><input required name="email" type="email" value={form.email} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label><label className="md:col-span-2"><span className="mb-1 block text-sm font-medium text-emerald-950">{s.needs}</span><textarea required name="needs" value={form.needs} onChange={onChange} rows={4} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label><label className="md:col-span-2"><span className="mb-1 block text-sm font-medium text-emerald-950">{s.schedule}</span><input name="schedule" value={form.schedule} onChange={onChange} placeholder="e.g., Weekdays 9a–1p" className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label><div className="md:col-span-2"><button className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300">{s.submit}</button></div></form>)}</Container>
    </main>
  );
};

const ContactPage = () => {
  const { t } = useT();
  const copy = t("contact");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{copy.title}</h1><p className="mt-2 max-w-2xl text-emerald-900/80">{copy.intro(brand.phone)}</p></Container></div>
      <Container className="py-12 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6"><div className="flex items-center gap-2 text-emerald-950"><Phone size={18}/> {brand.phone}</div><div className="mt-2 flex items-center gap-2 text-emerald-900/90"><Mail size={18}/> hello@mindfulliving.care</div><div className="mt-2 flex items-center gap-2 text-emerald-900/90"><MapPin size={18}/> Serving Greater Community</div></div>
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-50 p-6 text-yellow-900">{copy.sameDay}</div>
        </div>
        <div>
          {sent ? (<div className="rounded-2xl border border-emerald-900/10 bg-white p-6 text-emerald-950"><h3 className="text-xl font-semibold">{copy.form.sentTitle}</h3><p className="mt-2 text-emerald-900/80">{copy.form.sentBody}</p></div>) : (
            <form onSubmit={onSubmit} className="space-y-3">
              <label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{copy.form.name}</span><input required name="name" value={form.name} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{copy.form.email}</span><input required type="email" name="email" value={form.email} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200" /></label>
              <label className="block"><span className="mb-1 block text-sm font-medium text-emerald-950">{copy.form.message}</span><textarea required name="message" rows={5} value={form.message} onChange={onChange} className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-200"/></label>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-emerald-900/10 bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300">{copy.form.send}</button>
            </form>
          )}
        </div>
      </Container>
    </main>
  );
};

const PolicyPage = ({ titleKey }) => {
  const { t } = useT();
  const title = t(`policy.${titleKey}`);
  return (
    <main>
      <div className="border-b border-emerald-900/10 bg-white/70"><Container className="py-12"><h1 className="text-3xl font-semibold text-emerald-950">{title}</h1></Container></div>
      <Container className="prose max-w-none py-12">
        <p>{t("policy.placeholder")(title)}</p>
        <h3>{t("policy.infoWeCollect")}</h3>
        <ul>
          {t("policy.bullets").map((b) => (<li key={b}>{b}</li>))}
        </ul>
        <h3>{t("policy.choices")}</h3>
        <p>{t("policy.delete")}</p>
      </Container>
    </main>
  );
};

/* ----------------------------------------------------------------
   App (routes)
------------------------------------------------------------------*/
export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${brand.palette.ivory}, #ffffff)` }}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/values" element={<ValuesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/intake" element={<IntakePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PolicyPage titleKey="privacy" />} />
            <Route path="/terms" element={<PolicyPage titleKey="terms" />} />
          </Routes>
          <footer className="bg-emerald-100 border-t border-emerald-200 py-4 text-center text-sm text-emerald-800">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
}
