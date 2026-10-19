
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Wishlist.css";

function Wishlist() {
    const { wishlist, toggleWishlist } = useWishlist();

    const formatPrice = (price) =>
        "₹" + price.toLocaleString("en-IN");

    return (
        <main className="wishlist-page">
            <section className="wishlist-heading">
                <div>
                    <p className="wishlist-eyebrow">
                        YOUR PERSONAL COLLECTION
                    </p>
                    <h1>My Wishlist ♡</h1>
                    <p>Keep your favourite cars and bikes in one place.</p>
                </div>

                <Link to="/listings" className="wishlist-browse-button">
                    + Explore Vehicles
                </Link>
            </section>

            {wishlist.length > 0 ? (
                <section className="wishlist-results">
                    <div className="wishlist-results-heading">
                        <h2>Saved Vehicles</h2>
                        <span>{wishlist.length} saved</span>
                    </div>

                    <div className="wishlist-grid">
                        {wishlist.map((vehicle) => (
                            <article className="wishlist-card" key={vehicle.id}>
                                <div className="wishlist-image-wrapper">
                                    <img src={vehicle.image} alt={vehicle.name} />

                                    <button
                                        type="button"
                                        className="wishlist-remove-button"
                                        aria-label={`Remove ${vehicle.name} from wishlist`}
                                        onClick={() => toggleWishlist(vehicle)}
                                    >
                                        ♥
                                    </button>

                                    <span className="wishlist-type-badge">
                                        {vehicle.type.toUpperCase()}
                                    </span>
                                </div>

                                <div className="wishlist-card-content">
                                    <p className="wishlist-brand">{vehicle.brand}</p>
                                    <h3>{vehicle.name}</h3>
                                    <p className="wishlist-price">
                                        {formatPrice(vehicle.price)}
                                    </p>

                                    <div className="wishlist-specs">
                                        <span>{vehicle.year}</span>
                                        <span>{vehicle.km}</span>
                                        <span>{vehicle.fuel}</span>
                                    </div>

                                    <div className="wishlist-card-footer">
                                        <span>📍 {vehicle.city}</span>
                                        <Link to={`/vehicle/${vehicle.id}`}>
                                            View Details →
                                        </Link>
                                    </div>

                                    <button
                                        type="button"
                                        className="wishlist-remove-text"
                                        onClick={() => toggleWishlist(vehicle)}
                                    >
                                        Remove from Wishlist
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="wishlist-content">
                    <div className="wishlist-empty-icon">♡</div>
                    <h2>Your wishlist is waiting!</h2>
                    <p>
                        You haven't saved any vehicles yet. Browse our collection
                        and tap the heart on a vehicle you love.
                    </p>
                    <Link
                        to="/listings"
                        className="wishlist-primary-button"
                    >
                        Browse Vehicles
                    </Link>
                </section>
            )}
        </main>
    );
}

export default Wishlist;

