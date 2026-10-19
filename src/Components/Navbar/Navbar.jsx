
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const getNavClass = ({ isActive }) =>
        `am-nav-link${isActive ? " active" : ""}`;

    return (
        <header className="am-navbar">
            <div className="am-nav-container">
                {/* AutoMarket Brand */}
                <Link
                    to="/"
                    className="am-brand"
                    onClick={closeMenu}
                    aria-label="AutoMarket home"
                >
                    <span className="am-brand-icon">A</span>

                    <span className="am-brand-text">
                        <span className="am-brand-name">
                            Auto<span>Market</span>
                        </span>
                        <small>YOUR NEXT RIDE STARTS HERE</small>
                    </span>
                </Link>

                {/* Mobile Menu Button: hidden on desktop */}
                <button
                    className="am-menu-toggle"
                    type="button"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="am-primary-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                {/* Navigation Links */}
                <nav
                    id="am-primary-navigation"
                    className={`am-nav-links ${menuOpen ? "am-nav-open" : ""}`}
                    aria-label="Main navigation"
                >
                    <NavLink
                        to="/"
                        end
                        className={getNavClass}
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/listings"
                        className={getNavClass}
                        onClick={closeMenu}
                    >
                        Buy Vehicles
                    </NavLink>

                    <NavLink
                        to="/compare"
                        className={getNavClass}
                        onClick={closeMenu}
                    >
                        Compare
                    </NavLink>

                    <NavLink
                        to="/wishlist"
                        className={getNavClass}
                        onClick={closeMenu}
                    >
                        <span className="am-heart" aria-hidden="true">
                            ♡
                        </span>
                        Wishlist
                    </NavLink>

                    <NavLink
                        to="/sell"
                        className={({ isActive }) =>
                            `am-nav-sell${isActive ? " active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        <span aria-hidden="true">＋</span>
                        Sell Vehicle
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
