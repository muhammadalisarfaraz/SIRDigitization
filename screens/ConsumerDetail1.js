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
  AsyncStorage,
  Switch,
  Image,
  Picker,
  ScrollView,
  //CheckBox,
   SafeAreaView,
  Platform,
  PermissionsAndroid, Pressable, Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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

// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
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

function ConsumerDetail({ route,  navigation }) {
  const [name, setName] = useState('');
   
  const [load, setLoad] = useState(false);
  
  const [userPassword, setUserPassword] = useState('');
   
  const [loading, setLoading] = useState(false);
  const [reloadlist, setReloadList] = useState(false);
  const [selectedsub, setSelectedsub] = useState('');
  const [loader, setLoader] = useState(false);
  const [consumerDetailSceenLoader, setConsumerDetailSceenLoader] = useState(false);

  
  const [KEaccountnumber, setKEaccountnumber] = useState('');
  const [contractnumberError, setcontractnumberError] = useState('');



  const [contractnumber, setcontractnumber] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [dropdownRefresh, setDropdownRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [loadingindexerTextInput, setLoadingTextInput] = useState(false);
  const [error, setError] = useState('');
  const [keAccountError, setKeAccountError] = useState(false);

  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [User, setUser] = useState({});
  const [savedList, setsavedList] = useState([]);
  const [Password, setPassword] = useState('');
  const [SwitchDisabled, setSwitchDisabled] = useState(false);

  const [avatarSource, setavatarSource] = useState([]);
  const [safety, setsafety] = useState("");
  const [sarbulandi, setsarbulandi] = useState("");
  const [theft, settheft] = useState("");
  const [azadi, setazadi] = useState("");
  const [NewConnection_Conversion, setNewConnection_Conversion] = useState("");
  const [Awareness_Advocacy, setAwareness_Advocacy] = useState("");
  const [ParkRenovation, setParkRenovation] = useState("");
  const [DispensaryRenovation, setDispensaryRenovation] = useState("");
  const [SchoolRenovation, setSchoolRenovation] = useState("");
  const [DrinkingWater, setDrinkingWater] = useState("");
  const [GarbageCleaning, setGarbageCleaning] = useState("");
  const [AnyOther, setAnyOther] = useState('');








  const [OverBilling, setOverBilling] = useState("");
  const [Disconnection, setDisconnection] = useState("");
  const [PendingConnection, setPendingConnection] = useState("");
  const [Others, setOthers] = useState("");
  const [ReferredIBC, setReferredIBC] = useState("");
  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
 
  const [selectedtype, setselectedtype] = useState(1);
  const [ActionType, setActionType] = useState("Offline Record");

  const [ConsumerName, setConsumerName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [Contact, setContact] = useState("");
  const [CompleteAddress, setCompleteAddress] = useState("");
  const [consumertype, setconsumertype] = useState("");
  const [NCNIC, setNCNIC] = useState("");
  const [NContact, setNContact] = useState("");
  const [NCompleteAddress, setNCompleteAddress] = useState("");
  const [NConsumertype, setNConsumertype] = useState("");
  const [NConsumerName, setNConsumerName] = useState("");

  const [isLiked, setIsLiked] = useState( );
  const [selectedtype1, setselectedtype1] = useState("");
  var data2 = [];
  const [imageview, setimageview] = useState("");
  const [indexer1, setindexer1] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState("");
  
  const [isLiked1, setIsLiked1] = useState("");
  const [isSelected, setSelection] = useState("");
  const [NMeter, setNMeter] = useState("");
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
 
 
  


 

   



  useEffect(() => {
    
    
    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setUser(data);
    });


    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data1=[];
      data1 = items ? JSON.parse(items) : {};
      
   
      setsavedList(data1);
    });

 

 
  }, []);

 
 
 
 return (
  <View style={styles.container}>

          
 
<FlatList
          style={{flex: 1, width: '100%'}}
           data = {(savedList.length)>0 ? savedList : 0 }
          //data.splice(index, 1);0
          extraData={savedList}
          keyExtractor={item => item.id}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 20,
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {savedList ? (
                  savedList.length > 0 ? (
                    <View />
                  ) : (
                    <View />
                  )
                ) : (
                  <Text>No Record to Show</Text>
                )}
                
               
              </View>
            );
          }}
          

    renderItem={({item, index, separators}) => {

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
           
        <View style={styles.slide3}>

      

          <View style={{ width: '100%' }}>
     
            <ScrollView>

              

              <View
                style={{
                  // marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Raise By </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text> </Text>
                  </View>

                </View>
                
                <View
                  style={{
                    height: 1,
                    //marginVertical: 10,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Raise On </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                
                    <Text>{item.KEaccountnumber1}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>



                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>KE Account Number  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text>{KEaccountnumber}</Text>
                  </View>

                </View>
                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Contract Number </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text>{contractnumber}</Text>
                  </View>

                </View>
                <View
                  style={{
                    height: 1,
                    //marginVertical: 10,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Consumer Name </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text>{ConsumerName}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>



                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>CNIC #  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text>{CNIC}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>



                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Contact #  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text>{Contact}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>



                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Complete Address  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text>{CompleteAddress}</Text>
                  </View>
                </View>

                <View style={{
                  height: 1,  // marginVertical: 14,
                  width: '90%',
                  backgroundColor: 'black',
                }}></View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Consumer type </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text>{isSelected}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: '88%',
                    marginTop: 20,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' }}>Meter # </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text>{NMeter}</Text>
                  </View>

                </View>


              </View>
            </ScrollView>


            <ScrollView>

            




            <TouchableOpacity onPress={toggleExpanded}>

              <View
                style={{
                  height: 40,
                  width: '90%',
                  marginLeft:20,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#000000' }}>
                  Awareness/Advocacy
                   </Text>

              </View>
            </TouchableOpacity>

            <Collapsible collapsed={collapsed} align="center">
              <View style={{ flexDirection: 'row', flex: 1, width: '96%',marginLeft:20 }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Safety{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                  <View style={{ flex: 0.5 }}>
                    <Text>{safety}</Text>
                  </View>
                </View>
             
              <View
                style={{
                  height: 1,
                  marginVertical: 14,
                  width: '96%',marginLeft:20,
                  backgroundColor: 'black',
                }}></View>
              </View>

              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Sarbulandi{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{sarbulandi}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Azadi{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                    <Text>{azadi}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    New Connection/Conversion{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                    <Text>{NewConnection_Conversion}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Theft{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{theft}</Text>
                  </View>
                </View>
              </View>
            </Collapsible>
            <View style={styles.containerscr4}>
            </View>
            <TouchableOpacity onPress={toggleExpanded1}>

              <View
                style={{
                  height: 40,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#000000' }}>
                  Development
               </Text>

              </View>

            </TouchableOpacity>

            <Collapsible collapsed={collapsed1} align="center">
              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Park Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{ParkRenovation}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  marginVertical: 14,
                  width: '100%',
                  backgroundColor: 'black',
                }}></View>




              <        View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Dispensary Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                    <Text>{DispensaryRenovation}</Text>
                  </View>

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
                  <Text style={{ fontWeight: 'normal' }}>
                    School Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{SchoolRenovation}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Drinking Water{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{DrinkingWater}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Garbage Cleaning{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{GarbageCleaning}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Others{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{AnyOther}</Text>
                  </View>
                </View>
              </View>

            </Collapsible>
            <View style={styles.containerscr4}>
            </View>

            <TouchableOpacity onPress={toggleExpanded2}>


              <View
                style={{
                  height: 30,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#000000' }}>
                  Complaints
              </Text>


              </View>

            </TouchableOpacity>

            <Collapsible collapsed={collapsed2} align="center">



              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Over Billing{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{OverBilling}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Disconnection {' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                    <Text>{Disconnection}</Text>
                  </View>

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
                  <Text style={{ fontWeight: 'normal' }}>
                    Pending Connection{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{PendingConnection}</Text>
                  </View>
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
                  <Text style={{ fontWeight: 'normal' }}>
                    Any comment{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                    <Text>{PendingConnection}</Text>
                  </View>
                </View>
              </View>
            </Collapsible>
            <View style={styles.containerscr4}>
            </View>
            <TouchableOpacity onPress={toggleExpanded3}>

              <View
                style={{
                  height: 30,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: '#000000' }}>
                  Referral
              </Text>

              </View>

            </TouchableOpacity>

            <Collapsible collapsed={collapsed3} align="center">

              <View style={{ flexDirection: 'row', flex: 1, width: '50%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Referred IBC{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                    <Text>{ReferredIBC}</Text>
                  </View>

                </View>
              </View>
            </Collapsible>

            </ScrollView>



          </View>
        </View>
        
      </Swiper>


    </View>
  ); }}

  /> </View>
 )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  containerscr4: { flex: 1, padding: 1, paddingTop: 2, backgroundColor: '#fff' },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
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
    //flexDirection: 'row',
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
    fontSize: 16
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
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "black"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
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

export default ConsumerDetail;
