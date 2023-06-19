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

import AsyncStorage from '@react-native-community/async-storage';

import {myGlobalVariable} from './globals';

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
  const [tariff, setTariff] = useState('');

  const [ibcName, setIbcName] = useState('');
  const [CELL_NUMBER, setCELL_NUMBER] = useState('');

  // saad Comment Service Type Dropdowm
  const [openServiceType, setOpenServiceType] = useState(false);
  const [valueServiceType, setValueServiceType] = useState(null);
  const [itemsServiceType, setItemsServiceType] = useState([
    {label: 'O/H', value: 'O/H'},
    {label: 'U/G', value: 'U/G'},
  ]);

  // saad Comment Phase Dropdowm
  const [openOnsitePhase, setOpenOnsitePhase] = useState(false);
  const [valueOnsitePhase, setValueOnsitePhase] = useState(null);
  const [itemsOnsitePhase, setItemsOnsitePhase] = useState([
    {label: '1', value: '1'},
    {label: '3', value: '3'},
  ]);

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
    let localdata = [],
      localcompletedata = [];

    if (selectedItems.length > 10) {
      return;
    } else {
      setSelectedItems(selectedItems);
      setIsSelecteditems('Y');

      selectedItems.filter(item => {
        localdata.push({
          Sirnr: data.Sirnr,
          Discrepancy: item,
        });
      });

      descripancyRecordedList.filter(item => {
        localcompletedata.push({
          Sirnr: data.Sirnr,
          Discrepancy: item,
        });
      });

      selectedItems.filter(item => {
        localcompletedata.push({
          Sirnr: data.Sirnr,
          Discrepancy: item,
        });
      });

      setDescripancyList(localdata);
      setCompleteDescripancyList(localcompletedata);

      console.log(localcompletedata);
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
  const [descripancyRecordedList, setdescripancyRecordedList] = useState([]);

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
  const [SIRIMAGE, setSIRIMAGE] = useState('');
  const [SIRIMAGECONSUMER, setSIRIMAGECONSUMER] = useState('');

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
  const [agedifferror, setAgedifferror] = useState('');
  const [meterTestingerror, setmeterTestingerror] = useState('');
  const [meterPerError, setMeterPerError] = useState('');
  const [meterSlowError, setMeterSlowError] = useState('');
  const [connectedLoadError, setConnectedLoadError] = useState('');
  const [runningLoadError, setRunningLoadError] = useState('');
  const [serviceTypeError, setServiceTypeError] = useState('');
  const [premiseCategoryError, setPremiseCategoryError] = useState('');
  const [discrepancyfindingsRemarksError, setDiscrepancyfindingsRemarksError] =
    useState('');
  const [quantityError, setQuantityError] = useState('');
  const [onsiteMeterNoError, setOnsiteMeterNoError] = useState('');
  const [onsiteMakeError, setOnsiteMakeError] = useState('');
  const [onsitePhaseError, setOnsitePhaseError] = useState('');
  const [onsiteVoltsError, setOnsiteVoltsError] = useState('');
  const [onsiteMeterConstantError, setOnsiteMeterConstantError] = useState('');
  const [onsiteSecuritySlipNoError, setOnsiteSecuritySlipNoError] =
    useState('');
  const [onsiteMultiplyingFactorError, setOnsiteMultiplyingFactorError] =
    useState('');
  const [powerMeterRemarksError, setPowerMeterRemarksError] = useState('');
  const [onsiteMeterReadingError, setOnsiteMeterReadingError] = useState('');
  const [consumerNameError, setConsumerNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [consumerNameCNICError, setConsumerNameCNICError] = useState('');
  const [consumerRemarksError, setConsumerRemarksError] = useState('');

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
    {label: 'P1', value: 'P1'},
    {label: 'K0', value: 'K0'},
    {label: 'R1', value: 'R1'},
    {label: 'X1', value: 'X1'},
    {label: 'R0', value: 'R0'},
    {label: 'MDI-OFF', value: 'MDI-OFF'},
    {label: 'MDI-ON', value: 'MDI-ON'},
    {label: 'K1i', value: 'K1i'},
    {label: 'P1i', value: 'P1i'},
    {label: 'MDI-OFFi', value: 'MDI-OFFi'},
    {label: 'MDI-ONi', value: 'MDI-ONi'},
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
  const [reviewRemarks, setReviewRemarks] = useState('');

  const [discrepancyfindingsRemarks, setDiscrepancyfindingsRemarks] =
    useState('');
  /* Discrepancy and Findings ------------ End */

  /* Customer Acknowlegment ------------ Start */

  const [consumerName, setConsumerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [consumerNameCNIC, setConsumerNameCNIC] = useState('');
  const [consumerRemarks, setConsumerRemarks] = useState('');

  const [consumerRefuseYN, setConsumerRefuseYN] = useState('Yes');
  const [isConsumerRefuseYN, setIsConsumerRefuseYN] = useState(0);

  const [consumerSign, setConsumerSign] = useState('Yes');
  const [isConsumerSign, setIsConsumerSign] = useState(0);

  // Saad added on 16-Dec-2022
  const [loadDetails, setLoadDetails] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [rating, setRating] = useState('');
  const [totalWatts, setTotalWatts] = useState('');

  const [sirdate, setSirDate] = useState('');
  const [sirtime, setSirTime] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const [NAME, setNAME] = useState('');
  const [ADDRESS, setADDRESS] = useState('');
  const [CONSUMER_NO, setCONSUMER_NO] = useState('');
  const [Vkont, setVkont] = useState('');
  const [TARIFF, setTARIFF] = useState('');
  const [CLUSTER, setCLUSTER] = useState('');

  /* Customer Acknowlegment ------------ End */

  const SPACING = 10;
  const THUMB_SIZE = 80;
  const flatListRef = useRef();
  const carouselRef = useRef();

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };
  //RFCGWSIR:Z@p123456789
  const PostMeterData = () => {
    console.log('**** PostMeterData ****');

    console.log('data.Sirnr' + data.Sirnr);
    axios({
      method: 'POST',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_METER_DATA_POSTING_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_REGISTER_POSTING_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
        url:
          'https://' +
          myGlobalVariable[0] +
          '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_LAT_LONGITUDE_POSTING1_SRV/HEADERSet',
        headers: {
          Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
            routes: [{name: 'SupportScreen'}],
          });
        })
        .catch(error => {
          console.error(error);
          alert('PostGeoLocation:error ' + error);
        });
    });
  };

  const validate = (text, textLength) => {
    if (text.length <= textLength) {
      return false;
    }
    return true;
  };

  const StoreInDeviceImagesConsumer = isPost => {
    let dataConsumerImages = [];

    dataConsumerImages.push({
      Sirnr: SIR,
      IsSignature: isSignature,
      ConsumerSignature: consumerSignature,
      ConsumerImageFlag: IsImage1,
      ConsumerImages: consumerImages,
      //Images1: images1,
    });
    AsyncStorage.setItem(SIRIMAGECONSUMER, JSON.stringify(dataConsumerImages));

    StoreInDeviceImages(isPost);
  };
  const StoreInDeviceImages = isPost => {
    let dataSIRImages = [];
    dataSIRImages.push({
      Sirnr: SIR,
      SIRImageFlag: isImage,
      SIRImages: images,
    });
    AsyncStorage.setItem(SIRIMAGE, JSON.stringify(dataSIRImages));

    if (isPost) {
      PostGeoLocation();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'SupportScreen'}],
      });
    }
    setAuthModalVisible(!isAuthModalVisible);
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const StoreInDevice = (
    status,
    isPost,
    Result_Discrepancies,
    Result_Appliances,
    Result_Meter,
    Result_Register,
    Result_Onsite,
    Result_MeterSeal,
  ) => {
    let SIRData = [];
    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data1 = JSON.parse(items);
      data1.filter((item, index) => {
        if (item.Sirnr == SIR) {
          console.log('item.Sirnr: ', item.Sirnr);
          console.log('index: ', index);
          console.log('SIR: ', SIR);
          console.log('status: ', status);

          data1[index].SIRType = 'ORD';
          data1[index].SirFormat = 'ORD';
          data1[index].Status = status;
          data1[index].CONSUMER_NO = data.CONSUMER_NO;
          data1[index].NAME = data.NAME;
          data1[index].ADDRESS = data.ADDRESS;
          data1[index].Erdat = data.Erdat;
          data1[index].TARIFF = data.TARIFF;
          data1[index].AssignMio = data.AssignMio;
          data1[index].MIO_NAME = data.MIO_NAME;
          data1[index].CELL_NUMBER = data.CELL_NUMBER;
          data1[index].CLUSTER = data.CLUSTER;
          data1[index].IBCNAME = data.IBCNAME;
          data1[index].Vkont = data.Vkont;
          data1[index].Vertrag = data.Vertrag;
          //data1[index].AccountNo = accountno;
          data1[index].Ibc = data.Ibc;
          data1[index].MRU = data.MRU;

          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
        }
      });
    });

    SIRData.push({
      SIRType: 'ORD',
      SirFormat: 'ORD',
      Status: status,

      Vertrag: contract,
      Vkont: Vkont,
      Erdat: data.Erdat,
      AssignMio: data.AssignMio,
      ADDRESS: data.ADDRESS,
      NAME: data.NAME,
      CONSUMER_NO: data.CONSUMER_NO,
      Ibc: data.Ibc,
      MIO_NAME: data.MIO_NAME,
      CLUSTER: data.CLUSTER,
      CELL_NUMBER: data.CELL_NUMBER,
      TARIFF: data.TARIFF,
      MRU: data.MRU,

      SIRTime: sirtime,
      SIRDate: sirdate,
      SANCTION_LOAD: sanctionLoad,
      MeterTesting: meterTesting,
      Agediff: agediff,
      MeterPer: meterPer,
      MeterSlow: meterSlow,
      ConnectedLoad: connectedLoad,
      RunningLoad: runningLoad,
      OnsiteMeterNo: onsitemeterNo,
      OnsiteMake: onsitemake,
      OnsitePhase: valueOnsitePhase,
      OnsiteVolts: onsitevolts,
      OnsiteMeterConstant: onsitemeterConstant,
      OnsiteSecuritySlipNo: onsitesecuritySlipNo,
      OnsiteMultiplyingFactor: onsitemultiplyingFactor,
      OnsiteMeterDetail: onsitemeter,
      PowerMeterRemarks: powerMeterRemarks,
      SystemMake: systemmake,
      SystemAmperes: systemamperes,
      SystemVolts: systemvolts,
      SystemPhase: systemphase,
      SystemMeterConstant: systemmeterConstant,
      SystemSecuritySlipNo: systemsecuritySlipNo,
      SystemMultiplyingFactor: systemmultiplyingFactor,
      SystemMeterNo: systemmeterNo,
      SystemCurrentReading: systemmcurrentReading,
      SystemPeakReading: systemmpeakReading,
      ConsumerName: consumerName,
      MobileNo: mobileNo,
      ConsumerNameCNIC: consumerNameCNIC,
      ConsumerRemarks: consumerRemarks,
      ConsumerRefuseYN: consumerRefuseYN,
      IsConsumerRefuseYN: isConsumerRefuseYN,
      ConsumerSign: consumerSign,
      IsConsumerSign: isConsumerSign,
      ServiceType: valueServiceType,
      Tariff: valueTarif,
      PremiseType: valuePremiseType,
      PremiseCategory: premiseCategory,
      isDiscrepancyitems: isSelecteditems,
      Discrepancyitems: selectedItems,
      DiscrepancyfindingsRemarks: discrepancyfindingsRemarks,
      longitude: longitude,
      latitude: latitude,
      UniqueId: Date.now(),
      Sirnr: SIR,

      ClusterIBC: clusterIBC,
      ConsumerNameBilling: consumernameBilling,
      AccountNo: accountno,
      AssignDate: assigndate,
      AssignTo: assignto,
      DiscrepancyRecord: apiRes,
      DescripancyDetail: descripancylist,
      CompleteDescripancyDetail: completeDescripancyList,

      ApplianceDetail: tableList,
      Appliancelist: appliancelist,

      Result_Discrepancies: Result_Discrepancies,
      Result_Appliances: Result_Appliances,
      Result_Meter: Result_Meter,
      Result_Register: Result_Register,
      Result_Onsite: Result_Onsite,
      Result_MeterSeal: Result_MeterSeal,
    });

    AsyncStorage.setItem(SIR, JSON.stringify(SIRData));
    StoreInDeviceImagesConsumer(isPost);
  };

  const PostSIRSimultaneous = connectionType => {
    var filterData = completeDescripancyList.filter(item => {
      console.log(item);
    });

    if (latitude.toString() == '') {
      alert('Please On GPS Location');
      return false;
    }
    console.log('Post SIR Simultaneous called *** ');

    if (completeDescripancyList.length < 1) {
      alert('atleast one discrepancy is mandatory');
      return false;
    }

    if (images.length < 1) {
      alert('atleast one SIR image is mandatory');
      return false;
    }

    const onsitemeterData = onsitemeter.length > 0 ? onsitemeter : [{}];
    const appliancelistData = appliancelist.length > 0 ? appliancelist : [{}];

    const descripancylistData =
      completeDescripancyList.length > 0 ? completeDescripancyList : [{}];

    const valuePremiseTypeData =
      valuePremiseType != undefined ? valuePremiseType : '';
    const valueTarifData = valueTarif != undefined ? valueTarif : '';
    const consumerRefuseYNData =
      consumerRefuseYN != undefined ? consumerRefuseYN : '';
    const consumerSignData = consumerSign != undefined ? consumerSign : '';

    console.log('valuePremiseType: ' + valuePremiseType);
    console.log('consumerSign: ' + consumerSign);
    let NOTICE_SIGN = consumerRefuseYNData + '/' + consumerSignData;

    console.log('**** Post SIR Simultaneous ***Started***');

    console.log('NOTICE_SIGN: ' + NOTICE_SIGN);

    console.log('sirdate: ' + sirdate);
    console.log('sirtime: ' + sirtime);

    axios({
      method: 'POST',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_SIMULTANEOUS_POST_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
        SERVTYPE: valueServiceType,
        TARIFTYP: valueTarifData,
        VBSART: valuePremiseTypeData,
        LATITUDE: latitude.toString(),
        LONGITUDE: longitude.toString(),
        DISC_REMARKS: consumerRemarks,
        SIR_REMARKS: discrepancyfindingsRemarks,
        METER_REMARKS: powerMeterRemarks,
        NAVAPPLIANCES: appliancelistData,
        NAVSIRITEMS: descripancylistData,
        PHASE: valueOnsitePhase,
        CON_SRC: connectionType,
        NAVMETER: [
          {
            SIRNR: data.Sirnr,
            GERAET_M1: onsitemeterNo,
            HERST_M1: onsitemake,
            ABRFAKT_M1: onsitemultiplyingFactor,
            BAUFORM_M1: onsitesecuritySlipNo,
            MATNR_M1: onsitemeterConstant,
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
            Voltage1: onsitevolts,
            //Osdevice: onsitemeterConstant,
            Osdevice: onsitemeterNo,
          },
        ],
        SIR_Meter_SealSet: [{}],
      }),
    })
      .then(res => {
        console.log(
          '******************Post SIR Simultaneous UPDATED*********************************',
        );
        console.log(
          '***********  res.data.d.Result------' +
            res.data.d.Result_Discrepancies,
          res.data.d.Result_Appliances,
          res.data.d.Result_Meter,
          res.data.d.Result_Register,
          res.data.d.Result_Onsite,
          res.data.d.Result_MeterSeal,
        );

        PostSIRImage();
        StoreInDevice(
          'Post',
          true,
          res.data.d.Result_Discrepancies,
          res.data.d.Result_Appliances,
          res.data.d.Result_Meter,
          res.data.d.Result_Register,
          res.data.d.Result_Onsite,
          res.data.d.Result_MeterSeal,
        );

        setAuthModalVisible(!isAuthModalVisible);
        setSuccessModalVisible(!isSuccessModalVisible);
        //GetImageAPIToken();
      })
      .catch(error => {
        alert(error);
        isEditable(true);
        console.error('Post SIR Simultaneous:error: ' + error);
      });
  };

  const GetImageAPIToken = () => {
    console.log(
      '******************GetImageAPIToken Called*********************************',
    );

    axios({
      method: 'GET',
      url: 'https://sir.ke.com.pk:8039/Token',
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
        //Post SIR Imag eData(res.data.access_token);
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
  const PostTestSIRImage = () => {
    console.log('Post Test SIR Image Data called');

    axios({
      method: 'GET',
      url: 'https://sir.ke.com.pk:8039/api/Image/forall',
      headers: {'content-type': 'application/json'},
    })
      .then(res => {
        console.log(
          '******************Post Test SIR Image updated*********************************',
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
  const PostSIRImage = () => {
    let data1 = [];
    let count = 1;
    console.log('Post SIR Image Data called');
    console.log(data.Sirnr);
    console.log(count.toString());
    console.log(data.Ibc);
    console.log(data.Sirnr);
    console.log(data.Vertrag);
    console.log(data.AssignMio);

    images.filter(item => {
      //console.log('item:= ' + item);
      data1.push({
        imageName: data.Ibc,
        imageBase64: item.base64,
        imageID: count.toString(),
        IBC: data.Ibc,
        SIRNo: data.Sirnr,
        ContractNo: data.Vertrag,
        MIONo: data.AssignMio,
      });
      count++;
    });

    axios({
      method: 'POST',
      url: 'https://sir.ke.com.pk:8039/api/Image/PostSIRImageData',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify(data1),
    })
      .then(res => {
        console.log(
          '******************Post SIR Image updated*********************************',
        );
        //console.log(res.data);
        PostConsumerImage(count);
      })
      .catch(error => {
        console.log('Post SIR Image ERROR STARTS NOW');
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('error.message: ', error.message);
        }
        console.log('error: ', error);
      });
  };

  const PostConsumerImage = count => {
    let consumerImageData = [];
    console.log('Post SIR Image Data called');

    consumerImages.filter(item => {
      //console.log('item:= ' + item);
      consumerImageData.push({
        imageName: data.Sirnr,
        imageBase64: item.base64,
        imageID: count.toString(),
        IBC: data.Ibc,
        SIRNo: data.Sirnr,
        ContractNo: data.Vertrag,
        MIONo: data.AssignMio,
      });
      count++;
    });

    if (isSignature == 'Y') {
      consumerImageData.push({
        imageName: data.Sirnr,
        imageBase64: signaturePreview,
        imageID: count.toString(),
        IBC: data.Ibc,
        SIRNo: data.Sirnr,
        ContractNo: data.Vertrag,
        MIONo: data.AssignMio,
      });
    }

    axios({
      method: 'POST',
      url: 'https://sir.ke.com.pk:8039/api/Image/PostSIRImageData',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify(consumerImageData),
    })
      .then(res => {
        console.log(
          '******************Post Consumer Image updated*********************************',
        );
        //console.log(res.data);
      })
      .catch(error => {
        console.error(error);
        alert('Post Consumer Image Data: ' + error);
      });
  };

  const PostDescrippancyList = () => {
    console.log('**** PostDescrippancyList ******');
    var filterData = descrippancylist.filter(item => {
      console.log(item);
    });

    axios({
      method: 'POST',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DFIND_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
    var filterData = appliancelist.filter(item => {
      console.log(item);
    });

    console.log('data.Sirnr:  ', data.Sirnr);

    axios({
      method: 'POST',
      url:
        'https://' +
        myGlobalVariable[0] +
        '.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_POSTING_APPL_SRV/SIR_HEADERSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
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
      width: 700,
      height: 700,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 1,
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
    console.log('getUserCurrentLocation:Func:call');

    // let isPermissionPermitted = await requestLocationPermission();
    //console.log('isPermissionPermitted: ' + isPermissionPermitted);

    //if (isPermissionPermitted) {
    Geolocation.getCurrentPosition(
      info => {
        const {coords} = info;

        latitude = coords.latitude;
        longitude = coords.longitude;

        setlatitude(latitude);
        setlongitude(longitude);
        console.log(latitude);
        console.log(longitude);

        // getUserCurrentAddress(latitude, longitude)
      },
      error => {
        console.log('getUserCurrentLocation:Error:');
        console.log(error);
        alert(error.message);
      },
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

    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data1 = JSON.parse(items);
      data1.filter((item, index) => {
        if (item.Sirnr == '900005027602') {
          console.log('item.Sirnr:' + item.Sirnr);
          data1[index].Status = 'Save';
          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
        }
      });
    });

    console.log('*****');
    console.log('data.Ibc: ' + data.Ibc);
    console.log('data.IBCNAME: ' + data.IBCNAME);
    console.log('data.Sirnr: ' + data.Sirnr);
    console.log('data.Vertrag: ' + data.Vertrag);
    console.log('data.CONSUMER_NO: ' + data.CONSUMER_NO);
    console.log('data.Status: ' + data.Status);
    console.log('data.MRU ' + data.MRU);

    if (data.Status != 'Post') {
      setIsEditable(true);
    }

    setReviewRemarks(data.REMARKS);

    console.log('*****');

    setSIR(data.Sirnr);
    setSIRIMAGE(data.Sirnr + 'IMAGE');
    setSIRIMAGECONSUMER(data.Sirnr + 'IMAGECONSUMER');

    setAssigndate(Moment(data.Erdat, 'YYYYMMDD').format('DD.MM.YYYY'));

    AsyncStorage.getItem(data.Sirnr + 'IMAGE').then(items => {
      var localImageData = items ? JSON.parse(items) : [];
      var filterImageData = localImageData.filter(item => {
        if (item.Sirnr == data.Sirnr) {
          if (item.SIRImages != undefined) {
            setIsImage(item.SIRImageFlag);
            setImages(item.SIRImages);
          }
        }
      });
    });

    AsyncStorage.getItem(data.Sirnr + 'IMAGECONSUMER').then(items => {
      var localImageConsumerData = items ? JSON.parse(items) : [];
      var filterImageData = localImageConsumerData.filter(item => {
        if (item.Sirnr == data.Sirnr) {
          if (item.ConsumerSignature != undefined) {
            var filterConsumerSignature = item.ConsumerSignature.filter(
              items => {
                setSign(items.consSign);
              },
            );
            setConsumerSignature(item.ConsumerSignature);
            setIsSignature(item.IsSignature);
          }

          if (item.ConsumerImages != undefined) {
            setConsumerImages(item.ConsumerImages);
            var filterConsumerImages = item.ConsumerImages.filter(items => {
              setImages1(items);
            });
          }
        }
      });
    });

    AsyncStorage.getItem(data.Sirnr).then(items => {
      var localData = items ? JSON.parse(items) : [];
      var filterData = localData.filter(item => {
        if (item.Sirnr == data.Sirnr) {
          console.log('item.SirStatus: ' + item.SirStatus);
          console.log('item.latitude: ' + item.latitude);

          setContract(item.Vertrag);
          setConsumerNo(item.CONSUMER_NO);
          setIbcName(item.ibc);

          setNAME(item.NAME);
          setADDRESS(item.ADDRESS);
          setCONSUMER_NO(item.CONSUMER_NO);
          setVkont(item.Vkont);

          setTARIFF(item.TARIFF);

          setCLUSTER(item.CLUSTER);

          setSanctionLoad(item.SANCTION_LOAD);

          setMeterTesting(item.MeterTesting);
          setAgediff(item.Agediff);
          setMeterPer(item.MeterPer);
          setMeterSlow(item.MeterSlow);
          setConnectedLoad(item.ConnectedLoad);
          setRunningLoad(item.RunningLoad);

          setValueServiceType(item.ServiceType);

          if (item.IBCNAME != undefined) setIbcName(item.IBCNAME);
          //if (item.CELL_NUMBER != undefined) setCELL_NUMBER(item.CELL_NUMBER);
          //if (item.Remarks != undefined) setRemarks(item.Remarks);
          //if (item.REMARKS != undefined) setReviewRemarks(item.REMARKS);

          setValueTarif(item.Tariff);
          setValuePremiseType(item.PremiseType);
          setPremiseCategory(item.PremiseCategory);

          setDiscrepancyfindingsRemarks(item.DiscrepancyfindingsRemarks);

          setOnsiteMeterNo(item.OnsiteMeterNo);
          setOnsiteMake(item.OnsiteMake);
          setValueOnsitePhase(item.OnsitePhase);
          setOnsiteVolts(item.OnsiteVolts);
          setOnsiteMeterConstant(item.OnsiteMeterConstant);
          setOnsiteSecuritySlipNo(item.OnsiteSecuritySlipNo);
          setOnsiteMultiplyingFactor(item.OnsiteMultiplyingFactor);
          setPowerMeterRemarks(item.PowerMeterRemarks);

          setConsumerName(item.ConsumerName);
          setMobileNo(item.MobileNo);
          setConsumerNameCNIC(item.ConsumerNameCNIC);
          setConsumerRemarks(item.ConsumerRemarks);

          if (item.SIRDate != undefined) {
            setSirDate(item.SIRDate);
            setSirTime(item.SIRTime);
          } else {
            setSirDate(moment().format('DD.MM.YYYY'));
            setSirTime(moment().format('hh:mm:ss'));
          }

          if (item.IsConsumerRefuseYN != undefined)
            setIsConsumerRefuseYN(item.IsConsumerRefuseYN);
          if (item.ConsumerRefuseYN != undefined)
            setConsumerRefuseYN(item.ConsumerRefuseYN);

          if (item.IsConsumerSign != undefined)
            setIsConsumerSign(item.IsConsumerSign);
          if (item.ConsumerSign != undefined)
            setConsumerSign(item.ConsumerSign);

          if (item.latitude == undefined || item.latitude == '') {
            getUserCurrentLocation();
          } else {
            setlatitude(item.latitude);
            setlongitude(item.longitude);
          }

          setSelectedItems(item.Discrepancyitems);
          setDescripancyList(item.DescripancyDetail);
          if (item.CompleteDescripancyDetail != undefined)
            setCompleteDescripancyList(item.CompleteDescripancyDetail);

          setTableList(item.ApplianceDetail);
          setApplianceList(item.Appliancelist);
          setOnsiteMeter(item.OnsiteMeterDetail);

          console.log('item.Tarif: ' + item.Tariff);
          console.log('item.PremiseType: ' + item.PremiseType);
          console.log('item.PremiseCategory: ' + item.PremiseCategory);
        }
      });
    });

    // Saad Comment Loading Meter Detail - System
    AsyncStorage.getItem('SystemMeter').then(items => {
      var systemLocalData = [];
      var localData = items ? JSON.parse(items) : [];
      var filterData = localData.filter(item => {
        if (item.CONTRACT == data.Vertrag) {
          setSystemMeterNo(item.Geraet);
          setSystemMake(item.Herst);
          setSystemVolts(item.Voltage);
          setSystemPhase(item.Phase);
          systemLocalData.push({
            Kennziff: item.Kennziff,
            VZwstand: item.VZwstand,
          });
        }
      });
      setSystemMeter(systemLocalData);
    });

    // Saad Comment Loading Meter Detail - Onsite
    AsyncStorage.getItem('OnsiteMeter').then(items => {
      var localData = items ? JSON.parse(items) : [];

      var filterData = localData.filter(item => {
        if (item.CONTRACT == data.Vertrag) {
          console.log('filterData:OnsiteMeter:length: ' + filterData.length);
          setOnsiteMeterNo(item.Geraet);
          setOnsiteMake(item.Herst);
        }
      });
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
      var descripancyRecordedArray = [];
      var count1 = 0;
      var filterData = localData.filter(item => {
        return item.SIR == data.Sirnr;
      });

      filterData.filter(item => {
        descripancyRecordedArray.push(item.Code);
      });

      setdescripancyRecordedList(descripancyRecordedArray);
      console.log('filterData:DISCREPANCY:length: ' + filterData.length);
      setApiRes(filterData);
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      },
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
  const [completeDescripancyList, setCompleteDescripancyList] = useState([]);

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
    setApplianceList(appliancelist.filter((v, i) => i !== index));
  };
  const deleteOnsiteMeter = (index, e) => {
    setOnsiteMeter(onsitemeter.filter((v, i) => i !== index));
  };

  const onAddmore = () => {
    let totWatts = 0;
    /*
    if (quantity == '') {
      setQuantity(1);
    }
*/
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
            TotalWatts: totWatts.toString(),
          },
        ]);

        setApplianceList([
          ...appliancelist,
          {
            Sirnr: data.Sirnr,
            ZsirAppname: valueAppliance,
            Acount: quantity,
            TTLOAD: totWatts.toString(),
          },
        ]);

        setQuantity('1');
        setValueAppliance();
      }
    });
  };

  const onAddmoreOnsite = () => {
    console.log('valuePowerRegister:' + valueOnsiteRegister);
    console.log('onsitemeterreading:' + onsitemeterreading);
    console.log('onsitemeterNo ' + onsitemeterNo);

    if (onsitemeterNo == '' || onsitemeterNo == undefined) {
      alert('Please provide Meter No first');
      return false;
    }

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
                  {'Tariff: ' + data.TARIFF}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign To: ' + data.AssignMio + '-' + data.MIO_NAME}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Cell No: ' + data.CELL_NUMBER}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {reviewRemarks}
                </Text>
              </View>
            </View>

            <View
              style={
                {
                  /*paddingTop: -15*/
                }
              }></View>
            <View
              style={{padding: 5, marginBottom: -25, paddingRight: 10}}></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  // flex: 0.45,
                  paddingTop: -70,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: -89,
                    fontSize: 12,
                    // fontWeight: 'bold',
                    color: 'black', //'#FFFFFF',
                    //     marginBottom: 4,
                  }}>
                  {'Cluster / IBC: ' + data.CLUSTER + '/' + data.IBCNAME}
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
                <View style={styles.mainbox}>
                  <Card>
                    <DataTable>
                      <DataTable.Header style={styles.databeHeader}>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Discrepancy
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Ticket
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Description
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Priority
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>
                      {apiRes.length !== 0 &&
                        apiRes.map((l, i) => (
                          <DataTable.Row style={styles.databeBox} key={i}>
                            <View style={{flex: 0.5}}>
                              <TextInput
                                editable={false}
                                style={styles.input}
                                onChangeText={t => updateDiscrepancy(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.Code}
                              />
                              {/* {l.test} */}
                            </View>
                            <View style={{flex: 0.5}}>
                              <TextInput
                                editable={false}
                                style={styles.input}
                                onChangeText={t => updateTicket(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.Id}
                              />
                            </View>
                            <View style={{flex: 1}}>
                              <TextInput
                                multiline={true}
                                editable={false}
                                style={styles.input}
                                onChangeText={t => updateDescription(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.Des}
                              />
                            </View>
                            <View style={{flex: 0.5}}>
                              <TextInput
                                editable={false}
                                style={styles.input}
                                onChangeText={t => updatePriority(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={12}
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
                                if (validate(text, 5)) {
                                  setmeterTestingerror(
                                    'Input must be at least 5 characters long.',
                                  );
                                } else setmeterTestingerror('');
                              }}
                              value={meterTesting}
                              editable={isEditable}
                            />
                            {meterTestingerror !== '' && (
                              <Text style={styles.error}>
                                {meterTestingerror}
                              </Text>
                            )}
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
                                if (validate(text, 7)) {
                                  setAgedifferror(
                                    'Input must be at least 7 characters long.',
                                  );
                                } else setAgedifferror('');
                              }}
                              value={agediff}
                              editable={isEditable}
                            />
                            {agedifferror !== '' && (
                              <Text style={styles.error}>{agedifferror}</Text>
                            )}
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
                                if (validate(text, 7)) {
                                  setMeterPerError(
                                    'Input must be at least 7 characters long.',
                                  );
                                } else setMeterPerError('');
                              }}
                              value={meterPer}
                              editable={isEditable}
                            />
                            {meterPerError !== '' && (
                              <Text style={styles.error}>{meterPerError}</Text>
                            )}
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
                                if (validate(text, 7)) {
                                  setMeterSlowError(
                                    'Input must be at least 7 characters long.',
                                  );
                                } else setMeterSlowError('');
                              }}
                              value={meterSlow}
                              editable={isEditable}
                            />
                            {meterSlowError !== '' && (
                              <Text style={styles.error}>{meterSlowError}</Text>
                            )}
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
                                if (validate(text, 14)) {
                                  setConnectedLoadError(
                                    'Input must be at least 14 characters long.',
                                  );
                                } else setConnectedLoadError('');
                              }}
                              value={connectedLoad}
                              editable={isEditable}
                            />
                            {connectedLoadError !== '' && (
                              <Text style={styles.error}>
                                {connectedLoadError}
                              </Text>
                            )}
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
                                if (validate(text, 14)) {
                                  setRunningLoadError(
                                    'Input must be at least 14 characters long.',
                                  );
                                } else setRunningLoadError('');
                              }}
                              value={runningLoad}
                              editable={isEditable}
                            />
                            {runningLoadError !== '' && (
                              <Text style={styles.error}>
                                {runningLoadError}
                              </Text>
                            )}
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
                            <DropDownPicker
                              disabled={!isEditable}
                              listMode="MODAL"
                              searchable
                              open={openServiceType}
                              value={valueServiceType}
                              items={itemsServiceType}
                              setOpen={setOpenServiceType}
                              setValue={setValueServiceType}
                              setItems={setItemsServiceType}
                              onChangeValue={item => {
                                console.log(
                                  'ServiceType:valueServiceType:: ' +
                                    valueServiceType,
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
                                if (validate(text, 8)) {
                                  setPremiseCategoryError(
                                    'Input must be at least 8 characters long.',
                                  );
                                } else setPremiseCategoryError('');
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
                            {premiseCategoryError !== '' && (
                              <Text style={styles.error}>
                                {premiseCategoryError}
                              </Text>
                            )}
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
                                if (validate(text, 255)) {
                                  setDiscrepancyfindingsRemarksError(
                                    'Input must be at least 255 characters long.',
                                  );
                                } else setDiscrepancyfindingsRemarksError('');
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
                            {discrepancyfindingsRemarksError !== '' && (
                              <Text style={styles.error}>
                                {discrepancyfindingsRemarksError}
                              </Text>
                            )}
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
                    <DataTable style={{flex: 1}}>
                      <DataTable.Header style={[styles.databeHeader]}>
                        <DataTable.Title>
                          <Text style={{flex: 1, color: 'white', fontSize: 15}}>
                            Load Detail
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 1, color: 'white', fontSize: 15}}>
                            Quantity
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 1, color: 'white', fontSize: 15}}>
                            Rating (W)
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 1, color: 'white', fontSize: 15}}>
                            Total Watts
                          </Text>
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
                              disabled={!isEditable}
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
                      editable={isEditable}
                      style={{backgroundColor: 'white'}}
                      onChangeText={text => {
                        setQuantity(text);
                        if (validate(text, 3)) {
                          setQuantityError(
                            'Input must be at least 3 characters long.',
                          );
                        } else setQuantityError('');
                      }}
                      placeholder="Quantity"
                      keyboardType={'numeric'}
                      placeholderTextColor="black"
                      fontSize={14}
                      value={quantity}
                      defaultValue="1"
                    />
                    {quantityError !== '' && (
                      <Text style={styles.error}>{quantityError}</Text>
                    )}
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
                          <DataTable.Header
                            style={{backgroundColor: '#1565C0'}}>
                            <DataTable.Title>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14,
                                }}>
                                Register
                              </Text>
                            </DataTable.Title>
                            <DataTable.Title>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14,
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
                                  fontSize={14}
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
                                  fontSize={14}
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
                              onChangeText={value => {
                                setOnsiteMeterNo(value);
                                if (validate(value, 18)) {
                                  setOnsiteMeterNoError(
                                    'Input must be at least 18 characters long.',
                                  );
                                } else setOnsiteMeterNoError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemeterNo}
                              editable={isEditable}
                            />
                            {onsiteMeterNoError !== '' && (
                              <Text style={styles.error}>
                                {onsiteMeterNoError}
                              </Text>
                            )}
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
                              onChangeText={value => {
                                setOnsiteMake(value);
                                if (validate(value, 30)) {
                                  setOnsiteMakeError(
                                    'Input must be at least 30 characters long.',
                                  );
                                } else setOnsiteMakeError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemake}
                              editable={isEditable}
                            />
                            {onsiteMakeError !== '' && (
                              <Text style={styles.error}>
                                {onsiteMakeError}
                              </Text>
                            )}
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
                            <DropDownPicker
                              disabled={!isEditable}
                              listMode="MODAL"
                              searchable
                              open={openOnsitePhase}
                              value={valueOnsitePhase}
                              items={itemsOnsitePhase}
                              setOpen={setOpenOnsitePhase}
                              setValue={setValueOnsitePhase}
                              setItems={setItemsOnsitePhase}
                              onChangeValue={item => {
                                console.log(
                                  'OnsitePhase:onChangeValue:: ' + item,
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
                              onChangeText={value => {
                                setOnsiteVolts(value);
                                if (validate(value, 7)) {
                                  setOnsiteVoltsError(
                                    'Input must be at least 7 characters long.',
                                  );
                                } else setOnsiteVoltsError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitevolts}
                              editable={isEditable}
                            />
                            {onsiteVoltsError !== '' && (
                              <Text style={styles.error}>
                                {onsiteVoltsError}
                              </Text>
                            )}
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
                              onChangeText={value => {
                                setOnsiteMeterConstant(value);
                                if (validate(value, 10)) {
                                  setOnsiteMeterConstantError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setOnsiteMeterConstantError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemeterConstant}
                              editable={isEditable}
                            />
                            {onsiteMeterConstantError !== '' && (
                              <Text style={styles.error}>
                                {onsiteMeterConstantError}
                              </Text>
                            )}
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
                              onChangeText={value => {
                                setOnsiteSecuritySlipNo(value);
                                if (validate(value, 30)) {
                                  setOnsiteSecuritySlipNoError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setOnsiteSecuritySlipNoError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitesecuritySlipNo}
                              editable={isEditable}
                            />
                            {onsiteSecuritySlipNoError !== '' && (
                              <Text style={styles.error}>
                                {onsiteSecuritySlipNoError}
                              </Text>
                            )}
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
                              onChangeText={value => {
                                setOnsiteMultiplyingFactor(value);
                                if (validate(value, 2)) {
                                  setOnsiteMultiplyingFactorError(
                                    'Input must be at least 2 characters long.',
                                  );
                                } else setOnsiteMultiplyingFactorError('');
                              }}
                              placeholder=" "
                              placeholderTextColor="black"
                              fontSize={14}
                              value={onsitemultiplyingFactor}
                              editable={isEditable}
                            />
                            {onsiteMultiplyingFactorError !== '' && (
                              <Text style={styles.error}>
                                {onsiteMultiplyingFactorError}
                              </Text>
                            )}
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
                              if (validate(text, 255)) {
                                setPowerMeterRemarksError(
                                  'Input must be at least 255 characters long.',
                                );
                              } else setPowerMeterRemarksError('');
                            }}
                            placeholder={'Any comment (if required)'}
                            placeholderTextColor="black"
                            style={{
                              height: 150,
                              width: '120%',
                              borderWidth: 0.75,
                              textAlign: 'left',
                              textAlignVertical: 'top',
                              color: 'black',
                            }}
                            value={powerMeterRemarks}
                            editable={isEditable}
                          />
                          {powerMeterRemarksError !== '' && (
                            <Text style={styles.error}>
                              {powerMeterRemarksError}
                            </Text>
                          )}
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
                                  disabled={!isEditable}
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
                          editable={isEditable}
                          style={{flex: 0.2, backgroundColor: 'white'}}
                          onChangeText={value => {
                            setOnsiteMeterReading(value);
                            if (validate(value, 8)) {
                              setOnsiteMeterReadingError(
                                'Input must be at least 8 characters long.',
                              );
                            } else setOnsiteMeterReadingError('');
                          }}
                          placeholder="Meter Reading"
                          keyboardType={'numeric'}
                          placeholderTextColor="black"
                          fontSize={14}
                          value={onsitemeterreading}
                        />
                        {onsiteMeterReadingError !== '' && (
                          <Text style={styles.error}>
                            {onsiteMeterReadingError}
                          </Text>
                        )}
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
                                if (validate(text, 20)) {
                                  setConsumerNameError(
                                    'Input must be at least 20 characters long.',
                                  );
                                } else setConsumerNameError('');
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
                            {consumerNameError !== '' && (
                              <Text style={styles.error}>
                                {consumerNameError}
                              </Text>
                            )}
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
                                if (validate(text, 11)) {
                                  setMobileNoError(
                                    'Input must be at least 11 characters long.',
                                  );
                                } else setMobileNoError('');
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
                            {mobileNoError !== '' && (
                              <Text style={styles.error}>{mobileNoError}</Text>
                            )}
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
                                setConsumerNameCNIC(text);
                                if (validate(text, 16)) {
                                  setConsumerNameCNICError(
                                    'Input must be at least 16 characters long.',
                                  );
                                } else setConsumerNameCNICError('');
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
                            {consumerNameCNICError !== '' && (
                              <Text style={styles.error}>
                                {consumerNameCNICError}
                              </Text>
                            )}
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
                                if (validate(text, 255)) {
                                  setConsumerRemarksError(
                                    'Input must be at least 255 characters long.',
                                  );
                                } else setConsumerRemarksError('');
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
                            {consumerRemarksError !== '' && (
                              <Text style={styles.error}>
                                {consumerRemarksError}
                              </Text>
                            )}
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
                            //marginTop: -10,
                          }}>
                          <RadioForm
                            disabled={!isEditable}
                            radio_props={radio_props}
                            initial={isConsumerRefuseYN}
                            buttonColor={'#1565C0'}
                            formHorizontal={true}
                            labelHorizontal={true}
                            // borderWidth={5}
                            buttonInnerColor={'#1565C0'}
                            selectedButtonColor={'#1565C0'}
                            // labelColor={'#50C900'}

                            //  buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                            //buttonStyle={{backgroundColor:'#5d2d91',borderWidth:10}}

                            borderWidth={1}
                            buttonSize={13}
                            buttonOuterSize={20}
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
                            //marginTop: -10,
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
                            disabled={!isEditable}
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
                          disabled={!isEditable}
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
                                disabled={!isEditable}
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
                          disabled={!isEditable}
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
                          disabled={!isEditable}
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
                                disabled={!isEditable}
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
                disabled={!isEditable}
                onPress={() => {
                  if (buttonType == 'Post') {
                    //PostRoshniBaji();
                    //PostSIRImage();
                    //PostTestSIRImage();

                    NetInfo.fetch().then(state => {
                      //console.log('Connection type', state.type);

                      if (state.isConnected) {
                        console.log(' **** You are online! ******** ');
                        PostSIRSimultaneous(state.type);
                        setIsEditable(false);
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
                  setIsEditable(true);
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
    height: 210,
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
    width: '100%',
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
  error: {
    color: 'red',
    marginTop: 10,
  },
});
