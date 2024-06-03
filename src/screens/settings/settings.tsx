import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { Text } from "@rneui/base";
import * as Updates from "expo-updates";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Setting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const checkForUpdates = async () => {
    try {
      setIsLoading(true);
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "Update Downloaded",
          "Updates have been downloaded successfully. Restart now to apply updates..?",
          [
            {
              text: "Later",
              onPress: () => console.log("Restart later"),
              style: "cancel",
            },
            {
              text: "Restart",
              onPress: () => {
                console.log("Restarting to apply updates");
                Updates.reloadAsync();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("No Updates", "Your app is up to date!");
      }
    } catch (e) {
      Alert.alert("Update Failed", `Failed to check updates: ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Manage Your Preferences</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Updates</Text>
          <Text style={styles.sectionContent}>
            Check for the latest updates to ensure your app is up to date.
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#5C49E0" />
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title="Check for Updates"
                onPress={checkForUpdates}
                color="#5C49E0"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#444",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
