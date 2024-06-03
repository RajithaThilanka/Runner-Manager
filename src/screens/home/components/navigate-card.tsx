import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../../../slices/nav-slice";
import NavFavourites from "./nav-favourits";
import { useNavigation } from "@react-navigation/native";
import { NavOptionScreenProps } from "../home.types";
import { GOOGLE_MAPS_APIKEY } from "@env";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavOptionScreenProps>();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hellow, Rajitha </Text>
      <View style={tw` border-gray-200 flex-shrink rounded-lg`}>
        <View>
          <GooglePlacesAutocomplete
            onPress={(data, details = null) => {
              if (details !== null) {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                navigation.navigate("RideOptionsCard");
              }
            }}
            styles={toInputBoxStyles}
            placeholder="Where to?"
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            onFail={(error) => console.error(error)}
            enablePoweredByContainer={false}
            minLength={2}
          />
        </View>
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 0,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 15,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
