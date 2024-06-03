import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Text } from "@rneui/base";
import { getImage } from "../../helpers/getImage";

const Account = () => {
  const userInfo = [
    { title: "Email", subtitle: "rajithat1998@gmail.com" },
    { title: "Phone", subtitle: "+94714704820" },
    { title: "Country", subtitle: "Sri Lanka" },
    { title: "City", subtitle: "Gampaha" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar size="xlarge" rounded source={getImage("defaultProfile")} />
        <Text h4 style={styles.name}>
          Rajitha Thilankadddd
        </Text>
      </View>
      <View style={styles.details}>
        {userInfo.map((item, index) => (
          <ListItem key={index}>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    marginTop: 10,
  },
  details: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
