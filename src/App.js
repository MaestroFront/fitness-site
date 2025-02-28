import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CalculatorPage from "./CalculatorPage";
import ServicesPage from "./ServicesPage";
import ContactsPage from "./ContactsPage";
import Reviews from "./Reviews";
import Navbar from "./Navbar";
import HeartRateCalculator from "./HeartRateCalculator";
import Gallery from "./Gallery";
import ChatBot from "./ChatBot";

function App() {
    return (
        <Router>
            <Navbar />
            <ChatBot />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/heartrate" element={<HeartRateCalculator />} />
                <Route path="/gallery" element={<Gallery />} />
            </Routes>
        </Router>
    );
}

export default App;
