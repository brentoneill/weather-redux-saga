import React from "react";

// props
//   - search
//

export default ({ onClickItem, results, searchTerm }) => {
  return (
    <div
      className="DidYouMean"
      style={{
        maxWidth: 320,
        margin: "auto",
        listStyleType: "none",
        textAlign: "left"
      }}
    >
      <p>
        You searched for <i>{searchTerm}</i> which returned {results.length}{" "}
        results.
      </p>
      <p>Did you mean:</p>
      <ul>
        {results &&
          results.length > 0 &&
          results.map(place => {
            return (
              <li
                key={place.title}
                style={{ cursor: "pointer" }}
                onClick={onClickItem.bind(this, place)}
              >
                {place.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
