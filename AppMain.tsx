import { Provider } from "react-redux";
import store from "./src/store/Store";
import { WordsApp } from "./src/words-app/WordsApp";

export function AppMain() {
  return (
    <Provider store={store}>
      <WordsApp />
    </Provider>
  );
}
