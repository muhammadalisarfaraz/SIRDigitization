import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Moment from 'moment';

import ImagePicker from 'react-native-image-crop-picker';

import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

function SupportScreen({navigation}) {
  //  const { colors } = useTheme();

  //const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [user, setUser] = useState('');
  const [ibc, setIbc] = useState('');
  const [ibcName, setIbcName] = useState('');
  const [imageurl, setImageUrl] = useState('');

  const [currentDate, setCurrentDate] = useState('');
  const {supportScreen} = React.useContext(AuthContext);

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

  const captureImage = async (type, imageNo) => {
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

        // var Allimages = images;

        // if (imageNo == '1') {
        //   setIsImage1('Y');
        //   console.log(response.path);
        //   //setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);
        //   setFilePath1([
        //     {
        //       uri: response.path,
        //       url: response.path,
        //       fileName: 'BFDC.jpg',
        //       base64: response.data,
        //     },
        //   ]);
        //   setImages1({
        //     uri: response.path,
        //     url: response.path,
        //     fileName: 'BFDC.jpg',
        //     base64: response.data,
        //   });
        //   setConsumerImages([
        //     {
        //       uri: response.path,
        //       url: response.path,
        //       fileName: 'consumerImage.jpg',
        //       base64: response.data,
        //     },
        //   ]);

        //   //setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);
        // } else {
        //   setIsImage('Y');
        //   setFilePath([
        //     {
        //       uri: response.path,
        //       url: response.path,
        //       fileName: 'BFDC.jpg',
        //       base64: response.data,
        //     },
        //     ...Allimages,
        //   ]);
        //   setImages([
        //     {
        //       uri: response.path,
        //       url: response.path,
        //       fileName: 'BFDC.jpg',
        //       base64: response.data,
        //     },
        //     ...Allimages,
        //   ]);
        // }
        console.log('images1.uri', response.path);
        console.log('image path', response);
        setImageUrl(response.path);

        AsyncStorage.setItem('employeeImage', response.path);
      });
    }
  };

  useEffect(() => {
    console.log('Ali');
    console.log('test');
    console.log('test');
    // console.log('test');
    //  getPendingOrders();

    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data1 = [];
      data1 = items ? JSON.parse(items) : [];
      setUser(data1[0].User);
      setIbc(data1[0].begru);
      setIbcName(data1[0].IBC_Name);
    });
    AsyncStorage.getItem('employeeImage').then(item => {
      console.log('Itemmmmmmmmm', item);
      if (item) {
        setImageUrl(item);
      } else {
        setImageUrl('');
      }
    });

    var date = new Date();
    date = Moment(date).format('DD-MM-YYYY, h:mm:ss a');
    setCurrentDate(date);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{padding: 3}}></View>

      <View style={styles.footerMaster}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              // flex: 0.45,
              paddingLeft: 5,
              //   flexDirection: 'row',
              //  justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                marginTop: -15,
                fontSize: 13,
                // fontWeight: 'bold',
                color: 'black', //'#FFFFFF',
                //     marginBottom: 4,
              }}>
              {'Data / Time: ' + currentDate}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: 'black',
                fontSize: 13,
              }}>
              {'User ID: ' + user}
            </Text>

            <Text
              style={{
                marginTop: 15,
                fontSize: 13,
                color: 'black',
              }}>
              {'IBC: ' + ibcName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => captureImage('photo')}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              marginLeft: 40,
            }}>
            {imageurl ? (
              <Image
                source={{uri: imageurl}} /// source={{uri: filePath.uri}}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  borderRadius: 20,
                  borderColor: '#000',
                  borderWidth: 2,
                }}
              />
            ) : (
              <Image
                style={{
                  // height: HEIGHT / 10,
                  width: WIDTH / 5,
                  resizeMode: 'contain',
                }}
                source={require('../assets/avatar.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{padding: '1%'}}></View>

      <View style={styles.footer}>
        <View
          style={{
            right: 0,
            top: 0,
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 16,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'black',
            }}>
            Welcome to SIR Application
          </Text>
          <TouchableOpacity
            // onPress={this._onPress}
            //style={[styles.button, { backgroundColor: '#3636D3' }]}
            activeOpacity={1}></TouchableOpacity>
        </View>

        <View
          style={{
            height: 30,
            width: '80%',
            color: '#1565C0',
            flexDirection: 'row',
            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1565C0'}}>
            <Icon name="bell-ring" size={30} color="#1565C0" />
          </Text>

          <Text
            style={{
              marginLeft: 5,
              fontSize: 25,
              fontWeight: 'bold',
              color: '#1565C0',
            }}>
            Planned SIR
          </Text>
        </View>

        <View style={{padding: '5%', marginBottom: '1%'}}></View>

        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: -5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                //  routes: [{name: 'SIR Digitization Ordinary'}],
                ///      routes: [{name: 'Site Inspection Report'}],
                routes: [{name: 'HomeScreen'}],
              });
            }}
            style={{
              //  height: 22,
              width: '23%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                //    width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 2,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Assigned
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: '100%',
              width: '23%',
              backgroundColor: '#944BF8',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreenPlannedSaved'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '55%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#944BF8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Saved
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreenPlannedCompleted'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '90%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#3636D3',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,

                  routes: [{name: 'HomeScreenPlannedSummary'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '90%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#3636D3',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Summary
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{ padding: 15, marginBottom: 10 }}>
        </View>
        */}

        <View style={{padding: '5%', marginBottom: '1%'}}></View>
        <View
          style={{
            //height: 50,
            // width: '32%',
            color: '#1565C0',
            flexDirection: 'row',
            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1565C0'}}>
            <Icon name="bell-off" size={30} color="#1565C0" />
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 25,
              fontWeight: 'bold',
              color: '#1565C0',
            }}>
            Un-Planned SIR
          </Text>
        </View>

        {/* <View style={{ padding: 15, marginBottom: 10 }}>
        </View>
        */}

        <View style={{padding: '5%', marginBottom: '1%'}}></View>

        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: -5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                //  routes: [{name: 'SIR Digitization Ordinary'}],
                ///      routes: [{name: 'Site Inspection Report'}],
                routes: [{name: 'Un-Planned SIR'}],
              });
            }}
            style={{
              //  height: 22,
              width: '23%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                //    width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 2,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Assigned
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: '100%',
              width: '23%',
              backgroundColor: '#944BF8',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreenUnPlannedSaved'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '55%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#944BF8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Saved
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'HomeScreenUnPlannedCompleted'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '90%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#3636D3',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: '100%',
              width: '30%',
              backgroundColor: '#3636D3',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              borderRadius: 10,
              padding: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,

                  routes: [{name: 'HomeScreenUnPlannedSummary'}],
                });
              }}
              style={
                {
                  //  height: 22,
                  // width: '90%',
                  // backgroundColor: '#E349EC',
                  //    alignItems: 'center',
                  //  justifyContent: 'center',
                }
              }>
              <View
                style={{
                  height: '100%',
                  // width: '95%',
                  backgroundColor: '#3636D3',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  Summary
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{padding: '5%', marginBottom: '1%'}}></View>

        <View
          style={{
            //height: 50,
            // width: '32%',
            color: '#1565C0',
            flexDirection: 'row',

            //alignItems:'flex-start',
            //justifyContent: 'left',
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1565C0'}}>
            <Icon name="ambulance" size={30} color="#1565C0" />
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 25,
              fontWeight: 'bold',
              color: '#1565C0',
            }}>
            Safety Hazard Cases
          </Text>
        </View>

        <View style={{padding: '5%', marginBottom: '1%'}}></View>
        <View
          style={{
            height: 40,
            width: '96%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            paddingLeft: -10,
            paddingRight: -10,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                routes: [{name: 'Safety Hazard Case'}],
              });
            }}
            style={{
              //  height: 22,
              width: '45%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>
            <View
              style={{
                height: 35,
                //width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 2,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                New
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                // routes: [{name: 'HomeScreen'}],
                routes: [{name: 'Saved Safety Hazard'}],
              });
            }}
            style={{
              //  height: 22,
              width: '45%',
              // backgroundColor: '#E349EC',
              //    alignItems: 'center',
              //  justifyContent: 'center',
            }}>
            <View
              style={{
                height: 35,
                // width: '23%',
                backgroundColor: '#E349EC',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 2,
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Post
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{padding: 15, marginBottom: 10}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',

    //  alignItems: 'center',
    //    justifyContent: 'center'
  },

  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    // top:0,
    // color: '#0D90D0',
    backgroundColor: 'white',

    //elevation: 4,
    // shadowOffset: { width: 15, height: 15 },
    //  shadowColor: 'black',
    // shadowOpacity: 0.8,
    // shadowRadius: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  dashboad: {
    height: 80,
    marginLeft: 10,
    width: '30%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    elevation: 10,
  },

  footer: {
    flex: 3,
    elevation: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    // borderTopRightRadius: 30,
    borderBottomEndRadius: 40,
    // borderBottomStartRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  footerMaster: {
    flex: 0.5,
    elevation: 15,

    backgroundColor: 'white',
    // borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    // borderBottomEndRadius: 10,
    borderBottomStartRadius: 30,
    // width: WIDTH / 1.1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    //  fontSize: 30,
    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
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

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    marginLeft: 22,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 30,
    width: '90%',

    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
  },
  tinyLogo: {
    width: WIDTH / 1.06,
    height: HEIGHT / 8,
    paddingHorizontal: 20,

    resizeMode: 'contain',
  },
});

export default SupportScreen;
