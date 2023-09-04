import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import base64 from 'react-native-base64';
import DeviceInfo from 'react-native-device-info';

import {useTheme} from 'react-native-paper';

import {AuthContext} from '../components/context';

import Users from '../model/users';
import {myGlobalVariable} from './globals';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {colors} = useTheme();
  const [UniqueId, setUniqueId] = useState('');

  const {signIn} = React.useContext(AuthContext);

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
      // Android: "dd96dec43fb81c97"
      // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
      console.log('uniqueId', uniqueId.toUpperCase());
      setUniqueId(uniqueId.toUpperCase());
    });
  }, []);

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const getLoginCredentials = (userName, password, AppVer) => {
    console.log('userName' + userName);
    console.log('password' + password);
    console.log('IMEI: ' + UniqueId.toUpperCase());
    console.log('AppVer: ' + AppVer);
    console.log('myGlobalVariable[0]' + myGlobalVariable[0]);

    var LoginCredentialsData = [];
    axios({
      method: 'get',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DG_SRV/MIO_CREDENTIALSet(User=%27' +
        userName +
        '%27,Pwd=%27' +
        password +
        '%27,Imei=%27' +
        UniqueId.toUpperCase() +
        '%27,AppVer=%27' +
        AppVer +
        '%27)?$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
      },
    })
      .then(res => {
        if (res.data.d.Status == '') {
          LoginCredentialsData.push({
            AppVer: res.data.d.AppVer,
            Imei: res.data.d.Imei,
            Pwd: res.data.d.Pwd,
            User: res.data.d.User,
            Mesg: res.data.d.Mesg,
            Status: res.data.d.Status,
            begru: res.data.d.begru,
            pernr: res.data.d.pernr,
            IBC_Name: res.data.d.IBC_Name,
          });
        } else {
          Alert.alert('Wrong Input!', res.data.d.Mesg, [{text: 'Okay'}]);
          return;
        }
      })
      .then(res => {
        console.log(
          'final:LoginCredentials:: ' +
            typeof LoginCredentialsData +
            ' length: ' +
            LoginCredentialsData.length,
        );
        AsyncStorage.setItem(
          'LoginCredentials',
          JSON.stringify(LoginCredentialsData),
        );
        signIn(LoginCredentialsData);
      })
      .catch(error => {
        console.error('getLoginCredentials:axios:error: ' + error);
      });
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }

    console.log('Login----');

    AsyncStorage.getItem('User').then(items => {
      var data1 = [];

      data1 = items ? JSON.parse(items) : [];

      console.log('****data1', data1);

      data1 = [
        ...data1,
        {
          mtnnr: 'CTO-123',
          created: '23-Oct-2019',
          consumerno: 'DTS-12345',
          type: '21-Oct-2020',
          address: '23.24,13.56',
          due: '28-Oct-2020',
          Status: 'Pending',
        },
      ];

      AsyncStorage.setItem('User', JSON.stringify(data1));
    });
    console.log(' *** foundUser *** ', foundUser);
    signIn(foundUser);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>SIR Digitization</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: 'white', //colors.background
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          User name
        </Text>
        <View style={styles.action}>
          <Image
            style={{width: 26, height: 26}}
            source={require('../assets/user.png')}
          />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            value={data.username}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../assets/key.png')}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              getLoginCredentials(
                data.username,
                data.password,
                //'1.0',
                '2.0',
              );
            }}

            /*  onPress={() => {
                    navigation.reset({
                          index: 0,
                       // routes: [{name: 'HomeScreen'}],
                          routes: [{name: 'SIR Digitization'}],
                        }); */
            //   navigation.navigate('SIR Digitization');
            //}}
          >
            <LinearGradient
              colors={['#1565C0', '#64b5f6']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Login
              </Text>
            </LinearGradient>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'black',
                },
              ]}>
              {UniqueId}
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
