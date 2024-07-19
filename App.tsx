import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { Button, Text, SafeAreaView, StyleSheet } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // Endpoint
  const discovery = useAutoDiscovery(
    "https://login.microsoftonline.com/common/v2.0"
  );
  const redirectUri = makeRedirectUri({
    scheme: "xbroker", // Use your app's scheme here
    path: "auth",
  });
  const clientId = "5719e40c-99bd-43ae-bc26-162e61907c0f";

  // We store the JWT in here
  const [token, setToken] = React.useState<string | null>(null);

  // Request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
    },
    discovery
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync().then((codeResponse) => {
            if (request && codeResponse?.type === "success" && discovery) {
              exchangeCodeAsync(
                {
                  clientId,
                  code: codeResponse.params.code,
                  extraParams: request.codeVerifier
                    ? { code_verifier: request.codeVerifier }
                    : undefined,
                  redirectUri,
                },
                discovery
              ).then((res) => {
                setToken(res.accessToken);
              });
            }
          });
        }}
      />
      <Text>{token}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 80,
  },
});
