import { ImageSourcePropType } from "react-native";

type ImageAssets = {
  logo: ImageSourcePropType;
  loginLogo: ImageSourcePropType;
  defaultProfile: ImageSourcePropType;
  default: ImageSourcePropType;
  construction: ImageSourcePropType;
  car: ImageSourcePropType;
  van: ImageSourcePropType;
};

export const imageAssets: ImageAssets = {
  logo: require("../../assets/mainlogo.png"),
  default: require("../../assets/mainlogo.png"),
  loginLogo: require("../../assets/main.png"),
  defaultProfile: require("../../assets/defaulrprofile.jpg"),
  construction: require("../../assets/uc1.png"),
  car: require("../../assets/car.png"),
  van: require("../../assets/van.png"),
};

export const getImage = (imageName: keyof ImageAssets): ImageSourcePropType => {
  const image = imageAssets[imageName];
  return image || imageAssets.default;
};
