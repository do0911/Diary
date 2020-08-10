import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Modal } from "react-native";
import {
  Fab,
  Text,
  Button,
  View,
  Form,
  Textarea,
  Item,
  Label,
  Input,
} from "native-base";
import Icon from "react-native-vector-icons/EvilIcons";

import DiaryList from "./DiaryList.js";

const Diary = () => {
  const [active, setActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/back.jpg")}
    >
      <ScrollView>
        <DiaryList />
      </ScrollView>
      <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "grey" }}
        position="bottomRight"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Icon name="pencil" style={{ fontSize: 30 }} />
      </Fab>
      <View style={styles.centerModal}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centerModal}>
            <View style={styles.modal}>
              <Form>
                <Item floatingLabel style={{ marginLeft: 0, marginBottom: 15 }}>
                  <Label>Fill out title</Label>
                  <Input />
                </Item>

                <Textarea rowSpan={5} bordered placeholder="Fill out content" />

                <View style={styles.button}>
                  <Button
                    style={{ backgroundColor: "grey" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Button>

                  <Button
                    style={{ backgroundColor: "grey", marginLeft: 20 }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  welcome: {
    marginBottom: 230,
  },
  modal: {
    backgroundColor: "white",
    width: 400,
    padding: 20,
    borderRadius: 20,
  },
  centerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },
  button: {
    marginTop: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});

export default Diary;
