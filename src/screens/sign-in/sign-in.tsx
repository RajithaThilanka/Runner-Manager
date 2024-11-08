import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Button } from "react-native-elements";
import { SignInProps } from "./signin.types";
import { useNavigation } from "@react-navigation/native";
import { NavOptionScreenProps } from "../home/home.types";
import { Text } from "@rneui/base";
import { useDispatch } from "react-redux";
import {
  login,
  REFRESH_TOKEN_KEY,
  refreshAccessToken,
} from "../../auth/authActions";

const SignIn: React.FC<SignInProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavOptionScreenProps>();
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(true);

  // Check for refresh token and get a new access token if available
  useEffect(() => {
    const checkRefreshToken = async () => {
      setLoading(true);

      // Check if refresh token exists
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          // Use the refresh token to get a new access token
          const newAccessToken = await refreshAccessToken(dispatch);
          if (newAccessToken) {
            // Navigate to Home if a new access token is obtained
            navigation.navigate("Home");
            return;
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }

      // No refresh token or failed refresh, display login screen
      setLoading(false);
    };

    checkRefreshToken();
  }, [navigation, dispatch]);

  const handleLoginPress = (): void => {
    setLoading(true);
    dispatch(login() as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Login" onPress={handleLoginPress} loading={loading} />
        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.signUpText}>
            Don&apos;t have an account?{" "}
            <Text style={styles.signUpButton}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.copyRightText}>
        © {currentYear} Rajitha Thilanka. All rights reserved.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  signUpContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    color: "gray",
  },
  signUpButton: {
    color: "#007bff",
    fontWeight: "bold",
  },
  copyRightText: {
    marginTop: 20,
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default SignIn;
