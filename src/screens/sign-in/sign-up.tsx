import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImage } from "../../helpers/getImage";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "@rneui/base";

const SignUp = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={getImage("construction")} />
        </View>
        <Text>Sign Up Page</Text>
      </ScrollView>
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
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default SignUp;
