/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  StatusBar,

  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { and } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNetInfo, fetch, addEventListener } from "@react-native-community/netinfo";

// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function Menu({ navigation }) {

  const [user, setUser] = useState([]);
  const [IBC, setIBC] = useState([]);
  const [Area, setArea] = useState([]);
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [Workorders, setWorkorders] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);




  const [loader, setLoader] = useState(false);
  const item = {};
  let logindata;

  function loadData() {

    var count1 = 0;
    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data1 = items ? JSON.parse(items) : [];
      //console.log("data1", data1)
      if (data1.length >= 1) {
        data1.filter(item => {
          if (item.Status == 'Pending') {
            count1++;
          }


          setWorkorders(count1);
        });
      }
      else {
        setWorkorders(0);

        setLoading(false);
      }

    });


  };
  const [IsConnected, setIsConnected] = useState();

  const [netInfo1, setNetInfo1] = useState('');

  var netInfo = useNetInfo();

  const response = fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  useEffect(() => {


    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];
      logindata = data;

      setUser(data[0].RoleName);
      setIBC(data[0].IBC);
      setArea(data[0].RBArea);
    });

    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data1 = items ? JSON.parse(items) : [];
      var count1 = 0;

      data1.filter(item => {
        if (item.Status == 'Pending') {
          count1++;
        }


      });
      setWorkorders(count1);

    });

    navigation.addListener(
      'focus',
      payload => {
        loadData();
      }
    );


    //logindata

    //getapi();

    let a = [1, 2, 3, 4, 5, 6];
    let b = [1, 2, 3, 8];

    for (let i = 0; i < a.length; i++) {
      var bl = false;
      for (let j = 0; j < b.length; j++) {
        if (b[j] == a[i]) {
          // bl = true;

        } else {
        }
      }


    }
  }, []);


  function getapi() {
    console.log("-function In----")
    loadData();

    setLoading(true);

    let detail = [];
    AsyncStorage.getItem('RoshniBajiA')
      .then(items => {
        // alert(JSON.stringify(items))
        //   console.log("items", items);
        detail = items ? JSON.parse(items) : {};

        if (detail.length >= 1) {
          detail.map((index, indexval) => {


            if (indexval <= 10) {


              //   alert(indexval);
              //   if (indexval == 1) {
              RNFetchBlob.config({
                trusty: true,
              })

                .fetch(
                  'POST',
                  'https://rbapi.ke.com.pk/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID' +
                  '&RBID=' + index.UserID +
                  '&NearestLandmark=' + index.Area +
                  '&AccountContract=' + index.KEaccountnumber1 +
                  '&ContractAccount=' + index.contractnumber1 +
                  '&Contract=' + index.ConsumerName1 +
                  '&ConsumerNumber=' + index.ConsumerName1 +
                  '&ConsumerContact=' + index.Contact1 +
                  '&ConsumerAddress=' + index.CompleteAddress1 +
                  '&ConsumerCNIC=' + index.CNIC1 +
                  '&IBC=' + index.IBC + //tableData.Area
                  '&ConsumerType=' + index.Consumertype1 +
                  '&AwarenessSafety=' + index.safety +
                  '&AwarenessSarbulandi=' + index.sarbulandi +
                  '&AwarenessAzadi=' + index.azadi +
                  '&AwarenessNC=' + index.NewConnection_Conversion +
                  '&AwarenessTheft=' + index.theft +
                  '&DevParkRen=' + index.ParkRenovation +
                  '&DevDisRen=' + index.DispensaryRenovation +
                  '&DevSchRen=' + index.SchoolRenovation +
                  '&DevDrinkWater=' + index.DrinkingWater +
                  '&DevGarClean=' + index.GarbageCleaning +
                  '&DevAnyOther=' + index.AnyOther +
                  '&CompOverBlng=' + index.OverBilling +
                  '&CompDsc=' + index.Disconnection +
                  '&CompPndCon=' + index.PendingConnection +
                  '&CompAnyCom=' + index.Anycomment +
                  '&longitude1=' + index.longitude1 +
                  '&latitude1=' + index.latitude1 +
                  '&HookPlateNo=' + index.HookPlateNo + //tableData.HookPlateNo
                  '&safetyhazards=' + index.safetyhazards + //tableData.safetyhazards
                  '&ActionType=' + index.ActionType1 +
                  '&LoginDate=' + index.SDate +
                  '&SurveyDate=' + index.SDate +
                  '&MeterNo=' + index.NMeter1 +
                  '&Referred=' + index.ReferredIBC +
                  '&Remarks=' + index.Remarks ,

                )
                .then(res => res.json())
                .then(resp => {
                  //            alert(resp.surveyID);
                  index.ImageFlag == "Y" ? insertImages(resp.surveyID, index.ImageFlag, index.HazardImages) : null;

                  // insertImages(resp.surveyID, index.filterkey);



                  if (indexval <= 9) {
                    detail.splice(indexval, 1);
                    AsyncStorage.setItem('RoshniBajiA', JSON.stringify(detail));
                    loadData();
                  } else {

                    Alert.alert(
                      "Alert",
                      "Do you want post more records?",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            IsConnected == true ? getapi() : setError("No Internet connection")
                          }

                        },
                        {
                          text: "No",
                          onPress: () => loadData() && setLoading(false),
                          style: "No"
                        },

                      ]
                    );

                  }
                  if (indexval == 10) {

                    setLoading(false);
                  }


                  //     loadData();


                }).catch(error => {
                  setError(error);
                  setModalVisible(true);
                  setLoading(false);
                });


            }


          })
        }
        else {

          alert("No Record found");
          //setModalVisible(true);
          setLoading(false);
          return;



        }
      }).catch(error => {
        setError(error);
        setModalVisible(true);
        setLoading(false);
      });




  }


  function insertImages(surveyID, ImageFlag, HazardImages) {
    console.log("ImageFlag", ImageFlag);
    console.log("HazardImages", HazardImages);

    console.log('************************ function in');
    console.log('************************ surveyID', surveyID);


    HazardImages.map((RBImg) => {
      var imageURL = "https://rbapi.ke.com.pk/api/Image/PostImageData";
      console.log("RBImgsub.fileName", RBImg.fileName);
      console.log("RBImgsub.fileName", RBImg.fileName);
      RNFetchBlob.config({
        trusty: true,
      })

        .fetch(
          'POST',
          imageURL,
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRFToken': '',
            'X-Requested-With': 'XMLHttpRequest',
          },
          JSON.stringify({

            imageName: RBImg.fileName,
            imageBase64: RBImg.base64,
            SurveyID: surveyID,

          }),
        )
        .then(res => res.json())
        .then(resp => {
          console.log('-----------Image--------', resp);

          if (resp.StatusCode != "200") {

            setError(resp);
            setModalVisible(true);
            setLoader(false)

          }





        }).catch(error => {
          setError(error);
          setModalVisible(true);
          setLoader(false)
        });

    });


  }



  return (
    <View style={styles.container}>
 <View
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 40,
              }}>
              <ActivityIndicator color="#0D90D0" />
              <Text>Loading</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                IsConnected == true ? getapi() : setError("No Internet connection");

              }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../assets/sync.png')}
              />
              <Text style={{
                color: 'rgba(93,45,145,255)'
              }}> Tap to sync</Text>
              {loading ? (
                <ActivityIndicator
                  color="black"
                  style={{ marginLeft: 8 }}
                />
              ) : null}


            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            onPress={() => {
              // getapi();
              AsyncStorage.removeItem('User').then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              });
            }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../assets/logout.png')}
            />
            <Text style={{
              color: 'rgba(93,45,145,255)'
            }}> Logout</Text>
          </TouchableOpacity>

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
                  /*  navigation.reset({
                      index: 0,
                      routes: [{ name: 'Menu' }],
                    });*/
                  // navigation.replace('Update1)';
                  // navigation.navigate('Update1');
                  navigation.goBack();

                }}
              />
            </View>
          </Modal>
 
        </View>
      <StatusBar backgroundColor='black' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: "white"//colors.background
        }]}
      > 



      <TouchableOpacity>

      <View style={styles.logo}>
          
          <View
            style={{
              elevation: 16,
              borderRadius: 6,
              borderWidth: 5,
              borderColor: 'white',
              width: 100,
              height: 100,
              
             // alignItems: 'center',
             // justifyContent: 'center',
             // alignSelf: 'center',
            }}>
             <Image
              source={require('../assets/Planned.png')}
              resizeMode="center"
              style={{
                backgroundColor: 'white',
                width: 90,
                height: 90,
                borderRadius: 5,
              }}
            />
              <Text style={{color:'black', alignSelf: 'center',padding:5,fontSize:12}}>Planned</Text>
            </View>

            <View
            style={{
              elevation: 16,
              borderRadius: 6,
              borderWidth: 5,
              borderColor: 'white',
              width: 100,
              height: 100,
              marginBottom: 10,
              marginTop: 30,
             // alignItems: 'center',
             // justifyContent: 'center',
             // alignSelf: 'center',
            }}>
             <Image
              source={require('../assets/Unplanned.png')}
              resizeMode="center"
              style={{
                backgroundColor: 'white',
                width: 90,
                height: 90,
                borderRadius: 5,
              }}
            />
              <Text style={{color:'black', alignSelf: 'center',padding:5,fontSize:12}}>Unplanned</Text>
            </View>
            
            </View>
      </TouchableOpacity>
      
 <TouchableOpacity
          // disabled={loader}
          style={styles.loginBtn}
          onPress={() => {

            // setLoader(true);
            navigation.navigate('New1');

          }}>
          <View
            style={{
              height: 50,
              width: '97%',
              borderColor: 'white',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Add Record
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          // disabled={loader}
          style={styles.loginBtn}
          onPress={() => {

            // setLoader(true);
            navigation.navigate('Update1', {
              data: { dataSource }
              /*  ,update:()=>{
               AsyncStorage.getItem('RoshniBajiA').then(items => {
                 var data = items ? JSON.parse(items) : [];
                 data.filter(item => {
                   if (item.Status == 'Pending')
                   {
                     setWorkorders(data);
                   }     
                   });
               });   
              
   
             }*/

            });


          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: 'rgba(248,147,30,255)',
              position: 'absolute',
              top: -10,
              right: -10,
              elevation: 4,
              shadowOffset: { width: 15, height: 15 },
              shadowColor: 'black',
              shadowOpacity: 0.8,
              shadowRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              {Workorders}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              width: '97%',
              borderColor: 'white',
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Pending Records
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
        </View>
        <View
          style={{
            height: 50,
            width: '97%',
            // borderColor: 'white',
            // borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: '#5d2d91', fontSize: 16, fontWeight: 'bold' }}>
            {IBC}
          </Text>
        </View>

        <View
          style={{
            height: 50,
            width: '97%',
            // borderColor: 'white',
            // borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: '#5d2d91', fontSize: 16, fontWeight: 'bold' }}>
            {Area}
          </Text>
        </View>
       

      </Animatable.View>


     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
 
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    // top:0,
    // color: '#0D90D0',
    color: 'rgba(93,45,145,255)',
  
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
    color: '#0D90D0',
    fontSize: 11,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(93,45,145,255)',
    // borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },


  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Menu;
