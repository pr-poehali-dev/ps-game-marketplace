import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, Mode, Game } from "@/components/game/types";
import { CatalogSection } from "@/components/game/Catalog";
import { CartSection, ProfileSection, SupportSection, RegisterModal } from "@/components/game/Sections";

const Index = () => {
  const [section, setSection] = useState<Section>("catalog");
  const [mode, setMode] = useState<Mode>("buy");
  const [cart, setCart] = useState<Game[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const addToCart = (game: Game) => {
    setCart((prev) => {
      if (prev.find((g) => g.id === game.id)) return prev;
      return [...prev, game];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((g) => g.id !== id));
  };

  const navItems: { id: Section; label: string; icon: "LayoutGrid" | "ShoppingCart" | "User" | "Headphones" }[] = [
    { id: "catalog", label: "Каталог", icon: "LayoutGrid" },
    { id: "cart", label: "Корзина", icon: "ShoppingCart" },
    { id: "profile", label: "Профиль", icon: "User" },
    { id: "support", label: "Поддержка", icon: "Headphones" },
  ];

  return (
    <div className="min-h-screen">
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(10, 14, 26, 0.92)",
          backdropFilter: "blur(20px)",
          borderColor: "hsl(var(--border))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--neon-blue), var(--neon-purple))",
                  boxShadow: "0 0 16px rgba(0,212,255,0.5)",
                }}
              >
                <Icon name="Gamepad2" size={16} className="text-black" />
              </div>
              <span className="font-orbitron text-base font-bold">
                <span className="neon-text-blue">GAME</span>
                <span className="text-white">ZONE</span>
              </span>
              <span className="hidden sm:block font-orbitron text-gray-600 ml-1 mt-0.5" style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                PlayStation Store
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`nav-link text-sm flex items-center gap-1.5 relative ${section === item.id ? "active" : "text-gray-400"}`}
                  style={section === item.id ? { color: "var(--neon-blue)" } : {}}
                >
                  <Icon name={item.icon} size={14} />
                  {item.label}
                  {item.id === "cart" && cart.length > 0 && (
                    <span className="cart-badge absolute -top-2 -right-3">{cart.length}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex rounded-lg p-1 gap-1" style={{ background: "hsl(var(--muted))" }}>
                <button
                  onClick={() => setMode("buy")}
                  className={`px-4 py-1.5 rounded-md text-xs font-rajdhani font-semibold tracking-wide transition-all ${mode === "buy" ? "glow-btn-primary" : "text-gray-500"}`}
                >
                  КУПИТЬ
                </button>
                <button
                  onClick={() => setMode("rent")}
                  className={`px-4 py-1.5 rounded-md text-xs font-rajdhani font-semibold tracking-wide transition-all ${mode === "rent" ? "glow-btn-primary" : "text-gray-500"}`}
                >
                  АРЕНДОВАТЬ
                </button>
              </div>

              <button
                onClick={() => setShowRegister(true)}
                className="glow-btn-blue px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
              >
                <Icon name="UserPlus" size={14} />
                <span className="hidden sm:inline">Регистрация</span>
              </button>

              <button
                className="md:hidden text-gray-400 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t py-4 space-y-2 animate-slide-up" style={{ borderColor: "hsl(var(--border))" }}>
              <div className="flex rounded-lg p-1 gap-1 mb-3" style={{ background: "hsl(var(--muted))" }}>
                <button
                  onClick={() => setMode("buy")}
                  className={`flex-1 py-2 rounded-md text-xs font-rajdhani font-semibold tracking-wide transition-all ${mode === "buy" ? "glow-btn-primary" : "text-gray-500"}`}
                >
                  КУПИТЬ
                </button>
                <button
                  onClick={() => setMode("rent")}
                  className={`flex-1 py-2 rounded-md text-xs font-rajdhani font-semibold tracking-wide transition-all ${mode === "rent" ? "glow-btn-primary" : "text-gray-500"}`}
                >
                  АРЕНДОВАТЬ
                </button>
              </div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSection(item.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 font-rajdhani text-sm font-semibold transition-all ${section === item.id ? "text-[var(--neon-blue)]" : "text-gray-400"}`}
                  style={section === item.id ? { background: "rgba(0,212,255,0.1)", color: "var(--neon-blue)" } : {}}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                  {item.id === "cart" && cart.length > 0 && (
                    <span className="cart-badge ml-auto">{cart.length}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {section === "catalog" && (
        <div className="hero-grid-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ background: "var(--neon-blue)", boxShadow: "0 0 8px var(--neon-blue)" }}
                />
                <span className="font-orbitron text-xs text-gray-500 uppercase tracking-widest">
                  {mode === "buy" ? "Магазин игр" : "Прокат игр"}
                </span>
              </div>
              <h1 className="font-orbitron text-3xl sm:text-4xl font-black">
                <span className="neon-text-blue">PlayStation</span>{" "}
                <span className="text-white">{mode === "buy" ? "Store" : "Rental"}</span>
              </h1>
            </div>
            <CatalogSection mode={mode} onAddToCart={addToCart} />
          </div>
        </div>
      )}

      {section === "cart" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <CartSection items={cart} onRemove={removeFromCart} mode={mode} />
        </div>
      )}

      {section === "profile" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <ProfileSection />
        </div>
      )}

      {section === "support" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SupportSection />
        </div>
      )}

      <footer className="mt-16 border-t" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-orbitron text-sm font-bold">
                <span className="neon-text-blue">GAME</span>
                <span className="text-gray-600">ZONE</span>
              </span>
              <span className="text-gray-700 font-rajdhani text-xs">© 2026</span>
            </div>
            <div className="flex gap-6 text-xs font-rajdhani text-gray-600">
              <button className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-blue)")} onMouseLeave={(e) => (e.currentTarget.style.color = "")}>Условия</button>
              <button className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-blue)")} onMouseLeave={(e) => (e.currentTarget.style.color = "")}>Политика</button>
              <button className="transition-colors" onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-blue)")} onMouseLeave={(e) => (e.currentTarget.style.color = "")}>Контакты</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
