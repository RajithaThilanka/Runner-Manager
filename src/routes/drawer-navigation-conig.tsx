import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/settings/settings";
import TabNavigationsConfig from "./tab-navigation-config";
import AccelerMeter from "../expo-references/acceler-meter/acceler-meter";

const Drawer = createDrawerNavigator();

const DrawerNavigatorConfig = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#006064",
          width: 240,
        },
        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#ccc",
        drawerLabelStyle: {
          marginLeft: 5,
          fontSize: 15,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#006064",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigationsConfig} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="AcceleroMeter" component={AccelerMeter} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorConfig;
