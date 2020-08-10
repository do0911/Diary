import React, { useEffect, useRef } from "react";
import { StyleSheet, ImageBackground, Animated, Text } from "react-native";
import Weather from "./Weather.js";
import { H2 } from "native-base";

const Info = ({ name }) => {
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
  return (
    <ImageBackground
      style={styles.weather}
      source={require("../assets/back.jpg")}
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

const styles = StyleSheet.create({
  weather: {
    alignItems: "center",
  },
  container: {},
  welcome: {
    marginBottom: 230,
  },
});

export default Info;
