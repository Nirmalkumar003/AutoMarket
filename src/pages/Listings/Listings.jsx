import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useVehicles } from "../../context/VehicleContext";
import "./Listings.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80";

function getVehicleName(vehicle) {
    return vehicle.name || [vehicle.brand, vehicle.model].filter(Boolean).join(" ") || "Pre-owned vehicle";
}

function getPrice(vehicle) {
    const value = Number(String(vehicle.price ?? 0).replace(/[₹,\s]/g, ""));
    return Number.isFinite(value) ? value : 0;
}

function formatPrice(price) {
    return `₹${getPrice({ price }).toLocaleString("en-IN")}`;
}

function getKilometres(vehicle) {
    const raw = vehicle.km ?? vehicle.kilometres ?? vehicle.mileage ?? "—";
    if (typeof raw === "number") return `${raw.toLocaleString("en-IN")} km`;
    const text = String(raw).trim();
    if (!text || text === "—") return "KM not listed";
    return /km/i.test(text) ? text : `${text} km`;
}

function Listings() {
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { vehicles = [] } = useVehicles();

    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [maxPrice, setMaxPrice] = useState("all");
    const [sort, setSort] = useState("recommended");

    const filteredVehicles = useMemo(() => {
        const term = search.trim().toLowerCase();

        const result = vehicles.filter((vehicle) => {
            const vehicleName = getVehicleName(vehicle).toLowerCase();
            const brand = String(vehicle.brand || "").toLowerCase();
            const model = String(vehicle.model || "").toLowerCase();
            const city = String(vehicle.city || "").toLowerCase();

            const matchesSearch =
                !term ||
                vehicleName.includes(term) ||
                brand.includes(term) ||
                model.includes(term) ||
                city.includes(term);

            const matchesType =
                type === "all" || String(vehicle.type || "").toLowerCase() === type;

            const matchesPrice =
                maxPrice === "all" || getPrice(vehicle) <= Number(maxPrice);

            return matchesSearch && matchesType && matchesPrice;
        });

        if (sort === "low-high") result.sort((a, b) => getPrice(a) - getPrice(b));
        if (sort === "high-low") result.sort((a, b) => getPrice(b) - getPrice(a));
        if (sort === "newest") {
            result.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
        }

        return result;
    }, [vehicles, search, type, maxPrice, sort]);

    const clearFilters = () => {
        setSearch("");
        setType("all");
        setMaxPrice("all");
        setSort("recommended");
    };

    return (
        <main className="listings-page">
            <section className="listings-hero">
                <div className="listings-heading">
                    <div>
                        <p className="listings-eyebrow">THE AUT0MARKET COLLECTION</p>
                        <h1>Find a ride that <span>fits your life.</span></h1>
                        <p className="listings-intro">
                            Explore pre-owned cars and bikes, compare your options, and find
                            your next ride with confidence.
                        </p>
                    </div>
                    <Link to="/sell" className="listings-sell-button">
                        <span aria-hidden="true">＋</span> Sell your vehicle
                    </Link>
                </div>
                <div className="listings-trust-row" aria-label="Marketplace benefits">
                    <span><span className="listings-trust-icon">✓</span> Browse local listings</span>
                    <span><span className="listings-trust-icon">↗</span> Compare your options</span>
                    <span><span className="listings-trust-icon">♡</span> Save your favourites</span>
                </div>
            </section>

            <section className="listings-toolbar" aria-label="Search and filter vehicles">
                <label className="listings-search">
                    <span className="listings-search-icon" aria-hidden="true">⌕</span>
                    <span className="listings-sr-only">Search vehicles</span>
                    <input
                        type="search"
                        placeholder="Search by brand, model or city..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    {search && (
                        <button className="listings-clear-search" type="button" onClick={() => setSearch("")} aria-label="Clear search">
                            ×
                        </button>
                    )}
                </label>

                <label className="listings-filter">
                    <span>Vehicle type</span>
                    <select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter vehicle type">
                        <option value="all">All vehicles</option>
                        <option value="car">Cars</option>
                        <option value="bike">Bikes</option>
                    </select>
                </label>

                <label className="listings-filter">
                    <span>Maximum budget</span>
                    <select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Filter maximum price">
                        <option value="all">Any budget</option>
                        <option value="200000">Under ₹2 lakh</option>
                        <option value="500000">Under ₹5 lakh</option>
                        <option value="1000000">Under ₹10 lakh</option>
                        <option value="1500000">Under ₹15 lakh</option>
                    </select>
                </label>

                <label className="listings-filter listings-sort">
                    <span>Sort by</span>
                    <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort vehicles">
                        <option value="recommended">Recommended</option>
                        <option value="low-high">Price: low to high</option>
                        <option value="high-low">Price: high to low</option>
                        <option value="newest">Newest first</option>
                    </select>
                </label>
            </section>

            <section className="listings-results">
                <div className="listings-results-heading">
                    <div>
                        <p className="listings-eyebrow listings-results-eyebrow">YOUR NEXT RIDE STARTS HERE</p>
                        <h2>Available vehicles <span className="listings-count">{filteredVehicles.length}</span></h2>
                        <p className="listings-results-subtitle">
                            {search || type !== "all" || maxPrice !== "all"
                                ? "Here are the vehicles that match your filters."
                                : "Browse the latest vehicles listed on AutoMarket."}
                        </p>
                    </div>
                    {(search || type !== "all" || maxPrice !== "all" || sort !== "recommended") && (
                        <button type="button" className="listings-reset-button" onClick={clearFilters}>
                            Reset filters <span aria-hidden="true">↺</span>
                        </button>
                    )}
                </div>

                {filteredVehicles.length > 0 ? (
                    <div className="listings-grid">
                        {filteredVehicles.map((vehicle) => {
                            const vehicleName = getVehicleName(vehicle);
                            const wishlisted = isWishlisted(vehicle.id);
                            return (
                                <article className="listing-card" key={vehicle.id}>
                                    <Link
                                        to={`/vehicle/${vehicle.id}`}
                                        className="listing-image-link"
                                        aria-label={`View ${vehicleName} details`}
                                    >
                                        <div className="listing-image-wrapper">
                                            <img
                                                src={vehicle.image || vehicle.images?.[0] || FALLBACK_IMAGE}
                                                alt={vehicleName}
                                                className="listing-image"
                                                loading="lazy"
                                                onError={(event) => {
                                                    if (event.currentTarget.src !== FALLBACK_IMAGE) {
                                                        event.currentTarget.src = FALLBACK_IMAGE;
                                                    }
                                                }}
                                            />
                                            <span className="listing-type-badge">
                                                {String(vehicle.type || "vehicle").toUpperCase()}
                                            </span>
                                        </div>
                                    </Link>

                                    <button
                                        type="button"
                                        className={`listing-favorite ${wishlisted ? "is-wishlisted" : ""}`}
                                        aria-label={wishlisted ? `Remove ${vehicleName} from wishlist` : `Add ${vehicleName} to wishlist`}
                                        aria-pressed={wishlisted}
                                        onClick={() => toggleWishlist(vehicle)}
                                    >
                                        {wishlisted ? "♥" : "♡"}
                                    </button>

                                    <div className="listing-card-content">
                                        <div className="listing-card-title-row">
                                            <div>
                                                <p className="listing-brand">{vehicle.brand || "PRE-OWNED"}</p>
                                                <h3><Link to={`/vehicle/${vehicle.id}`}>{vehicleName}</Link></h3>
                                            </div>
                                            <span className="listing-year-pill">{vehicle.year || "Year N/A"}</span>
                                        </div>

                                        <p className="listing-price">{formatPrice(vehicle.price)}</p>

                                        <div className="listing-specs">
                                            <span><span aria-hidden="true">◷</span>{getKilometres(vehicle)}</span>
                                            <span><span aria-hidden="true">⛽</span>{vehicle.fuel || "Fuel N/A"}</span>
                                            {vehicle.transmission && <span><span aria-hidden="true">⚙</span>{vehicle.transmission}</span>}
                                        </div>

                                        <div className="listing-card-footer">
                                            <span className="listing-location"><span aria-hidden="true">⌖</span> {vehicle.city || "Location not listed"}</span>
                                            <Link to={`/vehicle/${vehicle.id}`} className="listing-details-link">
                                                View details <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="listings-empty">
                        <div className="listings-empty-icon" aria-hidden="true">⌕</div>
                        <h3>No matching vehicles yet</h3>
                        <p>Try a different keyword or loosen your filters to see more results.</p>
                        <button type="button" onClick={clearFilters}>Clear all filters</button>
                    </div>
                )}
            </section>

            <section className="listings-bottom-cta">
                <div>
                    <p className="listings-eyebrow">HAVE A VEHICLE TO SELL?</p>
                    <h2>Your next buyer could be here.</h2>
                    <p>Create a listing and help the right buyer discover your vehicle.</p>
                </div>
                <Link to="/sell" className="listings-bottom-cta-link">List your vehicle <span aria-hidden="true">→</span></Link>
            </section>
        </main>
    );
}

export default Listings;
