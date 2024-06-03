import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ThemeProvider } from "@rneui/themed";
import theme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigatorConfig from "./src/routes/stack-navigation-config";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  );
}
