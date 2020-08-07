import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, ImageBackground, Animated } from "react-native";
import { Item, Input, Label } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home.js";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("./src/back.jpg")}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        <Item floatingLabel style={styles.info}>
          <Label style={{ color: "grey" }}>이름을 입력해주세요</Label>
          <Input value={name} onChangeText={setName} />
        </Item>
        <Icon
          name="check"
          style={{ fontSize: 30, marginTop: 20 }}
          onPress={() => {
            navigation.navigate("Home", { name: name });
          }}
        />
      </Animated.View>
    </ImageBackground>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    width: 170,
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
  },
});

export default App;
