import React, { Component } from "react";
import Axios from "axios";
import { View, StyleSheet, Image } from "react-native";
import { List, ListItem, Text, Left, Body, Thumbnail } from "native-base";

const key = "4db63680f8c4739690e7668f2d78f7cc";

const weatherCases = {
  Rain: "10n",
  Clear: "01n",
  Thunder: "11n",
  Clouds: "03n",
  Snow: "13n",
  Drizzle: "10n",
  Haze: "50n",
};
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      lat: "",
      lon: "",
      country: "",
      city: "",
      temp: "",
      feel_temp: "",
      weather: "",
      date: "",
      weekday: "",
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

    const week = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    );
    this.setState({
      weekday: week[today.getDay()],
      date: today.toLocaleDateString(),
    });
  };

  render() {
    return (
      <View style={styles.temp}>
        <List>
          <ListItem avatar>
            <Left>
              <Image
                source={require("../assets/date.png")}
                style={{ height: 35, width: 35 }}
              />
            </Left>
            <Body>
              <Text>{this.state.date}</Text>
              <Text note>{this.state.weekday}</Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${
                    weatherCases[this.state.weather]
                  }@4x.png`,
                }}
                style={{ height: 60, width: 35 }}
              />
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
              <Image
                source={require("../assets/earth.png")}
                style={{ height: 35, width: 35 }}
              />
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
