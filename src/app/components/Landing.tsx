import { useState } from "react";
import { Globe, Star } from "lucide-react";
import { translations, Language } from "../translations";
import logo from "../../img/logo.png";
interface LandingProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

export default function Landing({
  language,
  toggleLanguage,
  navigate,
}: LandingProps) {
  const t = translations[language];
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white overflow-y-auto">
      {/* Navigation */}
      <div
        className="flex justify-between items-center px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "0.5px solid #C4C4C4" }}
      >
        {/* Logo — tap scrolls to top (stays on landing) */}
        <button
          onClick={() => showToast(t.comingSoon)}
          className="flex items-center gap-2"
        >
          <div
            className="w-5 h-5 rounded-lg flex items-center justify-center"
            style={{ background: "#1A6B4A" }}
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-[15px] font-semibold"
            style={{ color: "#0D3D2A" }}
          >
            InteliFit
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
            style={{ border: "1px solid #C4C4C4" }}
          >
            <Globe
              className="w-4 h-4"
              style={{ color: "#767676" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "#3D3D3D" }}
            >
              {language === "en" ? "EN" : "ES"}
            </span>
          </button>
          <button
            onClick={() => navigate("login")}
            className="text-[14px] font-medium"
            style={{ color: "#1A6B4A" }}
          >
            {t.logIn}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero */}
        <div className="px-6 py-10 text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "#1A6B4A" }}
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="text-[26px] font-semibold mb-3"
            style={{ color: "#1A1A1A", whiteSpace: "pre-line" }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="text-[15px] mb-6"
            style={{ color: "#3D3D3D", lineHeight: 1.6 }}
          >
            {t.heroSubtitle}
          </p>
          <button
            onClick={() => navigate("onboarding")}
            className="text-white rounded-xl w-full max-w-xs mx-auto flex items-center justify-center"
            style={{ background: "#1A6B4A", height: 52 }}
          >
            <span className="text-[15px] font-medium">
              {t.startNow}
            </span>
          </button>
        </div>

        {/* Services */}
        <div className="px-4 pb-6">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.8px] mb-4"
            style={{ color: "#767676" }}
          >
            {t.ourServices}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              {
                label: t.integralEvaluation,
                desc: t.integralDesc,
                price: "S/ 299",
              },
              {
                label: t.groupClasses,
                desc: t.groupClassesDesc,
                price: "S/ 149",
              },
              {
                label: t.onlineTraining,
                desc: t.onlineTrainingDesc,
                price: "S/ 99",
              },
            ].map(({ label, desc, price }) => (
              <button
                key={label}
                onClick={() => navigate("onboarding")}
                className="bg-white rounded-2xl p-4 flex-shrink-0 w-[220px] text-left"
                style={{ border: "0.5px solid #C4C4C4" }}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ background: "#E8F5EE" }}
                >
                  <div
                    className="w-5 h-5 rounded"
                    style={{ background: "#1A6B4A" }}
                  />
                </div>
                <h3
                  className="text-[14px] font-semibold mb-1"
                  style={{ color: "#1A1A1A" }}
                >
                  {label}
                </h3>
                <p
                  className="text-[12px] mb-2"
                  style={{ color: "#767676", lineHeight: 1.5 }}
                >
                  {desc}
                </p>
                <p
                  className="text-[16px] font-bold"
                  style={{ color: "#1A6B4A" }}
                >
                  {price}
                  <span
                    className="text-[12px] font-normal"
                    style={{ color: "#767676" }}
                  >
                    /mes
                  </span>
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-4 pb-6">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.8px] mb-4"
            style={{ color: "#767676" }}
          >
            {t.whatClientsSay}
          </p>
          <div className="space-y-3">
            {[
              { name: "Ana Rodriguez", text: t.testimonial1 },
              { name: "Carmen Lopez", text: t.testimonial2 },
            ].map(({ name, text }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-4"
                style={{ border: "0.5px solid #C4C4C4" }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    style={{ background: "#C4C4C4" }}
                  />
                  <div>
                    <p
                      className="text-[14px] font-medium"
                      style={{ color: "#1A1A1A" }}
                    >
                      {name}
                    </p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current"
                          style={{ color: "#F0A500" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className="text-[13px]"
                  style={{ color: "#3D3D3D", lineHeight: 1.6 }}
                >
                  "{text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white p-4"
        style={{ borderTop: "0.5px solid #C4C4C4" }}
      >
        <button
          onClick={() => navigate("onboarding")}
          className="text-white rounded-xl w-full flex items-center justify-center"
          style={{ background: "#1A6B4A", height: 52 }}
        >
          <span className="text-[15px] font-medium">
            {t.bookFirstSession}
          </span>
        </button>
      </div>

      {toast && (
        <div
          className="absolute bottom-20 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white z-50"
          style={{ background: "#1A1A1A" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}