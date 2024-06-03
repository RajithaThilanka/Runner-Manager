import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  GoogleMapScreen: undefined;
  RideOptionsCard: undefined;
  HomeDrawer: undefined;
};

export type NavOptionScreenProps = StackNavigationProp<
  RootStackParamList,
  "Home",
  "GoogleMapScreen"
>;

export interface HomePageProps {
  navigation: NavOptionScreenProps;
}

export interface RideOption {
  id: string;
  title: string;
  multiplier: number;
  image: ImageSourcePropType;
}
