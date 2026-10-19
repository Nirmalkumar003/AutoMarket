
import { useState } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "../../context/VehicleContext";
import "./Compare.css";

function Compare() {
    const { vehicles } = useVehicles();

    const [firstId, setFirstId] = useState("");
    const [secondId, setSecondId] = useState("");

    const firstVehicle = vehicles.find(
        (vehicle) => vehicle.id === Number(firstId)
    );

    const secondVehicle = vehicles.find(
        (vehicle) => vehicle.id === Number(secondId)
    );

    const formatPrice = (price) =>
        "₹" + Number(price).toLocaleString("en-IN");

    const getKm = (km) => {
        if (typeof km === "number") {
            return `${km.toLocaleString("en-IN")} km`;
        }

        return km || "Not specified";
    };

    const details = [
        {
            label: "Price",
            value: (vehicle) => formatPrice(vehicle.price),
        },
        {
            label: "Brand",
            value: (vehicle) => vehicle.brand,
        },
        {
            label: "Vehicle Type",
            value: (vehicle) => vehicle.type,
        },
        {
            label: "Manufacturing Year",
            value: (vehicle) => vehicle.year,
        },
        {
            label: "Kilometres Driven",
            value: (vehicle) => getKm(vehicle.km),
        },
        {
            label: "Fuel Type",
            value: (vehicle) => vehicle.fuel,
        },
        {
            label: "Transmission",
            value: (vehicle) => vehicle.transmission,
        },
        {
            label: "City",
            value: (vehicle) => vehicle.city,
        },
        {
            label: "Colour",
            value: (vehicle) => vehicle.color || "Not specified",
        },
        {
            label: "Ownership",
            value: (vehicle) => vehicle.owners || "Not specified",
        },
    ];

    return (
        <main className="compare-page">
            <section className="compare-header">
                <p className="compare-eyebrow">SMART SHOPPING</p>
                <h1>Compare Vehicles</h1>
                <p>
                    Compare two cars or bikes side by side before
                    making your decision.
                </p>
            </section>

            <section className="compare-selectors">
                <div className="compare-select-card">
                    <label htmlFor="firstVehicle">First Vehicle</label>
                    <select
                        id="firstVehicle"
                        value={firstId}
                        onChange={(event) => setFirstId(event.target.value)}
                    >
                        <option value="">Choose a vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.name} — {formatPrice(vehicle.price)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="compare-vs">VS</div>

                <div className="compare-select-card">
                    <label htmlFor="secondVehicle">Second Vehicle</label>
                    <select
                        id="secondVehicle"
                        value={secondId}
                        onChange={(event) => setSecondId(event.target.value)}
                    >
                        <option value="">Choose a vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.name} — {formatPrice(vehicle.price)}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            {firstId && firstId === secondId && (
                <p className="compare-error">
                    Please select two different vehicles.
                </p>
            )}

            {firstVehicle &&
                secondVehicle &&
                firstId !== secondId && (
                    <section className="compare-results">
                        <div className="compare-vehicle-heading">
                            <div>
                                <img
                                    src={firstVehicle.image}
                                    alt={firstVehicle.name}
                                />
                                <h2>{firstVehicle.name}</h2>
                                <p>{formatPrice(firstVehicle.price)}</p>
                                <Link to={`/vehicle/${firstVehicle.id}`}>
                                    View Details
                                </Link>
                            </div>

                            <div>
                                <img
                                    src={secondVehicle.image}
                                    alt={secondVehicle.name}
                                />
                                <h2>{secondVehicle.name}</h2>
                                <p>{formatPrice(secondVehicle.price)}</p>
                                <Link to={`/vehicle/${secondVehicle.id}`}>
                                    View Details
                                </Link>
                            </div>
                        </div>

                        <div className="compare-table">
                            {details.map((detail) => (
                                <div className="compare-row" key={detail.label}>
                                    <div className="compare-label">
                                        {detail.label}
                                    </div>
                                    <div>{detail.value(firstVehicle)}</div>
                                    <div>{detail.value(secondVehicle)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="compare-footer">
                            <Link to="/listings">
                                ← Back to Buy Vehicles
                            </Link>
                        </div>
                    </section>
                )}

            {(!firstVehicle || !secondVehicle) && (
                <div className="compare-empty">
                    <h2>Your comparison starts here</h2>
                    <p>
                        Select two vehicles above to see their features
                        side by side.
                    </p>
                </div>
            )}
        </main>
    );
}

export default Compare;
