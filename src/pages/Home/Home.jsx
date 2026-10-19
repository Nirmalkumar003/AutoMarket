import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../../context/VehicleContext";
import "./Home.css";

const brands = ["Maruti Suzuki", "Hyundai", "Honda", "Toyota", "Royal Enfield", "Yamaha"];

const budgetOptions = [
    { label: "Under ₹1 Lakh", value: "under1", hint: "Affordable rides", icon: "₹" },
    { label: "Under ₹5 Lakhs", value: "under5", hint: "Everyday favourites", icon: "↗" },
    { label: "Under ₹10 Lakhs", value: "under10", hint: "More room to choose", icon: "◆" },
    { label: "Above ₹10 Lakhs", value: "above10", hint: "Premium picks", icon: "✦" },
];

function formatPrice(price) {
    const amount = Number(price) || 0;
    return `₹${amount.toLocaleString("en-IN")}`;
}

function getKilometres(value) {
    if (typeof value === "number") return value;
    return Number(String(value ?? "0").replace(/[^0-9]/g, "")) || 0;
}

function Home() {
    const { vehicles = [] } = useVehicles();
    const [type, setType] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [city, setCity] = useState("");
    const [budget, setBudget] = useState("all");

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchesType = type === "all" || String(vehicle.type).toLowerCase() === type;
            const searchText = keyword.trim().toLowerCase();
            const matchesKeyword = !searchText || `${vehicle.brand ?? ""} ${vehicle.model ?? ""}`.toLowerCase().includes(searchText);
            const matchesCity = !city || String(vehicle.city ?? "").toLowerCase().includes(city.trim().toLowerCase());
            const price = Number(vehicle.price) || 0;
            const matchesBudget =
                budget === "all" ||
                (budget === "under1" && price <= 100000) ||
                (budget === "under5" && price <= 500000) ||
                (budget === "under10" && price <= 1000000) ||
                (budget === "above10" && price > 1000000);
            return matchesType && matchesKeyword && matchesCity && matchesBudget;
        });
    }, [vehicles, type, keyword, city, budget]);

    const clearFilters = () => {
        setType("all");
        setKeyword("");
        setCity("");
        setBudget("all");
    };

    const scrollToVehicles = () => {
        document.getElementById("featured-vehicles")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="home-hero-glow home-hero-glow-one" />
                <div className="home-hero-glow home-hero-glow-two" />
                <div className="home-hero-content">
                    <div className="home-hero-copy">
                        <span className="home-eyebrow"><span className="home-eyebrow-dot" /> THE SMARTER WAY TO FIND YOUR RIDE</span>
                        <h1>Find your next ride.<br /><span>Love every mile.</span></h1>
                        <p>Explore quality pre-owned cars and bikes, compare your options, and find a ride that fits your life and budget.</p>
                        <div className="home-hero-highlights">
                            <span><span className="home-check">✓</span> Easy discovery</span>
                            <span><span className="home-check">✓</span> Clear vehicle details</span>
                            <span><span className="home-check">✓</span> Choices for every budget</span>
                        </div>
                    </div>

                    <div className="home-search-panel">
                        <div className="home-search-heading">
                            <div>
                                <span className="home-panel-kicker">START EXPLORING</span>
                                <h2>What are you looking for?</h2>
                            </div>
                            <span className="home-search-mark" aria-hidden="true">⌕</span>
                        </div>

                        <div className="home-type-tabs" role="group" aria-label="Choose vehicle type">
                            <button type="button" className={type === "all" ? "selected" : ""} onClick={() => setType("all")}>All vehicles</button>
                            <button type="button" className={type === "car" ? "selected" : ""} onClick={() => setType("car")}>🚗 Cars</button>
                            <button type="button" className={type === "bike" ? "selected" : ""} onClick={() => setType("bike")}>🏍️ Bikes</button>
                        </div>

                        <div className="home-search-fields">
                            <label className="home-search-field">
                                <span>BRAND OR MODEL</span>
                                <input type="search" placeholder="Try Hyundai, Classic 350..." value={keyword} onChange={(event) => setKeyword(event.target.value)} />
                            </label>
                            <label className="home-search-field">
                                <span>YOUR LOCATION</span>
                                <input type="text" placeholder="City, e.g. Chennai" value={city} onChange={(event) => setCity(event.target.value)} />
                            </label>
                            <button type="button" className="home-search-button" onClick={scrollToVehicles}>Search vehicles <span aria-hidden="true">→</span></button>
                        </div>
                        <div className="home-search-footnote"><span className="home-live-dot" /> Browse listings available on AutoMarket</div>
                    </div>
                </div>
                <div className="home-hero-bottom-line"><span>PRE-OWNED CARS</span><span>•</span><span>PRE-OWNED BIKES</span><span>•</span><span>YOUR NEXT CHAPTER</span></div>
            </section>

            <section className="home-section home-budget">
                <div className="home-section-heading">
                    <div><span className="home-section-label">A BUDGET THAT WORKS FOR YOU</span><h2>Find a ride by budget</h2></div>
                    <p>Good rides start with the right price range.</p>
                </div>
                <div className="home-budget-grid">
                    {budgetOptions.map((item) => (
                        <button type="button" key={item.value} className={`home-budget-card ${budget === item.value ? "budget-active" : ""}`} onClick={() => setBudget(budget === item.value ? "all" : item.value)} aria-pressed={budget === item.value}>
                            <span className="home-budget-icon">{item.icon}</span>
                            <span className="home-budget-title">{item.label}</span>
                            <span className="home-budget-hint">{item.hint}</span>
                            <span className="home-budget-arrow" aria-hidden="true">↗</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="home-section home-featured" id="featured-vehicles">
                <div className="home-section-heading home-featured-heading">
                    <div><span className="home-section-label">HANDPICKED FOR YOU</span><h2>Explore available vehicles</h2><p className="home-section-description">Find your match from the latest listings.</p></div>
                    <div className="home-featured-actions"><span className="home-result-count">{filteredVehicles.length} {filteredVehicles.length === 1 ? "vehicle" : "vehicles"}</span><Link className="home-view-all" to="/listings">View all listings <span aria-hidden="true">→</span></Link></div>
                </div>

                <div className="home-active-filters" aria-label="Active filters">
                    {type !== "all" && <button type="button" onClick={() => setType("all")}>{type === "car" ? "Cars" : "Bikes"} ×</button>}
                    {keyword && <button type="button" onClick={() => setKeyword("")}>{keyword} ×</button>}
                    {city && <button type="button" onClick={() => setCity("")}>{city} ×</button>}
                    {budget !== "all" && <button type="button" onClick={() => setBudget("all")}>{budgetOptions.find((item) => item.value === budget)?.label ?? "Budget"} ×</button>}
                    {(type !== "all" || keyword || city || budget !== "all") && <button type="button" className="home-clear-filters" onClick={clearFilters}>Clear all</button>}
                </div>

                {filteredVehicles.length > 0 ? (
                    <div className="home-vehicle-grid">
                        {filteredVehicles.slice(0, 8).map((vehicle) => {
                            const km = getKilometres(vehicle.km);
                            const image = vehicle.image || vehicle.images?.[0] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85";
                            return (
                                <article className="home-vehicle-card" key={vehicle.id}>
                                    <Link to={`/vehicle/${vehicle.id}`} className="home-vehicle-image-link" aria-label={`View ${vehicle.brand} ${vehicle.model}`}>
                                        <div className="home-vehicle-image"><img src={image} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85"; }} /><span className="home-vehicle-badge">PRE-OWNED {String(vehicle.type).toUpperCase() === "BIKE" ? "BIKE" : "CAR"}</span><span className="home-image-arrow" aria-hidden="true">↗</span></div>
                                    </Link>
                                    <div className="home-vehicle-info">
                                        <div className="home-vehicle-title-row"><span className="home-vehicle-brand">{vehicle.brand}</span><span className="home-vehicle-year">{vehicle.year}</span></div>
                                        <h3><Link to={`/vehicle/${vehicle.id}`}>{vehicle.model}</Link></h3>
                                        <div className="home-vehicle-specs"><span>{km.toLocaleString("en-IN")} km</span><span>{vehicle.fuel || "Fuel not specified"}</span><span>{vehicle.transmission || "Manual"}</span></div>
                                        <div className="home-vehicle-bottom"><div><small>Asking price</small><strong>{formatPrice(vehicle.price)}</strong></div><span className="home-vehicle-city"><span aria-hidden="true">⌖</span> {vehicle.city || "Location not set"}</span></div>
                                        <Link to={`/vehicle/${vehicle.id}`} className="home-card-details">View vehicle details <span aria-hidden="true">→</span></Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="home-empty-state"><span className="home-empty-icon" aria-hidden="true">⌕</span><h3>No matching vehicles found</h3><p>Try another brand, location or budget to see more listings.</p><button type="button" onClick={clearFilters}>Clear all filters</button></div>
                )}
                {filteredVehicles.length > 8 && <div className="home-more-listings"><Link to="/listings">Explore all {filteredVehicles.length} matching vehicles →</Link></div>}
            </section>

            <section className="home-section home-brands">
                <div className="home-section-heading"><div><span className="home-section-label">POPULAR MAKES</span><h2>Shop by trusted brands</h2></div><p>Choose a brand to narrow your search.</p></div>
                <div className="home-brand-grid">
                    {brands.map((brand) => <button type="button" key={brand} onClick={() => { setKeyword(brand); scrollToVehicles(); }}><span className="home-brand-initial">{brand.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><span className="home-brand-name">{brand}</span><span className="home-brand-arrow" aria-hidden="true">↗</span></button>)}
                </div>
            </section>

            <section className="home-sell-banner">
                <div className="home-sell-decoration" aria-hidden="true">A</div>
                <div className="home-sell-copy"><span className="home-sell-kicker">YOUR VEHICLE. YOUR NEXT OPPORTUNITY.</span><h2>Ready to sell your ride?</h2><p>Create a listing and help the right buyer find their next vehicle.</p></div>
                <Link to="/sell" className="home-sell-button">List your vehicle <span aria-hidden="true">→</span></Link>
            </section>
        </main>
    );
}

export default Home;
