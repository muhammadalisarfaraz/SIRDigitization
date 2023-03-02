import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import Swipeable from 'react-native-swipeable';
import {FlatList} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import base64 from 'react-native-base64';
import Moment from 'moment';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [contractNo, setContractNo] = useState('');
  const [meterNo, setMeterNo] = useState('');

  const [ibcName, setIbcName] = useState();
  const [ibc, setIbc] = useState();
  const [Begru, setBegru] = useState();
  const [user, setUser] = useState();
  const [contractnumberError, setcontractnumberError] = useState('');
  var SystemMeterData = [];

  const [items, setItems] = useState([
    //        { label: '-- Please Select --', value: '', imageCount: 0 },
    {label: 'Ordinary', value: 'ORD'},
    {label: 'Below 40', value: 'B40'},
    {label: 'Above 40', value: 'A40'},
  ]);

  const getLoginCredentials = () => {
    AsyncStorage.getItem('LoginCredentials').then(items => {
      var data1 = [];
      data1 = items ? JSON.parse(items) : [];
      setIbc(data1[0].begru);
      setBegru(data1[0].begru);

      setUser(data1[0].User);
      setIbcName(data1[0].IBC_Name);
    });
  };

  const [SIRFormat, setSIRFormat] = useState('');
  useEffect(() => {
    getLoginCredentials();
    getApiData();
  }, []);

  const getMeterNo = (Sirnr, MIO_NAME, Meterno, AssignMio) => {
    console.log('getMeterNo:Service:Called');
    axios({
      method: 'get',
      url:
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_GET_VERTRAG_VIA_GERNR_SRV/ITABSet?$filter=Gernr%20eq%20%27' +
        Meterno +
        '%27%20&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            if (singleResult.Vertrag != '') {
              getContract(Sirnr, MIO_NAME, singleResult.Vertrag, AssignMio);
            } else {
              alert('No contract available against the Meter No');
              return false;
            }
          });
        }
      })

      .catch(error => {
        console.error('axios:getMeterNo:error: ' + error);
      });

    return;
  };
  const getContract = (Sirnr, MIO_NAME, ContractNo, AssignMio) => {
    console.log('getContract:Service:Called');
    let CustomData = [];
    let isSystemMeterServiceCall = false;
    axios({
      method: 'get',
      url:
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_UNPLANNED_GET_POST_SRV/ITABSet?$filter=Vertrag%20eq%20%27' +
        ContractNo +
        '%27%20and%20Sirnr%20eq%20%27' +
        Sirnr +
        '%27%20and%20SIR_FORMAT%20eq%20%27' +
        SIRFormat +
        '%27&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            if (singleResult.RESULT == 'Success') {
              CustomData.push({
                Vertrag: singleResult.Vertrag,
                Vkont: singleResult.Vkont,
                Erdat: Moment().format('YYYYMMDD'),
                AssignMio: singleResult.AssignMio,
                ADDRESS: singleResult.ADDRESS,
                NAME: singleResult.NAME,
                CONSUMER_NO: singleResult.CONSUMER_NO,
                Sirnr: Sirnr,
                Ibc: ibc,
                CLUSTER: singleResult.Cluster,
                AssignMio: AssignMio,
                MIO_NAME: MIO_NAME,
                CELL_NUMBER: singleResult.CELL_NUMBER,
                IBCNAME: ibcName,
                TARIFF: singleResult.TARIFTYP,
              });
              isSystemMeterServiceCall = true;
            } else {
              alert(singleResult.RESULT);
              isSystemMeterServiceCall = false;
              return false;
            }
          });
        }
      })
      .then(res => {
        console.log(CustomData);
        if (isSystemMeterServiceCall)
          getSystemMeter(ContractNo, CustomData, SIRFormat);
      })
      .catch(error => {
        console.error('axios:getContract:error: ' + error);
      });

    return;
  };

  const getApiData = async () => {
    console.log('get api data function');
    setLoader(true);
    try {
      // Saad Comment Loading PremiseType Data
      AsyncStorage.getItem('SIRDigitization').then(items => {
        var data = items ? JSON.parse(items) : [];
        data = data.filter(item => {
          return item.Random != '' && item.Status == '';
        });

        data = data.sort((a, b) => a.Erdat - b.Erdat);

        setPendingOrders(data);
        settemptableData(data);
        setLoader(false);
      });
    } catch (error) {
      alert(error);
      setLoader(false);
      // console.log('Error ', error);
    }
  };

  const getSystemMeter = (contract, CustomData, SIRFormat) => {
    let index = '';
    console.log('**** contract: ', contract);

    AsyncStorage.getItem('SystemMeter')
      .then(items => {
        SystemMeterData = items ? JSON.parse(items) : [];

        console.log('Screen:SystemMeterData.length: ' + SystemMeterData.length);
      })
      .then(item => {
        axios({
          method: 'get',
          url:
            'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DEVICE_METER_UNPLANNED_SRV/ITABSet?$filter=CONTRACT%20eq%20%27' +
            contract +
            '%27&$format=json',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
          },
        })
          .then(res => {
            if (res.data.d.results != []) {
              res.data.d.results.forEach(singleResult => {
                SystemMeterData.push({
                  CONTRACT: contract,
                  Anlage: singleResult.Anlage,
                  Geraet: singleResult.Geraet,
                  Kennziff: singleResult.Kennziff,
                  Herst: singleResult.Herst,
                  Rating: singleResult.Rating,
                  PVoltage: singleResult.PVoltage,
                  SVoltage: singleResult.SVoltage,
                  Tarifart: singleResult.Tarifart,
                  Preiskla: singleResult.Preiskla,
                  Ablbelnr: singleResult.Ablbelnr,
                  Ablesgr: singleResult.Ablesgr,
                  Adat: singleResult.Adat,
                  VZwstand: singleResult.VZwstand,
                  Istablart: singleResult.Istablart,
                  Ablstat: singleResult.Ablstat,
                  Voltage: singleResult.Voltage,
                  Phase: singleResult.Phase,
                  TARIFF: singleResult.TARIFTYP,
                });
                console.log(
                  'contract: ' + contract + ' Anlage: ' + singleResult.Anlage,
                );
              });
            }
          })
          .then(res => {
            AsyncStorage.setItem(
              'SystemMeter',
              JSON.stringify(SystemMeterData),
            );
            if (SIRFormat == 'ORD') {
              /*
              var filterData = CustomData.filter(item => {
                console.log(item);
              });
    */
              navigation.navigate('SIR Digitization Ordinary', {
                data: CustomData[0],
                index: index,
                otherParam: 'item.filterkey',
              });
            } else if (SIRFormat == 'B40') {
              navigation.navigate('Site Inspection Report', {
                data: CustomData[0],
                index: index,
                otherParam: 'item.filterkey',
              });
            } else if (SIRFormat == 'A40') {
              navigation.navigate('Site Inspection Above 40', {
                data: CustomData[0],
                index: index,
                otherParam: 'item.filterkey',
              });
            }
          })
          .catch(error => {
            console.error('axios:error:get System Meter: ' + error);
          });
      });
  };

  const searchFilterFunction = text => {
    //setRefresh(true);

    if (text == '' || text == null) {
      //setRefresh(true);
      setPendingOrders(temptableData);
      setTimeout(() => {
        //setRefresh(false);
      }, 1000);
    } else {
      var arrayholder = temptableData;

      const newData = arrayholder.filter(item => {
        const itemData = `${item.Erdat.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setPendingOrders(newData);
      setTimeout(() => {
        //setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <View style={{flex: 1, width: '100%'}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}>
          <View style={{flex: 1}}>
            <View style={{padding: 5}}></View>

            <View style={styles.dashboad}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '88%',
                  marginTop: 10,
                }}>
                <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      color: 'black',
                      marginTop: 15,
                    }}>
                    {' '}
                    SIR Format{' '}
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={item => {
                      console.log('onChangeValue: ' + item);
                      setSIRFormat(item);
                    }}
                    onSelectItem={item => {
                      // setSIRFormat(item.value);
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 0.5,
                  width: '88%',
                  marginTop: 2,
                }}>
                <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      color: 'black',
                      marginTop: 15,
                    }}>
                    {' '}
                    Contract No{' '}
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <TextInput
                    style={styles.inputLoadDetail}
                    placeholder={'Contract No'}
                    keyboardType={'numeric'}
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      if (text.length < 10) {
                        setcontractnumberError(true);
                      } else {
                        setcontractnumberError(false);
                      }
                      setContractNo(text);
                    }}
                    value={contractNo}
                  />
                  {contractnumberError ? (
                    <Text style={{marginBottom: 20, color: 'red'}}>
                      Contract must be 10 digits
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 0.5,
                  width: '88%',
                  marginTop: 2,
                }}>
                <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      color: 'black',
                      marginTop: 15,
                    }}>
                    {' '}
                    Meter No{' '}
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <TextInput
                    style={styles.inputLoadDetail}
                    placeholder={'Meter No'}
                    //keyboardType={'numeric'}
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      setMeterNo(text);
                    }}
                    value={meterNo}
                  />
                </View>
              </View>
              {/*
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  width: '88%',
                  marginTop: 2,
                }}>
                <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      color: 'black',
                      marginTop: 15,
                    }}>
                    {' '}
                    Consumer No
                  </Text>
                </View>
                <View style={{flex: 0.5}}>
                  <TextInput
                    style={styles.inputLoadDetail}
                    placeholder={'Consumer No'}
                    keyboardType={'numeric'}
                    placeholderTextColor="grey"
                    onChangeText={text => {
                      setConsumerNo(text);
                    }}></TextInput>
                </View>
              </View>
                  */}
            </View>

            <View style={{padding: 10}}></View>

            <View style={styles.searchView}>
              <Image
                style={{width: 26, height: 28}}
                source={require('../assets/search.png')}
              />
              <View>
                <TextInput
                  onChangeText={text => searchFilterFunction(text)}
                  autoCorrect={false}
                  placeholder="Search SIR"
                  placeholderTextColor="#1565C0"
                  style={{
                    // backgroundColor: '#C2C2C2',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    height: 40,
                    borderRadius: 25,
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                    width: '94%',
                    marginVertical: 10,
                    backgroundColor: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#1565C0',
                    // elevation: 4,
                  }}
                />
              </View>
            </View>

            {loader ? (
              <ActivityIndicator color="#1191D0" size="small" />
            ) : (
              <Animatable.View
                animation="fadeInUpBig"
                style={[
                  styles.footer,
                  {
                    backgroundColor: 'white', //colors.background
                  },
                ]}>
                <FlatList
                  style={{flex: 1, width: '100%'}}
                  data={pendingOrders.length > 0 ? pendingOrders : 0}
                  //data.splice(index, 1);0
                  extraData={pendingOrders}
                  keyExtractor={item => item.id}
                  // onEndReachedThreshold={0.5}
                  ListFooterComponent={() => {
                    return (
                      <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          marginBottom: 2,
                          height: 60,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {pendingOrders ? (
                          pendingOrders.length > 0 ? (
                            <TouchableOpacity
                              disabled={true}
                              onPress={() => loadData('more')}>
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
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              fontWeight: 'bold',
                            }}>
                            No Record to Show
                          </Text>
                        )}
                      </View>
                    );
                  }}
                  renderItem={({item, index}) => {
                    // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

                    return (
                      <Swipeable>
                        <TouchableOpacity
                          // disabled={true}
                          onPress={() => {
                            if (contractNo == '' && meterNo == '') {
                              alert('please provide contract or meter no');
                            } else {
                              if (contractNo != '' && contractNo.length > 9) {
                                getContract(
                                  item.Sirnr,
                                  item.MIO_NAME,
                                  contractNo,
                                  item.AssignMio,
                                );
                              } else if (meterNo != '') {
                                getMeterNo(
                                  item.Sirnr,
                                  item.MIO_NAME,
                                  meterNo,
                                  item.AssignMio,
                                );
                              }
                            }
                          }}
                          style={{
                            backgroundColor: '#f0f0f1',
                            alignSelf: 'center',
                            borderRadius: 15,
                            // marginHorizontal:2,
                            marginVertical: 3,
                            width: '100%',
                            justifyContent: 'center',
                            borderWidth: 1,

                            borderColor: 'black',
                            borderBottomWidth: 0,
                            shadowColor: 'black',
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
                                backgroundColor: '#1565C0',
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
                                  color: 'white', //'#FFFFFF',
                                  marginBottom: 4,
                                }}>
                                {'SIR No. : ' + item.Sirnr}
                              </Text>
                            </View>
                            <View
                              style={{
                                //  flex: 0.45,
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
                                {'MIO No. ' + item.AssignMio}
                              </Text>

                              <Text
                                style={{
                                  marginLeft: 5,
                                  fontSize: 13,
                                  color: 'black',
                                }}>
                                {'MIO Name : ' + item.MIO_NAME}
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
                                //backgroundColor: 'red',
                                flexDirection: 'row',
                                // paddingHorizontal: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                //paddingHorizontal: 15,
                                height: 65,
                                position: 'absolute',
                                borderBottomRightRadius: 15,
                                right: 5,
                                bottom: 40,
                              }}>
                              <Text
                                style={{
                                  // marginLeft: 5,
                                  fontSize: 13,
                                  //fontWeight: 'bold',
                                  color: 'black',
                                }}>
                                {'Create Date: ' +
                                  Moment(item.Erdat).format('DD.MM.YYYY')}
                              </Text>
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
                                  }}>
                                  {item.ActionType1}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#1565C0',
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
                                }}></View>
                            </View>

                            <View
                              style={{
                                backgroundColor: '#1565C0',
                                flexDirection: 'row',
                                // paddingHorizontal: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 15,
                                height: 34,
                                position: 'absolute',
                                borderBottomRightRadius: 15,
                                right: -5,
                                bottom: 0,
                              }}>
                              <Text
                                style={{
                                  // marginLeft: 5,
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: 'white', //'#FFFFFF',
                                  marginBottom: 4,
                                }}>
                                {'Category: Un-Planned'}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Swipeable>
                    );
                  }}
                />
              </Animatable.View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',

    //  alignItems: 'center',
    //    justifyContent: 'center'
  },

  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    // top:0,
    // color: '#0D90D0',
    backgroundColor: 'white',

    //elevation: 4,
    // shadowOffset: { width: 15, height: 15 },
    //  shadowColor: 'black',
    // shadowOpacity: 0.8,
    // shadowRadius: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  dashboad: {
    //height: 880,
    //marginLeft: 10,
    //width: '30%',
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    //elevation: 10,
  },

  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    //  fontSize: 30,
    textAlign: 'center',
  },
  text_footer: {
    color: '#05375a',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1565C0',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    marginLeft: 22,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 30,
    width: '90%',

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
  inputLoadDetail: {
    color: 'black',
    borderBottomWidth: 0.5,
  },
});
