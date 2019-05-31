import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class AddProductScreen extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('products');
    this.state = {
      name: '',
      image: '',
      price: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveProduct() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      name: this.state.name,
      image: this.state.image,
      price: this.state.price,
    }).then((docRef) => {
      this.setState({
        name: '',
        image: '',
        price: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'name'}
              value={this.state.name}
              onChangeText={(text) => this.updateTextInput(text, 'name')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'image'}
              value={this.state.image}
              onChangeText={(text) => this.updateTextInput(text, 'image')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'price'}
              value={this.state.price}
              onChangeText={(text) => this.updateTextInput(text, 'price')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            name='Save'
            onPress={() => this.saveProduct()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddProductScreen;
