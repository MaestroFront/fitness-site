import React, { useEffect, useState } from "react";
import "./styles/ServicesPage.css";
import servicesData from "./services.json";

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [viewMode, setViewMode] = useState("grid"); // 'grid', 'list', 'two-column'
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filters, setFilters] = useState({
        hasDiscount: false,
        minPrice: 1000,
        maxPrice: 3500,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 5;

    useEffect(() => {
        const dataWithNumericPrices = servicesData.map((service) => ({
            ...service,
            price: parseFloat(service.price.replace(/[^0-9.]/g, "")),
        }));

        const minPrice = Math.min(
            ...dataWithNumericPrices.map((service) => service.price)
        );
        const maxPrice = Math.max(
            ...dataWithNumericPrices.map((service) => service.price)
        );

        setFilters((prevFilters) => ({
            ...prevFilters,
            minPrice: minPrice,
            maxPrice: maxPrice,
        }));

        setServices(dataWithNumericPrices);
    }, []);

    const openModal = (service) => {
        setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        const newValue = Number(value);

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: newValue,
        }));
    };

    const applyFilters = () => {
        if (filters.minPrice > filters.maxPrice) {
            setErrorVisible(true);
            setTimeout(() => setErrorVisible(false), 2000);
            return;
        }

        let filteredServices = servicesData.map((service) => ({
            ...service,
            price: parseFloat(service.price.replace(/[^0-9.]/g, "")),
        }));

        if (filters.hasDiscount) {
            filteredServices = filteredServices.filter(
                (service) => service.promo !== undefined && service.promo !== ""
            );
        }

        const [minPrice, maxPrice] = [filters.minPrice, filters.maxPrice];
        filteredServices = filteredServices.filter(
            (service) => service.price >= minPrice && service.price <= maxPrice
        );

        setServices(filteredServices);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({
            hasDiscount: false,
            minPrice: Math.min(
                ...servicesData.map((service) =>
                    parseFloat(service.price.replace(/[^0-9.]/g, ""))
                )
            ),
            maxPrice: Math.max(
                ...servicesData.map((service) =>
                    parseFloat(service.price.replace(/[^0-9.]/g, ""))
                )
            ),
        });
        setServices(
            servicesData.map((service) => ({
                ...service,
                price: parseFloat(service.price.replace(/[^0-9.]/g, "")),
            }))
        );
        setFiltersVisible(false);
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredServices.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const calculateDiscountedPrice = (price, discount) => {
        const discountAmount = (price * parseFloat(discount)) / 100;
        return price - discountAmount;
    };

    return (
        <div className="services-container-container">
            <div className="services-container">
                <button
                    className={`toggle-filters-button ${
                        filtersVisible ? "rotated" : ""
                    }`}
                    onClick={toggleFilters}
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
                <div
                    className={`buttons-container ${
                        filtersVisible ? "expanded" : ""
                    }`}
                >
                    <div
                        className={`view-mode-buttons-container ${
                            filtersVisible ? "expanded" : ""
                        }`}
                    >
                        <button
                            className={viewMode === "grid" ? "active" : ""}
                            onClick={() => {
                                setViewMode("grid");
                                setLoading(true);
                                setTimeout(() => setLoading(false), 500);
                            }}
                            aria-label="Grid View"
                        >
                            <img
                                src="https://img.icons8.com/material-outlined/24/000000/grid.png"
                                alt="Grid Icon"
                            />
                        </button>
                        <button
                            className={viewMode === "list" ? "active" : ""}
                            onClick={() => {
                                setViewMode("list");
                                setLoading(true);
                                setTimeout(() => setLoading(false), 500);
                            }}
                            aria-label="List View"
                        >
                            <img
                                src="https://img.icons8.com/material-outlined/24/000000/menu.png"
                                alt="List Icon"
                            />
                        </button>
                        <button
                            className={
                                viewMode === "two-column" ? "active" : ""
                            }
                            onClick={() => {
                                setViewMode("two-column");
                                setLoading(true);
                                setTimeout(() => setLoading(false), 500);
                            }}
                            aria-label="Two Column View"
                        >
                            <img
                                src="https://img.icons8.com/material-outlined/24/000000/columns.png"
                                alt="Columns Icon"
                            />
                        </button>
                    </div>
                    <div
                        className={`filters-container ${
                            filtersVisible ? "visible" : ""
                        }`}
                    >
                        <div className="filter-box">
                            <div className="filter">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filters.hasDiscount}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                hasDiscount: e.target.checked,
                                            })
                                        }
                                    />
                                    Скидка
                                </label>
                            </div>
                            <div className="filter">
                                <label>
                                    Цена:
                                    <div className="price-range-slider">
                                        <input
                                            type="number"
                                            min={filters.minPrice}
                                            max={filters.maxPrice}
                                            value={filters.minPrice}
                                            name="minPrice"
                                            id="min-price"
                                            className="price-range-input"
                                            onChange={handlePriceChange}
                                            placeholder="Цена от"
                                        />
                                        <input
                                            type="number"
                                            min={filters.minPrice}
                                            max={filters.maxPrice}
                                            value={filters.maxPrice}
                                            name="maxPrice"
                                            id="max-price"
                                            className="price-range-input"
                                            onChange={handlePriceChange}
                                            placeholder="Цена до"
                                        />
                                    </div>
                                </label>
                            </div>
                            <button
                                className="apply-filters-button"
                                onClick={applyFilters}
                            >
                                Применить фильтры
                            </button>
                            <button
                                className="reset-filters-button"
                                onClick={resetFilters}
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cards-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {searchQuery &&
                        filteredServices.length === 0 &&
                        !loading && (
                            <p className="no-results-message">
                                Карточек с таким названием не найдено.
                            </p>
                        )}
                    <div className={`services-${viewMode}`}>
                        {viewMode === "list"
                            ? currentItems.map((service) => (
                                  <div
                                      className={`service-card service-card-${viewMode}`}
                                      key={service.id}
                                      onClick={() => openModal(service)}
                                  >
                                      <div
                                          className={`photo-container photo-container-${viewMode}`}
                                      >
                                          <img
                                              src={service.imageUrl}
                                              alt={service.name}
                                              onLoad={() => setLoading(false)}
                                          />
                                          {service.promo && (
                                              <img
                                                  src="https://img.icons8.com/fluency/96/000000/sale.png"
                                                  alt="Discount Icon"
                                                  className="discount-icon"
                                                  style={{
                                                      position: "absolute",
                                                      top: "0",
                                                      right: "0",
                                                      width: "50px",
                                                      height: "50px",
                                                  }}
                                              />
                                          )}
                                      </div>
                                      <h3>{service.name}</h3>
                                      <div className="price-container">
                                          {service.promo ? (
                                              <>
                                                  <p className="original-price">
                                                      <s>
                                                          {service.price} руб.
                                                      </s>
                                                  </p>
                                                  <p className="discounted-price">
                                                      {calculateDiscountedPrice(
                                                          service.price,
                                                          service.promo
                                                      )}{" "}
                                                      руб.
                                                  </p>
                                              </>
                                          ) : (
                                              <p>{service.price} руб.</p>
                                          )}
                                      </div>
                                  </div>
                              ))
                            : filteredServices.map((service) => (
                                  <div
                                      className={`service-card service-card-${viewMode}`}
                                      key={service.id}
                                      onClick={() => openModal(service)}
                                  >
                                      <div
                                          className={`photo-container photo-container-${viewMode}`}
                                      >
                                          <img
                                              src={service.imageUrl}
                                              alt={service.name}
                                              onLoad={() => setLoading(false)}
                                          />
                                          {service.promo && (
                                              <img
                                                  src="https://img.icons8.com/fluency/96/000000/sale.png"
                                                  alt="Discount Icon"
                                                  className="discount-icon"
                                                  style={{
                                                      position: "absolute",
                                                      top: "0",
                                                      right: "0",
                                                      width: "50px",
                                                      height: "50px",
                                                  }}
                                              />
                                          )}
                                      </div>
                                      <h3>{service.name}</h3>
                                      <div className="price-container">
                                          {service.promo ? (
                                              <>
                                                  <p className="original-price">
                                                      <s>
                                                          {service.price} руб.
                                                      </s>
                                                  </p>
                                                  <p className="discounted-price">
                                                      {calculateDiscountedPrice(
                                                          service.price,
                                                          service.promo
                                                      )}{" "}
                                                      руб.
                                                  </p>
                                              </>
                                          ) : (
                                              <p>{service.price} руб.</p>
                                          )}
                                      </div>
                                  </div>
                              ))}
                    </div>
                    {viewMode === "list" && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-arrow"
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
                            {renderPageNumbers()}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="pagination-arrow"
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
                        </div>
                    )}
                </div>
                {selectedService && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <img
                                src={selectedService.imageUrl}
                                alt={selectedService.name}
                            />
                            <h3>{selectedService.name}</h3>
                            <p>
                                Цена:
                                {selectedService.promo
                                    ? ` ${calculateDiscountedPrice(
                                          selectedService.price,
                                          selectedService.promo
                                      )} руб.`
                                    : ` ${selectedService.price} руб.`}
                            </p>
                            <p>{selectedService.description}</p>
                        </div>
                    </div>
                )}

                {errorVisible && (
                    <div className="error-modal-overlay">
                        <div className="error-modal-content">
                            <p>Проверьте правильность выбранного диапазона.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
