import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, ImageBackground, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Weather from "./Weather.js";
import { H2 } from "native-base";

const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const [name, setName] = useState(route.params.name);
  const moveAnim = useRef(new Animated.Value(0)).current; //current = 기본값 기본값을(0)으로 설정 state선언
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Move();
    FadeIn();
  });

  const Move = () => {
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 70,
        duration: 2000,
        useNativeDriver: true, //ui에서 먼저 실행해서 속도 빠름
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const FadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const Info = () => {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../src/back.jpg")}
      >
        <Animated.View
          style={[
            styles.welcome,
            {
              transform: [{ translateY: moveAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <H2>{name}님 안녕하세요</H2>
        </Animated.View>
        <Animated.View
          style={[
            styles.welcome,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Weather />
        </Animated.View>
      </ImageBackground>
    );
  };

  const Diary = () => {
    return (
      <ImageBackground
        style={styles.container}
        source={require("../src/back.jpg")}
      ></ImageBackground>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          //tabbaricon 을 사용해 상태에 따라 모양 변경 focused, color, size
          if (route.name === "Info") {
            return (
              <Ionicons // 뱃지생성 순서 1)
                name={
                  focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Diary") {
            return (
              <Ionicons
                name={focused ? "ios-book" : "ios-book"}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  welcome: {
    marginBottom: 230,
  },
  info: {
    width: 170,
    borderRadius: 10,
  },
});

export default Home;
