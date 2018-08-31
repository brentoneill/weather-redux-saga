import React, { Component } from "react";

// props
//   - search
//

class SearchBar extends Component {
  state = {
    search: ""
  };

  updateSearch = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.search(this.state.search);
  };

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.search}
            required
            type="text"
            onChange={this.updateSearch}
            placeholder="Get some weather!"
          />
          <button type="submit">Go!</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
