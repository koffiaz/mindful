import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Values from "./pages/Values";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import { useTranslation } from "react-i18next";

const brand = {
  name: "Mindful Living",
  phone: "(531) 263-9409",
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const toggleLang = () => {
    const newLang = lang === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-emerald-50">
        {/* HEADER */}
        <header className="bg-emerald-100 border-b border-emerald-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Logo + Brand */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Mindful Living logo" 
                className="h-10 w-auto shrink-0" 
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wide text-emerald-950">
                  {brand.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-900/80">
                  {t("hero.entity")}
                </div>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-emerald-900">
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/services">{t("nav.services")}</Link>
              <Link to="/values">{t("nav.values")}</Link>
              <Link to="/about">{t("nav.about")}</Link>
              <Link to="/faq">{t("nav.faq")}</Link>
              <Link to="/careers">{t("nav.careers")}</Link>
              <Link to="/contact">{t("nav.contact")}</Link>
            </nav>

            {/* Right side: Lang toggle + Phone */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="text-sm bg-white border border-emerald-300 px-3 py-1 rounded-md hover:bg-emerald-50"
              >
                {lang === "en" ? "ES" : "EN"}
              </button>
              <a
                href={`tel:${brand.phone}`}
                className="bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-emerald-800"
              >
                {t("nav.call")} {brand.phone}
              </a>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/values" element={<Values />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-emerald-100 border-t border-emerald-200 py-4 text-center text-sm text-emerald-800">
          © {new Date().getFullYear()} {brand.name}. {t("footer.rights")}
        </footer>
      </div>
    </Router>
  );
}
