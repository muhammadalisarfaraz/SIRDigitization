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
import RNFetchBlob from 'rn-fetch-blob';
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

function SafetyHazardEditRecordDetails({ route,  navigation }) {
  const [name, setName] = useState('');
 
   const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
 
  const [temptableData, settemptableData] = useState([]);
 
  const [error, setError] = useState('');
 
  
 
  
  const [dropdownRefresh, setDropdownRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [loadingindexerTextInput, setLoadingTextInput] = useState(false);
 
  
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [FilteredWbsData, setFilteredWbsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
 
  const [User, setUser] = useState({});
   
  
  const [avatarSource, setavatarSource] = useState([]);

  


   


  

 
  
  const [AccidentLocationAddress, setAccidentLocationAddress] = useState(route.params.data.AccidentLocationAddress);
  const [PremiseConsumerNumber, setPremiseConsumerNumber] = useState(route.params.data.PremiseConsumerNumber);
  const [PMT, setPMT] = useState(route.params.data.PMT);
  const [ConsumerMobileNumber, setConsumerMobileNumber] = useState(route.params.data.ConsumerMobileNumber);
  const [Remarks, setRemarks] = useState(route.params.data.Remarks); 
 
   
 
  const [SDate, setSDate]= useState(route.params.data.SDate);

  
  const [UserID, setUserID]= useState(route.params.data.UserID);

  const [longitude1, setlongitude1]= useState(route.params.data.longitude1);
  const [latitude1, setlatitude1]= useState(route.params.data.latitude1);

  
//console.log("route.params.data.safetyhazardsid",route.params.data.safetyhazardsid);
const [images, setImages] = useState( []);
 
 

 

  const onTouchThumbnail = touched => {
   if (touched === indexSelected) return;
   carouselRef?.current?.snapToItem(touched);
 };
 
 const { width } = Dimensions.get('window');
 const [imageview,setimageview]= useState(false);
 const [indexer1,setindexer1]= useState(0);
  
 const [refresh, setRefresh] = useState(false);
 
 const [multipleSelect, setMultipleSelect] = useState(false);
 
   


    

  const showLocation = (latitude1, longitude1) => {
  const loaction11 = { latitude: longitude1, longitude: latitude1 };
 
    openMap({ ...loaction11  }); //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'
    
  }
  const [IsConnected, setIsConnected] = useState();

  const [netInfo1, setNetInfo1] = useState('');  
  
  
  

  //setradioV(Consumertype1V);

   
//setIsLiked(2);
  

  var netInfo = useNetInfo(); 

  const response = fetch().then(state => {
  setIsConnected(state.isConnected);
  });
 
 

function UpdateRecord ()  {


  setError('');
                 
   



               


 


  AsyncStorage.getItem('SafetyHazard')
  .then(items => {
    // alert(JSON.stringify(items))

    let data = JSON.parse(items);
    let index=route.params.index;
  
  
    
               
                
                    data[index].AccidentLocationAddress = AccidentLocationAddress;
                    data[index].PremiseConsumerNumber = PremiseConsumerNumber;
                    data[index].PMT = PMT;
                    data[index].ConsumerMobileNumber = ConsumerMobileNumber;
                    data[index].Remarks = Remarks;
                
                    
                    
                



     // }
   // })

                   // data[route.params.index].RoshniBajiWebID = resp.surveyID;
                   // console.log("data[route.params.index].Status",data[route.params.index].Status);
                   // console.log("data[route.params.index].Status", data[route.params.index].RoshniBajiWebID);

                     AsyncStorage.setItem('SafetyHazard', JSON.stringify(data));

                  })
                  setSuccessModalVisible(!isSuccessModalVisible);
                  setError('');
 
return true;

}


  useEffect(() => {
  setLoader(true);
 
 
 
 
console.log("route.params.index", route.params.index);
 
 
let Postingdata = route.params.data;

 

 
  
  
 

      
   
    AsyncStorage.getItem('SafetyHazard').then(items => {
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Raise By </Text>
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Raise On </Text>
                  </View>
                  <View style={{ flex: 0.5 ,color:'black'}}>
                
                    <Text  style={{  color:'black'  }}>{SDate}</Text>
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Accident Location Address  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>

                  

                    <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                     
                   
                    value={AccidentLocationAddress}
                    placeholder={'Enter Text'}
                    placeholderText={{ fontSize: 16, color: 'grey' }}
                    
                     onChangeText={text => {
                      setAccidentLocationAddress(text);
                    }}></TextInput>


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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Premise Consumer Number </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                      
                     //value={contractnumber1}
                     placeholder={'Enter Text'}
                     placeholderText={{ fontSize: 16, color: 'grey' }}
                     value={PremiseConsumerNumber}
                    
                     onChangeText={text => {
                      setPremiseConsumerNumber(text);
                    }}
                  />
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>PMT </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                   
                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                      placeholder={'Enter Text'}
                      value={PMT}
                      placeholderText={{ fontSize: 16, color: 'grey' }}
                      onChangeText={text => {
                        setPMT(text);
                      }}
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>  Consumer Mobile Number </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>

                  <TextInput style={{ color: 'black', height: 40, width: '100%' }}  
                    maxLength={11}
                    value={ConsumerMobileNumber}
                    keyboardType={'numeric'}
                    placeholder={'Enter Text'}
                    placeholderText={{ fontSize: 16, color: 'grey' }}
                    onChangeText={text => {
                      setConsumerMobileNumber(text);
                    }}
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}> Consumer Remarks  </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                  <TextInput
                  multiline={true}
                  value={Remarks}
                  placeholder={'Any comment (if required)'}
                  placeholderTextColor="black"
                  onChangeText={(text) => { setRemarks(text) }}
                  style={{
                    height: 150,
                    width: '86%',
                    borderWidth: 0.75,
                    textAlign: 'left',
                    textAlignVertical: 'top',
                    marginTop: 10,
                    color: 'black',
                  }}></TextInput>
                    
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Longitude   </Text>
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
                    <Text style={{ fontWeight: 'normal',color:'black' }}>Latitude   </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text  style={{  color:'black'  }}>{longitude1}</Text>
                  </View>

                </View>
                <View
                  style={{
                    height: 1,
                    // marginVertical: 14,
                    width: '90%',
                    backgroundColor: 'black',
                  }}></View>

                 
 

             



            
                    
        
                      
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
                AccidentLocationAddress,
                PremiseConsumerNumber,
                PMT,
                ConsumerMobileNumber,
                Remarks 
              },
              AccidentLocationAddress,
              PremiseConsumerNumber,
              PMT,
              ConsumerMobileNumber,
              Remarks, 
              
              
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

export default SafetyHazardEditRecordDetails;
