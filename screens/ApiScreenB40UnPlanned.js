import React, { useState, useRef, useEffect, createRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, Button,
  ScrollView, Image, ImageBackground, SafeAreaView,
  TouchableOpacity, Platform,
  PermissionsAndroid,
  ActivityIndicator, Dimensions
} from 'react-native';

import { CheckBox } from 'react-native-elements'
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


import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';


//import DatePicker from 'react-native-datepicker';
//import CheckboxGroup1 from 'react-native-checkbox-group';
import {
  launchCamera,
  launchImageLibrary,
  //ImagePicker,
  Select
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Moment from 'moment';
import { set } from 'react-native-reanimated';

import SignatureCapture from 'react-native-signature-capture';
//import { obsDiscrepanciesB40 } from "./util/obsDiscrepanciesB40";
//import "./styles.css";

let current = 100;
const ApiScreenB40UnPlanned = () => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Consumer Detail');
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const sign = createRef();
  const [signaturePreview, setSign] = useState(null);

  const saveSign = () => {
    sign.current.saveImage();
  };
  const resetSign = () => {
    sign.current.resetImage();

    setTimeout(() => {
      setSign();
    }, 1000);
  };
  const _onSaveEvent = (result) => {
    alert('Signature Captured Successfully');
    setSign(result.encoded);
  }
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  var radio_props = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 }
  ];

  var radio_propsS = [
    { label: 'Yes', value: 0 },
    { label: 'No', value: 1 }
  ];

  var radio_propsServiceType = [
    { label: 'O/H', value: 0 },
    { label: 'U/G', value: 1 }
  ];

  var radio_propsMeterInstalled = [
    { label: 'FMR', value: 0 },
    { label: 'MTV', value: 1 }
  ];

  const [selectedList, setSelectedList] = useState([])
  const [checkBoxList, setCheckBoxList] = useState([
    {
      name: "Burnt", // label for checkbox item
      value: 1,
      ischeck: false
    },
    {
      name: "Direct Use/Extra Phase",
      value: 2,
      ischeck: false
    },
    {
      name: "Doubtful",
      value: 3,
      ischeck: false
    },
    {
      name: "Hole",
      value: 4,
      ischeck: false
    },
    {
      name: "N/Break", // label for checkbox item
      value: 5,
      ischeck: false
    },
    {
      name: "New Connection",
      value: 6,
      ischeck: false
    },
    {
      name: "Stop",
      value: 7,
      ischeck: false
    },
    {
      name: "Shunt", // label for checkbox item
      value: 8,
      ischeck: false
    },
    {
      name: "Sticky",
      value: 9,

      ischeck: false
    },
    {
      name: "Smoky", // label for checkbox item
      value: 10,
      ischeck: false
    },
    {
      name: "Slow",
      value: 11,
      ischeck: false
    },
    {
      name: "T-Strip/Damaged/Open", // label for checkbox item
      value: 12,
      ischeck: false
    },
  ])

  let onSelectCheckBox = (name, id) => {
    setCheckBoxList(
      checkBoxList.map((li, index) =>
        li.name == name
          ? {
            ...li,
            ischeck: !li.ischeck,

          }
          : {
            ...li,
          },
      ),
    );
    setSelectedList(checkBoxList.filter(val => {
      return val.ischeck == true;
    })
    )

  };



  var radio_propsConsumerDetail = [
    { label: 'Active', value: 0 },
    { label: 'In-Active', value: 1 }
  ];

  const [pitems, setPItems] = useState([
    //        { label: '-- Please Select --', value: '', imageCount: 0 },
    { label: 'Main Cover', value: 'Main Cover' },
    { label: 'Terminal cover', value: 'Terminal cover' },
    { label: 'Panel door', value: 'Panel door' },

  ]);


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
    console.log("selectedItems", selectedItems);
    if (selectedItems.length > 5) {
      return;
    } else {
      setSelectedItems(selectedItems);
    }
  };

  const [list, setList] = useState([
    {
      id: 1,
      name: 'Consumer Detail',
      active: true,
    },

    {
      id: 2,
      name: 'Power Meter Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Light Meter Detail',
      active: false,
    },
    {
      id: 4,
      name: 'Meter Testing Result',
      active: false,
    },
    {
      id: 5,
      name: 'Discrepancy and Findings',
      active: false,
    },


    {
      id: 6,
      name: 'Customer Acknowlegment',
      active: false,
    },

    {
      id: 7,
      name: 'SIR Pictures',
      active: false,
    },
    {
      id: 8,
      name: 'Customer Signature',
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
  const [isSelected, setSelection] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  /* Consumer Detail */


  const [consumerStatus, setConsumerStatus] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [tariff, setTariff] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [sizeofService, setSizeofService] = useState("");
  const [fedFromPMTSS, setFedFromPMTSS] = useState("");
  const [pmtSSCode, setPMTSSCode] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [contractLoad, setContractLoad] = useState("");
  const [connectedLoadKW, setConnectedLoadKW] = useState("");
  const [runningLoadKW, setRunningLoadKW] = useState("");
  /* Conumer Detail ------------ End  */

  /* Power Meter ------------ Start */

  const [powerKENo, setPowerKENo] = useState("");
  const [powerMeterMake, setPowerMeterMake] = useState("");
  const [powerMC, setPowerMC] = useState("");
  const [powerReading, setPowerReading] = useState("");
  const [powerMDIOnReading, setPowerMDIOnReading] = useState("");
  const [currentReading, setCurrentReading] = useState("");
  const [peakReading, setPeakReading] = useState("");


  /* Power Meter ------------ End */

  /* Light Meter ------------ Start */
  const [lightKENo, setLightKENo] = useState("");
  const [lightMeterMake, setLightMeterMake] = useState("");
  const [lightMC, setLightMC] = useState("");
  const [lightReading, setLightReading] = useState("");

  const [lightMDIOnReading, setLightMDIOnReading] = useState("");
  const [lightConsumerNo, setLightConsumerNo] = useState("");

  const [lightPeakReading, setLightPeakReading] = useState("");
  const [lightCurrentReading, setLightCurrentReading] = useState("");


  /* Light Meter ------------ End */
  /* Meter Testing Result ------------ Start */
  const [meterTestingResultTC, setMeterTestingResultTC] = useState("");
  const [meterTestingperError, setMeterTestingperError] = useState("");
  const [meterTestingTo, setMeterTestingTo] = useState("");
  const [meterInstalled1, setMeterInstalled1] = useState("");
  const [meterInstalled2, setMeterInstalled2] = useState("");
  const [meterInstalled, setMeterInstalled] = useState("");

  const [statusPostalorder, setStatusPostalorder] = useState("");
  const [metertestingResultremarks, setmetertestingResultremarks] = useState("");

  const [fmrNo, setFMRNo] = useState("");

  /* Meter Testing Result ------------ End */



  /* Discrepancy and Findings ------------ Start */

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


  const [date1, setDate] = useState();


  const handleConfirm = (date) => {

    console.warn("A date has been picked: ", date);

    // searchFilterFunctionDate(moment(date).format("YYYYMMDD"));
    console.log("ali");

    console.log("alitest", Moment(date).format("DD-MM-YYYY"));
    setDate(Moment(date).format("DD-MM-YYYY"));

    hideDatePicker();
    // setChosenDate(moment(datetime).format('dddd Do MMMM YYYY à HH:mm'))
    // setChosenDate(moment(date).format("YYYYMMDD"));
  };


  const hideDatePicker = () => { setDatePickerVisibility(false); };


  const showDatePicker = () => { setDatePickerVisibility(true); };



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
      id: Date.now(), LoadDetail: 'Fan', Quantity: '', Rating: '80 W', TotalWatts: ''
    },
    { id: Date.now(), LoadDetail: 'Bulb', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Energy Saver', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Tube Light', Quantity: '', Rating: '40 W', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'Heater', Quantity: '', Rating: '', TotalWatts: '' },
    { id: Date.now(), LoadDetail: 'AC-Window', Quantity: '', Rating: '2500 W', TotalWatts: '' },
    { id: Date.now(), LoadDetail: '1 1/2 Ton', Quantity: '', Rating: '1800 W', TotalWatts: '' },
    { id: Date.now(), LoadDetail: '1 Ton', Quantity: '', Rating: '1200 W', TotalWatts: '' },

  ]);

  const [powermeterdetail, setPowermeterDetail] = useState([
    {
      id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: ''
    },
    { id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: '' },
    { id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: '' },
    { id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: '' },

  ]);


  const [lightmeterdetail, setLightmeterdetail] = useState([
    { id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: '' },
    { id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: '' },
    { id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: '' },
    { id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: '' },

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


  const updateCurrentTypeLoadDetail = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = { ...newArray[index], CurrentType: text };
    setPowermeterDetail(newArray);
  };
  const updateAmp = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = { ...newArray[index], AMP: text };
    setPowermeterDetail(newArray);
  };
  const updateVolt = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = { ...newArray[index], VOLT: text };
    setPowermeterDetail(newArray);
  };
  const updatePF = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = { ...newArray[index], PF: text };
    setPowermeterDetail(newArray);
  };

  const updateLAmp = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = { ...newArray[index], AMP: text };
    setLightmeterdetail(newArray);
  };
  const updateLVolt = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = { ...newArray[index], VOLT: text };
    setLightmeterdetail(newArray);
  };
  const updateLPF = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = { ...newArray[index], PF: text };
    setLightmeterdetail(newArray);
  };







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
  return (
    <ScrollView>
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.footer}>


            <View
              style={{
                flex: .50,
                paddingLeft: 10,
                //   flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'center',

                //   paddingVertical: 10,
              }}>
              <Text
                style={{
                  // marginLeft: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                  // fontWeight: 'bold',
                  color: 'black', //'#FFFFFF',
                  //     marginBottom: 4,
                }}>
                {'Below 40KW Un-Planned'}
              </Text>

            </View>









            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  // flex: 0.45,
                  paddingLeft: 10,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  // paddingVertical: 10,
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
                  // paddingTop: 5,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  // paddingVertical: 10,
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
          {tab == 'Consumer Detail' && (
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



                    <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: -80 }}>

                      <View style={{ marginLeft: 2, flex: 2, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                          Consumer Status
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row', flex: 2.5, width: '50%' }}>

                        <RadioForm
                          radio_props={radio_propsConsumerDetail}
                          initial={radio_propsConsumerDetail}
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
                              setConsumerStatus("Active")
                            }
                            else {
                              setConsumerStatus("In-Active")
                            }
                          }

                          }
                        />
                      </View>


                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Premise/Industry Type  </Text>
                      </View>

                      <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Tariff </Text>

                      </View>
                    </View>


                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                      <View style={{ flex: 2.5, alignItems: 'flex-start' }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setIndustryType(text);
                          }}></TextInput>
                      </View>

                      <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setTariff(text);
                          }}></TextInput>
                      </View>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>

                      <Text style={styles.text_left}>Service Detail</Text>

                    </View>


                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Service Type </Text>
                      </View>

                      <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Size of Service </Text>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                      <View style={{ flex: 2.5, alignItems: 'flex-start' }}>

                        <RadioForm
                          radio_props={radio_propsServiceType}
                          initial={radio_propsServiceType}
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
                              setServiceType("O/H")
                            }
                            else {
                              setServiceType("U/G")
                            }
                          }
                          }
                        />

                      </View>

                      <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setSizeofService(text);
                          }}></TextInput>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Fed From PMT/SS </Text>
                      </View>

                      <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> PMT/SS Code </Text>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                      <View style={{ flex: 2.5, alignItems: 'flex-start' }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setFedFromPMTSS(text);
                          }}></TextInput>
                      </View>

                      <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setPMTSSCode(text);
                          }}></TextInput>
                      </View>
                    </View>


                    <View style={{ flex: 1, alignItems: 'flex-start' }}>

                      <Text style={styles.text_left}>Load Detail</Text>

                    </View>



                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Connected Load </Text>
                      </View>

                      <View style={{ flex: 0.5, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Sanction Load (KW) </Text>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                      <View style={{ flex: 2.5, alignItems: 'flex-start' }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setConnectedLoad(text);
                          }}></TextInput>
                      </View>

                      <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setContractLoad(text);
                          }}></TextInput>
                      </View>
                    </View>



                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Connected Load (KW) </Text>
                      </View>

                      <View style={{ flex: 0.5, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black' }}> Running Load (KW)</Text>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                      <View style={{ flex: 2.5, alignItems: 'flex-start' }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setConnectedLoadKW(text);
                          }}></TextInput>
                      </View>

                      <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setRunningLoadKW(text);
                          }}></TextInput>
                      </View>
                    </View>




                  </View>
                </View>
              </View>
            </ScrollView>
          )}






          {tab == 'Meter Testing Result' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    //marginTop: 3,
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
                          marginTop: -75,
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
                                marginLeft: 35,
                                fontSize: 12,
                                fontWeight: 'bold'
                              }}>
                              TC
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              3600 / (MC x To) =
                            </Text>
                          </View>

                          <View style={{ flex: 2, widht: '100%' }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'TC'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterTestingResultTC(text);
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
                          marginTop: -15,
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
                                fontWeight: 'bold',
                                marginLeft: 25,
                                fontSize: 12,
                              }}>
                              % Error
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (Tc - To) / To x 100 =
                            </Text>
                          </View>

                          <View style={{ flex: 2, widht: '100%' }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'% Error'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterTestingperError(text);
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
                              To =
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'To'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterTestingTo(text);
                              }}></TextInput>
                          </View>
                        </View>
                      </View>
                    </View>

                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.signIn}
                    >
                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}>  Meter Installed   </Text>
                    </LinearGradient>

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
                              1 )
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Detail'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterInstalled1(text);
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
                              2 )
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Detail'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterInstalled2(text);
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
                          marginTop: 25,
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
                                marginTop: 12,
                                fontWeight: 'bold'
                              }}>
                              Action Required
                            </Text>
                          </View>

                          <View
                            style={{ flexDirection: 'row', flex: 2.5, width: '88%', marginTop: 10, marginLeft: 30 }}>
                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>
                              <RadioForm
                                radio_props={radio_propsMeterInstalled}
                                initial={radio_propsMeterInstalled}
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
                                    setMeterInstalled("FMR")
                                  }
                                  else {
                                    setMeterInstalled("MTV")
                                  }
                                }
                                }
                              />
                            </View>
                          </View>


                        </View>

                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, textAlign: 'right' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black', marginTop: 15, textAlign: 'left' }}>  Status of Postal Order/ Seal</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <DropDownPicker
                          open={open}
                          value={value}
                          items={pitems}
                          setOpen={setOpen}
                          setValue={setValue}
                          setItems={setPItems}
                          onChangeValue={item => {
                            console.log("onChangeValue: " + item);
                            setStatusPostalorder(item);
                          }}
                          onSelectItem={item => {// setSIRFormat(item.value);
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                      <View style={{ flex: 0.5, textAlign: 'right' }}>
                        <Text style={{ fontWeight: 'normal', color: 'black', marginTop: 15, textAlign: 'left' }}>  Remarks</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <TextInput
                          multiline={true}
                          onChangeText={text => {
                            setmetertestingResultremarks(text);
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
                              FMR No
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: -10 }}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'FMR no'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setFMRNo(text);
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
                              Date
                            </Text>
                          </View>

                          <View
                            style={{ flex: 2, widht: '100%', marginTop: 2, marginLeft: 30 }}>
                            <Text style={{ color: 'black' }}>{date1}</Text>
                          </View>
                          <TouchableOpacity onPress={showDatePicker}>
                            <Icon name="calendar" size={30} color="blue" />


                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            value={date1}
                          />
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
                        marginTop: -80,
                        marginLeft: 2,
                      }}>


                      <View
                        style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                        <View style={{ flex: 2.5, flexDirection: 'column' }}>

                          {checkBoxList.map(data => {
                            return (
                              <View style={{ flexDirection: 'column' }}>
                                <CheckBox
                                  title={data.name}

                                  checked={data.ischeck}
                                  containerStyle={{ backgroundColor: 'white', borderColor: 'white', padding: .1, fontWeight: 'bold' }}
                                  onPress={() => onSelectCheckBox(data.name)}

                                />
                              </View>
                            )
                          })}
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
                                setdiscrepancyfindingsRemarks(text);
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

          {tab == 'Power Meter Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>


              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <View
                    style={{
                      //                    marginTop: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.footerInputPower}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: -50,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 2,
                            width: '96%',
                            //  marginTop: 20,
                          }}>
                          <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'normal', color: 'black' }}>
                              KE No{' '}
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
                                placeholder={'KE No'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerKENo(text);
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
                                placeholder={'Make'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerMeterMake(text);
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
                              Meter CT Ratio{' '}
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
                                placeholder={'MC'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerMC(text);
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
                              MDI/MDI-Off{' '}
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
                                placeholder={'MDI/MDI-Off'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerReading(text);
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
                              MDI-On{' '}
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
                                placeholder={'MDI-On'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerMDIOnReading(text);
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




                      <Card>
                        <DataTable>
                          <DataTable.Header style={styles.databeHeader}>
                            <DataTable.Title style={{ flex: 5, color: 'black', textAlign: 'left' }}>
                              CurrentType
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              AMP
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              VOLT
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              PF
                            </DataTable.Title>
                          </DataTable.Header>
                          {powermeterdetail.map((l, i) => (
                            <DataTable.Row style={styles.databeBox} key={i}>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                  placeholder="Current Type"
                                  placeholderTextColor="black"
                                  fontSize={10}

                                  value={l.CurrentType}
                                />
                                {/* {l.test} */}
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateAmp(t, i)}
                                  placeholder="Amp"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                // value={l.AMP}
                                />
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateVolt(t, i)}
                                  keyboardType={'numeric'}
                                  placeholder="Volt"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                //  value={l.VOLT}
                                />
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updatePF(t, i)}
                                  placeholder="P.F"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                // value={l.PF}
                                />
                              </View>
                            </DataTable.Row>
                          ))}
                        </DataTable>

                      </Card>
                    </View>
                  </View>


                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Light Meter Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>


              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <View
                    style={{
                      //                    marginTop: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.footerInputPower}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: -50,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 2,
                            width: '96%',
                            //  marginTop: 20,
                          }}>
                          <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'normal', color: 'black' }}>
                              KE No{' '}
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
                                placeholder={'KE No'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightKENo(text);
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
                                placeholder={'Make'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightMeterMake(text);
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
                              Meter CT Ratio{' '}
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
                                placeholder={'Meter CT Ratio'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightMC(text);
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
                                  setLightCurrentReading(text);
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
                                  setLightPeakReading(text);
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
                              MDI/MDI-Off{' '}
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
                                placeholder={'MDI/MDI-Off Reading'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightReading(text);
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
                              MDI-On Reading{' '}
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
                                placeholder={'MDI-On Reading'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightMDIOnReading(text);
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
                              Consumer No{' '}
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
                                placeholder={'Consumer No'}
                                keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setLightConsumerNo(text);
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




                      <Card>
                        <DataTable>
                          <DataTable.Header style={styles.databeHeader}>
                            <DataTable.Title style={{ flex: 5, color: 'black', textAlign: 'left' }}>
                              CurrentType
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              AMP
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              VOLT
                            </DataTable.Title>
                            <DataTable.Title style={{ flex: 5, color: 'black' }}>
                              PF
                            </DataTable.Title>
                          </DataTable.Header>
                          {lightmeterdetail.map((l, i) => (
                            <DataTable.Row style={styles.databeBox} key={i}>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                  placeholder="Current Type"
                                  placeholderTextColor="black"
                                  fontSize={10}

                                  value={l.CurrentType}
                                />
                                {/* {l.test} */}
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLAmp(t, i)}
                                  placeholder="Amp"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                // value={l.AMP}
                                />
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLVolt(t, i)}
                                  placeholder="Volt"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                //  value={l.VOLT}
                                />
                              </View>
                              <View style={{ flex: 5 }}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLPF(t, i)}
                                  placeholder="P.F"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                // value={l.PF}
                                />
                              </View>
                            </DataTable.Row>
                          ))}
                        </DataTable>

                      </Card>
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
                          Signature {''}
                        </Text>
                      </View>

                      <View
                        style={{
                          //    flexDirection: 'row',
                          flex: 1,
                          // width: '88%',
                          alignSelf: 'center',
                          marginLeft: -10,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginLeft: -10,
                          }}>

                          <View style={styles.preview}>

                            <Image
                              resizeMode={"contain"}
                              style={{ width: 114, height: 114 }}
                              //source={{ base64: signaturePreview}}
                              source={{
                                uri: 'data:image/png;base64,' + signaturePreview,
                              }}
                            // source={require('/storage/emulated/0/Android/data/com.sirdigitization/files/saved_signature/signature.png')}
                            />

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

          {tab == 'Customer Signature' && (
            <SafeAreaView
              //   showsVerticalScrollIndicator={true}
              // showsHorizontalScrollIndicator={false}
              style={styles.container3}>
              <View style={styles.container3}>


                <SignatureCapture
                  style={styles.signature}
                  ref={sign}
                  onSaveEvent={_onSaveEvent}
                  onDragEvent={_onDragEvent}
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode={'portrait'}
                />



                <View
                  style={{
                   marginTop: -55,
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


                      resetSign();

                    }}>


                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.submit}
                    >
                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}>Reset</Text>
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


                      saveSign();

                    }}>

                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.submit}
                    >
                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}>Save</Text>
                    </LinearGradient>



                  </TouchableOpacity>
                </View>





              </View>



            </SafeAreaView>
          )}


        </View>
      </View>
    </ScrollView>
  );
};

export default ApiScreenB40UnPlanned;

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

  footerInputPower: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 70,
    width: 400,
    // height: 200,

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
    width: 150
    // marginTop: -5,
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

  checkboxChecked: {
    backgroundColor: 'black',
  },

  checkboxInput: {
    flexDirection: "row",

    borderRadius: 7,
    fontSize: 16,
    marginLeft: 10,

  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',

    backgroundColor: 'black',//'transparent',

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },


  label: {
    margin: 8,
    fontSize: 16,
    color: 'black'
  },

  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'red',
    margin: 10,
  },

  signature: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 10,
    height: 535
  },
  buttonStyle: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'red',
    margin: 10,
  },
  preview: {
    width: 335,
    //height: 204,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginLeft: -100
  },
  previewText: {
    color: "red",
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
