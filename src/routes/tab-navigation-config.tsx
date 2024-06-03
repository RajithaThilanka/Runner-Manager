import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import Home from "../screens/home/home";
import Account from "../screens/account/account";
import Service from "../screens/services/service";

const Tab = createBottomTabNavigator();

const TabNavigationsConfig = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "transparent",
          paddingBottom: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarLabel: "Home Screen",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Services"
        component={Service}
        options={{
          tabBarLabel: "Services",
          tabBarIcon: ({ color }) => (
            <Foundation name="results" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationsConfig;
