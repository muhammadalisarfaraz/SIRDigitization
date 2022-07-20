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
    Provider, DefaultTheme, configureFonts,
    Appbar,
    Card,
    IconButton,
    Avatar,
    DataTable,
    Colors,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import ImageViewConsumer from 'react-native-image-viewing';
import Geolocation from '@react-native-community/geolocation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//import CheckBox from '@react-native-community/checkbox';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';



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

let current = 100;
const ApiScreenA40 = ({ navigation }) => {
    const scrollRef = useRef(null);
    const [pos, setPos] = React.useState(0);
    const [tab, setTab] = useState('Consumer Detail');
    const [loader, setLoader] = useState(false);
    const sign = createRef();
    const [signaturePreview, setSign] = useState(null);

    const saveSign = () => {
        sign.current.saveImage();
    };
    const resetSign = () => {
        sign.current.resetImage();
        setSignModalVisible(!isSignModalVisible);

        setTimeout(() => {
            setSign();
            setIsSignature("N");
        }, 1000);
    };
    const _onSaveEvent = (result) => {
        // alert('Signature Captured Successfully');
        setSign(result.encoded);
        let consSign = result.encoded;
        setIsSignature("Y");
        setConsumerSignature([{ consSign }]);
        setSignModalVisible(!isSignModalVisible);
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


    const [checkBoxselectedList, setcheckBoxSelectedList] = useState([])
    const [selectedList, setSelectedList] = useState([])
    const [checkBoxList, setCheckBoxList] = useState([
        {
            name: "FMR to be Issued", // label for checkbox item
            value: 1,
            ischeck: false
        },
        {
            name: "Meter Installed Outside",
            value: 2,
            ischeck: false
        },
        {
            name: "Consumer has Stand By Generator",
            value: 3,
            ischeck: false
        },
        {
            name: "EIK Permission Available",
            value: 4,
            ischeck: false
        },
        {
            name: "Energy Meter Installed on Generator", // label for checkbox item
            value: 5,
            ischeck: false
        },

    ])

    let onSelectCheckBox = (name, id) => {
        setcheckBoxSelectedList([{ name }, ...checkBoxselectedList]);

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
    const [isSelecteditems, setIsSelecteditems] = useState("N");

    let onSelectedItemsChange = selectedItems => {
        console.log("selectedItems", selectedItems);
        if (selectedItems.length > 5) {
            return;
        } else {
            setSelectedItems(selectedItems);
            setIsSelecteditems("Y");
        }
    };

    const [list, setList] = useState([
        {
            id: 1,
            name: 'Consumer Detail',
            active: true,
        },


        {
            id: 3,
            name: 'Status of Postal Order/Seal',
            active: false,
        },
        {
            id: 4,
            name: 'Testing By Time Power Method',
            active: false,
        },
        {
            id: 2,
            name: 'Metering Equipment Detail',
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


    ]);


    const [apiRes, setApiRes] = useState([]);
    const [filePath, setFilePath] = useState([]);
    const [images, setImages] = useState([]);
    const [filePath1, setFilePath1] = useState([]);
    const [consumerImages, setConsumerImages] = useState([]);
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

    /* Power Meter ------------ End */

    /* Testing By Time Power Method ------------ Start */
    const [currentAmp, setCurrentAmp] = useState("");
    const [voltageKV, setVoltageKV] = useState("");
    const [powerFactor, setPowerFactor] = useState("");
    const [kto, setKto] = useState("");
    const [perError, setPerError] = useState("");

    const [powerCalculated, setPowerCalculated] = useState("");
    const [powerObserved, setPowerObserved] = useState("");




    /* Testing By Time Power Method ------------ End */
    /* Meter Testing Result ------------ Start */
    const [meterTestingResultTC, setMeterTestingResultTC] = useState("");
    const [meterTestingperError, setMeterTestingperError] = useState("");
    const [meterTestingTo, setMeterTestingTo] = useState("");
    const [meterInstalled1, setMeterInstalled1] = useState("");
    const [meterInstalled2, setMeterInstalled2] = useState("");
    const [meterInstalled, setMeterInstalled] = useState("");
    const [meterInstalled3, setMeterInstalled3] = useState("");

    const [fmrNo, setFMRNo] = useState("");

    /* Meter Testing Result ------------ End */



    /* Discrepancy and Findings ------------ Start */

    const [discrepancyfindingsRemarks, setdiscrepancyfindingsRemarks] = useState("");
    /* Discrepancy and Findings ------------ End */

    /* Customer Acknowlegment ------------ Start */

    const [consumerName, setConsumerName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [consumerNameCNIC, setconsumerNamecNIC] = useState("");
    const [consumerRemarks, setConsumerRemarks] = useState("");
    const [consumerRefuseYN, setConsumerRefuseYN] = useState("");
    const [consumerSign, setConsumerSign] = useState("");

    /* Customer Acknowlegment ------------ End */

    const [SIR, setSIR] = useState("900000000335");
    const [cosnumerno, setCosnumerno] = useState("LA414951");

    const [clusterIBC, setClusterIBC] = useState("C1 / F.B.Area");
    const [consumernameBilling, setConsumernameBilling] = useState("Syed M. Shoaib");


    const [accountno, setAccountno] = useState("400001061656");
    const [address, setAddress] = useState("Flat No. D-8, Anarkali Flat, Block-16, F.B.Area");

    const [assigndate, setAssigndate] = useState("20.02.2022");
    const [assignto, setAssignto] = useState("80012790 - Syed M. Shoaib");

    const [isModalVisible, setModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isAuthModalVisible, setAuthModalVisible] = useState(false);
    const [isSignModalVisible, setSignModalVisible] = useState(false);
    const [error, setError] = useState('');
    const [uploadingMsg, setUploadingMsg] = useState('');

    const [consumerSignature, setConsumerSignature] = useState([]);
    const [isSignature, setIsSignature] = useState("N");

    const [ispostalOrderSeal, setIspostalOrderSeal] = useState("N");
    const [ismeteringEquipment, setIsmeteringEquipment] = useState("N");



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

    const widerCell = {

        // width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        backgroundColor: '#8C52FF',
        color: 'black',
        borderColor: '#fff'
    };
    const meteringEquipCell = {

        // width: 300,
        marginLeft: 10,
        minWidth: 70,
        borderRightWidth: 2,
        height: 45,
        borderColor: 'white'
    };
    const meteringEquipCelltext = {

        color: 'white',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 14
    };
    const meteringEquipCellvalue = {

        // width: 300,
        marginLeft: 10,
        minWidth: 100,
        borderRightWidth: 2,
        height: 45,
        borderColor: 'white'
    };




    const theme = {
        ...DefaultTheme,

        animation: {
            scale: 1.0,
        },
        roundness: 4,
        colors: {
            ...DefaultTheme.colors,
            text: 'white',
        },

    };

    const borderCell = {

        minWidth: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        fontWeight: 'bold',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50


    };


    const borderCell1 = {
        borderRightWidth: 2,
        // minWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        borderRightColor: 'white',
        height: 50

    };

    const dataCell1 = {
        borderWidth: .5,
        minWidth: 112,
        padding: 3,
        marginLeft: -20,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const dataCell2 = {
        borderWidth: .5,
        minWidth: 122,
        padding: 3,
        // marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell3 = {
        borderWidth: .5,
        minWidth: 142,
        padding: 3,
        // marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell4 = {
        borderWidth: .5,
        minWidth: 163,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell5 = {
        borderWidth: .5,
        minWidth: 117,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell6 = {
        borderWidth: .5,
        minWidth: 167,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };

    const borderCell2 = {

        minWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50

    };



    const borderCell3 = {

        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
    };
    const borderCell4 = {

        minWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
    };
    const borderCell5 = {

        minWidth: 58,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
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
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");


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
                    setConsumerImages([{ uri: response.path, url: response.path, fileName: 'consumerImage.jpg', base64: response.data }]);

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
        { id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: '' },
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


    const [postalOrderSeal, setPostalOrderseal] = useState([
        {
            id: Date.now(), Meter: 'KWH', MainCover: '', TerminalCover: '', Chamber: '', PTfuse: '', PanelDoor: '', MainCoverPlate: ''
        },
        { id: Date.now(), Meter: 'KVARH', MainCover: '', TerminalCover: '', Chamber: '', PTfuse: '', PanelDoor: '', MainCoverPlate: '' },
        { id: Date.now(), Meter: 'Light Meter', MainCover: '', TerminalCover: '', Chamber: '', PTfuse: '', PanelDoor: '', MainCoverPlate: '' },

    ]);


    const updateMainCover = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], MainCover: text };
        setPostalOrderseal(newArray);
    };

    const updateTerminalCover = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], TerminalCover: text };
        setPostalOrderseal(newArray);
    };

    const updateChamber = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], Chamber: text };
        setPostalOrderseal(newArray);
    };

    const updatePTfuse = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], PTfuse: text };
        setPostalOrderseal(newArray);
    };

    const updatePanelDoor = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], PanelDoor: text };
        setPostalOrderseal(newArray);
    };

    const updateCoverPlate = (text, index) => {
        let newArray = [...postalOrderSeal];
        newArray[index] = { ...newArray[index], MainCoverPlate: text };
        setPostalOrderseal(newArray);
    };

    const [meteringEquipment, setMeteringEquipment] = useState([
        { id: Date.now(), Register: 'K1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },
        { id: Date.now(), Register: 'P1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },
        { id: Date.now(), Register: 'R1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },
        { id: Date.now(), Register: 'X1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },
        { id: Date.now(), Register: 'K1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },
        { id: Date.now(), Register: 'S1', KENo: '', Reading: '', MF: '', MDI: '', Make: '', MC: '', MeterCTratio1: '', MeterCTratio2: '', BlngMode: '', Remarks: '' },

    ]);

    const updateRemarks = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], Remarks: text };
        setMeteringEquipment(newArray);
    };


    const updateMeterCTratio1 = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], MeterCTratio1: text };
        setMeteringEquipment(newArray);
    };
    const updateMeterCTratio2 = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], MeterCTratio2: text };
        setMeteringEquipment(newArray);
    };
    const updateBlngMode = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], BlngMode: text };
        setMeteringEquipment(newArray);
    };


    const updateMDI = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], MDI: text };
        setMeteringEquipment(newArray);
    };
    const updateMake = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], Make: text };
        setMeteringEquipment(newArray);
    };
    const updateMC = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], MC: text };
        setMeteringEquipment(newArray);
    };




    const updateKENo = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], KENo: text };
        setMeteringEquipment(newArray);
    };
    const updateReading = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], Reading: text };
        setMeteringEquipment(newArray);
    };
    const updateMF = (text, index) => {
        let newArray = [...meteringEquipment];
        newArray[index] = { ...newArray[index], MF: text };
        setMeteringEquipment(newArray);
    };

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
                                {'Above 40KW'}
                            </Text>
                        </View>

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
                                    {'SIR No: ' + SIR}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,
                                        color: 'black',
                                        fontSize: 13,
                                    }}>
                                    {'Consumer No: ' + cosnumerno}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 13,
                                        color: 'black',
                                    }}>
                                    {'Name: ' + consumernameBilling}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 13,
                                        color: 'black',
                                    }}>
                                    {'Address: ' + address}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 13,
                                        color: 'black',
                                    }}>
                                    {'Assign Date: ' + assigndate}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 13,
                                        color: 'black',
                                    }}>
                                    {'Assign To: ' + assignto}
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
                                    {'Cluster / IBC: ' + clusterIBC}
                                </Text>

                                <Text
                                    style={{
                                        marginLeft: 200,
                                        marginTop: 4,
                                        color: 'black',
                                        fontSize: 13,
                                    }}>
                                    {'Account No: ' + accountno}
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
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Contract Load (KW) </Text>
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






                    {tab == 'Metering Equipment Detail' && (
                        <ScrollView
                            horizontal={true}>


                            <View style={styles.container1}>

                                <View style={styles.footerInputMeterInstalled}>

                                    <View style={{ flex: 0.9, width: 380, alignItems: 'flex-start' }}>

                                        <LinearGradient
                                            colors={['#1565C0', '#64b5f6']}
                                            style={styles.otherMeterInstalled}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}> Other Meter Installed </Text>
                                        </LinearGradient>
                                    </View>

                                    <View
                                        style={{
                                            //   flexDirection: 'column',
                                            // flex: 8,
                                            width: '20%',
                                            marginTop: -2,
                                            marginLeft: 20,
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                flex: 2,
                                                //  width: '96%',
                                                marginTop: 4,
                                            }}>
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    1 - {' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,

                                                    }}>
                                                    <TextInput
                                                        placeholder={''}
                                                        keyboardType={'email-address'}
                                                        placeholderTextColor="grey"
                                                        onChangeText={text => {
                                                            setMeterInstalled(text);
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
                                                    2 -{' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                    <TextInput
                                                        placeholder={''}
                                                        keyboardType={'email-address'}
                                                        placeholderTextColor="grey"
                                                        onChangeText={text => {
                                                            setMeterInstalled1(text);
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
                                                    3 -{' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                    <TextInput
                                                        // style={styles.inputLoadDetail}
                                                        placeholder={''}
                                                        keyboardType={'email-address'}
                                                        placeholderTextColor="grey"
                                                        onChangeText={text => {
                                                            setMeterInstalled2(text);
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
                                                    4 - {' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                    <TextInput
                                                        placeholder={''}
                                                        keyboardType={'numeric'}
                                                        placeholderTextColor="grey"
                                                        onChangeText={text => {
                                                            setMeterInstalled3(text);
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

                                <View style={styles.mainbox}>
                                    <View
                                        style={{
                                            //                    marginTop: 3,  //footerInputPower2
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        <View style={styles.footerInputPower2}>

                                            <DataTable>
                                                <DataTable.Header style={widerCell}  >
                                                    <DataTable.Cell style={meteringEquipCell}  >
                                                        <Text style={meteringEquipCelltext} > Register</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >KE No </Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Reading</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >M.F</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >MDI</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Make</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >MC</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Meter CT ratio</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Meter CT ratio</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Blng Mode</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Remarks</Text>
                                                    </DataTable.Cell>
                                                </DataTable.Header>
                                                {meteringEquipment.map((l, i) => (
                                                    <DataTable.Row style={styles.databeBox} key={i}>
                                                        <View >
                                                            <TextInput
                                                                style={{ width: 130, borderRightColor: 'black', borderRightWidth: 1., borderLeftColor: 'black', borderLeftWidth: 1, marginLeft: -20, textAlign: 'center' }}
                                                                // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                                                placeholder="Register"
                                                                editable={false}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                color='black'
                                                                value={l.Register}
                                                            />

                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 124, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateKENo(t, i)}
                                                                placeholder="KE No"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.KENo}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateReading(t, i)}
                                                                placeholder="Reading"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Reading}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMF(t, i)}
                                                                placeholder="M.F"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MF}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMDI(t, i)}
                                                                placeholder="MDI"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MDI}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 120, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMake(t, i)}
                                                                placeholder="Make"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Make}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMC(t, i)}
                                                                placeholder="MC"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MC}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black'}}
                                                                onChangeText={t => updateMeterCTratio1(t, i)}
                                                                placeholder="Meter CT ratio"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MeterCTratio1}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 120, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMeterCTratio2(t, i)}
                                                                placeholder="Meter CT ratio"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MeterCTratio2}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateBlngMode(t, i)}
                                                                placeholder="Blng Mode"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.BlngMode}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateRemarks(t, i)}
                                                                placeholder="Remarks"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Remarks}
                                                            />
                                                        </View>
                                                    </DataTable.Row>
                                                ))}
                                            </DataTable>
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

                    {tab == 'Status of Postal Order/Seal' && (
                        <ScrollView
                            horizontal={true}>


                            <View style={styles.container1}>
                                <View style={styles.mainbox}>
                                    <View
                                        style={{
                                            //                    marginTop: 3,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={styles.footerInputPower1}>

                                            <DataTable>
                                                <DataTable.Header style={widerCell} textStyle={{ fontWeight: 'bold' }}>
                                                    <DataTable.Cell style={borderCell1} >
                                                        <Text style={meteringEquipCelltext} >Meter</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell2}>
                                                        <Text style={meteringEquipCelltext} > Main Cover</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell}>
                                                        <Text style={meteringEquipCelltext} > Terminal Cover</Text>


                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell}>
                                                        <Text style={meteringEquipCelltext} >  At B/CT Chamber</Text>


                                                    </DataTable.Cell>

                                                    <DataTable.Cell style={borderCell3}>
                                                        <Text style={meteringEquipCelltext} >   PT Fuse And PT Side</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell4}>
                                                        <Text style={meteringEquipCelltext} >    Panel Door</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell5}>
                                                        <Text style={meteringEquipCelltext} >     Main Cover Plate and Terminal Seal</Text>


                                                    </DataTable.Cell>
                                                </DataTable.Header>
                                                {postalOrderSeal.map((l, i) => (
                                                    <DataTable.Row style={styles.databeBox} key={i}>
                                                    <View style={dataCell1}>
                                                        <TextInput
                                                            style={{ color: 'black' }}
                                                            placeholder="Meter"
                                                            editable={false}
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.Meter}
                                                        />

                                                    </View>
                                                    <View style={dataCell2}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updateMainCover(t, i)}
                                                            placeholder="Main Cover"
                                                            keyboardType={'email-address'}
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.MainCover}
                                                        />
                                                    </View>
                                                    <View style={dataCell3}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updateTerminalCover(t, i)}
                                                            placeholder="Terminal Cover"
                                                            keyboardType={'email-address'}
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.TerminalCover}
                                                        />
                                                    </View>
                                                    <View style={dataCell3}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updateChamber(t, i)}
                                                            placeholder="At B/CT Chamber"
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.Chamber}
                                                        />
                                                    </View>
                                                    <View style={dataCell4}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updatePTfuse(t, i)}
                                                            placeholder="PT Fuse And PT Side"
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.PTfuse}
                                                        />
                                                    </View>

                                                    <View style={dataCell5}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updatePanelDoor(t, i)}
                                                            placeholder="Panel Door"
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.PanelDoor}
                                                        />
                                                    </View>
                                                    <View style={dataCell6}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChangeText={t => updateCoverPlate(t, i)}
                                                            placeholder="Main Cover Plate"
                                                            placeholderTextColor="black"
                                                            fontSize={10}
                                                            value={l.MainCoverPlate}
                                                        />
                                                    </View>
                                                </DataTable.Row>
                                                ))}
                                            </DataTable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )}

                    {tab == 'Testing By Time Power Method' && (
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
                                                            Current (AMP){' '}
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
                                                                placeholder={'Current (AMP)'}
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setCurrentAmp(text);
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
                                                            Voltage (KV){' '}
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
                                                                placeholder={'Voltage (KV)'}
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setVoltageKV(text);
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
                                                            Power Factor{' '}
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
                                                                placeholder={'Power Factor'}
                                                                keyboardType={'numeric'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setPowerFactor(text);
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
                                                            Kto{' '}
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
                                                                placeholder={'Kto'}
                                                                keyboardType={'numeric'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setKto(text);
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
                                                            % Error ={' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            (KWo)(KWc)/KWc x 100 ={' '}
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
                                                                placeholder={'% Error'}
                                                                keyboardType={'numeric'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setPerError(text);
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
                                                            Power Calculated/ {' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            KWo{' '}
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
                                                                placeholder={'Power Calculated/KWo'}
                                                                keyboardType={'numeric'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setPowerCalculated(text);
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
                                                            Power Observed/{' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            KWo{' '}
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
                                                                placeholder={'Power Observed/KWo'}
                                                                keyboardType={'numeric'}
                                                                placeholderTextColor="grey"
                                                                onChangeText={text => {
                                                                    setPowerObserved(text);
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

                                                        </Text>

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
                                                marginTop: -100,
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
                                                            maxLength={11}
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


                                            <View style={{
                                                flexDirection: 'row',
                                                flex: 2,
                                                width: '96%',
                                                marginTop: 20,
                                            }}>
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                        CNIC #{' '}
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
                                                            placeholder={'Enter CNIC #'}
                                                            keyboardType={'numeric'}
                                                            maxLength={13}
                                                            placeholderTextColor='grey'
                                                            onChangeText={(text) => { setconsumerNamecNIC(text) }}
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
                                                                height: 100,
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
                                                marginTop: 10,
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
                                                marginTop: 10,
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
                                                        images={images1} // images1[0].uri //images1
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

                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 2,
                                            width: '96%',
                                            marginTop: 10,
                                        }}>
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    Consumer Signature {''}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    flex: 1,
                                                    width: '88%',
                                                    alignSelf: 'center',
                                                }}>
                                                <TouchableOpacity onPress={() => {
                                                    setSignModalVisible(true);
                                                }}>
                                                    <View
                                                        style={{
                                                            flex: 2,
                                                            alignItems: 'flex-start',
                                                            //  marginTop: -10,
                                                        }}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'blue' }}>
                                                            Take Signature </Text>
                                                    </View>
                                                </TouchableOpacity>
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
                                                        {isSignature == 'Y' ?
                                                            (<TouchableOpacity
                                                                onPress={() => {

                                                                    setTimeout(() => {
                                                                        setSign();
                                                                        setIsSignature("N");
                                                                    }, 1000);

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
                                                                    Reset
                                                                </Text>
                                                            </TouchableOpacity>)
                                                            : null}
                                                    </View>

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
                    style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginLeft: 1 }}
                    isVisible={isSignModalVisible}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            // paddingVertical: 20,
                        }}>
                        <SafeAreaView

                            style={styles.container3}>
                            <View style={styles.container3}>

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
                                            //setimageview(false);

                                            resetSign();
                                        }}>
                                        <View></View>
                                        <View
                                            style={{
                                                backgroundColor: '#1565C0',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 30,
                                                height: 30,
                                                borderRadius: 15,
                                                right: -1,
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
                                        //  marginTop: 45,
                                        // marginLeft: 8,

                                        // marginBottom: 20,
                                        //   width: '90%',
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
                                            //  padding: 15
                                        }}
                                        onPress={() => {
                                            saveSign();
                                        }}>
                                        <LinearGradient
                                            colors={['#1565C0', '#64b5f6']}
                                            style={styles.signatureSubmit}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>Ok</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </SafeAreaView>
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

                                    var postalOrderSealfill=[];
                                    var meteringEquipmentfill=[];
                  
                                    postalOrderSeal.map((l, i) => {
                  
                                    
                                      if (l.Meter!= "" || l.MainCover!="" || l.TerminalCover!= "" ||
                                          l.Chamber!= "" || l.PTfuse!="" || l.PanelDoor!= "" || l.MainCoverPlate!= "")
                                   
                                      {
                                        setIspostalOrderSeal("Y");
                                       // updateLAmp(l.AMP, i);
                                       postalOrderSealfill=([{Meter: l.Meter, MainCover:l.MainCover, TerminalCover: l.TerminalCover, 
                                        Chamber: l.Chamber, PTfuse: l.PTfuse, PanelDoor: l.PanelDoor, MainCoverPlate: l.MainCoverPlate}, ...postalOrderSealfill]);
                                      }
                                      
                                     })
                                     console.log("lightmeterdetailfill", postalOrderSealfill);
                                     //setLightmeterdetail(lightmeterdetailfill);
                                     
                                     meteringEquipment.map((l, i) => {
                  
                                       if (l.KENo!= "" || l.Reading!="" || l.MF!= "" || l.MDI!= "" || l.Make!="" || l.MC!= "" ||
                                            l.MeterCTratio1!= "" || l.MeterCTratio2!="" || l.BlngMode!= "" || l.Remarks!= "" )
                                    
                                       {
                                        setIsmeteringEquipment("Y");
                                     
                                        meteringEquipmentfill=([{Register: l.Register, KENo:l.KENo, Reading: l.Reading, 
                                            MF: l.MF, MDI: l.MDI, Make: l.Make, MC: l.MC, MeterCTratio1: l.MeterCTratio1,
                                            MeterCTratio2: l.MeterCTratio2, BlngMode: l.BlngMode, Remarks: l.Remarks}, ...meteringEquipmentfill]);
                                       }
                                       
                                      })


                                    AsyncStorage.getItem('SIRDigitization')
                                        .then(items => {
                                            var data1 = [];

                                            data1 = items ? JSON.parse(items) : [];

                                            data1 = [
                                                ...data1,
                                                {
                                                    CaseType: "Planned",
                                                    SIRType: "Above 40",
                                                    Status: "Pending",
                                                    SDate: Moment(Date.now()).format('YYYY-MM-DD'),
                                                    SanctionLoad: null,
                                                    MeterTesting: null,
                                                    Agediff: null,
                                                    MeterPer: null,
                                                    MeterSlow: null,
                                                    ConnectedLoad: connectedLoad,
                                                    RunningLoad: null,
                                                    Make: null,
                                                    Amperes: currentAmp,
                                                    Volts: voltageKV,
                                                    MeterConstant: null,
                                                    SecuritySlipNo: null,
                                                    MultiplyingFactor: null,
                                                    MeterNo: null,
                                                    CurrentReading: null,
                                                    PeakReading: null,
                                                    SystemMake: null,
                                                    SystemAmperes: null,
                                                    SystemVolts: null,
                                                    SystemMeterConstant: null,
                                                    SystemSecuritySlipNo: null,
                                                    SystemMultiplyingFactor: null,
                                                    SystemMeterNo: null,
                                                    SystemCurrentReading: null,
                                                    SystemPeakReading: null,
                                                    ConsumerSign: consumerSign,
                                                    ConsumerRefuseYN: consumerRefuseYN,
                                                    ConsumerRemarks: consumerRemarks,
                                                    MobileNo: mobileNo,
                                                    ConsumerName: consumerName,
                                                    ConsumerCNIC: consumerNameCNIC,
                                                    ServiceType: serviceType,
                                                    Tariff: tariff,
                                                    PremiseType: null,
                                                    PremiseCategory: null,
                                                    Remarks: discrepancyfindingsRemarks,
                                                    isDiscrepancyitems: isSelecteditems,
                                                    Discrepancyitems: selectedItems,
                                                    longitude: longitude,
                                                    latitude: latitude,
                                                    IsSignature: isSignature,
                                                    ConsumerSignature: consumerSignature,
                                                    SIRImageFlag: isImage,
                                                    SIRImages: images,
                                                    ConsumerImageFlag: IsImage1,
                                                    ConsumerImages: consumerImages,
                                                    UniqueId: Date.now(),
                                                    SIRNo: SIR,
                                                    ConsumerNo: cosnumerno,
                                                    ClusterIBC: clusterIBC,
                                                    ConsumerNameBilling: consumernameBilling,
                                                    AccountNo: accountno,
                                                    Address: address,
                                                    AssignDate: assigndate,
                                                    AssignTo: assignto,
                                                    DiscrepancyRecord: null,
                                                    ApplianceDetail: null,
                                                    ConsumerStatus: consumerStatus,
                                                    IndustryType: industryType,
                                                    ServiceType: serviceType,
                                                    SizeofService: sizeofService,
                                                    FedFromPMTSS: fedFromPMTSS,
                                                    PmtSSCode: pmtSSCode,
                                                    MeterTestingResultTC: null,
                                                    MeterTestingperError: null,
                                                    ContractLoad: contractLoad,
                                                    ConnectedLoadKW: connectedLoadKW,
                                                    RunningLoadKW: runningLoadKW,
                                                    Metertestingto: null,
                                                    Meterinstalled1: meterInstalled1,
                                                    Meterinstalled2: meterInstalled2,
                                                    Meterinstalled: meterInstalled,
                                                    Statuspostalorder: null,
                                                    Metertestingresultremarks: null,
                                                    Fmrno: null,
                                                    Date1: null,
                                                    FindingItems: checkBoxselectedList,
                                                    Powerkeno: null,
                                                    Powermetermake: null,
                                                    Powermc: null,
                                                    Powerreading: null,
                                                    Powermdionreading: null,
                                                    Powermeterdetail: null,
                                                    Lightkeno: null,
                                                    Lightmetermake: null,
                                                    Lightmc: null,
                                                    Lightreading: null,
                                                    Lightmdionreading: null,
                                                    Lightpeakreading: null,
                                                    Lightcurrentreading: null,
                                                    Lightconsumerno: null,
                                                    Lightmeterdetail: null,
                                                    LightmeterdetailFlag:"N",
                                                    PowermeterdetailFlag:"N",
                                                    PostalOrderSeal : postalOrderSeal,                                         
                                                    PowerFactor : powerFactor ,
                                                    Kto : kto,               
                                                    PerError : perError,                   
                                                    PowerCalculated : powerCalculated,                   
                                                    PowerObserved : powerObserved,               
                                                    MeteringEquipment : meteringEquipment,            
                                                    MeterInstalled3 : meterInstalled3,
                                                    PostalOrderSealFlag: ispostalOrderSeal,
                                                    MeteringEquipmentFlag: ismeteringEquipment,                  

                                                    





                                                },
                                            ];



                                            AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1))

                                            // console.log("data1", data1);

                                        });





                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeScreen' }],
                                    });





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
        </ScrollView>
    );
};

export default ApiScreenA40;

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

    container3: {
        flex: 1,
        backgroundColor: 'white',
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
        height: 180,
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

    footerInputMeterInstalled: {
        //  flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        width: 1500,
        marginLeft: 8
        // height: 200,

    },


    footerInputPower1: {
        // flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        width: 1000,
        // minWidth: 150,

    },

    footerInputPower2: {
        // flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        width: 1500,
        // minWidth: 150,

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
        margin: 2,
        textAlign: 'left',
        color: 'black',

    },
    databeHeader1: {
        margin: 2,
        marginTop: -30,
        textAlign: 'left',
        color: 'white',
        flexWrap: 'wrap',
        paddingHorizontal: 0,
        backgroundColor: 'lightgreen',
        height: 100,

    },
    input: {
        width: 80,
        padding: 4,
        color: 'black',
    },

    inputMeteringEquipvalue: {
        minWidth: 70,
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

    otherMeterInstalled: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -50
    },

    submit: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },


    signatureSubmit: {
        width: '100%',
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
