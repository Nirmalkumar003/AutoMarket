
import { createContext, useContext, useState } from "react";

const VehicleContext = createContext();

const initialVehicles = [
    {
        id: 1,
        name: "Hyundai Creta",
        brand: "Hyundai",
        type: "car",
        price: 1250000,
        year: 2024,
        fuel: "Petrol",
        transmission: "Automatic",
        km: "12,000 km",
        city: "Chennai",
        color: "White",
        owners: "1st Owner",
        image:
            "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=900&q=80",
        description: "A stylish and comfortable SUV for everyday travel.",
    },
    {
        id: 2,
        name: "Tata Nexon",
        brand: "Tata",
        type: "car",
        price: 950000,
        year: 2023,
        fuel: "Diesel",
        transmission: "Manual",
        km: "18,500 km",
        city: "Coimbatore",
        color: "Blue",
        owners: "1st Owner",
        image:
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
        description: "A practical SUV suited to everyday travel.",
    },
    {
        id: 3,
        name: "Royal Enfield Classic 350",
        brand: "Royal Enfield",
        type: "bike",
        price: 185000,
        year: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        km: "5,000 km",
        city: "Chennai",
        color: "Black",
        owners: "1st Owner",
        image:
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
        description: "A classic-style motorcycle with timeless design.",
    },
    {
        id: 4,
        name: "Yamaha R15",
        brand: "Yamaha",
        type: "bike",
        price: 165000,
        year: 2023,
        fuel: "Petrol",
        transmission: "Manual",
        km: "8,000 km",
        city: "Madurai",
        color: "Blue",
        owners: "1st Owner",
        image:
            "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
        description: "A sporty motorcycle for an engaging riding experience.",
    },
];

export function VehicleProvider({ children }) {
    const [vehicles, setVehicles] = useState(initialVehicles);

    function addVehicle(vehicle) {
        const newVehicle = {
            ...vehicle,
            id: Date.now(),
        };

        setVehicles((currentVehicles) => [
            newVehicle,
            ...currentVehicles,
        ]);

        return newVehicle;
    }

    return (
        <VehicleContext.Provider value={{ vehicles, addVehicle }}>
            {children}
        </VehicleContext.Provider>
    );
}

export function useVehicles() {
    return useContext(VehicleContext);
}