import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {
  Provider,
  DefaultTheme,
  configureFonts,
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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import ImageViewConsumer from 'react-native-image-viewing';
import Geolocation from '@react-native-community/geolocation';
import Carousel, {Pagination} from 'react-native-snap-carousel';
//import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
//import DatePicker from 'react-native-datepicker';
//import CheckboxGroup1 from 'react-native-checkbox-group';
import {
  launchCamera,
  launchImageLibrary,
  //ImagePicker,
  Select,
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import Moment from 'moment';
import {set} from 'react-native-reanimated';
import SignatureCapture from 'react-native-signature-capture';
import base64 from 'react-native-base64';
import NetInfo from '@react-native-community/netinfo';

let current = 100;

const ApiScreenA40 = ({route, navigation}) => {
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

  var radio_propsServiceType = [
    {label: 'O/H', value: 0},
    {label: 'U/G', value: 1},
  ];

  var radio_propsMeterInstalled = [
    {label: 'FMR', value: 0},
    {label: 'MTV', value: 1},
  ];

  const [checkBoxselectedList, setcheckBoxSelectedList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [checkBoxList, setCheckBoxList] = useState([
    {
      name: 'FMR to be Issued', // label for checkbox item
      value: 1,
      ischeck: false,
      checkVal: '',
    },
    {
      name: 'Meter Installed Outside',
      value: 2,
      ischeck: false,
      postid: '',
      checkVal: '',
    },
    {
      name: 'Consumer has Stand By Generator',
      value: 3,
      ischeck: false,
      checkVal: '',
    },
    {
      name: 'EIK Permission Available',
      value: 4,
      ischeck: false,
      checkVal: '',
    },
    {
      name: 'Energy Meter Installed on Generator', // label for checkbox item
      value: 5,
      ischeck: false,
      checkVal: '',
    },
  ]);

  let onSelectCheckBox = (name, ischeck) => {
    setcheckBoxSelectedList([{name}, ...checkBoxselectedList]);
    if (ischeck == true) {
      setCheckBoxList(
        checkBoxList.map((li, index) =>
          li.name == name
            ? {
                ...li,
                ischeck: !li.ischeck,
                checkVal: '',
              }
            : {
                ...li,
              },
        ),
      );
    } else {
      setCheckBoxList(
        checkBoxList.map((li, index) =>
          li.name == name
            ? {
                ...li,
                ischeck: !li.ischeck,
                checkVal: 'X',
              }
            : {
                ...li,
              },
        ),
      );
    }

    setSelectedList(
      checkBoxList.filter(val => {
        return val.ischeck == true;
      }),
    );
  };

  var radio_propsConsumerDetail = [
    {label: 'Active', value: 0},
    {label: 'In-Active', value: 1},
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
  const [loadDetails, setLoadDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rating, setRating] = useState('');
  const [totalWatts, setTotalWatts] = useState('');

  // saad Comment Power Register Dropdowm
  const [powermeterreading, setPowerMeterReading] = useState('');
  const [openPowerRegister, setOpenPowerRegister] = useState(false);
  const [valuePowerRegister, setValuePowerRegister] = useState(null);
  const [itemsPowerRegister, setItemsPowerRegister] = useState([
    {label: '', value: ''},
    {label: 'K1', value: 'K1'},
    {label: 'R1', value: 'R1'},
    {label: 'P1', value: 'P1'},
    {label: 'X1', value: 'X1'},
    {label: 'MDI-Off', value: 'MDI-Off'},
    {label: 'MDI-On', value: 'MDI-On'},
    {label: 'K0', value: 'K0'},
    {label: 'R0', value: 'R0'},
    {label: 'K1i', value: 'K1i'},
    {label: 'K0i', value: 'K0i'},
    {label: 'P1i', value: 'P1i'},
    {label: 'R', value: 'R'},
    {label: 'Y', value: 'Y'},
    {label: 'B', value: 'B'},
    {label: 'N', value: 'N'},
  ]);

  // saad Comment Light Register Dropdowm
  const [lightmeterreading, setLightMeterReading] = useState('');
  const [openLightRegister, setOpenLightRegister] = useState(false);
  const [valueLightRegister, setValueLightRegister] = useState(null);
  const [itemsLightRegister, setItemsLightRegister] = useState([
    {label: '', value: ''},
    {label: 'K1', value: 'K1'},
    {label: 'R1', value: 'R1'},
    {label: 'P1', value: 'P1'},
    {label: 'X1', value: 'X1'},
    {label: 'MDI-Off', value: 'MDI-Off'},
    {label: 'MDI-On', value: 'MDI-On'},
    {label: 'R', value: 'R'},
    {label: 'Y', value: 'Y'},
    {label: 'B', value: 'B'},
    {label: 'N', value: 'N'},
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecteditems, setIsSelecteditems] = useState('N');

  const [tableList, setTableList] = useState([]);
  const [appliancelist, setApplianceList] = useState([]);
  const [descripancylist, setDescripancyList] = useState([]);

  const deleteAppliance = (index, e) => {
    setTableList(tableList.filter((v, i) => i !== index));
    setApplianceList(appliancelist.filter((v, i) => i !== index));
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

  let onSelectedItemsChange = selectedItems => {
    let localdata = [];
    console.log('selectedItems:' + selectedItems);
    if (selectedItems.length > 5) {
      return;
    } else {
      setSelectedItems(selectedItems);
      setIsSelecteditems('Y');

      //console.log('selectedItems: ' + selectedItems);

      selectedItems.filter(item => {
        console.log('item:= ' + item);
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
      active: false,
    },
    {
      id: 10,
      name: 'Consumer Detail',
      active: true,
    },

    {
      id: 8,
      name: 'Meter Detail',
      active: false,
    },
    {
      id: 9,
      name: 'Appliance Detail',
      active: false,
    },
    /*
    {
      id: 9,
      name: 'Light Meter Detail',
      active: false,
    },
    */
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
    /*
    {
      id: 2,
      name: 'Metering Equipment Detail',
      active: false,
    },
    */
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
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const {width} = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [buttonType, setButtonType] = useState();

  /* Consumer Detail */

  const [consumerStatus, setConsumerStatus] = useState('X');
  const [isConsumerStatus, setIsConsumerStatus] = useState(0);
  //const [industryType, setIndustryType] = useState('');
  //const [tariff, setTariff] = useState('');

  const [ibcName, setIbcName] = useState('');
  const [reviewRemarks, setReviewRemarks] = useState('');
  const [CELL_NUMBER, setCELL_NUMBER] = useState('');

  const [serviceType, setServiceType] = useState('O/H');
  const [isServiceType, setIsServiceType] = useState(0);
  const [sizeofService, setSizeofService] = useState('');
  const [fedFromPMTSS, setFedFromPMTSS] = useState('');
  const [pmtSSCode, setPMTSSCode] = useState('');
  const [connectedLoad, setConnectedLoad] = useState('');
  const [contractLoad, setContractLoad] = useState('');
  const [connectedLoadKW, setConnectedLoadKW] = useState('');
  const [runningLoadKW, setRunningLoadKW] = useState('');
  /* Conumer Detail ------------ End  */

  /* Power Meter ------------ Start */

  const [powerKENo, setPowerKENo] = useState('');
  const [powerMeterMake, setPowerMeterMake] = useState('');
  const [powerMC, setPowerMC] = useState('');
  const [powerReading, setPowerReading] = useState('');
  const [powerMCSec, setPowerMCSec] = useState('');
  const [powerMeterRemarks, setPowerMeterRemarks] = useState('');
  const [metertestingResultremarks, setmetertestingResultremarks] =
    useState('');
  const [powermeter, setPowerMeter] = useState([]);
  const [powerregister, setPowerRegister] = useState([]);
  const [powerPT, setPowerPT] = useState('');
  const [powerPTSec, setPowerPTSec] = useState('');

  /* Power Meter ------------ End */

  /* Light Meter ------------ Start */
  const [lightmeter, setLightMeter] = useState([]);
  const [lightKENo, setLightKENo] = useState('');
  const [lightMeterMake, setLightMeterMake] = useState('');
  const [lightMC, setLightMC] = useState('');
  const [lightMCSec, setLightMCSec] = useState('');
  const [lightMeterRemarks, setLightMeterRemarks] = useState('');
  const [lightregister, setLightRegister] = useState([]);
  const [lightPT, setLightPT] = useState('');
  const [lightPTSec, setLightPTSec] = useState('');

  /* Testing By Time Power Method ------------ Start */
  const [currentAmp, setCurrentAmp] = useState('');
  const [voltageKV, setVoltageKV] = useState('');
  const [powerFactor, setPowerFactor] = useState('');
  const [kto, setKto] = useState('');
  const [perError, setPerError] = useState('');

  const [powerCalculated, setPowerCalculated] = useState('');
  const [powerObserved, setPowerObserved] = useState('');

  /* Testing By Time Power Method ------------ End */

  // Start Status of Postal Order/Seal
  const [meter, setMeter] = useState('');
  const [mainCover, setMainCover] = useState('');
  const [terminalCover, setTerminalCover] = useState('');
  const [chamber, setChamber] = useState('');
  const [pTfuse, setPTfuse] = useState('');
  const [panelDoor, setPanelDoor] = useState('');
  const [mainCoverPlate, setMainCoverPlate] = useState('');

  // End Status of Postal Order/Seal

  /* Meter Testing Result ------------ Start */
  const [meterTestingResultTC, setMeterTestingResultTC] = useState('');
  const [meterTestingperError, setMeterTestingperError] = useState('');
  const [meterTestingTo, setMeterTestingTo] = useState('');
  const [meterInstalled1, setMeterInstalled1] = useState('');
  const [meterInstalled2, setMeterInstalled2] = useState('');
  const [meterInstalled, setMeterInstalled] = useState('');
  const [meterInstalled3, setMeterInstalled3] = useState('');

  const [fmrNo, setFMRNo] = useState('');

  /* Meter Testing Result ------------ End */

  /* Discrepancy and Findings ------------ Start */

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

  /* Customer Acknowlegment ------------ End */

  const [cosnumerno, setCosnumerno] = useState('');

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

  const [error, setError] = useState('');
  //const [industryTypeError, setIndustryTypeError] = useState('');
  const [sizeofServiceError, setSizeofServiceError] = useState('');
  const [fedFromPMTSSError, setFedFromPMTSSError] = useState('');
  const [pmtSSCodeError, setPMTSSCodeError] = useState('');
  const [connectedLoadError, setConnectedLoadError] = useState('');
  const [contractLoadError, setContractLoadError] = useState('');
  const [connectedLoadKWError, setConnectedLoadKWError] = useState('');
  const [runningLoadKWError, setRunningLoadKWError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [discrepancyfindingsRemarksError, setDiscrepancyfindingsRemarksError] =
    useState('');
  const [meterError, setMeterError] = useState('');
  const [mainCoverError, setMainCoverError] = useState('');
  const [terminalCoverError, setTerminalCoverError] = useState('');
  const [chamberError, setChamberError] = useState('');
  const [pTfuseError, setPTfuseError] = useState('');
  const [panelDoorError, setPanelDoorError] = useState('');
  const [mainCoverPlateError, setMainCoverPlateError] = useState('');
  const [meterInstalledError, setMeterInstalledError] = useState('');
  const [meterInstalled1Error, setMeterInstalled1Error] = useState('');
  const [currentAmpError, setCurrentAmpError] = useState('');
  const [voltageKVError, setVoltageKVError] = useState('');
  const [powerFactorError, setPowerFactorError] = useState('');
  const [ktoError, setKtoError] = useState('');
  const [perErrorError, setPerErrorError] = useState('');
  const [powerCalculatedError, setPowerCalculatedError] = useState('');
  const [powerObservedError, setPowerObservedError] = useState('');
  const [powerKENoError, setPowerKENoError] = useState('');
  const [powerMeterMakeError, setPowerMeterMakeError] = useState('');
  const [powerMCError, setPowerMCError] = useState('');
  const [powerMCSecError, setPowerMCSecError] = useState('');
  const [powerPTError, setPowerPTError] = useState('');
  const [powerPTSecError, setPowerPTSecError] = useState('');
  const [powerMeterRemarksError, setPowerMeterRemarksError] = useState('');
  const [powerMeterReadingError, setPowerMeterReadingError] = useState('');
  const [consumerNameError, setConsumerNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [consumerNameCNICError, setConsumerNameCNICError] = useState('');
  const [consumerRemarksError, setConsumerRemarksError] = useState('');
  //const [tariffError, setTariffError] = useState('');

  const [uploadingMsg, setUploadingMsg] = useState('');

  const [consumerSignature, setConsumerSignature] = useState([]);
  const [isSignature, setIsSignature] = useState('N');

  const [ispostalOrderSeal, setIspostalOrderSeal] = useState('N');
  const [ismeteringEquipment, setIsmeteringEquipment] = useState('N');

  const [sirdate, setSirDate] = useState('');
  const [sirtime, setSirTime] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const [NAME, setNAME] = useState('');
  const [ADDRESS, setADDRESS] = useState('');
  const [CONSUMER_NO, setCONSUMER_NO] = useState('');
  const [Vkont, setVkont] = useState('');
  const [TARIFF, setTARIFF] = useState('');
  const [contract, setContract] = useState('');

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

  const [date1, setDate] = useState();
  const [SIR, setSIR] = useState('');

  const {data, index, otherParam} = route.params;
  // saad Comment MRNote Dropdowm
  const [itemsMRNote, setItemsMRNote] = useState([]);

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);

    // searchFilterFunctionDate(moment(date).format("YYYYMMDD"));
    console.log('ali');

    console.log('alitest', Moment(date).format('DD-MM-YYYY'));
    setDate(Moment(date).format('DD-MM-YYYY'));

    hideDatePicker();
    // setChosenDate(moment(datetime).format('dddd Do MMMM YYYY à HH:mm'))
    // setChosenDate(moment(date).format("YYYYMMDD"));
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const widerCell = {
    // width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#8C52FF',
    color: 'black',
    borderColor: '#fff',
  };
  const meteringEquipCell = {
    // width: 300,
    marginLeft: 10,
    minWidth: 70,
    borderRightWidth: 2,
    height: 45,
    borderColor: 'white',
  };
  const meteringEquipCelltext = {
    color: 'white',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  };
  const meteringEquipCellvalue = {
    // width: 300,
    marginLeft: 10,
    minWidth: 100,
    borderRightWidth: 2,
    height: 45,
    borderColor: 'white',
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
    height: 50,
  };

  const borderCell1 = {
    borderRightWidth: 2,
    // minWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    borderRightColor: 'white',
    height: 50,
  };

  const dataCell1 = {
    borderWidth: 0.5,
    minWidth: 112,
    padding: 3,
    marginLeft: -20,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const dataCell2 = {
    borderWidth: 0.5,
    minWidth: 122,
    padding: 3,
    // marginLeft:20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  };
  const dataCell3 = {
    borderWidth: 0.5,
    minWidth: 142,
    padding: 3,
    // marginLeft:20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  };
  const dataCell4 = {
    borderWidth: 0.5,
    minWidth: 163,
    padding: 3,
    // marginLeft:-1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  };
  const dataCell5 = {
    borderWidth: 0.5,
    minWidth: 117,
    padding: 3,
    // marginLeft:-1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  };
  const dataCell6 = {
    borderWidth: 0.5,
    minWidth: 167,
    padding: 3,
    // marginLeft:-1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  };

  const borderCell2 = {
    minWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white',
    height: 50,
  };

  const borderCell3 = {
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white',
    height: 50,
  };
  const borderCell4 = {
    minWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white',
    height: 50,
  };
  const borderCell5 = {
    minWidth: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: 'white',
    height: 50,
  };
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, response => {
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

      setIsImage('Y');

      var Allimages = images;
      setFilePath([
        {
          uri: response.assets[0].uri,
          url: response.assets[0].uri,
          fileName: response.assets[0].fileName,
          base64: response.assets[0].base64,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);

      setImages([
        {
          uri: response.assets[0].uri,
          url: response.assets[0].uri,
          fileName: response.assets[0].fileName,
          base64: response.assets[0].base64,
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
          alert(response.errorMessage);
          return;
        }

        var Allimages = images;

        if (imageNo == '1') {
          setIsImage1('Y');
          console.log(response.path);
          //setFilePath([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);
          setFilePath1([
            {
              uri: response.path,
              url: response.path,
              fileName: 'BFDC.jpg',
              base64: response.data,
            },
          ]);
          setImages1({
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
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

          //setImages([{ uri: response.assets[0].uri, url: response.assets[0].uri, fileName: response.assets[0].fileName, base64: response.assets[0].base64, Status: 'Pending', RoshniBajiWebID: '' }, ...Allimages]);
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
        console.log('images1.uri', images1.uri);
      });
    }
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

  const validate = (text, textLength) => {
    if (text.length <= textLength) {
      return false;
    }
    return true;
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
    console.log('**************************************************');
    console.log('Store In Device');
    console.log('**************************************************');

    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data = JSON.parse(items);
      data.filter((item, index) => {
        if (item.Sirnr == SIR) {
          console.log('****item.Sirnr: ' + item.Sirnr);
          console.log('****data[index].Sirnr: ' + data[index].Sirnr);
          //data[index].CaseType = 'Planned';
          data[index].SIRType = 'A40';
          data[index].SirFormat = 'A40';
          data[index].Status = status;
          data[index].SIRTime = sirtime;
          data[index].SIRDate = sirdate;

          data[index].ConsumerStatus = consumerStatus;
          data[index].IsConsumerStatus = isConsumerStatus;
          data[index].PremiseType = valuePremiseType;
          data[index].Tariff = valueTarif;
          data[index].ServiceType = serviceType;
          data[index].IsServiceType = isServiceType;
          data[index].FedFromPMTSS = fedFromPMTSS;
          data[index].PMTSSCode = pmtSSCode;
          data[index].RunningLoadKW = runningLoadKW;
          data[index].SizeofService = sizeofService;
          data[index].ContractLoad = contractLoad;
          data[index].ConnectedLoad = connectedLoad;
          data[index].ConnectedLoadKW = connectedLoadKW;

          data[index].PowerKENo = powerKENo;
          data[index].PowerMeterMake = powerMeterMake;
          data[index].PowerMC = powerMC;
          data[index].PowerMCSec = powerMCSec;
          data[index].PowerReading = powerReading;
          data[index].PowerMeter = powermeter;
          data[index].PowerMeterRemarks = powerMeterRemarks;
          data[index].PowerPT = powerPT;
          data[index].PowerPTSec = powerPTSec;

          data[index].LightKENo = lightKENo;
          data[index].LightMeterMake = lightMeterMake;
          data[index].LightMC = lightMC;
          data[index].LightMCSec = lightMCSec;
          data[index].Lightmeter = lightmeter;
          data[index].LightPT = lightPT;
          data[index].LightPTSec = lightPTSec;

          data[index].Meter = meter;
          data[index].MainCover = mainCover;
          data[index].TerminalCover = terminalCover;
          data[index].Chamber = chamber;
          data[index].PTfuse = pTfuse;
          data[index].PanelDoor = panelDoor;
          data[index].MainCoverPlate = mainCoverPlate;

          data[index].MeterInstalled = meterInstalled;
          data[index].MeterInstalled1 = meterInstalled1;
          data[index].CurrentAmp = currentAmp;
          data[index].VoltageKV = voltageKV;
          data[index].PowerFactor = powerFactor;
          data[index].Kto = kto;
          data[index].PerError = perError;
          data[index].PowerCalculated = powerCalculated;
          data[index].PowerObserved = powerObserved;

          data[index].DiscrepancyfindingsRemarks = discrepancyfindingsRemarks;
          data[index].DescripancyDetail = descripancylist;
          data[index].isDiscrepancyitems = isSelecteditems;
          data[index].Discrepancyitems = selectedItems;
          data[index].ApplianceDetail = tableList;
          data[index].Appliancelist = appliancelist;

          data[index].CheckBoxList = checkBoxList;
          data[index].ConsumerName = consumerName;
          data[index].MobileNo = mobileNo;
          data[index].ConsumerNameCNIC = consumerNameCNIC;
          data[index].ConsumerRemarks = consumerRemarks;
          data[index].ConsumerRefuseYN = consumerRefuseYN;
          data[index].IsConsumerRefuseYN = isConsumerRefuseYN;
          data[index].ConsumerSign = consumerSign;
          data[index].IsConsumerSign = isConsumerSign;

          data[index].longitude = longitude;
          data[index].latitude = latitude;

          data[index].IsSignature = isSignature;
          data[index].ConsumerSignature = consumerSignature;
          data[index].SIRImageFlag = isImage;
          data[index].SIRImages = images;
          data[index].ConsumerImageFlag = IsImage1;
          data[index].ConsumerImages = consumerImages;
          data[index].Images1 = images1;

          data[index].NAME = NAME;
          data[index].ADDRESS = ADDRESS;
          data[index].CONSUMER_NO = CONSUMER_NO;
          data[index].Vkont = Vkont;
          data[index].TARIFF = TARIFF;
          data[index].Vertrag = contract;

          if (Result_Discrepancies != undefined) {
            data[index].Result_Discrepancies = Result_Discrepancies;
            data[index].Result_Appliances = Result_Appliances;
            data[index].Result_Meter = Result_Meter;
            data[index].Result_Register = Result_Register;
            data[index].Result_Onsite = Result_Onsite;
            data[index].Result_MeterSeal = Result_MeterSeal;
          }

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

  const PostSIRImage = () => {
    let data1 = [];
    let count = 1;
    console.log('Post SIR Image Data called');

    images.filter(item => {
      //console.log('item:= ' + item);
      data1.push({
        imageName: data.Sirnr,
        imageBase64: item.base64,
        imageID: count.toString(),
        IBC: data.Begru,
        SIRNo: data.Sirnr,
        ContractNo: data.Vertrag,
        MIONo: data.AssignMio,
      });
      count++;
    });

    axios({
      method: 'POST',
      url: 'https://stagingdev.ke.com.pk:8039/api/Image/PostSIRImageData',
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
        console.log('ERROR STARTS NOW');
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
        IBC: data.Begru,
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
        IBC: data.Begru,
        SIRNo: data.Sirnr,
        ContractNo: data.Vertrag,
        MIONo: data.AssignMio,
      });
    }

    axios({
      method: 'POST',
      url: 'https://stagingdev.ke.com.pk:8039/api/Image/PostSIRImageData',
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

  const PostSIRSimultaneous = () => {
    console.log('**************************************************');
    console.log('PostSIRSimultaneous');
    console.log('**************************************************');

    /*
    var filterData = powermeter.filter(item => {
      console.log(item);
    });
*/
    if (latitude.toString() == '') {
      alert('Please on your GPS location settings');
      return false;
    }

    if (descripancylist.length < 1) {
      alert('atleast one discrepancy is mandatory');
      return false;
    }

    if (images.length < 1) {
      alert('atleast one SIR image is mandatory');
      return false;
    }

    const powermeterData = powermeter.length > 0 ? powermeter : [{}];
    const appliancelistData = appliancelist.length > 0 ? appliancelist : [{}];
    const descripancylistData =
      descripancylist.length > 0 ? descripancylist : [{}];

    const valuePremiseTypeData =
      valuePremiseType != undefined ? valuePremiseType : '';
    const valueTarifData = valueTarif != undefined ? valueTarif : '';

    const consumerRefuseYNData =
      consumerRefuseYN != undefined ? consumerRefuseYN : '';
    const consumerSignData = consumerSign != undefined ? consumerSign : '';

    console.log(powermeter);
    console.log(appliancelist);
    console.log(descripancylist);

    let NOTICE_SIGN = consumerRefuseYNData + '/' + consumerSignData;
    console.log('**** PostSIRSimultaneous ***Started***');

    console.log('consumerStatus: ' + consumerStatus);
    console.log('serviceType: ' + serviceType);
    console.log('sirdate: ' + sirdate);
    console.log('sirtime: ' + sirtime);
    console.log('latitude: ' + typeof latitude);
    console.log('longitude: ' + typeof longitude);

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
        SERVTYPE: serviceType,
        VBSART: valuePremiseTypeData,
        TARIFTYP: valueTarifData,
        FEEDER: fedFromPMTSS,
        PMT: pmtSSCode,
        CUSTNAME: consumerName,
        MOBILE: mobileNo,
        CNIC: consumerNameCNIC,
        NOTICE_SIGN: NOTICE_SIGN,
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
            GERAET_M1: powerKENo,
            HERST_M1: powerMeterMake,
          },
        ],
        NAVREGISTER: powermeterData,
        NAVONSITE: [
          {
            Sirnr: data.Sirnr,
            Meterfound: consumerStatus,
            Runload: runningLoadKW,
            Mctpricurr: powerMC,
            Mctseccurr: powerMCSec,
            Cablesize: sizeofService,
            Sanctioned: contractLoad,
            Connected: connectedLoadKW,
            //Current1: currentAmp,
            Voltage1: voltageKV,
            Pctgerr: perError,
            Pwdfactor: powerFactor,
            Othmeter1: meterInstalled,
            Othmeter2: meterInstalled1,
            Othmeter3: kto,
            Pwdcalc: powerCalculated,
            Pwdobs: powerObserved,
            Mptpricurr: powerPT,
            Mptseccurr: powerPTSec,
            Code: checkBoxList[0].checkVal,
            Ctsn: checkBoxList[1].checkVal,
            Standbygen: checkBoxList[2].checkVal,
            Eikperm: checkBoxList[3].checkVal,
            Energymtr: checkBoxList[4].checkVal,
          },
        ],
        SIR_Meter_SealSet: [
          {
            Sirnr: data.Sirnr,
            Ssmcvr: meter,
            Ssct: mainCover,
            Sstermcvr: terminalCover,
            Ssatb: chamber,
            Sspt: pTfuse,
            Ssht: panelDoor,
            Sealmcvr: mainCoverPlate,
          },
        ],
      }),
    })
      .then(res => {
        console.log(
          '******************PostSIRSimultaneous UPDATED*********************************',
        );
        console.log('res.data.d.Result------' + res.data.d.Result_Appliances);
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
      })
      .catch(error => {
        console.error('PostSIRSimultaneous:error: ' + error);
      });
  };

  const deleteLightMeter = (index, e) => {
    setLightMeter(lightmeter.filter((v, i) => i !== index));
  };
  const deletePowerMeter = (index, e) => {
    setPowerMeter(powermeter.filter((v, i) => i !== index));
  };

  const onAddmoreLight = () => {
    console.log('lightregister:' + lightregister);
    console.log('lightmeterreading:' + lightmeterreading);
    setLightMeter([
      ...lightmeter,
      {
        Zkennziff: valueLightRegister,
        FreetextM2: lightmeterreading,
        GeraetM2: lightKENo,
        Sirnr: data.Sirnr,
      },
    ]);

    setValueLightRegister('Select an item');
    setLightMeterReading();
  };

  const onAddmorePower = () => {
    console.log('powerregister:' + powerregister);
    console.log('powermeterreading:' + powermeterreading);
    setPowerMeter([
      ...powermeter,
      {
        Zkennziff: valuePowerRegister,
        FreetextM2: powermeterreading,
        GeraetM2: powerKENo,
        Sirnr: data.Sirnr,
      },
    ]);

    setValuePowerRegister('Select an item');
    setPowerMeterReading();
  };

  useEffect(() => {
    getUserCurrentLocation();
    console.log('data.Sirnr: ' + data.Sirnr);
    console.log('data.Vertrag: ' + data.Vertrag);
    console.log('data.CONNECTED_LOAD: ' + data.CONNECTED_LOAD);
    setSIR(data.Sirnr);
    setAssigndate(Moment(data.Erdat, 'YYYYMMDD').format('DD.MM.YYYY'));
    setSirDate(Moment().format('DD.MM.YYYY'));
    setSirTime(Moment().format('hh:mm:ss'));
    setConnectedLoad(data.CONNECTED_LOAD);

    setNAME(data.NAME);
    setADDRESS(data.ADDRESS);
    setCONSUMER_NO(data.CONSUMER_NO);
    setVkont(data.Vkont);
    setTARIFF(data.TARIFF);
    setContract(data.Vertrag);

    AsyncStorage.getItem('SIRDigitization').then(items => {
      var localData = items ? JSON.parse(items) : [];
      var filterData = localData.filter(item => {
        if (item.Sirnr == data.Sirnr) {
          if (item.Status != 'Post') {
            setIsEditable(true);
          }

          if (item.REMARKS != undefined) setReviewRemarks(item.REMARKS);
          if (item.IBCNAME != undefined) setIbcName(item.IBCNAME);
          if (item.CELL_NUMBER != undefined) setCELL_NUMBER(item.CELL_NUMBER);
          //setTARIFF(item.TARIFF);

          if (item.ConsumerStatus != undefined)
            setConsumerStatus(item.ConsumerStatus);
          if (item.IsConsumerStatus != undefined)
            setIsConsumerStatus(item.IsConsumerStatus);

          if (item.ServiceType != undefined) setServiceType(item.ServiceType);
          if (item.IsServiceType != undefined)
            setIsServiceType(item.IsServiceType);

          //setIndustryType(item.IndustryType);
          //setTariff(item.Tariff);
          setValueTarif(item.Tariff);
          setValuePremiseType(item.PremiseType);

          setFedFromPMTSS(item.FedFromPMTSS);
          setPMTSSCode(item.PMTSSCode);
          setRunningLoadKW(item.RunningLoadKW);
          setSizeofService(item.SizeofService);
          setContractLoad(item.ContractLoad);
          //setConnectedLoad(item.ConnectedLoad);

          setMeterInstalled(item.MeterInstalled);
          setMeterInstalled1(item.MeterInstalled1);
          setCurrentAmp(item.CurrentAmp);
          setVoltageKV(item.VoltageKV);
          setPowerFactor(item.PowerFactor);
          setKto(item.Kto);
          setPerError(item.PerError);
          setPowerCalculated(item.PowerCalculated);
          setPowerObserved(item.PowerObserved);

          setConnectedLoadKW(item.ConnectedLoadKW);

          if (item.CheckBoxList != undefined)
            setCheckBoxList(item.CheckBoxList);

          setSelectedItems(item.Discrepancyitems);
          setDiscrepancyfindingsRemarks(item.DiscrepancyfindingsRemarks);

          setConsumerName(item.ConsumerName);
          setMobileNo(item.MobileNo);
          setConsumerNameCNIC(item.ConsumerNameCNIC);
          setConsumerRemarks(item.ConsumerRemarks);

          if (item.IsConsumerRefuseYN != undefined)
            setIsConsumerRefuseYN(item.IsConsumerRefuseYN);
          if (item.ConsumerRefuseYN != undefined)
            setConsumerRefuseYN(item.ConsumerRefuseYN);

          if (item.IsConsumerSign != undefined)
            setIsConsumerSign(item.IsConsumerSign);
          if (item.ConsumerSign != undefined)
            setConsumerSign(item.ConsumerSign);

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
            setImages1(item.Images1);
          }

          if (item.SIRImages != undefined) {
            setIsImage(item.SIRImageFlag);
            setImages(item.SIRImages);
          }

          if (item.latitude == undefined || item.latitude == '') {
            getUserCurrentLocation();
          } else {
            setlatitude(item.latitude);
            setlongitude(item.longitude);
          }

          setPowerKENo(item.PowerKENo);
          setPowerMeterMake(item.PowerMeterMake);
          setPowerMC(item.PowerMC);
          setPowerMCSec(item.PowerMCSec);
          setPowerMeter(item.PowerMeter);
          setPowerMeterRemarks(item.PowerMeterRemarks);
          setPowerPT(item.PowerPT);
          setPowerPTSec(item.PowerPTSec);

          setLightKENo(item.LightKENo);
          setLightMeterMake(item.LightMeterMake);
          setLightMC(item.LightMC);
          setLightMCSec(item.LightMCSec);
          setLightMeter(item.LightMeter);
          setLightMeterRemarks(item.LightMeterRemarks);
          setLightPT(item.LightPT);
          setLightPTSec(item.LightPTSec);

          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);
          setLightPTSec(item.LightPTSec);

          setMeter(item.Meter);
          setMainCover(item.MainCover);
          setTerminalCover(item.TerminalCover);
          setChamber(item.Chamber);
          setPTfuse(item.PTfuse);
          setPanelDoor(item.PanelDoor);
          setMainCoverPlate(item.MainCoverPlate);

          setTableList(item.ApplianceDetail);
          setApplianceList(item.Appliancelist);
          setDescripancyList(item.DescripancyDetail);
        }
      });
    });
    /*
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
*/

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

    // Saad Comment Loading Appliances Data
    AsyncStorage.getItem('Appliances').then(items => {
      var data = items ? JSON.parse(items) : [];
      //console.og('********items.id', data);
      setItemsAppliance(data);
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
  /*
  const [tableList, setTableList] = useState([
    {
      id: Date.now(),
      LoadDetail: 'Fan',
      Quantity: '',
      Rating: '80 W',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: 'Bulb',
      Quantity: '',
      Rating: '',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: 'Energy Saver',
      Quantity: '',
      Rating: '',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: 'Tube Light',
      Quantity: '',
      Rating: '40 W',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: 'Heater',
      Quantity: '',
      Rating: '',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: 'AC-Window',
      Quantity: '',
      Rating: '2500 W',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: '1 1/2 Ton',
      Quantity: '',
      Rating: '1800 W',
      TotalWatts: '',
    },
    {
      id: Date.now(),
      LoadDetail: '1 Ton',
      Quantity: '',
      Rating: '1200 W',
      TotalWatts: '',
    },
  ]);
  */

  const [powermeterdetail, setPowermeterDetail] = useState([
    {id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: ''},
  ]);

  const [lightmeterdetail, setLightmeterdetail] = useState([
    {id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: ''},
  ]);

  const [postalOrderSeal, setPostalOrderseal] = useState([
    {
      id: Date.now(),
      Meter: 'KWH',
      MainCover: '',
      TerminalCover: '',
      Chamber: '',
      PTfuse: '',
      PanelDoor: '',
      MainCoverPlate: '',
    },
    {
      id: Date.now(),
      Meter: 'KVARH',
      MainCover: '',
      TerminalCover: '',
      Chamber: '',
      PTfuse: '',
      PanelDoor: '',
      MainCoverPlate: '',
    },
    {
      id: Date.now(),
      Meter: 'Light Meter',
      MainCover: '',
      TerminalCover: '',
      Chamber: '',
      PTfuse: '',
      PanelDoor: '',
      MainCoverPlate: '',
    },
  ]);

  const updateMainCover = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], MainCover: text};
    setPostalOrderseal(newArray);
  };

  const updateTerminalCover = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], TerminalCover: text};
    setPostalOrderseal(newArray);
  };

  const updateChamber = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], Chamber: text};
    setPostalOrderseal(newArray);
  };

  const updatePTfuse = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], PTfuse: text};
    setPostalOrderseal(newArray);
  };

  const updatePanelDoor = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], PanelDoor: text};
    setPostalOrderseal(newArray);
  };

  const updateCoverPlate = (text, index) => {
    let newArray = [...postalOrderSeal];
    newArray[index] = {...newArray[index], MainCoverPlate: text};
    setPostalOrderseal(newArray);
  };

  const [meteringEquipment, setMeteringEquipment] = useState([
    {
      id: Date.now(),
      Register: 'K1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
    {
      id: Date.now(),
      Register: 'P1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
    {
      id: Date.now(),
      Register: 'R1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
    {
      id: Date.now(),
      Register: 'X1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
    {
      id: Date.now(),
      Register: 'K1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
    {
      id: Date.now(),
      Register: 'S1',
      KENo: '',
      Reading: '',
      MF: '',
      MDI: '',
      Make: '',
      MC: '',
      MeterCTratio1: '',
      MeterCTratio2: '',
      BlngMode: '',
      Remarks: '',
    },
  ]);

  const updateRemarks = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], Remarks: text};
    setMeteringEquipment(newArray);
  };

  const updateMeterCTratio1 = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], MeterCTratio1: text};
    setMeteringEquipment(newArray);
  };
  const updateMeterCTratio2 = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], MeterCTratio2: text};
    setMeteringEquipment(newArray);
  };
  const updateBlngMode = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], BlngMode: text};
    setMeteringEquipment(newArray);
  };

  const updateMDI = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], MDI: text};
    setMeteringEquipment(newArray);
  };
  const updateMake = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], Make: text};
    setMeteringEquipment(newArray);
  };
  const updateMC = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], MC: text};
    setMeteringEquipment(newArray);
  };

  const updateKENo = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], KENo: text};
    setMeteringEquipment(newArray);
  };
  const updateReading = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], Reading: text};
    setMeteringEquipment(newArray);
  };
  const updateMF = (text, index) => {
    let newArray = [...meteringEquipment];
    newArray[index] = {...newArray[index], MF: text};
    setMeteringEquipment(newArray);
  };

  // console.log('list table', tableList);

  const updateLAmp = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], AMP: text};
    setLightmeterdetail(newArray);
  };
  const updateLVolt = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], VOLT: text};
    setLightmeterdetail(newArray);
  };
  const updateLPF = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], PF: text};
    setLightmeterdetail(newArray);
  };

  const updateLoadDetail = (text, index) => {
    let newArray = [...tableList];
    newArray[index] = {...newArray[index], LoadDetail: text};
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
    <ScrollView>
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.footer}>
            {/*
            <View
              style={{
                flex: 0.5,
                paddingLeft: 10,
                //   flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'center',
                //marginBottom: -10,
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
*/}
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
                  {'Tariff: ' + TARIFF}
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
                  {'Cell No: ' + CELL_NUMBER}
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
                  /*paddingTop: 20*/
                }
              }></View>
            <View
              style={{padding: 5, marginBottom: -25, paddingRight: 10}}></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  // flex: 0.45,
                  paddingTop: -50,
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
                  {'Cluster / IBC: ' + data.CLUSTER + '/' + ibcName}
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
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: -80,
                      }}>
                      <View
                        style={{
                          marginLeft: 2,
                          flex: 2,
                          alignItems: 'flex-start',
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          Consumer Status
                        </Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', flex: 2.5, width: '50%'}}>
                        <RadioForm
                          disabled={!isEditable}
                          radio_props={radio_propsConsumerDetail}
                          initial={isConsumerStatus}
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
                              setConsumerStatus('X');
                              setIsConsumerStatus(0);
                            } else {
                              setConsumerStatus('');
                              setIsConsumerStatus(1);
                            }
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Premise/Industry Type{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Tariff{' '}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
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
                            console.log('PremiseType:onChangeValue: ' + item);
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
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

                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text style={styles.text_left}>Service Detail</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Service Type{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Size of Service{' '}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <RadioForm
                          disabled={!isEditable}
                          radio_props={radio_propsServiceType}
                          initial={isServiceType}
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
                              setServiceType('O/H');
                              setIsServiceType(0);
                            } else {
                              setServiceType('U/G');
                              setIsServiceType(1);
                            }
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setSizeofService(text);
                            if (validate(text, 5)) {
                              setSizeofServiceError(
                                'Input must be at least 5 characters long.',
                              );
                            } else setSizeofServiceError('');
                          }}
                          value={sizeofService}
                          editable={isEditable}
                        />
                        {sizeofServiceError !== '' && (
                          <Text style={styles.error}>{sizeofServiceError}</Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Fed From PMT/SS{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          PMT/SS Code{' '}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          //keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setFedFromPMTSS(text);
                            if (validate(text, 30)) {
                              setFedFromPMTSSError(
                                'Input must be at least 30 characters long.',
                              );
                            } else setFedFromPMTSSError('');
                          }}
                          value={fedFromPMTSS}
                          editable={isEditable}
                        />
                        {fedFromPMTSSError !== '' && (
                          <Text style={styles.error}>{fedFromPMTSSError}</Text>
                        )}
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setPMTSSCode(text);
                            if (validate(text, 30)) {
                              setPMTSSCodeError(
                                'Input must be at least 30 characters long.',
                              );
                            } else setPMTSSCodeError('');
                          }}
                          value={pmtSSCode}
                          editable={isEditable}
                        />
                        {pmtSSCodeError !== '' && (
                          <Text style={styles.error}>{pmtSSCodeError}</Text>
                        )}
                      </View>
                    </View>

                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text style={styles.text_left}>Load Detail</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Connected Load{' '}
                        </Text>
                      </View>

                      <View style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Contract Load (KW){' '}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setConnectedLoad(text);
                            if (validate(text, 10)) {
                              setConnectedLoadError(
                                'Input must be at least 10 characters long.',
                              );
                            } else setConnectedLoadError('');
                          }}
                          value={connectedLoad}
                          editable={false}
                        />
                        {connectedLoadError !== '' && (
                          <Text style={styles.error}>{connectedLoadError}</Text>
                        )}
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setContractLoad(text);
                            if (validate(text, 10)) {
                              setContractLoadError(
                                'Input must be at least 10 characters long.',
                              );
                            } else setContractLoadError('');
                          }}
                          value={contractLoad}
                          editable={isEditable}
                        />
                        {contractLoadError !== '' && (
                          <Text style={styles.error}>{contractLoadError}</Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Connected Load (KW){' '}
                        </Text>
                      </View>

                      <View style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Running Load (KW)
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setConnectedLoadKW(text);
                            if (validate(text, 10)) {
                              setConnectedLoadKWError(
                                'Input must be at least 10 characters long.',
                              );
                            } else setConnectedLoadKWError('');
                          }}
                          value={connectedLoadKW}
                          editable={isEditable}
                        />
                        {connectedLoadKWError !== '' && (
                          <Text style={styles.error}>
                            {connectedLoadKWError}
                          </Text>
                        )}
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <TextInput
                          style={styles.inputLoadDetail}
                          placeholder={'Please enter'}
                          keyboardType={'numeric'}
                          placeholderTextColor="grey"
                          onChangeText={text => {
                            setRunningLoadKW(text);
                            if (validate(text, 10)) {
                              setRunningLoadKWError(
                                'Input must be at least 10 characters long.',
                              );
                            } else setRunningLoadKWError('');
                          }}
                          value={runningLoadKW}
                          editable={isEditable}
                        />
                        {runningLoadKWError !== '' && (
                          <Text style={styles.error}>{runningLoadKWError}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Metering Equipment Detail' && (
            <ScrollView horizontal={true}>
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <View
                    style={{
                      //                    marginTop: 3,  //footerInputPower2
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.footerInputPower2}>
                      <DataTable>
                        <DataTable.Header style={widerCell}>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}> Register</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>KE No </Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>Reading</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>M.F</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>MDI</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>Make</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>MC</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>
                              Meter CT ratio
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>
                              Meter CT ratio
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>Blng Mode</Text>
                          </DataTable.Cell>
                          <DataTable.Cell style={meteringEquipCell}>
                            <Text style={meteringEquipCelltext}>Remarks</Text>
                          </DataTable.Cell>
                        </DataTable.Header>
                        {meteringEquipment.map((l, i) => (
                          <DataTable.Row style={styles.databeBox} key={i}>
                            <View>
                              <TextInput
                                style={{
                                  width: 130,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  borderLeftColor: 'black',
                                  borderLeftWidth: 1,
                                  marginLeft: -20,
                                  textAlign: 'center',
                                }}
                                // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                placeholder="Register"
                                editable={false}
                                placeholderTextColor="black"
                                fontSize={12}
                                color="black"
                                value={l.Register}
                              />
                            </View>
                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 124,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
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
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
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
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMF(t, i)}
                                placeholder="M.F"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.MF}
                              />
                            </View>
                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMDI(t, i)}
                                placeholder="MDI"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.MDI}
                              />
                            </View>

                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 120,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMake(t, i)}
                                placeholder="Make"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.Make}
                              />
                            </View>
                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMC(t, i)}
                                placeholder="MC"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.MC}
                              />
                            </View>

                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMeterCTratio1(t, i)}
                                placeholder="Meter CT ratio"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.MeterCTratio1}
                              />
                            </View>

                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 120,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateMeterCTratio2(t, i)}
                                placeholder="Meter CT ratio"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.MeterCTratio2}
                              />
                            </View>

                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
                                onChangeText={t => updateBlngMode(t, i)}
                                placeholder="Blng Mode"
                                placeholderTextColor="black"
                                fontSize={12}
                                value={l.BlngMode}
                              />
                            </View>

                            <View style={meteringEquipCellvalue}>
                              <TextInput
                                style={{
                                  width: 122,
                                  borderRightColor: 'black',
                                  borderRightWidth: 1,
                                  color: 'black',
                                }}
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
                      onChangeText={value => {
                        setQuantity(value);
                        if (validate(value, 3)) {
                          setQuantityError(
                            'Input must be at least 2 characters long.',
                          );
                        } else setQuantityError('');
                      }}
                      placeholder="Quantity"
                      keyboardType={'numeric'}
                      placeholderTextColor="black"
                      fontSize={14}
                      value={quantity}
                      //defaultValue="1"
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
                        style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                        <View style={{flex: 2.5, flexDirection: 'column'}}>
                          {checkBoxList.map(data => {
                            return (
                              <View style={{flexDirection: 'column'}}>
                                <CheckBox
                                  disabled={!isEditable}
                                  title={data.name}
                                  checked={data.ischeck}
                                  containerStyle={{
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    padding: 0.1,
                                    fontWeight: 'bold',
                                  }}
                                  onPress={() =>
                                    onSelectCheckBox(data.name, data.ischeck)
                                  }
                                />
                              </View>
                            );
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

          {tab == 'Status of Postal Order/Seal' && (
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
                            Meter{' '}
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
                              placeholder={'Meter'}
                              //keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMeter(text);
                                if (validate(text, 10)) {
                                  setMeterError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setMeterError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={meter}
                              editable={isEditable}
                            />
                            {meterError !== '' && (
                              <Text style={styles.error}>{meterError}</Text>
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
                            Main Cover{' '}
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
                              placeholder={'Main Cover'}
                              //keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              maxLength={11}
                              onChangeText={text => {
                                setMainCover(text);
                                if (validate(text, 10)) {
                                  setMainCoverError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setMainCoverError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={mainCover}
                              editable={isEditable}
                            />
                            {mainCoverError !== '' && (
                              <Text style={styles.error}>{mainCoverError}</Text>
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
                            Terminal Cover{' '}
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
                              placeholder={'Terminal Cover'}
                              //keyboardType={'numeric'}
                              maxLength={13}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setTerminalCover(text);
                                if (validate(text, 10)) {
                                  setTerminalCoverError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setTerminalCoverError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={terminalCover}
                              editable={isEditable}
                            />
                            {terminalCoverError !== '' && (
                              <Text style={styles.error}>
                                {terminalCoverError}
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
                            At B/CT Chamber (switch Black Plate){'\n'}
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
                              placeholder={'At B/CT Chamber'}
                              //keyboardType={'numeric'}
                              maxLength={13}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setChamber(text);
                                if (validate(text, 10)) {
                                  setChamberError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setChamberError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={chamber}
                              editable={isEditable}
                            />
                            {chamberError !== '' && (
                              <Text style={styles.error}>{chamberError}</Text>
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
                            PT Fuse And PT Side{' '}
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
                              placeholder={'PT Fuse And PT Side'}
                              //keyboardType={'numeric'}
                              maxLength={13}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setPTfuse(text);
                                if (validate(text, 10)) {
                                  setPTfuseError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setPTfuseError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={pTfuse}
                              editable={isEditable}
                            />
                            {pTfuseError !== '' && (
                              <Text style={styles.error}>{pTfuseError}</Text>
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
                            Panel Door{' '}
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
                              placeholder={'Panel Door'}
                              //keyboardType={'numeric'}
                              maxLength={13}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setPanelDoor(text);
                                if (validate(text, 10)) {
                                  setPanelDoorError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setPanelDoorError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={panelDoor}
                              editable={isEditable}
                            />
                            {panelDoorError !== '' && (
                              <Text style={styles.error}>{panelDoorError}</Text>
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
                            Main Cover Plate and Terminal Seal{' '}
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
                              placeholder={'Main Cover Plate and Terminal Seal'}
                              //keyboardType={'numeric'}
                              maxLength={13}
                              placeholderTextColor="grey"
                              onChangeText={text => {
                                setMainCoverPlate(text);
                                if (validate(text, 10)) {
                                  setMainCoverPlateError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setMainCoverPlateError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={mainCoverPlate}
                              editable={isEditable}
                            />
                            {mainCoverPlateError !== '' && (
                              <Text style={styles.error}>
                                {mainCoverPlateError}
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

          {tab == 'Testing By Time Power Method' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View style={styles.footerInputMeterInstalled}>
                  <View
                    style={{flex: 0.9, width: 380, alignItems: 'flex-start'}}>
                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.otherMeterInstalled}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        {' '}
                        Other Meter Installed{' '}
                      </Text>
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
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          1 -{' '}
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
                            //keyboardType={'email-address'}
                            placeholderTextColor="grey"
                            onChangeText={text => {
                              setMeterInstalled(text);
                              if (validate(text, 10)) {
                                setMeterInstalledError(
                                  'Input must be at least 10 characters long.',
                                );
                              } else setMeterInstalledError('');
                            }}
                            style={{
                              //height: 24,
                              width: '100%',
                              borderBottomWidth: 0.5,
                              textAlign: 'left',
                              textAlignVertical: 'top',
                              color: 'black',
                            }}
                            value={meterInstalled}
                            editable={isEditable}
                          />
                          {meterInstalledError !== '' && (
                            <Text style={styles.error}>
                              {meterInstalledError}
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
                              if (validate(text, 10)) {
                                setMeterInstalled1Error(
                                  'Input must be at least 10 characters long.',
                                );
                              } else setMeterInstalled1Error('');
                            }}
                            style={{
                              //height: 24,
                              width: '100%',
                              borderBottomWidth: 0.5,
                              textAlign: 'left',
                              textAlignVertical: 'top',
                              color: 'black',
                            }}
                            value={meterInstalled1}
                            editable={isEditable}
                          />
                          {meterInstalled1Error !== '' && (
                            <Text style={styles.error}>
                              {meterInstalled1Error}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    {/*
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 20,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
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
                            }}
                            value={meterInstalled2}
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
                          4 -{' '}
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
                            }}
                            value={meterInstalled3}
                          />
                        </View>
                      </View>
                    </View>
*/}
                  </View>
                </View>
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
                          <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                  if (validate(text, 5)) {
                                    setCurrentAmpError(
                                      'Input must be at least 5 characters long.',
                                    );
                                  } else setCurrentAmpError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={currentAmp}
                                editable={isEditable}
                              />
                              {currentAmpError !== '' && (
                                <Text style={styles.error}>
                                  {currentAmpError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Voltage (Volts){' '}
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
                                  if (validate(text, 5)) {
                                    setVoltageKVError(
                                      'Input must be at least 5 characters long.',
                                    );
                                  } else setVoltageKVError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={voltageKV}
                                editable={isEditable}
                              />
                              {voltageKVError !== '' && (
                                <Text style={styles.error}>
                                  {voltageKVError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                  if (validate(text, 10)) {
                                    setPowerFactorError(
                                      'Input must be at least 2 characters long.',
                                    );
                                  } else setPowerFactorError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerFactor}
                                editable={isEditable}
                              />
                              {powerFactorError !== '' && (
                                <Text style={styles.error}>
                                  {powerFactorError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                  if (validate(text, 10)) {
                                    setKtoError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setKtoError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={kto}
                                editable={isEditable}
                              />
                              {ktoError !== '' && (
                                <Text style={styles.error}>{ktoError}</Text>
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              % Error ={' '}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 10,
                              }}>
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
                                  if (validate(text, 10)) {
                                    setPerErrorError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setPerErrorError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={perError}
                                editable={isEditable}
                              />
                              {perErrorError !== '' && (
                                <Text style={styles.error}>
                                  {perErrorError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Power Calculated/{' '}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 10,
                              }}>
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
                                  if (validate(text, 10)) {
                                    setPowerCalculatedError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setPowerCalculatedError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerCalculated}
                                editable={isEditable}
                              />
                              {powerCalculatedError !== '' && (
                                <Text style={styles.error}>
                                  {powerCalculatedError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Power Observed/{' '}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 10,
                              }}>
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
                                  if (validate(text, 10)) {
                                    setPowerObservedError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setPowerObservedError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerObserved}
                                editable={isEditable}
                              />
                              {powerObservedError !== '' && (
                                <Text style={styles.error}>
                                  {powerObservedError}
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
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                              }}></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
          {tab == 'Meter Detail' && (
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
                          <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                  if (validate(text, 10)) {
                                    setPowerKENoError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setPowerKENoError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerKENo}
                                editable={isEditable}
                              />
                              {powerKENoError !== '' && (
                                <Text style={styles.error}>
                                  {powerKENoError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                  if (validate(text, 10)) {
                                    setPowerMeterMakeError(
                                      'Input must be at least 10 characters long.',
                                    );
                                  } else setPowerMeterMakeError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerMeterMake}
                                editable={isEditable}
                              />
                              {powerMeterMakeError !== '' && (
                                <Text style={styles.error}>
                                  {powerMeterMakeError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio - Pri{' '}
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
                                //keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerMC(text);
                                  if (validate(text, 4)) {
                                    setPowerMCError(
                                      'Input must be at least 4 characters long.',
                                    );
                                  } else setPowerMCError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerMC}
                                editable={isEditable}
                              />
                              {powerMCError !== '' && (
                                <Text style={styles.error}>{powerMCError}</Text>
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio - Sec{' '}
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
                                placeholder={'Meter CT Ratio'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerMCSec(text);
                                  if (validate(text, 4)) {
                                    setPowerMCSecError(
                                      'Input must be at least 4 characters long.',
                                    );
                                  } else setPowerMCSecError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerMCSec}
                                editable={isEditable}
                              />
                              {powerMCSecError !== '' && (
                                <Text style={styles.error}>
                                  {powerMCSecError}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter PT Ratio - Pri{' '}
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
                                  setPowerPT(text);
                                  if (validate(text, 4)) {
                                    setPowerPTError(
                                      'Input must be at least 4 characters long.',
                                    );
                                  } else setPowerPTError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerPT}
                                editable={isEditable}
                              />
                              {powerPTError !== '' && (
                                <Text style={styles.error}>{powerPTError}</Text>
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter PT Ratio - Sec{' '}
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
                                //keyboardType={'email-address'}
                                placeholderTextColor="grey"
                                onChangeText={text => {
                                  setPowerPTSec(text);
                                  if (validate(text, 4)) {
                                    setPowerPTSecError(
                                      'Input must be at least 4 characters long.',
                                    );
                                  } else setPowerPTSecError('');
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={powerPTSec}
                                editable={isEditable}
                              />
                              {powerPTSecError !== '' && (
                                <Text style={styles.error}>
                                  {powerPTSecError}
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
                                width: '100%',
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
                      </View>
                      {/*-- Register Grid Added by Saad */}
                      <View>
                        <View
                          style={[
                            styles.mainbox,
                            {backgroundColor: '#1565C0'},
                          ]}>
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
                            {powermeter.length !== 0 &&
                              powermeter.map((l, i) => (
                                <DataTable.Row style={styles.databeBox} key={i}>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
                                    <Text
                                      style={styles.input}
                                      //onChangeText={t => updateLoadDetails(t, i)}
                                      placeholder="LoadDetails"
                                      placeholderTextColor="black"
                                      fontSize={12}>
                                      {l.Zkennziff}
                                    </Text>
                                  </View>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
                                    <Text
                                      style={styles.input}
                                      //onChangeText={t => updateQuantity(t, i)}
                                      placeholder="Quantity"
                                      keyboardType={'numeric'}
                                      placeholderTextColor="black"
                                      fontSize={14}>
                                      {l.ZwnummerM2}
                                    </Text>
                                  </View>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
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
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
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
                                        deletePowerMeter(i, e);
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
                              open={openPowerRegister}
                              value={valuePowerRegister}
                              items={itemsPowerRegister}
                              setOpen={setOpenPowerRegister}
                              setValue={setValuePowerRegister}
                              setItems={setItemsPowerRegister}
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
                              onChangeText={value => {
                                setPowerMeterReading(value);
                                if (validate(value, 10)) {
                                  setPowerMeterReadingError(
                                    'Input must be at least 10 characters long.',
                                  );
                                } else setPowerMeterReadingError('');
                              }}
                              placeholder="Meter Reading"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}
                              value={powermeterreading}
                            />
                            {powerMeterReadingError !== '' && (
                              <Text style={styles.error}>
                                {powerMeterReadingError}
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
                            onPress={() => onAddmorePower()}>
                            <Text style={{textAlign: 'center', color: 'white'}}>
                              Add More +{' '}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
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
                          <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                }}
                                value={lightKENo}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                }}
                                value={lightMeterMake}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio - Pri{' '}
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
                                }}
                                value={lightMC}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio - Sec{' '}
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
                                  setLightMCSec(text);
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={lightMCSec}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter PT Ratio - Pri{' '}
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
                                  setLightPT(text);
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={lightPT}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter PT Ratio - Sec{' '}
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
                                  setLightPTSec(text);
                                }}
                                style={{
                                  //height: 24,
                                  width: '100%',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'left',
                                  textAlignVertical: 'top',
                                  color: 'black',
                                }}
                                value={lightPTSec}
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
                                setLightMeterRemarks(text);
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
                              value={lightMeterRemarks}
                            />
                          </View>
                        </View>
                      </View>
                      {/*-- Grid Added by Saad */}
                      <View>
                        <View
                          style={[
                            styles.mainbox,
                            {backgroundColor: '#1565C0'},
                          ]}>
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
                            {lightmeter.length !== 0 &&
                              lightmeter.map((l, i) => (
                                <DataTable.Row style={styles.databeBox} key={i}>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
                                    <Text
                                      style={styles.input}
                                      //onChangeText={t => updateLoadDetails(t, i)}
                                      placeholder="LoadDetails"
                                      placeholderTextColor="black"
                                      fontSize={12}>
                                      {l.Zkennziff}
                                    </Text>
                                  </View>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
                                    <Text
                                      style={styles.input}
                                      //onChangeText={t => updateQuantity(t, i)}
                                      placeholder="Quantity"
                                      keyboardType={'numeric'}
                                      placeholderTextColor="black"
                                      fontSize={14}>
                                      {l.ZwnummerM2}
                                    </Text>
                                  </View>
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
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
                                  <View
                                    style={{flex: 1, backgroundColor: 'white'}}>
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
                                        deleteLightMeter(i, e);
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
                              open={openLightRegister}
                              value={valueLightRegister}
                              items={itemsLightRegister}
                              setOpen={setOpenLightRegister}
                              setValue={setValueLightRegister}
                              setItems={setItemsLightRegister}
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
                              onChangeText={value =>
                                setLightMeterReading(value)
                              }
                              placeholder="Meter Reading"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}
                              value={lightmeterreading}
                            />
                          </View>
                        </View>
                        <View>
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
                            onPress={() => onAddmoreLight()}>
                            <Text style={{textAlign: 'center', color: 'white'}}>
                              Add More +{' '}
                            </Text>
                          </TouchableOpacity>
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
                      console.log('CANCELE PRESSED');
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
                  var postalOrderSealfill = [];
                  var meteringEquipmentfill = [];

                  postalOrderSeal.map((l, i) => {
                    if (
                      l.Meter != '' ||
                      l.MainCover != '' ||
                      l.TerminalCover != '' ||
                      l.Chamber != '' ||
                      l.PTfuse != '' ||
                      l.PanelDoor != '' ||
                      l.MainCoverPlate != ''
                    ) {
                      setIspostalOrderSeal('Y');
                      // updateLAmp(l.AMP, i);
                      postalOrderSealfill = [
                        {
                          Meter: l.Meter,
                          MainCover: l.MainCover,
                          TerminalCover: l.TerminalCover,
                          Chamber: l.Chamber,
                          PTfuse: l.PTfuse,
                          PanelDoor: l.PanelDoor,
                          MainCoverPlate: l.MainCoverPlate,
                        },
                        ...postalOrderSealfill,
                      ];
                    }
                  });
                  //console.log('lightmeterdetailfill', postalOrderSealfill);
                  //setLightmeterdetail(lightmeterdetailfill);

                  meteringEquipment.map((l, i) => {
                    if (
                      l.KENo != '' ||
                      l.Reading != '' ||
                      l.MF != '' ||
                      l.MDI != '' ||
                      l.Make != '' ||
                      l.MC != '' ||
                      l.MeterCTratio1 != '' ||
                      l.MeterCTratio2 != '' ||
                      l.BlngMode != '' ||
                      l.Remarks != ''
                    ) {
                      setIsmeteringEquipment('Y');

                      meteringEquipmentfill = [
                        {
                          Register: l.Register,
                          KENo: l.KENo,
                          Reading: l.Reading,
                          MF: l.MF,
                          MDI: l.MDI,
                          Make: l.Make,
                          MC: l.MC,
                          MeterCTratio1: l.MeterCTratio1,
                          MeterCTratio2: l.MeterCTratio2,
                          BlngMode: l.BlngMode,
                          Remarks: l.Remarks,
                        },
                        ...meteringEquipmentfill,
                      ];
                    }
                  });
                  console.log('SIR: ' + data.Sirnr);

                  if (buttonType == 'Post') {
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

                  /*
                  AsyncStorage.getItem('SIRDigitization').then(items => {
                    var data1 = [];

                    data1 = items ? JSON.parse(items) : [];

                    data1 = [
                      ...data1,
                      {
                        CaseType: 'Planned',
                        SIRType: 'Above 40',
                        Status: 'Pending',
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
                        PMTSSCode: pmtSSCode,
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
                        LightmeterdetailFlag: 'N',
                        PowermeterdetailFlag: 'N',
                        PostalOrderSeal: postalOrderSeal,
                        PowerFactor: powerFactor,
                        Kto: kto,
                        PerError: perError,
                        PowerCalculated: powerCalculated,
                        PowerObserved: powerObserved,
                        MeteringEquipment: meteringEquipment,
                        MeterInstalled3: meterInstalled3,
                        PostalOrderSealFlag: ispostalOrderSeal,
                        MeteringEquipmentFlag: ismeteringEquipment,
                      },
                    ];

                    AsyncStorage.setItem(
                      'SIRDigitization',
                      JSON.stringify(data1),
                    );

                    // console.log("data1", data1);
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
    width: 1400,
    marginLeft: 8,
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
    width: 150,
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

  otherMeterInstalled: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: -50,
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

  checkboxChecked: {
    backgroundColor: 'black',
  },

  checkboxInput: {
    flexDirection: 'row',

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

    backgroundColor: 'black', //'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    margin: 8,
    fontSize: 16,
    color: 'black',
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
    height: 535,
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
