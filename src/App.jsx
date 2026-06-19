// src/App.jsx
import { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
import "./app.css";

// ─── Login Page ──────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const auroraRef = useRef(null);

  // Aurora mouse-parallax
  useEffect(() => {
    function handleMouseMove(e) {
      if (!auroraRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      auroraRef.current.querySelectorAll(".aurora-blur").forEach((el) => {
        el.style.transform = `translate(${x * 20}px, ${y * 20}px) rotate(${x * 5}deg)`;
      });
    }
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onLogin();
  }

  return (
    <main ref={auroraRef} className="flex h-screen w-full overflow-hidden bg-background">

      {/* ── Left: Visual Panel ── */}
      <section className="hidden lg:flex lg:w-1/2 relative aurora-container items-center justify-center p-16">
        <div className="aurora-blur" />
        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <h1 className="text-[48px] font-extrabold tracking-tighter text-primary mb-4 leading-none">
              NutriAI
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Advanced biological insights powered by predictive synthesis.
              Synchronize your vitals with clinical precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="glass-card p-6 rounded-xl">
              <span className="material-symbols-outlined text-primary mb-3 block">monitor_heart</span>
              <div className="text-2xl font-bold text-on-surface">98%</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-outline mt-1">Accuracy Rate</div>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <span className="material-symbols-outlined text-tertiary mb-3 block">dns</span>
              <div className="text-2xl font-bold text-on-surface">2.4k</div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-outline mt-1">Markers Tracked</div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 aspect-video relative group">
            <img
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApniSui7wlBau76wzSiZxPoBA-06S1F4hl4I1hGlDV14zf1FGhXCpY6g0EB1CraFkdtTNOi0nn5vczE3eiOLXPu4HEN9XlUMIf04zYSJRJwArG_mCoc7GEMe81t4j6xfCLs1OakMB8F2UiTmhYwMRaUKuhX0YtXJymzUpIbOwmw-l773q_ONCgqpbYgesQo9H-ECPXa1GIBz6QqxLSTjz_OOIVSRuVUp5G7AfRBEis7b895H56R_XId-Fn7XU7AsEYB3jPD6ivdLC3"
              alt="NutriAI DNA visualization"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Right: Login Form ── */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-5 md:p-16 bg-surface-container-lowest relative">
        {/* Aurora on mobile */}
        <div className="lg:hidden absolute inset-0 aurora-container opacity-30 pointer-events-none">
          <div className="aurora-blur" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden text-[32px] font-extrabold text-primary tracking-tighter mb-2">NutriAI</div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Welcome Back</h2>
            <p className="text-base text-on-surface-variant">Enter your credentials to access the engine.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold tracking-widest uppercase text-outline ml-1">
                Clinical ID / Email
              </label>
              <div className="relative group login-input-wrap">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-surface-container-low border rounded-xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-base ${errors.email ? "border-error" : "border-outline-variant"}`}
                  placeholder="name@clinical.nutriai.com"
                />
              </div>
              {errors.email && <p className="login-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[12px] font-semibold tracking-widest uppercase text-outline">
                  Access Key
                </label>
                <a className="text-[12px] font-semibold tracking-widest text-primary hover:underline transition-all" href="#">
                  Forgot?
                </a>
              </div>
              <div className="relative group login-input-wrap">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-surface-container-low border rounded-xl py-4 pl-12 pr-12 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-base ${errors.password ? "border-error" : "border-outline-variant"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && <p className="login-error">{errors.password}</p>}
            </div>

            {/* Remember */}
            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant bg-surface-container-low accent-primary cursor-pointer"
              />
              <label htmlFor="remember" className="text-base text-on-surface-variant cursor-pointer">
                Trust this terminal for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl login-btn-glow hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined">login</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-container-lowest px-4 text-[10px] font-bold tracking-widest uppercase text-outline">
                External Authentication
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 glass-card rounded-xl hover:bg-surface-variant/50 transition-all text-[12px] font-semibold tracking-widest">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 glass-card rounded-xl hover:bg-surface-variant/50 transition-all text-[12px] font-semibold tracking-widest">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05 1.79-3.48 1.79-1.42 0-1.81-.88-3.57-.88-1.75 0-2.22.85-3.54.88-1.32.03-2.48-.95-3.54-2.12-2.13-2.35-3.51-6.72-3.51-9.92 0-4.88 3.14-7.46 6.13-7.46 1.56 0 2.68.85 3.73.85 1.05 0 2.5-.91 4.35-.91 1.72 0 3.82.78 5.16 2.37-3.41 1.43-2.83 5.92.51 7.37-1.12 2.17-2.76 4.14-4.24 5.93zM12.03 4.2c-.12-2.06 1.52-3.85 3.36-4.2.33 2.17-1.63 4.12-3.36 4.2z" fill="currentColor"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="mt-12 text-center text-base text-on-surface-variant">
            Don&apos;t have clinical clearance?{" "}
            <a className="text-primary font-bold hover:underline" href="#">Apply for Access</a>
          </p>
        </div>
      </section>
    </main>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
function DashboardPage({ userProfile, onNavigatePlanner, onSignOut }) {
  const { gender, age, weight, height, goal, dietPreference } = userProfile;

  const meals = [
    {
      tag: "Breakfast", kcal: "420 Kcal",
      name: "Avocado Bio-Bowl", desc: "High Omega-3, Low Glycemic",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEZmD4eh1x565x_X7WFJn8IQu8077Ceoi8ckndHAaEdCn43aVB1Hwpuh_DERGsC68d4AlOAQBLq3GTgDdEoQ1I-cTqvHvODrRIodC8i9hf8cNciihY08m8vHzROQi7O8bKbqi320ogB71R7lGKEQjpAKxNfI4pAoPwiC1B2RZjP_OJ1WARzZ4SiHoZAIJ9aLVs4GjE2aFIX7uS8_LOpFO2BFhXV7J8uIY6KuSmsKmKrgxo-ED30e88sQLi9nxHpm_86rNIxHnw8Tp6",
    },
    {
      tag: "Lunch", kcal: "680 Kcal",
      name: "Salmon Prot-Synth", desc: "Muscle Synthesis Optimized",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc-ysoO2Dyag-RC6BQMNviLEEOnbRfPYXK7gVu4nNwklGHQkALeS9AJj_gRQk9_XpqXxfWz6hIpid9tlecY_Qk2OSDBXgzIry9HRwtaQm0IjxlRWxsbkXnkjpPpT5SlzsrcuCO2YFAcsF0clp6pSSCuXkeRkI-YH3VGXfn9i_I4_cu3NOLJAgdjHp04ogBemzhgsJ_0IphzpzQy2zqgoCBC2mpEdAUc-C3tLyUyk66P_TEgFbQBW8lzAiihSrGPWQKFEyS5udxm8z8",
    },
    {
      tag: "Dinner", kcal: "740 Kcal",
      name: "Steak Glyco-Load", desc: "Slow Release Energy",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe-WZoEf0wnV8P6J1787fRWIPitvC2RXtxaJz8FY3k9RI_hyXYdyv8U1OQL6o2FIIehDdfq7qQOpggF3MZk-VybAQD2iycNWrTl-LGOgpxH3F6DwasArJ2ccpBNu6qDjvn6HFJlHcPJGi_b9H0pAA8-9A-CsgYSDG7_SbWksqcTr7kgjHwx01P4LE74QHAh_xTIavyqIBLO3urBQkau_pby0ZY-epHb0Er5MWKvBP8O9DG-cMc2SniGhHVyj9yY4X3hfumD_XQz0To",
    },
  ];

  const chartBars = [80,78,75,72,73,70,68,65,67,62,60,58,55,52,50];

  return (
    <div className="bg-background text-on-surface custom-scrollbar min-h-screen">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[rgba(14,21,17,0.7)] backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-5 md:px-16 h-20">
        <div className="text-[48px] font-extrabold tracking-tighter text-primary leading-none">NutriAI</div>
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={onNavigatePlanner} className="text-base text-on-surface-variant hover:text-primary transition-colors">Dashboard</button>
          <button onClick={onNavigatePlanner} className="text-base text-primary font-bold border-b-2 border-primary pb-1">AI Planner</button>
          <a className="text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Supplements</a>
          <a className="text-base text-on-surface-variant hover:text-primary transition-colors" href="#">Clinical Data</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdGfeG8efb_cg-EmUrbHxnLhBrIvQcAHuXmiAKHmD2oC1P9jSH-veZmEMn8wURyZ1lyzD_9kO5pw7FU-ef7WRf5jTPmYqM90kFPLrYVXyaNBYZMQoadxI3rv8qaRFJgD0CXC4vyqm9M33_uSdqgepMFlWXvPn5QK5qTuwz2k1OCc35HG8Ii-f9VuUWyWMbjeCFJGEpgksacbD68MGs-AVtWLM-DSml2ZQD-0T_Cs2JxWNDYBPB9Gs5iOTkw9HN2PYc2uMhhBnIXL3J"
              alt="User profile"
            />
          </div>
        </div>
      </nav>

      {/* ── Sidebar (Desktop) ── */}
      <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-surface-container-low backdrop-blur-2xl border-r border-outline-variant/20 shadow-2xl hidden md:flex flex-col py-8 gap-4 pt-24">
        <div className="px-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <div>
              <div className="text-2xl font-bold text-surface-tint">Clinical Data</div>
              <div className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant opacity-60">Vitals Synchronized</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { icon: "monitor_heart", label: "Biometrics", active: true },
            { icon: "restaurant",    label: "Nutrition",  active: false },
            { icon: "dns",           label: "Genomics",   active: false },
            { icon: "settings",      label: "Settings",   active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all ${
                item.active
                  ? "text-primary bg-primary/10 border-r-4 border-primary"
                  : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-[12px] font-semibold tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-6 pt-4 border-t border-outline-variant/10">
          <button
            onClick={onNavigatePlanner}
            className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            Run AI Planner
          </button>
        </div>

        <div className="px-4 mt-auto space-y-1">
          <div className="flex items-center gap-4 p-3 text-on-surface-variant hover:text-on-surface cursor-pointer text-[12px] font-semibold tracking-widest uppercase">
            <span className="material-symbols-outlined">help_outline</span>Support
          </div>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-4 p-3 text-on-surface-variant hover:text-primary transition-colors text-[12px] font-semibold tracking-widest uppercase"
          >
            <span className="material-symbols-outlined">logout</span>Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="md:ml-64 pt-28 px-5 md:px-16 pb-24 max-w-[1400px] mx-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-[48px] font-extrabold tracking-tighter mb-2 leading-tight">
              Welcome back, <span className="text-primary">{gender || "Clinician"}.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Your biometric sync is complete. Goal: <span className="text-primary font-semibold">{goal || "Optimize"}</span> · {age ? `Age ${age}` : ""} {weight ? `· ${weight}kg` : ""} {height ? `· ${height}cm` : ""}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 dash-glass-card rounded-xl text-[12px] font-semibold tracking-widest uppercase hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined">add_circle</span>Log Intake
            </button>
            <button
              onClick={onNavigatePlanner}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined">biotech</span>Run Analysis
            </button>
          </div>
        </header>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Nutrition Ring */}
          <div className="md:col-span-8 dash-glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl dash-pulse" />
            <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 192 192">
                <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12"/>
                <circle
                  className="text-primary dash-ring"
                  cx="96" cy="96" fill="transparent" r="80"
                  stroke="currentColor" strokeWidth="12"
                  strokeDasharray="502" strokeDashoffset="125"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold">1,842</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Kcal Left</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-6 w-full">
              {[
                { label: "Protein", val: "142/190g", pct: "75%", color: "bg-primary-container" },
                { label: "Carbs",   val: "98/220g",  pct: "45%", color: "bg-secondary" },
                { label: "Fats",    val: "42/70g",   pct: "60%", color: "bg-tertiary" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <span className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">{m.label}</span>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: m.pct }} />
                  </div>
                  <span className="text-sm font-bold">{m.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hydration Widget */}
          <div className="md:col-span-4 dash-glass-card rounded-2xl p-6 flex flex-col justify-between dash-neon-border">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[12px] font-semibold tracking-widest uppercase text-primary">Hydration</span>
                <h3 className="text-2xl font-bold mt-1">2.4 <span className="text-lg font-normal opacity-50">L</span></h3>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl">water_drop</span>
            </div>
            <div className="flex gap-2 mt-8">
              {[true, true, true, "pulse", false].map((active, i) => (
                <div
                  key={i}
                  className={`h-12 flex-1 rounded-lg border flex items-center justify-center ${
                    active === "pulse"
                      ? "bg-primary/40 border-primary/30 animate-pulse"
                      : active
                      ? "bg-primary/20 border-primary/10"
                      : "bg-surface-container-highest border-outline-variant/10"
                  }`}
                />
              ))}
            </div>
            <button className="mt-6 w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg transition-colors border border-primary/20">
              + 250ml
            </button>
          </div>

          {/* Weight Chart */}
          <div className="md:col-span-12 dash-glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold">Weight Momentum</h3>
                <p className="text-on-surface-variant text-sm">Last 30 Days Clinical Trend</p>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">{weight ? `${weight} kg Current` : "76.2 kg Current"}</div>
                <div className="px-3 py-1 rounded bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-bold tracking-widest uppercase">-1.4 kg This Month</div>
              </div>
            </div>
            <div className="w-full h-48 flex items-end gap-1 px-2">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm hover:bg-primary/30 transition-all cursor-pointer"
                  style={{
                    height: `${h}%`,
                    background: `rgba(78,222,163,${0.1 + (i / chartBars.length) * 0.8})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Today's Meal Plan */}
          <div className="md:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                Today's Meal Plan
              </h2>
              <button onClick={onNavigatePlanner} className="text-[12px] font-semibold tracking-widest uppercase text-primary hover:underline">
                Full Protocol
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <div key={meal.tag} className="dash-glass-card rounded-2xl overflow-hidden flex flex-col dash-meal-card cursor-pointer group">
                  <div className="h-40 overflow-hidden relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={meal.img} alt={meal.name} />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[rgba(14,21,17,0.7)] backdrop-blur-md rounded-lg text-[10px] font-bold tracking-widest uppercase">{meal.tag}</div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-1">{meal.name}</h4>
                    <p className="text-sm text-on-surface-variant mb-4">{meal.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{meal.kcal}</span>
                      <button className="p-2 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="md:col-span-12 dash-glass-card rounded-2xl p-6 border border-tertiary/30 bg-tertiary-container/5 mt-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/20 flex items-center justify-center text-tertiary flex-shrink-0">
              <span className="material-symbols-outlined text-4xl">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-tertiary">AI Biometric Insight</h3>
              <p className="text-on-surface-variant mt-2">
                Based on your profile ({dietPreference || "your dietary preference"}), your caffeine threshold should not exceed 150mg today. We've adjusted your lunch protocol to include more L-Theanine rich ingredients.
              </p>
            </div>
            <button
              onClick={onNavigatePlanner}
              className="md:ml-auto px-6 py-3 border border-tertiary text-tertiary rounded-xl hover:bg-tertiary hover:text-on-tertiary transition-all whitespace-nowrap"
            >
              Update Protocol
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-[12px] font-semibold tracking-widest uppercase text-on-surface">NutriAI Clinical Systems</div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-outline">© 2024 NutriAI Clinical Systems. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">System Status: Operational</a>
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">Privacy Policy</a>
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">Terms of Service</a>
          </div>
        </footer>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[rgba(14,21,17,0.7)] backdrop-blur-2xl border-t border-outline-variant/20 flex justify-around items-center h-20 px-6 z-50">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase">Dash</span>
        </button>
        <button onClick={onNavigatePlanner} className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="text-[10px] uppercase">Plan</span>
        </button>
        <button
          onClick={onNavigatePlanner}
          className="w-14 h-14 bg-primary rounded-full -mt-10 flex items-center justify-center text-on-primary shadow-lg shadow-primary/40 border-4 border-background"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] uppercase">Data</span>
        </button>
        <button onClick={onSignOut} className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ─── Goals Page — Life & Goals (Step 2 of 3) ─────────────────────────────────
function GoalsPage({ onContinue, onBack }) {
  const [selectedGoal, setSelectedGoal] = useState("Muscle Gain");
  const [selectedActivity, setSelectedActivity] = useState("Moderate");
  const [dietary, setDietary] = useState("");

  // Entrance animation on mount
  useEffect(() => {
    const sections = document.querySelectorAll(".goals-section");
    sections.forEach((s, i) => {
      s.style.opacity = "0";
      s.style.transform = "translateY(20px)";
      setTimeout(() => {
        s.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        s.style.opacity = "1";
        s.style.transform = "translateY(0)";
      }, 120 * (i + 1));
    });
  }, []);

  const goals = [
    { value: "Lose Weight",   icon: "monitor_weight", label: "Weight Loss",       desc: "Metabolic optimization for body fat reduction." },
    { value: "Muscle Gain",   icon: "fitness_center",  label: "Muscle Gain",       desc: "Hypertrophy-focused nutrient partitioning." },
    { value: "Peak Performance", icon: "bolt",         label: "Peak Performance",  desc: "Cognitive and physical endurance scaling." },
  ];

  const activities = [
    { value: "Sedentary", level: "Level 1", desc: "Desk job, minimal exercise." },
    { value: "Moderate",  level: "Level 2", desc: "Active 3-4 days per week." },
    { value: "High",      level: "Level 3", desc: "Intense training 5-6 days." },
    { value: "Athlete",   level: "Level 4", desc: "Professional grade volume." },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[rgba(14,21,17,0.7)] backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-5 md:px-16 h-20">
        <div className="text-[28px] font-extrabold tracking-tighter text-primary">NutriAI</div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Step 2 of 3</span>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLG0sXRjRqeKPQwMdEaWmNvj1zhdYA3v0PK9DcsTsO5wvOny-D6S7cASWkRnAoUcNNQMWKyJR4H8MPw4vlo9utiWFPVwxgWZv9Kt1P88YaOknZnQvtVxn0YgeTGX509AZHr39OYXZ1PWqVuglG5SnlvTZX9j9davP45PIdiZI_frNK41PzbGG52k8Zr-YU_emSplErDEODuOpDYR2qz1fruJnkd2wsRkJmV8dsF6J96yF3cBMEWqvXw67c6Fbra1hrh0ReyG4sGtvW"
                alt="Profile avatar"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col items-center pt-32 pb-16 px-5 md:px-16 max-w-[1200px] mx-auto w-full">

        {/* Progress Header */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-[48px] font-extrabold tracking-tighter text-primary mb-2 leading-none">Life &amp; Goals</h1>
              <p className="text-on-surface-variant max-w-md">Fine-tune your clinical bio-profile. Your journey is uniquely yours.</p>
            </div>
            <div className="text-right">
              <span className="text-[12px] font-semibold tracking-widest uppercase text-primary block mb-1">COMPLETION</span>
              <span className="text-2xl font-bold">80%</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary goals-progress-bar transition-all duration-1000" style={{ width: "80%" }} />
          </div>
        </div>

        <div className="w-full max-w-4xl flex flex-col gap-12">

          {/* ── Primary Objective ── */}
          <section className="goals-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">target</span>
              <h2 className="text-2xl font-bold">Primary Objective</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goals.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setSelectedGoal(g.value)}
                  className={`goals-card p-6 rounded-xl flex flex-col items-center text-center group ${selectedGoal === g.value ? "goals-card-selected" : ""}`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-3xl">{g.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{g.label}</h3>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant leading-tight">{g.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ── Activity Level ── */}
          <section className="goals-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">directions_run</span>
              <h2 className="text-2xl font-bold">Activity Level</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activities.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setSelectedActivity(a.value)}
                  className={`goals-card p-6 rounded-xl text-left flex flex-col gap-3 ${selectedActivity === a.value ? "goals-card-selected" : ""}`}
                >
                  <span className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">{a.level}</span>
                  <h3 className="text-lg font-bold">{a.value}</h3>
                  <p className="text-[11px] leading-tight text-outline">{a.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ── Bio-Restrictions ── */}
          <section className="goals-section max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">no_food</span>
              <h2 className="text-2xl font-bold">Bio-Restrictions</h2>
            </div>
            <div className="space-y-4">
              <label htmlFor="dietary" className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">
                DIETARY PREFERENCES / ALLERGIES
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">restaurant</span>
                <input
                  id="dietary"
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-on-surface placeholder:text-outline/50"
                  placeholder="e.g. Vegan, No Shellfish, Nut Allergy..."
                />
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-outline">
                NutriAI's clinical engine will exclude these markers from all recipe generations.
              </p>
            </div>
          </section>

          {/* ── Actions ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-outline-variant/10">
            <button
              onClick={onBack}
              className="px-8 py-4 text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Previous Step
            </button>
            <button
              onClick={() => onContinue({ goal: selectedGoal, activityLevel: selectedActivity, dietPreference: dietary || selectedGoal })}
              className="flex-1 md:flex-none px-12 py-4 bg-gradient-to-r from-primary to-secondary text-on-primary text-base font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Complete Profile
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-8 mt-32 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-16 max-w-[1200px] mx-auto w-full gap-4">
          <div className="text-[12px] font-semibold tracking-widest uppercase text-on-surface">NUTRIAI CLINICAL SYSTEMS</div>
          <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-outline">
            <span className="hover:text-surface-tint transition-colors cursor-pointer">System Status: Operational</span>
            <span className="hover:text-surface-tint transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-surface-tint transition-colors cursor-pointer">Terms of Service</span>
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-outline">© 2024 NutriAI Clinical Systems. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// ─── OnboardingPage — Physical Vitals (Step 1 of 3) ──────────────────────────
function OnboardingPage({ onContinue }) {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(72);

  function handleContinue() {
    onContinue({ gender, age: String(age), height: String(height), weight: String(weight) });
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center relative py-12 px-5 md:px-16">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[rgba(14,21,17,0.7)] backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-16 h-20">
        <div className="text-[48px] font-extrabold tracking-tighter text-primary leading-none">NutriAI</div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">account_circle</span>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="w-full max-w-[800px] mt-24">

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {/* Step 1 — active */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-on-primary text-[20px]">person</span>
              </div>
              <span className="text-[12px] font-semibold tracking-widest uppercase text-primary">Profile</span>
            </div>

            {/* Connector 1 */}
            <div className="flex-grow mx-4 h-[2px] bg-outline-variant/30 relative">
              <div className="absolute inset-0 w-0 bg-primary" />
            </div>

            {/* Step 2 — inactive */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">fitness_center</span>
              </div>
              <span className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Goals</span>
            </div>

            {/* Connector 2 */}
            <div className="flex-grow mx-4 h-[2px] bg-outline-variant/30" />

            {/* Step 3 — inactive */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">biotech</span>
              </div>
              <span className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Analysis</span>
            </div>
          </div>

          <h1 className="text-[48px] font-extrabold tracking-tighter text-center mt-8 text-on-surface">Physical Vitals</h1>
          <p className="text-base text-on-surface-variant text-center mt-2">
            Initialize your clinical profile for bio-precise recommendations.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-xl p-6 flex flex-col gap-10">

          {/* Gender */}
          <div className="flex flex-col gap-4">
            <label className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">
              Assigned Gender at Birth
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`glass-card rounded-lg p-6 flex flex-col items-center gap-3 transition-all hover:bg-surface-variant/50 active:scale-95 ${gender === "male" ? "onboarding-gender-active" : ""}`}
              >
                <span className="material-symbols-outlined text-[40px] text-surface-tint">male</span>
                <span className="text-2xl font-bold">Male</span>
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`glass-card rounded-lg p-6 flex flex-col items-center gap-3 transition-all hover:bg-surface-variant/50 active:scale-95 ${gender === "female" ? "onboarding-gender-active" : ""}`}
              >
                <span className="material-symbols-outlined text-[40px] text-surface-tint">female</span>
                <span className="text-2xl font-bold">Female</span>
              </button>
            </div>
          </div>

          {/* Age */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <label className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Current Age</label>
              <span className="text-[48px] font-extrabold tracking-tighter text-primary leading-none">{age}</span>
            </div>
            <input
              type="range"
              min="18" max="100"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="onboarding-slider w-full h-2 bg-surface-container-highest rounded-full appearance-none outline-none"
            />
          </div>

          {/* Height + Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Height */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Height (cm)</label>
                <span className="text-2xl font-bold text-primary">{height}</span>
              </div>
              <input
                type="range"
                min="100" max="230"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="onboarding-slider w-full h-2 bg-surface-container-highest rounded-full appearance-none outline-none"
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <label className="text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant">Weight (kg)</label>
                <span className="text-2xl font-bold text-primary">{weight}</span>
              </div>
              <input
                type="range"
                min="40" max="200"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="onboarding-slider w-full h-2 bg-surface-container-highest rounded-full appearance-none outline-none"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex flex-col gap-4">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-primary to-secondary py-4 rounded-lg text-2xl font-bold text-on-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              onClick={handleContinue}
              className="w-full bg-transparent py-2 text-on-surface-variant text-[12px] font-semibold tracking-widest uppercase hover:text-on-surface transition-colors"
            >
              I prefer not to say
            </button>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant/60">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">End-to-end encrypted clinical data transmission.</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-32 border-t border-outline-variant/10 bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center px-16 max-w-[1200px] mx-auto">
          <div className="text-[12px] font-semibold tracking-widest uppercase text-on-surface">
            © 2024 NutriAI Clinical Systems. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">System Status: Operational</a>
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">Privacy Policy</a>
            <a className="text-[10px] font-bold tracking-widest uppercase text-outline hover:text-surface-tint transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── WebGL Shader Background ────────────────────────────────────────────────
function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const vs = `attribute vec2 a_position;varying vec2 v_texCoord;
void main(){v_texCoord=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

    const fs = `precision highp float;
uniform float u_time;uniform vec2 u_resolution;varying vec2 v_texCoord;
void main(){
  vec2 uv=v_texCoord;vec2 p=-1.0+2.0*uv;
  p.x*=u_resolution.x/u_resolution.y;
  float t=u_time*0.2;
  for(float i=1.0;i<4.0;i++){p.x+=0.3/i*sin(i*3.0*p.y+t);p.y+=0.3/i*cos(i*3.0*p.x+t);}
  vec3 c1=vec3(0.06,0.09,0.16);vec3 c2=vec3(0.06,0.73,0.51);vec3 c3=vec3(0.55,0.36,0.96);
  float mask=sin(p.x+p.y)*0.5+0.5;
  vec3 col=mix(c1,c2*0.3,mask);col=mix(col,c3*0.2,1.0-mask);
  col+=0.05*sin(u_time+uv.x*10.0);
  gl_FragColor=vec4(col,1.0);}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let rafId;
    function render(t) {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 opacity-40">
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

// ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({ onSignOut }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center px-5 md:px-16 py-4 w-full">
        <div className="text-[32px] font-extrabold leading-10 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          NutriAI
        </div>
        <nav className="hidden md:flex space-x-8">
          <a className="text-primary font-bold transition-colors" href="#">Home</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#intake">Planner</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#results">Dashboard</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Community</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            title="Sign Out"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
            <span className="hidden md:inline text-xs font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary transition-colors">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-[819px] flex flex-col justify-center items-center text-center px-5 md:px-16 mb-24 overflow-hidden">
      <div className="max-w-4xl scroll-reveal active">
        <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-widest uppercase mb-6 border border-primary/20 animate-glow">
          Next-Gen Health Intelligence
        </span>
        <h1 className="text-[32px] md:text-[48px] font-extrabold leading-tight tracking-tight mb-6">
          Personalized Nutrition <br />
          <span className="text-primary">Powered by AI</span>
        </h1>
        <p className="text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          Generate science-backed diet plans tailored to your specific goals, body composition, and culinary preferences in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="primary-gradient text-on-primary-container font-bold py-4 px-8 rounded-xl inner-glow hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20"
            onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
          >
            Generate My Plan
          </button>
          <button className="glass text-on-surface font-bold py-4 px-8 rounded-xl hover:bg-white/5 transition-all">
            View Demo Results
          </button>
        </div>
      </div>

      {/* Floating Decorative Cards */}
      <div className="hidden lg:block relative w-full h-48 mt-12">
        <div className="absolute left-10 top-0 glass p-6 rounded-2xl w-64 rotate-[-6deg]">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">local_fire_department</span>
            <span className="text-sm font-bold">2,450 kcal</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[70%]"></div>
          </div>
        </div>
        <div className="absolute right-10 top-10 glass p-6 rounded-2xl w-64 rotate-[6deg]">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-tertiary">restaurant</span>
            <span className="text-sm font-bold">Miso Salmon Bowl</span>
          </div>
          <p className="text-[10px] text-on-surface-variant">Recommended for Lunch</p>
        </div>
      </div>
    </section>
  );
}

// ─── Intake / Profile Form ───────────────────────────────────────────────────
function IntakeSection({ formData, errors, goal, setGoal, onChange, onGenerate, loading }) {
  const { age, gender, weight, height, dietPreference } = formData;

  const goals = [
    { value: "Lose Weight", label: "Lose Weight" },
    { value: "Maintain Weight", label: "Maintain" },
    { value: "Gain Weight", label: "Bulk Up" },
  ];

  return (
    <section className="px-5 md:px-16 mb-32 scroll-reveal active" id="intake">
      <div className="max-w-3xl mx-auto glass-dark p-8 md:p-12 rounded-[24px]">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Create Your Profile</h2>
          <p className="text-on-surface-variant">Our AI needs a few details to craft your optimal nutritional path.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">AGE</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_today</span>
              <input
                className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-on-surface"
                placeholder="28"
                type="number"
                value={age}
                onChange={(e) => onChange("age", e.target.value)}
              />
            </div>
            {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">GENDER</label>
            <select
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none cursor-pointer text-on-surface"
              value={gender}
              onChange={(e) => onChange("gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">WEIGHT (KG)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">weight</span>
              <input
                className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none text-on-surface"
                placeholder="75"
                type="number"
                value={weight}
                onChange={(e) => onChange("weight", e.target.value)}
              />
            </div>
            {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight}</p>}
          </div>

          {/* Height */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">HEIGHT (CM)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">straighten</span>
              <input
                className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none text-on-surface"
                placeholder="180"
                type="number"
                value={height}
                onChange={(e) => onChange("height", e.target.value)}
              />
            </div>
            {errors.height && <p className="text-red-400 text-xs mt-1">{errors.height}</p>}
          </div>

          {/* Goal */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">FITNESS GOAL</label>
            <div className="grid grid-cols-3 gap-3">
              {goals.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoal(g.value)}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    goal === g.value
                      ? "glass-dark border border-primary text-primary"
                      : "glass text-on-surface hover:border-primary/50"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            {errors.goal && <p className="text-red-400 text-xs mt-1">{errors.goal}</p>}
          </div>

          {/* Diet Preference */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant ml-1">DIETARY PREFERENCE</label>
            <select
              className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary outline-none text-on-surface"
              value={dietPreference}
              onChange={(e) => onChange("dietPreference", e.target.value)}
            >
              <option value="">Select Dietary Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non Vegetarian">Non Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Keto">Keto</option>
            </select>
            {errors.dietPreference && <p className="text-red-400 text-xs mt-1">{errors.dietPreference}</p>}
          </div>

          {/* Submit */}
          <button
            className="md:col-span-2 primary-gradient py-4 rounded-xl font-bold text-on-primary-container mt-4 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? "Analyzing your profile…" : "Generate My AI Nutrition Plan"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Loading Section ─────────────────────────────────────────────────────────
function LoadingSection() {
  return (
    <section className="px-5 mb-32 scroll-reveal active text-center" id="loading">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="w-24 h-24 relative mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <span
            className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            psychology
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Analyzing 5,000+ Nutrition Datapoints</h3>
        <p className="text-on-surface-variant">Optimizing protein-to-carb ratios for your specific metabolism…</p>
      </div>
    </section>
  );
}

// ─── Markdown → HTML parser for diet plan output ────────────────────────────
function parseDietPlan(text) {
  if (!text) return "";
  return text
    // Escape any existing HTML to prevent injection
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Bold: **text** or __text__
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    // H1: # heading
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // H2: ## heading
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // H3: ### heading
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // Horizontal rule
    .replace(/^---+$/gm, "<hr/>")
    // Bullet list items: lines starting with - or *
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // Numbered list items: lines starting with 1. 2. etc.
    .replace(/^\d+\. (.+)$/gm, "<oli>$1</oli>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    // Wrap consecutive <oli> in <ol>
    .replace(/(<oli>.*<\/oli>\n?)+/g, (m) =>
      `<ol>${m.replace(/<oli>/g, "<li>").replace(/<\/oli>/g, "</li>")}</ol>`
    )
    // Remaining non-empty lines that aren't already wrapped → paragraphs
    .replace(/^(?!<[houli]).+$/gm, (line) =>
      line.trim() ? `<p>${line}</p>` : ""
    )
    // Clean up blank lines
    .replace(/\n{2,}/g, "");
}

// ─── Results Section ─────────────────────────────────────────────────────────
function ResultsSection({ dietPlan }) {
  return (
    <section className="px-5 md:px-16 mb-32 scroll-reveal active" id="results">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass p-6 rounded-[24px]">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-6">DAILY TARGET</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-highest" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8" />
                  <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="110" strokeWidth="8" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold">2,100</span>
                  <span className="text-xs text-on-surface-variant">KCAL LEFT</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center">
                <div className="text-primary font-bold">140g</div>
                <div className="text-[10px] text-on-surface-variant uppercase">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-secondary font-bold">220g</div>
                <div className="text-[10px] text-on-surface-variant uppercase">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-tertiary font-bold">65g</div>
                <div className="text-[10px] text-on-surface-variant uppercase">Fats</div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-[24px] bg-gradient-to-br from-tertiary/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
              <h4 className="font-bold text-tertiary">AI Insight</h4>
            </div>
            <p className="text-sm leading-relaxed text-on-surface">
              Based on your activity level, increasing protein intake by 15% today will accelerate your metabolic recovery.
            </p>
          </div>
        </div>

        {/* Diet Plan Output */}
        <div className="lg:col-span-8">
          <div className="glass rounded-[24px] p-8 h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              <h3 className="text-xl font-bold">Your Personalized Nutrition Plan</h3>
            </div>
            <div
              className="diet-plan-output diet-plan-scroll overflow-y-auto max-h-[600px] pr-2"
              dangerouslySetInnerHTML={{ __html: parseDietPlan(dietPlan) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Meal Showcase Cards ─────────────────────────────────────────────────────
function MealShowcase() {
  const meals = [
    {
      tag: "Breakfast",
      tagColor: "bg-primary text-on-primary-container",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2IaU2z1wHvD1YrLYfL1tNzWJ9rvR4idKdx5Na8OiIz-TPC_23Bc7laFY8G4cO-NcAbSB_edSeX80dJQdz0bfvojODAwcuAXqHgg__s6UXC7ye62KNO4YG7kSMCO8uq7Szl_aMj6qbbTMimdj2TNcPYuqUZ7fBJKj9g0MV6ubRmntWot4Vc-VRAJ3trK58drbVID0Y6Z7ECe0J9qL5FCEmyrI972LYN5Xy_r-y6zWYc3UWGtngva2kdgGlgdx5Gd6qzaXcvv4PdXwE",
      title: "Greek Yogurt & Berry Power Bowl",
      desc: "High-protein starter with slow-release antioxidants.",
      kcal: "340 kcal",
      protein: "28g Protein",
    },
    {
      tag: "Lunch",
      tagColor: "bg-secondary text-on-secondary-container",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlGtKsXu1o5eY0K1P3ur8uMhKszJCPQkm2N6DFtyLjMQjU-cT7saJ-sj0LPB3UsBQ7hIwnn10fsS47Xps4ngBDUid2zbNInn-JMv8at6c_Mp3QnLrEJF4UdhXogzsWrBwZDcOiqTxvvnbjsP8eJCLd597NSmcF8EwzeqNuwuRgPFrbGXRV1gie1rh-cjE0xbEvwR3-FKwr8l_wQCw-j6H91phLQEtWN9hdt053s1HYOYKEIv_4WSvJxhFWmM9eeDXbRSWORw7yvzMJ",
      title: "Lemon Zest Chicken & Asparagus",
      desc: "Lean protein paired with complex fibrous greens.",
      kcal: "520 kcal",
      protein: "45g Protein",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-8">
      {meals.map((meal) => (
        <div key={meal.tag} className="glass group overflow-hidden rounded-[24px] transition-all hover:scale-[1.02]">
          <div className="h-48 w-full overflow-hidden relative">
            <img className="w-full h-full object-cover" src={meal.src} alt={meal.title} />
            <div className={`absolute top-4 right-4 ${meal.tagColor} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
              {meal.tag}
            </div>
          </div>
          <div className="p-6">
            <h5 className="text-lg font-bold mb-1">{meal.title}</h5>
            <p className="text-sm text-on-surface-variant mb-4">{meal.desc}</p>
            <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <div className="flex gap-4">
                <span className="text-xs font-bold text-primary">{meal.kcal}</span>
                <span className="text-xs text-on-surface-variant">{meal.protein}</span>
              </div>
              <button className="material-symbols-outlined text-primary">add_circle</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      name: "David Chen",
      sub: "Lost 12kg in 3 months",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB60qYdDXRCTE-JAdFvn3X5lAY6qajpHoegEjCoY4g3UHVVkOJRHUNtbN2VzWZp71pVSMOej9FIW3aTFFYm1ufrwAQFc4lDWw898NaBulCmSJN9wHaMVEI7CnDt60gvuDjWBKnU1DXFZBEOUlrAjIYVY9jQbWNLmA_YasqB4ZNUHI1mJf6Zxww5onuqUBt05V_ZCbGg8UtLNC_QHb1Vq2_W2TSbtsV9o1a3y2lYkTkR6gQXrDidXFwn0fU27_vA4OQikLoffizuoHJz",
      quote: '"NutriAI completely removed the guesswork from my meal prepping. The AI adjustments based on my lifting sessions were a game changer."',
    },
    {
      name: "Sarah Jenkins",
      sub: "Improved energy levels",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCqH0nbKsi5eBr0Cutl9CejetGQUMXYPWw7OJFGvCBnV70-qEywgQyeU2b_q_gglWizDrfV8qZxHrYPErf1rfjsY_fy9Ka-_-vrISqAojtPeSdWfCAId56kmCML6T0HFQizv-wZ-ruXAiEXe4BzTdT8J3gbld_X0769taTAb-LqYG8kK5MjEKXMUQpQ8uuGsbsfBryOTtmwy3KA72TVsx6FXNKpx-sx7loGsjdM_EZl7cktxtL3m0D3eCeB2_bcUsyU_ztbgXYeqCI",
      quote: '"I finally found a diet that sticks because it actually likes the food I like. The glassmorphic UI is just the icing on the cake."',
    },
    {
      name: "Marcus Reed",
      sub: "Optimized recovery",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiU2_OmoOSSRwHTd2O6F2HpNQmPRm9mhtNPKofH6BxVgzwQgBBYTuB5cpPjKQyHd8HrdqNLJwUBrIrbRiFUK0on5hyEt47RCF1uFz8tZcwpuo21GE6MmjR-1lOmINVgQpWLmXjxTQImJtGcitOP-9T4bi_m9Tu8gOSoRS_HA_AaPOrfrORsoDiTF-pGDUjUaoGkx2VP0YMA6PLcSmOKG65mWk9Tc_jcpC4ZSdKEJYR9Y2Qg7wEUi-HxouqxIxg71xABSpN6LxD-DdX",
      quote: '"The level of detail in the macros is insane. It\'s like having a clinical nutritionist in my pocket 24/7."',
    },
  ];

  return (
    <section className="px-5 md:px-16 mb-32 scroll-reveal active">
      <h2 className="text-2xl font-bold text-center mb-12">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass p-8 rounded-[24px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border border-primary/30 overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" src={t.src} alt={t.name} />
              </div>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-on-surface-variant">{t.sub}</p>
              </div>
            </div>
            <p className="text-sm italic leading-relaxed text-on-surface-variant">{t.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-white/5 py-12 px-5 md:px-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="text-2xl font-extrabold text-primary mb-6">NutriAI</div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Precision nutrition for the modern professional. Built on scientific research and generative AI.
          </p>
        </div>
        <div>
          <h6 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-6">Platform</h6>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Science</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-6">Company</h6>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-xs font-semibold tracking-widest uppercase text-on-surface mb-6">Connect</h6>
          <div className="flex gap-4">
            <a className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-on-surface-variant uppercase tracking-widest">
        © 2024 NutriAI Technologies. All Health Data is Encrypted.
      </div>
    </footer>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-surface-container/60 backdrop-blur-2xl border-t border-white/10 z-50">
      <a className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-4 py-1" href="#">
        <span className="material-symbols-outlined">home_health</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase">Home</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#intake">
        <span className="material-symbols-outlined">add_circle</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase">Log</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
        <span className="material-symbols-outlined">psychology</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase">Coach</span>
      </a>
      <a className="flex flex-col items-center justify-center text-on-surface-variant" href="#results">
        <span className="material-symbols-outlined">monitoring</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase">Stats</span>
      </a>
    </nav>
  );
}

// ─── Root App Component ──────────────────────────────────────────────────────
export default function App() {
  // Page routing state: "login" | "onboarding" | "goals" | "dashboard" | "app"
  const [page, setPage] = useState("login");

  // Form State
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [dietPreference, setDietPreference] = useState("");

  // UI State
  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("intake"); // "intake" | "loading" | "results"

  // Error State
  const [errors, setErrors] = useState({});

  // Activate scroll reveal
  useScrollReveal();

  // ── Page: Login ─────────────────────────────────────────────────────────────
  if (page === "login") {
    return <LoginPage onLogin={() => setPage("onboarding")} />;
  }

  // ── Page: Onboarding (Step 1 — Physical Vitals) ───────────────────────────
  if (page === "onboarding") {
    return (
      <OnboardingPage
        onContinue={(vitals) => {
          setGender(vitals.gender === "male" ? "Male" : "Female");
          setAge(vitals.age);
          setHeight(vitals.height);
          setWeight(vitals.weight);
          setPage("goals");
        }}
      />
    );
  }

  // ── Page: Goals (Step 2 — Life & Goals) ──────────────────────────────────
  if (page === "goals") {
    return (
      <GoalsPage
        onBack={() => setPage("onboarding")}
        onContinue={(prefs) => {
          setGoal(prefs.goal);
          setDietPreference(prefs.dietPreference);
          setPage("dashboard");
        }}
      />
    );
  }

  // ── Page: Dashboard ───────────────────────────────────────────────────────
  if (page === "dashboard") {
    return (
      <DashboardPage
        userProfile={{ gender, age, weight, height, goal, dietPreference }}
        onNavigatePlanner={() => setPage("app")}
        onSignOut={() => {
          setPage("login");
          setAge(""); setGender(""); setWeight(""); setHeight("");
          setGoal(""); setDietPreference("");
          setDietPlan(""); setView("intake"); setErrors({});
        }}
      />
    );
  }

  // Unified field change handler
  function handleChange(field, value) {
    const setters = {
      age: setAge,
      gender: setGender,
      weight: setWeight,
      height: setHeight,
      dietPreference: setDietPreference,
    };
    setters[field]?.(value);
  }

  // Validation Function
  function validateForm() {
    const newErrors = {};
    const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;

    if (!age.trim()) newErrors.age = "Age is required";
    else if (!ageRegex.test(age)) newErrors.age = "Age must be between 1 and 120";

    if (!gender) newErrors.gender = "Please select gender";

    if (!weight.trim()) newErrors.weight = "Weight is required";
    else if (weight < 20 || weight > 300) newErrors.weight = "Weight must be between 20 and 300 kg";

    if (!height.trim()) newErrors.height = "Height is required";
    else if (height < 50 || height > 250) newErrors.height = "Height must be between 50 and 250 cm";

    if (!goal) newErrors.goal = "Please select your goal";
    if (!dietPreference) newErrors.dietPreference = "Please select dietary preference";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Generate Diet Plan — Groq client created at call time so env var is always fresh
  async function generateDietPlan() {
    if (!validateForm()) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setDietPlan(
        "⚠️ Missing API Key\n\nVITE_GROQ_API_KEY is not set.\n\nIf deployed on Vercel:\n1. Project → Settings → Environment Variables\n2. Add VITE_GROQ_API_KEY = your Groq key\n3. Redeploy"
      );
      setView("results");
      return;
    }

    const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

    setLoading(true);
    setDietPlan("");
    setView("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are an expert nutritionist and dietitian.

Generate a detailed healthy diet plan.

Requirements:
- Include Breakfast
- Mid-Morning Snack
- Lunch
- Evening Snack
- Dinner
- Water Intake Recommendation
- Daily Calorie Intake
- Health Tips

Format nicely with headings and bullet points.
`,
          },
          {
            role: "user",
            content: `
Create a personalized diet plan.

Age: ${age}
Gender: ${gender}
Weight: ${weight} kg
Height: ${height} cm
Goal: ${goal}
Diet Preference: ${dietPreference}
Activity Level: Moderately Active
`,
          },
        ],
      });

      setDietPlan(
        chatCompletion.choices[0]?.message?.content || "No response generated."
      );
    } catch (error) {
      console.error("Groq error:", error);
      setDietPlan(
        `❌ Generation failed.\n\nError: ${error?.message || String(error)}\n\nCheck that VITE_GROQ_API_KEY is valid and the Groq API is reachable.`
      );
    }

    setLoading(false);
    setView("results");
  }

  function handleSignOut() {
    setPage("login");
    // Reset all state
    setAge(""); setGender(""); setWeight(""); setHeight("");
    setGoal(""); setDietPreference("");
    setDietPlan("");
    setView("intake");
    setErrors({});
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <ShaderBackground />
      <Header onSignOut={handleSignOut} />

      <main className="relative pt-24 pb-32">
        <HeroSection />

        {/* Intake Form — hidden once results are shown */}
        {view !== "results" && (
          <IntakeSection
            formData={{ age, gender, weight, height, dietPreference }}
            errors={errors}
            goal={goal}
            setGoal={setGoal}
            onChange={handleChange}
            onGenerate={generateDietPlan}
            loading={loading}
          />
        )}

        {/* Loading spinner */}
        {view === "loading" && <LoadingSection />}

        {/* AI Results */}
        {view === "results" && dietPlan && (
          <>
            <ResultsSection dietPlan={dietPlan} />
            <div className="flex justify-center mb-16">
              <button
                className="glass text-primary font-bold py-3 px-8 rounded-xl hover:bg-white/5 transition-all border border-primary/30"
                onClick={() => {
                  setView("intake");
                  setDietPlan("");
                  document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                ← Generate Another Plan
              </button>
            </div>
          </>
        )}

        <Testimonials />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
