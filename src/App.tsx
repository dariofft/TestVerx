import { Provider } from "react-redux";

import { Router } from "./routes";

import { store } from "./stores";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
