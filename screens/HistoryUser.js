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
  AsyncStorage,
  Switch,
  Image,
  Picker,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Moment from 'moment';

import Swipeable from 'react-native-swipeable';
/*import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
*/import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from 'react-native-input-spinner';

import RNFetchBlob from 'rn-fetch-blob';
const base64 = require('base-64');

import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';

function HistoryUser({navigation}) {
  const [user, setUser] = useState('');
  const [loader, setLoader] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [temptableData, setTemptableData] = useState([]);

  const searchFilterFunction = text => {
    // setRefresh(true);
    if (text == '' || text == null) {
      // setRefresh(true);
      setPendingOrders(temptableData);
      // setTimeout(() => {
      //   setRefresh(false);
      // }, 1000);
    }

    // settemptableData(tableData);
    else {
      var arrayholder = temptableData;
      const newData = arrayholder.filter(item => {
        const itemData = `${item.SDate.toUpperCase()} ${item.Aufnr.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setPendingOrders(newData);
      // setTimeout(() => {
      //   setRefresh(false);
      // }, 1000);
    }
    // this.setState({data: newData});
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
  useEffect(() => {
    //getPendingOrders();

    AsyncStorage.getItem('RoshniBajiA').then(items => {
      var data = items ? JSON.parse(items) : [];

      setPendingOrders(data);
      setLoader(false);
      console.log("data:**************************",(setPendingOrders));
      
      
      
    });

  }, []);
  function getPendingOrders() {
    setLoader(true);
    setPendingOrders('');
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
            'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_ORDERS_HISTSet?$filter=User%20eq%20%27' +
              data.ImUser +
              '%27%20and%20UserType%20eq%20%27U%27%20and%20FromDate%20eq%20%2720200101%27%20and%20ToDate%20eq%20%2799991231%27&&$format=json',
            {
             //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
              'Content-Type': 'application/json; charset=utf-8',
            },
          )
          .then(res => res.json())
          .then(res => {
            let pendingOrder = res.d.results;
            pendingOrder.sort((a, b) => b.SDate - a.SDate);
            pendingOrder.sort((a, b) => b.Aufnr - a.Aufnr);
            setPendingOrders(pendingOrder);
            setTemptableData(pendingOrder);
            console.log(pendingOrders);
            setLoader(false);
          })
          .catch(error => {
            setPendingOrders('');
            setLoader(false);
            alert('Something went wrong! Please check internet connectivity.');
          });
      })
      .catch(error => {
        setPendingOrders('');
        setLoader(false);
        alert('Something went wrong! Please check internet connectivity.');
      });
  }

  return (
    <View style={styles.container}>
      {pendingOrders.length == 0 ? (
        <View />
      ) : (
        <TextInput
          onChangeText={text => searchFilterFunction(text)}
          autoCorrect={false}
          placeholder="Search"
          style={{
            backgroundColor: '#C2C2C2',
            textAlignVertical: 'center',
            fontSize: 16,
            height: 40,
            borderRadius: 25,
            paddingHorizontal: 20,
            alignSelf: 'center',
            width: '94%',
            marginVertical: 10,
            elevation: 4,
          }}
        />
      )}
      {loader ? (
        <ActivityIndicator
          color="#1191D0"
          size="small"
          style={{marginTop: 10}}
        />
      ) : (
        <View />
      )}
      {pendingOrders.length > 0 ? (
        <View />
      ) : (
        <Text style={{marginTop: 10}}>No Pending to Show</Text>
      )}
      <FlatList
        style={{flex: 1, width: '100%', marginTop: 10}}
        data={pendingOrders}
        extraData={pendingOrders}
        keyExtractor={item => item.id}
        renderItem={({item, index, separators}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WorkOrderDetails', {
                  data: item,
                  index: index,
                  show: false,
                });
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginVertical: 6,
                }}>
                <View
                  style={{
                    backgroundColor: '#0A8FCF',
                    flexDirection: 'row',
                    // paddingHorizontal: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                    height: 34,
                    position: 'absolute',
                    borderBottomLeftRadius: 15,
                    left: -1,
                    bottom: 0,
                  }}>
                  <Text
                    style={{
                      // marginLeft: 5,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      marginBottom: 4,
                    }}>
                    {'Consumer : ' + item.KEaccountnumber}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.45,
                    paddingLeft: 10,
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 13,
                    }}>
                    {'DTS : \n' + item.KEaccountnumber}
                  </Text>
                  {/* <Text
                        style={{
                          fontSize: 2,
                          fontWeight: 'bold',
                          color: '#0A8FCF',
                        }}
                      /> */}
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 13,
                    }}>
                    {'PQC : \n' + item.KEaccountnumber}
                  </Text>

                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 13,
                    }}>
                    {'ID : ' + item.KEaccountnumber}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />

                  {/* {!refresh ? (
                    <ActivityIndicator />
                  ) : selectedsub.name == 'OMR' ? (
                    <Switch
                      value={item.services}
                      onValueChange={value => {
                        // alert(tableData[index].services)
                        setRefresh(false);
                        var data = tableData;
                        data[index].services = value;
                        settableData(data);
                        setRefresh(true);
                        // useEffect()
                      }}
                      onChange={() => {}}
                      style={{alignSelf: 'flex-start'}}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#0A8FCF',
                      }}
                    />
                  )} */}
                </View>
                <View
                  style={{
                    flex: 0.55,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    // marginBottom: 6,
                  }}>
                  <View
                    style={{
                      // backgroundColor: '#0A8FCF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 60,
                      width: 140,
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 13,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#0A8FCF',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // backgroundColor: '#0A8FCF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 60,
                      width: 140,
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 13,
                      }}>
                      {'Feeder : \n' + item.KEaccountnumber}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#0A8FCF',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // backgroundColor: '#0A8FCF',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 60,
                      width: 140,
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#0A8FCF',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: item.Reverted == 'A' ? '#8AC440' : '#F6921E',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 34,
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 140,
                      borderBottomRightRadius: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      {item.Reverted == 'A'
                        ? 'Approved'
                        : item.Reverted == 'P'
                        ? 'Pending'
                        : item.Reverted == 'R'
                        ? 'Reverted'
                        : 'N/A  '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    flexDirection: 'row',
                    paddingHorizontal: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 140,
                    height: 34,
                    position: 'absolute',
                    borderTopRightRadius: 15,
                    right: -1,
                  }}>
                  <Text
                    style={{
                      // marginLeft: 5,
                      fontSize: 13,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    {'Dated : ' + Moment(item.SDate).format('DD-MMM-YYYY')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
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
    width: '45%',
    backgroundColor: '#465881',
    // borderRadius: 25,
    height: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
});

export default HistoryUser;
