import { Provider } from "react-redux";
import { WordsApp } from "./src/words-app/WordsApp";
import { AppInitializer } from "./src/AppInitializer.tsx";
import store from "./src/words-app/app-data/store/Store.ts";

export function AppMain() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <WordsApp />
      </AppInitializer>
    </Provider>
  );
}
