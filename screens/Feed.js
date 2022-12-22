import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, Platform, SafeAreaView, Text, View } from 'react-native';
import firebase from "firebase";
import { RFValue } from 'react-native-responsive-fontsize';
import {PostCard} from '../screens/PostCards'
 
export default class Feed extends Component {
    render() {
        renderItem = ({ item: post}) => {
            return <PostCard post={post} navigation={this.props.navigation} />;
        };
        return (
            <View style={StyleSheet.container}>
              <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                  <View style={styles.appIcon}>
                    <Image
                      source={require("../assets/logo.png")}
                      style={styles.iconImage}>
                      </Image>
                   </View>
                   <View style={styles.appTitleTextContainer}>
                     <Text style={styles.appTitleText}>Espectagrama</Text>
                   </View>
                  <View style={styles.cardContainer}>
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={posts}
                      renderItem={this.renderItem}
                      />
                  </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    droidSafeArea: {
        marginTop:Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignItens: "center"
    },
    iconImage:{
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize : RFValue(28),
    },
    cardContainer: {
        flex: 0.85
    }
})