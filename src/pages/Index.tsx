import { useState } from "react";
import Icon from "@/components/ui/icon";

// Цены с PS Store Турция, курс 1 ₺ = 3 ₽
const GAMES = [
  {
    id: 1,
    title: "EA SPORTS FC™ 26 Ultimate Edition",
    genre: "Спорт",
    platform: "PS5",
    price: 12000, // 4.000 ₺ × 3
    rentPrice: 490,
    rating: 4.2,
    reviews: 18432,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/39baf1bd-cda7-4ef1-85fc-456c9318a099.jpg",
    isNew: true,
    discount: 60, // скидка с сайта
    originalTL: 4000,
    saleTL: 1600,
  },
  {
    id: 2,
    title: "Ghost of Tsushima: Directors Cut",
    genre: "Экшн",
    platform: "PS5",
    price: 2097, // 699 ₺ × 3
    rentPrice: 199,
    rating: 4.9,
    reviews: 54210,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/acfa755b-8ae5-4537-914a-2802628eb634.jpg",
    isNew: false,
    discount: 50,
    originalTL: 699,
    saleTL: 350,
  },
  {
    id: 3,
    title: "Stellar Blade Complete Edition",
    genre: "Экшн",
    platform: "PS5",
    price: 12897, // 4.299 ₺ × 3
    rentPrice: 590,
    rating: 4.7,
    reviews: 22100,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/a6165a1b-2c71-46fd-85e5-c7fe84a5828e.jpg",
    isNew: true,
    discount: 40,
    originalTL: 4299,
    saleTL: 2579,
  },
  {
    id: 4,
    title: "Alan Wake 2",
    genre: "Хоррор",
    platform: "PS5",
    price: 989, // ~329,70 ₺ × 3
    rentPrice: 149,
    rating: 4.6,
    reviews: 31780,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/6ec256ba-fd6c-488b-be40-238f78e4c5eb.jpg",
    isNew: false,
    discount: 0,
    originalTL: 330,
    saleTL: 330,
  },
  {
    id: 5,
    title: "Grand Theft Auto V",
    genre: "Экшн",
    platform: "PS5",
    price: 2097, // 699 ₺ × 3
    rentPrice: 179,
    rating: 4.5,
    reviews: 98320,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/ef8bd73e-576c-46ad-8f5e-dd86fb78b212.jpg",
    isNew: false,
    discount: 0,
    originalTL: 699,
    saleTL: 699,
  },
  {
    id: 6,
    title: "UFC 5 Ultimate Edition",
    genre: "Спорт",
    platform: "PS5",
    price: 12000, // 4.000 ₺ × 3
    rentPrice: 399,
    rating: 4.3,
    reviews: 14560,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/12d96fff-fdf5-4cc0-91fd-36bad3d19b80.jpg",
    isNew: false,
    discount: 85,
    originalTL: 4000,
    saleTL: 600,
  },
  {
    id: 7,
    title: "Little Nightmares I & II Bundle",
    genre: "Хоррор",
    platform: "PS5",
    price: 6447, // 2.149 ₺ × 3
    rentPrice: 249,
    rating: 4.8,
    reviews: 41200,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/47f3ea5a-0b0b-499b-a1e3-966d2daeae31.jpg",
    isNew: false,
    discount: 85,
    originalTL: 2149,
    saleTL: 322,
  },
  {
    id: 8,
    title: "PRAGMATA",
    genre: "Экшн",
    platform: "PS5",
    price: 7737, // 2.579 ₺ × 3
    rentPrice: 490,
    rating: 4.4,
    reviews: 5430,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/c5805a80-fefd-4864-b21b-27b65e97740d.jpg",
    isNew: true,
    discount: 0,
    originalTL: 2579,
    saleTL: 2579,
  },
  {
    id: 9,
    title: "REANIMAL",
    genre: "Хоррор",
    platform: "PS5",
    price: 5247, // 1.749 ₺ × 3
    rentPrice: 290,
    rating: 4.1,
    reviews: 3210,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/47f3ea5a-0b0b-499b-a1e3-966d2daeae31.jpg",
    isNew: true,
    discount: 20,
    originalTL: 1749,
    saleTL: 1399,
  },
  {
    id: 10,
    title: "EA SPORTS FC 26",
    genre: "Спорт",
    platform: "PS5",
    price: 8700, // 2.899,99 ₺ × 3
    rentPrice: 380,
    rating: 4.0,
    reviews: 9870,
    image: "https://cdn.poehali.dev/projects/342eafbb-33cc-40ab-8c4b-723ed9ca85cb/files/39baf1bd-cda7-4ef1-85fc-456c9318a099.jpg",
    isNew: true,
    discount: 0,
    originalTL: 2900,
    saleTL: 2900,
  },
];

const GENRES = ["Все", "Экшн", "Спорт", "Хоррор", "РПГ", "Гонки", "Приключения"];
const PLATFORMS = ["Все", "PS5", "PS4"];
const SORT_OPTIONS = [
  { value: "popular", label: "Популярные" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "rating", label: "Рейтинг" },
];

type Section = "catalog" | "cart" | "profile" | "support";
type Mode = "buy" | "rent";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "star-filled text-sm" : "text-gray-600 text-sm"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function GameCard({
  game,
  mode,
  onAddToCart,
}: {
  game: (typeof GAMES)[0];
  mode: Mode;
  onAddToCart: (game: (typeof GAMES)[0]) => void;
}) {
  const salePriceRub = game.discount
    ? Math.round(game.saleTL * 3)
    : game.price;
  const finalPrice = salePriceRub;

  return (
    <div className="game-card rounded-xl overflow-hidden group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={game.platform === "PS5" ? "badge-ps5" : "badge-ps4"}>
            {game.platform}
          </span>
          {game.isNew && (
            <span
              className="text-white font-orbitron font-bold px-2 py-0.5 rounded"
              style={{ background: "var(--neon-pink)", fontSize: "0.6rem", boxShadow: "0 0 8px var(--neon-pink)" }}
            >
              NEW
            </span>
          )}
          {game.discount > 0 && (
            <span
              className="text-black font-orbitron font-bold px-2 py-0.5 rounded"
              style={{ background: "var(--neon-green)", fontSize: "0.6rem" }}
            >
              -{game.discount}%
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <StarRating rating={game.rating} />
              <span className="text-xs text-gray-400">{game.rating}</span>
            </div>
            <span className="text-xs text-gray-500 font-rajdhani">{game.reviews.toLocaleString()} отзывов</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs font-rajdhani text-gray-500 uppercase tracking-wider">{game.genre}</span>
        </div>
        <h3 className="font-orbitron text-sm font-bold text-white mb-3 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{game.title}</h3>

        <div className="flex items-center justify-between">
          <div>
            {mode === "buy" ? (
              <div>
                <div className="flex items-end gap-2">
                  <span className="price-tag text-lg">{finalPrice.toLocaleString()} ₽</span>
                  {game.discount > 0 && (
                    <span className="text-xs text-gray-600 line-through">{game.price.toLocaleString()} ₽</span>
                  )}
                </div>
                <div className="text-[10px] text-gray-600 font-rajdhani mt-0.5">
                  {game.saleTL.toLocaleString()} ₺ · PS Store TR
                </div>
              </div>
            ) : (
              <div>
                <span className="price-tag text-lg">{game.rentPrice.toLocaleString()} ₽</span>
                <span className="text-xs text-gray-500 font-rajdhani ml-1">/сутки</span>
              </div>
            )}
          </div>
          <button
            onClick={() => onAddToCart(game)}
            className="glow-btn-blue px-3 py-2 rounded-lg text-xs flex items-center gap-1.5"
          >
            <Icon name="ShoppingCart" size={14} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

function CatalogSection({
  mode,
  onAddToCart,
}: {
  mode: Mode;
  onAddToCart: (game: (typeof GAMES)[0]) => void;
}) {
  const [activeGenre, setActiveGenre] = useState("Все");
  const [activePlatform, setActivePlatform] = useState("Все");
  const [sortBy, setSortBy] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = GAMES.filter((g) => {
    const matchGenre = activeGenre === "Все" || g.genre === activeGenre;
    const matchPlatform = activePlatform === "Все" || g.platform === activePlatform;
    const price = mode === "buy" ? Math.round(g.saleTL * 3) : g.rentPrice;
    const matchPrice = price <= maxPrice;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchPlatform && matchPrice && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price_asc") return (mode === "buy" ? a.saleTL : a.rentPrice) - (mode === "buy" ? b.saleTL : b.rentPrice);
    if (sortBy === "price_desc") return (mode === "buy" ? b.saleTL : b.rentPrice) - (mode === "buy" ? a.saleTL : a.rentPrice);
    return b.reviews - a.reviews;
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Поиск по названию игры..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none transition-all"
            style={{
              background: "hsl(var(--muted))",
              borderColor: "hsl(var(--border))",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--neon-blue)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,212,255,0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--border))";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-56 shrink-0">
          <div className="game-card rounded-xl p-5 space-y-6">
            <div>
              <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-3">Жанр</h3>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`filter-chip ${activeGenre === genre ? "active" : ""}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-divider" />

            <div>
              <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-3">Платформа</h3>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setActivePlatform(platform)}
                    className={`filter-chip ${activePlatform === platform ? "active" : ""}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-divider" />

            <div>
              <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-3">
                {mode === "buy" ? "Макс. цена" : "Макс. аренда/сутки"}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-rajdhani text-gray-400">
                  <span>0 ₽</span>
                  <span style={{ color: "var(--neon-blue)" }}>{maxPrice.toLocaleString()} ₽</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={mode === "buy" ? 10000 : 500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "var(--neon-blue)" }}
                />
              </div>
            </div>

            <div className="section-divider" />

            <div>
              <h3 className="font-orbitron text-xs text-gray-500 uppercase tracking-widest mb-3">Сортировка</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-white text-sm font-rajdhani focus:outline-none transition-all"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: "#0d1117" }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="font-rajdhani text-gray-500 text-sm">
              Найдено:{" "}
              <span style={{ color: "var(--neon-blue)" }} className="font-semibold">
                {filteredGames.length}
              </span>{" "}
              игр
            </span>
          </div>
          {filteredGames.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Gamepad2" size={48} className="mx-auto mb-4 text-gray-700" />
              <p className="font-rajdhani text-gray-600 text-lg">Игры не найдены</p>
              <p className="text-gray-700 text-sm mt-1">Попробуй изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGames.map((game, idx) => (
                <div key={game.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <GameCard game={game} mode={mode} onAddToCart={onAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSection({
  items,
  onRemove,
  mode,
}: {
  items: (typeof GAMES)[0][];
  onRemove: (id: number) => void;
  mode: Mode;
}) {
  const total = items.reduce((sum, item) => {
    const price =
      mode === "buy"
        ? Math.round(item.saleTL * 3)
        : item.rentPrice;
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
          const price =
            mode === "buy"
              ? Math.round(item.saleTL * 3)
              : item.rentPrice;
          return (
            <div key={item.id} className="game-card rounded-xl p-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <span className={item.platform === "PS5" ? "badge-ps5 inline-block mb-1" : "badge-ps4 inline-block mb-1"}>
                  {item.platform}
                </span>
                <h3 className="font-orbitron text-sm font-bold text-white">{item.title}</h3>
                <p className="font-rajdhani text-xs text-gray-500 mt-0.5">{mode === "buy" ? `${item.saleTL.toLocaleString()} ₺ · PS Store TR` : "Аренда/сутки"}</p>
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

function ProfileSection() {
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
              <Icon name={stat.icon as "ShoppingBag" | "Clock" | "Zap"} size={20} className="mx-auto mb-2" style={{ color: "var(--neon-blue)" }} />
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

function SupportSection() {
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

const Index = () => {
  const [section, setSection] = useState<Section>("catalog");
  const [mode, setMode] = useState<Mode>("buy");
  const [cart, setCart] = useState<(typeof GAMES)[0][]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (game: (typeof GAMES)[0]) => {
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