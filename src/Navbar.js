import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="nav-container">
            <NavLink to="/" end>
                Главная
            </NavLink>
            <NavLink to="/services">Фитнес-услуги</NavLink>
            <NavLink to="/calculator">Рассчет темпа и скорости</NavLink>
            <NavLink to="/heartrate">Узнай свои беговые зоны</NavLink>
            <NavLink to="/reviews">Отзывы</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
            <NavLink to="/gallery">Галлерея</NavLink>
        </nav>
    );
};

export default Navbar;
