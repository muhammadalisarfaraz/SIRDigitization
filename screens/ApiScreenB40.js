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
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from 'react-native-paper';

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

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import DropDownPicker from 'react-native-dropdown-picker';
import base64 from 'react-native-base64';

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
import moment from 'moment';
import {and, set} from 'react-native-reanimated';
import SignatureCapture from 'react-native-signature-capture';
//import { obsDiscrepanciesB40 } from "./util/obsDiscrepanciesB40";
//import "./styles.css";
import NetInfo from '@react-native-community/netinfo';
import {myGlobalVariable} from './globals';

let current = 100;
const ApiScreenB40 = ({route, navigation}) => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Discrepancy Recorded');
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
    // New Code Added BY Saad
    var Allimages = signatureImages;
    setSignatureImages([
      {
        uri: consSign,
      },
      ...Allimages,
    ]);
    // New Code Added BY Saad
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
      name: 'Burnt', // label for checkbox item
      value: 1,
      ischeck: false,
    },
    {
      name: 'Direct Use/Extra Phase',
      value: 2,
      ischeck: false,
    },
    {
      name: 'Doubtful',
      value: 3,
      ischeck: false,
    },
    {
      name: 'Hole',
      value: 4,
      ischeck: false,
    },
    {
      name: 'N/Break', // label for checkbox item
      value: 5,
      ischeck: false,
    },
    {
      name: 'New Connection',
      value: 6,
      ischeck: false,
    },
    {
      name: 'Stop',
      value: 7,
      ischeck: false,
    },
    {
      name: 'Shunt', // label for checkbox item
      value: 8,
      ischeck: false,
    },
    {
      name: 'Sticky',
      value: 9,

      ischeck: false,
    },
    {
      name: 'Smoky', // label for checkbox item
      value: 10,
      ischeck: false,
    },
    {
      name: 'Slow',
      value: 11,
      ischeck: false,
    },
    {
      name: 'T-Strip/Damaged/Open', // label for checkbox item
      value: 12,
      ischeck: false,
    },
  ]);

  let onSelectCheckBox = (name, id) => {
    setcheckBoxSelectedList([{name}, ...checkBoxselectedList]);

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

  const [pitems, setPItems] = useState([
    //        { label: '-- Please Select --', value: '', imageCount: 0 },
    {label: 'Main Cover', value: 'Main Cover'},
    {label: 'Terminal cover', value: 'Terminal cover'},
    {label: 'Panel door', value: 'Panel door'},
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
      name: 'Consumer Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Meter Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Appliance Detail',
      active: false,
    },
    /*
    {
      id: 4,
      name: 'Light Meter Detail',
      active: false,
    },
    */
    {
      id: 5,
      name: 'Meter Testing Result',
      active: false,
    },
    {
      id: 6,
      name: 'Discrepancy and Findings',
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
  ]);

  const [apiRes, setApiRes] = useState([]);
  const [descripancyRecordedList, setdescripancyRecordedList] = useState([]);

  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [signatureImages, setSignatureImages] = useState([]);
  const [filePath1, setFilePath1] = useState([]);
  const [images1, setImages1] = useState([]);
  const [consumerImages, setConsumerImages] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');
  const [imageview, setimageview] = useState(false);
  const [imageview2, setimageview2] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const [indexer2, setindexer2] = useState(0);
  const {width} = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [buttonType, setButtonType] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  /* Consumer Detail */

  const [consumerStatus, setConsumerStatus] = useState('X');
  const [isConsumerStatus, setIsConsumerStatus] = useState(0);
  const [serviceType, setServiceType] = useState('O/H');
  const [isServiceType, setIsServiceType] = useState(0);

  //const [industryType, setIndustryType] = useState('');
  //const [tariff, setTariff] = useState('');
  const [ibcName, setIbcName] = useState('');
  const [CELL_NUMBER, setCELL_NUMBER] = useState('');
  const [reviewRemarks, setReviewRemarks] = useState('');
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
  const [powerMCSec, setPowerMCSec] = useState('');
  const [powerReading, setPowerReading] = useState('');
  const [powerMeterRemarks, setPowerMeterRemarks] = useState('');
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
  const [lightmeterreading, setLightMeterReading] = useState('');

  /* Light Meter ------------ End */
  /* Meter Testing Result ------------ Start */
  const [meterTestingResultTC, setMeterTestingResultTC] = useState('');
  const [meterTestingperError, setMeterTestingperError] = useState('');
  const [meterTestingTo, setMeterTestingTo] = useState('');
  const [meterInstalled1, setMeterInstalled1] = useState('');
  const [meterInstalled2, setMeterInstalled2] = useState('');
  const [meterInstalled, setMeterInstalled] = useState('FMR');
  const [isMeterInstalled, setIsMeterInstalled] = useState(0);
  const [fmrNo, setFMRNo] = useState('');
  const [statusPostalorder, setStatusPostalorder] = useState('');
  const [metertestingResultremarks, setmetertestingResultremarks] =
    useState('');

  /* Meter Testing Result ------------ End */

  /* Discrepancy and Findings ------------ Start */

  const [discrepancyfindingsRemarks, setDiscrepancyfindingsRemarks] =
    useState('');
  /* Discrepancy and Findings ------------ End */

  /* Customer Acknowlegment ------------ Start */

  const [consumerName, setConsumerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [consumerCNIC, setConsumerCNIC] = useState('');
  const [consumerRemarks, setConsumerRemarks] = useState('');
  const [consumerRefuseYN, setConsumerRefuseYN] = useState('Yes');
  const [isConsumerRefuseYN, setIsConsumerRefuseYN] = useState(0);
  const [consumerSign, setConsumerSign] = useState('Yes');
  const [isConsumerSign, setIsConsumerSign] = useState(0);

  /* Customer Acknowlegment ------------ End */

  const [SIR, setSIR] = useState('');
  const [SIRIMAGE, setSIRIMAGE] = useState('');
  const [SIRIMAGECONSUMER, setSIRIMAGECONSUMER] = useState('');

  const [cosnumerno, setCosnumerno] = useState('');

  const [clusterIBC, setClusterIBC] = useState('');
  const [consumernameBilling, setConsumernameBilling] = useState('');

  const [accountno, setAccountno] = useState('');
  const [address, setAddress] = useState('');

  const [assigndate, setAssigndate] = useState('20.02.2022');
  const [assignto, setAssignto] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isSignModalVisible, setSignModalVisible] = useState(false);

  const [error, setError] = useState('');
  //const [industryTypeError, setIndustryTypeError] = useState('');
  //const [tariffError, setTariffError] = useState('');
  const [sizeofServiceError, setSizeofServiceError] = useState('');
  const [fedFromPMTSSError, setFedFromPMTSSError] = useState('');
  const [pmtSSCodeError, setPMTSSCodeError] = useState('');
  const [connectedLoadError, setConnectedLoadError] = useState('');
  const [contractLoadError, setContractLoadError] = useState('');
  const [connectedLoadKWError, setConnectedLoadKWError] = useState('');
  const [runningLoadKWError, setRunningLoadKWError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [meterTestingResultTCError, setMeterTestingResultTCError] =
    useState('');
  const [meterTestingperErrorError, setMeterTestingperErrorError] =
    useState('');
  const [meterTestingToError, setMeterTestingToError] = useState('');
  const [meterInstalled1Error, setMeterInstalled1Error] = useState('');
  const [meterInstalled2Error, setMeterInstalled2Error] = useState('');
  const [fmrNoError, setFMRNoError] = useState('');
  const [discrepancyfindingsRemarksError, setDiscrepancyfindingsRemarksError] =
    useState('');
  const [powerKENoError, setPowerKENoError] = useState('');
  const [powerMeterMakeError, setPowerMeterMakeError] = useState('');
  const [powerMCError, setPowerMCError] = useState('');
  const [powerMeterRemarksError, setPowerMeterRemarksError] = useState('');
  const [powerMeterReadingError, setPowerMeterReadingError] = useState('');
  const [consumerNameError, setConsumerNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [consumerCNICError, setConsumerCNICError] = useState('');
  const [consumerRemarksError, setConsumerRemarksError] = useState('');
  const [agedifferror, setAgedifferror] = useState('');

  const [uploadingMsg, setUploadingMsg] = useState('');

  const [consumerSignature, setConsumerSignature] = useState([]);
  const [isSignature, setIsSignature] = useState('N');

  const SPACING = 10;
  const THUMB_SIZE = 80;
  const flatListRef = useRef();
  const carouselRef = useRef();
  const carouselRef2 = useRef();

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const onTouchThumbnail2 = touched => {
    if (touched === indexSelected) return;
    carouselRef2?.current?.snapToItem(touched);
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

  const [date1, setDate] = useState('');

  // saad Comment Tarif Dropdowm
  const [openTarif, setOpenTarif] = useState(false);
  const [valueTarif, setValueTarif] = useState(null);
  const [itemsTarif, setItemsTarif] = useState([]);

  // saad Comment PremiseType Dropdowm
  const [openPremiseType, setOpenPremiseType] = useState(false);
  const [valuePremiseType, setValuePremiseType] = useState(null);
  const [itemsPremiseType, setItemsPremiseType] = useState([]);

  const [descripancylist, setDescripancyList] = useState([]);
  const [completeDescripancyList, setCompleteDescripancyList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [appliancelist, setApplianceList] = useState([]);

  // saad Comment Meter Detail - Light

  // saad Comment Meter Detail - Power
  const [powermeter, setPowerMeter] = useState([]);

  const [powerregister, setPowerRegister] = useState('');
  const [powermeterreading, setPowerMeterReading] = useState('');

  const [sirdate, setSirDate] = useState('');
  const [sirtime, setSirTime] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const [NAME, setNAME] = useState('');
  const [ADDRESS, setADDRESS] = useState('');
  const [CONSUMER_NO, setCONSUMER_NO] = useState('');
  const [Vkont, setVkont] = useState('');
  const [TARIFF, setTARIFF] = useState('');
  const [contract, setContract] = useState('');

  const {data, index, otherParam} = route.params;

  // saad Comment MRNote Dropdowm
  const [itemsMRNote, setItemsMRNote] = useState([]);

  // saad Comment Appliance Dropdowm
  const [openAppliance, setOpenAppliance] = useState(false);
  const [valueAppliance, setValueAppliance] = useState(null);
  const [itemsAppliance, setItemsAppliance] = useState([]);
  const [loadDetails, setLoadDetails] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [rating, setRating] = useState('');
  const [totalWatts, setTotalWatts] = useState('');

  // saad Comment Power Register Dropdowm
  const [openPowerRegister, setOpenPowerRegister] = useState(false);
  const [valuePowerRegister, setValuePowerRegister] = useState(null);
  const [itemsPowerRegister, setItemsPowerRegister] = useState([
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
    /*
    {label: 'R', value: 'R'},
    {label: 'Y', value: 'Y'},
    {label: 'B', value: 'B'},
    {label: 'N', value: 'N'},
*/
  ]);

  // saad Comment Light Register Dropdowm
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

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);

    // searchFilterFunctionDate(moment(date).format("YYYYMMDD"));

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
        alert(response.errorMessage);
        return;
      }

      setIsImage('Y');

      var Allimages = images;
      setFilePath([
        {
          uri: response.path,
          url: response.path,
          fileName: 'gallery.jpg',
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
          fileName: 'gallery.jpg',
          base64: response.data,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);
    });
  };

  const deleteLightMeter = (index, e) => {
    setLightMeter(lightmeter.filter((v, i) => i !== index));
  };
  const deletePowerMeter = (index, e) => {
    setPowerMeter(powermeter.filter((v, i) => i !== index));
  };

  const deleteAppliance = (index, e) => {
    setTableList(tableList.filter((v, i) => i !== index));
    setApplianceList(appliancelist.filter((v, i) => i !== index));
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

    if (powerKENo == '' || powerKENo == undefined) {
      alert('Please provide Meter No first');
      return false;
    }

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
      SignatureImages: signatureImages,
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
    RESULT,
  ) => {
    console.log(descripancylist);
    console.log(selectedItems);

    let SIRData = [];
    AsyncStorage.getItem('SIRDigitization').then(async items => {
      let data1 = JSON.parse(items);
      data1.filter((item, index) => {
        if (item.Sirnr == SIR) {
          console.log('item.Sirnr ', item.Sirnr);
          console.log('index', index);
          console.log('SIR', SIR);
          data1[index].SIRType = 'B40';
          data1[index].SirFormat = 'B40';
          data1[index].Status = status;
          data1[index].Sirnr = SIR;

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
          data1[index].AccountNo = accountno;
          data1[index].Ibc = data.Ibc;
          data1[index].MRU = data.MRU;

          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data1));
        }
      });
    });

    SIRData.push({
      SIRType: 'B40',
      SirFormat: 'B40',
      Status: status,
      SIRTime: sirtime,
      SIRDate: sirdate,
      Sirnr: SIR,

      MRU: data.MRU,
      Vertrag: data.Vertrag,
      Vkont: data.Vkont,
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
      ConsumerRefuseYN: consumerRefuseYN,
      IsConsumerRefuseYN: isConsumerRefuseYN,
      ConsumerSign: consumerSign,
      IsConsumerSign: isConsumerSign,
      ConsumerRemarks: consumerRemarks,
      MobileNo: mobileNo,
      ConsumerName: consumerName,
      ConsumerCNIC: consumerCNIC,
      ConsumerRemarks: consumerRemarks,
      ServiceType: serviceType,
      IsServiceType: isServiceType,
      Tariff: valueTarif,
      DescripancyDetail: descripancylist,
      ApplianceDetail: tableList,
      Appliancelist: appliancelist,
      DiscrepancyfindingsRemarks: discrepancyfindingsRemarks,
      isDiscrepancyitems: isSelecteditems,
      Discrepancyitems: selectedItems,
      longitude: longitude,
      latitude: latitude,
      UniqueId: Date.now(),
      SIRNo: SIR,
      ConsumerNo: cosnumerno,
      ClusterIBC: clusterIBC,
      ConsumerNameBilling: consumernameBilling,
      AccountNo: accountno,

      AssignDate: assigndate,
      AssignTo: assignto,
      DiscrepancyRecord: apiRes,
      ConsumerStatus: consumerStatus,
      IsConsumerStatus: isConsumerStatus,
      PremiseType: valuePremiseType,
      SizeofService: sizeofService,
      FedFromPMTSS: fedFromPMTSS,
      PMTSSCode: pmtSSCode,
      MeterTestingResultTC: meterTestingResultTC,
      MeterTestingperError: meterTestingperError,
      ContractLoad: contractLoad,
      ConnectedLoadKW: connectedLoadKW,
      ConnectedLoad: connectedLoad,
      RunningLoadKW: runningLoadKW,
      MeterTestingResultTC: meterTestingResultTC,
      MeterTestingperError: meterTestingperError,
      MetertestingTo: meterTestingTo,
      MeterInstalled1: meterInstalled1,
      MeterInstalled2: meterInstalled2,
      MeterInstalled: meterInstalled,
      IsMeterInstalled: isMeterInstalled,
      FMRNo: fmrNo,
      Date1: date1,
      Statuspostalorder: statusPostalorder,
      Metertestingresultremarks: metertestingResultremarks,
      FindingItems: checkBoxselectedList,
      PostalOrderSealFlag: 'N',
      MeteringEquipmentFlag: 'N',
      PowerKENo: powerKENo,
      PowerMeterMake: powerMeterMake,
      PowerMC: powerMC,
      PowerMCSec: powerMCSec,
      PowerReading: powerReading,
      PowerMeter: powermeter,
      PowerMeterRemarks: powerMeterRemarks,
      PowerPT: powerPT,
      PowerPTSec: powerPTSec,
      LightKENo: lightKENo,
      LightMeterMake: lightMeterMake,
      LightMC: lightMC,
      LightMCSec: lightMCSec,
      LightMeter: lightmeter,
      LightPT: lightPT,
      LightPTSec: lightPTSec,

      isDiscrepancyitems: isSelecteditems,
      Discrepancyitems: selectedItems,
      CompleteDescripancyDetail: completeDescripancyList,

      Result_Discrepancies: Result_Discrepancies,
      Result_Appliances: Result_Appliances,
      Result_Meter: Result_Meter,
      Result_Register: Result_Register,
      Result_Onsite: Result_Onsite,
      Result_MeterSeal: Result_MeterSeal,
      RESULT: RESULT,
    });
    AsyncStorage.setItem(SIR, JSON.stringify(SIRData));

    StoreInDeviceImagesConsumer(isPost);
  };

  const PostSIRImage = connectionType => {
    let data1 = [];
    let count = 1;
    console.log('Post SIR Image Data called');

    images.filter(item => {
      //console.log('item:= ' + item);
      data1.push({
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

    axios({
      method: 'POST',
      url:
        'https://' + myGlobalVariable[2] + ':8039/api/Image/PostSIRImageData',
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
        if (res.data[0].StatusCode == '0') {
          console.log(res.data[0].StatusCode);
          //alert(res.data[0].StatusMessage);
          PostConsumerImage(count, connectionType);
        } else {
          alert(res.data[0].StatusMessage);
          console.log(res.data[0].StatusMessage);
        }
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

  const PostConsumerImage = (count, connectionType) => {
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
      signatureImages.filter(item => {
        //console.log('item:= ' + item);
        consumerImageData.push({
          imageName: data.Sirnr,
          imageBase64: item.uri,
          imageID: count.toString(),
          IBC: data.Ibc,
          SIRNo: data.Sirnr,
          ContractNo: data.Vertrag,
          MIONo: data.AssignMio,
        });
        count++;
      });
    }

    axios({
      method: 'POST',
      url:
        'https://' + myGlobalVariable[2] + ':8039/api/Image/PostSIRImageData',
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
        if (
          res.data[0].StatusCode == '0' ||
          res.data[0].StatusMessage == 'no data found'
        ) {
          console.log(res.data[0].StatusMessage);
          PostSIRSimultaneous(connectionType);
        } else {
          console.log(res.data);
          alert(res.data[0].StatusMessage);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Post Consumer Image Data: ' + error);
      });
  };
  const PostSIRSimultaneous = connectionType => {
    /*
    var filterData = onsitemeter.filter(item => {
      console.log(item);
    });
    */
    if (latitude.toString() == '') {
      alert('Please On GPS location');
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
      completeDescripancyList.length > 0 ? completeDescripancyList : [{}];

    const valuePremiseTypeData =
      valuePremiseType != undefined ? valuePremiseType : '';
    const valueTarifData = valueTarif != undefined ? valueTarif : '';

    const consumerRefuseYNData =
      consumerRefuseYN != undefined ? consumerRefuseYN : '';
    const consumerSignData = consumerSign != undefined ? consumerSign : '';

    let Srcsupply = meterInstalled + '/' + fmrNo + '/' + date1;
    let NOTICE_SIGN = consumerRefuseYNData + '/' + consumerSignData;

    console.log('fmrNo: ' + fmrNo);
    console.log('meterInstalled: ' + meterInstalled);
    console.log('data.Sirnr: ' + data.Sirnr);
    console.log('date1:' + date1);
    console.log('sirdate: ' + sirdate);
    console.log('sirtime: ' + sirtime);
    console.log('NOTICE_SIGN: ' + NOTICE_SIGN);

    console.log('**** PostSimultaneous ***Started***');

    console.log('sirdate: ' + sirdate);
    console.log('sirtime: ' + sirtime);
    console.log('consumerRemarks:' + consumerRemarks);
    console.log('discrepancyfindingsRemarks:' + discrepancyfindingsRemarks);
    console.log('powerMeterRemarks: ' + powerMeterRemarks);

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
        SERVTYPE: serviceType,
        VBSART: valuePremiseTypeData,
        TARIFTYP: valueTarifData,
        FEEDER: fedFromPMTSS,
        PMT: pmtSSCode,
        CUSTNAME: consumerName,
        MOBILE: mobileNo,
        CNIC: consumerCNIC,
        NOTICE_SIGN: NOTICE_SIGN,
        LATITUDE: latitude.toString(),
        LONGITUDE: longitude.toString(),
        DISC_REMARKS: consumerRemarks,
        SIR_REMARKS: discrepancyfindingsRemarks,
        METER_REMARKS: powerMeterRemarks,
        NAVAPPLIANCES: appliancelistData,
        NAVSIRITEMS: descripancylistData,
        CON_SRC: connectionType,
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
            Cablesize: sizeofService,
            Sanctioned: contractLoad,
            Connected: connectedLoadKW,
            Runload: runningLoadKW,
            Mctpricurr: powerMC,
            Mctseccurr: powerMCSec,
            Metertr: meterTestingResultTC,
            Pctgerr: meterTestingperError,
            Othmeter1: meterInstalled1,
            Othmeter2: meterInstalled2,
            Othmeter3: meterTestingTo,
            Srcsupply: Srcsupply,
            Osdevice: powerKENo,
          },
        ],
        SIR_Meter_SealSet: [{}],
      }),
    })
      .then(res => {
        console.log(
          'res.data.d.Result_Discrepancies------' +
            res.data.d.Result_Discrepancies,
        );
        if (res.data.d.Result_Discrepancies == 'Saved') {
          console.log(
            '******************PostSimultaneous UPDATED*********************************',
          );

          //PostSIRImage();
          StoreInDevice(
            'Post',
            true,
            res.data.d.Result_Discrepancies,
            res.data.d.Result_Appliances,
            res.data.d.Result_Meter,
            res.data.d.Result_Register,
            res.data.d.Result_Onsite,
            res.data.d.Result_MeterSeal,
            res.data.d.RESULT,
          );
          setAuthModalVisible(!isAuthModalVisible);
          setSuccessModalVisible(!isSuccessModalVisible);
        } else {
          alert('Error: SIR not posted in SAP. Please save your work.');
        }
      })
      .catch(error => {
        console.error('PostSimultaneous:error: ' + error);
      });
  };

  useEffect(() => {
    // getApiData();

    getUserCurrentLocation();
    console.log('data.Sirnr: ' + data.Sirnr);
    console.log('data.Vertrag: ' + data.Vertrag);
    console.log('data.Ibc: ' + data.Ibc);
    console.log('data.Status: ' + data.Status);

    if (data.Status != 'Post') {
      setIsEditable(true);
    }

    setReviewRemarks(data.REMARKS);
    setCELL_NUMBER(data.CELL_NUMBER);

    setSIR(data.Sirnr);
    setSIRIMAGE(data.Sirnr + 'IMAGE');
    setSIRIMAGECONSUMER(data.Sirnr + 'IMAGECONSUMER');

    setAssigndate(Moment(data.Erdat, 'YYYYMMDD').format('DD.MM.YYYY'));

    setConnectedLoad(data.ConnectedLoad);

    setNAME(data.NAME);
    setADDRESS(data.ADDRESS);
    setCONSUMER_NO(data.CONSUMER_NO);
    setVkont(data.Vkont);
    setTARIFF(data.TARIFF);
    setContract(data.Vertrag);

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
            if (item.SignatureImages != undefined) {
              setSignatureImages(item.SignatureImages);
            }
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
          if (item.IBCNAME != undefined) setIbcName(item.IBCNAME);
          if (item.TARIFF != undefined) setTARIFF(item.TARIFF);
          //if (item.CELL_NUMBER != undefined) setCELL_NUMBER(item.CELL_NUMBER);
          //if (item.REMARKS != undefined) setReviewRemarks(item.REMARKS);

          if (item.ConsumerStatus != undefined)
            setConsumerStatus(item.ConsumerStatus);
          if (item.IsConsumerStatus != undefined)
            setIsConsumerStatus(item.IsConsumerStatus);

          if (item.ServiceType != undefined) setServiceType(item.ServiceType);
          if (item.IsServiceType != undefined)
            setIsServiceType(item.IsServiceType);

          //setIndustryType(item.IndustryType);
          //setTariff(item.Tariff);
          if (item.Tariff != undefined) setValueTarif(item.Tariff);
          if (item.PremiseType != undefined)
            setValuePremiseType(item.PremiseType);

          if (item.FedFromPMTSS != undefined)
            setFedFromPMTSS(item.FedFromPMTSS);

          if (item.PMTSSCode != undefined) setPMTSSCode(item.PMTSSCode);
          if (item.RunningLoadKW != undefined)
            setRunningLoadKW(item.RunningLoadKW);
          if (item.SizeofService != undefined)
            setSizeofService(item.SizeofService);
          if (item.ContractLoad != undefined)
            setContractLoad(item.ContractLoad);

          //setCurrentAmp(item.CurrentAmp);
          //setVoltageKV(item.VoltageKV);
          //setPerError(item.PerError);
          //setPowerFactor(item.PowerFactor);

          if (item.SIRDate != undefined) {
            setSirDate(item.SIRDate);
            setSirTime(item.SIRTime);
          } else {
            setSirDate(moment().format('DD.MM.YYYY'));
            setSirTime(moment().format('HH:mm:ss'));
          }

          if (item.MeterTestingResultTC != undefined)
            setMeterTestingResultTC(item.MeterTestingResultTC);
          if (item.MeterTestingperError != undefined)
            setMeterTestingperError(item.MeterTestingperError);
          if (item.MetertestingTo != undefined)
            setMeterTestingTo(item.MetertestingTo);

          if (item.FMRNo != undefined) setFMRNo(item.FMRNo);
          if (item.Date1 != undefined) setDate(item.Date1);

          if (item.IsMeterInstalled != undefined)
            setIsMeterInstalled(item.IsMeterInstalled);
          if (item.MeterInstalled != undefined)
            setMeterInstalled(item.MeterInstalled);

          if (item.MeterInstalled1 != undefined)
            setMeterInstalled1(item.MeterInstalled1);
          if (item.MeterInstalled2 != undefined)
            setMeterInstalled2(item.MeterInstalled2);

          //setKto(item.Kto);

          if (item.ConnectedLoadKW != undefined)
            setConnectedLoadKW(item.ConnectedLoadKW);
          //setPowerCalculated(item.PowerCalculated);
          //setPowerObserved(item.PowerObserved);

          if (item.Discrepancyitems != undefined)
            setSelectedItems(item.Discrepancyitems);
          if (item.DiscrepancyfindingsRemarks != undefined)
            setDiscrepancyfindingsRemarks(item.DiscrepancyfindingsRemarks);
          if (item.ConsumerName != undefined)
            setConsumerName(item.ConsumerName);
          if (item.MobileNo != undefined) setMobileNo(item.MobileNo);
          if (item.ConsumerCNIC != undefined)
            setConsumerCNIC(item.ConsumerCNIC);
          if (item.ConsumerRemarks != undefined)
            setConsumerRemarks(item.ConsumerRemarks);

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

          if (item.PowerKENo != undefined) setPowerKENo(item.PowerKENo);
          if (item.PowerMeterMake != undefined)
            setPowerMeterMake(item.PowerMeterMake);
          if (item.PowerMC != undefined) setPowerMC(item.PowerMC);
          if (item.PowerMCSec != undefined) setPowerMCSec(item.PowerMCSec);

          if (item.PowerMeter != undefined) setPowerMeter(item.PowerMeter);
          if (item.PowerMeterRemarks != undefined)
            setPowerMeterRemarks(item.PowerMeterRemarks);
          if (item.PowerPT != undefined) setPowerPT(item.PowerPT);
          if (item.PowerPTSec != undefined) setPowerPTSec(item.PowerPTSec);

          if (item.LightKENo != undefined) setLightKENo(item.LightKENo);
          if (item.LightMeterMake != undefined)
            setLightMeterMake(item.LightMeterMake);
          if (item.LightMC != undefined) setLightMC(item.LightMC);
          if (item.LightMCSec != undefined) setLightMCSec(item.LightMCSec);
          if (item.LightMeter != undefined) setLightMeter(item.LightMeter);
          if (item.LightMeterRemarks != undefined)
            setLightMeterRemarks(item.LightMeterRemarks);
          if (item.LightPT != undefined) setLightPT(item.LightPT);
          if (item.LightPTSec != undefined) setLightPTSec(item.LightPTSec);

          if (item.ApplianceDetail != undefined)
            setTableList(item.ApplianceDetail);
          if (item.Appliancelist != undefined)
            setApplianceList(item.Appliancelist);
          if (item.DescripancyDetail != undefined)
            setDescripancyList(item.DescripancyDetail);
          if (item.CompleteDescripancyDetail != undefined)
            setCompleteDescripancyList(item.CompleteDescripancyDetail);
        }
      });
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
  const [ispowermeterdetail, setIspowermeterdetail] = useState('N');

  const [powermeterdetail, setPowermeterDetail] = useState([
    {id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: ''},
  ]);

  const [islightmeterdetail, setIslightmeterdetail] = useState('N');

  const [lightmeterdetail, setLightMeterDetail] = useState([
    {id: Date.now(), CurrentType: 'R', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'Y', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'B', AMP: '', VOLT: '', PF: ''},
    {id: Date.now(), CurrentType: 'N', AMP: '', VOLT: '', PF: ''},
  ]);

  // console.log('list table', tableList);

  const updateCurrentTypeLoadDetail = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = {...newArray[index], CurrentType: text};
    setPowermeterDetail(newArray);
  };
  const updateAmp = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = {...newArray[index], AMP: text};
    setPowermeterDetail(newArray);
  };
  const updateVolt = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = {...newArray[index], VOLT: text};
    setPowermeterDetail(newArray);
  };
  const updatePF = (text, index) => {
    let newArray = [...powermeterdetail];
    newArray[index] = {...newArray[index], PF: text};
    setPowermeterDetail(newArray);
  };

  const updateLAmp = (text, index) => {
    //  console.log("text", text);
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], AMP: text};
    setLightMeterDetail(newArray);
  };
  const updateLVolt = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], VOLT: text};
    setLightMeterDetail(newArray);
  };
  const updateLPF = (text, index) => {
    let newArray = [...lightmeterdetail];
    newArray[index] = {...newArray[index], PF: text};
    setLightMeterDetail(newArray);
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
            {/*<View
              style={{
                flex: 0.5,
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
                {'Below 40KW'}
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
                  {'Tariff: ' + data.TARIFF}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign To: ' + data.AssignMio + ' - ' + data.MIO_NAME}
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
                  paddingTop: -90,
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
                          //keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setSizeofService(text);
                            if (validate(text, 4)) {
                              setSizeofServiceError(
                                'Input must be at least 4 characters long.',
                              );
                              setSizeofService(text.slice(0, 4));
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
                          keyboardType={'email-address'}
                          placeholderTextColor="grey"
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setFedFromPMTSS(text);
                            if (validate(text, 10)) {
                              setFedFromPMTSSError(
                                'Input must be at least 10 characters long.',
                              );
                              setFedFromPMTSS(text.slice(0, 10));
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
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setPMTSSCode(text);
                            if (validate(text, 10)) {
                              setPMTSSCodeError(
                                'Input must be at least 10 characters long.',
                              );
                              setPMTSSCode(text.slice(0, 10));
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
                          Sanction Load (KW){' '}
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
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setConnectedLoad(text);
                            if (validate(text, 10)) {
                              setConnectedLoadError(
                                'Input must be at least 10 characters long.',
                              );
                              setConnectedLoad(text.slice(0, 10));
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
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setContractLoad(text);
                            if (validate(text, 10)) {
                              setContractLoadError(
                                'Input must be at least 10 characters long.',
                              );
                              setContractLoad(text.slice(0, 10));
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
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setConnectedLoadKW(text);
                            if (validate(text, 10)) {
                              setConnectedLoadKWError(
                                'Input must be at least 10 characters long.',
                              );
                              setConnectedLoadKW(text.slice(0, 10));
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
                          autoCapitalize="characters"
                          onChangeText={text => {
                            setRunningLoadKW(text);
                            if (validate(text, 10)) {
                              setRunningLoadKWError(
                                'Input must be at least 10 characters long.',
                              );
                              setRunningLoadKW(text.slice(0, 10));
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
                      <DataTable.Header style={[styles.databeHeader]}>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Load Detail
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Quantity
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
                            Rating (W)
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title>
                          <Text style={{flex: 2, color: 'white', fontSize: 15}}>
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
                      autoCapitalize="characters"
                      onChangeText={value => {
                        setQuantity(value);
                        if (validate(value, 2)) {
                          setQuantityError(
                            'Input must be at least 2 characters long.',
                          );
                          setQuantity(value.slice(0, 2));
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
                            <View style={{flex: 2}}>
                              <TextInput
                                editable={false}
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
                                editable={false}
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
                                editable={false}
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
                                editable={false}
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
                    <View style={{flex: 6}}>
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
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                marginLeft: 35,
                                fontSize: 12,
                                fontWeight: 'bold',
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

                          <View style={{flex: 2, widht: '100%'}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'TC'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMeterTestingResultTC(text);
                                if (validate(text, 10)) {
                                  setMeterTestingResultTCError(
                                    'Input must be at least 10 characters long.',
                                  );
                                  setMeterTestingResultTC(text.slice(0, 10));
                                } else setMeterTestingResultTCError('');
                              }}
                              value={meterTestingResultTC}
                              editable={isEditable}
                            />
                            {meterTestingResultTCError !== '' && (
                              <Text style={styles.error}>
                                {meterTestingResultTCError}
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
                          marginTop: -15,
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

                          <View style={{flex: 2, widht: '100%'}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'% Error'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMeterTestingperError(text);
                                if (validate(text, 6)) {
                                  setMeterTestingperErrorError(
                                    'Input must be at least 6 characters long.',
                                  );
                                  setMeterTestingperError(text.slice(0, 6));
                                } else setMeterTestingperErrorError('');
                              }}
                              value={meterTestingperError}
                              editable={isEditable}
                            />
                            {meterTestingperErrorError !== '' && (
                              <Text style={styles.error}>
                                {meterTestingperErrorError}
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
                              To =
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'To'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMeterTestingTo(text);
                                if (validate(text, 6)) {
                                  setMeterTestingToError(
                                    'Input must be at least 6 characters long.',
                                  );
                                  setMeterTestingTo(text.slice(0, 6));
                                } else setMeterTestingToError('');
                              }}
                              value={meterTestingTo}
                              editable={isEditable}
                            />
                            {meterTestingToError !== '' && (
                              <Text style={styles.error}>
                                {meterTestingToError}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>

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
                        Meter Installed{' '}
                      </Text>
                    </LinearGradient>

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
                              1 )
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Detail'}
                              keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMeterInstalled1(text);
                                if (validate(text, 10)) {
                                  setMeterInstalled1Error(
                                    'Input must be at least 10 characters long.',
                                  );
                                  setMeterInstalled1(text.slice(0, 10));
                                } else setMeterInstalled1Error('');
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
                              2 )
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'Detail'}
                              //keyboardType={'email-address'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMeterInstalled2(text);
                                if (validate(text, 10)) {
                                  setMeterInstalled2Error(
                                    'Input must be at least 10 characters long.',
                                  );
                                  setMeterInstalled2(text.slice(0, 10));
                                } else setMeterInstalled2Error('');
                              }}
                              value={meterInstalled2}
                              editable={isEditable}
                            />
                            {meterInstalled2Error !== '' && (
                              <Text style={styles.error}>
                                {meterInstalled2Error}
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
                          marginTop: 25,
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
                                marginTop: 12,
                                fontWeight: 'bold',
                              }}>
                              Action Required
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 2.5,
                              width: '88%',
                              marginTop: 10,
                              marginLeft: 30,
                            }}>
                            <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                              <RadioForm
                                disabled={!isEditable}
                                radio_props={radio_propsMeterInstalled}
                                initial={isMeterInstalled}
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
                                    setMeterInstalled('FMR');
                                    setIsMeterInstalled(0);
                                  } else {
                                    setMeterInstalled('MTV');
                                    setIsMeterInstalled(1);
                                  }
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/*
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
                          Status of Postal Order/ Seal
                        </Text>
                      </View>
                      <View style={{flex: 0.5}}>
                        <DropDownPicker
                          open={open}
                          value={value}
                          items={pitems}
                          setOpen={setOpen}
                          setValue={setValue}
                          setItems={setPItems}
                          onChangeValue={item => {
                            console.log('onChangeValue: ' + item);
                            setStatusPostalorder(item);
                          }}
                          onSelectItem={item => {
                            // setSIRFormat(item.value);
                          }}
                        />
                      </View>
                    </View>
                        */}

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
                              FMR No
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <TextInput
                              style={styles.inputLoadDetail}
                              placeholder={'FMR no'}
                              keyboardType={'numeric'}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setFMRNo(text);
                                if (validate(text, 4)) {
                                  setFMRNoError(
                                    'Input must be at least 4 characters long.',
                                  );
                                  setFMRNo(text.slice(0, 4));
                                } else setFMRNoError('');
                              }}
                              value={fmrNo}
                              editable={isEditable}
                            />
                            {fmrNoError !== '' && (
                              <Text style={styles.error}>{fmrNoError}</Text>
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
                              Date
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              widht: '100%',
                              marginTop: 2,
                              marginLeft: 30,
                            }}>
                            <Text style={{color: 'black'}}>{date1}</Text>
                          </View>
                          <TouchableOpacity
                            disabled={!isEditable}
                            onPress={showDatePicker}>
                            <Icon name="calendar" size={30} color="blue" />
                          </TouchableOpacity>
                          <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            value={date1}
                            editable={isEditable}
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
                                  setDiscrepancyfindingsRemarks(
                                    text.slice(0, 255),
                                  );
                                } else setDiscrepancyfindingsRemarksError('');
                              }}
                              placeholder={'Any Comments (If Required) '}
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setPowerKENo(text);
                                  if (validate(text, 10)) {
                                    setPowerKENoError(
                                      'Input must be at least 10 characters long.',
                                    );
                                    setPowerKENo(text.slice(0, 10));
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setPowerMeterMake(text);
                                  if (validate(text, 10)) {
                                    setPowerMeterMakeError(
                                      'Input must be at least 10 characters long.',
                                    );
                                    setPowerMeterMake(text.slice(0, 10));
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setPowerMC(text);
                                  if (validate(text, 4)) {
                                    setPowerMCError(
                                      'Input must be at least 4 characters long.',
                                    );
                                    setPowerMC(text.slice(0, 4));
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
                                placeholder={'MDI/MDI-Off Reading'}
                                keyboardType={'numeric'}
                                placeholderTextColor="grey"
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setPowerMCSec(text);
                                  if (validate(text, 4)) {
                                    setPowerMCError(
                                      'Input must be at least 4 characters long.',
                                    );
                                    setPowerMCSec(text.slice(0, 4));
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
                                value={powerMCSec}
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
                                  setPowerMeterRemarks(text.slice(0, 255));
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
                              editable={isEditable}
                              style={{flex: 0.2, backgroundColor: 'white'}}
                              autoCapitalize="characters"
                              onChangeText={value => {
                                setPowerMeterReading(value);
                                if (validate(value, 10)) {
                                  setPowerMeterReadingError(
                                    'Input must be at least 10 characters long.',
                                  );
                                  setPowerMeterReading(value.slice(0, 10));
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setLightKENo(text);
                                  if (validate(text, 2)) {
                                    // NEED TO CHECK
                                    setAgedifferror(
                                      'Input must be at least 2 characters long.',
                                    );
                                    setLightKENo(text.slice(0, 2));
                                  } else setAgedifferror('');
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setLightMeterMake(text);
                                  if (validate(text, 2)) {
                                    setAgedifferror(
                                      'Input must be at least 2 characters long.',
                                    );
                                    setLightMeterMake(text.slice(0, 2));
                                  } else setAgedifferror('');
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setLightMC(text);
                                  if (validate(text, 2)) {
                                    setAgedifferror(
                                      'Input must be at least 2 characters long.',
                                    );
                                    setLightMC(text.slice(0, 2));
                                  } else setAgedifferror('');
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
                                autoCapitalize="characters"
                                onChangeText={text => {
                                  setLightMCSec(text);
                                  if (validate(text, 2)) {
                                    setAgedifferror(
                                      'Input must be at least 2 characters long.',
                                    );
                                    setLightMCSec(text.slice(0, 2));
                                  } else setAgedifferror('');
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
                                setLightMeterRemarks(text);
                                if (validate(text, 255)) {
                                  setAgedifferror(
                                    'Input must be at least 255 characters long.',
                                  );
                                  setLightMeterRemarks(text.slice(0, 255));
                                } else setAgedifferror('');
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
                              editable={isEditable}
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
                              autoCapitalize="characters"
                              onChangeText={value => {
                                setLightMeterReading(value);
                                if (validate(value, 2)) {
                                  setAgedifferror(
                                    'Input must be at least 2 characters long.',
                                  );
                                  setLightMeterReading(value.slice(0, 2));
                                } else setAgedifferror('');
                              }}
                              placeholder="Meter Reading"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}
                              value={lightmeterreading}
                              editable={isEditable}
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

          {/** 

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
          */}

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
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setConsumerName(text);
                                if (validate(text, 20)) {
                                  setConsumerNameError(
                                    'Input must be at least 20 characters long.',
                                  );
                                  setConsumerName(text.slice(0, 20));
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
                              maxLength={11}
                              placeholderTextColor="grey"
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setMobileNo(text);
                                if (validate(text, 11)) {
                                  setMobileNoError(
                                    'Input must be at least 11 characters long.',
                                  );
                                  setMobileNo(text.slice(0, 11));
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
                              autoCapitalize="characters"
                              onChangeText={text => {
                                setConsumerCNIC(text);
                                if (validate(text, 16)) {
                                  setConsumerCNICError(
                                    'Input must be at least 16 characters long.',
                                  );
                                  setConsumerCNIC(text.slice(0, 16));
                                } else setConsumerCNICError('');
                              }}
                              style={{
                                //height: 24,
                                width: '100%',
                                borderBottomWidth: 0.5,
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                color: 'black',
                              }}
                              value={consumerCNIC}
                              editable={isEditable}
                            />
                            {consumerCNICError !== '' && (
                              <Text style={styles.error}>
                                {consumerCNICError}
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
                                  setConsumerRemarks(text.slice(0, 255));
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
                    {/*  Take Signature Code Commented on 8 Aug 2023
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
*/}
                    {/*Consumer Signature END*/}
                    {/*Carousel Signature Start*/}
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
                        data={signatureImages}
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
                                  source={{
                                    uri: 'data:image/png;base64,' + item.uri,
                                  }}
                                  style={{height: 400, width: 200}}></Image>
                              </TouchableOpacity>
                              <TouchableOpacity
                                disabled={!isEditable}
                                onPress={() => {
                                  setTimeout(() => {
                                    // setRefresh(true);
                                    setImagedeletionLoader(true);
                                    //console.log("images", images);
                                    var arr = signatureImages;
                                    arr.splice(index, 1);
                                    // console.log(index)
                                    //console.log("index", index);
                                    //console.log("arr)", arr);
                                    setSignatureImages(arr);
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

                    {/*Carousel Signature END*/}
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
                    NetInfo.fetch().then(state => {
                      if (state.isConnected) {
                        console.log(' **** You are online! ******** ');
                        //PostSIRSimultaneous(state.type);
                        PostSIRImage(state.type);
                        setIsEditable(false);
                      } else {
                        Alert.alert('You are offline!');
                        return;
                      }
                    });
                  } else if (buttonType == 'Save') {
                    StoreInDevice('Save', false, '', '', '', '', '', '');
                  }

                  /* Saad Commented on 12-Jan-2023
                  var lightmeterdetailfill = [];
                  var powermeterdetailfill = [];
                  
                  lightmeterdetail.map((l, i) => {
                    if (l.AMP != '' || l.VOLT != '' || l.PF != '') {
                      setIslightmeterdetail('Y');
                      // updateLAmp(l.AMP, i);
                      lightmeterdetailfill = [
                        {
                          CurrentType: l.CurrentType,
                          AMP: l.AMP,
                          VOLT: l.VOLT,
                          PF: l.PF,
                        },
                        ...lightmeterdetailfill,
                      ];
                    }
                  });
                  console.log('lightmeterdetailfill', lightmeterdetailfill);
                  //setLightmeterdetail(lightmeterdetailfill);

                  powermeterdetail.map((l, i) => {
                    if (l.AMP != '' || l.VOLT != '' || l.PF != '') {
                      setIspowermeterdetail('Y');

                      powermeterdetailfill = [
                        {
                          CurrentType: l.CurrentType,
                          AMP: l.AMP,
                          VOLT: l.VOLT,
                          PF: l.PF,
                        },
                        ...powermeterdetailfill,
                      ];
                    }
                  });

                  Saad Commented on 12-Jan-2023 */
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

export default ApiScreenB40;

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
