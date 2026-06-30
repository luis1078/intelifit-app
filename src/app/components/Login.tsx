import { useState } from "react";
import { Globe, Eye, EyeOff } from "lucide-react";
import { translations, Language } from "../translations";
import logo from "../../img/logo.png";
import { useFormPersist } from "../hooks/useFormPersist";
import { useNetworkAction } from "../hooks/useNetworkAction";
import { validateEmail, validateLoginPassword } from "../utils/validators";
import ErrorRetry from "./ErrorRetry";
import SocialLoginButtons from "./SocialLoginButtons";

interface LoginProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

export default function Login({
  language,
  toggleLanguage,
  navigate,
}: LoginProps) {
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);

  // Sticky form: email persists across reloads. Password is intentionally
  // NOT persisted (never store passwords in localStorage).
  const [formData, setFormData, clearPersisted] = useFormPersist("login", {
    email: "",
  });
  const [password, setPassword] = useState("");

  // Per-field error messages — only shown after the user has touched
  // (blurred) a field, so errors don't appear before they've typed anything.
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const emailError = touched.email ? validateEmail(formData.email, language) : "";
  const passwordError = touched.password ? validateLoginPassword(password, language) : "";
  const isFormValid =
    validateEmail(formData.email, language) === "" &&
    validateLoginPassword(password, language) === "";

  const { status, run, retry } = useNetworkAction(
    () => {
      clearPersisted();
      navigate("dashboard");
    },
    { failChance: 0.25 }
  );

  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    if (!isFormValid) return;
    run();
  };

  const handleOAuthSuccess = () => {
    clearPersisted();
    navigate("dashboard");
  };

  const inputBase: React.CSSProperties = {
    height: 52,
    border: "1px solid #C4C4C4",
    borderRadius: 10,
    background: "#FFFFFF",
    color: "#1A1A1A",
    padding: "0 16px",
    fontSize: 15,
    outline: "none",
    width: "100%",
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <div className="flex justify-end px-4 pt-4 flex-shrink-0">
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
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        <div className="flex justify-center mb-8">
          <div
            className="w-25 h-25 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "#1A6B4A" }}
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1
          className="text-[22px] font-semibold mb-1 text-center"
          style={{ color: "#1A1A1A" }}
        >
          {t.welcomeBack}
        </h1>
        <p
          className="text-[15px] text-center mb-8"
          style={{ color: "#767676" }}
        >
          {t.loginSubtitle}
        </p>

        <div className="space-y-4">
          <div>
            <label
              className="block mb-1.5"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#3D3D3D",
              }}
            >
              {t.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={(e) => {
                e.currentTarget.style.border = "1.5px solid #1A6B4A";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = emailError ? "1.5px solid #C62828" : "1px solid #C4C4C4";
                setTouched((p) => ({ ...p, email: true }));
              }}
              placeholder={t.emailPlaceholder}
              style={{ ...inputBase, border: emailError ? "1.5px solid #C62828" : inputBase.border }}
            />
            {emailError && (
              <p className="text-[12px] mt-1" style={{ color: "#C62828" }}>{emailError}</p>
            )}
          </div>
          <div>
            <label
              className="block mb-1.5"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#3D3D3D",
              }}
            >
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.createPassword}
                style={{
                  ...inputBase,
                  paddingRight: 48,
                  border: passwordError ? "1.5px solid #C62828" : inputBase.border,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border =
                    "1.5px solid #1A6B4A";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = passwordError ? "1.5px solid #C62828" : "1px solid #C4C4C4";
                  setTouched((p) => ({ ...p, password: true }));
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                type="button"
              >
                {showPassword ? (
                  <EyeOff
                    className="w-5 h-5"
                    style={{ color: "#767676" }}
                  />
                ) : (
                  <Eye
                    className="w-5 h-5"
                    style={{ color: "#767676" }}
                  />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-[12px] mt-1" style={{ color: "#C62828" }}>{passwordError}</p>
            )}
          </div>
          <div className="text-right">
            <button
              onClick={() => navigate("recuperarContrasena")}
              className="text-[13px]"
              style={{ color: "#1A6B4A" }}
            >
              {t.forgotPassword}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full text-white rounded-xl flex items-center justify-center mt-6"
          style={{
            background: status === "loading" ? "#7FA593" : "#1A6B4A",
            height: 52,
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          <span className="text-[15px] font-medium">
            {status === "loading" ? t.loadingText : t.loginBtn}
          </span>
        </button>

        <div className="mt-3">
          <ErrorRetry status={status} language={language} onRetry={retry} />
        </div>

        <SocialLoginButtons language={language} onAuthenticated={handleOAuthSuccess} />

        <p
          className="text-center text-[13px] mt-4"
          style={{ color: "#767676" }}
        >
          {t.noAccount}{" "}
          <button
            className="font-medium"
            style={{ color: "#1A6B4A" }}
            onClick={() => navigate("onboarding")}
          >
            {t.signUp}
          </button>
        </p>
      </div>
    </div>
  );
}