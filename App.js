import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ProductScreen from './components/ProductScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import AddProductScreen from './components/AddProductScreen';
import EditProductScreen from './components/EditProductScreen';


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
 
  login(){
    Linking.openURL('https://api.instagram.com/oauth/authorize/?client_id=963a89c1b7384592abd2a17bfa19913b&redirect_uri=Product&response_type=token');
  }


  render() {
    return [
      
  <RootStack />,
  <Button
  onPress={this.login}
  title="Login with Instagram"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"/>

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
