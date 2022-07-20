/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  //AsyncStorage,
  Switch,
  Image, ImageBackground,
  Picker,
  ScrollView, 
  //CheckBox,
   SafeAreaView, 
  Platform,
  PermissionsAndroid,Pressable,  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
 const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import Collapsible from 'react-native-collapsible'; 
import openMap from 'react-native-open-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {FlatList} from 'react-native-gesture-handler';
import {useNetInfo, fetch, addEventListener} from "@react-native-community/netinfo";
import ImageViewer from 'react-native-image-zoom-viewer';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Moment from 'moment';
//import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
function renderRow() {
  return (
    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
      <View style={{flex: 1, alignSelf: 'stretch'}}>
        <Text>asd</Text>
      </View>{' '}
      {/* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
      <View style={{flex: 1, alignSelf: 'stretch'}} />
    </View>
  );
}
/*
var RadioButtonProject = createClass({
  getInitialState: function() {
    return {
      value: 0
    }
  }
  })
*/

function EditRecordDetails({ route,  navigation }) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
   const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
 
  
  const [error, setError] = useState('');
    
  
  
  const [temptableData, settemptableData] = useState([]);
  const [KEaccountnumber, setKEaccountnumber] = useState(route.params.data.KEaccountnumber1);
  const [contractnumberError, setcontractnumberError] = useState('');
  const [meternumberError, setmeternumberError] = useState('');  
  const [contractnumber, setcontractnumber] = useState(route.params.data.contractnumber1);
  
  const [dropdownRefresh, setDropdownRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [loadingindexerTextInput, setLoadingTextInput] = useState(false);
  
  const [keAccountError, setKeAccountError] = useState(false);
  
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [FilteredWbsData, setFilteredWbsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [User, setUser] = useState({});
  const [savedList, setsavedList] = useState([]);
  const [Password, setPassword] = useState('');
  const [SwitchDisabled, setSwitchDisabled] = useState(false);
  
  const [avatarSource, setavatarSource] = useState([]);

   let safetyV=route.params.data.safety;   
   if (safetyV=="YES"){safetyV=true}else{safetyV=false}

  let sarbulandiV=route.params.data.sarbulandi;   
  if (sarbulandiV=="YES"){sarbulandiV=true}else{sarbulandiV=false}
  
  let theftV=route.params.data.theft;   
  if (theftV=="YES"){theftV=true}else{theftV=false}

 let NCV=route.params.data.NewConnection_Conversion;   
 if (NCV=="YES"){NCV=true}else{NCV=false}
 
  
 let azadiV=route.params.data.azadi;   
 if (azadiV=="YES"){azadiV=true}else{azadiV=false}

 let ParkRenovationV=route.params.data.ParkRenovation;   
 if (ParkRenovationV=="YES"){ParkRenovationV=true}else{ParkRenovationV=false}
 
 let DispensaryRenovationV=route.params.data.DispensaryRenovation;   
 if (DispensaryRenovationV=="YES"){DispensaryRenovationV=true}else{DispensaryRenovationV=false}
  
 let SchoolRenovationV=route.params.data.SchoolRenovation;   
 if (SchoolRenovationV=="YES"){SchoolRenovationV=true}else{SchoolRenovationV=false}


 let DrinkingWaterV=route.params.data.DrinkingWater;   
 if (DrinkingWaterV=="YES"){DrinkingWaterV=true}else{DrinkingWaterV=false}
  
 let GarbageCleaningV=route.params.data.GarbageCleaning;   
 if (GarbageCleaningV=="YES"){GarbageCleaningV=true}else{GarbageCleaningV=false}



 let OverBillingV=route.params.data.OverBilling;   
 if (OverBillingV=="YES"){OverBillingV=true}else{OverBillingV=false}


 let PendingConnectionV=route.params.data.PendingConnection;   
 if (PendingConnectionV=="YES"){PendingConnectionV=true}else{PendingConnectionV=false}
  
 let ReferredIBCV=route.params.data.ReferredIBC;   
 if (ReferredIBCV=="YES"){ReferredIBCV=true}else{ReferredIBCV=false}

 let DisconnectionV=route.params.data.Disconnection;   
 if (DisconnectionV=="YES"){DisconnectionV=true}else{DisconnectionV=false}

 




  const [safety, setsafety] = useState(safetyV);
  const [sarbulandi, setsarbulandi] = useState(sarbulandiV);
  const [theft, settheft] = useState(theftV);
  const [azadi, setazadi] = useState(azadiV);
  const [NewConnection_Conversion, setNewConnection_Conversion] = useState(NCV);
 
  const [ParkRenovation, setParkRenovation] = useState(ParkRenovationV);
  const [DispensaryRenovation, setDispensaryRenovation] = useState(DispensaryRenovationV);
  const [SchoolRenovation, setSchoolRenovation] = useState(SchoolRenovationV);
  const [DrinkingWater, setDrinkingWater] = useState(DrinkingWaterV);
  const [GarbageCleaning, setGarbageCleaning] = useState(GarbageCleaningV);
  const [AnyOther, setAnyOther] = useState(route.params.data.AnyOther);


   


  const [OverBilling, setOverBilling] = useState(OverBillingV);
  const [Disconnection, setDisconnection] = useState(DisconnectionV);
  const [PendingConnection, setPendingConnection] = useState(PendingConnectionV);
  const [Anycomment, setAnycomment] = useState(route.params.data.Anycomment);

  const [SafateyHazard,setSafateyHazard] = useState( ); 
  
  const [ReferredIBC, setReferredIBC] = useState(ReferredIBCV);
  const [Remarks, setRemarks] = useState(route.params.data.Remarks);
  
  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']]; setUser
  const [selectedtype, setselectedtype] = useState(1);
  const [ActionType, setActionType] = useState("Offline Record");
  
  const [ConsumerName, setConsumerName] = useState(route.params.data.ConsumerName1);
  const [CNIC, setCNIC] = useState(route.params.data.CNIC1);
  const [Contact, setContact] = useState(route.params.data.Contact1);
  const [CompleteAddress, setCompleteAddress] = useState(route.params.data.CompleteAddress1);
  const [consumertype, setconsumertype] = useState(false);
  
  const [NMeter, setNMeter] = useState(route.params.data.NMeter1);
  const [HookNo, setHookNo]= useState(route.params.data.HookPlateNo);
  const [filterkey, setfilterkey]= useState(route.params.data.filterkey);

  const [LoginDate, setLoginDate]= useState(route.params.data.LoginDate);

  const [ActionType1, setActionType1]= useState(route.params.data.ActionType1);
  const [UserID, setUserID]= useState(route.params.data.UserID);

  const [longitude1, setlongitude1]= useState(route.params.data.longitude1);
  const [latitude1, setlatitude1]= useState(route.params.data.latitude1);

  
//console.log("route.params.data.safetyhazardsid",route.params.data.safetyhazardsid);
const [images, setImages] = useState( []);
 
let safetyhazardsidV=  route.params.data.safetyhazardsid ; 
let safetyhazardsidV1=safetyhazardsidV;

const [safetyhazarddataV, setsafetyhazarddataV]= useState(route.params.data.safetyhazardsid );

  const onTouchThumbnail = touched => {
   if (touched === indexSelected) return;
   carouselRef?.current?.snapToItem(touched);
 };
 
 const { width } = Dimensions.get('window');
 const [imageview,setimageview]= useState(false);
 const [indexer1,setindexer1]= useState(0);
  
 const [refresh, setRefresh] = useState(false);
 const [collapsed, setCollapsed] = useState(true);
 const [collapsed1, setCollapsed1] = useState(true);
 
 const [collapsed2, setCollapsed2] = useState(true);
 const [collapsed3, setCollapsed3] = useState(true);
 const [multipleSelect, setMultipleSelect] = useState(false);
 
  const [safetyhazarddata, setsafetyhazarddata] = useState([
  
    {id:0, value: 'Damaged panels',name:  'Damaged panels' },
    {id:1, value: 'Circuit breakers', name:  'Circuit breakers'},
    {id:2, value: 'Portable cords', name: 'Portable cords'},
    {id:3, value: 'Plugs', name:  'Plugs'},
    {id:4, value: 'Electrical fittings', name: 'Electrical fittings'},
  
  
    {id:5, value: 'power bars', name:  'power bars'},
    {id:6, value: 'extension cords', name: 'extension cords'},
    {id:7, value: 'Placing of halogen lights near cloths or curtains', name: 'Placing of halogen lights near cloths or curtains'},
    {id:8, value: 'Exposed wiring of outlets and cords', name: 'Exposed wiring of outlets and cords'},
    {id:9, value: 'Faulty wiring', name:  'Faulty wiring'},
  
    {id:10, value: 'Unsafe use of electrical appliances', name:  'Unsafe use of electrical appliances'},
    {id:11, value: 'Illegal hook connections', name: 'Illegal hook connections' },
    {id:12, value: 'Unwarranted placement of TV and Internet cables on electricity poles',name:  'Unwarranted placement of TV and Internet cables on electricity poles' },
    {id:13, value: 'HT Line or PMT adjacent to residence',name: 'HT Line or PMT adjacent to residence' }]
    );	


   
    const [safetyhazarddropdown, setsafetyhazarddropdown] = useState([]);
   /// setsafetyhazarddropdown([route.params.data.safetyhazards]);
 const toggleExpanded = () => {
   //Toggling the state of single Collapsible
   console.log(collapsed);
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


 const element = (data, index, navigation) => (
    <TouchableOpacity
      onPress={() => {
        navigation();
      }}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Open</Text>
      </View>
    </TouchableOpacity>
  );

  const showLocation = (latitude1, longitude1) => {
  const loaction11 = { latitude: longitude1, longitude: latitude1 };
 
    openMap({ ...loaction11  }); //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'
    
  }
  const [IsConnected, setIsConnected] = useState();

  const [netInfo1, setNetInfo1] = useState('');  
  
  var radio_props = [
    {label: 'Owner', value: 0},
    {label: 'Tenant', value: 1}
  ];

var Consumertype1V=route.params.data.Consumertype1;

if (Consumertype1V=="Owner"){
  Consumertype1V=0;

}
else{
  Consumertype1V=1;
}
console.log(Consumertype1V);
const [vradio_props, setvradio_props] = useState(Consumertype1V);
  const [Consumertype, setConsumertype] = useState();

  //setradioV(Consumertype1V);

  const [isLiked, setIsLiked] = useState([
    { id: 1, value: true, name: "Owner", selected: true },
    { id: 2, value: false, name: "Tenant", selected: false }    
]);

//setIsLiked(2);
  const onRadioBtnClick = (item) => {
    let updatedState = isLiked.map((isLikedItem) =>
      isLikedItem.id === item.id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    
    setselectedtype(item.id);
    setIsLiked(updatedState);
 
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

  var netInfo = useNetInfo(); 

  const response = fetch().then(state => {
  setIsConnected(state.isConnected);
  });
 
const radiolocalset=(consumerTypeV) =>{
  console.log("consumerTypeVNew", consumerTypeV); 
console.log("isLiked", isLiked);
  isLiked.map((consumerTypeV) =>
   
consumerTypeV === item.name
      ? { ...consumerTypeV, selected: true }
      : { ...consumerTypeV, selected: false }

    
  );


};

function UpdateRecord ()  {


  setError('');
                 
  if (KEaccountnumber=='' && contractnumber=='' && HookNo=='' && NMeter=='') {
    
    setError('Please enter values');
    setModalVisible(true);  
    return false 
  } 
  else 
  {

  if (meternumberError==true){
    setError('Invalid Meter Number');
    setModalVisible(true);  
    return false
  } 
  if (KEaccountnumber.length >0 ) {
           
    if ( contractnumber.length>0){
   
     
    if (contractnumber.length<8)
    {     
      setError('Contract Number must be 8 digits');
      setModalVisible(true);                 
      return false             
      
    }
    if (KEaccountnumber.length<12)
    {  
      setError('Account Number must be 12 digits');
      setModalVisible(true);                 
      return false
    }

  if (KEaccountnumber.charAt(0)!='4')
  {
    
    setError('Invalid Account Number');
    setModalVisible(true);
    return false
     
  } 
  if (contractnumber.charAt(0)!='3')
  {
    setError('Invalid Contract Number');
    setModalVisible(true);
    return 
  } 
}
  else{                      
    setError('Enter Contract Number');
    return 
    } 

  }
}



                if (CNIC.length>0  && CNIC.length<13) {                  
                           
                  setError('Invalid CNIC Number'); 
                  setModalVisible(true);
                  return 
                }
                if (Contact.length>0 && Contact.length<11) {   
                 
                   
                  setError('Invalid Contact Number');
                  setModalVisible(true);
                  return 
                }
               
                
                  if (ConsumerName.length==0) {
                    setError('Enter Consumer Name');  
                    setModalVisible(true);
                     return         
                  }
                   


 


  AsyncStorage.getItem('RoshniBajiA')
  .then(items => {
    // alert(JSON.stringify(items))

    let data = JSON.parse(items);
    let index=route.params.index;
    console.log(ConsumerName);

    console.log(index);
    console.log(route.params.index);
 

  //  data.filter((item, index)  => {
   //   if (item.filterkey==route.params.otherParam   && item.Status == 'Pending')
   //   {

    
                let hazards=safetyhazarddropdown.name;
                console.log("hazards", safetyhazarddropdown.name);

                console.log("route.params.index", route.params.index);

                //var CompleteAddress= CompleteAddress
                   var vAddress=CompleteAddress.replace('#', '');
                   vAddress=vAddress.trim();
                
                    data[index].KEaccountnumber1 = KEaccountnumber;
                    data[index].contractnumber1 = contractnumber;
                    data[index].ConsumerName1 = ConsumerName;
                    data[index].CNIC1 = CNIC;
                    data[index].Contact1 = Contact;
                  //  data[index].CompleteAddress1 = CompleteAddress;
                    data[index].CompleteAddress1 = vAddress;
                    data[index].NMeter1 = NMeter;
                    data[index].HookPlateNo = HookNo;
                    data[index].safety = safety == true ? "YES" : "NO";
                    data[index].sarbulandi = sarbulandi== true ? "YES" : "NO";


                    data[index].azadi = azadi == true ? "YES" : "NO";
                    data[index].NewConnection_Conversion = NewConnection_Conversion == true ? "YES" : "NO";
                    data[index].theft = theft == true ? "YES" : "NO";
                    data[index].ParkRenovation = ParkRenovation == true ? "YES" : "NO";
                    data[index].DispensaryRenovation = DispensaryRenovation == true ? "YES" : "NO";
                    data[index].SchoolRenovation = SchoolRenovation == true ? "YES" : "NO";

                    data[index].DrinkingWater = DrinkingWater == true ? "YES" : "NO";
                    data[index].GarbageCleaning = GarbageCleaning == true ? "YES" : "NO";
                    data[index].AnyOther = AnyOther;
                    data[index].OverBilling = OverBilling == true ? "YES" : "NO";
                    data[index].Disconnection = Disconnection == true ? "YES" : "NO";
                    data[index].PendingConnection = PendingConnection == true ? "YES" : "NO";


                    data[index].Anycomment = Anycomment;
                    data[index].ReferredIBC = ReferredIBC == true ? "YES" : "NO";
                    data[index].Remarks = Remarks;
                    data[index].safetyhazards=hazards==''?  route.params.data.safetyhazards : safetyhazarddropdown.name;
                    data[index].safetyhazardsid=hazards==''? route.params.data.safetyhazardsid : safetyhazarddropdown.id;
                    data[index].Consumertype1 = Consumertype;
                    data[index].SDate = Moment(Date.now()).format('YYYY-MM-DD');
                



     // }
   // })

                   // data[route.params.index].RoshniBajiWebID = resp.surveyID;
                   // console.log("data[route.params.index].Status",data[route.params.index].Status);
                   // console.log("data[route.params.index].Status", data[route.params.index].RoshniBajiWebID);

                     AsyncStorage.setItem('RoshniBajiA', JSON.stringify(data));

                  })
                  setSuccessModalVisible(!isSuccessModalVisible);
                  setError('');
 
return true;

}


  useEffect(() => {
  setLoader(true);
 
 
 
 
console.log("route.params.index", route.params.index);
 
 
let Postingdata = route.params.data;

 

 
  //console.log("consumerTypeV", consumerTypeV);
  let detail = route.params.data.safetyhazards;
  
  
  //setIsLiked(consumerTypeV);
//radiolocalset(consumerTypeV);
 /* isLiked.map((consumerTypeV) =>
    console.log(consumerTypeV)
  consumerTypeV === item.name
        ? { ...consumerTypeV, selected: true }
        : { ...consumerTypeV, selected: false }

      
    );
*/

     AsyncStorage.getItem('RoshniBajiimages').then(items => {
      var data=[];
      let Allimages = [];
      data = items ? JSON.parse(items) : {};

     // console.log("data", data);
     //  console.log("route.params.otherParam", route.params.otherParam)
      data.filter(item => {
        if (item.filterkey==route.params.otherParam)
        {
          var Allimages1=images;          
         // console.log("item.uri", item.uri);
          Allimages.push({ 
             uri : item.uri, 
             url: item.url
           }) 
        }
       // console.log(images.length);
      });
     // console.log("Allimages1", Allimages);
      setImages(Allimages);   
    });
   
    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data=[];
      data = items ? JSON.parse(items) : {};

      
      settemptableData(data);
      setLoader(false);
console.log("data", data);
       let data1 = data.filter(x => x.Status == 'Pending' && x.filterkey==route.params.otherParam);
     
     //  console.log("route.params.otherParam" ,  route.params.otherParam);
     //  console.log("x.filterkey" ,  data1.filterkey);
     //  console.log("data1", data1);
     ///  console.log("route.params.data.filterkey" ,   route.params.data.filterkey);

     console.log("route.params.data.UserID" ,   route.params.data.UserID);
     
       settemptableData(data1);
      settableData(data1);

    /*  data.filter(item => {
        if (item.filterkey==route.params.otherParam)
        {


          settableData([item]);
         }
      }); 
    */
   });


   //console.log(tableData[route.params.index].KEaccountnumber);
   
  
  }, []); 
   
  
    
return (
          <View style={styles.container}>
          {loader ? (
          <ActivityIndicator />
          ) : (
               <View style={{flex: 1, width: '100%'}}>
               <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.container}>
          
        
                    {/*   <FlatList
                      style={{flex: 1, width: '100%'}}
                      data = {(tableData.length)>0 ? tableData : 0 }
                      //data.splice(index, 1);0
                      extraData={tableData}
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
                            {tableData ? (
                              tableData.length > 0 ? (
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
                    */ }
          
            

            
               
                 
                  


                  <View style={{flex: 1 }}>
               
                   

                  <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Raise By </Text>
                  </View>
                  <View style={{ flex: 0.5    }}>
                   <Text style={{  color:'black'  }}>  {UserID}</Text>
                    
                   
                  
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
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Raise On </Text>
                  </View>
                  <View style={{ flex: 0.5 ,color:'black'}}>
                
                    <Text  style={{  color:'black'  }}>{LoginDate}</Text>
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
                    height: 1,
                    //marginVertical: 10,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Action Type </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                
                    <Text  style={{  color:'black'  }}>{ActionType1}</Text>
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
                    marginTop: 10,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>KE Account Number  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>

                  

                    <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                     keyboardType={'numeric'}
                     //KEaccountnumber={tableData[index].KEaccountnumber}
                     maxLength={12}
                   
                    value={KEaccountnumber}
                     placeholder={'Enter Account Number'}
                     placeholderTextColor='grey'
                     onFocus={()=>setKeAccountError(false)}
                     onChangeText={text => {if(text.length<12){
                      setKeAccountError(true);
                   }
                   else{
                    setKeAccountError(false);
        
                   }
                   setKEaccountnumber((text))}
                        }
                     />
                      {keAccountError?
                       <Text style={{marginBottom: 25,color:'red'}}>Account Number must be 12 digits</Text>:<Text></Text>}





                  </View>

                </View>
 
                <View
                  style={{
                    height: 1,
                    
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Contract Number </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                     keyboardType={'numeric'}
                     maxLength={8}
                     //value={contractnumber1}
                     placeholder={'Enter Contract Number'}
                     placeholderTextColor='grey'
                     value={contractnumber}
                     onFocus={()=>setcontractnumberError(false)}
                     onChangeText={text => {if(text.length<8){
                       setcontractnumberError(true);
                     }
                     else{
                       setcontractnumberError(false);
          
                     }
                     setcontractnumber((text))}
                          } />
                    {contractnumberError?
                    <Text style={{marginBottom: 50,color:'red'}}>Contract Number must be 8 digits</Text>:<Text></Text>}

                  </View>

                </View>
                <View
                  style={{
                    height: 1,
                    //marginVertical: 10,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>
                <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Consumer Name </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                   
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                    placeholder={'Enter Cosumer Name'}
                    placeholderTextColor='grey'
                    value={ConsumerName}
                    onChangeText={(text) => { setConsumerName(text) }} />
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
                    marginTop: 10,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>CNIC #  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>

                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                    placeholder={'Enter CNIC #'}
                    keyboardType={'numeric'}
                    placeholderTextColor='grey'
                    // KEaccountnumber={KEaccountnumber}
                    maxLength={13}
                    value={CNIC}
                    onChangeText={(text) => { setCNIC(text) }} />
 
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
                    marginTop: 10,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Contact #  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                       keyboardType={'numeric'}
                       // KEaccountnumber={KEaccountnumber}
                       maxLength={11}
                       placeholder={'Enter Contact #'}
                      placeholderTextColor='grey'
                      value={Contact}
                       onChangeText={(text) => { setContact(text) }} />
                    
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
                    marginTop: 10,
                  }}>


                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' ,color:'#5d2d91'}}>Complete Address  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                     placeholder={'Enter Complete Address'}
                     placeholderTextColor='grey'
                     value={CompleteAddress}
                    onChangeText={(text) => { setCompleteAddress(text) }} />
                    
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
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Consumer type </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                 {/* {isLiked.map((item) => (
                <RadioButton
                value={false}
                  onPress={() => onRadioBtnClick(item)}
                  selected={item.selected}
                  key={item.id}
              labelStyle={{  paddingLeft: 5}}
                >
                  {item.name}
                
                </RadioButton>
                ))}
                  */}

                <RadioForm
                  radio_props={radio_props}
                  initial={vradio_props}
                  buttonColor={'#5d2d91'}
                  //formHorizontal={true}
                // borderWidth={5}
                  buttonInnerColor={'#5d2d91'}
                  selectedButtonColor={'#5d2d91'}
                  
                // labelColor={'#50C900'}
                  
                  borderWidth={1}
                //  buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                  buttonSize={13}
                  buttonOuterSize={22}
                  //buttonStyle={{backgroundColor:'#5d2d91',borderWidth:10}}
                  buttonWrapStyle={{marginLeft: 10}}
                  onPress={(value) => {
                  
                    ({value:value})
                    if (value==0){
                      setConsumertype("Owner")
                    }
                    else{
                    setConsumertype("Tenant")
                    }
                  }
                  
                  }
                />




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
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' ,color:'#5d2d91'}}>Meter # </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>

                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                    maxLength={10}
                    placeholder={'Enter Meter # '}
                    placeholderTextColor='grey'
                    value={NMeter}
                    onFocus={()=>setmeternumberError(false)}                  
                    onChangeText = { (text) => {
                      if (text.length!=0)
                      {
                        var specials=/[*|\":<>[\]{}`\\()';@&$#!%*+=;'<>?/`~_]/;

                        if (specials.test(text))
                        {
                          setmeternumberError(true)
                         // alert(text.nativeEvent.key);


                        //alert("error");
                      
                      }
                      else{setmeternumberError(false)}
                    } 

                      
                      setNMeter(text);
                      
                        
                      }}/>
                      {meternumberError?
                      <Text style={{marginBottom: 50,color:'red'}}>Invalid Meter Number</Text>:<Text></Text>}
                    
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
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal' ,color:'#5d2d91'}}>Hook Plate No # </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                     placeholder={'Enter Hook Plate No #'}
                     placeholderTextColor='grey'
                     value={HookNo}
                    onChangeText={(text) => { setHookNo(text) }} />
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
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Longitude   </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text  style={{  color:'black'  }}>{latitude1}</Text>
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
                    marginTop: 10,
                  }}>
                  <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>Latitude   </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text  style={{  color:'black'  }}>{longitude1}</Text>
                  </View>

                </View>
                
                 
 

            <TouchableOpacity onPress={toggleExpanded}>

              <View
                style={{
                  height: 40,
                  width: '100%',
                 // marginLeft:20,
                  backgroundColor: '#5d2d91',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white',marginLeft:10 }}>
                  Awareness/Advocacy
                   </Text>

              </View>
            </TouchableOpacity>

            <Collapsible collapsed={collapsed}  style={{borderBottomWidth:1}} >
              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal',color:'rgba(93,45,145,255)' }}>
                    Safety{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                  <View style={{ flex: 0.5 }}>
                  <Switch 
                   trackColor={{true: 'grey', false: 'grey'}} 
                   thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                   
                    // disabled={this.state.SwitchDisabled}
                    value={safety}
                    onValueChange={() => {
                      setsafety(!safety)
                    }}></Switch>
                  </View>
                </View>
             
             
              </View>
              <View
                style={{
                  height: 1,
                  marginVertical: 14,
                  width: '100%',marginLeft:1,
                  backgroundColor: 'black',
                }}></View>

              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal',color:'rgba(93,45,145,255)' }}>
                    Sarbulandi{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={sarbulandi}
                    onValueChange={() => {
                      setsarbulandi(!sarbulandi)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Azadi{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={azadi}
                    onValueChange={() => {
                      setazadi(!azadi)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    New Connection/Conversion{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={NewConnection_Conversion}
                    onValueChange={() => {
                      setNewConnection_Conversion(!NewConnection_Conversion)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Theft{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={theft}
                    onValueChange={() => {
                      settheft(!theft)
                    }}></Switch>
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
                  backgroundColor: '#5d2d91',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white' ,marginLeft:10 }}>
                  Development
               </Text>

              </View>

             </TouchableOpacity>

             <Collapsible collapsed={collapsed1}  style={{borderBottomWidth:2}}>
              <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' ,color:'#5d2d91'}}>
                    Park Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={ParkRenovation}
                    onValueChange={() => {
                      setParkRenovation(!ParkRenovation)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal'  ,color:'#5d2d91'}}>
                    Dispensary Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                  <Switch
                   trackColor={{true: 'grey', false: 'grey'}} 
                   thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={DispensaryRenovation}
                    onValueChange={() => {
                      setDispensaryRenovation(!DispensaryRenovation)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal' ,color:'#5d2d91' }}>
                    School Renovation{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={SchoolRenovation}
                    onValueChange={() => {
                      setSchoolRenovation(!SchoolRenovation)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Drinking Water{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={DrinkingWater}
                    onValueChange={() => {
                      setDrinkingWater(!DrinkingWater)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal' ,color:'#5d2d91'}}>
                    Garbage Cleaning{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={GarbageCleaning}
                    onValueChange={() => {
                      setGarbageCleaning(!GarbageCleaning)
                    }}></Switch>
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


              <View style={{ flexDirection: 'row', flex: 1, width: '50%',marginBottom:50 }}>
                 
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                   
                 <TextInput 
                   style={{ color: 'black', height: 50, width: '50%' }} placeholder={'please specify'}
                   
                    placeholderTextColor='black'
                    value={AnyOther}
                   
                   onChangeText={(text) => {  setAnyOther(text) }}></TextInput>
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
                  backgroundColor: '#5d2d91',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white' ,marginLeft:10 }}>
                  Complaints
              </Text>


              </View>

             </TouchableOpacity>

             <Collapsible collapsed={collapsed2}  style={{borderBottomWidth:1}}>



              <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Over Billing{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                   trackColor={{true: 'grey', false: 'grey'}} 
                   thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={OverBilling}
                    onValueChange={() => {
                      setOverBilling(!OverBilling)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Disconnection {' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                  <Switch
                  trackColor={{true: 'grey', false: 'grey'}} 
                  thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                   
                    value={Disconnection}
                    onValueChange={() => {
                      setDisconnection(!Disconnection)
                    }}></Switch>
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
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Pending Connection{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={PendingConnection}
                    onValueChange={() => {
                      setPendingConnection(!PendingConnection)
                    }}></Switch>
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

              <View style={{ flexDirection: 'row', flex: 1, width: '96%',marginBottom:75 }}>
               
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                  <View style={{ flex: 0.5 }}>
                     
                <TextInput
                multiline={true}
                placeholder={'please specify'}
                placeholderTextColor='black'
                value={Anycomment}

                onChangeText={(text) => { setAnycomment(text) }}
                style={{
                  height: 100,
                   width: 380,
                  borderWidth: 0.75,
                  textAlign: 'left',
                  textAlignVertical: 'top',
                  color:'black'
                }}>

                  
                </TextInput>
                  </View>
                </View>
              </View>
            
             </Collapsible>
           
             <TouchableOpacity onPress={toggleExpanded3}>

              <View
                style={{
                  height: 30,
                  width: '100%',
                  backgroundColor: '#5d2d91',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white' ,marginLeft:10 }}>
                  Referral
              </Text>

              </View>

             </TouchableOpacity>

             <Collapsible collapsed={collapsed3}  style={{borderBottomWidth:1}}>

              <View style={{ flexDirection: 'row', flex: 1, width: '50%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal',color:'#5d2d91' }}>
                    Referred IBC{' '}
                  </Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                  <View style={{ flex: 0.5 }}>
                  <Switch
                    trackColor={{true: 'grey', false: 'grey'}} 
                    thumbColor={[ (item.status ?'#7ab8e1':'rgba(192,144,194,255)')]}
                    value={ReferredIBC}
                    onValueChange={() => {
                      setReferredIBC(!ReferredIBC)
                    }}></Switch>
                  </View>

                </View>
              </View>
             </Collapsible>


             <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
                    Safety Hazard{' '}
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

                  <View style={{ flex: 0.5 }}>
                  <SearchableDropdown
                  onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                   // console.log("item", item);
                    setsafetyhazarddropdown(item);
                  }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                  selectedItems={safetyhazarddropdown}
                  multi={false}
                  containerStyle={{padding: 5}}
                  itemStyle={{
                    padding: 3,
                    marginTop: 2,
                    height:25,
                    width:187,
                    backgroundColor: '#ddd',
                    borderColor: 'black',
                    borderWidth: 0.8,
                    // borderRadius: 5,
                  }}
                  itemTextStyle={{color: 'black', fontSize: 14}}
                  itemsContainerStyle={{maxHeight: 80}}
                  items= {safetyhazarddata}
                //  setSort={(item, searchedText)=> item.value.toLowerCase().startsWith(searchedText.toLowerCase())}
                  defaultIndex= {safetyhazarddataV} // "'" + safetyhazarddataV + "'"
                  resetValue={false}
                   textInputProps={{
                    placeholder: 'Select Safety Hazard',
                    underlineColorAndroid: 'transparent',
                    placeholderTextColor:'grey',
                    //height:150,
                    style: {
                    // padding: 12,
                    width:187,
                      borderWidth: 0.8,
                      height:50,
                      color:'black',
                      
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
                     
                    
                  </View>
             </View></View>

            
             

            
                  
                    

                     
                      

             <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'normal' }}>
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

                  <View style={{ flex: 0.5 }}>
                  <TextInput
                      multiline={true}
                      value={Remarks}
                      onChangeText={(text) => { setRemarks(text) }}
                      placeholder={'Any comment (if required)'}
                      placeholderTextColor='black'

                      style={{
                        height: 150,
                        width: '100%',
                        borderWidth: 0.75,
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        color:'black'
                      }}>



                      </TextInput>
                  </View>
                     
                    
                  </View>
             </View></View>




            
                    
        
                      
                  </View>
               
              </ScrollView>
              </View>
            )}
            
           

        
        
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


       <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
           // console.log('Posting Pressed');
            
           console.log("IsConnected Ali", IsConnected);

            if (IsConnected==false)
            {
              setError('Network connectivity issue')
              setModalVisible(true);
              return;
              
            }
            else{
              console.log('connect API');

              UpdateRecord(
              () => {
                KEaccountnumber,
                contractnumber,
                ConsumerName,
                CNIC,
                Contact,
                NMeter,
                HookNo
              },
              KEaccountnumber,
              contractnumber,
              ConsumerName,
              CNIC,
              Contact,
              NMeter,
              HookNo,
              
              
              () => {
                return setLoader(false);

              },
            );
           
            }
            
          }}>
          {loader ? (
            <ActivityIndicator size="large" color="#FFFFFF" ></ActivityIndicator>
          ) : (
            <Text style={{ color: 'white', fontSize: 18 }}>Updated</Text>
          
            )} 

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
          <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
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
              //navigation.goBack();
              // }, 1000);
            
            
             /* navigation.reset({
                index: 0,
                routes: [{name: 'Menu'}],
              });*/
              navigation.goBack(); 
            }}
          />
        </View>
       </Modal>
        
          </TouchableOpacity>
       
       </View>
      );    
  }
 
const styles = StyleSheet.create({
 // container: {flex: 1, width: '100%', backgroundColor: '#fff'},
  //containerscr4: { flex: 1, padding: 1, paddingTop: 2, backgroundColor: '#fff' },
  //head: {height: 40, backgroundColor: '#f1f8ff'},
  //text: {margin: 6},
  //row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},

  container: { flex: 1, padding: 2, paddingTop: 5, backgroundColor: '#fff' },
  containerscr4: { flex: 1, padding: 1, paddingTop: 2, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, fontSize: 10 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
    color: '#465881',
    marginBottom: 40,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
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
    color: '#465881',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
   // width: 200,
    backgroundColor: '#f8931e',
    // borderRadius: 25,
    height: 35,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
     elevation: 4,
     shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 50,
    right: -1,
    bottom: 0,
   // borderBottomRightRadius: 15,

  },

  imageViewerStyle : {
    width: '100px',
    height: '100px' ,
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

});

export default EditRecordDetails;
