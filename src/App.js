import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import SearchBar from "./SearchBar.js";
import SearchResults from "./SearchResults.js";
import DidYouMean from "./DidYouMean.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      valid: false,
      searchSubmitted: false,
      loading: false,
      data: null,
      places: null
    };
  }

  handleSearch = searchTerm => {
    this.setState({ searchSubmitted: false });

    this.setState({ searchTerm, loading: true }, () => {
      axios
        .get(
          `https://www.metaweather.com/api/location/search/?query=${searchTerm}`
        )
        .then(
          res => {
            if (res.data && res.data.length === 1) {
              this.setState({
                searchSubmitted: true,
                places: res.data,
                valid: true
              });
              this.requestWeather(res.data[0]);
            } else if (res.data && res.data.length > 1) {
              this.setState({
                loading: false,
                searchSubmitted: true,
                places: res.data,
                valid: true
              });
            } else {
              this.setState({
                searchSubmitted: true,
                places: null,
                valid: false,
                loading: false
              });
            }
          },
          err => {
            console.log(err);
          }
        );
    });
  };

  requestWeather = place => {
    this.setState({ loading: true, places: [place] });

    return axios
      .get(`https://www.metaweather.com/api/location/${place.woeid}`)
      .then(res => {
        console.log(res);
        if (res.data) {
          this.setState({
            loading: false,
            data: res.data
          });
        }
      });
  };

  render() {
    const {
      valid,
      searchTerm,
      searchSubmitted,
      loading,
      data,
      places
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WeatherDNA</h1>
          <SearchBar search={this.handleSearch} />
        </header>
        <main>
          {!valid &&
            searchTerm.length >= 1 &&
            searchSubmitted && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                Location not found for your query <i>{searchTerm}</i>
              </p>
            )}

          {loading && <p>Loading...</p>}

          {!loading &&
            places &&
            places.length === 1 &&
            data && (
              <div className="App--results">
                <p>Your 7 day forecast for {places[0].title}</p>
                <SearchResults
                  results={data.consolidated_weather}
                  searchTerm={searchTerm}
                />
              </div>
            )}

          {!loading &&
            places &&
            places.length > 1 &&
            data && (
              <div className="App--results">
                <DidYouMean
                  searchTerm={searchTerm}
                  results={places}
                  onClickItem={this.requestWeather}
                />
              </div>
            )}
        </main>
      </div>
    );
  }
}

export default App;
