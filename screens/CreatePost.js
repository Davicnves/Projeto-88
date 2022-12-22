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
  TextInput,
  Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
 
export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          previewImage: "image_1.jpg",
          light_theme: true,
          dropdownHeight: 40
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
      
      async addPost() {
        if (
          this.state.caption
        ) {
          let postData = {
            preview_image: this.state.previewImage,
            caption: this.state.caption,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            profile_image:this.state.profile_image,
            likes: 0
          };
          await firebase
            .database()
            .ref(
              "/posts/" +
                Math.random()
                  .toString(36)
                  .slice(2)
            )
            .set(postData)
            .then(function(snapshot) {});
          this.props.setUpdateToTrue();
          this.props.navigation.navigate("Feed");
        } else {
          Alert.alert(
            "Erro",
            "Todos os campos são obrigatórios!",
            [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
            { cancelable: false }
          );
        }
      }

      fetchPosts = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };
    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          } else {let preview_images = {
            image_1: require("../assets/image_1.jpg"),
            image_2: require("../assets/image_2.jpg"),
            image_3: require("../assets/image_3.jpg"),
            image_4: require("../assets/image_4.jpg"),
            image_5: require("../assets/image_5.jpg")
          };
        return (
            <View>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                   <View style={styles.appIcon}>
                     <Image 
                     source={require("../assets/logo.png")}
                     style={styles.iconImage}
                     ></Image>
                    </View>
                    <View style={styles.appTitileTextContainer}>
                      <Text style={styles.appTitleText}> Novo Post</Text>    
                    </View> 
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image
                        source={preview_images[this.state.previewImage]}
                        style = {styles.previewImage}>
                        </Image>
                       <View style={{height:
                       RFValue(this.state.dropdownHeight)}}>
                        <DropDownPicker
                          items={[
                            {label:"image_1", value:"image_1"},
                            {label:"image_2", value:"image_2"},
                            {label:"image_3", value:"image_3"},
                            {label:"image_4", value:"image_4"},
                            {label:"image_5", value:"image_5"},
                            {label:"image_6", value:"image_6"},
                            {label:"image_7", value:"image_7"}
                          ]}

                          defaultValue={this.state.previewImage}
                          containerStyle={{
                            height: 40,
                            borderRadius: 20,
                            marginBottom:10
                          }}
                          onPress={()=>{
                            this.setState({ dropdownHeight: 170});
                          }}
                          onClose={()=>{
                            this.setState({ dropdownHeight: 40});
                          }}
                          style={{ backgroundColor: "transparent"}}
                          itemStyle={{
                            justifyContent: "flex-start"
                          }}
                          dropDownStyle={{backgroundColor:"#2a2a2a"}}
                          labelStyle={{
                            color: "white"
                          }}
                          onChangeItem={item =>
                          this.setState({
                            previewImage: item.value
                          })

                        }
                        />
                       </View>

                       <TextInput
                       style={styles.inputFont}
                       onChangeText={caption => this.setState({caption})}
                       placeholder={"Legenda"}
                       numberOfLines={2}
                       placeholderTextColor="white"
                       />

                    </ScrollView>
                </View>
                <View style={{flex:0.08}}/>
            </View>
        )
             
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
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
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
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
  }
});
