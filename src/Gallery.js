import React, { useState, useEffect } from "react";
import "./styles/Gallery.css";
import inpadData from "./inpad.json";
import pikData from "./pik.json";

const Gallery = () => {
    const [inpad, setInpad] = useState([]);
    const [pik, setPik] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [currentPikIndex, setCurrentPikIndex] = useState(0);

    useEffect(() => {
        setInpad(inpadData);
        setPik(pikData);
    }, []);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === inpad.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? inpad.length - 1 : prevIndex - 1
        );
    };

    const nextPik = () => {
        setCurrentPikIndex((prevIndex) =>
            prevIndex === pik.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevPik = () => {
        setCurrentPikIndex((prevIndex) =>
            prevIndex === 0 ? pik.length - 1 : prevIndex - 1
        );
    };

    if (inpad.length === 0 || pik.length === 0) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="gallery-gallery-container-container">
            <div className="gallery-gallery-container">
                <div className="gallery-carousel">
                    <h2>ИнПАД</h2>
                    <div className="gallery-carousel-item">
                        <div className="gallery-image-container">
                            <button
                                onClick={prevPhoto}
                                className="gallery-home-carousel-button prev"
                            >
                                &#10094;
                            </button>
                            <img
                                src={inpad[currentPhotoIndex].url}
                                alt="Фитнес активность"
                            />
                            <button
                                onClick={nextPhoto}
                                className="gallery-home-carousel-button next"
                            >
                                &#10095;
                            </button>
                        </div>
                    </div>
                </div>

                <div className="gallery-carousel">
                    <h2>Пик</h2>
                    <div className="gallery-carousel-item">
                        <div className="gallery-image-container">
                            <button
                                onClick={prevPik}
                                className="gallery-home-carousel-button prev"
                            >
                                &#10094;
                            </button>
                            <img
                                src={pik[currentPikIndex].url}
                                alt="Дополнительная активность"
                            />
                            <button
                                onClick={nextPik}
                                className="gallery-home-carousel-button next"
                            >
                                &#10095;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
