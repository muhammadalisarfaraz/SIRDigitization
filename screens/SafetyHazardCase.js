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

const SafetyHazardCase = ({navigation}) => {
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
  const [AccidentLocationAddress, setAccidentLocationAddress] = useState('');
  const [PremiseConsumerNumber, setPremiseConsumerNumber] = useState('');
  const [PMT, setPMT] = useState('');
  const [ConsumerMobileNumber, setConsumerMobileNumber] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [user, setUser] = useState('');
  const [ibc, setIbc] = useState('');
  const [latitude1, setlatitude] = useState('');
  const [longitude1, setlongitude] = useState('');
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [accidentLocationAddressError, setAccidentLocationAddressError] =
    useState('');
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

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      //animated: true
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const captureImage = async type => {
    console.log('test');
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    var filterkeyN;
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    console.log('isCameraPermitted', isCameraPermitted);
    console.log('isStoragePermitted', isStoragePermitted);
    // && isStoragePermitted
    if (isCameraPermitted) {
      ImagePicker.openCamera({
        width: 700,
        height: 700,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 1,
      }).then(response => {
        //launchCamera(options, (response) => {
        // console.log('response.assets[0] = ', response.assets[0].fileName);

        if (response.didCancel) {
          //  alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          //  alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        var Allimages = images;
        setIsImage('Y');
        setFilePath([
          {
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
            base64: response.data,
          },
          ...Allimages,
        ]);
        setImages([
          {
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
            base64: response.data,
          },
          ...Allimages,
        ]);
      });
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const getUserCurrentLocation = async () => {
    let latitude, longitude;

    Geolocation.getCurrentPosition(
      info => {
        const {coords} = info;

        latitude = coords.latitude;
        longitude = coords.longitude;

        setlatitude(latitude);
        setlongitude(longitude);

        console.log('latitude' + latitude);
        console.log('longitude' + longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
    //}
  };

  const validate = (text, textLength) => {
    if (text.length <= textLength) {
      return false;
    }
    return true;
  };

  const chooseFile = type => {
    ImagePicker.openPicker({
      width: 300,
      height: 550,
      cropping: true,
      includeBase64: true,
    }).then(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        // alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert('chooseFile: ' + response.errorMessage);
        return;
      }

      setIsImage('Y');

      var Allimages = images;
      // setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);

      //setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);

      setFilePath([
        {
          uri: response.path,
          url: response.path,
          fileName: 'BFDC.jpg',
          base64: response.data,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);
      setImages([
        {
          uri: response.path,
          url: response.path,
          fileName: 'BFDC.jpg',
          base64: response.data,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);
    });
  };

  const PostSIRImage = HAZARD_ID => {
    let data1 = [];
    let count = 1;
    console.log('Post Safety Image called');

    images.filter(item => {
      //console.log('item:= ' + item);
      data1.push({
        imageName: 'SafetyHazrd',
        imageBase64: item.base64,
        imageID: '1',
        IBC: ibc,
        SHID: user,
        MIONo: HAZARD_ID,
      });
      count++;
    });

    axios({
      method: 'POST',
      url: 'https://sir.ke.com.pk:8039/api/Image/PostSIHImageData',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify(data1),
    })
      .then(res => {
        console.log(
          '******************Post Safety Image updated*********************************',
        );
        console.log(res.data);
        storeInDevice();
      })
      .catch(error => {
        console.error(error);
        alert('Post Safety Image Data: ' + error);
      });
  };

  const storeInDevice = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
    setAuthModalVisible(!isAuthModalVisible);

    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data = items ? JSON.parse(items) : {};

      AsyncStorage.getItem('SafetyHazard').then(items => {
        var data1 = [];

        data1 = items ? JSON.parse(items) : [];

        data1 = [
          ...data1,
          {
            UserID: user, //data[0].name
            SDate: Moment(Date.now()).format('YYYY-MM-DD'),
            AccidentLocationAddress: AccidentLocationAddress,
            PremiseConsumerNumber: PremiseConsumerNumber,
            PMT: PMT,
            ConsumerMobileNumber: ConsumerMobileNumber,
            Remarks: Remarks,
            longitude1: longitude1,
            latitude1: latitude1,
            Status: 'Pending',
            IBC: ibc,
            SafetyHazardWebID: '',
            ImageFlag: isImage,
            HazardImages: images,
          },
        ];

        AsyncStorage.setItem('SafetyHazard', JSON.stringify(data1)).then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'SupportScreen'}],
          });
          //                          console.log("DAta1", data1);
          //setRefresh(true);

          // swiper.current.scrollBy(1, true);
          /*
                setTimeout(() => {
                  setRefresh(false);
                }, 1000);
*/
        });
      });
    });
  };

  const postSafetyHazard = () => {
    setLoader(true);

    console.log('Remarks ' + Remarks);
    console.log('PMT ' + PMT);
    console.log('ConsumerMobileNumber ' + ConsumerMobileNumber);
    console.log('AccidentLocationAddress ' + AccidentLocationAddress);
    console.log('user ' + user);
    console.log('PremiseConsumerNumber ' + PremiseConsumerNumber);
    console.log('latitude1 ' + latitude1);
    console.log('longitude1 ' + longitude1);
    console.log('ibc' + ibc);

    axios({
      method: 'GET',
      url:
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_SAFETY_HAZARDS_POSTING1_SRV/WASet(Remarks=%27' +
        Remarks +
        '%27,Pmt=%27' +
        PMT +
        '%27,Mobileno=%27' +
        ConsumerMobileNumber +
        '%27,Ibc=%27' +
        ibc +
        '%27,CreatedBy=%27' +
        user +
        '%27,Consumernumber=%27' +
        PremiseConsumerNumber +
        '%27,Latitude=%27' +
        latitude1.toString() +
        '%27,Longitude=%27' +
        longitude1.toString() +
        '%27,ACCIDENT_NEAR_ADDR=%27' +
        AccidentLocationAddress +
        '%27)',
      headers: {
        Authorization: 'Basic ' + base64.encode('RFCGWSIR:Z@p123456789'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
    })
      .then(resp => {
        console.log('res.data: ', resp.data.d.Message);
        PostSIRImage(resp.data.d.HAZARD_ID);
      })
      .catch(error => {
        console.error(error);
        alert('post Safety Hazard Data: ' + error);
      });
    /*
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
*/
  };

  useEffect(() => {
    console.log('SafetyHazardCase:Screen');
    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data = items ? JSON.parse(items) : {};
      // var datatable = [];
      //data[0].name=[0];
      setUser(data[0].pernr);
      setIbc(data[0].begru);
    });

    getUserCurrentLocation();
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
                    Safety Hazard Case
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
                  Accident Nearest Location Address
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
                    setAccidentLocationAddress(text);
                    if (validate(text, 40)) {
                      setAccidentLocationAddressError(
                        'Input must be at least 40 characters long.',
                      );
                    } else setAccidentLocationAddressError('');
                  }}
                />
                {accidentLocationAddressError !== '' && (
                  <Text style={styles.error}>
                    {accidentLocationAddressError}
                  </Text>
                )}
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
                  Premise Consumer Number
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
                    setPremiseConsumerNumber(text);
                    if (validate(text, 12)) {
                      setPremiseConsumerNumberError(
                        'Input must be at least 12 characters long.',
                      );
                    } else setPremiseConsumerNumberError('');
                  }}
                />
                {premiseConsumerNumberError !== '' && (
                  <Text style={styles.error}>{premiseConsumerNumberError}</Text>
                )}
              </View>

              <View
                style={{
                  // height: 22,
                  width: '100%',
                  marginLeft: 40,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  PMT
                </Text>
              </View>

              <View
                style={{
                  //height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 8,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextInput
                  //  maxLength={10}
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
                  placeholderText={{fontSize: 30, color: 'grey'}}
                  onChangeText={text => {
                    setPMT(text);
                    if (validate(text, 30)) {
                      setPMTError('Input must be at least 30 characters long.');
                    } else setPMTError('');
                  }}
                />
                {pmtError !== '' && (
                  <Text style={styles.error}>{pmtError}</Text>
                )}
              </View>

              <View
                style={{
                  height: 22,
                  width: '100%',
                  marginLeft: 40,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  Consumer Mobile Number
                </Text>
              </View>

              <View
                style={{
                  height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 10,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 50,
                    width: '86%',
                    fontSize: 16,
                    color: 'black',
                    marginTop: -10,
                    // marginBottom: 50,
                    borderBottomWidth: 0.8,
                  }}
                  maxLength={11}
                  keyboardType={'numeric'}
                  placeholder={'Enter Text'}
                  placeholderText={{fontSize: 16, color: 'grey'}}
                  onChangeText={text => {
                    setConsumerMobileNumber(text);
                    if (validate(text, 15)) {
                      setConsumerMobileNumberError(
                        'Input must be at least 15 characters long.',
                      );
                    } else setConsumerMobileNumberError('');
                  }}
                />
                {consumerMobileNumberError !== '' && (
                  <Text style={styles.error}>{consumerMobileNumberError}</Text>
                )}
              </View>

              <View
                style={{
                  height: 22,
                  width: '100%',
                  marginLeft: 40,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  Remarks
                </Text>
              </View>
              <View
                style={{
                  height: 25,
                  width: '100%',
                  marginLeft: 40,
                  marginTop: 70,
                  // position: 'absolute',
                  //padding:90,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TextInput
                  multiline={true}
                  placeholder={'Any comment (if required)'}
                  placeholderTextColor="black"
                  onChangeText={text => {
                    setRemarks(text);
                    if (validate(text, 200)) {
                      setRemarksError(
                        'Input must be at least 200 characters long.',
                      );
                    } else setRemarksError('');
                  }}
                  style={{
                    height: 150,
                    width: '86%',
                    borderWidth: 0.75,
                    textAlign: 'left',
                    textAlignVertical: 'top',
                    marginTop: 10,
                    color: 'black',
                  }}
                />
                {remarksError !== '' && (
                  <Text style={styles.error}>{remarksError}</Text>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  //padding: 20,
                  //paddingTop: -90,
                  //paddingBottom: 150,
                  flexDirection: 'column',
                  //alignSelf: 'center',
                  //alignItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    //height: 2,
                    width: '100%',
                    // position: 'absolute',
                    // backgroundColor: ' rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 60,
                  }}>
                  <LinearGradient
                    colors={['#1565C0', '#64b5f6']}
                    style={styles.PhotosIn}>
                    <Text
                      style={[
                        styles.textPhotos,
                        {
                          color: '#fff',
                        },
                      ]}>
                      {' '}
                      Photos of Hazards
                    </Text>
                  </LinearGradient>
                </View>
                {/*Saad Added on Galery*/}
                <View
                  style={{
                    width: '100%',
                    // padding: 20,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => chooseFile('photo')}>
                      <Image
                        source={require('../assets/Gallery.png')} // source={{uri: filePath.uri}}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 11,
                        marginTop: 4,
                        textAlign: 'center',
                        width: 120,
                        textAlignVertical: 'center',
                        color: '#1565C0',
                      }}>
                      tap the picture from gallery
                    </Text>
                  </View>
                  <View style={{flex: 2, alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{marginTop: 15}}
                      onPress={() => captureImage('photo')}>
                      <Image
                        source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 11,
                        marginTop: 4,
                        textAlign: 'center',
                        width: 120,
                        textAlignVertical: 'center',
                        color: '#1565C0',
                      }}>
                      tap the camera to take a picture
                    </Text>
                  </View>
                </View>
              </View>
              {/*Saad Added on Galery*/}
              {/* Saad Commented on Single Gallery

              <View
                style={{
                  height: 22,
                  width: '100%',
                  marginLeft: 40,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginTop: 90,
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'normal', color: 'black'}}>
                  Picture (Mandatory)
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  // padding: 20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginLeft: 100,
                  // justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => captureImage('photo')}>
                  <Image
                    source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                  <Text
                    style={{
                      fontSize: 11,
                      //marginTop: 2,
                      textAlign: 'center',
                      width: 120,
                      marginLeft: -15,
                      textAlignVertical: 'center',
                      color: '#1565C0',
                    }}>
                    tap the picture from gallery
                  </Text>
                </TouchableOpacity>

                
              </View>
Saad Commented on Single Gallery */}
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
                    onPress={() => {
                      NetInfo.fetch().then(state => {
                        if (state.isConnected) {
                          console.log(' **** You are online! ******** ');
                          postSafetyHazard();
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

export default SafetyHazardCase;

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
