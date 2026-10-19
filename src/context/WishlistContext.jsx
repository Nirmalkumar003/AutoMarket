
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    function toggleWishlist(vehicle) {
        setWishlist((currentWishlist) => {
            const alreadySaved = currentWishlist.some(
                (item) => item.id === vehicle.id
            );

            if (alreadySaved) {
                return currentWishlist.filter(
                    (item) => item.id !== vehicle.id
                );
            }

            return [...currentWishlist, vehicle];
        });
    }

    function isWishlisted(vehicleId) {
        return wishlist.some((item) => item.id === vehicleId);
    }

    return (
        <WishlistContext.Provider
            value={{ wishlist, toggleWishlist, isWishlisted }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
