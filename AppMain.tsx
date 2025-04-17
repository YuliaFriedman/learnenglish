import { Provider } from "react-redux";
import { WordsApp } from "./src/words-app/WordsApp";
import { AppInitializer } from "./src/AppInitializer.tsx";
import store from "./src/words-app/app-data/store/Store.ts";
import { NavigationContainer } from "@react-navigation/native";

export function AppMain() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInitializer>
          <WordsApp />
        </AppInitializer>
      </NavigationContainer>
    </Provider>
  );
}
