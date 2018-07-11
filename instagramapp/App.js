import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/swiss.jpeg'),
        require('./assets/images/jungfrau.jpeg')
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };

  _handleFinishLoading = (error) => {
    console.log(error)
  };

  _handleLoadingError = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };

  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
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

export default App;
