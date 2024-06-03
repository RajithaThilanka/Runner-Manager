import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../components/loading";
import SignIn from "../screens/sign-in/sign-in";
import SignUp from "../screens/sign-in/sign-up";
import DrawerNavigatorConfig from "./drawer-navigation-conig";
import GoogleMapScreen from "../screens/home/components/google-map";
const Stack = createStackNavigator();

const StackNavigatorConfig = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Stack.Navigator initialRouteName="Loading">
      {loading ? (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={DrawerNavigatorConfig}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="GoogleMapScreen"
            component={GoogleMapScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigatorConfig;
