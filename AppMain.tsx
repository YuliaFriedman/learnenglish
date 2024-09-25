import { Provider } from "react-redux";
import App from "./App";
import store from "./src/store/Store";

export function AppMain() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
