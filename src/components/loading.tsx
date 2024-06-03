import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#2c3e50" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default Loading;
