import React, { useEffect, useState } from "react";
import "./styles/HomePage.css";
import servicesData from "./services.json";
import inpadData from "./inpad.json";
import pikData from "./pik.json";

const HomePage = () => {
    const [services, setServices] = useState([]);
    const [inpad, setinpad] = useState([]);
    const [pik, setpik] = useState([]);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [currentpikIndex, setCurrentpikIndex] = useState(0);

    useEffect(() => {
        setServices(servicesData);
        setinpad(inpadData);
        setpik(pikData);
    }, []);

    const nextService = () => {
        setCurrentServiceIndex((prevIndex) =>
            prevIndex === services.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevService = () => {
        setCurrentServiceIndex((prevIndex) =>
            prevIndex === 0 ? services.length - 1 : prevIndex - 1
        );
    };

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

    const nextpik = () => {
        setCurrentpikIndex((prevIndex) =>
            prevIndex === pik.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevpik = () => {
        setCurrentpikIndex((prevIndex) =>
            prevIndex === 0 ? pik.length - 1 : prevIndex - 1
        );
    };

    if (services.length === 0 || inpad.length === 0 || pik.length === 0) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Ю ар вэлком!</h1>
            </div>

            <div className="section-container">
                <div className="section-text">
                    <h2>Обо мне</h2>
                    <p>
                        Привет! Меня зовут <strong>Александр Акиев</strong>, и я
                        рад приветствовать вас на своем сайте. Я родился 29
                        января 1994 года в небольшом городке Полевской, но
                        сейчас живу и работаю в Екатеринбурге.
                    </p>
                    <p>
                        Моя жизнь и карьера полны разнообразных достижений и
                        направлений, и я готов поделиться своим опытом с вами.
                    </p>
                </div>
                <div className="section-image">
                    <img src="https://media.istockphoto.com/id/1424617746/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BE%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D1%83%D1%8F%D1%81%D1%8C-%D0%BD%D0%B0-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D0%B8%D1%8E-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%BC%D0%B5%D0%BD-%D0%BF%D1%80%D0%B8%D0%BA%D0%BE%D1%81%D0%BD%D0%B5%D1%82%D1%81%D1%8F-%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B9-%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%BA%D0%BE%D0%B9-%D0%B4%D1%80%D0%BE%D1%82%D0%B8%D0%BA%D0%B0-%D0%BA-%D0%B2%D0%B8%D1%80%D1%82%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9.jpg?s=612x612&w=0&k=20&c=jBc4OgrrPMTyuQ0TlYdB59QIst5hkA4Six5LDf-o5OU=" alt="Обо мне" />
                </div>
            </div>

            <div className="section-container">
                <div className="section-image">
                    <img
                        src="https://media.istockphoto.com/id/949118068/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8.jpg?s=612x612&w=0&k=20&c=qCT40cW1o_fdP422mdDHd_wJh1OdGYBrEfjrfGdCius="
                        alt="Образование и Карьера"
                    />
                </div>
                <div className="section-text">
                    <h3>Образование и Карьера</h3>
                    <p>
                        Мое образование началось с получения бакалавра в области{" "}
                        <strong>металлургии</strong> в Уральском федеральном
                        университете в 2016 году. Однако, моя страсть к спорту
                        привела меня к получению магистерской степени в области{" "}
                        <strong>спортивной подготовки</strong> в 2018 году в том
                        же университете.
                    </p>
                </div>
            </div>

            <div className="section-container">
                <div className="section-text">
                    <h3>Опыт Работы</h3>
                    <p>
                        Мой профессиональный путь начался с работы персональным
                        тренером в фитнес-клубе "Адмиральский", где я проработал
                        год. Этот опыт научил меня индивидуальному подходу к
                        каждому клиенту и помог мне развить навыки мотивации и
                        поддержки.
                    </p>
                    <p>
                        Затем я перешел в футбольный клуб
                        "Спартак-Екатеринбург", где в течение трех лет
                        тренировал юношей. Работа с молодежью дала мне
                        уникальную возможность влиять на формирование здорового
                        образа жизни с раннего возраста.
                    </p>
                </div>
                <div className="section-image">
                    <img
                        src="https://media.istockphoto.com/id/802465906/ru/%D1%84%D0%BE%D1%82%D0%BE/fit-%D1%82%D1%80%D0%B5%D0%BD%D0%B5%D1%80-%D0%B8-%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D0%B0-%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D1%82%D1%8C.jpg?s=612x612&w=0&k=20&c=VSLHDnhlc3F2dv129PIfR9eRQxS54EpRTiOlxd9JK04="
                        alt="Опыт Работы"
                    />
                </div>
            </div>

            <div className="section-container">
                <div className="section-image">
                    <img
                        src="https://media.istockphoto.com/id/476886726/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BE%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-office-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BD%D0%B8%D0%BA.jpg?s=612x612&w=0&k=20&c=1utJ9Ryh9wUkjGMVt-zdWOWwPfNxbiwV5LRLfnRQciw="
                        alt="Текущая Деятельность"
                    />
                </div>
                <div className="section-text">
                    <h3>Текущая Деятельность</h3>
                    <p>
                        Сейчас я работаю <strong>low-code разработчиком</strong>{" "}
                        в компании SML, что позволяет мне сочетать технические
                        навыки с моей страстью к фитнесу. Я продолжаю проводить
                        персональные и групповые тренировки, помогая людям
                        достигать своих фитнес-целей.
                    </p>
                </div>
            </div>

            <div className="section-container">
                <div className="section-text">
                    <h3>Личные Достижения</h3>
                    <p>
                        С 4-х лет я занимался хоккеем и футболом, а с 7-го
                        класса начал бегать. На первом курсе в УрФУ я впервые
                        выполнил КМС на дистанции 800 метров. Также затем я
                        выполнил КМС на 600 метров.
                    </p>
                    <p>Личные рекорды:</p>
                    <div className="personal-records-container">
                        <ul className="personal-records-column">
                            <li>
                                <strong>400м:</strong> 50.55 (стадион)
                            </li>
                            <li>
                                <strong>800м:</strong> 1.54.20 (манеж)
                            </li>
                            <li>
                                <strong>1500м:</strong> 3.59.42 (манеж)
                            </li>
                            <li>
                                <strong>5000м:</strong> 16.16 на тренировке
                                (манеж)
                            </li>
                            <li>
                                <strong>Марафон:</strong> 2.49.24 (Тобольск,
                                2024 год)
                            </li>
                        </ul>
                        <ul className="personal-records-column">
                            <li>
                                <strong>600м:</strong> 1.19.8 (стадион)
                            </li>
                            <li>
                                <strong>1000м:</strong> 2.32.0 (манеж)
                            </li>
                            <li>
                                <strong>3000м:</strong> 8.57.4 (манеж)
                            </li>
                            <li>
                                <strong>10000м:</strong> 34.00 (Майская Гроза)
                            </li>
                            <li>
                                <strong>Полумарафон:</strong> 1.17 (тренировка в
                                2024 году)
                            </li>
                        </ul>
                    </div>
                    <p>Участие в соревнованиях:</p>
                    <ul className="competitions-list">
                        <li>Областные соревнования (неоднократный призер)</li>
                        <li>
                            Чемпионат города Екатеринбурга (призер и победитель)
                        </li>
                        <li>Мемориал Новожилова</li>
                        <li>Мемориал Нечеухина (Челябинск)</li>
                        <li>
                            Рождественские старты (Екатеринбург, 600м и 1000м)
                        </li>
                        <li>УрФО (Челябинск, зима, лето)</li>
                        <li>Зимний Чемпионат России (Москва)</li>
                        <li>Летнее Первенство России (Казань)</li>
                        <li>
                            Спартакиада Лукойл (Нижний Новгород, командой заняли
                            1 место)
                        </li>
                    </ul>
                </div>
                <div className="section-image">
                    <img src="https://media.istockphoto.com/id/1197829211/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%B0%D1%8F-%D0%BA%D1%83%D0%BA%D0%BB%D0%B0-%D0%B2-%D0%BF%D0%BE%D0%B7%D0%B5-%D0%B1%D0%B5%D0%B3%D0%B0.jpg?s=612x612&w=0&k=20&c=Wb-rHTHNS9MkgWpbhh1hxy8J1ti1j20avJq5k8Lmdxo=" alt="Личные Достижения" />
                </div>
            </div>

            <div className="gallery-container">
                <div className="carousel">
                    <h2>Мои Услуги</h2>
                    <div className="carousel-item">
                        <div className="image-container">
                            <button
                                onClick={prevService}
                                className="home-carousel-button prev"
                            >
                                &#10094;
                            </button>
                            <img
                                src={services[currentServiceIndex].imageUrl}
                                alt={services[currentServiceIndex].name}
                            />
                            <button
                                onClick={nextService}
                                className="home-carousel-button next"
                            >
                                &#10095;
                            </button>
                        </div>
                        <h3>{services[currentServiceIndex].name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
