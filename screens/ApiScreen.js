import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  PermissionsAndroid,
  Button,
  ActivityIndicator,
  Dimensions,
  BackHandler,
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
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import Modal from 'react-native-modal';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import queryString from 'query-string';
import ImageViewConsumer from 'react-native-image-viewing';
import Geolocation from '@react-native-community/geolocation';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  launchCamera,
  launchImageLibrary,
  //ImagePicker,
  Select,
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import SignatureCapture from 'react-native-signature-capture';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {ScaleFromCenterAndroidSpec} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import {set} from 'react-native-reanimated';
import base64 from 'react-native-base64';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

let current = 100;
const ApiScreen = ({route, navigation}) => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Discrepancy Recorded');
  const [loader, setLoader] = useState(false);

  const sign = createRef();
  const [signaturePreview, setSign] = useState(null);
  const [consumerSignature, setConsumerSignature] = useState([]);
  const [isSignature, setIsSignature] = useState('N');

  // saad Comment Tarif Dropdowm
  const [openTarif, setOpenTarif] = useState(false);
  const [valueTarif, setValueTarif] = useState(null);
  const [itemsTarif, setItemsTarif] = useState([]);

  // saad Comment PremiseType Dropdowm
  const [openPremiseType, setOpenPremiseType] = useState(false);
  const [valuePremiseType, setValuePremiseType] = useState(null);
  const [itemsPremiseType, setItemsPremiseType] = useState([]);

  // saad Comment Appliance Dropdowm
  const [openAppliance, setOpenAppliance] = useState(false);
  const [valueAppliance, setValueAppliance] = useState(null);
  const [itemsAppliance, setItemsAppliance] = useState([]);

  // saad Comment Meter Detail - System
  const [systemMeter, setSystemMeter] = useState([]);

  // saad Comment Meter Detail - Onsite
  const [onsitemeter, setOnsiteMeter] = useState([]);

  // saad Comment MRNote Dropdowm
  const [itemsMRNote, setItemsMRNote] = useState([]);

  const saveSign = () => {
    sign.current.saveImage();
  };
  const resetSign = () => {
    sign.current.resetImage();
    setSignModalVisible(!isSignModalVisible);

    setTimeout(() => {
      setSign();
      setIsSignature('N');
    }, 1000);
  };
  const _onSaveEvent = result => {
    // alert('Signature Captured Successfully');
    setSign(result.encoded);
    let consSign = result.encoded;
    setIsSignature('Y');
    setConsumerSignature([{consSign}]);
    setSignModalVisible(!isSignModalVisible);
  };
  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  var radio_props = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  var radio_propsS = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  const items1 = [
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
  const [isSelecteditems, setIsSelecteditems] = useState('N');

  let onSelectedItemsChange = selectedItems => {
    let localdata = [];
    //console.log(selectedItems);
    if (selectedItems.length > 5) {
      return;
    } else {
      setSelectedItems(selectedItems);
      setIsSelecteditems('Y');

      //console.log('selectedItems: ' + selectedItems);

      selectedItems.filter(item => {
        //console.log('item:= ' + item);
        localdata.push({
          Sirnr: data.Sirnr,
          Discrepancy: item,
        });
      });
      setDescripancyList(localdata);
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
      name: 'Descrepancy and Findings',
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
      id: 8,
      name: 'SIR Pictures',
      active: false,
    },
    /* {
       id: 9,
       name: 'Customer Signature',
       active: false,
     },*/
  ]);

  const [apiRes, setApiRes] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [filePath1, setFilePath1] = useState([]);
  const [images1, setImages1] = useState([]);
  const [consumerImages, setConsumerImages] = useState([]);
  const [SIRDigitization, setSIRDigitization] = useState([]);
  const [buttonType, setButtonType] = useState();

  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const {width} = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);

  const [SIR, setSIR] = useState('');
  const [consumerno, setConsumerNo] = useState('');
  const [contract, setContract] = useState('');

  const [clusterIBC, setClusterIBC] = useState('');
  const [consumernameBilling, setConsumernameBilling] = useState('');

  const [accountno, setAccountno] = useState('');
  const [address, setAddress] = useState('');

  const [assigndate, setAssigndate] = useState('');
  const [assignto, setAssignto] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isSignModalVisible, setSignModalVisible] = useState(false);
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [error, setError] = useState('');

  /* Load Detail ------------ Start */
  const [sanctionLoad, setSanctionLoad] = useState('');
  const [meterTesting, setMeterTesting] = useState('');
  const [agediff, setAgediff] = useState('');
  const [meterPer, setMeterPer] = useState('');
  const [meterSlow, setMeterSlow] = useState('');
  const [connectedLoad, setConnectedLoad] = useState('');
  const [runningLoad, setRunningLoad] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  /* Load Detail ------------ End */

  // Saad start Added on 16-Dec-2022

  const [systemmeterNo, setSystemMeterNo] = useState('');
  const [systemmake, setSystemMake] = useState('');
  const [systemphase, setSystemPhase] = useState('');
  const [systemvolts, setSystemVolts] = useState('');
  const [systemmeterConstant, setSystemMeterConstant] = useState('');
  const [systemsecuritySlipNo, setSystemSecuritySlipNo] = useState('');
  const [systemmultiplyingFactor, setSystemMultiplyingFactor] = useState('');

  // Saad End Added on 16-Dec-2022

  /* Meter Detail on System ------------ Start */
  const [systemmcurrentReading, setSystemCurrentReading] = useState(''); //Saad Removed on 16-Dec-2022
  const [systemmpeakReading, setSystemPeakReading] = useState(''); //Saad Removed on 16-Dec-2022
  const [systemamperes, setSystemAmperes] = useState(''); //Saad Removed on 16-Dec-2022

  /* Meter Detail on System ------------ End */

  /* Meter Detail on Site ------------ Start */
  const [onsitemeterNo, setOnsiteMeterNo] = useState('');
  const [onsitemake, setOnsiteMake] = useState('');
  const [onsitephase, setOnsitePhase] = useState('');
  const [onsitevolts, setOnsiteVolts] = useState('');
  const [onsitemeterConstant, setOnsiteMeterConstant] = useState('');
  const [onsitesecuritySlipNo, setOnsiteSecuritySlipNo] = useState('');
  const [onsitemultiplyingFactor, setOnsiteMultiplyingFactor] = useState('');

  // saad Comment Onsite Register Dropdown
  const [openOnsiteRegister, setOpenOnsiteRegister] = useState(false);
  const [valueOnsiteRegister, setValueOnsiteRegister] = useState(null);
  const [itemsOnsiteRegister, setItemsOnsiteRegister] = useState([
    {label: '', value: ''},
    {label: 'K1', value: 'K1'},
    {label: 'R1', value: 'R1'},
    {label: 'P1', value: 'P1'},
    {label: 'X1', value: 'X1'},
    {label: 'MDI-Off', value: 'MDI-Off'},
    {label: 'MDI-On', value: 'MDI-On'},
  ]);

  const [onsitemeterreading, setOnsiteMeterReading] = useState('');

  const [currentReading, setCurrentReading] = useState(''); //Saad Removed on 29-Dec-2022
  const [peakReading, setPeakReading] = useState(''); //Saad Removed on 29-Dec-2022
  const [amperes, setAmperes] = useState(''); //Saad Removed on 29-Dec-2022

  const {data, index, otherParam} = route.params;

  /* Meter Detail on Site ------------ End */

  /* Discrepancy and Findings ------------ Start */
  const [serviceType, setServiceType] = useState('');
  const [tarif, setTarif] = useState('');
  const [premiseType, setPremiseType] = useState('');
  const [premiseCategory, setPremiseCategory] = useState('');

  const [remarks, setRemarks] = useState('');
  const [discrepancyfindingsRemarks, setDiscrepancyfindingsRemarks] =
    useState('');
  /* Discrepancy and Findings ------------ End */

  /* Customer Acknowlegment ------------ Start */

  const [consumerName, setConsumerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [consumerNameCNIC, setconsumerNameCNIC] = useState('');
  const [consumerRemarks, setConsumerRemarks] = useState('');
  const [consumerRefuseYN, setConsumerRefuseYN] = useState('');
  const [isConsumerRefuseYN, setIsConsumerRefuseYN] = useState('');
  const [consumerSign, setConsumerSign] = useState('');
  const [isConsumerSign, setIsConsumerSign] = useState('');

  // Saad added on 16-Dec-2022
  const [loadDetails, setLoadDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rating, setRating] = useState('');
  const [totalWatts, setTotalWatts] = useState('');

  const [sirdate, setSirDate] = useState('');
  const [sirtime, setSirTime] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  /* Customer Acknowlegment ------------ End */

  const SPACING = 10;
  const THUMB_SIZE = 80;
  const flatListRef = useRef();
  const carouselRef = useRef();

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const handleBackButtonPress = () => {
    Alert.alert(
      'Are you sure you want to go back?',
      'Any unsaved changes will be lost.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.goBack();
            return true;
          },
        },
      ],
      {cancelable: false},
    );
  };

  const PostMeterData = () => {
    console.log('**** PostMeterData ****');

    console.log('data.Sirnr' + data.Sirnr);
    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_METER_DATA_POSTING_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Sirnr: '9999',
        NAVSIRITEMS: [
          {
            SIRNR: data.Sirnr,
            GERAET_M1: onsitemeterNo,
            HERST_M1: onsitemake,
            ABRFAKT_M1: onsitemultiplyingFactor,
          },
        ],
      }),
    })
      .then(res => {
        console.log(
          '******************PostMeterData UPDATED*********************************',
        );
        PostMeterRegisterList();
      })
      .catch(error => {
        console.error(error);
        alert('PostMeterData: ' + error);
      });
  };

  const PostMeterRegisterList = () => {
    console.log('**** PostMeterRegisterList ******');
    /*
    var filterData = onsitemeter.filter(item => {
      console.log(item);
    });
*/
    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_REGISTER_POSTING_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Sirnr: '20001',
        NAVSIRITEMS: onsitemeter,
      }),
    })
      .then(res => {
        console.log(
          '******************PostMeterRegisterList UPDATED*********************************',
        );
      })
      .catch(error => {
        console.error(error);
        alert('PostMeterRegisterList: ' + error);
      });
  };

  const PostGeoLocation = () => {
    console.log('**** PostGeoLocation ******');

    AsyncStorage.getItem('SIRDigitizationLocation').then(items => {
      var data1 = [];
      data1 = items ? JSON.parse(items) : [];
      var filterData = data1.filter(item => {
        console.log(item);
      });
      axios({
        method: 'POST',
        url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_LAT_LONGITUDE_POSTING_SRV/HEADERSet',
        headers: {
          Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': '',
          'X-Requested-With': 'X',
        },
        data: JSON.stringify({
          HeaderToItem: data1,
        }),
      })
        .then(res => {
          console.log(
            '******************PostGeoLocation UPDATED*********************************',
          );
          AsyncStorage.setItem('SIRDigitizationLocation', JSON.stringify([]));
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        })
        .catch(error => {
          console.error(error);
          alert('PostGeoLocation:error ' + error);
        });
    });
  };
  const StoreInDevice = (status, isPost) => {
    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data = JSON.parse(items);
      data.filter((item, index) => {
        if (item.Sirnr == SIR) {
          console.log('item.Sirnr ', item.Sirnr);
          console.log('index', index);
          console.log('SIR', SIR);
          //data[index].CaseType = 'Planned';
          data[index].SIRType = 'ORD';
          data[index].SirFormat = 'ORD';
          data[index].Status = status;
          data[index].SIRTime = sirtime;
          data[index].SIRDate = sirdate;
          data[index].SanctionLoad = sanctionLoad;
          data[index].MeterTesting = meterTesting;
          data[index].Agediff = agediff;
          data[index].MeterPer = meterPer;
          data[index].MeterSlow = meterSlow;
          data[index].ConnectedLoad = connectedLoad;
          data[index].RunningLoad = runningLoad;

          data[index].OnsiteMeterNo = onsitemeterNo;
          data[index].OnsiteMake = onsitemake;
          data[index].Onsitephase = onsitephase;
          data[index].OnsiteVolts = onsitevolts;
          data[index].OnsiteMeterConstant = onsitemeterConstant;
          data[index].OnsiteSecuritySlipNo = onsitesecuritySlipNo;
          data[index].OnsiteMultiplyingFactor = onsitemultiplyingFactor;
          data[index].OnsiteMeterDetail = onsitemeter;
          data[index].PowerMeterRemarks = powerMeterRemarks;
          data[index].SystemMake = systemmake;
          data[index].SystemAmperes = systemamperes;
          data[index].SystemVolts = systemvolts;
          data[index].SystemPhase = systemphase; // Saad add on 16-Dec-2022
          data[index].SystemMeterConstant = systemmeterConstant;
          data[index].SystemSecuritySlipNo = systemsecuritySlipNo;
          data[index].SystemMultiplyingFactor = systemmultiplyingFactor;
          data[index].SystemMeterNo = systemmeterNo;
          data[index].SystemCurrentReading = systemmcurrentReading;
          data[index].SystemPeakReading = systemmpeakReading;
          data[index].ConsumerName = consumerName;
          data[index].MobileNo = mobileNo;
          data[index].ConsumerNameCNIC = consumerNameCNIC;
          data[index].ConsumerRemarks = consumerRemarks;
          data[index].ConsumerRefuseYN = consumerRefuseYN;
          data[index].IsConsumerRefuseYN = isConsumerRefuseYN;
          data[index].ConsumerSign = consumerSign;
          data[index].IsConsumerSign = isConsumerSign;
          data[index].ServiceType = serviceType;
          data[index].Tariff = valueTarif;
          data[index].PremiseType = valuePremiseType;
          data[index].PremiseCategory = premiseCategory;
          data[index].Remarks = remarks;
          data[index].isDiscrepancyitems = isSelecteditems;
          data[index].Discrepancyitems = selectedItems;
          data[index].DiscrepancyfindingsRemarks = discrepancyfindingsRemarks;
          data[index].longitude = longitude;
          data[index].latitude = latitude;

          data[index].IsSignature = isSignature;
          data[index].ConsumerSignature = consumerSignature;
          data[index].SIRImageFlag = isImage;
          data[index].SIRImages = images;
          data[index].ConsumerImageFlag = IsImage1;
          data[index].ConsumerImages = consumerImages;
          data[index].Images1 = images1;

          data[index].UniqueId = Date.now();
          data[index].Sirnr = SIR;
          data[index].CONSUMER_NO = consumerno;
          data[index].Vertrag = contract;
          data[index].ClusterIBC = clusterIBC;
          data[index].ConsumerNameBilling = consumernameBilling;
          data[index].AccountNo = accountno;
          data[index].Address = address;
          data[index].AssignDate = assigndate;
          data[index].AssignTo = assignto;
          data[index].DiscrepancyRecord = apiRes;

          data[index].DescripancyDetail = descripancylist;
          data[index].ApplianceDetail = tableList;
          data[index].Appliancelist = appliancelist;

          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data));
        }
      });
    });

    if (isPost) {
      PostGeoLocation();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    }
    setAuthModalVisible(!isAuthModalVisible);
    setSuccessModalVisible(!isSuccessModalVisible);
  };
  const PostSIRSimultaneous = () => {
    /*
    var filterData = onsitemeter.filter(item => {
      console.log(item);
    });
*/
    const onsitemeterData = onsitemeter.length > 0 ? onsitemeter : [{}];
    const appliancelistData = appliancelist.length > 0 ? appliancelist : [{}];
    const descripancylistData =
      descripancylist.length > 0 ? descripancylist : [{}];
    const valuePremiseTypeData =
      valuePremiseType != undefined ? valuePremiseType : '';
    const consumerRefuseYNData =
      consumerRefuseYN != undefined ? consumerRefuseYN : '';
    const consumerSignData = consumerSign != undefined ? consumerSign : '';

    console.log('valuePremiseType: ' + valuePremiseType);
    console.log('consumerSign: ' + consumerSign);
    let NOTICE_SIGN = consumerRefuseYNData + '/' + consumerSignData;

    console.log('**** PostSIRSimultaneous ***Started***');

    console.log('NOTICE_SIGN: ' + NOTICE_SIGN);

    console.log('sirdate: ' + sirdate);
    console.log('sirtime: ' + sirtime);

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_SIMULTANEOUS_POSTING_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Sirnr: data.Sirnr,
        INSP_DATE: sirdate,
        INSP_TIME: sirtime,
        CUSTNAME: consumerName,
        MOBILE: mobileNo,
        CNIC: consumerNameCNIC,
        NOTICE_SIGN: NOTICE_SIGN,
        TARIFTYP: valueTarif,
        VBSART: valuePremiseTypeData,
        LATITUDE: latitude.toString(),
        LONGITUDE: longitude.toString(),
        DISC_REMARKS: consumerRemarks,
        SIR_REMARKS: discrepancyfindingsRemarks,
        METER_REMARKS: powerMeterRemarks,
        NAVAPPLIANCES: appliancelistData,
        NAVSIRITEMS: descripancylistData,
        NAVMETER: [
          {
            SIRNR: data.Sirnr,
            GERAET_M1: onsitemeterNo,
            HERST_M1: onsitemake,
            ABRFAKT_M1: onsitemultiplyingFactor,
          },
        ],
        NAVREGISTER: onsitemeterData,
        NAVONSITE: [
          {
            Sirnr: data.Sirnr,
            Metertr: meterTesting,
            Voltage2: agediff,
            Voltage3: meterPer,
            Perslow: meterSlow,
            Connected: connectedLoad,
            Runload: runningLoad,
            Wrkhour: serviceType,
            Voltage1: onsitevolts,
            Current1: onsitephase,
          },
        ],
        SIR_Meter_SealSet: [{}],
      }),
    })
      .then(res => {
        console.log(
          '******************PostSIRSimultaneous UPDATED*********************************',
        );
        console.log('res.data.d.Result------' + res.data.d.Result);
        StoreInDevice('Post', true);

        setAuthModalVisible(!isAuthModalVisible);
        setSuccessModalVisible(!isSuccessModalVisible);
        //GetImageAPIToken();
      })
      .catch(error => {
        console.error('PostSIRSimultaneous:error: ' + error);
      });
  };

  const GetImageAPIToken = () => {
    console.log(
      '******************GetImageAPIToken Called*********************************',
    );

    axios({
      method: 'GET',
      url: 'https://stagingdev.ke.com.pk:8039/Token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString.stringify({
        UserName: 'B2vJ/dvKl0B14jvtcUjnjG31HT6voKnyqAyzjKoZvQY=',
        Password: 'Ngyz0Dqsdyrw5pSXc0EOW2oFTY/KFM+oeSvPTGoPFnI=',
        grant_type: 'password',
      }),
    })
      .then(res => {
        console.log(
          '******************GetImageAPIToken Called*********************************',
        );
        console.log('TOKEN: ' + res.data.access_token);
        //PostSIRImageData(res.data.access_token);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('error.response.data1');
          console.log(error.response.data);
          console.log('error.response.data');
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  const PostRoshniBaji = () => {
    console.log('PostRoshniBaji called');
    axios({
      method: 'POST',
      url: 'https://rbapi.ke.com.pk/api/Image/PostImageData',
      timeout: 1000 * 5,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFToken': '',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: JSON.stringify({
        imageName: 'ABC',
        imageBase64:
          '/9j/4AAQSkZJRgABAQEAeAB4AAD/4RCmRXhpZgAATU0AKgAAAAgABAE7AAIAAAARAAAISodpAAQAAAABAAAIXJydAAEAAAAiAAAQfOocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNhYWQgTWFzb29kIEtoYW4AAAAB6hwABwAACAwAAAhuAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTAGEAYQBkACAATQBhAHMAbwBvAGQAIABLAGgAYQBuAAAA/+EKaWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPlNhYWQgTWFzb29kIEtoYW48L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgB8AInAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJ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',
        SurveyID: '1',
      }),
    }).then(res => {
      console.log(
        '******************PostRoshniBaji updated*********************************',
      );
      console.log(res.data);
    });
  };
  const PostSIRImageData = () => {
    console.log('Post SIR ImageData called');

    axios({
      method: 'GET',
      url: 'https://stagingdev.ke.com.pk:8039/api/Image/PostSIRImageData',
      headers: {'content-type': 'application/json'},
      data: JSON.stringify([
        {
          imageName: 'ABC',
          imageBase64:
            '/9j/4AAQSkZJRgABAQEAeAB4AAD/4RCmRXhpZgAATU0AKgAAAAgABAE7AAIAAAARAAAISodpAAQAAAABAAAIXJydAAEAAAAiAAAQfOocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNhYWQgTWFzb29kIEtoYW4AAAAB6hwABwAACAwAAAhuAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTAGEAYQBkACAATQBhAHMAbwBvAGQAIABLAGgAYQBuAAAA/+EKaWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPlNhYWQgTWFzb29kIEtoYW48L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwveDp4bXBtZXRhPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgB8AInAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJ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',
          imageID: '1',
          IBC: 'PONKA',
          SIRNo: 'SIR-BALDIA-01121-2',
          ContractNo: '032232311-BALDIA',
          MIONo: 'MIO-BALDIA-1121-BALDIA',
        },
      ]),
    })
      .then(res => {
        console.log(
          '******************Post SIR ImageData updated*********************************',
        );
        console.log('Message: ' + res.data.Message);
      })
      .catch(error => {
        console.log('ERROR STARTS NOW');
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('error.message: ', error.message);
        }
        //console.log(error.config);
        console.log('error: ', error);
      });
  };

  const PostDescrippancyList = () => {
    console.log('**** PostDescrippancyList ******');
    var filterData = descrippancylist.filter(item => {
      console.log(item);
    });

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DFIND_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Sirnr: '99999',
        NAVSIRITEMS: descrippancylist,
      }),
    })
      .then(res => {
        console.log(
          '******************PostDescrippancyList UPDATED*********************************',
        );
        PostAppliancesList();
      })
      .catch(error => {
        console.error(error);
        alert('PostDescrippancyList: ' + error);
      });
  };

  const PostApppliancesList = () => {
    console.log('**** PostApppliancesList ******');
    var filterData = apppliancelist.filter(item => {
      console.log(item);
    });

    console.log('data.Sirnr:  ', data.Sirnr);

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_POSTING_APPL_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        d: {
          Sirnr: '99999',
          NAVSIRITEMS: apppliancelist,
        },
      }),
    })
      .then(res => {
        console.log(
          '******************PostAppliancesList UPDATED*********************************',
        );
        PostMeterData();
      })
      .catch(error => {
        console.error(error);
        alert('PostAppliancesList: ' + error);
      });
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

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  const getUserCurrentLocation = async () => {
    let latitude, longitude;

    //let isPermissionPermitted= await requestLocationPermission();

    // console.log(isPermissionPermitted);

    //if (isPermissionPermitted) {

    //  console.log("isPermissionPermitted", isPermissionPermitted);
    Geolocation.getCurrentPosition(
      info => {
        const {coords} = info;

        latitude = coords.latitude;
        longitude = coords.longitude;

        setlatitude(latitude);
        setlongitude(longitude);
        // console.log(latitude);

        // getUserCurrentAddress(latitude, longitude)
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
            title: 'Location Permission',
            message:
              'This App needs access to your location ' +
              'so we can know where you are.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use locations ');
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          console.log('Location permission denied');
          return false;
        }
      } catch (err) {
        return false;
        console.warn(err);
      }
    }
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
          alert('captureImage: ' + response.errorMessage);
          return;
        }

        var Allimages = images;

        if (imageNo == '1') {
          setIsImage1('Y');
          //  console.log(response.path);
          setFilePath1([
            {
              uri: response.path,
              url: response.path,
              fileName: 'consumerImage.jpg',
              base64: response.data,
            },
          ]);
          setImages1({
            uri: response.path,
            url: response.path,
            fileName: 'consumerImage.jpg',
            base64: response.data,
          });
          setConsumerImages([
            {
              uri: response.path,
              url: response.path,
              fileName: 'consumerImage.jpg',
              base64: response.data,
            },
          ]);
        } else {
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
        }
        console.log('images1.uri----ali', images1[0].uri);
      });
    }
  };

  useEffect(() => {
    // getApiData();
    console.log('*****');
    console.log('data.Ibc: ' + data.Ibc);
    console.log('data.Sirnr: ' + data.Sirnr);
    console.log('data.Vertrag: ' + data.Vertrag);
    console.log('data.CONSUMER_NO: ' + data.CONSUMER_NO);
    console.log('*****');
    setAssigndate(Moment(data.Erdat, 'YYYYMMDD').format('DD.MM.YYYY'));

    setSanctionLoad(data.SANCTION_LOAD);
    setSIR(data.Sirnr);
    setContract(data.Vertrag);
    setConsumerNo(data.CONSUMER_NO);

    setSirDate(moment().format('DD.MM.YYYY'));
    setSirTime(moment().format('hh:mm:ss'));

    getUserCurrentLocation();

    AsyncStorage.getItem('SIRDigitization').then(items => {
      var localData = items ? JSON.parse(items) : [];
      var filterData = localData.filter(item => {
        if (item.Sirnr == data.Sirnr) {
          console.log('item.Status: ' + item.Status);
          if (item.Status != 'Post') {
            setIsEditable(true);
          }
          setMeterTesting(item.MeterTesting);
          setAgediff(item.Agediff);
          setMeterPer(item.MeterPer);
          setMeterSlow(item.MeterSlow);
          setConnectedLoad(item.ConnectedLoad);
          setRunningLoad(item.RunningLoad);

          setServiceType(item.ServiceType);
          setValueTarif(item.Tariff);
          setValuePremiseType(item.PremiseType);
          setPremiseCategory(item.PremiseCategory);
          setSelectedItems(item.Discrepancyitems);
          setDiscrepancyfindingsRemarks(item.DiscrepancyfindingsRemarks);

          setRemarks(item.Remarks);

          setOnsiteMeterNo(item.OnsiteMeterNo);
          setOnsiteMake(item.OnsiteMake);
          setOnsitePhase(item.Onsitephase);
          setOnsiteVolts(item.OnsiteVolts);
          setOnsiteMeterConstant(item.OnsiteMeterConstant);
          setOnsiteSecuritySlipNo(item.OnsiteSecuritySlipNo);
          setOnsiteMultiplyingFactor(item.OnsiteMultiplyingFactor);
          setPowerMeterRemarks(item.PowerMeterRemarks);

          setConsumerName(item.ConsumerName);
          setMobileNo(item.MobileNo);
          setconsumerNameCNIC(item.ConsumerNameCNIC);
          setConsumerRemarks(item.ConsumerRemarks);
          setIsConsumerRefuseYN(item.IsConsumerRefuseYN);
          setConsumerRefuseYN(item.IsConsumerRefuseYN);
          setIsConsumerSign(item.IsConsumerSign);
          setConsumerSign(item.ConsumerSign);

          if (item.ConsumerSignature != undefined) {
            setSign(item.ConsumerSignature[0].consSign);
            setConsumerSignature(item.ConsumerSignature);
            setIsSignature(item.IsSignature);
          }

          if (item.ConsumerImages != undefined) {
            setConsumerImages(item.ConsumerImages);
            setImages1(item.Images1);
          }
          if (item.SIRImages != undefined) {
            setIsImage(item.SIRImageFlag);
            setImages(item.SIRImages);
          }

          setTableList(item.ApplianceDetail);
          setOnsiteMeter(item.OnsiteMeterDetail);

          console.log('item.Tarif: ' + item.Tariff);
          console.log('item.PremiseType: ' + item.PremiseType);
          console.log('item.PremiseCategory: ' + item.PremiseCategory);
        }
      });
    });

    // Saad Comment Loading Meter Detail - System
    AsyncStorage.getItem('SystemMeter').then(items => {
      var localData = items ? JSON.parse(items) : [];
      console.log('data.Vertrag;', data.Vertrag);
      var filterData = localData.filter(item => {
        return item.CONTRACT == data.Vertrag;
      });
      console.log('filterData:SystemMeter:length: ' + filterData.length);
      setSystemMeter(filterData);
      setSystemMeterNo(filterData[0].Geraet);
      setSystemMake(filterData[0].Herst);
      setSystemVolts(filterData[0].Voltage);
      setSystemPhase(filterData[0].Phase);
      //console.log('filterData.Geraet: ', filterData[0].Geraet);
    });

    // Saad Comment Loading Meter Detail - Onsite
    AsyncStorage.getItem('OnsiteMeter').then(items => {
      var localData = items ? JSON.parse(items) : [];
      console.log('data.Vertrag;', data.Vertrag);
      var filterData = localData.filter(item => {
        return item.CONTRACT == data.Vertrag;
      });
      console.log('filterData:OnsiteMeter:length: ' + filterData.length);
      //setOnsiteMeter(filterData);
      setOnsiteMeterNo(filterData[0].Geraet);
      setOnsiteMake(filterData[0].Herst);
      //console.log('filterData.Geraet: ', filterData[0].Geraet);
    });

    // Saad Comment Loading Appliances Data
    AsyncStorage.getItem('Appliances').then(items => {
      var data = items ? JSON.parse(items) : [];
      //console.og('********items.id', data);
      setItemsAppliance(data);
    });

    // Saad Comment Loading Tarif Data
    AsyncStorage.getItem('Tariff').then(items => {
      var data = items ? JSON.parse(items) : [];
      setItemsTarif(data);
    });
    // Saad Comment Loading PremiseType Data
    AsyncStorage.getItem('PremiseType').then(items => {
      var data = items ? JSON.parse(items) : [];
      setItemsPremiseType(data);
    });
    // Saad Comment Loading MRNote Data
    AsyncStorage.getItem('MRNote').then(items => {
      var data = items ? JSON.parse(items) : [];
      setItemsMRNote(data);
      //console.log(data);
    });
    // Saad Comment Loading DISCREPANCY Data
    AsyncStorage.getItem('DISCREPANCY').then(items => {
      var localData = items ? JSON.parse(items) : [];
      var count1 = 0;
      var filterData = localData.filter(item => {
        return item.SIR == data.Sirnr;
      });
      console.log('filterData:DISCREPANCY:length: ' + filterData.length);
      setApiRes(filterData);
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );
    return () => backHandler.remove();
  }, []);

  const getApiData = async () => {
    //  console.log('get api data function');
    setLoader(true);
    try {
      let response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setLoader(false);
      // console.log('res', response.data);
      //setApiRes(response.data);
    } catch (error) {
      alert('getApiData: ' + error);
      setLoader(false);
      console.log('getApiData:Error: ', error);
    }
  };

  const [tableList, setTableList] = useState([]);
  const [appliancelist, setApplianceList] = useState([]);
  const [descripancylist, setDescripancyList] = useState([]);

  const [powerMeterRemarks, setPowerMeterRemarks] = useState('');

  const [loadDetail1, setLoadDetail] = useState(null);
  const [items, setItems] = useState([
    {id: 0, value: 'Fan', name: 'Fan'},
    {id: 1, value: 'Bulb', name: 'Bulb'},
    {id: 2, value: 'Energy Saver', name: 'Energy Saver'},
    {id: 3, value: 'Tube Light', name: 'Tube Light'},
    {id: 4, value: 'Heater', name: 'Heater'},
    {id: 5, value: 'AC-Window', name: 'AC-Window'},
    {id: 6, value: '1 1/2 Ton', name: '1 1/2Ton'},
    {id: 7, value: '1 Ton', name: '1 Ton'},
  ]);

  //  const [items, setItems] = useState([]);

  const deleteAppliance = (index, e) => {
    setTableList(tableList.filter((v, i) => i !== index));
  };
  const deleteOnsiteMeter = (index, e) => {
    setOnsiteMeter(onsitemeter.filter((v, i) => i !== index));
  };

  const onAddmore = () => {
    let totWatts = 0;
    if (quantity == '') {
      setQuantity(0);
    }
    itemsAppliance.filter(singleItem => {
      if (singleItem.value == valueAppliance) {
        console.log('singleItem.RATING: ' + singleItem.RATING);
        totWatts = Number(quantity) * Number(singleItem.RATING);
        setTotalWatts(totWatts);

        setTableList([
          ...tableList,
          {
            id: Date.now(),
            LoadDetailID: valueAppliance,
            LoadDetails: valueAppliance,
            Quantity: quantity,
            Rating: singleItem.RATING,
            TotalWatts: totWatts,
          },
        ]);

        setApplianceList([
          ...appliancelist,
          {
            Sirnr: data.Sirnr,
            ZsirAppname: valueAppliance,
            Acount: quantity,
            TTLOAD: singleItem.RATING,
          },
        ]);

        setQuantity();
        setValueAppliance();
      }
    });
  };

  const onAddmoreOnsite = () => {
    console.log('valuePowerRegister:' + valueOnsiteRegister);
    console.log('onsitemeterreading:' + onsitemeterreading);
    setOnsiteMeter([
      ...onsitemeter,
      {
        Zkennziff: valueOnsiteRegister,
        FreetextM2: onsitemeterreading,
        GeraetM2: onsitemeterNo,
        Sirnr: data.Sirnr,
      },
    ]);

    setValueOnsiteRegister();
    setOnsiteMeterReading();
  };

  //console.log('list table', tableList);

  const updateLoadDetail = (text, index) => {
    console.log('text-----------------------', text.name);
    console.log('index-----------------------', index);

    console.log('ali');

    const listItems = tableList.map(singleItem => {
      console.log('singleItem.LoadDetail:' + singleItem.LoadDetails);
      console.log('singleItem.id:' + singleItem.id);
      console.log('singleItem.Quantity:' + singleItem.Quantity);
      console.log('singleItem.Rating:' + singleItem.Rating);
    });
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], LoadDetail: text.name};
    newArray[index] = {...newArray[index], id: text.id};
    setTableList(newArray);
    //setLoadDetail([...newArray]); // Ali sarfaraz
  };

  const updateTableList = () => {
    setTableList(TableList => [
      ...TableList,
      {LoadDetails: loadDetails, Quantity: quantity, Rating: rating},
    ]);
  };
  const updateLoadDetails = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], LoadDetails: text};
    setTableList(newArray);
  };
  const updateQuantity = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], Quantity: text};
    setTableList(newArray);
  };
  const updateRating = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], Rating: text};
    console.log('newArray[index]---------------', newArray[index].Quantity);
    let totWatts = Number(newArray[index].Quantity) * Number(text);
    newArray[index] = {...newArray[index], TotalWatts: totWatts};
    console.log('TotalWatts;;;;', totWatts);
    setTableList(newArray);
  };

  const updateTotalWatts = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], TotalWatts: text};
    setTableList(newArray);
  };

  let onChangeTabHandler = (name, id) => {
    setTab(name);
    console.log(pos);
    if (id == 1) {
      scrollRef.current.scrollTo({x: pos});
    } else if (id == list.length - 1) {
      scrollRef.current.scrollTo({x: pos - 120});
    } else {
      scrollRef.current.scrollTo({x: pos + 120});
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
    <ScrollView
      // nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled">
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          //</View> nestedScrollEnabled={true}
        >
          <View style={styles.footer}>
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
                  {'SIR No: ' + data.Sirnr}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Consumer No: ' + data.CONSUMER_NO}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Name: ' + data.NAME}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Address: ' + data.ADDRESS}
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
                  {'Assign To: ' + data.AssignMio + '-' + data.MIO_NAME}
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
                  {'Cluster / IBC: ' + data.CLUSTER + '/' + data.Ibc}
                </Text>

                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Account No: ' + data.Vkont}
                </Text>
              </View>
            </View>
          </View>
          {/* </Animatable.View> */}
        </ScrollView>
        <ScrollView
          horizontal={true}
          keyboardShouldPersistTaps="handled"
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
                        {color: li.active == true ? '#fff' : '#000'},
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
              keyboardShouldPersistTaps="handled"
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
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Discrepancy
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 4, color: 'black'}}>
                          Ticket
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 4, color: 'black'}}>
                          Description
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Priority
                        </DataTable.Title>
                      </DataTable.Header>
                      {apiRes.length !== 0 &&
                        apiRes.map((l, i) => (
                          <DataTable.Row style={styles.databeBox} key={i}>
                            <View style={{flex: 2}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDiscrepancy(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.Code}
                              />
                              {/* {l.test} */}
                            </View>
                            <View style={{flex: 4}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateTicket(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.Id}
                              />
                            </View>
                            <View style={{flex: 4}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDescription(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.Des}
                              />
                            </View>
                            <View style={{flex: 2}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updatePriority(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.Priority}
                              />
                            </View>
                          </DataTable.Row>
                        ))}
                    </DataTable>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        elevation: 10,
                        width: 400,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 25,
                        padding: 5,
                        marginBottom: 10,
                      }}
                      //onPress={() => getApiData()}
                    >
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        {' '}
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
                    <View style={{flex: 6}}>
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
                          <View style={{flex: 2}}>
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

                          <View style={{flex: 2, widht: '100%'}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Sanction Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setSanctionLoad(text);
                              }}
                              value={sanctionLoad}
                              editable={false}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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

                          <View style={{flex: 2, widht: '100%'}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Meter Testing Result'}
                              //keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterTesting(text);
                              }}
                              value={meterTesting}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%age Diff'}
                              //keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setAgediff(text);
                              }}
                              value={agediff}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%= Meter'}
                              //keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterPer(text);
                              }}
                              value={meterPer}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'%= Slow'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeterSlow(text);
                              }}
                              value={meterSlow}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Connected Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setConnectedLoad(text);
                              }}
                              value={connectedLoad}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
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
                          <View style={{flex: 2}}>
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
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Running Load'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setRunningLoad(text);
                              }}
                              value={runningLoad}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
          {tab == 'Descrepancy and Findings' && (
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              autoCapitalize="characters"
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
                              }}
                              value={serviceType}
                              editable={isEditable}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <DropDownPicker
                              disabled={!isEditable}
                              listMode="MODAL"
                              searchable
                              open={openTarif}
                              value={valueTarif}
                              items={itemsTarif}
                              setOpen={setOpenTarif}
                              setValue={setValueTarif}
                              setItems={setItemsTarif}
                              onChangeValue={item => {
                                console.log('Tarif:valueTarif:: ' + valueTarif);
                              }}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <DropDownPicker
                              disabled={!isEditable}
                              listMode="MODAL"
                              open={openPremiseType}
                              value={valuePremiseType}
                              items={itemsPremiseType}
                              setOpen={setOpenPremiseType}
                              setValue={setValuePremiseType}
                              setItems={setItemsPremiseType}
                              searchable
                              onChangeValue={item => {
                                console.log(
                                  'PremiseType:onChangeValue: ' + item,
                                );
                              }}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              autoCapitalize="characters"
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
                              }}
                              value={premiseCategory}
                              editable={isEditable}
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
                              Discrepancy
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <View style={styles.multiSelectContainer}>
                            <MultiSelect
                              //items={items1}
                              items={itemsMRNote}
                              uniqueKey="id"
                              onSelectedItemsChange={e =>
                                onSelectedItemsChange(e)
                              }
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
                              searchInputStyle={{color: 'black'}}
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
                              Finding and Recommendation{' '}
                            </Text>
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
                          <View style={{flex: 2, alignItems: 'flex-start'}}>
                            <TextInput
                              multiline={true}
                              onChangeText={text => {
                                setDiscrepancyfindingsRemarks(text);
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
                              }}
                              value={discrepancyfindingsRemarks}
                              editable={isEditable}
                            />
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
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={false}
              horizontal={true}
              keyboardShouldPersistTaps="handled">
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <Card>
                    <DataTable>
                      <DataTable.Header
                        style={[
                          styles.databeHeader,
                          {backgroundColor: 'white'},
                        ]}>
                        <DataTable.Title style={{flex: 20, color: 'black'}}>
                          Load Detail
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Quantity
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Rating (W)
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Total Watts
                        </DataTable.Title>
                      </DataTable.Header>
                      {tableList.map((l, i) => (
                        <DataTable.Row style={styles.databeBox} key={i}>
                          <View style={{flex: 14, backgroundColor: 'white'}}>
                            <Text
                              style={styles.input}
                              //onChangeText={t => updateLoadDetails(t, i)}
                              placeholder="LoadDetails"
                              placeholderTextColor="black"
                              fontSize={12}>
                              {l.LoadDetails}
                            </Text>
                          </View>
                          <View style={{flex: 6}}>
                            <Text
                              style={styles.input}
                              //onChangeText={t => updateQuantity(t, i)}
                              placeholder="Quantity"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}>
                              {l.Quantity}
                            </Text>
                          </View>
                          <View style={{flex: 5}}>
                            <Text
                              style={styles.input}
                              //onChangeText={t => updateRating(t, i)}
                              placeholder="Rating"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}>
                              {l.Rating}
                            </Text>
                          </View>
                          <View style={{flex: 7}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold',
                                padding: 7,
                                textAlign: 'right',
                                justifyContent: 'flex-end',
                              }}>
                              {l.TotalWatts}
                            </Text>
                          </View>
                          <View style={{flex: 5}}>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                //alignItems: 'center',
                                justifyContent: 'center',
                                //backgroundColor: '#1565C0',
                                //  padding: 15
                              }}
                              onPress={e => {
                                console.log('table index: ' + i);
                                deleteAppliance(i, e);
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
                                  Del
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </Card>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
                  <View style={{flex: 0.6, backgroundColor: 'white'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      listMode="MODAL"
                      searchable
                      open={openAppliance}
                      value={valueAppliance}
                      items={itemsAppliance}
                      setOpen={setOpenAppliance}
                      setValue={setValueAppliance}
                      setItems={setItemsAppliance}
                      onChangeValue={item => {
                        console.log('Tarif:onChangeValue:: ' + item);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 5,
                      flex: 0.4,
                    }}>
                    <TextInput
                      style={{backgroundColor: 'white'}}
                      onChangeText={value => setQuantity(value)}
                      placeholder="Quantity"
                      keyboardType={'numeric'}
                      placeholderTextColor="black"
                      fontSize={14}
                      value={quantity}
                      //defaultValue="1"
                    />
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    disabled={!isEditable}
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
                    <Text style={{textAlign: 'center', color: 'white'}}>
                      Add More +{' '}
                    </Text>
                  </TouchableOpacity>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmeterNo}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmake}{' '}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Phase{' '}
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemphase}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemvolts}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmeterConstant}{' '}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemsecuritySlipNo}{' '}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmultiplyingFactor}{' '}
                            </Text>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            }}></View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.mainbox}>
                      <Card>
                        <DataTable>
                          <DataTable.Header style={{backgroundColor: 'blue'}}>
                            <DataTable.Title>
                              <Text
                                style={{
                                  color: '#fff',
                                }}>
                                Register
                              </Text>
                            </DataTable.Title>
                            <DataTable.Title>
                              <Text
                                style={{
                                  color: '#fff',
                                }}>
                                Meter Reading
                              </Text>
                            </DataTable.Title>
                          </DataTable.Header>
                          {systemMeter.length !== 0 &&
                            systemMeter.map((l, i) => (
                              <DataTable.Row
                                key={i}
                                style={{
                                  backgroundColor: '#F5FCFF',
                                }}>
                                <TextInput
                                  //onChangeText={t => updateTicket(t, i)}
                                  placeholder="Please Enter"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  value={l.Kennziff}
                                  style={{
                                    flex: 1,
                                    //backgroundColor: 'green',
                                  }}
                                />
                                <TextInput
                                  //onChangeText={t => updateDescription(t, i)}
                                  placeholder="Please Enter"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  value={l.VZwstand}
                                  style={{
                                    flex: 1,
                                    //backgroundColor: 'pink',
                                  }}
                                />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value => setOnsiteMeterNo(value)}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemeterNo}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value => setOnsiteMake(value)}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemake}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Phase{' '}
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
                              style={styles.MeterSystem}
                              onChangeText={value => setOnsitePhase(value)}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitephase}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value => setOnsiteVolts(value)}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitevolts}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value =>
                                setOnsiteMeterConstant(value)
                              }
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemeterConstant}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value =>
                                setOnsiteSecuritySlipNo(value)
                              }
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitesecuritySlipNo}
                              editable={isEditable}
                            />
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              style={styles.MeterSystem}
                              onChangeText={value =>
                                setOnsiteMultiplyingFactor(value)
                              }
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemultiplyingFactor}
                              editable={isEditable}
                            />
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          marginTop: 10,
                        }}>
                        <View style={{flex: 0.5, textAlign: 'right'}}>
                          <Text
                            style={{
                              fontWeight: 'normal',
                              color: 'black',
                              marginTop: 15,
                              textAlign: 'left',
                            }}>
                            {' '}
                            Remarks
                          </Text>
                        </View>
                        <View style={{flex: 0.5}}>
                          <TextInput
                            multiline={true}
                            onChangeText={text => {
                              setPowerMeterRemarks(text);
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
                            }}
                            value={powerMeterRemarks}
                            editable={isEditable}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            }}></View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.mainbox}>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>
                            <Text
                              style={{
                                color: '#fff',
                              }}>
                              Register
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title>
                            <Text
                              style={{
                                color: '#fff',
                              }}>
                              Meter Reading
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>
                        {onsitemeter.length !== 0 &&
                          onsitemeter.map((l, i) => (
                            <DataTable.Row style={styles.databeBox} key={i}>
                              <View style={{flex: 1, backgroundColor: 'white'}}>
                                <Text
                                  style={styles.input}
                                  //onChangeText={t => updateQuantity(t, i)}
                                  placeholder="Quantity"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={14}>
                                  {l.Zkennziff}
                                </Text>
                              </View>
                              <View style={{flex: 1, backgroundColor: 'white'}}>
                                <Text
                                  style={styles.input}
                                  //onChangeText={t => updateRating(t, i)}
                                  placeholder="Rating"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={14}>
                                  {l.FreetextM2}
                                </Text>
                              </View>
                              <View style={{flex: 1, backgroundColor: 'white'}}>
                                <TouchableOpacity
                                  style={{
                                    flexDirection: 'row',
                                    //alignItems: 'center',
                                    justifyContent: 'center',
                                    //backgroundColor: '#1565C0',
                                    //  padding: 15
                                  }}
                                  onPress={e => {
                                    console.log('table index: ' + i);
                                    deleteOnsiteMeter(i, e);
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
                                      Del
                                    </Text>
                                  </LinearGradient>
                                </TouchableOpacity>
                              </View>
                            </DataTable.Row>
                          ))}
                      </DataTable>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <View
                        style={{
                          flex: 0.6,
                          backgroundColor: 'white',
                          borderBottomColor: 'gray',
                          borderWidth: 1,
                        }}>
                        <DropDownPicker
                          disabled={!isEditable}
                          listMode="MODAL"
                          searchable
                          open={openOnsiteRegister}
                          value={valueOnsiteRegister}
                          items={itemsOnsiteRegister}
                          setOpen={setOpenOnsiteRegister}
                          setValue={setValueOnsiteRegister}
                          setItems={setItemsOnsiteRegister}
                          onChangeValue={item => {
                            console.log(
                              'PowerRegister:onChangeValue:: ' + item,
                            );
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 0.6,
                          backgroundColor: 'white',
                          borderBottomColor: 'gray',
                          borderWidth: 1,
                        }}>
                        <TextInput
                          style={{flex: 0.2, backgroundColor: 'white'}}
                          onChangeText={value => setOnsiteMeterReading(value)}
                          placeholder="Meter Reading"
                          keyboardType={'numeric'}
                          placeholderTextColor="black"
                          fontSize={14}
                          value={onsitemeterreading}
                        />
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={!isEditable}
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
                        onPress={() => onAddmoreOnsite()}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          Add More +{' '}
                        </Text>
                      </TouchableOpacity>
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              }}
                              value={consumerName}
                              editable={isEditable}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              }}
                              value={mobileNo}
                              editable={isEditable}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setconsumerNameCNIC(text);
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={consumerNameCNIC}
                              editable={isEditable}
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
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                          <View style={{flex: 2, alignItems: 'flex-start'}}>
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
                              }}
                              value={consumerRemarks}
                              editable={isEditable}
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
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            disabled={!isEditable}
                            radio_props={radio_props}
                            initial={isConsumerRefuseYN}
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
                            buttonWrapStyle={{marginLeft: 10}}
                            onPress={value => {
                              ({value: value});
                              if (value == 0) {
                                setConsumerRefuseYN('Yes');
                                setIsConsumerRefuseYN(0);
                              } else {
                                setConsumerRefuseYN('No');
                                setIsConsumerRefuseYN(1);
                              }
                            }}
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
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            disabled={!isEditable}
                            radio_props={radio_propsS}
                            initial={isConsumerSign}
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
                            buttonWrapStyle={{marginLeft: 10}}
                            onPress={value => {
                              ({value: value});
                              if (value == 0) {
                                setConsumerSign('Yes');
                                setIsConsumerSign(0);
                              } else {
                                setConsumerSign('No');
                                setIsConsumerSign(1);
                              }
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={[styles.container1]}>
                      <View
                        style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Text style={styles.text_left}>
                            Picture (Optional)
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                          }}>
                          <TouchableOpacity
                            onPress={() => captureImage('photo', '1')}>
                            <Image
                              source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                              style={styles.imageStyle}
                            />
                          </TouchableOpacity>

                          <ImageViewConsumer
                            images={[images1]} // images1[0].uri //images1
                            imageIndex={0}
                            visible={visible1}
                            onRequestClose={() => setIsVisible1(false)}
                          />
                          <View style={{flex: 2.5}}>
                            <TouchableOpacity
                              onPress={() => setIsVisible1(true)}>
                              <Image
                                source={{uri: images1.uri}} /// source={{uri: filePath.uri}}
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
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                        <TouchableOpacity
                          onPress={() => {
                            setSignModalVisible(true);
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              //  marginTop: -10,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: 'blue',
                              }}>
                              Take Signature{' '}
                            </Text>
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
                      <View
                        style={{flex: 0.9, alignItems: 'flex-start'}}></View>

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
                              resizeMode={'contain'}
                              style={{width: 114, height: 114}}
                              //source={{ base64: signaturePreview}}
                              source={{
                                uri:
                                  'data:image/png;base64,' + signaturePreview,
                              }}
                              // source={require('/storage/emulated/0/Android/data/com.sirdigitization/files/saved_signature/signature.png')}
                            />
                            {isSignature == 'Y' ? (
                              <TouchableOpacity
                                onPress={() => {
                                  setTimeout(() => {
                                    setSign();
                                    setIsSignature('N');
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
                              </TouchableOpacity>
                            ) : null}
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
                      }}></View>
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
                        Photos of Surveyed Meter
                      </Text>
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

                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // height: 50,
                        flexDirection: 'row',
                        marginVertical: 10,
                        marginLeft: 85,
                        // paddingHorizontal: 110,
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
                                  style={{height: 200, width: 200}}></Image>
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
                          );
                        }}
                        // sliderWidth={150}
                        //itemWidth={120}
                        onSnapToItem={index => onSelect(index)}
                      />
                    </View>

                    <Modal
                      visible={imageview}
                      transparent={true}
                      closeOnClick={true}>
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
                        disabled={!isEditable}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          //    backgroundColor: '#1565C0',
                          //   padding: 15
                        }}
                        onPress={() => {
                          setButtonType('Save');
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
                            Save
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!isEditable}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          //    backgroundColor: '#1565C0',
                          //  padding: 15
                        }}
                        onPress={() => {
                          // setUploadingMsg(res.d.Return);
                          setButtonType('Post');
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
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
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
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginLeft: 1,
          }}
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
            <SafeAreaView style={styles.container3}>
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
                      style={styles.signatureSubmit}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        Ok
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
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

            <Text style={{color: 'green', fontSize: 16, textAlign: 'center'}}>
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
            <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
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
                  if (buttonType == 'Post') {
                    //PostRoshniBaji();
                    PostSIRImageData();
                    return;

                    NetInfo.fetch().then(state => {
                      if (state.isConnected) {
                        console.log(' **** You are online! ******** ');
                        PostSIRSimultaneous();
                      } else {
                        Alert.alert('You are offline!');
                        return;
                      }
                    });
                  } else if (buttonType == 'Save') {
                    StoreInDevice('Save', false);
                  }
                  //setLoader(true);
                  //PostDescripancyList();

                  //GetImageAPIToken();
                  //PostSIRImageData();

                  /* //Saad Commented on 23-dec-2022
                  AsyncStorage.getItem('SIRDigitization').then(items => {
                    var data1 = [];

                    data1 = items ? JSON.parse(items) : [];

                    data1 = [
                      ...data1,
                      {
                        CaseType: 'Planned',
                        SIRType: 'Ordinary',
                        Status: 'Pending',
                        SDate: Moment(Date.now()).format('YYYY-MM-DD'),
                        SanctionLoad: sanctionLoad,
                        MeterTesting: meterTesting,
                        Agediff: agediff,
                        MeterPer: meterPer,
                        MeterSlow: meterSlow,
                        ConnectedLoad: connectedLoad,
                        RunningLoad: runningLoad,
                        OnsiteMeterNo: onsitemeterNo,
                        OnsiteMake: onsitemake,
                        Onsitephase: onsitephase,
                        OnsiteVolts: onsitevolts,
                        OnsiteMeterConstant: onsitemeterConstant,
                        OnsiteSecuritySlipNo: onsitesecuritySlipNo,
                        OnsiteMultiplyingFactor: onsitemultiplyingFactor,
                        SystemMake: systemmake,
                        SystemAmperes: systemamperes,
                        SystemVolts: systemvolts,
                        SystemPhase: systemphase, // Saad add on 16-Dec-2022
                        SystemMeterConstant: systemmeterConstant,
                        SystemSecuritySlipNo: systemsecuritySlipNo,
                        SystemMultiplyingFactor: systemmultiplyingFactor,
                        SystemMeterNo: systemmeterNo,
                        SystemCurrentReading: systemmcurrentReading,
                        SystemPeakReading: systemmpeakReading,
                        ConsumerName: consumerName,
                        MobileNo: mobileNo,
                        ConsumerCNIC: consumerNameCNIC,
                        ConsumerRemarks: consumerRemarks,
                        ConsumerRefuseYN: consumerRefuseYN,
                        ConsumerSign: consumerSign,
                        ServiceType: serviceType,
                        Tariff: tarif,
                        PremiseType: premiseType,
                        PremiseCategory: premiseCategory,
                        Remarks: remarks,
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
                        DiscrepancyRecord: apiRes,
                        ApplianceDetail: tableList,

                        ConsumerStatus: null,
                        IndustryType: null,
                        ServiceType: null,
                        SizeofService: null,
                        FedFromPMTSS: null,
                        PmtSSCode: null,
                        MeterTestingResultTC: null,
                        MeterTestingperError: null,
                        ContractLoad: null,
                        ConnectedLoadKW: null,
                        RunningLoadKW: null,
                        Metertestingto: null,
                        Meterinstalled1: null,
                        Meterinstalled2: null,
                        Meterinstalled: null,
                        Statuspostalorder: null,
                        Metertestingresultremarks: null,
                        Fmrno: null,
                        Date1: null,
                        FindingItems: null,
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
                        LightmeterdetailFlag: 'N',
                        PowermeterdetailFlag: 'N',
                        PostalOrderSealFlag: 'N',
                        MeteringEquipmentFlag: 'N',
                        PostalOrderSeal: null,
                        PowerFactor: null,
                        Kto: null,
                        PerError: null,
                        PowerCalculated: null,
                        PowerObserved: null,
                        MeteringEquipment: null,
                        MeterInstalled3: null,
                      },
                    ];

                    AsyncStorage.setItem(
                      'SIRDigitization',
                      JSON.stringify(data1),
                    );

                    // console.log("data1", data1);
                  });
*/ //Saad Commented on 23-dec-2022
                  /*
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                  });
*/
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
    shadowOffset: {width: 10, height: 10},
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
    //margin: 8,
    marginLeft: 2,
    //height:500,
    //width:500,
    //flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1565C0',
  },
  databeBox: {
    margin: 5,
    width: 398,
    textAlign: 'center',
    color: 'black',
  },
  databeHeader: {
    margin: 10,
    //textAlign: 'left',
    color: 'green',
    backgroundColor: '#1565C0',
    color: 'pink',
  },
  input: {
    width: 80,
    padding: 4,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
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
    paddingVertical: 10,
    //padding: 15,
  },

  signIn: {
    width: '100%',
    height: 30,
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
  signatureSubmit: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
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
    height: 482,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: -100,
  },
  previewText: {
    color: 'red',
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#69B2FF',
    width: 120,
    textAlign: 'center',
    marginTop: 10,
  },
});
