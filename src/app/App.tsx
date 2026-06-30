import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import BookClass from "./components/BookClass";
import Landing from "./components/Landing";
import Onboarding from "./components/Onboarding";
import AIChat from "./components/AIChat";
import Login from "./components/Login";
import Payment from "./components/Payment";
import PaymentSuccess from "./components/PaymentSuccess";
import Profile from "./components/Profile";
import MisRutinas from "./components/MisRutinas";
import ReporteCompleto from "./components/ReporteCompleto";
import RecuperarContrasena from "./components/RecuperarContrasena";
import Notificaciones from "./components/Notificaciones";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import AyudaSoporte from "./components/AyudaSoporte";
import { Language } from "./translations";

type Screen =
  | "landing"
  | "login"
  | "recuperarContrasena"
  | "onboarding"
  | "payment"
  | "paymentSuccess"
  | "dashboard"
  | "progress"
  | "reporteCompleto"
  | "bookClass"
  | "misReservas"
  | "aiChat"
  | "profile"
  | "misRutinas"
  | "notificaciones"
  | "politicaPrivacidad"
  | "ayudaSoporte";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("landing");
  const [language, setLanguage] = useState<Language>("es");

  const navigate = (screen: string) =>
    setCurrentScreen(screen as Screen);
  const toggleLanguage = () =>
    setLanguage((l) => (l === "en" ? "es" : "en"));

  const screenOptions: { value: Screen; label: string }[] = [
    { value: "landing", label: "Landing" },
    { value: "login", label: "Login" },
    {
      value: "recuperarContrasena",
      label: "Recuperar contraseña",
    },
    { value: "onboarding", label: "Registro" },
    { value: "payment", label: "Pago" },
    { value: "paymentSuccess", label: "Pago exitoso" },
    { value: "dashboard", label: "Dashboard" },
    { value: "misRutinas", label: "Mis Rutinas" },
    { value: "progress", label: "Mi Progreso" },
    { value: "reporteCompleto", label: "Reporte Completo" },
    { value: "bookClass", label: "Reservar Clase" },
    { value: "misReservas", label: "Mis Reservas" },
    { value: "aiChat", label: "Agente IA" },
    { value: "profile", label: "Mi Perfil" },
    { value: "notificaciones", label: "Notificaciones" },
    {
      value: "politicaPrivacidad",
      label: "Política de privacidad",
    },
    { value: "ayudaSoporte", label: "Ayuda y soporte" },
  ];

  const commonProps = { language, toggleLanguage, navigate };

  return (
    <div
      className="size-full flex flex-col items-center justify-center gap-5"
      style={{ background: "#E5E7EB" }}
    >
      {/* Screen Switcher */}
      <div className="bg-white shadow-lg rounded-xl px-5 py-2.5 flex items-center gap-3">
        <span
          className="text-sm font-medium"
          style={{ color: "#3D3D3D" }}
        >
          Screen:
        </span>
        <select
          value={currentScreen}
          onChange={(e) =>
            setCurrentScreen(e.target.value as Screen)
          }
          className="bg-white border rounded-lg px-3 py-1.5 text-sm cursor-pointer focus:outline-none"
          style={{ borderColor: "#C4C4C4", color: "#1A1A1A" }}
        >
          {screenOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Frame */}
      <div
        className="relative overflow-hidden shadow-2xl rounded-[48px]"
        style={{
          width: 390,
          height: 844,
          background: "#F5F5F5",
        }}
      >
        {currentScreen === "landing" && (
          <Landing {...commonProps} />
        )}
        {currentScreen === "login" && (
          <Login {...commonProps} />
        )}
        {currentScreen === "recuperarContrasena" && (
          <RecuperarContrasena {...commonProps} />
        )}
        {currentScreen === "onboarding" && (
          <Onboarding {...commonProps} />
        )}
        {currentScreen === "payment" && (
          <Payment {...commonProps} />
        )}
        {currentScreen === "paymentSuccess" && (
          <PaymentSuccess {...commonProps} />
        )}
        {currentScreen === "dashboard" && (
          <Dashboard {...commonProps} />
        )}
        {currentScreen === "misRutinas" && (
          <MisRutinas {...commonProps} />
        )}
        {currentScreen === "progress" && (
          <Progress {...commonProps} />
        )}
        {currentScreen === "reporteCompleto" && (
          <ReporteCompleto {...commonProps} />
        )}
        {/* bookClass and misReservas both use BookClass with a tab prop */}
        {currentScreen === "bookClass" && (
          <BookClass {...commonProps} initialTab="reservar" />
        )}
        {currentScreen === "misReservas" && (
          <BookClass
            {...commonProps}
            initialTab="misReservas"
          />
        )}
        {currentScreen === "aiChat" && (
          <AIChat {...commonProps} />
        )}
        {currentScreen === "profile" && (
          <Profile {...commonProps} />
        )}
        {currentScreen === "notificaciones" && (
          <Notificaciones {...commonProps} />
        )}
        {currentScreen === "politicaPrivacidad" && (
          <PoliticaPrivacidad {...commonProps} />
        )}
        {currentScreen === "ayudaSoporte" && (
          <AyudaSoporte {...commonProps} />
        )}
      </div>
    </div>
  );
}