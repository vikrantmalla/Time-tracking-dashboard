import React, { useState, useEffect } from 'react'

const Dashboard = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/data')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                setdata(data)
            })
    }, [])

    const [timePeriod, setTimePeriod] = useState("weekly");
    const [previousMessage, setPreviousMessage] = useState("Last Week");

    const periodChangeHandler = ({ target: { name } }) => {
        setTimePeriod(name);
        if (name === "daily") setPreviousMessage("Previous Day");
        if (name === "weekly") setPreviousMessage("Last Week");
        if (name === "monthly") setPreviousMessage("Last Month");
    };
    return (
        <>
            <article className="grid">

                <header className="header">
                    <div className="user-hero">
                        <img src="./images/image-jeremy.png" alt="im" />
                        <div className="user-info">
                            <p>Report for</p>
                            <h2>Jeremy Robson</h2>
                        </div>
                    </div>
                    <div className="time-options">
                        <button onClick={periodChangeHandler} className={timePeriod === "daily" ? "showing" : ""} name="daily" type="button">
                            Daily
                        </button>
                        <button onClick={periodChangeHandler} className={timePeriod === "weekly" ? "showing" : ""} name="weekly" type="button" >
                            Weekly
                        </button>
                        <button onClick={periodChangeHandler} className={timePeriod === "monthly" ? "showing" : ""} name="monthly" type="button" >
                            Monthly
                        </button>
                    </div>
                </header>
                {
                    data.map((activity, id) => {
                        const { title, timeframes } = activity;
                        return (
                            <article className={"card " + title} key={id}>
                                <div className="card-head">
                                    <h2 className="card-title">{title}</h2>
                                    <img src="./images/icon-ellipsis.svg" alt="ellipsis" />
                                </div>
                                <div className="card-info">
                                    <h2 className="current-hours">{timeframes[timePeriod].current} hrs</h2>
                                    <p className="previous-hours">{previousMessage} - {timeframes[timePeriod].previous} hrs</p>
                                </div>
                            </article>
                        )
                    })
                }


            </article>
        </>
    )
}

export default Dashboard
