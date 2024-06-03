import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { setDestination, setOrigin } from "../../../slices/nav-slice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const PlaceHolder = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={styles.section}>
        <GooglePlacesAutocomplete
          onPress={(data, details = null) => {
            if (details) {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }
          }}
          styles={{
            container: styles.inputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            description: styles.description,
            row: styles.row,
            separator: styles.separator,
            poweredContainer: styles.poweredContainer,
            powered: styles.powered,
          }}
          placeholder="Where from?"
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
    </SafeAreaView>
  );
};

export default PlaceHolder;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationButton: {
    height: 50,
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  autocompleteContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 0,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  listView: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 10,
    minHeight: 58,
  },
  separator: {
    height: 1,
    backgroundColor: "#DDD",
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  powered: {
    fontSize: 10,
  },
  buttonContainer: {
    marginVertical: 1,
    marginHorizontal: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    alignContent: "center",
    alignSelf: "center",
  },
});
