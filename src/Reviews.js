import React, { useState } from "react";
import reviewsData from "./reviews.json";
import "./styles/Reviews.css";

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedReview, setSelectedReview] = useState(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
        );
    };

    const openModal = (review) => {
        setSelectedReview(review);
    };

    const closeModal = () => {
        setSelectedReview(null);
    };

    const currentReview = reviewsData[currentIndex];

    return (
        <div className="review-reviews-container-container">
            <div className="review-reviews-container">
                <button
                    className="review-carousel-button prev"
                    onClick={handlePrev}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                    </svg>
                </button>
                <div className="review-review-card">
                    <img
                        src={currentReview.avatarUrl}
                        alt={currentReview.name}
                        className="review-avatar"
                        onError={(e) => {
                            e.target.onerror = null; // Предотвращает повторное срабатывание
                            e.target.src = "/user.svg"; // Дефолтная картинка
                        }}
                    />
                    <h3>{currentReview.name}</h3>
                    <div className="review-rating">
                        {Array.from(
                            { length: currentReview.rating },
                            (_, i) => "⭐"
                        ).join("")}
                    </div>
                    <p className="review-review-text">
                        {currentReview.review.length > 100
                            ? currentReview.review.slice(0, 100) + "..."
                            : currentReview.review}
                    </p>
                    {currentReview.review.length > 100 && (
                        <button
                            className="review-read-more"
                            onClick={() => openModal(currentReview)}
                        >
                            Прочитать полностью
                        </button>
                    )}
                    <p className="review-review-date">{currentReview.date}</p>
                </div>
                <button
                    className="review-carousel-button next"
                    onClick={handleNext}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
                </button>
                {selectedReview && (
                    <div className="review-modal-overlay" onClick={closeModal}>
                        <div
                            className="review-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="review-close-button"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <img
                                src={selectedReview.avatarUrl}
                                alt={selectedReview.name}
                                className="review-avatar"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/user.svg";
                                }}
                            />
                            <h3>{selectedReview.name}</h3>
                            <div className="review-rating">
                                {Array.from(
                                    { length: selectedReview.rating },
                                    (_, i) => "⭐"
                                ).join("")}
                            </div>
                            <p>{selectedReview.review}</p>
                            <p className="review-review-date">
                                {selectedReview.date}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
