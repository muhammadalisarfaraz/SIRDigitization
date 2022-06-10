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

function ConsumerDetail({ route, navigation }) {
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

  const [dataSource, setDataSource] = useState([]);
  const [images, setImages] = useState([]);


  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const { width } = Dimensions.get('window');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);

  const [refresh, setRefresh] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);

  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
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


    // let detail = route.params.data;

    AsyncStorage.getItem('RoshniBajiimages').then(items => {
      var data = [];
      let Allimages = [];
      data = items ? JSON.parse(items) : {};

      console.log(data)
      //console.log("data*:",  data[0].data3[0].Status);
      //console.log("data*:",  data[0].data3[0].RoshniBajiWebID);
      //  console.log("data*:",  data[1].data3[0]);

      console.log("******************************");
      data.map((RBImg) => {

        RBImg.data3.map((RBImgsub) => {
          //console.log("number.data3[0].url*", number.data3[0].url);
          //console.log('*****',RBImgsub.Status);
          //console.log('*****',RBImgsub.RoshniBajiWebID);

          // console.log('*****',RBImgsub.filterkey);
          if (RBImgsub.filterkey == route.params.otherParam) {
            console.log('*****', RBImgsub.Status);


            Allimages.push({
              uri: RBImgsub.uri,
              url: RBImgsub.url
            })
          }
          setImages(Allimages);
        })
      })
      /*data.filter((item, index) => {
        //  if ( data[index].filterkey==route.params.otherParam &&  data[index].Status == 'Pending')
       //cons
 
       console.log("index:", index);
        
        if ( route.params.otherParam==data[1].data3[index].filterkey)  
        {
         console.log("data[index].filterkey:",  data[1].data3[index].filterkey);
         console.log("data[index]:",index);
          
           Allimages.push({ 
              uri : data[1].data3[index].uri, 
              url: data[1].data3[index].url
            }) 
          }
         
       });
      
       setImages(Allimages);   */
    });

    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data = [];
      data = items ? JSON.parse(items) : {};

//alert(route.params.otherParam);
      settemptableData(data);
      setLoader(false);
      data.filter(item => {
        if (item.filterkey == route.params.otherParam) {
      //    alert(item.filterkey);

          settableData([item]);
        }
      });
    });


  }, [route.params.index]);




  const postAPI = (
    back,
    backPinGeneration,
    name,
    userPassword,
    loader,
  ) => {


    //    var apiURLN="Config.API_PostingURL";

    //var apiURLN="https://staging.ke.com.pk:8072/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID"

    var apiURLN = "https://rbapi.ke.com.pk/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID"


    console.log("apiURLN", apiURLN);

    let detail = route.params.data;


    console.log("param detail", detail);



    console.log("Check1");
    RNFetchBlob.config({
      trusty: true,
    })

      .fetch(
        'POST',
        'https://rbapi.ke.com.pk/api/PlanAPI/GenerateSurveyRequestAPI?Visits=test&AssignmentID=test&MRU=MRU&NearestLandmark=NearestLandmark&SupeLogrvisorID=SupeLogrvisorID' +
        '&RBID=' + detail.UserID +
        '&NearestLandmark=' + detail.Area +
        '&AccountContract=' + detail.KEaccountnumber1 +
        '&ContractAccount=' + detail.contractnumber1 +
        '&Contract=' + detail.ConsumerName1 +
        '&ConsumerNumber=' + detail.ConsumerName1 +
        '&ConsumerContact=' + detail.Contact1 +
        '&ConsumerAddress=' + detail.CompleteAddress1 +
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
        '&Remarks=' + detail.Remarks ,

      )
      .then(res => res.json())
      .then(resp => {
        console.log('-----------Enter--------');
        setUploadingMsg(resp.surveyID);

        setSuccessModalVisible(!isSuccessModalVisible);

        //  console.log('log1');
        insertImages(resp.surveyID);

        detail.Status = "Posted";
        detail.RoshniBajiWebID = resp.surveyID;

        AsyncStorage.getItem('RoshniBajiA')
          .then(async (items) => {
            // alert(JSON.stringify(items))

            let data = JSON.parse(items);
            data.filter((item, index) => {
              if (item.filterkey == route.params.otherParam && item.Status == 'Pending') {
                data[index].Status = "Posted";
                 data[index].RoshniBajiWebID =  resp.surveyID;
                // console.log("route.params.index", route.params.index);
                data.splice(route.params.index, 1);
                AsyncStorage.setItem('RoshniBajiA', JSON.stringify(data));

              }
            });

            setDataSource(data);
          });



      })
      .catch(error => {
        setError(error);

        setModalVisible(true);
        loader();
      });





  }


  function insertImages(surveyID) {
    console.log("image");
    console.log("route.params.otherParam", route.params.otherParam);

    AsyncStorage.getItem('RoshniBajiimages').then(items => {
      var data = [];
      data = items ? JSON.parse(items) : {};

      console.log("data", data);

      data.map((RBImg, indexv) => {
        if (RBImg.data3.length >= 1) {
          RBImg.data3.map((RBImgsub) => {
            console.log("RBImgsub.filterkey*", RBImgsub.filterkey);

            if (RBImgsub.filterkey == route.params.otherParam) {
              var imageURL = "https://rbapi.ke.com.pk/api/Image/PostImageData";


              console.log("RBImgsub.fileName", RBImgsub.fileName);
              console.log("RBImgsub.fileName", RBImgsub.fileName);
              console.log("surveyID", surveyID);
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

                    imageName: RBImgsub.fileName,
                    imageBase64: RBImgsub.base64,
                    SurveyID: surveyID,

                  }),
                )
                .then(res => res.json())
                .then(resp => {
               //   console.log('-----------Image--------', res);


                }).catch(error => {
                  setError(error);
                  setModalVisible(true);
                  //  loader();
                });

            }
            if (RBImgsub.filterkey == route.params.otherParam) {
              console.log("*********************************")
              console.log("indexv", indexv);
              data.splice(indexv, 1);
              AsyncStorage.setItem('RoshniBajiimages', JSON.stringify(data));
            }

          })
        }
        else {
          data.splice(indexv, 1);
          AsyncStorage.setItem('RoshniBajiimages', JSON.stringify(data));
        }
      })



    }).catch(error => {
      setError(error);
      setModalVisible(true);
      // loader();
    });



  }


  const searchFilterFunction = text => {
    setRefresh(true);

    if (text == '' || text == null) {
      setRefresh(true);
      //alert('');
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    else {
      var arrayholder = temptableData;
      // console.log(arrayholder);
      const newData = arrayholder.filter(item => {
        const itemData = `${item.KEaccountnumber1.toUpperCase()} ${item.NConsumerName1.toUpperCase()} ${item.ConsumerName1.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }

  };
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

                        <Text style={{ color: 'black' }}>{item.LoginDate}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Action Type </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>

                        <Text style={{ color: 'black' }}>{item.ActionType1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>KE Account Number  </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.KEaccountnumber1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Contract Number </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.contractnumber1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Consumer Name </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>  {item.ConsumerName1 == '' ? item.NConsumerName1 : item.ConsumerName1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>CNIC #  </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.CNIC1} </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Contact #  </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.Contact1} </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Complete Address  </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.CompleteAddress1}  </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Consumer type </Text>
                      </View>

                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.Consumertype1}   </Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Meter # </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.NMeter1}</Text>
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
                        <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>Hook Plate No # </Text>
                      </View>
                      <View style={{ flex: 0.5 }}>
                        <Text style={{ color: 'black' }}>{item.HookPlateNo}</Text>
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
                        <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white', marginLeft: 10 }}>
                          Awareness/Advocacy
                        </Text>

                      </View>
                    </TouchableOpacity>

                    <Collapsible collapsed={collapsed} align="center">
                      <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                        <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Safety{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>
                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.safety}</Text>
                          </View>
                        </View>


                      </View>
                      <View
                        style={{
                          height: 1,
                          marginVertical: 14,
                          width: '100%', marginLeft: 1,
                          backgroundColor: 'black',
                        }}></View>

                      <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                        <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Sarbulandi{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.sarbulandi}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Azadi{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.azadi}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            New Connection/Conversion{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.NewConnection_Conversion}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Theft{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.theft}</Text>
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
                        <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white', marginLeft: 10 }}>
                          Development
                        </Text>

                      </View>

                    </TouchableOpacity>

                    <Collapsible collapsed={collapsed1} align="center">
                      <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                        <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Park Renovation{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.ParkRenovation}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Dispensary Renovation{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.DispensaryRenovation}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            School Renovation{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.SchoolRenovation}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Drinking Water{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.DrinkingWater}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Garbage Cleaning{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.GarbageCleaning}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Others{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.AnyOther}</Text>
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
                        <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white', marginLeft: 10 }}>
                          Complaints
                        </Text>


                      </View>

                    </TouchableOpacity>

                    <Collapsible collapsed={collapsed2} align="center">



                      <View style={{ flexDirection: 'row', flex: 1, width: '96%' }}>
                        <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Over Billing{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.OverBilling}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Disconnection {' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.Disconnection}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Pending Connection{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.PendingConnection}</Text>
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
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Any comment{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>


                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.Anycomment}</Text>
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
                          backgroundColor: '#5d2d91',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={{ fontWeight: 'normal', fontSize: 14, color: 'white', marginLeft: 10 }}>
                          Referral
                        </Text>

                      </View>

                    </TouchableOpacity>

                    <Collapsible collapsed={collapsed3} align="center">

                      <View style={{ flexDirection: 'row', flex: 1, width: '50%' }}>
                        <View style={{ flex: 0.7, alignItems: 'flex-start' }}>
                          <Text style={{ fontWeight: 'normal', color: '#5d2d91' }}>
                            Referred IBC{' '}
                          </Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-start' }}>

                          <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black' }}>{item.ReferredIBC}</Text>
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
                            <Text style={{ color: 'black' }}>{item.safetyhazards}</Text>
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
                            <Text style={{ color: 'black' }}>{item.Remarks}</Text>
                          </View>


                        </View>
                      </View></View>





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

                        sliderWidth={250}
                        itemWidth={200}
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

export default ConsumerDetail;
