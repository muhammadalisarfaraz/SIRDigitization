/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
 import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
//import Config from 'react-native-config';
import Moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { and } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const base64 = require('base-64');

// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function Login({ navigation }) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const [UniqueId, setUniqueId] = useState('');
  const { colors } = useTheme();

  const item = {};
  const LoginRequest = (
    back,
    backPinGeneration,
    name,
    userPassword,
    loader,
  ) => {


    // alert("name", name); alert("userPassword", userPassword);
    if (name == '') {
      // loader();
      setError('Enter User Name');
      setModalVisible(true);
      loader();

      return;
    }
    if (userPassword == '') {
      // loader();
      setError('Enter Password');
      setModalVisible(true);
      loader();
      return;
    }
    /*
     if (name != null  &&  userPassword!= null) {
      // loader();
       
        setError('');
         setModalVisible(false);
         navigation.reset({
          index: 0,
          routes: [{name: 'Menu'}],
        });
     }
      */

    //var apiURLN=Config.API_LoginURL;
    // console.log("apiURLN", apiURLN);
    
    // AsyncStorage.setItem('User', JSON.stringify(name));
  };
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }
  useEffect(() => {
    /* AsyncStorage.getItem('User').then(items => {

      // var datatable = [];
      console.log(items);
    if (items) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Menu' }],
        });
      }
    });
*/
    /*
    NetInfo.fetch().then(networkState => {
      console.log("Connection type - ", networkState.type);
      console.log("Is connected? - ", networkState.isConnected);
    });
    */



    let VuniqueId = DeviceInfo.getUniqueId();
    // console.log("uniqueId", VuniqueId);

    setUniqueId(VuniqueId);
    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.container}>

<StatusBar backgroundColor='black' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>SIR Digitization!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: "white"//colors.background
        }]}
      >
          
          <View style={{ marginTop: 65 }}>
        </View>
      <View style={styles.inputView}>
        <Image
          style={{ width: 26, height: 26 }}
          source={require('../assets/user.png')}
        />
     
        <TextInput
          style={styles.inputText}
          placeholder="User Name"
          placeholderTextColor="#1565C0"
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Image
          style={{ width: 24, height: 24 }}
          source={require('../assets/key.png')}
        />
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#1565C0"
          onChangeText={text => setUserPassword(text)}
        />
      </View>
      <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              console.log('Login Pressed');
              setLoader(true);
    
    
              LoginRequest(
                () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Menu' }],
                  });
                },
                () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'PinGeneration' }],
                  });
                },
                name,
                userPassword,
                () => {
                  return setLoader(false);
    
                },
              );
            }}>
  
  
  
  
            <LinearGradient
              colors={['#1565C0', '#64b5f6']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
 
        </View>
        <Animatable.View animation="fadeInLeft" duration={100}>
      
      <Modal
        style={{ alignItems: 'center', justifyContent: 'center' }}
        isVisible={isModalVisible}>
        <View
          style={{
            width: '80%',
            height: 250,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>

            
          <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>
            Error
          </Text>

          <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>
            {error ? error : ''}
          </Text>

          <Button
            title="Close"
            color="red"
            onPress={() => {
              setModalVisible(!isModalVisible);
              setError('');
            }}
          />
        </View>
      </Modal>
      </Animatable.View>
      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
 
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: '#0A8FCF',
    marginBottom: 40,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    marginLeft:'5%',
   
// /    justifyContent: 'center',
    padding: 20,
   },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black', 
    // color: 'black',
  },
  forgot: {
    color: '#0A8FCF',
    fontSize: 11,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(93,45,145,255)',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },




  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
   // justifyContent: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Login;
