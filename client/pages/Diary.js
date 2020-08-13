import React, { Component } from "react";
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
  Title,
} from "native-base";
import Icon from "react-native-vector-icons/EvilIcons";
import axios, { post } from "axios";

import DiaryList from "./DiaryList.js";
import DiaryWrite from "./DiaryWrite.js";

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      modalVisible: false,
      data: "",
      loaded: false,
      title: "",
      content: "",
    };
  }

  getDiary = async () => {
    await axios.get(`http://192.168.0.18:5000/api/diary`).then((data) => {
      this.setState({ data: data.data, loaded: true });
    });
  };

  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.getDiary();
  }

  render() {
    const { data } = this.state;
    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/back.jpg")}
      >
        <ScrollView>
          {this.state.data ? (
            data.map((data) => (
              <DiaryList
                key={data.num}
                title={data.title}
                content={data.content}
                image={data.photo}
                date={data.date}
              />
            ))
          ) : (
            <View></View>
          )}
        </ScrollView>
        <DiaryWrite />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Diary;
