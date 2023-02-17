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
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigationState} from '@react-navigation/native';
//import axios from 'axios';

let i = 0;
let j = 10;
let dataslice;

function Update1({route, navigation}) {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [completeData, setCompleteData] = useState([]);

  const loadData = val => {
    console.log('values == >', i, j);
    setLoading(true);
    let data1;

    AsyncStorage.getItem('SafetyHazard').then(items => {
      var data = [];

      data = items ? JSON.parse(items) : {};
      // alert(data.length);
      //      console.log('data', data);
      setCompleteData(data);

      data1 = data.filter(x => x.Status == 'Pending');
      //  console.log("data1", data1);

      if (val) {
        i += 10;

        dataslice = data1.splice(i, j);
        console.log('if', dataslice);

        setLoading(false);
      } else {
        i = 0;
        j = 10;

        dataslice = data1.splice(i, j);
        console.log('else', dataslice);
        setLoading(false);
      }

      console.log('data', i, j);
      settableData([...tableData, ...dataslice]);
      settemptableData([...temptableData, ...dataslice]);
      setLoader(false);
    });
  };

  useEffect(() => {
    setLoader(true);

    navigation.addListener('focus', payload => {
      loadData();
    });

    loadData();
  }, []);

  const searchFilterFunction = text => {
    setRefresh(true);
    // console.log("temptableData", temptableData);
    if (text == '' || text == null) {
      // setRefresh(true);
      //alert('');
      console.log('if statement', tableData);
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    } else {
      var arrayholder = completeData;

      //  console.log("arrayholder", temptableData);

      const newData = arrayholder.filter(item => {
        const itemData = `${item.PremiseConsumerNumber.toUpperCase()}  ${item.AccidentLocationAddress.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      console.log('else statement', tableData);
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/Pic4.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}> */}
      <TextInput
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}
        placeholder="Search"
        placeholderTextColor="black"
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
          color: 'black',

          elevation: 4,
        }}
      />
      {loader ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{flex: 1, width: '100%'}}
          data={tableData.length > 0 ? tableData : 0}
          //data.splice(index, 1);0
          extraData={tableData}
          keyExtractor={item => item.id}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          // onEndReachedThreshold={0.5}
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
                    <TouchableOpacity onPress={() => loadData('more')}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Load More
                      </Text>
                      {loading ? (
                        <ActivityIndicator
                          color="black"
                          style={{marginLeft: 8}}
                        />
                      ) : null}
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )
                ) : (
                  <Text>No Record to Show</Text>
                )}
              </View>
            );
          }}
          renderItem={({item, index}) => {
            // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

            return (
              <Swipeable
                rightButtons={[
                  <TouchableOpacity
                    style={{
                      width: 80,
                      marginVertical: 17,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                    onPress={() => {
                      setLoader(true);
                      let data = tableData;
                      data.splice(index, 1);
                      // alert(index);
                      settableData(data);
                      AsyncStorage.setItem(
                        'SafetyHazard',
                        JSON.stringify(data),
                      ).then(() => {
                        //route.params.update();

                        setLoader(false);
                      });

                      // setTimeout(() => {
                      //   setLoader(false);
                      // }, 500);
                    }}>
                    {
                      <Image
                        style={{height: 30, width: 30}}
                        source={require('../assets/dustbin.png')}
                      />
                    }
                    <Text style={{color: 'black'}}>Delete</Text>
                  </TouchableOpacity>,
                ]}>
                <TouchableOpacity
                  // disabled={true}
                  onPress={() => {
                    //  alert('asdfasd');
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Safety Hazards Detail'}],
                    });
                    navigation.navigate('Safety Hazards Detail', {
                      data: item,
                      index: index,
                    });
                  }}
                  style={{
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 15,
                    // marginHorizontal:2,
                    marginVertical: 8,
                    width: '96%',
                    justifyContent: 'center',
                    borderWidth: 1,

                    borderColor: '#ddd',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.8,
                    shadowRadius: 15,
                    elevation: 10,
                    // borderBottomColor: 'grey',
                    // borderBottomWidth: 0.5,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: 'rgba(248,147,30,255)', //backgroundColor: '#1565C0',
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
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#FFFFFF', //'#FFFFFF',
                          marginBottom: 4,
                        }}>
                        {item.PremiseConsumerNumber}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 10,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          color: 'black',
                          fontSize: 13,
                        }}>
                        {'PMT: ' + item.PMT}
                      </Text>

                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 13,
                          color: 'black',
                          //backgroundColor: 'black',
                        }}>
                        {'Address: ' + item.AccidentLocationAddress}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
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
                          // backgroundColor: '#0873C3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 90,
                          width: 140,
                          marginRight: 10,
                          borderRadius: 15,
                        }}>
                        <Text
                          style={{
                            marginLeft: 70,
                            fontSize: 13,
                            color: 'black',
                          }}></Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#0873C3',
                          }}
                        />
                      </View>
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
                          // backgroundColor: '#0873C3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 65,
                          width: 180,
                          borderRadius: 15,
                        }}>
                        <View
                          style={{
                            // backgroundColor: '#0873C3',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 90,
                            width: 140,
                            marginRight: 10,
                            borderRadius: 15,
                            display: 'none',
                          }}>
                          <Text
                            style={{
                              marginLeft: 70,
                              fontSize: 13,
                              color: 'black',
                            }}></Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              color: '#0873C3',
                            }}
                          />
                        </View>

                        <TouchableOpacity
                          // disabled={loader}

                          //style={styles.loginBtn}
                          onPress={() => {
                            //alert('asfasf');

                            navigation.navigate('Edit Safety Hazard', {
                              data: item,
                              index: index,
                            });
                          }}>
                          {/*
                          <View
                            style={{
                              height: 30,
                              //width: '97%',
                              borderColor: 'white',
                              // height: 15,
                              width: 140,
                              borderRadius: 30,

                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                             
                              Edit Record
                            </Text>
                          </View>
                            */}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#1565C0',
                        flexDirection: 'row',
                        paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 140,
                        height: 40,
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
                        {'Dated : ' + item.SDate}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      )}
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', backgroundColor: '#fff'},
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
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 135,
    backgroundColor: '#1565C0',
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
    borderBottomRightRadius: 15,
  },
});

export default Update1;
