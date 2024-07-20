import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "../components/loading";
import SignIn from "../screens/sign-in/sign-in";
import SignUp from "../screens/sign-in/sign-up";
import DrawerNavigatorConfig from "./drawer-navigation-conig";
import GoogleMapScreen from "../screens/home/components/google-map";
import { RootState } from "../store/root-reducer";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const StackNavigatorConfig: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const authState = useSelector((state: RootState) => state.auth);
  useEffect(() => {}, [authState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderScreens = () => {
    if (loading) {
      return (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
          }}
        />
      );
    } else if (authState?.accessToken) {
      return (
        <>
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
      );
    } else {
      return (
        <>
          <Stack.Screen
            name="SignIn"
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
        </>
      );
    }
  };

  return (
    <Stack.Navigator initialRouteName="Loading">
      {renderScreens()}
    </Stack.Navigator>
  );
};

export default StackNavigatorConfig;
