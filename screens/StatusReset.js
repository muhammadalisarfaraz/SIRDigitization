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

import NetInfo from '@react-native-community/netinfo';
import {myGlobalVariable} from './globals';

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

const StatusReset = ({navigation}) => {
  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [filePath1, setFilePath1] = useState([]);
  const [images1, setImages1] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const {width} = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [SIRNo, setSIRNo] = useState('');
  const [vertrag, setVertrag] = useState('');
  const [AccidentLocationAddress, setAccidentLocationAddress] = useState('');
  const [PremiseConsumerNumber, setPremiseConsumerNumber] = useState('');
  const [PMT, setPMT] = useState('');
  const [ConsumerMobileNumber, setConsumerMobileNumber] = useState('');
  const [Remarks, setRemarks] = useState('');

  const [user, setUser] = useState('');
  const [ibc, setIbc] = useState('');
  const [VERTRAG, setVERTRAG] = useState('');
  const [BEGRU, setBEGRU] = useState('');
  const [SIRNR, setSIRNR] = useState('');

  const [latitude1, setlatitude] = useState('');
  const [longitude1, setlongitude] = useState('');
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const [accidentLocationAddressError, setAccidentLocationAddressError] =
    useState('');
  const [SIRNoError, setSIRNoError] = useState('');
  const [vertragError, setVertragError] = useState('');

  const [premiseConsumerNumberError, setPremiseConsumerNumberError] =
    useState('');
  const [pmtError, setPMTError] = useState('');
  const [consumerMobileNumberError, setConsumerMobileNumberError] =
    useState('');
  const [remarksError, setRemarksError] = useState('');

  const SPACING = 10;
  const THUMB_SIZE = 200;
  const flatListRef = useRef();
  const carouselRef = useRef();

  const validate = (text, textLength) => {
    if (text.length <= textLength) {
      return false;
    }
    return true;
  };

  const storeInDevice = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
    setAuthModalVisible(!isAuthModalVisible);

    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data1 = JSON.parse(items);
      data1.filter((item, index) => {
        if (item.Sirnr == SIRNR) {
          console.log('item.Sirnr: ', item.Sirnr);
          console.log('index: ', index);
          console.log('SIR: ', SIRNR);

          data1[index].Status = 'Save';

          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
        }
      });
    });
  };

  const StatusResetService = () => {
    console.log('**** Validation Service ******');
    console.log('VERTRAG: ' + user);
    console.log('BEGRU: ' + ibc);
    console.log('SIRNR: ' + SIRNR);

    axios({
      method: 'POST',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_RESET_SAP_STATUS_SRV/HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        HeaderToItem: [
          {
            BEGRU: ibc,
            Pernr: user,
            Sirnr: SIRNR,
          },
        ],
      }),
    })
      .then(res => {
        console.log(
          '******************Status Reset Service Called*********************************',
        );
        if (res.data.d.results != []) {
          res.data.d.HeaderToItem.results.forEach(singleResult => {
            console.log('singleResult.STATUS: ' + singleResult.STATUS);

            if (singleResult.STATUS != 'ERROR') {
              console.log('SIR is valid');
              storeInDevice();
            } else {
              alert('SIR not Found');
            }
          });
        }
      })
      .catch(error => {
        console.error(error);
        alert('StatusResetService:error ' + error);
      });
  };

  useEffect(() => {
    console.log('PostSIRImages:Screen');
    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data = items ? JSON.parse(items) : {};
      // var datatable = [];
      //data[0].name=[0];
      setUser(data[0].pernr);
      setIbc(data[0].begru);
    });
  }, []);

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
                    Enter SIR No.
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
                  SIR No.
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
                    setSIRNR(text);
                    if (validate(text, 40)) {
                      setSIRNoError(
                        'Input must be at least 40 characters long.',
                      );
                    } else setSIRNoError('');
                  }}
                />
                {SIRNoError !== '' && (
                  <Text style={styles.error}>{SIRNoError}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginLeft: 200,
                width: '100%',
              }}>
              <Carousel
                ref={carouselRef}
                layout="default"
                data={images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          onTouchThumbnail(index);
                          setindexer1(index);
                          setimageview(true);
                        }}
                        activeOpacity={0.9}>
                        <Image
                          source={{uri: item.uri}}
                          style={{height: 100, width: 100}}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setTimeout(() => {
                            // setRefresh(true);
                            setImagedeletionLoader(true);

                            //console.log("images", images);
                            var arr = images;
                            arr.splice(index, 1);
                            // console.log(index)
                            //console.log("index", index);
                            //console.log("arr)", arr);

                            setImages(arr);
                            setImagedeletionLoader(false);
                          }, 2000);
                        }}
                        style={{
                          width: 100,
                          height: 16,
                          // borderRadius: 13,
                          zIndex: 100,
                          backgroundColor: 'red',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                // sliderWidth={150}
                //itemWidth={120}
                onSnapToItem={index => onSelect(index)}
              />
            </View>
            <Modal visible={imageview} transparent={true} closeOnClick={true}>
              <ImageViewer
                renderHeader={() => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        // backgroundColor: 'green',
                        // alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          setimageview(false);
                        }}>
                        <View></View>
                        <View
                          style={{
                            backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            right: 5,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              fontWeight: 'bold',
                            }}>
                            X
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                imageUrls={images}
                index={indexer1}
              />
            </Modal>

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
                    disabled={!isEditable}
                    onPress={() => {
                      NetInfo.fetch().then(state => {
                        if (state.isConnected) {
                          console.log(' **** You are online! ******** ');
                          //PostSIRImage();
                          StatusResetService();
                          setIsEditable(false);
                        } else {
                          Alert.alert('You are offline!');
                          return;
                        }
                      });
                    }}
                  />

                  <Button
                    title=" No "
                    color="red"
                    onPress={() => {
                      setAuthModalVisible(!isAuthModalVisible);
                      setIsEditable(true);
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

export default StatusReset;

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
