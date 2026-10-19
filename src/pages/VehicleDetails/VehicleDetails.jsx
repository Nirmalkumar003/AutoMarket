
import { Link, useParams } from "react-router-dom";
import { useVehicles } from "../../context/VehicleContext";
import { useWishlist } from "../../context/WishlistContext";
import "./VehicleDetails.css";

function VehicleDetails() {
    const { id } = useParams();
    const { vehicles } = useVehicles();
    const { toggleWishlist, isWishlisted } = useWishlist();

    const vehicle = vehicles.find(
        (item) => String(item.id) === String(id)
    );

    const formatPrice = (price) => {
        const amount = Number(price);

        if (!Number.isFinite(amount)) {
            return "Price unavailable";
        }

        return "₹" + amount.toLocaleString("en-IN");
    };

    const formatKilometres = (km) => {
        if (km === null || km === undefined || km === "") {
            return "Not specified";
        }

        const amount = Number(km);

        return Number.isFinite(amount)
            ? `${amount.toLocaleString("en-IN")} km`
            : String(km);
    };

    if (!vehicle) {
        return (
            <main className="vd-page">
                <div className="vd-not-found">
                    <div className="vd-not-found-icon">⌕</div>
                    <p className="vd-eyebrow">VEHICLE NOT AVAILABLE</p>
                    <h1>We couldn't find this vehicle</h1>
                    <p>
                        This vehicle may have been removed or the link
                        may be invalid.
                    </p>
                    <Link to="/listings" className="vd-primary-button">
                        Browse All Vehicles
                    </Link>
                </div>
            </main>
        );
    }

    const wishlisted = isWishlisted(vehicle.id);

    const specifications = [
        { icon: "◷", label: "Model year", value: vehicle.year },
        {
            icon: "↗",
            label: "Kilometres driven",
            value: formatKilometres(vehicle.km),
        },
        { icon: "⛽", label: "Fuel type", value: vehicle.fuel },
        {
            icon: "⚙",
            label: "Transmission",
            value: vehicle.transmission,
        },
        {
            icon: "◉",
            label: "Colour",
            value: vehicle.color || "Not specified",
        },
        {
            icon: "♙",
            label: "Ownership",
            value: vehicle.owners || "Not specified",
        },
    ];

    return (
        <main className="vd-page">
            <nav className="vd-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/listings">Vehicles</Link>
                <span>/</span>
                <span className="vd-breadcrumb-current">
                    {vehicle.name}
                </span>
            </nav>

            <header className="vd-page-heading">
                <div>
                    <span className="vd-heading-label">
                        EXPLORE YOUR NEXT RIDE
                    </span>
                    <h1>Vehicle Details</h1>
                    <p>
                        Everything you need to know before making
                        your next move.
                    </p>
                </div>

                <Link to="/listings" className="vd-outline-link">
                    <span aria-hidden="true">←</span> All vehicles
                </Link>
            </header>

            <section className="vd-layout">
                <div className="vd-main">
                    <section className="vd-gallery-card">
                        <div className="vd-image-container">
                            {vehicle.image ? (
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                />
                            ) : (
                                <div className="vd-image-placeholder">
                                    <span aria-hidden="true">🚘</span>
                                    <p>Vehicle image unavailable</p>
                                </div>
                            )}

                            <span className="vd-type-badge">
                                {vehicle.type || "Vehicle"}
                            </span>

                            <button
                                type="button"
                                className={`vd-wishlist-button ${wishlisted ? "is-wishlisted" : ""
                                    }`}
                                onClick={() => toggleWishlist(vehicle)}
                                aria-pressed={wishlisted}
                                aria-label={
                                    wishlisted
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                title={
                                    wishlisted
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                            >
                                <span aria-hidden="true">
                                    {wishlisted ? "♥" : "♡"}
                                </span>
                            </button>

                            <div className="vd-image-caption">
                                <span className="vd-image-dot" />
                                {vehicle.type || "Pre-owned"} listing
                            </div>
                        </div>
                    </section>

                    <section className="vd-info-card vd-overview-card">
                        <div className="vd-vehicle-heading">
                            <div className="vd-vehicle-title">
                                <p className="vd-eyebrow">
                                    {vehicle.brand || "PRE-OWNED VEHICLE"}
                                </p>
                                <h2>{vehicle.name}</h2>
                                <p className="vd-location">
                                    <span aria-hidden="true">⌖</span>
                                    {vehicle.city || "Location not specified"}
                                </p>
                            </div>

                            <div className="vd-mobile-price">
                                <span>Asking price</span>
                                <strong>{formatPrice(vehicle.price)}</strong>
                            </div>
                        </div>

                        <div className="vd-divider" />

                        <div className="vd-section-heading">
                            <div>
                                <span className="vd-section-kicker">
                                    AT A GLANCE
                                </span>
                                <h3>Vehicle specifications</h3>
                            </div>
                            <span className="vd-spec-count">
                                {specifications.length} details
                            </span>
                        </div>

                        <div className="vd-spec-grid">
                            {specifications.map((spec) => (
                                <div className="vd-spec" key={spec.label}>
                                    <div className="vd-spec-icon">
                                        {spec.icon}
                                    </div>
                                    <div className="vd-spec-content">
                                        <span>{spec.label}</span>
                                        <strong>
                                            {spec.value !== null &&
                                                spec.value !== undefined &&
                                                spec.value !== ""
                                                ? spec.value
                                                : "Not specified"}
                                        </strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="vd-info-card vd-description-card">
                        <span className="vd-section-kicker">
                            KNOW YOUR RIDE
                        </span>
                        <h3>About this vehicle</h3>
                        <p className="vd-description">
                            {vehicle.description ||
                                "No additional description has been provided for this vehicle. Contact the seller to learn more about its condition, service history, and features."}
                        </p>

                        <div className="vd-trust-note">
                            <span aria-hidden="true">✓</span>
                            <p>
                                Always inspect the vehicle and verify
                                its documents before making a purchase.
                            </p>
                        </div>
                    </section>
                </div>

                <aside className="vd-sidebar">
                    <section className="vd-price-card">
                        <div className="vd-price-topline">
                            <span className="vd-price-label">
                                SELLER'S ASKING PRICE
                            </span>
                            <span className="vd-price-tag">
                                Listed price
                            </span>
                        </div>

                        <h2>{formatPrice(vehicle.price)}</h2>
                        <p className="vd-price-note">
                            Interested in this vehicle? Get in touch
                            with the seller to discuss the details.
                        </p>

                        <button
                            type="button"
                            className="vd-primary-button"
                            onClick={() =>
                                alert(
                                    "Seller contact functionality will be added later."
                                )
                            }
                        >
                            <span aria-hidden="true">↗</span>
                            Contact Seller
                        </button>

                        <button
                            type="button"
                            className="vd-secondary-button"
                            onClick={() =>
                                alert(
                                    "Test drive booking will be added later."
                                )
                            }
                        >
                            Request a Test Drive
                        </button>

                        <div className="vd-secure-note">
                            <span aria-hidden="true">✓</span>
                            Inspect before you buy
                        </div>
                    </section>

                    <section className="vd-seller-card">
                        <span className="vd-section-kicker">
                            YOUR POINT OF CONTACT
                        </span>
                        <h3>Seller information</h3>

                        <div className="vd-seller-profile">
                            <div className="vd-seller-avatar">S</div>
                            <div className="vd-seller-details">
                                <strong>Vehicle Seller</strong>
                                <p>Private Seller</p>
                                <span className="vd-seller-status">
                                    <span /> Listing contact
                                </span>
                            </div>
                        </div>

                        <div className="vd-seller-divider" />

                        <p className="vd-seller-note">
                            Ask about the vehicle's condition, service
                            records, ownership documents, and availability
                            before arranging a visit.
                        </p>
                    </section>

                    <div className="vd-help-card">
                        <span className="vd-help-icon" aria-hidden="true">
                            i
                        </span>
                        <div>
                            <strong>Buying a used vehicle?</strong>
                            <p>
                                Check the documents, verify the details,
                                and inspect the vehicle in person.
                            </p>
                        </div>
                    </div>

                    <Link to="/listings" className="vd-back-link">
                        <span aria-hidden="true">←</span>
                        Back to all vehicles
                    </Link>
                </aside>
            </section>
        </main>
    );
}

export default VehicleDetails;
