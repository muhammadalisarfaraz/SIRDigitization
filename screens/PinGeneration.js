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
*/
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from 'react-native-input-spinner';

 const base64 = require('base-64');

import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';

function PinGeneration({navigation}) {
  const [user, setUser] = useState('');
  const [loader, setLoader] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);

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
   }, []);
   

  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator
          color="#1191D0"
          size="small"
          style={{marginTop: 100}}
        />
      ) : (
        <View />
      )}
      {pendingOrders.length > 0 ? (
        <View />
      ) : (
        <Text style={{marginTop: 100}}>No Consumption to Show</Text>
      )}
      <FlatList
        style={{flex: 1, width: '100%', marginTop: 80}}
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
                  show: true,
                  user: user.ImUser,
                  refresh: () => {
                    getPendingOrders();
                  },
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
                    {'Project : ' + item.ProjectName}
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
                    {'DTS : \n' + item.DtsId}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />
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
                    {'PQC : \n' + item.PqcName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 13,
                    }}>
                    {'Feeder : \n' + item.FdrName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: '#0A8FCF',
                    }}
                  />
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
                  {/* <View
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
                        fontSize: 16,
                        color: item.Reverted == 'A' ? 'green' : '#F6921E',
                      }}>
                      {item.Reverted == 'A'
                        ? 'Approved'
                        : item.Reverted == 'P'
                        ? 'Pending'
                        : item.Reverted == 'R'
                        ? 'Reverted'
                        : 'N/A  '}
                    </Text>
                  </View> */}
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
                        marginLeft: 5,
                        fontSize: 13,
                      }}>
                      {'ID : ' + item.PerformaId}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#0A8FCF',
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
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: '85%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          onPress={() => {
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
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Pending</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Work Orders</Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          onPress={() => {
            navigation.navigate('History');
          }}>
          <Text style={{color: '#0A8FCF'}}>History </Text>
        </TouchableOpacity>
      </View>
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

export default PinGeneration;
