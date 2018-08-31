import { combineReducers } from "redux";

import { FETCH_WEATHER } from "../actions/index";

WeatherReducer = function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // return state.concat([action.payload.data]);
      return [action.payload.data, ...state];
  }

  return state;
};

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;
