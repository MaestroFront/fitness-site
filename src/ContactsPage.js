import React, { useEffect, useRef } from "react";
import "./styles/ContactsPage.css";

const ContactsPage = () => {
    const mapRef = useRef(null);
    const mapInitialized = useRef(false);
    let mapInstance = null;

    useEffect(() => {
        const loadMapScript = () => {
            const script = document.createElement("script");
            script.src =
                "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=ВАШ_API_КЛЮЧ";
            script.async = true;

            script.onload = () => {
                window.ymaps.ready(() => {
                    if (!mapInitialized.current) {
                        mapInstance = new window.ymaps.Map("map", {
                            center: [56.794256, 60.646841],
                            zoom: 17,
                        });

                        const placemark = new window.ymaps.Placemark(
                            [56.794256, 60.646841],
                            {
                                balloonContent:
                                    "г. Екатеринбург, ул. Водоёмная, 80к2",
                            }
                        );

                        mapInstance.geoObjects.add(placemark);
                        mapInitialized.current = true;
                    } else {
                        // Перерисовываем карту, если она уже была инициализирована
                        mapInstance.container.fitToViewport();
                    }
                });
            };

            script.onerror = () => {
                console.error("Ошибка загрузки скрипта карты.");
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && mapInstance) {
                mapInstance.container.fitToViewport();
            }
        };

        const handleMenuClick = () => {
            if (mapInstance) {
                mapInstance.container.fitToViewport();
            }
        };

        if (!window.ymaps) {
            loadMapScript();
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Добавьте обработчик клика на пункт меню
        const menuItem = document.querySelector('a[href="/contacts"]'); // Замените на ваш селектор
        if (menuItem) {
            menuItem.addEventListener("click", handleMenuClick);
        }

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
            if (menuItem) {
                menuItem.removeEventListener("click", handleMenuClick);
            }
        };
    }, []);

    return (
        <div className="contacts-container-container">
            <div className="contacts-container">
                <h2>Контакты</h2>
                <p>Email: akievaleksandr@mail.ru</p>
                <p>Номер телефона: +7 (991) 514-2716</p>
                <p>Адрес: г. Екатеринбург, ул. Водоёмная, 80к2</p>
                <div
                    id="map"
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: "400px",
                        marginTop: "20px",
                    }}
                ></div>
                <div className="social-media">
                    <a
                        href="https://vk.com/alex_notsimple"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon vk"
                    >
                        <img src="/vk.png" alt="ВКонтакте" width={40} />
                    </a>
                    <a
                        href="https://wa.me/79915142716"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon whatsapp"
                    >
                        <img src="/whatsapp.svg" alt="WhatsApp" width={40} />
                    </a>
                    <a
                        href="https://t.me/aleksandr_akiev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon telegram"
                    >
                        <img src="/telegram.svg" alt="Telegram" width={40} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
