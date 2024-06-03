import { StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../../slices/nav-slice";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavOptionScreenProps } from "../home.types";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

const NavOptions = () => {
  const navigation = useNavigation<NavOptionScreenProps>();
  const origin = useSelector(selectOrigin);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.section}>
        <View style={styles.buttonContainer}>
          <Button
            title="Get Start"
            onPress={() => {
              if (origin) {
                navigation.navigate("GoogleMapScreen");
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  buttonContainer: {
    width: 300,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sectionContent: {
    fontSize: 16,
    color: "#666",
  },
});
export default NavOptions;
