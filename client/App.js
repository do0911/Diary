import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, ImageBackground, Animated, Image } from "react-native";
import { Item, Input, Label, View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Permissions from "expo-permissions";
import Home from "./pages/Home.js";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const requestPermisison = async () => {
    const response = await Permissions.askAsync(Permissions.CAMERA);
    console.log(response);
  };

  useEffect(() => {
    requestPermisison();
  }, []);

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
      source={require("./assets/back.jpg")}
    >
      <Image style={styles.logo} source={require("./assets/logo.png")} />
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        <View style={styles.info}>
          <Item floatingLabel>
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
        </View>
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
    alignItems: "center",
    width: 170,
    marginBottom: 100,
  },
  logo: {
    marginTop: 80,
  },
});

export default App;
