import { useState } from "react";
import Icon from "@/components/ui/icon";
import { GAMES, GENRES, PLATFORMS, SORT_OPTIONS, Game, Mode } from "./types";

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
  game: Game;
  mode: Mode;
  onAddToCart: (game: Game) => void;
}) {
  const salePriceRub = game.discount ? Math.round(game.saleTL * 3) : game.price;
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
        <h3
          className="font-orbitron text-sm font-bold text-white mb-3 leading-tight"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {game.title}
        </h3>

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

export function CatalogSection({
  mode,
  onAddToCart,
}: {
  mode: Mode;
  onAddToCart: (game: Game) => void;
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
            style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}
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
