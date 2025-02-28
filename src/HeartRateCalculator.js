import React, { useState, useEffect } from "react";
import "./styles/HeartRateCalculator.css";
import heartRateZonesData from "./heartRateZones.json";

const HeartRateCalculator = () => {
    const [age, setAge] = useState("");
    const [heartRateZones, setHeartRateZones] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);

    const calculateHeartRateZones = () => {
        const ageNumber = parseInt(age);

        if (isNaN(ageNumber)) {
            return;
        }

        const maxHeartRate = 220 - ageNumber;
        const zones = {
            zone1: [
                Math.round(maxHeartRate * 0.6),
                Math.round(maxHeartRate * 0.7) - 1,
            ],
            zone2: [
                Math.round(maxHeartRate * 0.7),
                Math.round(maxHeartRate * 0.8) - 1,
            ],
            zone3: [
                Math.round(maxHeartRate * 0.8),
                Math.round(maxHeartRate * 0.9) - 1,
            ],
            zone4: [
                Math.round(maxHeartRate * 0.9),
                Math.round(maxHeartRate * 0.95) - 1,
            ],
            zone5: [Math.round(maxHeartRate * 0.95), maxHeartRate],
        };

        setHeartRateZones(zones);
    };

    const openModal = (zone) => {
        setSelectedZone(zone);
    };

    const closeModal = () => {
        setSelectedZone(null);
    };

    return (
        <div className="hr-container-container">
            <div className="hr-container">
                <h2>Вычислитель тренировочных зон</h2>
                <div className="hr-box">
                    <label>
                        Возраст:
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Введите свой возраст"
                        />
                    </label>
                    <button onClick={calculateHeartRateZones}>Вычислить</button>
                    {heartRateZones && (
                        <div className="hr-zone-container">
                            <h3>Зоны:</h3>
                            {heartRateZonesData.map((zone) => (
                                <div
                                    key={zone.id}
                                    className={`hr-zone hr-zone-${zone.id.slice(
                                        -1
                                    )}`}
                                    onClick={() => openModal(zone.id)}
                                >
                                    {zone.title}: {heartRateZones[zone.id][0]} -{" "}
                                    {heartRateZones[zone.id][1]} уд/мин
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {selectedZone && (
                    <div className="hr-modal-overlay" onClick={closeModal}>
                        <div
                            className="hr-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <h3>
                                {
                                    heartRateZonesData.find(
                                        (zone) => zone.id === selectedZone
                                    ).title
                                }
                            </h3>
                            <p>
                                {
                                    heartRateZonesData.find(
                                        (zone) => zone.id === selectedZone
                                    ).description
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeartRateCalculator;
