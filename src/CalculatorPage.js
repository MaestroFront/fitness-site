import React, { useState } from "react";
import "./styles/CalculatorPage.css";

const CalculatorPage = () => {
    const [paceHours, setPaceHours] = useState("00");
    const [paceMinutes, setPaceMinutes] = useState("00");
    const [paceSeconds, setPaceSeconds] = useState("00");
    const [distance, setDistance] = useState("");
    const [desiredHours, setDesiredHours] = useState("00");
    const [desiredMinutes, setDesiredMinutes] = useState("00");
    const [desiredSeconds, setDesiredSeconds] = useState("00");

    const calculateSpeed = () => {
        const totalPaceInMinutes =
            parseFloat(paceHours) * 60 +
            parseFloat(paceMinutes) +
            parseFloat(paceSeconds) / 60;
        if (!isNaN(totalPaceInMinutes) && totalPaceInMinutes > 0) {
            const speed = 60 / totalPaceInMinutes;
            return speed.toFixed(2);
        }
        return "";
    };

    const calculatePace = () => {
        const distanceNumber = parseFloat(distance);
        const totalTimeInMinutes =
            parseFloat(desiredHours) * 60 +
            parseFloat(desiredMinutes) +
            parseFloat(desiredSeconds) / 60;
        if (
            !isNaN(distanceNumber) &&
            distanceNumber > 0 &&
            !isNaN(totalTimeInMinutes) &&
            totalTimeInMinutes > 0
        ) {
            const paceInMinutes = totalTimeInMinutes / distanceNumber;
            const minutes = Math.floor(paceInMinutes);
            const seconds = Math.round((paceInMinutes - minutes) * 60);
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
        return "";
    };

    const handleTimeInputFocus = (e) => {
        if (e.target.value === "00") {
            e.target.value = "";
        }
    };

    const handleTimeInputBlur = (e, setter) => {
        if (e.target.value === "") {
            setter("00");
        } else {
            setter(e.target.value.slice(0, 2));
        }
    };

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    };

    const handlePopularDistanceClick = (distance) => {
        setDistance(distance);
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <h2>Калькулятор скорости</h2>
                <div className="calculator-box">
                    <label>
                        Темп на 1 км (чч:мм:сс):
                        <div className="time-inputs">
                            <input
                                type="text"
                                value={paceHours}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setPaceHours)
                                }
                                onChange={(e) =>
                                    setPaceHours(e.target.value.slice(0, 2))
                                }
                                placeholder="чч"
                            />
                            <input
                                type="text"
                                value={paceMinutes}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setPaceMinutes)
                                }
                                onChange={(e) =>
                                    setPaceMinutes(e.target.value.slice(0, 2))
                                }
                                placeholder="мм"
                            />
                            <input
                                type="text"
                                value={paceSeconds}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setPaceSeconds)
                                }
                                onChange={(e) =>
                                    setPaceSeconds(e.target.value.slice(0, 2))
                                }
                                placeholder="сс"
                            />
                        </div>
                    </label>
                    <p>
                        Скорость:{" "}
                        {paceHours || paceMinutes || paceSeconds
                            ? calculateSpeed()
                            : ""}{" "}
                        км/ч
                    </p>
                </div>

                <h2>Калькулятор среднего темпа</h2>
                <div className="calculator-box">
                    <label>
                        Дистанция (км):
                        <input
                            type="text"
                            value={distance}
                            onChange={handleDistanceChange}
                            placeholder="Введите расстояние в километрах"
                        />
                    </label>
                    <div className="popular-distances">
                        <button onClick={() => handlePopularDistanceClick(5)}>
                            5 км
                        </button>
                        <button onClick={() => handlePopularDistanceClick(10)}>
                            10 км
                        </button>
                        <button onClick={() => handlePopularDistanceClick(15)}>
                            15 км
                        </button>
                        <button
                            onClick={() => handlePopularDistanceClick(21.0975)}
                        >
                            Полумарафон
                        </button>
                        <button
                            onClick={() => handlePopularDistanceClick(42.195)}
                        >
                            Марафон
                        </button>
                    </div>
                    <label>
                        Желаемой время (чч:мм:сс):
                        <div className="time-inputs">
                            <input
                                type="text"
                                value={desiredHours}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setDesiredHours)
                                }
                                onChange={(e) =>
                                    setDesiredHours(e.target.value.slice(0, 2))
                                }
                                placeholder="чч"
                            />
                            <input
                                type="text"
                                value={desiredMinutes}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setDesiredMinutes)
                                }
                                onChange={(e) =>
                                    setDesiredMinutes(
                                        e.target.value.slice(0, 2)
                                    )
                                }
                                placeholder="мм"
                            />
                            <input
                                type="text"
                                value={desiredSeconds}
                                onFocus={handleTimeInputFocus}
                                onBlur={(e) =>
                                    handleTimeInputBlur(e, setDesiredSeconds)
                                }
                                onChange={(e) =>
                                    setDesiredSeconds(
                                        e.target.value.slice(0, 2)
                                    )
                                }
                                placeholder="сс"
                            />
                        </div>
                    </label>
                    <p>
                        Рассчитанный средний темп:{" "}
                        {distance &&
                        (desiredHours || desiredMinutes || desiredSeconds)
                            ? calculatePace()
                            : ""}{" "}
                        мин/км
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CalculatorPage;
