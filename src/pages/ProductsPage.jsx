import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/lib/hook";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const router = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.user || {});

  useEffect(() => {
    //  თუ სტატუსი ჯერ კიდევ null-ია (იტვირთება), არაფერი ქნას
    if (isLoggedIn === null) return;

    //  გადამისამართების ლოგიკა
    const hasRedirected = sessionStorage.getItem("initialRedirect");
    if (isLoggedIn === false && !hasRedirected) {
      sessionStorage.setItem("initialRedirect", "true");
      router("/login");
      return;
    }

    // პროდუქტების წამოღება
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isLoggedIn, router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-xl font-bold text-white tracking-widest uppercase italic">
          Loading Products...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-red-500 font-bold border border-red-500 p-6 rounded-2xl bg-red-500/10">
          შეცდომა: {error}
        </div>
      </div>
    );

  // კატეგორიები პირდაპირ API-დან მოსულ პროდუქტებზე დაყრდნობით
  const categories = [...new Set(products.map((p) => p.category))];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const query = search.trim().toLowerCase();
  const filteredProducts = products.filter((item) => {
    const matchesSearch = !query || item.title.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  const hasFilters = query !== "" || selectedCategories.length > 0;

  return (
    <main className="max-w-[1568px] mx-auto p-8 pt-12">
      {/* გვერდის სათაური */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
          Exclusive <span className="text-blue-600">Collection</span>
        </h1>
        <div className="h-1.5 w-24 bg-blue-600 mt-3 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ფილტრების პანელი (მარცხენა მხარე) */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-28">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:border-blue-600 transition-colors"
          />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                Categories
              </span>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                  }}
                  className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-row flex-wrap lg:flex-col gap-x-6 gap-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm font-medium capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* პროდუქტების გრიდი */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-400 font-medium py-12">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {filteredProducts.map((item) => (
                <Link
                  to={`/products/details/${item.id}`}
                  key={item.id}
                  className="group"
                >
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 flex flex-col h-full relative overflow-hidden border border-gray-50">
                    {/* სურათის კონტეინერი */}
                    <div className="h-48 w-full flex justify-center items-center mb-6 relative">
                      <div className="absolute inset-0 bg-gray-50 rounded-3xl z-0 scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-[80%] object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* ინფორმაცია */}
                    <div className="flex flex-col grow">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                        Premium Quality
                      </span>
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* ფასი და ღილაკის იმიტაცია */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xl font-black text-black tracking-tight">
                          ${item.price}
                        </p>
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
