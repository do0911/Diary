import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Info from "./Info.js";
import Diary from "./Diary";
const Tab = createBottomTabNavigator();

const Home = ({ route }) => {
  const [name, setName] = useState(route.params.name);

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
      <Tab.Screen name="Info" component={() => <Info name={name} />} />
      <Tab.Screen name="Diary" component={Diary} />
    </Tab.Navigator>
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

export default Home;
