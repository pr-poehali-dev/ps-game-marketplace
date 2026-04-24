import { useState } from "react";
import Icon from "@/components/ui/icon";
import { GAMES, Game, Mode } from "./types";

export function CartSection({
  items,
  onRemove,
  mode,
}: {
  items: Game[];
  onRemove: (id: number) => void;
  mode: Mode;
}) {
  const total = items.reduce((sum, item) => {
    const price = mode === "buy" ? Math.round(item.saleTL * 3) : item.rentPrice;
    return sum + price;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="animate-fade-in text-center py-24">
        <Icon name="ShoppingCart" size={64} className="mx-auto mb-6 text-gray-700" />
        <h2 className="font-orbitron text-xl text-gray-500 mb-2">Корзина пуста</h2>
        <p className="font-rajdhani text-gray-600">Добавь игры из каталога</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="font-orbitron text-2xl font-bold mb-6 neon-text-blue">Корзина</h2>
      <div className="space-y-3 mb-6">
        {items.map((item) => {
          const price = mode === "buy" ? Math.round(item.saleTL * 3) : item.rentPrice;
          return (
            <div key={item.id} className="game-card rounded-xl p-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <span className={item.platform === "PS5" ? "badge-ps5 inline-block mb-1" : "badge-ps4 inline-block mb-1"}>
                  {item.platform}
                </span>
                <h3 className="font-orbitron text-sm font-bold text-white">{item.title}</h3>
                <p className="font-rajdhani text-xs text-gray-500 mt-0.5">
                  {mode === "buy" ? `${item.saleTL.toLocaleString()} ₺ · PS Store TR` : "Аренда/сутки"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="price-tag text-base">{price.toLocaleString()} ₽</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-600 transition-colors"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-pink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="game-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-rajdhani text-gray-400 text-lg">Итого</span>
          <span className="price-tag text-2xl">{total.toLocaleString()} ₽</span>
        </div>
        <div className="section-divider mb-4" />
        <button className="glow-btn-primary w-full py-4 rounded-xl text-base tracking-widest">
          ОФОРМИТЬ ЗАКАЗ
        </button>
      </div>
    </div>
  );
}

export function ProfileSection() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="game-card rounded-xl p-6 mb-6">
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-orbitron font-bold text-black"
            style={{ background: "linear-gradient(135deg, var(--neon-blue), var(--neon-purple))" }}
          >
            А
          </div>
          <div>
            <h2 className="font-orbitron text-xl font-bold text-white">Алексей_777</h2>
            <p className="font-rajdhani text-gray-500 text-sm mt-0.5">PlayStation Plus Platinum</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className="w-2 h-2 rounded-full animate-glow-pulse"
                style={{ background: "var(--neon-green)", boxShadow: "0 0 6px var(--neon-green)" }}
              />
              <span className="font-rajdhani text-xs" style={{ color: "var(--neon-green)" }}>Онлайн</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Игр куплено", value: "47", icon: "ShoppingBag" },
            { label: "Арендовано", value: "12", icon: "Clock" },
            { label: "Бонус-баллы", value: "3 480", icon: "Zap" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-4 text-center" style={{ background: "hsl(var(--muted))" }}>
              <Icon
                name={stat.icon as "ShoppingBag" | "Clock" | "Zap"}
                size={20}
                className="mx-auto mb-2"
                style={{ color: "var(--neon-blue)" }}
              />
              <div className="font-orbitron text-xl font-bold text-white">{stat.value}</div>
              <div className="font-rajdhani text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="game-card rounded-xl p-6">
        <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-4">Последние покупки</h3>
        <div className="space-y-3">
          {GAMES.slice(0, 3).map((game) => (
            <div key={game.id} className="flex items-center gap-3 py-2">
              <img src={game.image} alt={game.title} className="w-10 h-12 object-cover rounded-md" />
              <div className="flex-1">
                <p className="font-rajdhani text-sm font-semibold text-white">{game.title}</p>
                <p className="text-xs text-gray-600">Апрель 2026</p>
              </div>
              <span className="price-tag text-sm">{game.price.toLocaleString()} ₽</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupportSection() {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="font-orbitron text-2xl font-bold mb-6 neon-text-blue">Поддержка</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { icon: "MessageCircle", title: "Онлайн-чат", desc: "Ответим за 5 минут", color: "var(--neon-blue)" },
          { icon: "Phone", title: "Телефон", desc: "8-800-555-7777", color: "var(--neon-green)" },
          { icon: "Mail", title: "Email", desc: "support@gamezone.ru", color: "var(--neon-purple)" },
          { icon: "HelpCircle", title: "FAQ", desc: "База знаний", color: "var(--neon-pink)" },
        ].map((item) => (
          <button key={item.title} className="game-card rounded-xl p-5 text-left w-full">
            <div className="mb-3">
              <Icon
                name={item.icon as "MessageCircle" | "Phone" | "Mail" | "HelpCircle"}
                size={28}
                style={{ color: item.color, filter: `drop-shadow(0 0 6px ${item.color})` }}
              />
            </div>
            <h3 className="font-orbitron text-sm font-bold text-white mb-1">{item.title}</h3>
            <p className="font-rajdhani text-xs text-gray-500">{item.desc}</p>
          </button>
        ))}
      </div>

      <div className="game-card rounded-xl p-6">
        <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-4">Написать нам</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Тема обращения"
            className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all"
            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--neon-blue)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
          />
          <textarea
            placeholder="Опишите вашу проблему..."
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none transition-all resize-none"
            style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--neon-blue)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
          />
          <button className="glow-btn-primary w-full py-3.5 rounded-xl text-sm tracking-widest">
            ОТПРАВИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegisterModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length >= 4) result += ") " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 11 && password.length >= 6;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content rounded-2xl p-8 w-full max-w-sm animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-orbitron text-xl font-bold neon-text-blue">РЕГИСТРАЦИЯ</h2>
            <p className="font-rajdhani text-gray-500 text-sm mt-0.5">Создай аккаунт GudBuy Game</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-rajdhani text-xs text-gray-500 uppercase tracking-wider block mb-2">Имя</label>
            <div className="relative">
              <Icon name="User" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Твоё имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-rajdhani"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--neon-blue)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.2)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label className="font-rajdhani text-xs text-gray-500 uppercase tracking-wider block mb-2">Номер телефона</label>
            <div className="relative">
              <Icon name="Phone" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="w-full rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-rajdhani"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--neon-blue)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.2)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label className="font-rajdhani text-xs text-gray-500 uppercase tracking-wider block mb-2">Пароль</label>
            <div className="relative">
              <Icon name="Lock" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 text-sm focus:outline-none transition-all font-rajdhani"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--neon-blue)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.2)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <button
            onClick={() => isValid && onClose()}
            className="glow-btn-primary w-full py-3.5 rounded-xl text-sm tracking-widest"
            style={{ opacity: isValid ? 1 : 0.5 }}
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
        </div>
      </div>
    </div>
  );
}