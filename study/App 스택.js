import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ route, navigation }) {
  useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Button
        title="update title"
        onPress={() => navigation.setOptions({ title: "Update!" })} // 옵션 변경 ex) title
      />

      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
      <Button
        title="Swap title and friends"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Swap title and friends", {
            friends: "ys",
          });
        }}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate("Create")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

function DetailsScreen({ route, navigation }) {
  //매개변수를 받는 페이지는 route인자 추가
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            // 화면과 매개변수를 같이 전송
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ProfileScreen({ route, navigation }) {
  const { friends } = route.params;
  const [count, setCount] = useState(0);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() =>
          navigation.setParams({
            //현재 state 변경
            message: friends, //state 가리킬때 route.params.
          })
        }
        title="Swap title and friends"
      />
      <Text>
        {JSON.stringify(friends)}
        {route.params.message}의 페이지 입니다.{route.params.count}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: "GAGURI",
          headerStyle: {
            backgroundColor: "#f4511e", //stack navigator 에 옵션을주면 공유가능
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "GAGURI" }}
          initialParams={{ itemId: 42 }} // 초기 매개변수
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "PROJECT LIST" }}
        />
        <Stack.Screen
          name="Swap title and friends"
          component={ProfileScreen}
          options={{ title: "스왑" }}
        />
        <Stack.Screen
          name="Create"
          component={CreatePostScreen}
          options={{ title: "크리트" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
