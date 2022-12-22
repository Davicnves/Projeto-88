import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

export default class PostScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fontsLoaded: false,
        speakerColor: "gray",
        speakerIcon: "volume-high-outline",
        light_theme: true
      };
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
      }
    
      fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#15193c"
        },
        containerLight: {
          flex: 1,
          backgroundColor: "white"
        },
        droidSafeArea: {
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
        },
        appTitle: {
          flex: 0.07,
          flexDirection: "row"
        },
        appIcon: {
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center"
        },
        iconImage: {
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        },
        appTitleTextContainer: {
          flex: 0.7,
          justifyContent: "center"
        },
        appTitleText: {
          color: "white",
          fontSize: RFValue(28)
        },
        postCardLight: {
            margin: RFValue(20),
            backgroundColor:"#eaeaea",
            borderRadius: RFValue(20)
        },
        authorNameText: {
            color: "white",
            fontSize: RFValue(20)
        },
        authorNameTextLight: {
            color: "black",
            fontsize: RFValue(20)
        },
    })