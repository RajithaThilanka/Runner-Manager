/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Input, Image, Icon } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button } from "react-native-elements";
import { getImage } from "../../helpers/getImage";
import { SignInProps } from "./signin.types";
import { useNavigation } from "@react-navigation/native";
import { NavOptionScreenProps } from "../home/home.types";
import { Text } from "@rneui/base";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn: React.FC<SignInProps> = () => {
  const navigation = useNavigation<NavOptionScreenProps>();
  const currentYear = new Date().getFullYear();
  const handleLoginPress = (): void => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={getImage("loginLogo")} />
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLoginPress}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <>
              <Input
                placeholder="Email"
                leftIcon={<Icon name="email" size={24} color="black" />}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : ""}
                inputContainerStyle={styles.inputContainerStyle}
              />
              <Input
                placeholder="Password"
                leftIcon={<Icon name="lock" size={24} color="black" />}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                errorMessage={
                  touched.password && errors.password ? errors.password : ""
                }
                inputContainerStyle={styles.inputContainerStyle}
              />
              <Button title="Login" onPress={handleLoginPress} />
              <TouchableOpacity
                style={styles.signUpContainer}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Text style={styles.signUpButton}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 150,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#86939e",
    marginVertical: 2,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
