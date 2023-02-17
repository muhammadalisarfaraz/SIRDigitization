import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
} from 'react-native';
//import {Icon} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  const width = new Animated.Value(360);
  const height = new Animated.Value(600);
  const [animating, setAnimating] = useState(true);

  const getAsyncData = async () => {
    try {
      const uservalue = await AsyncStorage.getItem('User');
      let data = uservalue != null ? JSON.parse(uservalue) : null;
      if (data) {
        navigation.replace('Menu');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    Animated.timing(width, {
      toValue: 360,
      duration: 450,
    }).start();
    Animated.timing(height, {
      toValue: 750,
      duration: 10000,
    }).start();

    setTimeout(() => {
      setAnimating(false);
      getAsyncData();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logonew.png')}
        resizeMode="center"
      />
    </View>
  );
  ali;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
