import { StyleSheet } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import NavOptions from "./components/nav-options";
import { Text } from "@rneui/base";
import NavFavourites from "./components/nav-favourits";
import PlaceHolder from "./components/place-holder";

const Home = () => {
  return (
    <SafeAreaView style={[styles.safeArea, tw`bg-white`]}>
      <Text style={[styles.title]}>Runner Manager</Text>
      <PlaceHolder />
      <NavOptions />
      <NavFavourites />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    color: "#333",
    marginBottom: 20,
    marginLeft: 30,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#007bff",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default Home;
