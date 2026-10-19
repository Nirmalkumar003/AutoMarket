
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVehicles } from "../../context/VehicleContext";
import "./Sell.css";

const emptyForm = {
    brand: "",
    model: "",
    year: "",
    price: "",
    km: "",
    city: "",
    fuel: "Petrol",
    transmission: "Manual",
    bodyType: "",
    bikeType: "",
    engineCC: "",
    description: "",
};

function Sell() {
    const { addVehicle } = useVehicles();
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState("");
    const [formData, setFormData] = useState(emptyForm);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const urls = images.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [images]);

    function chooseType(type) {
        setSelectedType(type);
        setFormData({ ...emptyForm });
        setImages([]);
        setError("");
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => {
            if (name === "bikeType" && value === "Electric") {
                return { ...previous, bikeType: value, engineCC: "", fuel: "Electric" };
            }

            if (name === "bikeType" && previous.bikeType === "Electric") {
                return { ...previous, bikeType: value, fuel: "Petrol" };
            }

            return { ...previous, [name]: value };
        });

        setError("");
    }

    function handleImages(event) {
        const selected = Array.from(event.target.files || []);
        const valid = selected.filter((file) => file.type.startsWith("image/"));

        setImages((previous) => [...previous, ...valid].slice(0, 5));

        if (valid.length !== selected.length) {
            setError("Please upload image files only.");
        } else {
            setError("");
        }

        event.target.value = "";
    }

    function removeImage(index) {
        setImages((previous) => previous.filter((_, i) => i !== index));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const currentYear = new Date().getFullYear();
        const year = Number(formData.year);
        const price = Number(formData.price);
        const km = Number(formData.km);
        const electricBike =
            selectedType === "bike" && formData.bikeType === "Electric";

        if (!formData.brand.trim() || !formData.model.trim()) {
            setError("Please enter the vehicle brand and model.");
            return;
        }

        if (!Number.isInteger(year) || year < 1990 || year > currentYear) {
            setError(`Enter a valid year between 1990 and ${currentYear}.`);
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            setError("Enter a price greater than zero.");
            return;
        }

        if (!Number.isFinite(km) || km < 0) {
            setError("Enter valid kilometres driven.");
            return;
        }

        if (!formData.city.trim()) {
            setError("Please enter the city.");
            return;
        }

        if (selectedType === "car" && !formData.bodyType) {
            setError("Please select the car body type.");
            return;
        }

        if (selectedType === "bike" && !formData.bikeType) {
            setError("Please select the bike type.");
            return;
        }

        if (
            selectedType === "bike" &&
            !electricBike &&
            (!Number.isFinite(Number(formData.engineCC)) ||
                Number(formData.engineCC) < 1 ||
                Number(formData.engineCC) > 3000)
        ) {
            setError("Enter an engine capacity between 1 and 3000 CC.");
            return;
        }

        if (images.length === 0) {
            setError("Please upload at least one vehicle photo.");
            return;
        }

        const imageUrl = URL.createObjectURL(images[0]);
        const vehicle = {
            id: Date.now(),
            ...formData,
            type: selectedType,
            name: `${formData.brand.trim()} ${formData.model.trim()}`,
            brand: formData.brand.trim(),
            model: formData.model.trim(),
            year,
            price,
            km: `${km.toLocaleString("en-IN")} km`,
            city: formData.city.trim(),
            engineCC: electricBike ? "" : formData.engineCC,
            description:
                formData.description.trim() ||
                `Used ${formData.brand.trim()} ${formData.model.trim()} available in ${formData.city.trim()}.`,
            image: imageUrl,
            color: "Not specified",
            owners: "Not specified",
        };

        addVehicle(vehicle);
        navigate("/listings");
    }

    const isBike = selectedType === "bike";
    const isElectricBike = isBike && formData.bikeType === "Electric";

    return (
        <main className="sell-page">
            <section className="sell-hero">
                <p className="sell-eyebrow">AUTOMARKET SELLER CENTRE</p>
                <h1>{selectedType ? `Sell your ${selectedType}` : "What would you like to sell?"}</h1>
                <p>
                    {selectedType
                        ? "Add your vehicle details and photos to create your listing."
                        : "Choose your vehicle type to get started. We'll show you the right form."}
                </p>
            </section>

            {!selectedType ? (
                <section className="sell-choice-grid">
                    <button
                        type="button"
                        className="sell-choice-card"
                        onClick={() => chooseType("car")}
                    >
                        <span className="sell-choice-icon">🚗</span>
                        <h2>Sell a Car</h2>
                        <p>Enter car details, upload photos and reach potential buyers.</p>
                        <span className="sell-choice-action">Continue with car →</span>
                    </button>

                    <button
                        type="button"
                        className="sell-choice-card"
                        onClick={() => chooseType("bike")}
                    >
                        <span className="sell-choice-icon">🏍️</span>
                        <h2>Sell a Bike</h2>
                        <p>List your motorcycle or scooter with its important details.</p>
                        <span className="sell-choice-action">Continue with bike →</span>
                    </button>
                </section>
            ) : (
                <section className="sell-form-card">
                    <button
                        type="button"
                        className="sell-back-button"
                        onClick={() => chooseType("")}
                    >
                        ← Change vehicle type
                    </button>

                    <div className="sell-form-heading">
                        <h2>{isBike ? "Bike details" : "Car details"}</h2>
                        <p>Fields marked * are required.</p>
                    </div>

                    {error && <p className="sell-error" role="alert">{error}</p>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="sell-form-grid">
                            <label className="sell-field">
                                Brand *
                                <input name="brand" value={formData.brand} onChange={handleChange}
                                    placeholder={isBike ? "e.g. Honda" : "e.g. Hyundai"} />
                            </label>

                            <label className="sell-field">
                                Model *
                                <input name="model" value={formData.model} onChange={handleChange}
                                    placeholder={isBike ? "e.g. Activa" : "e.g. Creta"} />
                            </label>

                            <label className="sell-field">
                                Manufacturing year *
                                <input type="number" name="year" value={formData.year}
                                    onChange={handleChange} placeholder="e.g. 2023" />
                            </label>

                            <label className="sell-field">
                                Expected price (₹) *
                                <input type="number" name="price" value={formData.price}
                                    onChange={handleChange} placeholder="e.g. 550000" />
                            </label>

                            <label className="sell-field">
                                Kilometres driven *
                                <input type="number" min="0" name="km" value={formData.km}
                                    onChange={handleChange} placeholder="e.g. 25000" />
                            </label>

                            <label className="sell-field">
                                City *
                                <input name="city" value={formData.city} onChange={handleChange}
                                    placeholder="e.g. Chennai" />
                            </label>

                            {selectedType === "car" ? (
                                <label className="sell-field">
                                    Car body type *
                                    <select name="bodyType" value={formData.bodyType} onChange={handleChange}>
                                        <option value="">Select body type</option>
                                        <option>Hatchback</option>
                                        <option>Sedan</option>
                                        <option>SUV</option>
                                        <option>MUV / MPV</option>
                                        <option>Coupe</option>
                                        <option>Convertible</option>
                                    </select>
                                </label>
                            ) : (
                                <>
                                    <label className="sell-field">
                                        Bike type *
                                        <select name="bikeType" value={formData.bikeType} onChange={handleChange}>
                                            <option value="">Select bike type</option>
                                            <option>Commuter</option>
                                            <option>Sports</option>
                                            <option>Cruiser</option>
                                            <option>Scooter</option>
                                            <option>Adventure</option>
                                            <option>Electric</option>
                                        </select>
                                    </label>

                                    {!isElectricBike && (
                                        <label className="sell-field">
                                            Engine capacity (CC) *
                                            <input type="number" name="engineCC" value={formData.engineCC}
                                                onChange={handleChange} placeholder="e.g. 350" />
                                        </label>
                                    )}
                                </>
                            )}

                            <label className="sell-field">
                                Fuel type *
                                <select name="fuel" value={formData.fuel} onChange={handleChange}>
                                    <option>Petrol</option>
                                    {selectedType === "car" && <>
                                        <option>Diesel</option>
                                        <option>Hybrid</option>
                                        <option>CNG</option>
                                    </>}
                                    <option>Electric</option>
                                </select>
                            </label>

                            <label className="sell-field">
                                Transmission *
                                <select name="transmission" value={formData.transmission} onChange={handleChange}>
                                    <option>Manual</option>
                                    <option>Automatic</option>
                                </select>
                            </label>
                        </div>

                        <div className="sell-photo-section">
                            <h3>Vehicle photos *</h3>
                            <p>Upload up to 5 clear photos.</p>
                            <label className="sell-upload-box">
                                <span className="sell-upload-icon">↑</span>
                                <strong>Choose photos</strong>
                                <span>{images.length} of 5 selected</span>
                                <input type="file" accept="image/*" multiple onChange={handleImages} />
                            </label>

                            {previews.length > 0 && (
                                <div className="sell-image-preview-grid">
                                    {previews.map((src, index) => (
                                        <div className="sell-image-preview" key={`${src}-${index}`}>
                                            <img src={src} alt={`Vehicle ${index + 1}`} />
                                            <button type="button" onClick={() => removeImage(index)}
                                                aria-label={`Remove photo ${index + 1}`}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <label className="sell-field sell-description-field">
                            Description
                            <textarea name="description" value={formData.description}
                                onChange={handleChange} rows="4"
                                placeholder="Describe the condition and features of your vehicle..." />
                        </label>

                        <div className="sell-form-actions">
                            <button type="button" className="sell-cancel-button"
                                onClick={() => chooseType("")}>Back</button>
                            <button type="submit" className="sell-submit-button">
                                Publish {isBike ? "Bike" : "Car"} Listing →
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <p className="sell-demo-note">
                Demo version: listings are available during the current app session.
            </p>
            <p className="sell-bottom-link">
                Already browsing? <Link to="/listings">View Buy Vehicles</Link>
            </p>
        </main>
    );
}

export default Sell;
