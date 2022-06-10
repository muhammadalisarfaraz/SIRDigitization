/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  //  AsyncStorage,
  Switch,
  Image, ImageBackground,
  Picker,
  ScrollView,
  //CheckBox, 
  SafeAreaView,
  Platform,
  PermissionsAndroid, Pressable, Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';

import Moment from 'moment';
//import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/*import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
*/
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from 'react-native-input-spinner';
import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');
import Modal from 'react-native-modal';
import Geolocation from '@react-native-community/geolocation';
import Geolocation1 from 'react-native-geolocation-service';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
  Select
} from 'react-native-image-picker';

import ImageViewer from 'react-native-image-zoom-viewer';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
//import DropDownPicker from 'react-native-dropdown-picker';

// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import { cos, set } from 'react-native-reanimated';
function renderRow() {
  return (
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <Text>asd</Text>
      </View>{' '}
      {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
      <View style={{ flex: 1, alignSelf: 'stretch' }} />
      <View style={{ flex: 1, alignSelf: 'stretch' }} />
      <View style={{ flex: 1, alignSelf: 'stretch' }} />
      <View style={{ flex: 1, alignSelf: 'stretch' }} />
    </View>
  );
}

function New1({ navigation }) {


  const [name, setName] = useState('');
  const [PMT, setPMT] = useState('');
  const [DTSData, setDTSData] = useState([]);
  const [FeederData, setFeederData] = useState([]);
  const [PQCData, setPQCData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);
  const [SubProjectsData, setSubProjectsData] = useState([]);
  const [FilteredSubProjectsData, setFilteredSubProjectsData] = useState([]);
  const [FilteredDtsData, setFilteredDtsData] = useState([]);
  const [MaterialsData, setMaterialsData] = useState([]);
  const [MeterNoData, setMeterNoData] = useState([]);
  const [load, setLoad] = useState(false);
  const [storageLocationData, setStorageLocationData] = useState([]);
  const [TempMeterNoData, setTempMeterNoData] = useState([]);
  const [MeterNoDataShow, setMeterNoDataShow] = useState([]);
  const [MeterNoSelected, setMeterNoSelected] = useState([]);
  const [WbsData, setWbsData] = useState([]);
  const [ApproversData, setApproversData] = useState([]);
  const [userPassword, setUserPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFeeder, setSelectedFeeder] = useState('');
  const [selectedPQC, setSelectedPQC] = useState('');
  const [selectedWBS, setSelectedWBS] = useState('');
  const [selectedAprrover, setSelectedAprrover] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [reloadlist, setReloadList] = useState(false);
  const [selectedsub, setSelectedsub] = useState('');
  const [loader, setLoader] = useState(false);
  const [temptableData, settemptableData] = useState([], []);
  const [tableData, settableData] = useState([], []);
  const [meterData, setMeterData] = useState([], []);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);
  const [date, setDate] = useState('');



  const [savedList, setsavedList] = useState([]);


  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [FilteredWbsData, setFilteredWbsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [User, setUser] = useState({});
  const [Password, setPassword] = useState('');



  const [consumerDetailSceenLoader, setConsumerDetailSceenLoader] = useState(false);
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);


  const [KEaccountnumber, setKEaccountnumber] = useState('');
  const [contractnumberError, setcontractnumberError] = useState('');
  const [meternumberError, setmeternumberError] = useState('');



  const [contractnumber, setcontractnumber] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [dropdownRefresh, setDropdownRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [loadingindexerTextInput, setLoadingTextInput] = useState(false);
  const [error, setError] = useState('');
  const [keAccountError, setKeAccountError] = useState(false);


  const [safety, setsafety] = useState(false);
  const [sarbulandi, setsarbulandi] = useState(false);
  const [theft, settheft] = useState(false);
  const [azadi, setazadi] = useState(false);
  const [NewConnection_Conversion, setNewConnection_Conversion] = useState(false);
  const [ParkRenovation, setParkRenovation] = useState(false);
  const [DispensaryRenovation, setDispensaryRenovation] = useState(false);
  const [SchoolRenovation, setSchoolRenovation] = useState(false);
  const [DrinkingWater, setDrinkingWater] = useState(false);
  const [GarbageCleaning, setGarbageCleaning] = useState(false);
  const [AnyOther, setAnyOther] = useState('');





  const [OverBilling, setOverBilling] = useState(false);
  const [Disconnection, setDisconnection] = useState(false);
  const [PendingConnection, setPendingConnection] = useState(false);
  const [Anycomment, setAnycomment] = useState("");

  const [SafateyHazard, setSafateyHazard] = useState("");

  const [Others, setOthers] = useState(false);

  const [ReferredIBC, setReferredIBC] = useState(false);
  const [Remarks, setRemarks] = useState("");

  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']]; setUser
  const [selectedtype, setselectedtype] = useState(1);
  const [ActionType, setActionType] = useState("Offline Record");

  const [ConsumerName, setConsumerName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [Contact, setContact] = useState("");
  const [CompleteAddress, setCompleteAddress] = useState("");
  const [consumertype, setconsumertype] = useState(false);
  const [NCNIC, setNCNIC] = useState("");
  const [NContact, setNContact] = useState("");
  const [NCompleteAddress, setNCompleteAddress] = useState("");
  const [NMeter, setNMeter] = useState("");
  const [HookNo, setHookNo] = useState("");
  const [filterkey, setfilterkey] = useState("");

  const [NConsumertype, setNConsumertype] = useState(false);
  const [NConsumerName, setNConsumerName] = useState("");

  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Owner", selected: true },
    { id: 2, value: false, name: "Tenant", selected: false }
  ]);
  const [selectedtype1, setselectedtype1] = useState(1);
  //var data2 = [];
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);



  // const [modalVisible, setModalVisible] = useState(false);
  const [isLiked1, setIsLiked1] = useState([
    { id: 1, value: true, name: "Owner", selected: true },
    { id: 2, value: false, name: "Tenant", selected: false }
  ]);
  const [isSelected, setSelection] = useState(false);

  const [filePath, setFilePath] = useState([]);

  const [isImage, setIsImage] = useState("N");








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

  const [safetyhazarddropdown, setsafetyhazarddropdown] = useState([]);

  const [safetyhazarddata, setsafetyhazarddata] = useState([
    { id: 0, value: 'Damaged panels', name: 'Damaged panels' },
    { id: 1, value: 'Circuit breakers', name: 'Circuit breakers' },
    { id: 2, value: 'Portable cords', name: 'Portable cords' },
    { id: 3, value: 'Plugs', name: 'Plugs' },
    { id: 4, value: 'Electrical fittings', name: 'Electrical fittings' },


    { id: 5, value: 'power bars', name: 'power bars' },
    { id: 6, value: 'extension cords', name: 'extension cords' },
    { id: 7, value: 'Placing of halogen lights near cloths or curtains', name: 'Placing of halogen lights near cloths or curtains' },
    { id: 8, value: 'Exposed wiring of outlets and cords', name: 'Exposed wiring of outlets and cords' },
    { id: 9, value: 'Faulty wiring', name: 'Faulty wiring' },

    { id: 10, value: 'Unsafe use of electrical appliances', name: 'Unsafe use of electrical appliances' },
    { id: 11, value: 'Illegal hook connections', name: 'Illegal hook connections' },
    { id: 12, value: 'Unwarranted placement of TV and Internet cables on electricity poles', name: 'Unwarranted placement of TV and Internet cables on electricity poles' },
    { id: 13, value: 'HT Line or PMT adjacent to residence', name: 'HT Line or PMT adjacent to residence' }]
  );

  //console.log(setsafetyhazarddropdown);
  //console.log(safetyhazarddropdown);



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


  const captureImage = async (type) => {
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
      launchCamera(options, (response) => {
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

        //   const source = { uri: response.uri, url: response.uri };


        if (KEaccountnumber.length != 0) {
          setfilterkey(KEaccountnumber);
          filterkeyN = KEaccountnumber;
        }
        else if (HookNo.length != 0) {

          setfilterkey(HookNo);
          filterkeyN = HookNo;

        }
        else {
          setfilterkey(NMeter);
          filterkeyN = NMeter;

        }

        setIsImage("Y");

        // console.log("KEaccountnumber.length", KEaccountnumber.length);                             
        // console.log("setfilterkey", filterkeyN);                             

        // console.log("images", images);
        var Allimages = images;

        var vfilterkey = filterkey;
        //  console.log("Allimages", Allimages.fileName);
        //    console.log("response.assets[0].fileName",response.assets[0].fileName) ;
        //    console.log("base64: response.assets[0]",response.assets[0].base64);

        setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, filterkey: filterkeyN, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);







        setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, filterkey: filterkeyN, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);


        /*  seturi([{uri:response.assets[0].uri}]);
          seturl([{uri:response.assets[0].uri}]);
          setfileName([{fileName:response.assets[0].fileName}]);
          setbase64([{base64:response.assets[0].base64}]);
    */

        // console.log("data2", filePath);
        // setimageview(true);

        //setImages(filePath);
        //  console.log("images", images.fileName);


      });
    }
  };
  const carouselRef = useRef();
  const flatListRef = useRef();
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
    var filterkeyN;
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
      //console.log('base64 -> ', response.base64);
      //console.log('uri -> ', response.uri);
      //console.log('width -> ', response.width);
      //console.log('height -> ', response.height);
      //console.log('fileSize -> ', response.fileSize);
      //console.log('type -> ', response.type);
      //console.log('fileName -> ', response.fileName);

      if (KEaccountnumber.length != 0) {
        setfilterkey(KEaccountnumber);
        filterkeyN = KEaccountnumber;
      }
      else if (HookNo.length != 0) {

        setfilterkey(HookNo);
        filterkeyN = HookNo;

      }
      else {
        setfilterkey(NMeter);
        filterkeyN = NMeter;

      }

      setIsImage("Y");

      var Allimages = images;
      setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, filterkey: filterkeyN, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);

      setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, filterkey: filterkeyN, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);


    });
  };
  /* const images = [{
     // Simplest usage.
     //url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
     //width: 806,
      //   height: 720, 
     // width: number
     // height: number
     // Optional, if you know the image size, you can set the optimization performance
     // You can pass props to <Image />.
     props: {
         // headers: ...
     }
 }, {
    // url: '',
     props: {
         // Or you can set source directory.
      
         source:  (filePath) ,
         //index:  (indexer1) ,
         width: 806,
         height: 720, 
         
       //  source: require('..asset/karachi.png')
     }
 }]
 */
  //const [images, setImages] = useState([]);

  const { width } = Dimensions.get('window');
  const SPACING = 10;
  const THUMB_SIZE = 80;


  const [images, setImages] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);


  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true
    });
  };

  const CONTENT = [
    {
      title: 'Awareness/Advocacy',
      content:
        'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
      title: 'Privacy Policy',
      content:
        'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
      title: 'Return Policy',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
  ];

  //To make the selector (Something like tabs)
  const SELECTORS = [
    { title: 'Awareness/Advocacy', value: 0 },
    { title: 'Privacy Policy', value: 1 },
    { title: 'Return Policy', value: 2 },
    { title: 'Reset all' },
  ];


  const [activeSections, setactiveSections] = useState([]);
  //setactiveSections(false);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);

  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);

  };
  const toggleExpanded1 = () => {
    //Toggling the state of single Collapsible
    setCollapsed1(!collapsed1);
  };

  const toggleExpanded2 = () => {
    //Toggling the state of single Collapsible
    setCollapsed2(!collapsed2);

  };
  const toggleExpanded3 = () => {
    //Toggling the state of single Collapsible
    setCollapsed3(!collapsed3);
  };
  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center' }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };
  const SECTIONS = [
    {
      title: 'Awareness/Advocacy',
      content: 'hello',
    },
    {
      title: 'Development',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Complaints',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Referral',
      content: 'Lorem ipsum...',
    },
  ];
  const SIZE = 30;

  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );

    setselectedtype(item.id);
    setIsLiked(updatedState);

  };
  const onRadioBtnClick1 = (item) => {
    let updatedState = isLiked1.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );

    setselectedtype1(item.id);
    setIsLiked1(updatedState);

  };
  const RadioButton = ({ onPress, selected, children }) => {
    return (
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
          {selected ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.radioButtonText}>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const ENTRIES1 = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
  ];

  const [loation1, setlocation1] = useState("");
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


  useEffect(() => {
    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : {};
      // var datatable = [];
      //data[0].name=[0];
      setUser(data[0].name);



    });

    //navigation.Geolocation.getCurrentPosition()

    getUserCurrentLocation();

    //requestAuthorization();    

    /* Geolocation.getCurrentPosition(
       position => {
         const {latitude, longitude} = position.coords;
         setLocation({
           latitude,
           longitude,
         });
 
         console.log("position.coords.latitude", position.coords.latitude);
         console.log("position.coords.longitude", position.coords.longitude) ;
 
 
 
         setlatitude(position.coords.latitude);
         setlongitude(position.coords.longitude);
 
       },
       error => {
         console.log(error.code, error.message);
         
       },  
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000},
    
     );
  
      */

    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];
      //data[0].name=[0];
      setUser(data[0].name);
    });

    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data = items ? JSON.parse(items) : {};

      setsavedList(data);

    });




  }, []);




  function getKEAccountNo() {
    // console.log("*********************************INSIDE***********************************");
    setLoader(true);
    setConsumerDetailSceenLoader(true);
    var named = "'" + KEaccountnumber + "'";

    var a = '400000195128';



    RNFetchBlob.config({
      trusty: true, timeout: 100000,
    })
      .fetch(
        'GET',
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZENERGY_AUDIT_SRV_01/ZENERGY_AUDITSet(Ca=' + named + ')?$format=json',
        {
          // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setLoader(true);

        // setLoader(false);
        // setItems(res.values);

        let AccountDetail = res.d;

        //  console.log('Account Details',AccountDetail)

        let arr = [];

        arr.push({
          id: 1,
          Address: AccountDetail.Address,
          uri: AccountDetail.__metadata.uri,
          type: AccountDetail.__metadata.type,
          orgid: AccountDetail.__metadata.id,
          Name: AccountDetail.Name,
        });

        // alert(JSON.stringify(Vendors));



        setConsumerName(AccountDetail.Name);
        setCompleteAddress(AccountDetail.Address);
        setActionType("Online Record");

        // AsyncStorage.setItem('AccountDetail', JSON.stringify(arr));
        setConsumerDetailSceenLoader(false);

      })
      .catch(error => {

        setConsumerDetailSceenLoader(false);
        // console.log(error);
        // alert('Something went wrong! Please check internet connectivity.');
      });


  }

  const selection = [
    {
      name: 'Services',
      id: 'Services',
    },
    {
      name: 'Sub-Mains',
      id: 'Sub-Mains',
    },
  ];
  const element = (data, index, tableData, selectedsub) => (
    <TextInput
      keyboardType="number-pad"
      onChangeText={text => {
        var data = tableData;
        if (selectedsub == 'OMR') {
          data[index][4] = text;
        } else {
          data[index][3] = text;
        }
        settableData(data);
        // tableData[index][3] = text
      }}
    />
  );
  const searchFilterFunction = text => {
    setRefresh(true);
    if (text == '' || text == null) {
      setRefresh(true);
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);

      //console.log(text);
    }

    else {
      var arrayholder = temptableData;
      const newData = arrayholder.filter(item => {
        const itemData = `${item.Matnr.toUpperCase()} ${item.Maktx.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
  };
  const elementDropdown = (data, index, tableData, selectedsub, type) => (
    <Picker
      selectedValue={data[3]}
      style={{
        height: 50,
        width: 170,
        right: -100,
        position: 'absolute',
        zIndex: 20,
        fontSize: 9,
      }}

      itemStyle={{ backgroundColor: 'grey', color: 'blue', fontSize: 9 }}
      onValueChange={(itemValue, itemIndex) => {
        var data = tableData;
        // console.log(selection[itemIndex].label);
        // console.log(data[index][3]);
        data[index][3] = selection[itemIndex].label;
        settableData(data);
      }}>
      {selection.map(data => {
        return <Picker.Item label={data.label} value={data.value} />;
      })}
    </Picker>
  );

  const ShowMaxAlert = (EnteredValue) => {
    //alert(EnteredValue.text);
    var TextLength = EnteredValue.length.toString();

    if (TextLength < 12) {

      alert("Sorry, You have reached the maximum input limit.")
      // Put your code here which you want to execute when TextInput entered text reached to 10.

    }


  }

  const swiper = useRef(null);
  return (
    <View style={{ flex: 1, width: '100%' }}>


      <Swiper
        ref={swiper}
        style={styles.wrapper}
        dotColor={'transparent'}
        activeDotColor={'transparent'}
        keyboardShouldPersistTaps="handled"
        showsButtons={false}
        loop={false}
        // showsPagination={true}
        scrollEnabled={false}>
        <View style={styles.slide1}>

          <ImageBackground
            source={require('../assets/Pic4.jpg')}
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>


            <View style={{ width: '80%' }}>

              <View
                style={{
                  // marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>


                <View
                  style={{
                    height: 70,
                    width: '100%',
                    // position: 'absolute',
                    backgroundColor: ' rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                    Consumer Details
                  </Text>
                </View>



                <View
                  style={{
                    height: 50,
                    width: '100%',
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                </View>


                <View
                  style={{
                    height: 25,
                    width: '100%',
                    marginLeft: 80,
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(93,45,145,255)' }}>
                    KE Account Number
                  </Text>


                </View>

                <TextInput
                  // selectedValue={selectedFeeder}
                  keyboardType={'numeric'}
                  // KEaccountnumber={KEaccountnumber}
                  maxLength={12}
                  //  onBlur={text =>{text.}}
                  onFocus={() => setKeAccountError(false)}
                  onChangeText={text => {
                    if (text.length < 12) {
                      setKeAccountError(true);
                    }
                    else {
                      setKeAccountError(false);

                    }
                    setKEaccountnumber((text))
                  }
                  }

                  style={{
                    height: 50,
                    width: '76%',
                    fontSize: 16,
                    color: 'black',

                    borderBottomWidth: 0.8,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{ fontSize: 16, color: 'grey' }}
                />
                {keAccountError ?
                  <Text style={{ marginBottom: 50, color: 'red' }}>Account Number must be 12 digits</Text> : <Text></Text>}


                <View
                  style={{
                    height: 22,
                    width: '100%',
                    marginLeft: 80,
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(93,45,145,255)' }}>
                    Contract Number
                  </Text>


                </View>


                <TextInput
                  // selectedValue={selectedFeeder}
                  //value={PMT}
                  keyboardType={'numeric'}
                  maxLength={8}
                  //contractnumber={contractnumber}
                  onFocus={() => setcontractnumberError(false)}
                  onChangeText={text => {
                    if (text.length < 8) {
                      setcontractnumberError(true);
                    }
                    else {
                      setcontractnumberError(false);

                    }
                    setcontractnumber((text))
                  }
                  }
                  // onChangeText={text => setcontractnumber(text)}
                  // onFocus={text => setcontractnumber(ShowMaxAlert(text))}
                  style={{
                    height: 50,
                    width: '76%',
                    fontSize: 16,
                    color: 'black',
                    // marginBottom: 50,
                    borderBottomWidth: 0.8,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{ fontSize: 16, color: 'grey' }}
                />
                {contractnumberError ?
                  <Text style={{ marginBottom: 50, color: 'red' }}>Contract Number must be 8 digits</Text> : <Text></Text>}


                <View
                  style={{
                    height: 22,
                    width: '100%',
                    marginLeft: 80,
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(93,45,145,255)' }}>
                    Meter
                  </Text>


                </View>


                <TextInput style={{ color: 'black', height: 40, width: '100%' }}
                  maxLength={10}
                  onFocus={() => setmeternumberError(false)}
                  onChangeText={(text) => {
                    if (text.length != 0) {
                      var specials = /[*|\":<>[\]{}`\\()';@&$#!%*+=;'<>?/`~_]/;

                      if (specials.test(text)) {
                        setmeternumberError(true)
                        // alert(text.nativeEvent.key);


                        //alert("error");

                      }
                      else { setmeternumberError(false) }
                    }


                    setNMeter(text);


                  }}
                  /*onKeyPress = { (e) => { 
                    alert(e.nativeEvent.value)
                    if(enativeEvent === "^[a-zA-Z]+$") {
                        e.preventDefault(); 
                        e.stopPropagation();
                    }
                  } }*/
                  style={{
                    height: 50,
                    width: '76%',
                    fontSize: 16,
                    color: 'black',
                    // marginBottom: 50,
                    borderBottomWidth: 0.8,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{ fontSize: 16, color: 'grey' }}
                />

                {meternumberError ?
                  <Text style={{ marginBottom: 50, color: 'red' }}>Invalid Meter Number</Text> : <Text></Text>}

                <View
                  style={{
                    height: 20,
                    width: '100%',
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                </View>


                <View
                  style={{
                    height: 22,
                    width: '100%',
                    marginLeft: 80,
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(93,45,145,255)' }}>
                    Hook connection plate #
                  </Text>
                </View>


                <TextInput style={{ color: 'black', height: 40, width: '100%' }}

                  onChangeText={(text) => { setHookNo(text) }}
                  style={{
                    height: 50,
                    width: '76%',
                    fontSize: 16,
                    color: 'black',
                    // marginBottom: 50,
                    borderBottomWidth: 0.8,
                  }}
                  placeholder={'Enter Text'}
                  placeholderText={{ fontSize: 16, color: 'grey' }}
                />
                <View

                  style={{
                    height: 60,
                    width: '100%',
                    marginLeft: 80,
                    // position: 'absolute',
                    //padding:90,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>

                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      tintColors={{ true: 'black', false: 'grey' }}
                      buttonStyle={styles.checkboxBase}
                      activeButtonStyle={styles.checkboxChecked}
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}

                    //  backgroundColor="grey"
                    />
                    <Text style={styles.label}>New Record</Text>
                  </View>

                </View>

              </View>

            </View>


            <Text style={{ color: 'red' }}>{error}</Text>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // position: 'absolute',
                // bottom: 20,
              }}>
              <View />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setError('');

                  if (KEaccountnumber == '' && contractnumber == '' && HookNo == '' && NMeter == '') {
                    setError('Please enter values');
                    return false
                  }
                  else {

                    if (meternumberError == true) {
                      setError('Invalid Meter Number');
                      return false
                    }


                    if (KEaccountnumber.length > 0) {

                      if (contractnumber.length > 0) {


                        if (contractnumber.length < 8) {
                          return false
                        }
                        if (KEaccountnumber.length < 12) {
                          return false
                        }

                        if (KEaccountnumber.charAt(0) != '4') {
                          setError('Invalid Account Number');
                          return false
                        }
                        if (contractnumber.charAt(0) != '3') {
                          setError('Invalid Contract Number');
                          return false
                        }

                      }
                      else {
                        setError('Enter Contract Number');
                        return false
                      }

                    }





                    if (isSelected == false) {

                      getKEAccountNo();
                      setLoader(true);
                      setNCNIC("");
                      setNContact("");
                      setNCompleteAddress("");

                      setNConsumerName("");

                      swiper.current.scrollBy(1, true);
                      setError('');
                    }
                    else {



                      setActionType("New Record");
                      setLoader(true);
                      setConsumerName("");
                      setCNIC("");
                      setContact("");
                      setCompleteAddress("");

                      swiper.current.scrollBy(1, true);
                      setError('');
                    }

                  }

                  /*
                   
                   
                   if (KEaccountnumber.length>1 && contractnumber.length>1) {
                       
                      if (contractnumber.length<8)
                      {                  
                        return false
                      }
                      if (KEaccountnumber.length<12)
                      {                   
                        return false
                      }
                     
                    if (KEaccountnumber.charAt(0)!='4')
                    {
                      setError('Invalid Account Number');
                      return false
                    } 
                    if (contractnumber.charAt(0)!='3')
                    {
                      setError('Invalid Contract Number');
                      return false
                    } 
                    if (isSelected==false) {
                      
                      getKEAccountNo();
                      setLoader(true);
                      setNCNIC("");
                      setNContact("");
                      setNCompleteAddress("");
                       
                      setNConsumerName("");
  
                      swiper.current.scrollBy(1, true);
                      setError('');
                    }
                    else{
  
                      
                      
                      setActionType("New Record");
                      setLoader(true);
                      setConsumerName("");
                      setCNIC("");
                      setContact("");
                      setCompleteAddress("");
                       
                      swiper.current.scrollBy(1, true);
                      setError('');
                     } else 
                       {
                          setError('Enter Contract Number');
                    }
                  }
                   else {
                    setError('Enter KE Account Number');
  
  
                  }*/
                }}>
                <Text
                  style={{
                    color: 'rgba(93,45,145,255)',
                    fontSize: 16,
                  }}>
                  Next
                </Text>
                <Image
                  style={{ height: 28, width: 28 }}
                  source={require('../assets/next.png')}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>




        <View style={styles.slide3}>



          <View style={{ width: '80%' }}>




            <View
              style={{
                height: 2,
                // marginVertical: 14,
                width: '100%',
                // backgroundColor: 'rgba(0,0,0,0.1)',
              }}></View>



            {isSelected == true ? <ScrollView>

              <View
                style={{
                  // marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>

                <View
                  style={{
                    height: 70,
                    width: '100%',
                    // position: 'absolute',
                    backgroundColor: 'rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                    Consumer Details
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,

                    width: '90%',
                    marginTop: 20,
                  }}>

                  <View style={{ flexDirection: 'row', flex: 1, widht: '100%' }}>
                    <View style={{ flex: .75, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                        Consumer Name
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 2, widht: '100%' }}>
                    <TextInput
                      style={{ color: 'black', height: 40, width: '100%' }} placeholder={'Enter Cosumer Name'}
                      keyboardType={'email-address'}
                      placeholderTextColor='grey'
                      onChangeText={(text) => { setConsumerName(text) }}></TextInput>
                  </View>

                </View>

                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      CNIC #
                    </Text>
                  </View>
                  <View style={{ flex: 1, widht: '100%' }}>
                    <TextInput style={{ color: 'black', height: 40, width: '100%' }} placeholder={'Enter CNIC #'}
                      keyboardType={'numeric'}
                      // KEaccountnumber={KEaccountnumber}
                      maxLength={13}
                      //

                      placeholderTextColor='grey'
                      onChangeText={(text) => { setCNIC(text) }}>



                    </TextInput>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Contact #
                    </Text>
                  </View>
                  <View style={{ flex: 1, widht: '100%' }}>
                    <TextInput
                      keyboardType={'numeric'}
                      // KEaccountnumber={KEaccountnumber}
                      maxLength={11}
                      //
                      style={{ color: 'black', height: 40, width: '100%' }} placeholder={'Enter Contact #'}
                      placeholderTextColor='grey'
                      onChangeText={(text) => { setContact(text) }}></TextInput>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>


                <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Complete Address
                    </Text>
                  </View>
                  <View style={{ flex: 1, widht: '100%' }}>
                    <TextInput style={{ color: 'black', height: 40, width: '100%' }} placeholder={'Enter Complete Address'}
                      placeholderTextColor='grey'
                      onChangeText={(text) => { setCompleteAddress(text) }}></TextInput>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '88%', display: 'none' }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Meter #
                    </Text>
                  </View>
                  <View style={{ flex: 1, widht: '100%' }}>
                    <TextInput style={{ color: 'black', height: 40, width: '100%' }} placeholder={'Enter Meter #'}
                      placeholderTextColor='grey'
                      onChangeText={(text) => { setNMeter(text) }}></TextInput>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                    display: 'none'
                  }}></View>



                <View style={{ flexDirection: 'row', flex: 1, width: '88%', display: 'none' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Consumer type
                    </Text>
                  </View>
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <Switch
                      value={NConsumertype}
                      onValueChange={() => {

                        setNConsumertype(!NConsumertype)

                      }}></Switch>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Consumer type
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 2.5, width: '50%' }}>
                    {isLiked.map((item) => (
                      <RadioButton
                        onPress={() => onRadioBtnClick(item)}
                        selected={item.selected}
                        key={item.id}
                        labelStyle={{ paddingLeft: 5 }}
                      >
                        {item.name}

                      </RadioButton>
                    ))}
                  </View>
                </View>

              </View>
            </ScrollView> :
              <ScrollView>
                {consumerDetailSceenLoader ?
                  <ActivityIndicator size='large'></ActivityIndicator> : <View></View>}
                <View
                  style={{
                    // marginTop: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>

                  <View
                    style={{
                      height: 70,
                      width: '100%',
                      // position: 'absolute',
                      backgroundColor: 'rgba(93,45,145,255)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                      Consumer Details
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      width: '88%',
                      marginTop: 20,
                    }}>
                    <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>Consumer Name  </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <Text>{ConsumerName}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      marginVertical: 14,
                      width: '90%',
                      backgroundColor: 'black',
                    }}></View>
                  <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                    <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>CNIC # </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <Text>{/*{this.props.item.ClusterReg}*/}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      marginVertical: 14,
                      width: '90%',
                      backgroundColor: 'black',
                    }}></View>

                  <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                    <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>Contact # </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <Text>{/*{this.props.item.ClusterReg}*/}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      marginVertical: 14,
                      width: '90%',
                      backgroundColor: 'black',
                    }}></View>


                  <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                    <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>Complete Address </Text>
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <Text>{CompleteAddress}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      marginVertical: 14,
                      width: '90%',
                      backgroundColor: 'black',
                    }}></View>


                  <View style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                        Consumer type
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 2.5, width: '50%' }}>
                      {isLiked.map((item) => (
                        <RadioButton styles={{ color: 'rgba(93,45,145,255)', backgroundColor: 'black' }}
                          onPress={() => onRadioBtnClick(item)}
                          selected={item.selected}
                          key={item.id}
                        >
                          {item.name}
                        </RadioButton>
                      ))}
                    </View>
                  </View>


                </View>
              </ScrollView>}


          </View>
          <View
            style={{
              height: 0.5,
              width: '70%',
              backgroundColor: 'black',
              marginVertical: 20,
            }}
          />

          <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>


          <View
            style={{
              // position: 'absolute',
              // top: 20,
              backgroundColor: '#FFFFFF',
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                swiper.current.scrollBy(-1, true);
                setError('');
              }}>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../assets/previous.png')}
              />
              <Text
                style={{
                  color: 'rgba(93,45,145,255)',
                  fontSize: 16,
                }}>
                Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {



                if (isSelected) {
                  if (ConsumerName) {
                    if (Contact.length == 0 || Contact.length == 11) {
                      if (CNIC.length == 0 || CNIC.length == 13) {

                        swiper.current.scrollBy(1, true);
                        setError('');
                      }
                      else {
                        setError('Invalid CNIC Number');
                      }
                    }
                    else {
                      // console.log(Contact.length);
                      setError('Invalid Contact Number');
                    }
                  }
                  else {
                    // console.log(Contact.length);
                    setError('Enter Consumer Name');
                  }


                }
                else {

                  if (ConsumerName) {
                    swiper.current.scrollBy(1, true);
                    setError('');
                  }
                  else {
                    setError('Enter Consumer Name');
                  }

                }

              }}>
              <Text
                style={{
                  color: 'rgba(93,45,145,255)',
                  fontSize: 16,
                }}>
                Next
              </Text>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../assets/next.png')}
              />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.slide2}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            viewIsInsideTabBar={true}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <View style={{ width: '80%', marginTop: 30 }}>







              <TouchableOpacity onPress={toggleExpanded}>

                <View
                  style={{
                    height: 70,
                    width: '100%',
                    backgroundColor: 'rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                    Awareness/Advocacy
                  </Text>

                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapsed} align="center">
                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Safety{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}

                      // disabled={this.state.SwitchDisabled}
                      value={safety}
                      onValueChange={() => {
                        setsafety(!safety)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>


                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Sarbulandi{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={sarbulandi}
                      onValueChange={() => {
                        setsarbulandi(!sarbulandi)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Azadi{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={azadi}
                      onValueChange={() => {
                        setazadi(!azadi)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      New Connection/Conversion{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={NewConnection_Conversion}
                      onValueChange={() => {
                        setNewConnection_Conversion(!NewConnection_Conversion)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>


                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Theft{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={theft}
                      onValueChange={() => {
                        settheft(!theft)
                      }}></Switch>
                  </View>
                </View>










              </Collapsible>
              <View style={styles.containerscr4}>
              </View>
              <TouchableOpacity onPress={toggleExpanded1}>

                <View
                  style={{
                    height: 70,
                    width: '100%',
                    backgroundColor: 'rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                    Development
                  </Text>

                </View>

              </TouchableOpacity>

              <Collapsible collapsed={collapsed1} align="center" >
                <View style={{ flexDirection: 'row', flex: 1, width: '96%', marginTop: 40 }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Park Renovation{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={ParkRenovation}
                      onValueChange={() => {
                        setParkRenovation(!ParkRenovation)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>




                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Dispensary Renovation{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={DispensaryRenovation}
                      onValueChange={() => {
                        setDispensaryRenovation(!DispensaryRenovation)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      School Renovation{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={SchoolRenovation}
                      onValueChange={() => {
                        setSchoolRenovation(!SchoolRenovation)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Drinking Water{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={DrinkingWater}
                      onValueChange={() => {
                        setDrinkingWater(!DrinkingWater)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>


                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Garbage Cleaning{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={GarbageCleaning}
                      onValueChange={() => {
                        setGarbageCleaning(!GarbageCleaning)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>


                <View style={{ flexDirection: 'row', flex: 1, width: '96%', marginBottom: 50 }}>


                  <TextInput
                    style={{ color: 'black', height: 40, width: '100%' }} placeholder={'please specify'}

                    placeholderTextColor='black'

                    onChangeText={(text) => { setAnyOther(text) }}></TextInput>

                </View>

              </Collapsible>
              <View style={styles.containerscr4}>
              </View>

              <TouchableOpacity onPress={toggleExpanded2}>


                <View
                  style={{
                    height: 70,
                    width: '100%',
                    backgroundColor: 'rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                    Complaints
                  </Text>


                </View>

              </TouchableOpacity>

              <Collapsible collapsed={collapsed2} align="center">



                <View style={{ flexDirection: 'row', flex: 1, width: '96%', marginTop: 60 }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Over Billing{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={OverBilling}
                      onValueChange={() => {
                        setOverBilling(!OverBilling)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Disconnection {' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}

                      value={Disconnection}
                      onValueChange={() => {
                        setDisconnection(!Disconnection)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Pending Connection{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={PendingConnection}
                      onValueChange={() => {
                        setPendingConnection(!PendingConnection)
                      }}></Switch>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    marginVertical: 14,
                    width: '100%',
                    backgroundColor: 'black',
                  }}></View>




                <View style={{ flexDirection: 'row', flex: 1, width: '96%', marginBottom: 75 }}>


                  <TextInput
                    multiline={true}
                    placeholder={'please specify'}
                    placeholderTextColor='black'

                    onChangeText={(text) => { setAnycomment(text) }}
                    style={{
                      height: 100,
                      width: '100%',
                      borderWidth: 0.75,
                      textAlign: 'left',
                      textAlignVertical: 'top',
                      color: 'black'
                    }}>


                  </TextInput>
                </View>





              </Collapsible>
              <View style={styles.containerscr4}>
              </View>
              <TouchableOpacity onPress={toggleExpanded3}>



                <View
                  style={{
                    height: 70,
                    width: '100%',
                    backgroundColor: 'rgba(93,45,145,255)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                    Referral
                  </Text>


                </View>



              </TouchableOpacity>

              <Collapsible collapsed={collapsed3} align="center"
              >

                <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                  <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                      Referred IBC{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                    <Switch
                      trackColor={{ true: 'grey', false: 'grey' }}
                      thumbColor={[(item.status ? '#7ab8e1' : 'rgba(192,144,194,255)')]}
                      value={ReferredIBC}
                      onValueChange={() => {
                        setReferredIBC(!ReferredIBC)
                      }}></Switch>
                  </View>
                </View>
              </Collapsible>




              <View style={{ width: '100%' }}>
                <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                </Text>

                <View style={{ width: '50%' }}>



                </View>
              </View>






              <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  flexDirection: 'row',
                  marginVertical: 2,
                  paddingHorizontal: 20,
                  backgroundColor: 'rgba(93,45,145,255)',
                  // backgroundColor: isActive
                  //   ? 'rgba(255,255,255,1)'
                  //   : 'rgba(245,252,255,1)',
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                  Photos of Surveyed Meter
                </Text>
                <Text></Text>
              </Animatable.View>

              <View
                style={{
                  width: '100%',
                  padding: 20,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 0.5 }}>

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
                      color: 'rgba(93,45,145,255)'

                    }}>
                    tap the picture from gallery
                  </Text>
                </View>
                <View
                  style={{ height: 80, width: 1, backgroundColor: 'black' }}></View>
                <View
                  style={{ flex: 0.5, paddingHorizontal: 10, alignItems: 'center' }}>


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
                              style={{ height: 120, width: 120 }}></Image>
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
                              width: 120,
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

                    sliderWidth={150}
                    itemWidth={120}
                    onSnapToItem={index => onSelect(index)}

                  />

                  <Pagination
                    inactiveDotColor='gray'
                    dotColor={'orange'}
                    activeDotIndex={indexSelected}
                    dotsLength={images.length}
                    animatedDuration={150}
                    inactiveDotScale={1}
                  />




                  <TouchableOpacity
                    style={{ marginTop: 15 }}

                    onPress={() => captureImage('photo')

                    }>
                    <Image
                      source={require('../assets/camera.png')}// source={{uri: filePath.uri}}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>


                  {/*  <TouchableOpacity
           activeOpacity={0.5}
           style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>
            Launch Camera for Video
          </Text>
        </TouchableOpacity> 
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>*/}

                  <Text
                    style={{
                      fontSize: 11,
                      marginTop: 4,
                      textAlign: 'center',
                      width: 120,
                      textAlignVertical: 'center',
                      color: 'rgba(93,45,145,255)'
                    }}>
                    tap the camera to take a picture
                  </Text>
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

              </View>
              <View>

              </View>
              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  width: '100%',
                  backgroundColor: 'black',
                }}></View>


              <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
                <View style={{ flex: 0.61, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)', marginTop: 15 }}>
                    Safety Hazards  {' '}
                  </Text>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', width: '80%' }}>

                    <SearchableDropdown
                      onItemSelect={item => {
                        //  alert(JSON.stringify(item));
                        //  console.log("item", item);
                        setsafetyhazarddropdown(item);
                      }}
                      // onRemoveItem={(item, index) => {
                      //   setSelectedFeeder(null);
                      // }}
                      selectedItems={safetyhazarddropdown}
                      multi={false}
                      containerStyle={{ padding: 5 }}
                      itemStyle={{
                        padding: 3,
                        marginTop: 2,
                        height: 25,
                        width: 187,
                        backgroundColor: '#ddd',
                        borderColor: 'black',
                        borderWidth: 0.8,
                        // borderRadius: 5,
                      }}
                      itemTextStyle={{ color: 'black', fontSize: 14 }}
                      itemsContainerStyle={{ maxHeight: 80 }}
                      items={safetyhazarddata}
                      // defaultIndex={2}
                      resetValue={false}
                      textInputProps={{
                        placeholder: 'Select Safety Hazard',
                        underlineColorAndroid: 'transparent',
                        placeholderTextColor: 'grey',
                        //height:150,
                        style: {
                          // padding: 12,
                          width: 187,
                          borderWidth: 0.8,
                          height: 50,
                          color: 'black',

                          //borderColor: '#F6921E',
                          //backgroundColor: 'rgba(246,146,30,0.1)',
                          borderRadius: 4,
                          fontSize: 16,
                          // borderRadius: 5,
                        },
                        // onTextChange: text => alert(text)
                      }}
                      listProps={{
                        nestedScrollEnabled: true,
                      }}
                    />

                  </View>
                </View></View>

              <View
                style={{
                  height: 1,
                  marginVertical: 10,
                  width: '100%',
                  backgroundColor: 'black',
                }}></View>


              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal', color: 'rgba(93,45,145,255)' }}>
                    Remarks{' '}
                  </Text>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    alignSelf: 'center',
                  }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>

                    <TextInput
                      multiline={true}
                      onChangeText={(text) => { setRemarks(text) }}
                      placeholder={'Any comment (if required)'}
                      placeholderTextColor='black'

                      style={{
                        height: 150,
                        width: '100%',
                        borderWidth: 0.75,
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        color: 'black'
                      }}>



                    </TextInput>
                  </View>
                </View></View>


              <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>

              <View
                style={{
                  marginTop: 20,
                  // marginBottom: 20,
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    swiper.current.scrollBy(-1, true);
                  }}>
                  <Image
                    style={{ height: 28, width: 28 }}
                    source={require('../assets/previous.png')}
                  />
                  <Text
                    style={{
                      color: 'rgba(93,45,145,255)',
                      fontSize: 16,
                    }}>
                    Prev
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(93,45,145,255)',
                    padding: 15
                  }}
                  onPress={() => {
                    // setUploadingMsg(res.d.Return);


                    setAuthModalVisible(!isAuthModalVisible);

                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                    }}>
                    Submit
                  </Text>

                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAwareScrollView>
        </View>


      </Swiper>
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

          <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
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
        style={{ alignItems: 'center', justifyContent: 'center' }}
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
          <Text style={{ color: 'rgba(93,45,145,255)', fontSize: 24, fontWeight: 'bold' }}>
            Success
          </Text>

          <Text style={{ color: 'green', fontSize: 16, textAlign: 'center' }}>
            {uploadingMsg == '' ? 'Saved Successfully' : uploadingMsg}
          </Text>

          <Button
            title="Close"
            color="green"
            onPress={() => {
              setSuccessModalVisible(!isSuccessModalVisible);
              setError('');
              // setTimeout(() => {
              navigation.goBack();
              // }, 1000);
            }}
          />
        </View>
      </Modal>
      <Modal
        style={{ alignItems: 'center', justifyContent: 'center' }}
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
          <Text style={{ color: 'green', fontSize: 24, fontWeight: 'bold' }}>
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
                // getUserCurrentLocation();
                var filterkeyN;

                setLoader(true);

                //alert(safetyhazarddropdown.id);


                AsyncStorage.getItem('User').then(items => {
                  var data = items ? JSON.parse(items) : {};

                  // var datatable = [];






                  if (KEaccountnumber.length != 0) {
                    setfilterkey(KEaccountnumber);
                    filterkeyN = KEaccountnumber;

                  }
                  else if (HookNo.length != 0) {
                    setfilterkey(HookNo);
                    filterkeyN = HookNo;
                  }
                  else {
                    setfilterkey(NMeter);
                    filterkeyN = NMeter;
                  }

                  let saf = safetyhazarddropdown.id;
                  if (saf != null) {
                    saf = saf.toString();
                  //  console.log("saf", saf);
                  }
                  //console.log("images", images);
                  /* if (images.length >= 1) {
                     AsyncStorage.getItem('RoshniBajiimages')
                       .then(items => {
                         var data2 = [];
                         var data3 = images;
                         data2 = items ? JSON.parse(items) : [];                     
                         data2 = [
                           ...data2,
                           {
                             data3,
 
                           },
                         ];
                         AsyncStorage.setItem('RoshniBajiimages', JSON.stringify(data2));
 
                        
                       });
                     
                   }
                  */


                  AsyncStorage.getItem('RoshniBajiA')
                    .then(items => {
                      var data1 = [];

                      data1 = items ? JSON.parse(items) : [];

                      data1 = [
                        ...data1,
                        {

                          UserID: data[0].name,
                          PlanDateTime: data[0].PlanDateTime,
                          LoginDate: data[0].loginDate,
                          SDate: Moment(Date.now()).format('YYYY-MM-DD'),
                          KEaccountnumber1: KEaccountnumber,
                          contractnumber1: contractnumber,
                          NMeter1: NMeter,
                          CNIC1: CNIC,
                          CompleteAddress1: CompleteAddress,
                          Consumertype1: selectedtype == 1 ? "Owner" : "Tenant",
                          ConsumerName1: ConsumerName,
                          Contact1: Contact,
                          ActionType1: ActionType,
                          safety: safety == true ? "YES" : "NO",
                          sarbulandi: sarbulandi == true ? "YES" : "NO",
                          azadi: azadi == true ? "YES" : "NO",
                          NewConnection_Conversion: NewConnection_Conversion == true ? "YES" : "NO",
                          theft: theft == true ? "YES" : "NO",
                          ParkRenovation: ParkRenovation == true ? "YES" : "NO",
                          DispensaryRenovation: DispensaryRenovation == true ? "YES" : "NO",
                          SchoolRenovation: SchoolRenovation == true ? "YES" : "NO",
                          DrinkingWater: DrinkingWater == true ? "YES" : "NO",
                          GarbageCleaning: GarbageCleaning == true ? "YES" : "NO",
                          AnyOther: AnyOther,
                          OverBilling: OverBilling == true ? "YES" : "NO",
                          Disconnection: Disconnection == true ? "YES" : "NO",
                          PendingConnection: PendingConnection == true ? "YES" : "NO",
                          Anycomment: Anycomment,
                          ReferredIBC: ReferredIBC == true ? "YES" : "NO",
                          Remarks: Remarks,
                          longitude1: longitude1,
                          latitude1: latitude1,
                          safetyhazards: safetyhazarddropdown.name,
                          safetyhazardsid: saf,

                          HookPlateNo: HookNo,
                          Area: data[0].RBArea,
                          RoleName: data[0].RoleName,
                          filterkey: filterkeyN,
                          Status: 'Pending',
                          IBC: data[0].IBC,
                          MobileID: data[0].MobileID,
                          RoshniBajiWebID: "",
                          ImageFlag: isImage,
                          HazardImages: images


                        },
                      ];



                      AsyncStorage.setItem('RoshniBajiA', JSON.stringify(data1)).then(() => {





                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Menu' }],
                        });
                        //                          console.log("DAta1", data1);
                        setRefresh(true);
                        setReloadList(true);
                        // swiper.current.scrollBy(1, true);
                        setTimeout(() => {
                          setRefresh(false);
                          setReloadList(false);
                        }, 1000);

                      });

                    });

                });


                //navigation.goBack();  
                setRefresh(true);
                setReloadList(true);
                // swiper.current.scrollBy(1, true);
                setTimeout(() => {
                  setRefresh(false);
                  setReloadList(false);
                }, 1000);

                setAuthModalVisible(!isAuthModalVisible);

                setSuccessModalVisible(!isSuccessModalVisible);









              }}
            // }
            />

            <Button
              title=" No "
              color="red"
              onPress={() => {
                setAuthModalVisible(!isAuthModalVisible);
                // setError('');
                // navigation.goBack();
              }}
            />
          </View>
        </View>
      </Modal>





    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  containerscr4: { flex: 1, padding: 1, paddingTop: 2, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, fontSize: 10 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },

  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
    color: '#1191D0',
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
    width: '80%',
    backgroundColor: 'lightgrey',
    // borderRadius: 25,
    height: 50,
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
  forgot: {
    color: '#1191D0',
    fontSize: 11,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '45%',
    backgroundColor: '#1191D0',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  checkboxChecked: {
    backgroundColor: 'black',
  },

  appContainer: {
    flex: 1,
    alignItems: 'center',
  },

  appTitle: {
    marginVertical: 16,
    fontWeight: 'bold',
    fontSize: 24,

  },
  checkboxInput: {
    flexDirection: "row",

    borderRadius: 7,
    fontSize: 16,
    marginLeft: 10
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
    color: 'rgba(93,45,145,255)'
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 45
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(93,45,145,255)",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "rgba(93,45,145,255)"
  },
  radioButtonText: {
    fontSize: 14,
    marginLeft: 2,
    fontWeight: 'normal',
    color: 'rgba(93,45,145,255)'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingVertical: 20,
  },
  textStyle: {
    // padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    // padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 50,
    height: 50,
    // margin: 5,
  },

  imageViewerStyle: {
    width: '100px',
    height: '100px',
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    height: 10,
    width: 10
  },
  modalView: {
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },



  wrapDropDownHeader: {
    paddingHorizontal: 15,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Acdtitle: {
    width: 50,
  },


  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },


  item: {
    width: 60,
    height: 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

});

export default New1;
