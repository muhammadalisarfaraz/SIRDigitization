import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView, Image, ImageBackground,
  TouchableOpacity, Platform,
  PermissionsAndroid,
  ActivityIndicator, Dimensions
} from 'react-native';
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import ImageViewConsumer from 'react-native-image-viewing';
import Geolocation from '@react-native-community/geolocation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  launchCamera,
  launchImageLibrary,
  //ImagePicker,
  Select
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import ImageViewer from 'react-native-image-zoom-viewer';

import Signature from "react-native-signature-canvas";


let current = 100;
const ApiScreen = () => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Discrepancy Recorded');
  const [loader, setLoader] = useState(false);

  var radio_props = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 }
  ];

  var radio_propsS = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 }
  ];

  const items = [
    {
      id: '92iijs7yta',
      name: 'Ondo',
    },
    {
      id: 'a0s0a8ssbsd',
      name: 'Ogun',
    },
    {
      id: '16hbajsabsd',
      name: 'Calabar',
    },
    {
      id: 'nahs75a5sg',
      name: 'Lagos',
    },
    {
      id: '667atsas',
      name: 'Maiduguri',
    },
    {
      id: 'hsyasajs',
      name: 'Anambra',
    },
    {
      id: 'djsjudksjd',
      name: 'Benue',
    },
    {
      id: 'sdhyaysdj',
      name: 'Kaduna',
    },
    {
      id: 'suudydjsjd',
      name: 'Abuja',
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  let onSelectedItemsChange = selectedItems => {
    console.log(selectedItems);
    if (selectedItems.length > 5) {
      return;
    } else {
      setSelectedItems(selectedItems);
    }
  };

  const [list, setList] = useState([
    {
      id: 1,
      name: 'Discrepancy Recorded',
      active: true,
    },
    {
      id: 2,
      name: 'Load Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Discrepancy and Findings',
      active: false,
    },
    {
      id: 4,
      name: 'Appliance Detail',
      active: false,
    },
    {
      id: 5,
      name: 'Meter Detail - System',
      active: false,
    },
    {
      id: 6,
      name: 'Meter Detail - Onsite',
      active: false,
    },
    {
      id: 7,
      name: 'Customer Acknowlegment',
      active: false,
    },

    {
      id: 7,
      name: 'SIR Pictures',
      active: false,
    },
  ]);


  const [apiRes, setApiRes] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [filePath1, setFilePath1] = useState([]);
  const [images1, setImages1] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState("N");
  const [IsImage1, setIsImage1] = useState("N");
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const { width } = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);


  /* Load Detail ------------ Start */
  const [sanctionLoad, setSanctionLoad] = useState("");
  const [meterTesting, setMeterTesting] = useState("");
  const [agediff, setAgediff] = useState("");
  const [meterPer, setMeterPer] = useState("");
  const [meterSlow, setMeterSlow] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [runningLoad, setRunningLoad] = useState("");

  /* Load Detail ------------ End */


  /* Meter Detail on Site ------------ Start */
  const [meterNo, setMeterNo] = useState("");
  const [currentReading, setCurrentReading] = useState("");
  const [peakReading, setPeakReading] = useState("");


  const [make, setMake] = useState("");
  const [amperes, setAmperes] = useState("");
  const [volts, setVolts] = useState("");
  const [meterConstant, setMeterConstant] = useState("");
  const [securitySlipNo, setSecuritySlipNo] = useState("");
  const [multiplyingFactor, setMultiplyingFactor] = useState("");

  /* Meter Detail on Site ------------ End */

  /* Discrepancy and Findings ------------ Start */
  const [serviceType, setServiceType] = useState("");
  const [tarif, setTarif] = useState("");
  const [premiseType, setPremiseType] = useState("");
  const [premiseCategory, setPremiseCategory] = useState("");

  const [remarks, setRemarks] = useState("");
  const [discrepancyfindingsRemarks, setdiscrepancyfindingsRemarks] = useState("");
  /* Discrepancy and Findings ------------ End */

  /* Customer Acknowlegment ------------ Start */

  const [consumerName, setConsumerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [consumerRemarks, setConsumerRemarks] = useState("");
  const [consumerRefuseYN, setConsumerRefuseYN] = useState("");
  const [consumerSign, setConsumerSign] = useState("");

  /* Customer Acknowlegment ------------ End */


  const SPACING = 10;
  const THUMB_SIZE = 80;
  const flatListRef = useRef();
  const carouselRef = useRef();

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
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
        alert(response.errorMessage);
        return;
      }




      setIsImage("Y");

      var Allimages = images;
      setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);

      setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);


    });
  };



  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true
    });
  };
  const [latitude1, setlatitude] = useState("");
  const [longitude1, setlongitude] = useState("");


  const getUserCurrentLocation = async () => {
    let latitude, longitude

    //let isPermissionPermitted= await requestLocationPermission();

    // console.log(isPermissionPermitted);

    //if (isPermissionPermitted) {

    //  console.log("isPermissionPermitted", isPermissionPermitted);
    Geolocation.getCurrentPosition(
      info => {
        const { coords } = info

        latitude = coords.latitude
        longitude = coords.longitude


        setlatitude(latitude);
        setlongitude(longitude);
        // console.log(latitude);



        // getUserCurrentAddress(latitude, longitude)
      },
      error => console.log(error),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000
      }
    )
    //}
  }










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


  const requestAuthorization = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestAuthorization()(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'This App needs access to your location ' +
              'so we can know where you are.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use locations ")
          return granted === PermissionsAndroid.RESULTS.GRANTED;

        } else {
          console.log("Location permission denied")
          return false;
        }
      } catch (err) {
        return false;
        console.warn(err)

      }
    }
  }


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

    console.log("isCameraPermitted", isCameraPermitted);
    console.log("isStoragePermitted", isStoragePermitted);
    // && isStoragePermitted
    if (isCameraPermitted) {

      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
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

        if (imageNo == '1') {
          setIsImage1("Y");
          console.log(response.path);
          //setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);
          setFilePath1([{ uri: response.path, url: response.path, fileName: 'BFDC.jpg', base64: response.data }]);
          setImages1({ uri: response.path, url: response.path, fileName: 'BFDC.jpg', base64: response.data });
          //setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);

        }
        else {
          setIsImage("Y");
          setFilePath([{ uri: response.path, url: response.path, fileName: 'BFDC.jpg', base64: response.data }, ...Allimages]);
          setImages([{ uri: response.path, url: response.path, fileName: 'BFDC.jpg', base64: response.data }, ...Allimages]);


        }
        console.log("images1.uri", images1.uri);
      });
    }
  };

  useEffect(() => {
    // getApiData();

    getUserCurrentLocation();
    getApiData();
  }, []);

  const getApiData = async () => {
    console.log('get api data function');
    setLoader(true);
    try {
      let response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setLoader(false);
      console.log('res', response.data);
      setApiRes(response.data);
    } catch (error) {
      alert(error);
      setLoader(false);
      console.log('Error ', error);
    }
  };

  const [tableList, setTableList] = useState([
    {
      id: Date.now(), LoadDetail: 'Fan', Quantity: '', Rating: '80', TotalWatts: ''
    },
    { id: Date.now(), LoadDetail: 'Bulb', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Energy Saver', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Tube Light', Quantity: '', Rating: '40', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Heater', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'AC-Window', Quantity: '', Rating: '2500', TotalWatts: '' },
    { id: Date.now(), LoadDetail: '1 1/2 Ton', Quantity: '', Rating: '1800', TotalWatts: '' },
    { id: Date.now(), LoadDetail: '1 Ton', Quantity: '', Rating: '1200', TotalWatts: '' },

  ]);

  const onAddmore = () => {
    setTableList([
      ...tableList,
      {
        id: Date.now(),
        LoadDetail: '',
        Quantity: '',
        Rating: '',
        TotalWatts: '',
      },
    ]);
  };


  // console.log('list table', tableList);


  const updateLoadDetail = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = { ...newArray[index], LoadDetail: text };
    setTableList(newArray);
  };
  const updateQuantity = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = { ...newArray[index], Quantity: text };
    setTableList(newArray);
  };
  const updateRating = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = { ...newArray[index], Rating: text };
    setTableList(newArray);
  };
  const updateTotalWatts = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = { ...newArray[index], TotalWatts: text };
    setTableList(newArray);
  };

  let onChangeTabHandler = (name, id) => {
    setTab(name);
    console.log(pos);
    if (id == 1) {
      scrollRef.current.scrollTo({ x: pos });
    } else if (id == list.length - 1) {
      scrollRef.current.scrollTo({ x: pos - 120 });
    } else {
      scrollRef.current.scrollTo({ x: pos + 120 });
    }

    setList(
      list.map((li, index) =>
        li.name == name
          ? {
            ...li,
            active: true,
          }
          : {
            ...li,
            active: false,
          },
      ),
    );
    // setList(update);
    // console.log(list);
  };

  // console.log('data response', apiRes);

  const [signature, setSign] = useState(null);

  const handleOK = (signature) => {
    console.log(signature);
    setSign(signature);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;


  return (
    <ScrollView>
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.footer}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  // flex: 0.45,
                  paddingLeft: 10,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    // marginLeft: 5,
                    fontSize: 13,
                    // fontWeight: 'bold',
                    color: 'black', //'#FFFFFF',
                    //     marginBottom: 4,
                  }}>
                  {'SIR No: 900000000335'}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Consumer No: LA414951'}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Name: Syed M. Shoaib'}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Address: Flat No. D-8, Anarkali Flat, Block-16, F.B.Area'}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign Date: 20.02.2022'}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign To: 80012790 - Syed M. Shoaib'}
                </Text>
              </View>
            </View>

            <View style={{ paddingTop: 20 }}></View>
            <View style={{ padding: 5, marginBottom: 10 }}></View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  // flex: 0.45,
                  paddingTop: 5,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: -89,
                    fontSize: 13,
                    // fontWeight: 'bold',
                    color: 'black', //'#FFFFFF',
                    //     marginBottom: 4,
                  }}>
                  {'Cluster / IBC: C1 / F.B.Area'}
                </Text>

                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Account No: 400001061656'}
                </Text>
              </View>
            </View>
          </View>
          {/* </Animatable.View> */}
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          onScroll={e => setPos(e.nativeEvent.contentOffset.x)}>
          <View style={styles.container}>
            {list.map(li => {
              return (
                <View
                  style={[
                    styles.sub_container,
                    {
                      backgroundColor: li.active == true ? '#8C52FF' : '#fff',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => onChangeTabHandler(li.name, li.id)}>
                    <Text
                      style={[
                        styles.text_style,
                        { color: li.active == true ? '#fff' : '#000' },
                      ]}>
                      {li.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View>
          {tab == 'Discrepancy Recorded' && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                {/* <Animatable.View animation="fadeInRightBig"> */}
                {/* <View style={styles.footer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      // flex: 0.45,
                      paddingLeft: 10,
                      //   flexDirection: 'row',
                      //  justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        // marginLeft: 5,
                        fontSize: 13,
                        // fontWeight: 'bold',
                        color: 'black', //'#FFFFFF',
                        //     marginBottom: 4,
                      }}>
                      {'SIR No: 900000000335'}
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        color: 'black',
                        fontSize: 13,
                      }}>
                      {'Consumer No: LA414951'}
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: 'black',
                      }}>
                      {'Name: Syed M. Shoaib'}
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: 'black',
                      }}>
                      {
                        'Address: Flat No. D-8, Anarkali Flat, Block-16, F.B.Area'
                      }
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: 'black',
                      }}>
                      {'Assign Date: 20.02.2022'}
                    </Text>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: 'black',
                      }}>
                      {'Assign To: 80012790 - Syed M. Shoaib'}
                    </Text>
                  </View>
                </View>

                <View style={{paddingTop: 20}}></View>
                <View style={{padding: 5, marginBottom: 10}}></View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      // flex: 0.45,
                      paddingTop: 5,
                      //   flexDirection: 'row',
                      //  justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        marginLeft: 200,
                        marginTop: -89,
                        fontSize: 13,
                        // fontWeight: 'bold',
                        color: 'black', //'#FFFFFF',
                        //     marginBottom: 4,
                      }}>
                      {'Cluster / IBC: C1 / F.B.Area'}
                    </Text>

                    <Text
                      style={{
                        marginLeft: 200,
                        marginTop: 4,
                        color: 'black',
                        fontSize: 13,
                      }}>
                      {'Account No: 400001061656'}
                    </Text>
                  </View>
                </View>
              </View> */}
                {/* </Animatable.View> */}

                <View style={styles.mainbox}>
                  <Card>
                    <DataTable>
                      <DataTable.Header style={styles.databeHeader}>
                        <DataTable.Title style={{ flex: 1, color: 'black' }}>
                          DiscrepancyType
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 2, color: 'black' }}>
                          Ticket
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 8, color: 'black' }}>
                          Description
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 5, color: 'black' }}>
                          Priority
                        </DataTable.Title>
                      </DataTable.Header>
                      {apiRes.length !== 0 &&
                        apiRes.map((l, i) => (
                          <DataTable.Row style={styles.databeBox} key={i}>
                            <View style={{ flex: 5 }}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDiscrepancy(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.name}
                              />
                              {/* {l.test} */}
                            </View>
                            <View style={{ flex: 6 }}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateTicket(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.username}
                              />
                            </View>
                            <View style={{ flex: 5 }}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDescription(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.email}
                              />
                            </View>
                            <View style={{ flex: 5 }}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updatePriority(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.email}
                              />
                            </View>
                          </DataTable.Row>
                        ))}
                    </DataTable>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#1565C0',
                        elevation: 10,
                        width: 400,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 25,
                        padding: 5,
                        marginBottom: 10,
                      }}
                      onPress={() => getApiData()}>
                      <Text style={{ textAlign: 'center', color: 'white' }}>
                        Add More +{' '}
                        {loader && (
                          <ActivityIndicator size="small" color="#000" />
                        )}
                      </Text>
                    </TouchableOpacity>
                  </Card>
                </View>
              </View>
            </ScrollView>
          )}
          {tab == 'Load Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View style={{ flex: 6 }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          //  flex: 8,
                          width: '90%',
                          marginTop: -50,
                          //  marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Sanction Load
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (KW from DB)
                            </Text>
                          </View>

                          <View style={{ flex: 2, widht: '100%' }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Sanction Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setSanctionLoad(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Meter Testing Result
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (MTV, Ammeter)
                            </Text>
                          </View>

                          <View style={{ flex: 2, widht: '100%' }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Meter Testing Result'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterTesting(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 1.5,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %age Diff
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%age Diff'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setAgediff(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %= Meter
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%= Meter'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterPer(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %= Slow
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%= Slow'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterSlow(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Connected Load
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Connected Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setConnectedLoad(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{ flex: 6, flexDirection: 'row' }}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 2 }}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Running Load
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Running Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setRunningLoad(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
          {tab == 'Discrepancy and Findings' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -90,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Service Type{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Service Type'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setServiceType(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Tarif{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Tarif'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setTarif(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Premise Type{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              //  style={styles.inputLoadDetail}
                              placeholder={'Premise Type'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setPremiseType(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Premise Category{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              //  style={styles.inputLoadDetail}
                              placeholder={'Premise Category'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setPremiseCategory(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>




                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>

                        <View
                          style={{
                            height: 35,
                            width: '100%',
                            // position: 'absolute',
                            backgroundColor: '#1565C0',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>





                          <LinearGradient
                            colors={['#1565C0', '#64b5f6']}
                            style={styles.signIn}
                          >
                            <Text style={[styles.textSign, {
                              color: '#fff'
                            }]}>  Discrepancy</Text>
                          </LinearGradient>

                        </View>


                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <View style={styles.multiSelectContainer}>
                            <MultiSelect
                              items={items}
                              uniqueKey="id"
                              onSelectedItemsChange={e => onSelectedItemsChange(e)}
                              selectedItems={selectedItems}
                              selectText="Search Items..."
                              searchInputPlaceholderText="Search Items..."
                              searchPlaceholderTextColor="red"
                              tagRemoveIconColor="#000"
                              tagBorderColor="#000"
                              tagTextColor="#000"
                              selectedItemTextColor="#1565C0"
                              selectedItemIconColor="#000"
                              itemTextColor="#000"
                              searchInputStyle={{ color: 'black' }}
                              submitButtonColor="#000"
                              submitButtonText="Submit"
                            />
                          </View>
                        </View>


                      </View>


                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>

                        <View
                          style={{
                            height: 35,
                            width: '100%',
                            // position: 'absolute',
                            backgroundColor: '#1565C0',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>


                          <LinearGradient
                            colors={['#1565C0', '#64b5f6']}
                            style={styles.signIn}
                          >
                            <Text style={[styles.textSign, {
                              color: '#fff'
                            }]}>   Remarks{' '}</Text>
                          </LinearGradient>

                        </View>


                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>


                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View style={{ flex: 2, alignItems: 'flex-start' }}>
                            <TextInput
                              multiline={true}
                              onChangeText={text => {
                                setRemarks(text);
                              }}
                              placeholder={'Any comment (if required)'}
                              placeholderTextColor="black"
                              style={{
                                height: 150,
                                width: '100%',
                                borderWidth: 0.75,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Appliance Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <Card>
                    <DataTable>
                      <DataTable.Header style={styles.databeHeader}>
                        <DataTable.Title style={{ flex: 5, color: 'black' }}>
                          Load Detail
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 5, color: 'black' }}>
                          Quantity
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 5, color: 'black' }}>
                          Rating (W)
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 5, color: 'black' }}>
                          Total Watts
                        </DataTable.Title>
                      </DataTable.Header>
                      {tableList.map((l, i) => (
                        <DataTable.Row style={styles.databeBox} key={i}>
                          <View style={{ flex: 5 }}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateLoadDetail(t, i)}
                              placeholder="Load Detail"
                              placeholderTextColor="black"
                              fontSize={10}

                              value={l.LoadDetail}
                            />
                            {/* {l.test} */}
                          </View>
                          <View style={{ flex: 5 }}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateQuantity(t, i)}
                              placeholder="Quantity"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={10}
                              value={l.Quantity}
                            />
                          </View>
                          <View style={{ flex: 5 }}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateRating(t, i)}
                              placeholder="Rating"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={10}
                              value={l.Rating}
                            />
                          </View>
                          <View style={{ flex: 5 }}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateTotalWatts(t, i)}
                              placeholder="Total Watts"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={10}
                              value={l.TotalWatts}
                            />
                          </View>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#1565C0',
                        elevation: 10,
                        width: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 25,
                        padding: 5,
                        marginBottom: 10,
                      }}
                      onPress={() => onAddmore()}>
                      <Text style={{ textAlign: 'center', color: 'white' }}>
                        Add More +{' '}
                      </Text>
                    </TouchableOpacity>
                  </Card>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Meter Detail - System' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Meter No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Current/off-Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>




                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Make{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Amperes{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Volts{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Meter Constant{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Security Slip No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Multiplying Factor{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            {' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>

                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Meter Detail - Onsite' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Meter No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Meter No'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterNo(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Current/off-Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Current/off-Peak Reading'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setCurrentReading(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>


                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Peak Reading'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setPeakReading(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Make{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              // style={styles.inputLoadDetail}
                              placeholder={'Make'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMake(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Amperes{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Amperes'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setAmperes(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Volts{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Volts'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setVolts(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Meter Constant{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              // style={styles.inputLoadDetail}
                              placeholder={'Meter Constant'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterConstant(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Security Slip No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              //   style={styles.inputLoadDetail}
                              placeholder={'Security Slip No'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setSecuritySlipNo(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Multiplying Factor{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              // style={styles.inputLoadDetail}
                              placeholder={'Multiplying Factor'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMultiplyingFactor(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Customer Acknowlegment' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Consumer Name{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Consumer Name'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setConsumerName(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Mobile No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <TextInput
                              placeholder={'Mobile No'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMobileNo(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: 'black' }}>
                            Consumer Remarks{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View style={{ flex: 2, alignItems: 'flex-start' }}>
                            <TextInput
                              multiline={true}
                              onChangeText={text => {
                                setConsumerRemarks(text);
                              }}
                              placeholder={'Any comment (if required)'}
                              placeholderTextColor="black"
                              style={{
                                height: 150,
                                width: '100%',
                                borderWidth: 0.75,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 20,
                      }}>
                      <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                          Refuse to Sign on Notice{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginTop: -10,
                          }}>
                          <RadioForm
                            radio_props={radio_props}
                            initial={radio_props}
                            buttonColor={'#1565C0'}
                            formHorizontal={true}
                            // borderWidth={5}
                            buttonInnerColor={'#1565C0'}
                            selectedButtonColor={'#1565C0'}

                            // labelColor={'#50C900'}

                            borderWidth={1}
                            //  buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                            buttonSize={13}
                            buttonOuterSize={20}
                            //buttonStyle={{backgroundColor:'#5d2d91',borderWidth:10}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                            onPress={(value) => {

                              ({ value: value })
                              if (value == 0) {
                                setConsumerRefuseYN("Yes")
                              }
                              else {
                                setConsumerRefuseYN("No")
                              }
                            }

                            }
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 20,
                      }}>
                      <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                          Signed / Delivered Notice{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginTop: -10,
                          }}>
                          <RadioForm
                            radio_props={radio_propsS}
                            initial={radio_propsS}
                            buttonColor={'#1565C0'}
                            formHorizontal={true}
                            // borderWidth={5}
                            buttonInnerColor={'#1565C0'}
                            selectedButtonColor={'#1565C0'}

                            // labelColor={'#50C900'}

                            borderWidth={1}
                            //  buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                            buttonSize={13}
                            buttonOuterSize={20}
                            //buttonStyle={{backgroundColor:'#5d2d91',borderWidth:10}}
                            buttonWrapStyle={{ marginLeft: 10 }}
                            onPress={(value) => {

                              ({ value: value })
                              if (value == 0) {
                                setConsumerSign("Yes")
                              }
                              else {
                                setConsumerSign("No")
                              }
                            }

                            }
                          />
                        </View>
                      </View>
                    </View>


                    <View style={{ flex: 1 }}>
                      <View style={styles.preview}>
                        {signature ? (
                          <Image
                            resizeMode={"contain"}
                            style={{ width: 335, height: 114 }}
                            source={{ uri: signature }}
                          />
                        ) : null}
                      </View>
                      <Signature
                        onOK={handleOK}
                        onEmpty={handleEmpty}
                        descriptionText="Sign"
                        clearText="Clear"
                        confirmText="Save"
                        webStyle={style}
                      />
                    </View>



                    <View style={[styles.container1]}>
                      <View style={{ flexDirection: 'row', flex: 0.2, width: '96%' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>

                          <Text style={styles.text_left}>Picture (Optional)</Text>

                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>

                          <TouchableOpacity onPress={() => captureImage('photo', '1')} >
                            <Image
                              source={require('../assets/camera.png')}// source={{uri: filePath.uri}}
                              style={styles.imageStyle}
                            />
                          </TouchableOpacity>

                          <ImageViewConsumer
                            images={[images1]}
                            imageIndex={0}
                            visible={visible1}

                            onRequestClose={() => setIsVisible1(false)}
                          />
                          <View style={{ flex: 2.5 }}>

                            <TouchableOpacity onPress={() => setIsVisible1(true)} >
                              <Image
                                source={{ uri: images1.uri }}/// source={{uri: filePath.uri}}
                                style={styles.imageStyle}
                              />

                            </TouchableOpacity>

                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 20,
                      }}>
                      <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}>

                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginTop: -10,
                          }}>

                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}




          {tab == 'SIR Pictures' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -70,
                        marginLeft: 2,
                      }}>
                    </View>










                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.signIn}
                    >
                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}> Photos of Surveyed Meter</Text>
                    </LinearGradient>


                    <View
                      style={{
                        width: '100%',
                        // padding: 20,
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center',
                        // justifyContent: 'space-between',
                      }}>
                      <View style={{ flex: 2, alignItems: 'center' }}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => chooseFile('photo')}>
                          <Image
                            source={require('../assets/Gallery.png')}// source={{uri: filePath.uri}}
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
                            color: '#1565C0'

                          }}>
                          tap the picture from gallery
                        </Text>

                      </View>
                      <View style={{ flex: 2, alignItems: 'center' }}>
                        <TouchableOpacity
                          style={{ marginTop: 15 }}
                          onPress={() => captureImage('photo')
                          }>
                          <Image
                            source={require('../assets/camera.png')}// source={{uri: filePath.uri}}
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
                            color: '#1565C0'
                          }}>
                          tap the camera to take a picture
                        </Text>
                      </View>

                    </View>

                    <View
                      style={{
                        flex: 2, alignItems: 'center',
                        justifyContent: 'center',
                        // height: 50,
                        flexDirection: 'row',
                        marginVertical: 10,
                        marginLeft: 85,
                        // paddingHorizontal: 110,  
                      }}>


                      <Carousel

                        ref={carouselRef}
                        layout='default'
                        data={images}

                        sliderWidth={width}
                        itemWidth={width}

                        renderItem={({ item, index }) => {
                          return (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  onTouchThumbnail(index);
                                  setindexer1(index);
                                  setimageview(true);

                                }}
                                activeOpacity={0.9}
                              >

                                <Image
                                  source={{ uri: item.uri }}
                                  style={{ height: 200, width: 200 }}></Image>
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
                                  width: 200,
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
                          )
                        }}

                        // sliderWidth={150}
                        //itemWidth={120}
                        onSnapToItem={index => onSelect(index)}

                      />

                    </View>


                    <Modal visible={imageview} transparent={true}
                      closeOnClick={true}
                    >




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
                        marginTop: 50,
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
                          // setUploadingMsg(res.d.Return);


                          setAuthModalVisible(!isAuthModalVisible);

                        }}>


                        <LinearGradient
                          colors={['#1565C0', '#64b5f6']}
                          style={styles.submit}
                        >
                          <Text style={[styles.textSign, {
                            color: '#fff'
                          }]}>Cancel</Text>
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
                          style={styles.submit}
                        >
                          <Text style={[styles.textSign, {
                            color: '#fff'
                          }]}>Submit</Text>
                        </LinearGradient>



                      </TouchableOpacity>
                    </View>


                  </View>
                </View>
              </View>
            </ScrollView>
          )}


        </View>
      </View>
    </ScrollView>
  );
};

export default ApiScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#F5FCFF'
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },


  sub_container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    height: 40,
    // backgroundColor: 'white',
    elevation: 2,
    padding: 5,
    marginTop: 10,
    marginLeft: 2,
    marginBottom: 10,
  },
  text_style: {
    color: '#000',
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
    backgroundColor: 'white',
    //  alignSelf: 'center',
    borderRadius: 15,
    marginLeft: 5,
    marginHorizontal: 2,
    marginVertical: 3,
    width: 400,
    height: 170,
    marginTop: 10,
    justifyContent: 'center',
    // borderWidth: .5,

    borderColor: 'black',
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },

  footerInput: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 100,
    width: 400,
    // height: 470,

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

  title: {
    margin: 10,
    fontSize: 15,
    fontSize: 35,
    textAlign: 'left',
  },
  mainbox: {
    textAlign: 'center',
    margin: 8,
    //height:500,
    //width:500,
    //flex: 1,
    justifyContent: 'space-between',
    color: 'black',
  },
  databeBox: {
    margin: 5,
    // width:60,
    textAlign: 'center',
    color: 'black',
  },
  databeHeader: {
    margin: 10,
    textAlign: 'left',
    color: 'black',
  },
  input: {
    width: 80,
    padding: 4,
    color: 'black',
  },

  inputLoadDetail: {
    color: 'black',
    borderBottomWidth: 0.5,
  },

  MeterSystem: {
    width: '100%',
    borderBottomWidth: 0.5,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: 'black',
  },
  multiSelectContainer: {
    height: 'auto',
    width: 345,
  },
  imageStyle: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    // margin: 5,
  },


  formheader: {
    flex: 1,
    //    justifyContent:'space-between',
    //   paddingBottom: 50,
    //        backgroundColor: "red",
  },
  text_left: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10
    //padding: 15,
  },

  signIn: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  submit: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },

});
