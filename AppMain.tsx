import { Provider } from "react-redux";
import store from "./src/store/Store";
import { WordsApp } from "./src/words-app/WordsApp";
import { AppInitializer } from "./src/AppInitializer.tsx";

export function AppMain() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <WordsApp />
      </AppInitializer>
    </Provider>
  );
}
