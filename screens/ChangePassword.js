import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  //AsyncStorage,
  Switch,
  Image,
  ImageBackground,
  Picker,
  ScrollView,
  //CheckBox,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
  Pressable,
  Dimensions,
} from 'react-native';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';

import RNFetchBlob from 'rn-fetch-blob';

import axios from 'axios';
import {
  launchCamera,
  launchImageLibrary,
  //ImagePicker,
  Select,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-crop-picker';

import ImageViewer from 'react-native-image-zoom-viewer';

import base64 from 'react-native-base64';

const ChangePassword = ({navigation}) => {
  const {width} = Dimensions.get('window');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [uploadingMsg, setUploadingMsg] = useState('');

  const [user, setUser] = useState('');
  const [ibc, setIbc] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    console.log('SafetyHazardCase:Screen');
    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data = items ? JSON.parse(items) : {};
      // var datatable = [];
      //data[0].name=[0];
      setUser(data[0].pernr);
      setIbc(data[0].begru);
    });
  }, []);

  const getPasswordService = () => {
    var PasswordData = [];
    console.log(user);
    console.log(ibc);
    console.log(oldPassword);
    console.log(newPassword);

    axios({
      method: 'POST',
      url: 'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_MIO_PASSWORD_UPDATE1_SRV/HEADERSet',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('RFCGWSIR:Z@p123456789'),
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        HeaderToItem: [
          {
            PERNR: user,
            IBC: ibc,
            OLD_PASSWORD: oldPassword,
            NEW_PASSWORD: newPassword,
          },
        ],
      }),
    })
      .then(res => {
        if (res.data.d.RESULT != 'Saved') {
          console.log('get Password Service: ' + res.data.d.RESULT);
          alert(res.data.d.RESULT);
        } else if (res.data.d.RESULT == 'Saved') {
          alert('Password Successfully Changed');
          console.log('get Password Service: ' + res.data.d.RESULT);
          setAuthModalVisible(!isAuthModalVisible);
        }
      })
      .catch(error => {
        console.error('axios:get Password Service:error: ' + error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.slide1}>
          <View style={{width: '80%'}}>
            <View
              style={{
                // marginTop: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 2,
                  width: '100%',
                  // position: 'absolute',
                  // backgroundColor: ' rgba(93,45,145,255)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
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
                    {' '}
                    Password Change Screen
                  </Text>
                </LinearGradient>
              </View>

              <View
                style={{
                  height: 50,
                  width: '100%',
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>

              <View
                style={{
                  height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 50,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  Old Password
                </Text>
              </View>
              <View
                style={{
                  //height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 10,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextInput
                  // selectedValue={selectedFeeder}
                  // keyboardType={'numeric'}
                  // KEaccountnumber={KEaccountnumber}
                  // maxLength={12}               //  onBlur={text =>{text.}}
                  style={{
                    //height: 50,
                    width: '86%',
                    fontSize: 16,
                    color: 'black',
                    borderBottomWidth: 0.8,
                    //marginTop: -10,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{fontSize: 16, color: 'grey'}}
                  onChangeText={text => {
                    setOldPassword(text);
                  }}
                />
              </View>

              <View
                style={{
                  //height: 22,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 10,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  New Password
                </Text>
              </View>

              <View
                style={{
                  //height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 10,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextInput
                  // selectedValue={selectedFeeder}
                  //value={PMT}
                  //  keyboardType={'numeric'}
                  //  maxLength={8}
                  //contractnumber={contractnumber}

                  // onChangeText={text => setcontractnumber(text)}
                  // onFocus={text => setcontractnumber(ShowMaxAlert(text))}
                  style={{
                    //height: 50,
                    width: '86%',
                    fontSize: 16,
                    color: 'black',
                    marginTop: -10,
                    // marginBottom: 50,
                    borderBottomWidth: 0.8,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{fontSize: 16, color: 'grey'}}
                  onChangeText={text => {
                    setNewPassword(text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
                // marginLeft: 8,

                // marginBottom: 20,
                //    width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  //    backgroundColor: '#1565C0',
                  //   padding: 15
                }}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SupportScreen'}],
                  });
                }}>
                <LinearGradient
                  colors={['#1565C0', '#64b5f6']}
                  style={styles.submit}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Cancel
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  //    backgroundColor: '#1565C0',
                  //  padding: 15
                }}
                onPress={() => {
                  // setUploadingMsg(res.d.Return);

                  setAuthModalVisible(!isAuthModalVisible);
                }}>
                <LinearGradient
                  colors={['#1565C0', '#64b5f6']}
                  style={styles.submit}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Modal
              style={{alignItems: 'center', justifyContent: 'center'}}
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
                <Text style={{color: 'red', fontSize: 24, fontWeight: 'bold'}}>
                  Error
                </Text>

                <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
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
            <Modal
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={isSuccessModalVisible}>
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
                <Text
                  style={{
                    color: 'rgba(93,45,145,255)',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  Success
                </Text>

                <Text
                  style={{color: 'green', fontSize: 16, textAlign: 'center'}}>
                  {uploadingMsg == '' ? 'Saved Successfully' : uploadingMsg}
                </Text>

                <Button
                  title="Close"
                  color="green"
                  onPress={() => {
                    setSuccessModalVisible(!isSuccessModalVisible);
                    setError('');
                    // setTimeout(() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'SupportScreen'}],
                    });
                  }}
                />
              </View>
            </Modal>
            <Modal
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={isAuthModalVisible}>
              <View
                style={{
                  width: '80%',
                  height: 200,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}>
                <Text
                  style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
                  Are you sure?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    title=" Yes "
                    color="green"
                    onPress={() => {
                      getPasswordService();
                    }}
                  />

                  <Button
                    title=" No "
                    color="red"
                    onPress={() => {
                      setAuthModalVisible(!isAuthModalVisible);
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    //  justifyContent: 'center'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
  },

  signIn: {
    width: '100%',
    marginTop: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  submit: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },

  PhotosIn: {
    width: '100%',
    marginTop: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textPhotos: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
