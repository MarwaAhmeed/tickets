import { createStore,applyMiddleware } from "redux";
import reducers from "./reducer/compineReducers"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
  );
