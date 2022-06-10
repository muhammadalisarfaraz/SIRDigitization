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
  Switch,
  Picker,
  ScrollView,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import Moment from 'moment';

const base64 = require('base-64');
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
import {FlatList} from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';

// import { Dropdown } from 'react-native-material-dropdown';
// import ModalDropdown from 'react-native-modal-dropdown';
// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');

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
// setSelectedValue(detail.Dts);
// setSelectedFeeder(detail.Fdr);
// setSelectedPQC(detail.Pqc);
// setSelectedProject(detail.Project);
// setSelectedsub(detail.SubProj);
// settableData(detail.WO_MATERIALSSet);
// setPMT(detail.PmtName);
// setDate(detail.Date);
function WorkOrderDetails({navigation, route}) {
  const [name, setName] = useState();
  const [PMT, setPMT] = useState([]);
  const [DTSData, setDTSData] = useState([]);
  const [FeederData, setFeederData] = useState([]);
  const [PQCData, setPQCData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);
  const [SubProjectsData, setSubProjectsData] = useState([]);
  const [FilteredSubProjectsData, setFilteredSubProjectsData] = useState([]);
  const [MaterialsData, setMaterialsData] = useState([]);
  const [userPassword, setUserPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedFeeder, setSelectedFeeder] = useState([]);
  const [selectedPQC, setSelectedPQC] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedsub, setSelectedsub] = useState([]);
  const [loader, setLoader] = useState(false);
  const [tableData, settableData] = useState([]);
  const [meterData, setmeterData] = useState([]);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);
  const [date, setDate] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [indexer, setIndexer] = useState(0);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isload, setisload] = useState(false);
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [error, setError] = useState('');
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [isPinModalVisible1, setPinModalVisible1] = useState(false);
  const [FilteredDtsData, setFilteredDtsData] = useState([]);
  const [details, setDetails] = useState({});
  const [selectedWBS, setSelectedWBS] = useState('');
  const [selectedAprrover, setSelectedAprrover] = useState('');
  const [User, setUser] = useState({});
  const [Password, setPassword] = useState('');
  const [remarks, setRemarks] = useState('');
  const [WbsData, setWbsData] = useState([]);
  const [ApproversData, setApproversData] = useState([]);
  const [ShowButton, setShowButton] = useState(false);
  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']];isSuccessModalVisible remarks

  useEffect(() => {
    setisload(true);
    let detail = route.params.data;
    let show = route.params.show;
    let user = route.params.user;
    setDetails(detail);
    setUser(user);
    let datee = Moment(detail.CDate).format('DD-MMM-YYYY');
    setDate(datee);
    setSelectedFeeder(detail.FdrName);
    setSelectedValue(detail.DtsId);
    setSelectedPQC(detail.PqcName);
    setSelectedProject(detail.ProjectName);
    setSelectedsub(detail.SubProj);
    console.log('details', detail);
    setShowButton(show);
    // alert(JSON.stringify(route.params.data));

    var urlid = show ? detail.PerformaId : detail.Aufnr;
    console.log(
      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_MATERIALSet?$filter=PerformaId%20eq%20%27' +
        detail.PerformaId +
        '%27&&$format=json',
    );
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_MATERIALSet?$filter=PerformaId%20eq%20%27' +
          detail.PerformaId +
          '%27&&$format=json',
        {
         //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        let materails = res.d.results;
        let sorted = materails.sort(function(a, b) {
          return b.ReqQty - a.ReqQty;
        });
        settableData(sorted);
        console.log(sorted);
        setisload(false);
      })
      .catch(error => {
        // setPendingOrders('');
        console.log(error);
        setisload(false);
        alert('Something went wrong! Please check internet connectivity.');
      });
    setisload(true);
    RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'GET',
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/GET_PENDING_MAPPINGSet?$filter=PerformaId%20eq%20%27' +
          detail.PerformaId +
          '%27&&$format=json',
        {
         //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
          'Content-Type': 'application/json; charset=utf-8',
        },
      )
      .then(res => res.json())
      .then(res => {
        let meters = res.d.results;
        setmeterData(meters);
        console.log('meters', meters);
        setisload(false);
      })
      .catch(error => {
        // setPendingOrders('');
        console.log(error);
        setisload(false);
        alert('Something went wrong! Please check internet connectivity.');
      });
  }, []);
  return (
    <View style={{flex: 1, width: '100%'}}>
      {refresh ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1, width: '100%'}}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Date</Text>

            <DatePicker
              style={{
                width: '100%',
                marginBottom: 10,
                marginTop: 10,
                height: 50,
                fontSize: 16,
              }}
              date={date}
              disabled={true}
              mode="date"
              placeholder="Select Date"
              format="DD-MMM-YYYY"
              minDate="01-Dec-2019"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //   position: 'absolute',
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  height: 0,
                  width: 0,
                },
                dateText: {
                  fontSize: 16,
                  color: 'black',
                  textAlign: 'left',
                },
                dateInput: {
                  marginLeft: 10,
                  width: '80%',
                  height: 50,
                  fontSize: 16,
                  borderColor: 'black',
                  borderWidth: 0.8,
                  textAlign: 'left',
                },
                placeholderText: {
                  fontSize: 16,
                  color: 'grey',
                  textAlign: 'left',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => setDate(date)}
            />
            {/* <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Workorder Name
              </Text>
              <TextInput
                // selectedValue={selectedFeeder}
                value={PMT}
                disabled={true}
                onChangeText={text => setPMT(text)}
                style={{
                  height: 50,
                  width: '100%',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                }}
                placeholder={'Enter Text'}
              />
            </View> */}
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Feeder</Text>
              <Text
                style={{
                  padding: 12,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  fontSize: 16,
                  color: 'black',
                  fontSize: 14,
                  margin: 5,
                }}>
                {selectedFeeder}
              </Text>

              {/* <Text style={{marginBottom: 10, color: 'green'}}>
                {selectedFeeder.name}
              </Text> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>DTS</Text>
              <Text
                style={{
                  padding: 12,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  fontSize: 16,
                  color: 'black',
                  fontSize: 14,
                  margin: 5,
                }}>
                {selectedValue}
              </Text>
              {/* <Text style={{marginBottom: 10, color: 'green'}}>
                {selectedValue.name}
              </Text> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>PQC</Text>
              <Text
                style={{
                  padding: 12,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  fontSize: 16,
                  color: 'black',
                  fontSize: 14,
                  margin: 5,
                }}>
                {selectedPQC}
              </Text>
              {/* <Text style={{marginBottom: 10, color: 'green'}}>
                {selectedPQC.name}
              </Text> */}
            </View>

            <View
              style={{
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Project</Text>
              <Text
                style={{
                  padding: 12,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  fontSize: 16,
                  color: 'black',
                  fontSize: 14,
                  margin: 5,
                }}>
                {selectedProject}
              </Text>
              {/* <Text style={{marginBottom: 10, color: 'green'}}>
                {selectedProject.name}
              </Text> */}
            </View>
            <View
              style={{
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            <View style={{}}>
              {FilteredSubProjectsData != [] ||
              FilteredSubProjectsData != '' ||
              FilteredSubProjectsData != {} ? (
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    Sub Project
                  </Text>
                  <Text
                    style={{
                      padding: 12,
                      borderWidth: 0.8,
                      borderColor: 'black',
                      fontSize: 16,
                      color: 'black',
                      fontSize: 14,
                      margin: 5,
                    }}>
                    {selectedsub}
                  </Text>
                  {/* <Text style={{marginBottom: 10, color: 'green'}}>
                    {selectedsub.name}
                  </Text> */}

                  {/* <Picker
              selectedValue={selectedsub}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => {
                var arr = [];
                settableData(arr);

                setSelectedsub(itemValue);
                MaterialsData.filter(obj =>
                  obj.SubProj.includes(itemValue),
                ).map((obj, index) => {
                  //   setselectedMaterialDetail([
                  //   material[index].Matnr,
                  //   material[index].Maktx,
                  //   material[index].Meins,
                  //   '1',
                  // ]);
                  if (itemValue == 'OMR') {
                    arr.push([
                      MaterialsData[index].Matnr,
                      MaterialsData[index].Maktx,
                      MaterialsData[index].Meins,
                      '',
                      '0',
                    ]);
                  } else {
                    arr.push([
                      MaterialsData[index].Matnr,
                      MaterialsData[index].Maktx,
                      MaterialsData[index].Meins,
                      '0',
                    ]);
                  }
                });
                console.log(arr);
                settableData(arr);
              }}>
              {SubProjectsData.filter(obj =>
                obj.ProjId.includes(selectedProject),
              ).map(obj => {
                return <Picker.Item label={obj.SubProj} value={obj.SubProj} />;
              })}
            </Picker> */}
                </View>
              ) : (
                <View />
              )}
            </View>
            <View
              style={{
                height: 0.5,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'black',
                marginVertical: 10,
              }}
            />
            {details.Reverted == 'R' ? (
              <View>
                <View style={{}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, color: 'red'}}>
                    Remarks
                  </Text>
                  <Text
                    style={{
                      padding: 12,
                      borderWidth: 0.8,
                      borderColor: 'red',
                      fontSize: 16,
                      // color: 'black',
                      fontSize: 14,
                      margin: 5,
                      color: 'red',
                      height: 100,
                    }}>
                    {details.RevertRemarks}
                  </Text>
                  {/* <Text style={{marginBottom: 10, color: 'green'}}>
                {selectedPQC.name}
              </Text> */}
                </View>
                <View
                  style={{
                    height: 0.5,
                    width: '80%',
                    alignSelf: 'center',
                    backgroundColor: 'black',
                    marginVertical: 10,
                  }}
                />
              </View>
            ) : (
              <View />
            )}
            {/* <ModalDropdown options={["DTS-000000","DTS-000001","DTS-000002","DTS-000004","DTS-001660","DTS-003584","DTS-003657","DTS-52010","DTS-52011","DTS-525411","DTS-525412","DTS-525413","DTS-525414","DTS-525415","DTS-525416","DTS-525417","DTS-525418","DTS-525419","DTS-525420","DTS-525421","DTS-525422","DTS-525424","DTS-525425"]}/> */}
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Performa</Text>
            <View />
            {isload ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={{flex: 1, width: '100%'}}
                // scrollEnabled={false}
                data={tableData}
                extraData={tableData}
                keyExtractor={item => item.id}
                // ListFooterComponent={() => {
                //   return (
                //     <View
                //       style={{
                //         width: '90%',
                //         alignSelf: 'center',
                //         marginBottom: 20,
                //         height: 60,
                //         flexDirection: 'row',
                //         alignItems: 'center',
                //         justifyContent: 'space-between',
                //       }}>
                //       <TouchableOpacity
                //         style={{
                //           width: '45%',
                //           height: 45,
                //           borderColor: '#1191D0',
                //           borderWidth: 0.8,
                //           marginTop: 15,
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           backgroundColor: '#1191D0',
                //           // marginBottom:60
                //         }}
                //         onPress={() => {
                //           AsyncStorage.getItem('Workorders')
                //             .then(items => {
                //               var data = [];
                //               data = items ? JSON.parse(items) : [];
                //               data = [
                //                 ...data,
                //                 {
                //                   Date: date,
                //                   PmtName: PMT,
                //                   Dts: selectedValue,
                //                   Fdr: selectedFeeder,
                //                   Pqc: selectedPQC,
                //                   Project: selectedProject,
                //                   SubProj: selectedsub,
                //                   WO_MATERIALSSet: tableData,
                //                 },
                //               ];

                //               AsyncStorage.setItem('Workorders', JSON.stringify(data));
                //               alert('Saved Locally Successfully');
                //               navigation.goBack();
                //             })
                //             .catch(err => {
                //               alert(JSON.stringify(err));
                //             });
                //         }}>
                //         <Text style={{fontSize: 16, color: 'white'}}>Save</Text>
                //       </TouchableOpacity>
                //       <TouchableOpacity
                //         style={{
                //           width: '45%',
                //           height: 45,
                //           borderColor: '#1191D0',
                //           borderWidth: 0.8,
                //           marginTop: 15,
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           backgroundColor: '#1191D0',
                //           // marginBottom:60
                //         }}
                //         onPress={() => {}}>
                //         <Text style={{fontSize: 16, color: 'white'}}>Upload</Text>
                //       </TouchableOpacity>
                //     </View>
                //   );
                // }}
                renderItem={({item, index, separators}) => {
                  // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');
                  return (
                    <View
                      style={{
                        height: selectedsub.name == 'OMR' ? 140 : 100,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        borderRadius: 15,
                        // marginHorizontal:2,
                        marginVertical: 8,
                        backgroundColor: item.ReqQty > 0 ? 'white' : 'tan',
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
                            flex: 0.55,
                            paddingLeft: 10,
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#0A8FCF',
                              marginBottom: 4,
                            }}>
                            {'Item : ' + item.Matnr}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 13,
                            }}>
                            {'Desc : \n' + item.Maktx}
                          </Text>

                          {loader ? (
                            indexer == index ? (
                              <ActivityIndicator
                                style={{alignSelf: 'flex-start'}}
                              />
                            ) : item.Type == 'X' ? (
                              <View style={{flexDirection: 'row'}}>
                                <Switch
                                  value={
                                    tableData[index].GrRcpt == 'Services'
                                      ? true
                                      : false
                                  }
                                  onValueChange={value => {
                                    // alert(tableData[index].services)
                                    setIndexer(index);
                                    setLoader(true);
                                    var data = tableData;
                                    data[index].GrRcpt =
                                      value == true ? 'Services' : 'Sub-Mains';
                                    settableData(data);
                                    setTimeout(() => {
                                      setLoader(false);
                                    }, 100);
                                    // useEffect() 188991  5711  rehan
                                  }}
                                  // onChange={() => {

                                  // }}
                                  style={{alignSelf: 'flex-start'}}
                                />
                                <Text
                                  style={{
                                    color:
                                      tableData[index].GrRcpt == 'Sub-Mains'
                                        ? 'red'
                                        : 'green',
                                  }}>
                                  {tableData[index].GrRcpt == 'Services'
                                    ? 'Services'
                                    : 'Sub-Mains'}
                                </Text>
                              </View>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#0A8FCF',
                                }}
                              />
                            )
                          ) : item.Type == 'X' ? (
                            selectedsub.name == 'OMR' ? (
                              <View style={{flexDirection: 'row'}}>
                                <Switch
                                  value={
                                    tableData[index].GrRcpt == 'Services'
                                      ? true
                                      : false
                                  }
                                  onValueChange={value => {
                                    // alert(tableData[index].services)
                                    setIndexer(index);

                                    setLoader(true);
                                    var data = tableData;
                                    data[index].GrRcpt =
                                      value == true ? 'Services' : 'Sub-Mains';
                                    settableData(data);
                                    setTimeout(() => {
                                      setLoader(false);
                                    }, 100);
                                    // useEffect()
                                  }}
                                  onChange={() => {}}
                                  style={{alignSelf: 'flex-start'}}
                                />
                                <Text
                                  style={{
                                    color:
                                      tableData[index].GrRcpt == 'Sub-Mains'
                                        ? 'red'
                                        : 'green',
                                  }}>
                                  {tableData[index].GrRcpt == 'Services'
                                    ? 'Services'
                                    : 'Sub-Mains'}
                                </Text>
                              </View>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  color: '#0A8FCF',
                                }}
                              />
                            )
                          ) : (
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: '#0A8FCF',
                              }}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flex: 0.45,
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
                            {details.Reverted == 'R' ? (
                              <InputSpinner
                                max={9999}
                                min={0}
                                step={1}
                                height={40}
                                width={120}
                                initialValue={tableData[index].ReqQty}
                                editable={false}
                                // disabled={true}
                                onBlur={() => {
                                  var data = tableData;
                                  settableData(data);
                                }}
                                value={tableData[index].ReqQty}
                                onChange={num => {
                                  // console.log(num);
                                  // setRefresh(false);
                                  var data = tableData;
                                  // settableData([]);
                                  data[index].ReqQty = num.toString();
                                  // alert(JSON.stringify(data));
                                  settableData(data);
                                  // setRefresh(true);
                                }}
                              />
                            ) : (
                              <InputSpinner
                                max={9999}
                                min={0}
                                step={1}
                                height={40}
                                width={120}
                                initialValue={tableData[index].ReqQty}
                                editable={false}
                                color={'#0A8FCF'}

                                disabled={true}
                                onBlur={() => {
                                  var data = tableData;
                                  settableData(data);
                                }}
                                value={tableData[index].ReqQty}
                                onChange={num => {
                                  // console.log(num);
                                  // setRefresh(false);
                                  var data = tableData;
                                  // settableData([]);
                                  data[index].ReqQty = num.toString();
                                  // alert(JSON.stringify(data));
                                  settableData(data);
                                  // setRefresh(true);
                                }}
                              />
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            flexDirection: 'row',
                            paddingHorizontal: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
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
                              color: 'rgba(0,0,0,0.5)',
                            }}>
                            {'Unit : ' + item.Meins}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
            {meterData.length != 0 ? (
              <Text style={{fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>
                Meter Number
              </Text>
            ) : (
              <View />
            )}
            {isload ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={{flex: 1, width: '100%'}}
                data={meterData}
                extraData={meterData}
                keyExtractor={item => item.id}
                // ListHeaderComponent={() => {
                //   return (
                //     <View
                //       style={{
                //         marginTop: 40,
                //         width: '90%',
                //         alignSelf:'center',
                //         flexDirection: 'row',
                //         alignItems: 'center',
                //         justifyContent: 'space-between',
                //       }}>
                //       <TouchableOpacity
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //         }}
                //         onPress={() => {
                //           swiper.current.scrollBy(-1, true);
                //         }}>
                //         <Image
                //           style={{height: 28, width: 28}}
                //           source={require('../assets/previous.png')}
                //         />
                //         <Text
                //           style={{
                //             color: '#1191D0',
                //             fontSize: 16,
                //           }}>
                //           Prev
                //         </Text>
                //       </TouchableOpacity>
                //       <View />
                //     </View>
                //   );
                // }}
                // ListFooterComponent={() => {
                //   return (
                //     <View
                //       style={{
                //         width: '90%',
                //         alignSelf: 'center',
                //         marginBottom: 20,
                //         height: 60,
                //         flexDirection: 'row',
                //         alignItems: 'center',
                //         justifyContent: 'space-between',
                //       }}>
                //       <TouchableOpacity
                //         style={{
                //           width: '45%',
                //           height: 45,
                //           borderColor: '#1191D0',
                //           borderWidth: 0.8,
                //           marginTop: 15,
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           backgroundColor: '#1191D0',
                //           // marginBottom:60
                //         }}
                //         onPress={() => {
                //           setError('');
                //           setPassword('');
                //           setAuthModalVisible(true);
                //         }}>
                //         <Text style={{fontSize: 16, color: 'white'}}>Save</Text>
                //       </TouchableOpacity>
                //       <TouchableOpacity
                //         style={{
                //           width: '45%',
                //           height: 45,
                //           borderColor: '#1191D0',
                //           borderWidth: 0.8,
                //           marginTop: 15,
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           backgroundColor: '#1191D0',
                //           // marginBottom:60
                //         }}
                //         onPress={() => {
                //           // console.log(
                //           //   JSON.stringify({
                //           //     d: {
                //           //       LoggedId: User.ImUser,
                //           //       DtsId: selectedValue.dts_id,
                //           //       FdrId: selectedValue.feeder_id,
                //           //       Pqc: selectedPQC.v_id,
                //           //       PqcName: selectedPQC.name,
                //           //       ProjId: selectedProject.projid,
                //           //       ProjectName: selectedProject.name,
                //           //       SubProj: 'P03',
                //           //       AeName: User.ImUser,
                //           //       FdrName: selectedValue.feeder_desc,
                //           //       PmtName: PMT,
                //           //       CaseId: '1234',
                //           //       GridName: 'Test Grid',
                //           //       SDate: '20201202',
                //           //       CDate: '20201202',
                //           //       Return: '',
                //           //       WO_MATERIALSSet: tableData,
                //           //       WO_MAPPINGSSet: [],
                //           //     },
                //           //   }),
                //           // );
                //           setPinModalVisible(true);
                //         }}>
                //         <Text style={{fontSize: 16, color: 'white'}}>
                //           Send To PQC
                //         </Text>
                //       </TouchableOpacity>
                //     </View>
                //   );
                // }}
                renderItem={({item, index, separators}) => {
                  // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

                  return (
                    <View
                      style={{
                        height: 120,
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
                            flex: 1,
                            paddingLeft: 10,
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#0A8FCF',
                              marginBottom: 4,
                            }}>
                            {'Item : ' + item.Consumer}
                          </Text>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={{fontWeight: 'bold'}}>
                              Consumer No{' '}
                            </Text>

                            <Text
                              style={
                                {
                                  // borderBottomWidth: 1,
                                }
                              }>
                              {item.Matnr}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', width: '100%'}}>
                            <Text style={{fontWeight: 'bold'}}>Meter No </Text>

                            <Text
                              style={
                                {
                                  // borderBottomWidth: 1,
                                }
                              }>
                              {item.MeterNo}
                            </Text>
                          </View>
                          {/* <TextInput
                            placeholder={
                              MeterNoDataShow[index].Consumer == ''
                                ? 'Consumer No'
                                : MeterNoDataShow[index].Consumer
                            }
                            placeholderTextColor={
                              MeterNoDataShow[index].Consumer == ''
                                ? 'rgba(0,0,0,0.2)'
                                : '#000000'
                            }
                            // value={MeterNoDataShow[index].Consumer}
                            onChangeText={num => {
                              setRefresh(true);

                              var data = MeterNoDataShow;
                              // settableData([]);
                              data[index].Consumer = num.toString();
                              setMeterNoDataShow(data);
                              setRefresh(false);

                              // alert(JSON.stringify(data));
                              // var array = MeterNoDataShow;
                            }}
                            // onSubmitEditing={text => {
                            //   // setRefresh(true);
                            //   // var data = meterData;
                            //   // settableData([]);
                            //   // data[
                            //   //   index
                            //   // ].Consumer = text.toString().toLocaleUpperCase();
                            //   // alert(JSON.stringify(data));
                            //   // settableData(data);
                            //   // setRefresh(false);
                            // }}
                            style={{borderBottomWidth: 1, width: 100}}
                          /> */}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
            {ShowButton ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  // disabled={loader}
                  style={styles.loginBtn}
                  onPress={() => {
                    console.log('Login Pressed');

                    setPinModalVisible(true);

                    // postRequest(
                    //   item,
                    //   () => {
                    //     navigation.reset({
                    //       index: 0,
                    //       routes: [{name: 'MainList'}],
                    //     });
                    //   },
                    //   'Login',
                    //   name,
                    //   userPassword,
                    //   () => {
                    //     return setLoader(false);
                    //   },
                    // );
                  }}>
                  <Text style={{color: 'white', fontSize: 18}}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '45%',
                    height: 45,
                    borderColor: '#1191D0',
                    borderWidth: 0.8,
                    marginTop: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1191D0',
                    // marginBottom:60
                  }}
                  onPress={() => {
                    // setLoader(true);
                    setError('');
                    setPassword('');
                    setAuthModalVisible(true);
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>Revert</Text>
                </TouchableOpacity>
              </View>
            ) : details.Reverted == 'R' ? (
              <View
                style={{
                  height: 160,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View style={{height: 40, width: '100%'}} />
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 40,
                    borderColor: '#1191D0',
                    borderWidth: 0.8,
                    marginTop: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1191D0',
                    // marginBottom:60
                  }}
                  onPress={() => {
                    // console.log(
                    //   JSON.stringify({
                    //     d: {
                    //       LoggedId: User.ImUser,
                    //       DtsId: selectedValue.dts_id,
                    //       FdrId: selectedValue.feeder_id,
                    //       Pqc: selectedPQC.v_id,
                    //       PqcName: selectedPQC.name,
                    //       ProjId: selectedProject.projid,
                    //       ProjectName: selectedProject.name,
                    //       SubProj: 'P03',
                    //       AeName: User.ImUser,
                    //       FdrName: selectedValue.feeder_desc,
                    //       PmtName: PMT,
                    //       CaseId: '1234',
                    //       GridName: 'Test Grid',
                    //       SDate: '20201202',
                    //       CDate: '20201202',
                    //       Return: '',
                    //       WO_MATERIALSSet: tableData,
                    //       WO_MAPPINGSSet: [],
                    //     },
                    //   }),
                    // );
                    setPinModalVisible1(true);
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    Send to PQC
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{height: 50, width: '100%'}} />
            )}
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
              setModalVisible(!isSuccessModalVisible);
              setError('');
              route.params.refresh();
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            }}
          />
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isAuthModalVisible}>
        <View
          style={{
            width: '80%',
            height: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: 'green',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Are you sure you want to Revert?
          </Text>
          <TextInput
            // selectedValue={selectedFeeder}
            // value={remarks}
            onChangeText={text => setRemarks(text)}
            onFocus={() => {
              setError('');
            }}
            multiline={true}
            style={{
              height: 150,
              width: '90%',
              fontSize: 16,
              marginVertical: 10,
              borderWidth: 0.8,
            }}
            // secureTextEntry={true}
            placeholder={'Enter Remarks'}
            placeholderText={{fontSize: 16, color: 'grey'}}
          />

          {/* <TextInput
            // selectedValue={selectedFeeder}
            value={Password}
            onChangeText={text => setPassword(text)}
            onFocus={() => {
              setError('');
            }}
            style={{
              height: 50,
              width: '80%',
              fontSize: 16,
              marginBottom: 50,
              borderBottomWidth: 0.8,
            }}
            secureTextEntry={true}
            placeholder={'Enter Password'}
            placeholderText={{fontSize: 16, color: 'grey'}}
          />
          <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text> */}
          {uploading ? (
            <View
              style={{
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
              <Text style={{marginTop: 20}}>Loading...</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title=" Yes "
                color="green"
                onPress={() => {
                  setError('');

                  setUploading(true);
                  setUploadingMsg('');

                  RNFetchBlob.config({
                    trusty: true,
                  })
                    .fetch(
                      'GET',
                      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/PERFORMA_APPROVESet(Action=%27R%27,ApproverId=%27SALMAN%27,PerformaId=%27' +
                        details.PerformaId +
                        '%27,Remarks=%27' +
                        remarks +
                        '%27)?$format=json',
                      {
                       //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
                        'Content-Type': 'application/json; charset=utf-8',
                      },
                    )
                    .then(res => res.json())
                    .then(res => {
                      // alert(JSON.stringify(res));

                      //   setSuccessModalVisible(!isSuccessModalVisible);
                      setAuthModalVisible(!isAuthModalVisible);
                      console.log(res);
                      setUploadingMsg(res.d.ExMesg);
                      setUploading(false);
                      setSuccessModalVisible(!isSuccessModalVisible);
                      setError('');
                      setRemarks('');
                      route.params.refresh();
                      // setTimeout(() => {
                      //   navigation.goBack();
                      // }, 1000);
                      // setError('Unable to Upload');
                      // setModalVisible(true);.
                      // setLoader(false);
                      // // setItems(res.values);
                      // let SubProject = res.d.results;
                      // let arr = [];
                      // for (var i = 0; i < SubProject.length; i++) {
                      //   arr.push({
                      //     id: i,
                      //     name: SubProject[i].SubProj,
                      //     projid: SubProject[i].ProjId,
                      //     uri: SubProject[i].__metadata.uri,
                      //     type: SubProject[i].__metadata.type,
                      //     orgid: SubProject[i].__metadata.id,
                      //   });
                      // }
                      // // alert(JSON.stringify(SubProject));
                      // // console.log(JSON.stringify(SubProject))
                      // AsyncStorage.setItem('SubProject', JSON.stringify(arr));
                    })
                    .catch(error => {
                      // setLoader(false);
                      // setError('Unable to Upload');
                      setUploadingMsg('');

                      console.log(error);
                      setModalVisible(true);
                      setUploading(false);
                      setRemarks('');

                      alert(
                        'Something went wrong! Please check internet connectivity.    ' +
                          JSON.stringify(error),
                      );
                    });
                  // if (Password != User.ImPassword) {
                  //   setError('Password Incorrect');
                  //   return;
                  // } else {
                }}
                // }
              />

              <Button
                title=" No "
                color="red"
                onPress={() => {
                  setAuthModalVisible(!isAuthModalVisible);
                  setRemarks('');

                  // setError('');
                  // navigation.goBack();
                }}
              />
            </View>
          )}
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isPinModalVisible}>
        <View
          style={{
            width: '80%',
            height: 200,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: 'green',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Are you sure you want to Approve?
          </Text>

          {/* <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text> */}
          {uploading ? (
            <View
              style={{
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
              <Text style={{marginTop: 20}}>Loading...</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title=" Yes "
                color="green"
                onPress={() => {
                  setUploading(true);
                  setUploadingMsg('');

                  RNFetchBlob.config({
                    trusty: true,
                  })
                    .fetch(
                      'GET',
                      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/PERFORMA_APPROVESet(Action=%27A%27,ApproverId=%27SALMAN%27,PerformaId=%27' +
                        details.PerformaId +
                        '%27,Remarks=%27 %27)?$format=json',
                      {
                       //  Authorization: 'Basic ' + base64.encode('mm02:sapsap3'),
                        'Content-Type': 'application/json; charset=utf-8',
                      },
                    )
                    .then(res => res.json())
                    .then(res => {
                      // alert(JSON.stringify(res));
                      console.log(res);
                      setUploadingMsg(res.d.ExMesg);
                      setUploading(false);
                      setSuccessModalVisible(!isSuccessModalVisible);
                      setError('');
                      route.params.refresh();
                      // setTimeout(() => {
                      //   navigation.goBack();
                      // }, 1000);
                      // setError('Unable to Upload');
                      // setModalVisible(true);.
                      // setLoader(false);
                      // // setItems(res.values);
                      // let SubProject = res.d.results;
                      // let arr = [];
                      // for (var i = 0; i < SubProject.length; i++) {
                      //   arr.push({
                      //     id: i,
                      //     name: SubProject[i].SubProj,
                      //     projid: SubProject[i].ProjId,
                      //     uri: SubProject[i].__metadata.uri,
                      //     type: SubProject[i].__metadata.type,
                      //     orgid: SubProject[i].__metadata.id,
                      //   });
                      // }
                      // // alert(JSON.stringify(SubProject));
                      // // console.log(JSON.stringify(SubProject))
                      // AsyncStorage.setItem('SubProject', JSON.stringify(arr));
                    })
                    .catch(error => {
                      // setLoader(false);
                      // setError('Unable to Upload');
                      setUploadingMsg('');

                      console.log(error);
                      setModalVisible(true);
                      setUploading(false);
                      alert(
                        'Something went wrong! Please check internet connectivity.    ' +
                          JSON.stringify(error),
                      );
                    });
                }}
                // }
              />
              <Button
                title=" No "
                color="red"
                onPress={() => {
                  setUploadingMsg('');
                  setPinModalVisible(!isPinModalVisible);
                  // setError('');
                  // navigation.goBack();
                }}
              />
            </View>
          )}
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isPinModalVisible1}>
        <View
          style={{
            width: '80%',
            height: 300,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'green', fontSize: 18, fontWeight: 'bold'}}>
            Send for Approval
          </Text>
          <View style={{width: '100%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Approver</Text>
            <Text
              style={{
                width: '100%',
                borderWidth: 1,
                padding: 10,
                marginTop: 10,
              }}>
              {details.ApproverId}
            </Text>
            {/* <SearchableDropdown
              onItemSelect={item => {
                //  alert(JSON.stringify(item));
                console.log(item);
                setSelectedAprrover(item);
              }}
              // onRemoveItem={(item, index) => {
              //   setSelectedFeeder(null);
              // }}
              selectedItems={selectedAprrover}
              multi={false}
              containerStyle={{padding: 5}}
              itemStyle={{
                padding: 6,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: 'black',
                borderWidth: 0.8,
                // borderRadius: 5,
              }}
              itemTextStyle={{color: 'black', fontSize: 12}}
              itemsContainerStyle={{maxHeight: 100}}
              items={ApproversData}
              // defaultIndex={2}
              resetValue={false}
              textInputProps={{
                placeholder: 'Select WBS',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 6,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  fontSize: 13,
                  // borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            /> */}
            {/* <Picker
            selectedValue={selectedPQC}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
            {PQCData.map(data => {
              return <Picker.Item label={data.Name} value={data.Name} />;
            })}
          </Picker> */}
          </View>
          {/* <TouchableOpacity
          onPress={() => {
            swiper.current.scrollBy(1, true);
          }}>
          <Text>Next</Text>
        </TouchableOpacity> */}
          <Text style={{color: 'red', marginTop: 10}}>{error}</Text>

          {/* <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
            {error ? error : ''}
          </Text> */}
          {uploading ? (
            <View
              style={{
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
              <Text style={{marginTop: 20}}>Loading...</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                height: 50,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title=" Submit "
                color="green"
                onPress={() => {
                  setUploading(true);
                  setUploadingMsg('');
                  setError('');
                  var arr = [];
                  // alert(JSON.stringify(MaterialsData[0]));
                  var materials = tableData.map((obj, index) => {
                    //   setselectedMaterialDetail([
                    //   material[index].Matnr,
                    //   material[index].Maktx,
                    //   material[index].Meins,
                    //   '1',
                    // ]);
                    // alert(index)
                    console.log(obj);
                    if (item.name == 'OMR') {
                      arr.push({
                        // ...obj,
                        Matnr: obj.Matnr,
                        Maktx: obj.Maktx,
                        Meins: obj.Meins,
                        Type: obj.Type,
                        GrRcpt: obj.Type == 'X' ? 'Services' : 'Sub-Mains',
                        ReqQty: obj.ReqQty,
                      });
                    } else {
                      arr.push({
                        Matnr: obj.Matnr,
                        Maktx: obj.Maktx,
                        Meins: obj.Meins,
                        Type: obj.Type,
                        ReqQty: obj.ReqQty,
                      });
                    }
                  });
                  console.log(
                    JSON.stringify({
                      d: {
                        // PerformaId: details.PerformaId,
                        // LoggedId: '',
                        // DtsId: '',
                        // FdrId: '',
                        // Pqc: '',
                        // PqcName: '',
                        // ProjId: '',
                        // ProjectName: '',
                        // SubProj: '',
                        // AeName: '',
                        // FdrName: '',
                        // ApproverId: '',
                        // Wbs: '',
                        // PmtName: '',
                        // CaseId: '',
                        // GridName: '',
                        // SDate: Moment(date)
                        //   .format('YYYY-MM-DD')
                        //   .split('-')
                        //   .join(''),
                        // CDate: Moment(date)
                        //   .format('YYYY-MM-DD')
                        //   .split('-')
                        //   .join(''),
                        // Return: '',
                        // WO_MATERIALSSet: [],
                        // WO_MAPPINGSSet: [],
                        PerformaId: details.PerformaId,
                        LoggedId: User,
                        DtsId: details.DtsId,
                        FdrId: details.FdrId,
                        Pqc: details.Pqc,
                        PqcName: details.PqcName,
                        ProjId: details.ProjId,
                        ProjectName: details.ProjectName,
                        SubProj: details.SubProj,
                        AeName: details.AeName,
                        FdrName: details.FdrName,
                        ApproverId: details.ApproverId,
                        Wbs: details.Wbs,
                        PmtName: '',
                        CaseId: '1234',
                        GridName: 'Test Grid',
                        SDate: Moment(details.SDate)
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        CDate: Moment(date)
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        Return: '',
                        WO_MATERIALSSet: arr,
                        WO_MAPPINGSSet: [],
                      },
                    }),
                  );
                  RNFetchBlob.config({
                    trusty: true,
                  })
                    .fetch(
                      'POST',
                      'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZPM_PQC_SRV/CREATE_WOSet',
                      {
                        // Authorization:
                        // 'Basic ' + base64.encode('mm02:sapsap3'),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-CSRFToken': '',
                        'X-Requested-With': 'XMLHttpRequest',
                      },
                      JSON.stringify({
                        d: {
                          PerformaId: details.PerformaId,
                          LoggedId: User,
                          DtsId: details.DtsId,
                          FdrId: details.FdrId,
                          Pqc: details.Pqc,
                          PqcName: details.PqcName,
                          ProjId: details.ProjId,
                          ProjectName: details.ProjectName,
                          SubProj: details.SubProj,
                          AeName: details.AeName,
                          FdrName: details.FdrName,
                          ApproverId: details.ApproverId,
                          Wbs: details.Wbs,
                          PmtName: '',
                          CaseId: '1234',
                          GridName: 'Test Grid',
                          SDate: Moment(details.SDate)
                            .format('YYYY-MM-DD')
                            .split('-')
                            .join(''),
                          CDate: Moment(date)
                            .format('YYYY-MM-DD')
                            .split('-')
                            .join(''),
                          Return: '',
                          WO_MATERIALSSet: arr,
                          WO_MAPPINGSSet: [],
                        },
                      }),
                    )
                    .then(res => res.json())
                    .then(res => {
                      // alert(JSON.stringify(res));
                      console.log(JSON.stringify(res));
                      // setUploadingMsg(res.d.Return);
                      setUploading(false);
                      setSuccessModalVisible(!isSuccessModalVisible);
                      setError('');
                      route.params.refresh();

                      // setTimeout(() => {
                      //   navigation.goBack();
                      // }, 1000);
                      // setError('Unable to Upload');
                      // setModalVisible(true);
                      // setLoader(false);
                      // // setItems(res.values);
                      // let SubProject = res.d.results;
                      // let arr = [];
                      // for (var i = 0; i < SubProject.length; i++) {
                      //   arr.push({
                      //     id: i,
                      //     name: SubProject[i].SubProj,
                      //     projid: SubProject[i].ProjId,
                      //     uri: SubProject[i].__metadata.uri,
                      //     type: SubProject[i].__metadata.type,
                      //     orgid: SubProject[i].__metadata.id,
                      //   });
                      // }
                      // // alert(JSON.stringify(SubProject));
                      // // console.log(JSON.stringify(SubProject))
                      // AsyncStorage.setItem('SubProject', JSON.stringify(arr));
                    })
                    .catch(error => {
                      // setLoader(false);
                      // setError('Unable to Upload');
                      setUploadingMsg('');

                      console.log(error);
                      setModalVisible(true);
                      alert(
                        'Something went wrong! Please check internet connectivity.    ' +
                          JSON.stringify(error),
                      );
                    });
                }}
                // }
              />
              <Button
                title=" Cancel "
                color="red"
                onPress={() => {
                  setUploadingMsg('');

                  setPinModalVisible1(!isPinModalVisible1);
                  // setError('');
                  // navigation.goBack();
                }}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// const postRequest = (item, back, userAction, name, userPassword, loader) => {
//   // var key = [7, 8, 3, 1, 2, 9, 3, 8, 4, 7, 1, 2, 0, 4, 9, 8];
//   // encryption();
//   // var ciphertext = CryptoJS.AES.encrypt(
//   //   'Zuca8655',
//   //   CryptoJS.enc.Utf8.parse('7831293847120498'),
//   //   {
//   //     iv: CryptoJS.enc.Utf8.parse('7831293847120498'),
//   //     mode: CryptoJS.mode.CBC,
//   //   },
//   // );
//   // console.log('encrypted text', ciphertext.toString());
//   // // The initialization vector (must be 16 bytes)  7831293847120498
//   //   var iv = [7, 8, 3, 1, 2, 9, 3, 8, 4, 7, 1, 2, 0, 4, 9, 8];

//   //   // // Convert text to bytes (must be a multiple of the segment size you choose below)   Zuca8655

//   //   var text = strEncodeUTF16('Zuca8655');
//   //   var textBytes = aesjs.utils.utf8.toBytes(text);
//   // console.log(textBytes)
//   //   var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//   //   var encryptedBytes = aesCbc.encrypt(textBytes);

//   //   // // To print or store the binary data, you may convert it to hex
//   //   var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
//   //   alert(encryptedHex + '   bytes : ' + textBytes);
//   // // "104fb073f9a131f2cab49184bb864ca2"

//   // "TextMustBeAMultipleOfSegmentSize"'zahra.ali'

//   if (name == '' || userPassword == '') {
//     loader();
//     alert('Email or Password missing');
//     return;
//   }
//   var ciphertext = CryptoJS.AES.encrypt(
//     userPassword,
//     CryptoJS.enc.Utf8.parse('7831293847120498'),
//     {
//       iv: CryptoJS.enc.Utf8.parse('7831293847120498'),
//       mode: CryptoJS.mode.CBC,
//     },
//   );
//   var details = {
//     userId: name,
//     password: ciphertext.toString(),
//     /*
//     body: {
//       SRStatus: 'Request forwarded to HoD',
//       UserAction: userAction,
//       WFFlag: 'TAG',
//       Comments: 'Ok',
//     },
// */
//   };
//   console.log(details);
//   var formBody = [];
//   for (var property in details) {
//     var encodedKey = encodeURIComponent(property);
//     var encodedValue = encodeURIComponent(details[property]);
//     formBody.push(encodedKey + '=' + encodedValue);
//   }
//   formBody = formBody.join('&');
//   var URL = 'http://mmr-dev.kesc.com.pk:886/ITHD/api/v1/token';
//   fetch(URL, {
//     method: 'POST',
//     headers: {
//       //      Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     },
//     body: formBody,
//   })
//     .then(response => response.json())
//     .then(async responseJson => {
//       if (responseJson.Status == false) {
//         alert(JSON.stringify(responseJson.Message));

//         loader();
//       } else {
//         loader();

//         await AsyncStorage.setItem('user', JSON.stringify(details)).then(() => {
//           AsyncStorage.setItem(
//             'userdetails',
//             JSON.stringify(responseJson.Data),
//           );
//         });
//         back();
//       }
//     })
//     .catch(error => {
//       loader();
//       alert('Something went wrong! Please check internet connectivity.');
//     });
// };
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
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
    height: 45,
    borderColor: '#1191D0',
    borderWidth: 0.8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1191D0',
  },
});

export default WorkOrderDetails;
