/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  //   AsyncStorage,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import Collapsible from 'react-native-collapsible';
import openMap from 'react-native-open-maps';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatList } from 'react-native-gesture-handler';
import { useNetInfo, fetch, addEventListener } from "@react-native-community/netinfo";
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
//import Config from 'react-native-config';

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

function SafetyHazardDetail({ route, navigation }) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [temptableData, settemptableData] = useState([]);

  const [Status, SetStatus] = useState();


  const [images, setImages] = useState([]);


  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const { width } = Dimensions.get('window');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [multipleSelect, setMultipleSelect] = useState(false);



  const showLocation = (latitude1, longitude1) => {
    const loaction11 = { latitude: longitude1, longitude: latitude1 };

    openMap({ ...loaction11 }); //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'

  }
  const [IsConnected, setIsConnected] = useState();

  const [netInfo1, setNetInfo1] = useState('');

  var netInfo = useNetInfo();

  const response = fetch().then(state => {
    setIsConnected(state.isConnected);
  });




  useEffect(() => {

    console.log("route.params.index", route.params.index);
    setLoader(true);
    let Allimages = []
    let Postingdata = route.params.data;


    SetStatus(Postingdata.Status);

    settableData([Postingdata]);



    Postingdata.HazardImages.map((Imgsub, index) => {



      Allimages.push({
        uri: Imgsub.uri,
        url: Imgsub.url
      })

      setImages(Allimages);
    })


    setLoader(false);

  }, [route.params.index]);




  const postAPI = (backPinGeneration, name, userPassword, loader) => {


    //    var apiURLN="Config.API_PostingURL";

    //var apiURLN="https://staging.ke.com.pk:8072/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID"

    var apiURLN = "https://rbapi.ke.com.pk/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID"


    //   console.log("apiURLN", apiURLN);

    let detail = route.params.data;

    let vArea = detail.Area;
    vArea = vArea.replace('#', '')
    vArea = vArea.trim();
    let vAddress = detail.CompleteAddress1.replace('#', '');
    vAddress = vAddress.replace('#', '');
    vAddress = vAddress.trim();


    //    console.log("param detail", detail);

    console.log("Check1");

    try {
      let response = axios.post(
        'https://rbapi.ke.com.pk/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&SupeLogrvisorID=SupeLogrvisorID' +
        '&RBID=' + detail.UserID +
        '&NearestLandmark=' + vArea +
        '&AccountContract=' + detail.KEaccountnumber1 +
        '&ContractAccount=' + detail.contractnumber1 +
        '&Contract=' + detail.ConsumerName1 +
        '&ConsumerNumber=' + detail.ConsumerName1 +
        '&ConsumerContact=' + detail.Contact1 +
        '&ConsumerAddress=' + vAddress +
        '&ConsumerCNIC=' + detail.CNIC1 +
        '&IBC=' + detail.IBC + //tableData.Area
        '&ConsumerType=' + detail.Consumertype1 +
        '&AwarenessSafety=' + detail.safety +
        '&AwarenessSarbulandi=' + detail.sarbulandi +
        '&AwarenessAzadi=' + detail.azadi +
        '&AwarenessNC=' + detail.NewConnection_Conversion +
        '&AwarenessTheft=' + detail.theft +
        '&DevParkRen=' + detail.ParkRenovation +
        '&DevDisRen=' + detail.DispensaryRenovation +
        '&DevSchRen=' + detail.SchoolRenovation +
        '&DevDrinkWater=' + detail.DrinkingWater +
        '&DevGarClean=' + detail.GarbageCleaning +
        '&DevAnyOther=' + detail.AnyOther +
        '&CompOverBlng=' + detail.OverBilling +
        '&CompDsc=' + detail.Disconnection +
        '&CompPndCon=' + detail.PendingConnection +
        '&CompAnyCom=' + detail.Anycomment +
        '&longitude1=' + detail.longitude1 +
        '&latitude1=' + detail.latitude1 +
        '&HookPlateNo=' + detail.HookPlateNo + //tableData.HookPlateNo
        '&safetyhazards=' + detail.safetyhazards + //tableData.safetyhazards
        '&ActionType=' + detail.ActionType1 +
        '&LoginDate=' + detail.SDate +
        '&SurveyDate=' + detail.SDate +
        '&MeterNo=' + detail.NMeter1 +
        '&Referred=' + detail.ReferredIBC +
        '&Remarks=' + detail.Remarks,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          timeout: 1000 * 5
        },
      )
        .then((response) => {
          //  console.log("response", response);
          let res = response;
          //   console.log("res.data", res.data);

          let serverRepID = res.data.surveyID;


          setUploadingMsg(res.data.surveyID);

          setSuccessModalVisible(!isSuccessModalVisible);

          //  console.log('log1');
          // insertImages(resp.surveyID);
          console.log('************************ start ', detail.ImageFlag);

          detail.ImageFlag == "Y" ? insertImages(serverRepID, detail.ImageFlag, detail.HazardImages) : null;
          console.log('************************ end', detail.ImageFlag);


          AsyncStorage.getItem('RoshniBajiA')
            .then((items) => {

              let data = JSON.parse(items);
              if (serverRepID) {
                data.splice(route.params.index, 1);
                AsyncStorage.setItem('RoshniBajiA', JSON.stringify(data));
              }


            });






        })
    } catch (error) {
      // console.log('Error', e);
      alert('error' + error.message);
      setLoader(false)
    }


  }


  function insertImages(surveyID, ImageFlag, HazardImages) {
    console.log("ImageFlag", ImageFlag);
    console.log("HazardImages", HazardImages);

    console.log('************************ function in');
    console.log('************************ surveyID', surveyID);


    HazardImages.map((RBImg) => {
      var imageURL = "https://rbapi.ke.com.pk/api/Image/PostImageData";
      //  console.log("RBImgsub.fileName", RBImg.fileName);
      //  console.log("RBImgsub.fileName", RBImg.fileName);



      try {
        axios({
          method: 'POST',
          url: imageURL,
          timeout: 1000 * 5,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRFToken': '',
            'X-Requested-With': 'XMLHttpRequest',
          },
          data: JSON.stringify({
            imageName: RBImg.fileName,
            imageBase64: RBImg.base64,
            SurveyID: surveyID,
          }),

        }).then((response) => {

          let res = response;

        })

      } catch (error) {
        // console.log('Error', e);
        alert('error' + error.message);
        setLoader(false)
      }

    });



  }


  return (
    <View style={styles.container}>


      {loader ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ flex: 1, width: '100%' }}
          data={(tableData.length) > 0 ? tableData : 0}
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

          renderItem={({ item, index, separators }) => {
            // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

            return (
              <Swipeable >
                <TouchableOpacity

                  style={{
                    marginLeft: 10
                  }}>



                  <View style={{ flex: 1 }}>



                    <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Raise By </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}> {item.UserID}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Raise On </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>

                        <Text style={{ color: 'black' }}>{item.SDate}</Text>
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







                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 20,
                      }}>


                      <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Accident Location Address </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.AccidentLocationAddress}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Premise Consumer Number </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.PremiseConsumerNumber}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>PMT</Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>  {item.PMT}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Consumer Mobile Number    </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.ConsumerMobileNumber} </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Remarks  </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.Remarks} </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Longitude   </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.latitude1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Latitude   </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.longitude1}</Text>
                      </View>

                    </View>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        // height: 22,
                        padding: 5,
                        // paddingHorizontal:10,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}

                      onPress={() => showLocation(item.longitude1, item.latitude1)// showLocationNew([item.longitude1, item.latitude1]) 


                      }>
                      <Image
                        // source={pin_black}
                        source={require('../assets/pin_black.png')}
                        style={{ width: 16, height: 16 }}></Image>
                    </TouchableOpacity>








                    <View
                      style={{ height: 20, width: 1, backgroundColor: 'black' }}>

                    </View>
                    <View
                      style={{ flex: 0.5, paddingHorizontal: 10, alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'normal', color: 'black' }}>
                        Images{' '}
                      </Text>


                      <Carousel

                        //  ref={carouselRef}
                        layout='default'
                        data={images}

                        sliderWidth={width}
                        itemWidth={width}

                        renderItem={({ item, index }) => {
                          return (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  // onTouchThumbnail(index);
                                  setindexer1(index);
                                  setimageview(true);

                                }}
                                activeOpacity={0.9}
                              >

                                <Image
                                  source={{ uri: item.uri }}
                                  style={{ height: 200, width: 300 }}></Image>
                              </TouchableOpacity>

                            </View>
                          )
                        }}



                      //                onSnapToItem={index => onSelect(index)}
                      />

                    </View>



                    <Modal visible={imageview} transparent={true}
                      closeOnClick={true}>




                      <ImageViewer
                        renderHeader={() => {
                          return (
                            <View
                              style={{
                                width: '100%',
                                height: 50,
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
                </TouchableOpacity>
              </Swipeable>
            );
          }}

        />
      )}
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

      {Status=='Pending' ? 
      <TouchableOpacity
        disabled={loader}
        style={styles.loginBtn}
        onPress={() => {
          // console.log('Posting Pressed');
          setLoader(true);
          console.log("IsConnected Ali", IsConnected);

          if (IsConnected == false) {
            setError('Network connectivity issue')
            setModalVisible(true);
            return;

          }
          else {
            console.log('connect API');

            postAPI(
              () => {
                /* navigation.reset({
                   index: 0,
                   routes: [{ name: 'Menu' }],
                 });*/
                // navigation.navigate('Update1');
                navigation.goBack();
              },

              name,
              userPassword,
              () => {
                return setLoader(false);

              },
            );

          }

        }}> 
        
        {loader ? (
          <ActivityIndicator size="large" color="#FFFFFF" ></ActivityIndicator>
        ) : (
          <Text style={{ color: 'white', fontSize: 18 }}>Post</Text>

        )}

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
            <Text style={{ color: 'green', fontSize: 24, fontWeight: 'bold' }}>
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
                //navigation.goBack();
                // }, 1000);


                /*  navigation.reset({
                    index: 0,
                    routes: [{name: 'Update1'}],
                  })*/
                navigation.goBack();
                //console.log("dataSource:", dataSource);
                // navigation.navigate('Update1'); //, {
                /* navigation.navigate('Menu', {
                  data: { dataSource }
                  /*,update:()=>{
                 AsyncStorage.getItem('RoshniBajiA').then(items => {
                   var data = items ? JSON.parse(items) : [];
                   data.filter(item => {
                     if (item.Status == 'Pending')
                     {
                       setWorkorders(data);
                     }     
                     });
                 });   
                
     
               } 
                });
         */

              }}
            />
          </View>
        </Modal>

      </TouchableOpacity>
        : null }
      <View
        style={{
          marginTop: 20,
          // marginBottom: 20,
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'none'
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
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoggerScreen' }],
            })
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', backgroundColor: '#fff' },
  containerscr4: { flex: 1, padding: 1, paddingTop: 2, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
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
    color: '#465881',
    fontSize: 11,
    elevation: 4,
    shadowOffset: { width: 15, height: 15 },
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
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 50,
    right: -1,
    bottom: 0,
    // borderBottomRightRadius: 15,

  },

  imageViewerStyle: {
    width: '100px',
    height: '100px',
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

export default SafetyHazardDetail;
