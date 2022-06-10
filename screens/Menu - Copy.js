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
  AsyncStorage,
  Image,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function Menu({navigation}) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [user, setUser] = useState({});
  const [RevertedOrders, setRevertedOrders] = useState([]);
  const [PendingOrders, setPendingOrders] = useState([]);
  const [Workorders, setWorkorders] = useState([]);

  const [loader, setLoader] = useState(false);
  const item = {};
  let logindata;
  useEffect(() => {
    console.log("*********************************OUTSIDE***********************************");

    getapi();

    let a = [1, 2, 3, 4, 5, 6];
    let b = [1, 2, 3, 8];
    console.log('-------------------------');
    for (let i = 0; i < a.length; i++) {
      var bl = false;
      for (let j = 0; j < b.length; j++) {
        if (b[j] == a[i]) {
          // bl = true;
          console.log(b[j]);
        } else {
        }
      }

      // if (bl == true) {
      //   console.log('lol ' + a[i]);
      // }
    }
  }, []);

  function getPendingOrders() {
    AsyncStorage.getItem('User')
      .then(items => {
        var data = items ? JSON.parse(items) : {};
        console.log(JSON.stringify(data));
        setUser(data);
        RNFetchBlob.config({
          trusty: true,
        })
          .fetch(
            'GET',
            'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_ORDERSet?$filter=ImUser%20eq%20%27' +
              data.ImUser +
              '%27%20and%20ImLoggedId%20eq%20%27U%27&&$format=json',
            {
             ////  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
              'Content-Type': 'application/json; charset=utf-8',
            },
          )
          .then(res => res.json())
          .then(res => {
            let pendingOrder = res.d.results;
            let data = pendingOrder.filter(x => x.Reverted == 'P');
            data.sort((a, b) => b.SDate - a.SDate);
            setPendingOrders(data);
            // console.log(pendingOrders);
            setLoader(false);
          })
          .catch(error => {
            setPendingOrders([]);
            setLoader(false);
            alert('Something went wrong! Please check internet connectivity.');
          });
      })
      .catch(error => {
        setPendingOrders([]);
        setLoader(false);
        alert('Something went wrong! Please check internet connectivity.');
      });
    setLoader(true);
    setPendingOrders([]);
    console.log(
      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_ORDERSet?$filter=ImUser%20eq%20%27' +
        user.ImUser +
        '%27%20and%20ImLoggedId%20eq%20%27U%27&&$format=json',
    );
  }
  function getRevertedOrders(user) {
    AsyncStorage.getItem('User')
      .then(items => {
        var data = items ? JSON.parse(items) : {};
        console.log(JSON.stringify(data));
        setUser(data);
        RNFetchBlob.config({
          trusty: true,
        })
          .fetch(
            'GET',
            'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_ORDERSet?$filter=ImUser%20eq%20%27' +
              data.ImUser +
              '%27%20and%20ImLoggedId%20eq%20%27U%27&&$format=json',
            {
             //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
              'Content-Type': 'application/json; charset=utf-8',
            },
          )
          .then(res => res.json())
          .then(res => {
            let pendingOrder = res.d.results;
            let data = pendingOrder.filter(x => x.Reverted == 'R');
            data.sort((a, b) => b.SDate - a.SDate);
            setRevertedOrders(data);
            console.log(data);
            setLoader(false);
          })
          .catch(error => {
            setRevertedOrders([]);
            setLoader(false);
            alert('Something went wrong! Please check internet connectivity.');
          });
      })
      .catch(error => {
        setRevertedOrders([]);
        setLoader(false);
        alert('Something went wrong! Please check internet connectivity.');
      });
    setLoader(true);
    setRevertedOrders([]);
    console.log(
      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_ORDERSet?$filter=ImUser%20eq%20%27' +
        user.ImUser +
        '%27%20and%20ImLoggedId%20eq%20%27U%27&&$format=json',
    );
  }
  function getapi() {
    console.log("*********************************INSIDE***********************************");
    setLoader(true);
    // RNFetchBlob.config({
    //   trusty: true,
    // })
    //   .fetch(
    //     'GET',
    //     'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_DTS_LISTSet?$format=json',
    //     {
    //      // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
    //       'Content-Type': 'application/json; charset=utf-8',
    //     },
    //   )
    //   .then(res => res.json())
    //   .then(res => {
    //     // setLoader(false);
    //     // setItems(res.values);
    //     let Dts = res.d.results;
    //     // alert(JSON.stringify(Dts));
    //     // console.log(JSON.stringify(Dts));
    //     let arr = [];
    //     for (var i = 0; i < Dts.length; i++) {
    //       arr.push({
    //         id: i,
    //         name: Dts[i].Tplnr,
    //         uri: Dts[i].__metadata.uri,
    //         type: Dts[i].__metadata.type,
    //         orgid: Dts[i].__metadata.id,
    //       });
    //     }
    //     AsyncStorage.setItem('DTS', JSON.stringify(arr));
    //   })
    //   .catch(error => {
    //     setLoader(false);
    //     alert('Something went wrong! Please check internet connectivity.');
    //   });

     RNFetchBlob.config({
      trusty: true,timeout: 100000,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_FEEDER_IDSSet?$format=json',
        {
         // Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
          
        },
      )
      .then(res => res.json())
      .then(async (res) => {
        // setLoader(false);
        // setItems(res.values);
        let Feeder = res.d.results;
        console.log("********************************* Feeder INSIDE***********************************");
        // console.log("Feeder Data", Feeder);
        let arr = [];
       // for (var i = 0; i < Feeder.length; i++) {
        for (var i = 0; i < 10; i++) {
          arr.push({
            id: i,
            feeder_id: Feeder[i].Tplnr,
            name: Feeder[i].FdrDesc + ' (' + Feeder[i].Tplnr + ')',
            name_dts: Feeder[i].Tplma,
            dts_desc: Feeder[i].DtsDesc,
            uri: Feeder[i].__metadata.uri,
            type: Feeder[i].__metadata.type,
            orgid: Feeder[i].__metadata.id,
          });
        //  console.log(Feeder[i].Tplnr);
        }
        


        const uniqueTags = [];
        arr.map(item => {
          var findItem = uniqueTags.find(x => x.name === item.name);
          if (!findItem) uniqueTags.push(item);
        });

         

        // alert(JSON.stringify(arr));
      //   console.log("uniqueTags" , JSON.stringify(uniqueTags));
        AsyncStorage.setItem('Feeder', JSON.stringify(uniqueTags));
      
        let array = [];
       // for (var z = 0; z < Feeder.length; z++) {
        for (var z = 0; z < 10; z++) {
           
       if (Feeder[z].Tplma == '') {
          } else {
            array.push({
              id: z,
              feeder_id: Feeder[z].Tplnr,
              feeder_desc: Feeder[z].FdrDesc,
              dts_id: Feeder[z].Tplma,
              name: Feeder[z].DtsDesc + ' (' + Feeder[z].Tplma + ')',
              uri: Feeder[z].__metadata.uri,
              type: Feeder[z].__metadata.type,
              orgid: Feeder[z].__metadata.id,
            });
          }
        }

        console.log("---------Start----------");
        const half = Math.ceil(arr.length / 2);  
        const firstHalf = arr.splice(0, half)
        const secondHalf = arr.splice(-half)

        AsyncStorage.setItem('DTS',firstHalf)
        AsyncStorage.setItem('DTS2',secondHalf)
      
      
        //console.log("DTS" , JSON.stringify(array));

var save=JSON.stringify(array);
console.log("--------End----------");
       await AsyncStorage.setItem('DTS', save );
      })
      .catch(error => {
        setLoader(false);

       
       // alert('Feeder API went wrong! Please check internet connectivity.');
      console.log("Feeder API Error", error);
      });
 
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_VENDORS_LISTSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setLoader(false);
        // setItems(res.values);
        let Vendors = res.d.results;

        let arr = [];
        for (var j = 0; j < Vendors.length; j++) {
          arr.push({
            id: j,
            name: Vendors[j].Name,
            uri: Vendors[j].__metadata.uri,
            type: Vendors[j].__metadata.type,
            orgid: Vendors[j].__metadata.id,
            v_id: Vendors[j].Lifnr,
          });
        }
        // alert(JSON.stringify(Vendors));
        console.log(JSON.stringify(arr));
        AsyncStorage.setItem('PQC', JSON.stringify(arr));
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.');
      });

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PROJECTS_LISTSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setLoader(false);
        // setItems(res.values);
        let Projects = res.d.results;
        let arr = [];
        for (var i = 0; i < Projects.length; i++) {
          arr.push({
            id: i,
            name: Projects[i].ProjectName,
            projid: Projects[i].ProjId,
            uri: Projects[i].__metadata.uri,
            type: Projects[i].__metadata.type,
            orgid: Projects[i].__metadata.id,
          });
        }
        // alert(JSON.stringify(Projects))
        console.log('Projects ' + JSON.stringify(Projects));
        AsyncStorage.setItem('Projects', JSON.stringify(arr));
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.');
      });

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_SUB_PROJECTS_LISTSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setItems(res.values);
        let SubProject = res.d.results;
        let arr = [];
        for (var i = 0; i < SubProject.length; i++) {
          arr.push({
            id: i,
            name: SubProject[i].SubProj,
            projid: SubProject[i].ProjId,
            spcode: SubProject[i].SpCode,
            uri: SubProject[i].__metadata.uri,
            type: SubProject[i].__metadata.type,
            orgid: SubProject[i].__metadata.id,
          });
        }
        // alert(JSON.stringify(SubProject));
        console.log('Sub Projects ' + JSON.stringify(SubProject));
        AsyncStorage.setItem('SubProject', JSON.stringify(arr));
        // setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.');
      });
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_METER_NOSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setItems(res.values);
        let MeterNo = res.d.results;
        let arr = [];

        for (var i = 0; i < MeterNo.length; i++) {
          arr.push({
            id: i,
            name: MeterNo[i].Sernr,
            Sernr: MeterNo[i].Sernr,
            Matnr: MeterNo[i].Matnr,
            Equnr: MeterNo[i].Equnr,
            BLager: MeterNo[i].BLager,
            Lifnr: MeterNo[i].Lifnr,
            uri: MeterNo[i].__metadata.uri,
            type: MeterNo[i].__metadata.type,
            orgid: MeterNo[i].__metadata.id,
          });
        }
        // alert(JSON.stringify(Materials))
        console.log('MeterNo ', JSON.stringify(arr));
        AsyncStorage.setItem('MeterNo', JSON.stringify(arr)).then(() => {
          setLoader(false);
        });
        // setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.'); https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_APPROVERSSet?$filter=ImUser
      });
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_WBS_LISTSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setItems(res.values);
        let Wbs = res.d.results;
        let arr = [];
        for (var i = 0; i < Wbs.length; i++) {
          arr.push({
            id: i,
            name: Wbs[i].Wbs,
            projid: Wbs[i].ProjId,
            feeder_id: Wbs[i].Tplnr,
            spcode: Wbs[i].SpCode,
            uri: Wbs[i].__metadata.uri,
            type: Wbs[i].__metadata.type,
            orgid: Wbs[i].__metadata.id,
          });
        }
        // alert(JSON.stringify(SubProject));
        console.log('Wbs ' + JSON.stringify(Wbs));
        AsyncStorage.setItem('Wbs', JSON.stringify(arr));
        // setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.');
      });

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_MATERIALS_LISTSet?$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setItems(res.values);
        let Materials = res.d.results;

        // alert(JSON.stringify(Materials))
        // console.log(JSON.stringify(Materials))
        AsyncStorage.setItem('Materials', JSON.stringify(Materials)).then(
          () => {
            setLoader(false);
          },
        );
        // setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.'); https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_APPROVERSSet?$filter=ImUser
      });

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_APPROVERSSet?$filter=ImUser%20eq%20%27ZAHRA%27&&$format=json',
        {
         // //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        // setItems(res.values);
        let Aprrovers = res.d.results;
        let arr = [];
        for (var i = 0; i < Aprrovers.length; i++) {
          arr.push({
            id: i,
            name: Aprrovers[i].SupId,
            imuser: Aprrovers[i].ImUser,
            uri: Aprrovers[i].__metadata.uri,
            type: Aprrovers[i].__metadata.type,
            orgid: Aprrovers[i].__metadata.id,
          });
        }
        // alert(JSON.stringify(Materials))
        // console.log(JSON.stringify(Materials))
        console.log('Aprrovers ' + JSON.stringify(Aprrovers));

        AsyncStorage.setItem('Aprrovers', JSON.stringify(arr)).then(() => {
          setLoader(false);
        });
        // setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        // alert('Something went wrong! Please check internet connectivity.'); https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_APPROVERSSet?$filter=ImUser
      });

    AsyncStorage.getItem('User').then(items => {
      var logindata = items ? JSON.parse(items) : {};
      // var datatable = [];

      console.log('logindata', logindata);
      getRevertedOrders(logindata);
      getPendingOrders();

      setUser(logindata);
    });
    AsyncStorage.getItem('Workorders').then(items => {
      var data = items ? JSON.parse(items) : [];

      setWorkorders(data);
      // setLoader(false);
      console.log(JSON.stringify(data));
    });
  }
  return (
    <View style={styles.container}>
      <Text
            style={{
              fontSize: 26,
              marginBottom: 20,
              marginTop: 20,
              // color: '#F6921E',
              // elevation: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              // fontSize: 22,
             // color: '#FFFFFF',
            }}>
            Roshni Baji
          </Text>
       <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              marginTop: 20,
              // color: '#F6921E',
              // elevation: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              // fontSize: 22,
             // color: '#FFFFFF',
            }}>
            Women Ambassador Programme by KE
          </Text>
     <Text style={styles.logo}> Welcome {logindata}!</Text>

      <TouchableOpacity
        // disabled={loader}
        style={styles.loginBtn}
        onPress={() => {
          console.log('Login Pressed');
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
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Add Record
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // disabled={loader}
        style={styles.loginBtn}
        onPress={() => {
          console.log('Login Pressed');
          // setLoader(true);
          navigation.navigate('Update1');

      
        }}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: '#F6921E',
            position: 'absolute',
            top: -10,
            right: -10,
            elevation: 4,
            shadowOffset: {width: 15, height: 15},
            shadowColor: 'black',
            shadowOpacity: 0.8,
            shadowRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            {Workorders.length > 10 ? '10+' : Workorders.length}
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
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Pending Records
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        // disabled={loader}
        style={[styles.loginBtn, {height: 60, marginTop: 10}]}
        onPress={() => {
          console.log('Login Pressed');
          // setLoader(true);
          navigation.navigate('HistoryUser');
 
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
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
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
              getapi();
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/sync.png')}
            />
            <Text>Tap to sync</Text>
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
                routes: [{name: 'Login'}],
              });
            });
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../assets/logout.png')}
          />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    // top:0,
    color: '#0D90D0',
    marginBottom: 10,
    marginTop: 10,
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
    color: '#0D90D0',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#8AC440',
    // borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
});

export default Menu;
