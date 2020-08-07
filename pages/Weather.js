import React, { Component } from "react";
import Axios from "axios";
import { View, StyleSheet } from "react-native";
import { List, ListItem, Text, Left, Body, Thumbnail } from "native-base";

const key = "4db63680f8c4739690e7668f2d78f7cc";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      lat: null,
      lon: null,
      country: null,
      city: null,
      temp: null,
      feel_temp: null,
      weather: null,
      date: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: true,
        });
      }
    );
    this._getDate();
  }

  _getWeather = (lat, lon) => {
    Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    ).then((data) => {
      this.setState({
        data: data.data,
        country: data.data.sys.country,
        city: data.data.name,
        temp: data.data.main.temp,
        feel_temp: data.data.main.feels_like,
        weather: data.data.weather[0].main,
      });
    });
  };

  _getDate = () => {
    let today = new Date();

    this.setState({
      date: today.toLocaleDateString(),
    });
  };

  render() {
    return (
      <View style={styles.temp}>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../src/back.jpg")} />
            </Left>
            <Body>
              <Text>{this.state.date}</Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../src/back.jpg")} />
            </Left>
            <Body>
              <Text>{Math.floor(this.state.temp - 273.15) + "º"}</Text>
              <Text note>
                {Math.floor(this.state.feel_temp - 273.15) + "º"}
              </Text>
            </Body>
          </ListItem>

          <ListItem avatar>
            <Left>
              <Thumbnail source={require("../src/back.jpg")} />
            </Left>
            <Body>
              <Text>{this.state.country}</Text>
              <Text note>{this.state.city}</Text>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  temp: { width: 200, textAlign: "center" },
});

export default Weather;
