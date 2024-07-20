import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigatorConfig from "./src/routes/stack-navigation-config";
import { store } from "./src/store";

import { KeyboardAvoidingView, Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <StackNavigatorConfig />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
