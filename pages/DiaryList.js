import React, { Component } from "react";
import Axios from "axios";
import { View, StyleSheet, Image } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from "native-base";

class DiaryList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <CardItem>
            <Left>
              <Thumbnail source={require("../assets/back.jpg")} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/back.jpg")}
                style={{ height: 200, width: 350, marginBottom: 20 }}
              />
              <Text>//Your text here</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        <Card style={styles.card}>
          <CardItem>
            <Left>
              <Thumbnail source={require("../assets/back.jpg")} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/back.jpg")}
                style={{ height: 200, width: 350, marginBottom: 20 }}
              />
              <Text>//Your text here</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  card: { width: 370, marginTop: 50, borderRadius: 30 },
});

export default DiaryList;
