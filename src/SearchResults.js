import React, { Component } from "react";

import ForecastDay from "./ForecastDay.js";
// props
//   - results
//

class SearchResults extends Component {
  render() {
    let results =
      this.props.results &&
      this.props.results.length &&
      this.props.results.slice(0, 7);

    return (
      <div
        className="SearchResults"
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        {results &&
          results.map(forecast => (
            <ForecastDay key={forecast.applicable_date} data={forecast} />
          ))}
      </div>
    );
  }
}

export default SearchResults;
