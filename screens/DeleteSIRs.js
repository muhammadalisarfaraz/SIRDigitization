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

const DeleteSIRs = ({navigation}) => {
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

  const [postedSIRCount, setPostedSIRCount] = useState('');
  const [postedSIRtobeDeletedCount, setPostedSIRtobeDeletedCount] =
    useState('');
  const [storeInDeviceText, SetStoreInDeviceText] = useState('');
  const [postedSIRList, setPostedSIRList] = useState([]);
  const [tobeDeletedSIRList, setTobeDeletedSIRList] = useState([]);

  useEffect(() => {
    console.log('Screen:Delete SIR:');

    getLoginCredentials();
  }, []);

  const getLoginCredentials = () => {
    var data1 = [];
    let pernr;
    AsyncStorage.getItem('LoginCredentials')
      .then(items => {
        data1 = items ? JSON.parse(items) : [];
        pernr = data1[0].pernr;
      })
      .then(res => {
        getPostedSIRs(pernr);
      });
  };

  const getDeletedSIRfromSAP = () => {
    let count = 0;
    let returnedListData = [];

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_STATUS_RETURN_SRV/HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        HeaderToItem: postedSIRList,
      }),
    })
      .then(res => {
        console.log(
          '******************getDeletedSIRfromSAP UPDATED*********************************',
        );
        if (res.data.d.HeaderToItem != null) {
          res.data.d.HeaderToItem.results.forEach(singleResult => {
            returnedListData.push({
              Sirnr: singleResult.Sirnr,
            });
            count++;
          });
        }
        console.log(returnedListData);
        setPostedSIRtobeDeletedCount(count);
        setTobeDeletedSIRList(returnedListData);
      })
      .catch(error => {
        console.error('getDeletedSIRfromSAP:error: ' + error);
      });
  };

  const getPostedSIRs = pernr => {
    let count = 0;
    let localdata = [];
    AsyncStorage.getItem('SIRDigitization').then(items => {
      var SIRCompletedData = items ? JSON.parse(items) : {};
      SIRCompletedData = SIRCompletedData.filter(singleItem => {
        //if (singleItem.Status == 'Post') {
        localdata.push({
          Sirnr: singleItem.Sirnr,
          Pernr: pernr,
        });
        // }
      });

      var filterData = localdata.filter(item => {
        count++;
        console.log(item);
      });
      setPostedSIRCount(count);
      setPostedSIRList(localdata);
    });
  };

  const StoreInDevice = () => {
    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data = JSON.parse(items);

      let data1 = data.filter((item, index) => {
        return !tobeDeletedSIRList.some(subItem => {
          return subItem.Sirnr === item.Sirnr;
        });
      });
      console.log('after deleting ');
      console.log(data1.length);
      AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
      SetStoreInDeviceText('Removed from Mobile Successfully');
      deleteSIRImages();
      //StoreInImage();
    });
  };

  const deleteSIRImages = () => {
    tobeDeletedSIRList.filter(item => {
      console.log('item');
      console.log(item);
      removeItemFromAsyncStorage(item.Sirnr);
      removeItemFromAsyncStorage(item.Sirnr + 'IMAGE');
      removeItemFromAsyncStorage(item.Sirnr + 'IMAGECONSUMER');
    });
  };

  async function removeItemFromAsyncStorage(key) {
    console.log('key: ' + typeof key + ' : ' + key);

    try {
      await AsyncStorage.removeItem(key);
      console.log(
        `Item with key '${key}' successfully removed from AsyncStorage.`,
      );
    } catch (error) {
      console.log(
        `Error removing item with key '${key}' from AsyncStorage: `,
        error,
      );
    }
  }

  const StoreInImage = () => {
    AsyncStorage.getItem('SIRImageData').then(async items => {
      let data = JSON.parse(items);

      let data1 = data.filter((item, index) => {
        return !tobeDeletedSIRList.some(subItem => {
          return subItem.Sirnr === item.Sirnr;
        });
      });
      console.log('after deleting ');
      console.log(data1.length);
      AsyncStorage.setItem('SIRImageData', JSON.stringify(data1));
      SetStoreInDeviceText('Removed from Mobile Successfully');
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
                    Sync. SIR Cases
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
                  Total Cases SIR Count on Device: {postedSIRCount}
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
                  //backgroundColor: 'black',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //backgroundColor: '#1565C0',
                    //  padding: 15
                    flex: 1,
                  }}
                  onPress={() => {
                    getDeletedSIRfromSAP();
                  }}>
                  <LinearGradient
                    colors={['#1565C0', '#64b5f6']}
                    style={styles.submit}>
                    <Text
                      style={[
                        styles.textButton,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Fetch SIR Cases
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
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
                  Total Cases to be Removed Count: {postedSIRtobeDeletedCount}
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
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    //    backgroundColor: '#1565C0',
                    //  padding: 15
                  }}
                  onPress={() => {
                    StoreInDevice();
                  }}>
                  <LinearGradient
                    colors={['#1565C0', '#64b5f6']}
                    style={styles.submit}>
                    <Text
                      style={[
                        styles.textButton,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Remove SIR Cases
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
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
                  {storeInDeviceText}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteSIRs;

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
  textButton: {
    fontSize: 12,
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
