import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
};
type NavigationType = StackNavigationProp<RootStackParamList, "Home", "SignUp">;

export interface SignInProps {
  navigation: NavigationType;
}
