import React from "react";
import moment from "moment";

export default ({ data }) => {
  console.log();

  return (
    <div style={{ padding: 10 }}>
      <div
        className="Forecast"
        style={{
          border: "1px solid black",
          borderRadius: 8,
          fontSize: 13,
          padding: 5
        }}
      >
        {data.weather_state_name}
        <img
          alt={data.weather_state_name}
          src={`https://www.metaweather.com/static/img/weather/${
            data.weather_state_abbr
          }.svg`}
        />
        <p>High - {Math.round(data.max_temp)}° C</p>
        <p>Low - {Math.round(data.min_temp)}° C</p>
        <p>Humidity - {data.humidity}</p>
        {moment(data.applicable_date).format("ll")}
      </div>
    </div>
  );
};
