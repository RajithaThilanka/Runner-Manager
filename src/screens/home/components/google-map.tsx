import { TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import NavigateCard from "./navigate-card";
import { NavOptionScreenProps } from "../home.types";
import CustommMap from "./custom-map";
import RideOptionsCard from "./ride-options-card";

const GoogleMapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation<NavOptionScreenProps>();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-1`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        >
          <Icon name="menu" style={tw``} />
        </TouchableOpacity>
        <View style={tw`h-1/2`}>
          <CustommMap />
        </View>

        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RideOptionsCard"
              component={RideOptionsCard}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoogleMapScreen;
