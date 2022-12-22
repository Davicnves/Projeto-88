import { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    FlatList 
  } from "react-native";
import PostCards from "./PostCards";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PostCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme:true,
      post_id: this.props.post.key,
      post_data: this.props.post.value
    }
  }
render() {
    return (
     <View style={Styles.container}>
        <View style={styles.cardContainer}>
            <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                    <Image
                      source={require("../assets/profile_img.png")}
                      style={styles.profileImage}
                    ></Image>
                </View>
                <View style={styles.authorNameContainer}>
                    <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                </View>
            </View>
            <Image source={require("../assets/post.jpeg")} style={styles.postImage} />
            <View style={styles.captionContainer}>
                <Text style={styles.captoionText}>
                    {rhis.props.post.caption}
                </Text>
            </View>
            <View style={styles.actionContainer}>
                <View style={style.likeVutton}>
                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                    <Text style={styles.likeText}>12k</Text>
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={posts}
                      renderItem={this.renderItem}
                      />
                </View>
            </View>
        </View>
     </View>
        
            
    ); }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        cardContainer: {
          margin: RFValue(13),
          backgroundColor: "#2f345d",
          borderRadius: RFValue(20)
        },
        storyImage: {
          resizeMode: "contain",
          width: "95%",
          alignSelf: "center",
          height: RFValue(250)
        },
        titleContainer: {
          paddingLeft: RFValue(20),
          justifyContent: "center"
        },
        storyTitleText: {
          fontSize: RFValue(25),
          fontFamily: "Bubblegum-Sans",
          color: "white"
        },
        storyAuthorText: {
          fontSize: RFValue(18),
          fontFamily: "Bubblegum-Sans",
          color: "white"
        },
        descriptionText: {
          fontFamily: "Bubblegum-Sans",
          fontSize: 13,
          color: "white",
          paddingTop: RFValue(10)
        },
        actionContainer: {
          justifyContent: "center",
          alignItems: "center",
          padding: RFValue(10)
        },
        likeButton: {
          width: RFValue(160),
          height: RFValue(40),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#eb3948",
          borderRadius: RFValue(30)
        },
        likeText: {
          color: "white",
          fontFamily: "Bubblegum-Sans",
          fontSize: RFValue(25),
          marginLeft: RFValue(5)
        }
      });