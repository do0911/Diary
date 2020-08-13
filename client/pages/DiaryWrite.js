import React, { useState } from "react";
import { ImageBackground, StyleSheet, Modal, Image } from "react-native";
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
import { post } from "axios";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const DiaryWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalvisible] = useState(false);
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    writeDiary();
    setModalvisible(!modalVisible);
    setTitle("");
    setContent("");
    setImage("");
  };

  const writeDiary = () => {
    let today = new Date();
    setDate(today.toLocaleDateString());
    let filename = image.split("/").pop();

    const url = "http://192.168.0.18:5000/api/diary";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", { uri: image, name: filename, image });
    formData.append("date", date);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/back.jpg")}
    >
      <Fab
        active={false}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "grey" }}
        position="bottomRight"
        onPress={() => setModalvisible(!modalVisible)}
      >
        <Icon name="pencil" style={{ fontSize: 30 }} />
      </Fab>
      <View style={styles.centerModal}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centerModal}>
            <View style={styles.modal}>
              <Form>
                <Item floatingLabel style={{ marginLeft: 0, marginBottom: 15 }}>
                  <Label>fill in title</Label>
                  <Input
                    name="title"
                    onChangeText={(title) => {
                      setTitle(title);
                      console.log(title);
                    }}
                    value={title}
                  />
                </Item>

                <Textarea
                  name="content"
                  rowSpan={5}
                  bordered
                  placeholder="fill in content"
                  onChangeText={(content) => {
                    setContent(content);
                    console.log(content);
                  }}
                  value={content}
                />
                <View style={styles.filebutton}>
                  <Button transparent light onPress={pickImage}>
                    <Text>upload photo</Text>
                  </Button>

                  {{ image } && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </View>
                <View style={styles.button}>
                  <Button
                    style={{ backgroundColor: "grey" }}
                    onPress={handleSubmit}
                  >
                    <Text>Submit</Text>
                  </Button>

                  <Button
                    style={{ backgroundColor: "grey", marginLeft: 20 }}
                    onPress={() => {
                      setModalvisible(!modalVisible);
                      setTitle("");
                      setContent("");
                      setImage("");
                    }}
                  >
                    <Text>Cancel</Text>
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
  filebutton: {
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});

export default DiaryWrite;
