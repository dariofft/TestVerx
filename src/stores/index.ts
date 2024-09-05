import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import sagas from "./sagas";
import ducks from "./ducks";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: ducks,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export { store };
