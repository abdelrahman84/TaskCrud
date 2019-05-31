import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ProductScreen from './components/ProductScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import AddProductScreen from './components/AddProductScreen';
import EditProductScreen from './components/EditProductScreen';

// import { Linking } from 'react-native'
import { WebBrowser } from 'expo'


const RootStack = createStackNavigator(
  {
    Product: ProductScreen,
    ProductDetails: ProductDetailScreen,
    AddProduct: AddProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    initialRouteName: 'Product',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
);


export default class App extends React.Component {

  async login() {
    // Linking.openURL('');
      const redirect = await Linking.getInitialURL('/');
      const result = await WebBrowser.openAuthSessionAsync(
        `https://api.instagram.com/oauth/authorize/?client_id=963a89c1b7384592abd2a17bfa19913b&redirect_uri=http://192.168.1.6:8082&response_type=token`
      )
      //Now if the user authorized the app result will store the code you can perform the handshake with to get an access token for that user. I have a simple check to see if the user already exists in my backend and then send info to the store with a helper function
      this._validateUser(result)
    
  }




  render() {
    return [

      <RootStack />,
      <Button
        onPress={this.login}
        title="Login with Instagram"
        color="#841584"
        accessibilityLabel="Learn more about this purple button" />

    ]
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
