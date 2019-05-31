import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class EditProductScreen extends Component {
  static navigationOptions = {
    title: 'Edit Product',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      name: '',
      image: '',
      price: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('products').doc(JSON.parse(navigation.getParam('productkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const product = doc.data();
        this.setState({
          key: doc.id,
          name: product.name,
          image: product.image,
          price: product.price,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateProduct() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('products').doc(this.state.key);
    updateRef.set({
      name: this.state.name,
      image: this.state.image,
      price: this.state.price,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        image: '',
        price: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Product');
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
            leftIcon={{name: 'update'}}
            name='Update'
            onPress={() => this.updateProduct()} />
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

export default EditProductScreen;
