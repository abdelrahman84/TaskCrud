import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
 
  


  render() {
    return <RootStack />;
     
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