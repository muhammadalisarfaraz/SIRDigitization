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
*/import DatePicker from 'react-native-datepicker';
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
function UpdateDetails1({navigation, route}) {
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
  const [reloadlist, setReloadList] = useState(false);

  const [tableData, settableData] = useState([]);
  const [selectedMaterial, setselectedMaterial] = useState('');
  const [selectedMaterialDetail, setselectedMaterialDetail] = useState([]);
  const [date, setDate] = useState([]);
  const [meterData, setMeterData] = useState([], []);
  const [ApproversData, setApproversData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [indexer, setIndexer] = useState(0);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [MeterNoData, setMeterNoData] = useState([]);
  const [MeterNoDataShow, setMeterNoDataShow] = useState([]);
  const [isload, setisload] = useState(false);
  const [uploadingMsg, setUploadingMsg] = useState('');
  const [error, setError] = useState('');
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [FilteredDtsData, setFilteredDtsData] = useState([]);
  const [selectedWBS, setSelectedWBS] = useState('');
  const [WbsData, setWbsData] = useState([]);
  const [FilteredWbsData, setFilteredWbsData] = useState([]);

  const [selectedAprrover, setSelectedAprrover] = useState('');
  const [User, setUser] = useState({});
  const [Password, setPassword] = useState('');
  const item = {};
  const tableHead = ['Item', 'Description', 'Unit', 'Quantity'];
  // const tableData = [['1', '2', '3'], ['a', 'b', 'c'], ['1', '2', '3']];isSuccessModalVisible

  useEffect(() => {
    let detail = route.params.data;
    let arrayitem = detail.WO_MATERIALSSet;
    let subprojectdatalocal = [];
    let materialdatalocal = [];
    let selectedprojectlocal = detail.Project;
    let selectedsubprojectloacal = detail.SubProj;
    setRefresh(true);
    // AsyncStorage.getItem('Workorders').then(items => {
    //   var data = items ? JSON.parse(items) : [];
    //   var index = route.params.index;
    //   // console.log(route.params)

    //   // setSelectedFeeder(datail.feeder)
    // });
    AsyncStorage.getItem('User').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];

      setUser(data);
    });
    AsyncStorage.getItem('Materials')
      .then(items => {
        var data = items ? JSON.parse(items) : [];
        // var datatable = [];

        materialdatalocal = data;
        let sorted = data.sort(function(a, b) {
          return b.ReqQty - a.ReqQty;
        });
        setMaterialsData(sorted);
      })
      .then(() => {
        AsyncStorage.getItem('Feeder')
          .then(items => {
            var data = items ? JSON.parse(items) : [];
            // var datatable = [];

            setFeederData(data);
          })
          .then(() => {
            AsyncStorage.getItem('PQC')
              .then(items => {
                var data = items ? JSON.parse(items) : [];
                // var datatable = [];
                const unique = data.filter((thing, index) => {
                  const _thing = thing.name;
                  return (
                    index ==
                    data.findIndex(obj => {
                      return obj.name == _thing;
                    })
                  );
                });
                console.log('PQC AAA', unique);
                setPQCData(unique);
              })
              .then(() => {
                AsyncStorage.getItem('Projects')
                  .then(items => {
                    var data = items ? JSON.parse(items) : [];
                    // var datatable = [];

                    setProjectsData(data);
                  })
                  .then(() => {
                    AsyncStorage.getItem('SubProject')
                      .then(items => {
                        var data = items ? JSON.parse(items) : [];
                        // var datatable = [];

                        setSubProjectsData(data);
                        subprojectdatalocal = data;
                      })
                      .then(() => {
                        AsyncStorage.getItem('MeterNo').then(items => {
                          var data = items ? JSON.parse(items) : [];
                          // var datatable = [];

                          setMeterNoData(data);
                        });
                      })
                      .then(() => {
                        AsyncStorage.getItem('Wbs').then(items => {
                          var data = items ? JSON.parse(items) : [];
                          // var datatable = [];
                          console.log(data);
                          setWbsData(data);
                        });
                      })
                      .then(() => {
                        AsyncStorage.getItem('Aprrovers').then(items => {
                          var data = items ? JSON.parse(items) : [];
                          // var datatable = [];

                          setApproversData(data);
                        });
                      })
                      .then(() => {
                        AsyncStorage.getItem('DTS')
                          .then(items => {
                            console.log('here');
                            var data = items ? JSON.parse(items) : [];
                            // var datatable = [];
                            // setRefresh(true);
                            setisload(true);
                            setDTSData(data);

                            // console.log(MaterialsData);
                            setSelectedValue(detail.Dts);
                            setSelectedFeeder(detail.Fdr);
                            setSelectedPQC(detail.Pqc);
                            setSelectedProject(detail.Project);
                            setSelectedAprrover(detail.Approver);
                            setSelectedWBS(detail.Wbs);
                            setSelectedsub(detail.SubProj);
                            setMeterNoDataShow(detail.WO_MAPPINGSSet);
                            settableData(detail.WO_MATERIALSSet);
                            var dts = DTSData.filter(obj =>
                              obj.feeder_id.includes(detail.Fdr.feeder_id),
                            );
                            var acc_proj = WbsData.filter(obj =>
                              obj.projid.includes(detail.Project.projid),
                            );
                            var acc_subproj = acc_proj.filter(obj =>
                              obj.spcode.includes(detail.SubProj.spcode),
                            );
                            var acc_feeder = acc_proj.filter(obj =>
                              obj.feeder_id.includes(detail.Fdr.feeder_id),
                            );
                            const uniqueArray = acc_feeder.filter(
                              (item, index) => {
                                const _thing = item.name;
                                return (
                                  index ===
                                  acc_feeder.findIndex(obj => {
                                    return obj.name === _thing;
                                  })
                                );
                              },
                            );
                            setFilteredWbsData(uniqueArray);
                            setFilteredDtsData(dts);
                            console.log(
                              'material saved',
                              detail.WO_MATERIALSSet,
                            );
                            setPMT(detail.PmtName);
                            setDate(detail.Date);
                            // arrayitem = detail.WO_MATERIALSSet;
                            // selectedprojectlocal = detail.Project;
                          })
                          .then(() => {
                            setTimeout(() => {
                              // setRefresh(true);
                              setisload(true);
                              //  alert(JSON.stringify(selectedProject.projid));
                              // settableData([]);
                              console.log('material  ', materialdatalocal);
                              // console.log(subprojectdatalocal);
                              setError('');

                              var subproj = subprojectdatalocal.filter(obj =>
                                obj.projid.includes(
                                  selectedprojectlocal.projid,
                                ),
                              );
                              setFilteredSubProjectsData(subproj);

                              if (subproj == [] || subproj == '') {
                                setTimeout(() => {
                                  // setRefresh(true);
                                  setisload(true);

                                  // setSelectedsub(subproj);
                                  // settableData([]);
                                  // console.log('yaya', subproj);
                                  var arra = [];
                                  // alert(JSON.stringify(MaterialsData[0]));
                                  var materials = materialdatalocal
                                    .filter(obj =>
                                      obj.ProjId.includes(
                                        selectedprojectlocal.projid,
                                      ),
                                    )
                                    .map((obj, index) => {
                                      //   setselectedMaterialDetail([
                                      //   material[index].Matnr,
                                      //   material[index].Maktx,
                                      //   material[index].Meins,
                                      //   '1',
                                      // ]);
                                      // alert(index)
                                      if (item.name == 'OMR') {
                                        arra.push({
                                          // ...obj,
                                          Matnr: obj.Matnr,
                                          Maktx: obj.Maktx,
                                          Meins: obj.Meins,
                                          Type: obj.Type,
                                          GrRcpt:
                                            obj.Type == 'X'
                                              ? 'Services'
                                              : 'Sub-Mains',
                                          ReqQty: '0',
                                        });
                                      } else {
                                        arra.push({
                                          Matnr: obj.Matnr,
                                          Maktx: obj.Maktx,
                                          Meins: obj.Meins,
                                          Type: obj.Type,
                                          ReqQty: '0',
                                        });
                                      }
                                    });
                                  let common = [];
                                  for (let x = 0; x < arrayitem.length; x++) {
                                    var bl = false;
                                    for (let y = 0; y < arra.length; y++) {
                                      if (arra[y].Matnr == arrayitem[x].Matnr) {
                                        // bl = true;
                                        console.log('---', arrayitem[x]);
                                        common.push(arrayitem[x]);
                                      } else {
                                      }
                                    }

                                    // if (bl == true) {
                                    //   console.log('lol ' + a[i]);
                                    // }
                                  }

                                  console.log('common ', common);
                                  console.log('arra ', arra);
                                  let filteredarray = common.concat(arra);
                                  let unique = [];
                                  // let a = filteredarray.forEach(c => {
                                  //   if (!unique.includes(c)) {
                                  //     unique.push(c);
                                  //   }
                                  // });
                                  for (
                                    let a = 0;
                                    a < filteredarray.length;
                                    ++a
                                  ) {
                                    for (
                                      let b = a + 1;
                                      b < filteredarray.length;
                                      ++b
                                    ) {
                                      if (
                                        filteredarray[a].Matnr ===
                                        filteredarray[b].Matnr
                                      ) {
                                        filteredarray.splice(b--, 1);
                                      }
                                    }
                                  }
                                  // console.log(filteredarray.length, filteredarray);
                                  // console.log(arra.length, arra);
                                  // if (arra.length > arrayitem.length) {
                                  //   let list = arra.map(item => item.Matnr);
                                  //   console.log(list);
                                  //   let result = arrayitem.filter((item, index) =>
                                  //     list.includes(item.Matnr),
                                  //   );
                                  //   // .map((obj, index) => {});
                                  //   // for (let a = 0; a < arrayitem.length; a++) {

                                  //   // }
                                  //   console.log(result.length, result);
                                  let sorted = filteredarray.sort(function(
                                    a,
                                    b,
                                  ) {
                                    return b.ReqQty - a.ReqQty;
                                  });
                                  settableData(sorted);
                                  console.log('filtered', sorted);
                                  // setRefresh(false);

                                  setisload(false);
                                }, 3000);

                                // alert(JSON.strin
                              } else {
                                setTimeout(() => {
                                  // setRefresh(true);
                                  setisload(true);

                                  var arra = [];
                                  // alert(JSON.stringify(materialdatalocal[0]));
                                  var materials = materialdatalocal
                                    .filter(obj =>
                                      obj.SubProj.includes(
                                        selectedsubprojectloacal.name,
                                      ),
                                    )
                                    .map((obj, index) => {
                                      //   setselectedMaterialDetail([
                                      //   material[index].Matnr,
                                      //   material[index].Maktx,
                                      //   material[index].Meins,
                                      //   '1',
                                      // ]);
                                      // alert(index)
                                      if (item.name == 'OMR') {
                                        arra.push({
                                          Matnr: obj.Matnr,
                                          Maktx: obj.Maktx,
                                          Meins: obj.Meins,
                                          Type: obj.Type,
                                          GrRcpt:
                                            obj.Type == 'X'
                                              ? 'Services'
                                              : 'Sub-Mains',
                                          ReqQty: '0',
                                        });
                                      } else {
                                        arra.push({
                                          Matnr: obj.Matnr,
                                          Maktx: obj.Maktx,
                                          Meins: obj.Meins,
                                          Type: obj.Type,
                                          ReqQty: '0',
                                        });
                                      }
                                    });

                                  let common = [];
                                  for (let x = 0; x < arrayitem.length; x++) {
                                    var bl = false;
                                    for (let y = 0; y < arra.length; y++) {
                                      if (arra[y].Matnr == arrayitem[x].Matnr) {
                                        // bl = true;
                                        console.log('---', arrayitem[x]);
                                        common.push(arrayitem[x]);
                                        // console.log('arr ---', arra[y]);
                                      } else {
                                        // console.log('here')
                                      }
                                    }

                                    // if (bl == true) {
                                    //   console.log('lol ' + a[i]);
                                    // }
                                  }
                                  console.log('common ', common);
                                  console.log('arra ', arra);
                                  let filteredarray = common.concat(arra);
                                  let unique = [];
                                  // let a = filteredarray.forEach(c => {
                                  //   if (!unique.includes(c)) {
                                  //     unique.push(c);
                                  //   }
                                  // });
                                  for (
                                    let a = 0;
                                    a < filteredarray.length;
                                    ++a
                                  ) {
                                    for (
                                      let b = a + 1;
                                      b < filteredarray.length;
                                      ++b
                                    ) {
                                      if (
                                        filteredarray[a].Matnr ===
                                        filteredarray[b].Matnr
                                      ) {
                                        filteredarray.splice(b--, 1);
                                      }
                                    }
                                  }
                                  // console.log(filteredarray.length, filteredarray);
                                  // console.log(arra.length, arra);
                                  // if (arra.length > arrayitem.length) {
                                  //   let list = arra.map(item => item.Matnr);
                                  //   console.log(list);
                                  //   let result = arrayitem.filter((item, index) =>
                                  //     list.includes(item.Matnr),
                                  //   );
                                  //   // .map((obj, index) => {});
                                  //   // for (let a = 0; a < arrayitem.length; a++) {

                                  //   // }
                                  //   console.log(result.length, result);
                                  let sorted = filteredarray.sort(function(
                                    a,
                                    b,
                                  ) {
                                    return b.ReqQty - a.ReqQty;
                                  });
                                  settableData(sorted);
                                  console.log('filtered', sorted);
                                  // }
                                  // alert(JSON.stringify(arr[0]));
                                  // setRefresh(false);

                                  setisload(false);
                                }, 3000);
                              }
                              // setRefresh(false);
                            }, 1000);
                          })
                          .then(() => {
                            setTimeout(() => {
                              setRefresh(false);
                            }, 3000);

                            setisload(false);
                          });
                      });
                  });
              });
          });
      });
    // alert(JSON.stringify(route.params.data));
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
                  borderColor: '#F6921E',
                  backgroundColor: 'rgba(246,146,30,0.1)',
                  borderRadius: 4,
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
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  setSelectedValue('');
                  // setLoading(true);
                  // setFilteredSubProjectsData([]);
                  // settableData([]);
                  setError('');

                  // setSelectedProject(item);
                  setSelectedFeeder(item);

                  var dts = DTSData.filter(obj =>
                    obj.feeder_id.includes(item.feeder_id),
                  );
                  var acc_proj = WbsData.filter(obj =>
                    obj.projid.includes(selectedProject.projid),
                  );
                  var acc_subproj = acc_proj.filter(obj =>
                    obj.spcode.includes(selectedsub.spcode),
                  );
                  var acc_feeder = acc_proj.filter(obj =>
                    obj.feeder_id.includes(item.feeder_id),
                  );
                  const uniqueArray = acc_feeder.filter((item, index) => {
                    const _thing = item.name;
                    return (
                      index ===
                      acc_feeder.findIndex(obj => {
                        return obj.name === _thing;
                      })
                    );
                  });
                  setFilteredWbsData(uniqueArray);
                  setFilteredDtsData(dts);
                  console.log('sub', dts);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedFeeder}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,

                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={FeederData}
                defaultIndex={selectedFeeder.id}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedFeeder.name,
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // value: selectedFeeder.name,
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                  keyboardShouldPersistTaps: 'handled',
                }}
              />
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
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  setSelectedValue(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedValue}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={FilteredDtsData}
                defaultIndex={selectedValue.id}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedValue.name,
                  underlineColorAndroid: 'transparent',
                  placeholderTextColor: '#000000',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
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
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  setSelectedPQC(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedPQC}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={PQCData}
                defaultIndex={selectedPQC.id}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedPQC.name,
                  underlineColorAndroid: 'transparent',
                  placeholderTextColor: '#000000',

                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
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
            <View style={{width: '100%'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>WBS</Text>
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  console.log(item);
                  setSelectedWBS(item);
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedWBS}
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
                items={FilteredWbsData}
                // defaultIndex={2}
                defaultIndex={selectedWBS.id}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedWBS.name,
                  underlineColorAndroid: 'transparent',
                  placeholderTextColor: '#000000',

                  style: {
                    padding: 6,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 13,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
              {/* <Picker
            selectedValue={selectedPQC}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setSelectedPQC(itemValue)}>
            {PQCData.map(data => {
              return <Picker.Item label={data.Name} value={data.Name} />;
            })}
          </Picker> */}
            </View>
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Project</Text>
              <SearchableDropdown
                onItemSelect={item => {
                  //  alert(JSON.stringify(item));
                  settableData([]);

                  setSelectedProject(item);
                  var subproj = SubProjectsData.filter(obj =>
                    obj.projid.includes(item.projid),
                  );
                  setFilteredSubProjectsData(subproj);

                  if (subproj == [] || subproj == '') {
                    // setRefresh(true);

                    setSelectedsub(subproj);
                    // settableData([]);
                    console.log(subproj);
                    var arr = [];
                    // alert(JSON.stringify(MaterialsData[0]));
                    var materials = MaterialsData.filter(obj =>
                      obj.ProjId.includes(item.projid),
                    ).map((obj, index) => {
                      //   setselectedMaterialDetail([
                      //   material[index].Matnr,
                      //   material[index].Maktx,
                      //   material[index].Meins,
                      //   '1',
                      // ]);
                      // alert(index)
                      if (item.name == 'OMR') {
                        arr.push({
                          Matnr: obj.Matnr,
                          Maktx: obj.Maktx,
                          Meins: obj.Meins,
                          Type: obj.Type,
                          GrRcpt: obj.Type == 'X' ? 'Services' : 'Sub-Mains',
                          ReqQty: '0',
                        });
                      } else {
                        arr.push({
                          Matnr: obj.Matnr,
                          Maktx: obj.Maktx,
                          Meins: obj.Meins,
                          Type: obj.Type,
                          ReqQty: '0',
                        });
                      }
                    });
                    // alert(JSON.stringify(arr[0]));
                    let sorted = arr.sort(function(a, b) {
                      return b.ReqQty - a.ReqQty;
                    });
                    settableData(sorted);
                    // setRefresh(false);
                  }
                }}
                // onRemoveItem={(item, index) => {
                //   setSelectedFeeder(null);
                // }}
                selectedItems={selectedProject}
                multi={false}
                containerStyle={{padding: 5}}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: 'black',
                  borderWidth: 0.8,
                  // borderRadius: 5,
                }}
                itemTextStyle={{color: 'black', fontSize: 14}}
                itemsContainerStyle={{maxHeight: 140}}
                items={ProjectsData}
                defaultIndex={selectedProject.id}
                resetValue={false}
                textInputProps={{
                  placeholder: selectedProject.name,
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 0.8,
                    borderColor: '#F6921E',
                    backgroundColor: 'rgba(246,146,30,0.1)',
                    borderRadius: 4,
                    fontSize: 16,
                    // borderRadius: 5,
                  },
                  // onTextChange: text => alert(text)
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
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
                  <SearchableDropdown
                    onItemSelect={item => {
                      //  alert(JSON.stringify(item));
                      setSelectedsub(item);
                      var arr = [];
                      // alert(JSON.stringify(MaterialsData[0]));
                      var materials = MaterialsData.filter(obj =>
                        obj.SubProj.includes(item.name),
                      ).map((obj, index) => {
                        //   setselectedMaterialDetail([
                        //   material[index].Matnr,
                        //   material[index].Maktx,
                        //   material[index].Meins,
                        //   '1',
                        // ]);
                        // alert(index)
                        if (item.name == 'OMR') {
                          arr.push({
                            Matnr: obj.Matnr,
                            Maktx: obj.Maktx,
                            Meins: obj.Meins,
                            Type: obj.Type,
                            GrRcpt: obj.Type == 'X' ? 'Services' : 'Sub-Mains',
                            ReqQty: '0',
                          });
                        } else {
                          arr.push({
                            Matnr: obj.Matnr,
                            Maktx: obj.Maktx,
                            Meins: obj.Meins,
                            Type: obj.Type,
                            ReqQty: '0',
                          });
                        }
                      });
                      // alert(JSON.stringify(arr[0]));
                      let sorted = arr.sort(function(a, b) {
                        return b.ReqQty - a.ReqQty;
                      });
                      settableData(sorted);
                    }}
                    // onRemoveItem={(item, index) => {
                    //   setSelectedFeeder(null);
                    // }}
                    selectedItems={selectedsub}
                    multi={false}
                    containerStyle={{padding: 5}}
                    itemStyle={{
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#ddd',
                      borderColor: 'black',
                      borderWidth: 0.8,
                      // borderRadius: 5,
                    }}
                    itemTextStyle={{color: 'black', fontSize: 14}}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={FilteredSubProjectsData}
                    defaultIndex={selectedsub.id}
                    resetValue={false}
                    textInputProps={{
                      placeholder: selectedsub.name,
                      underlineColorAndroid: 'transparent',
                      style: {
                        padding: 12,
                        borderWidth: 0.8,
                        borderColor: '#F6921E',
                        backgroundColor: 'rgba(246,146,30,0.1)',
                        borderRadius: 4,
                        fontSize: 16,
                        // borderRadius: 5,
                      },
                      // onTextChange: text => alert(text)
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
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
                        width: '96%',
                        justifyContent: 'center',
                        borderWidth: 1,
                        backgroundColor: item.ReqQty > 0 ? 'white' : 'tan',

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
                            <InputSpinner
                              max={9999}
                              min={0}
                              step={1}
                              color={'#0A8FCF'}
                              height={40}
                              width={120}
                              initialValue={tableData[index].ReqQty}
                              editable={false}
                              onBlur={() => {
                                var data = tableData;
                                settableData(data);
                              }}
                              value={tableData[index].ReqQty}
                              onChange={num => {
                                // console.log(num);
                                setRefresh(true);

                                // setRefresh(false);
                                var data = tableData;
                                // settableData([]);
                                data[index].ReqQty = num.toString();
                                // alert(JSON.stringify(data));
                                settableData(data);
                                // setRefresh(true);
                                setRefresh(false);
                              }}
                              onDecrease={() => {
                                setReloadList(true);
                                var data = MeterNoDataShow;
                                data.pop();
                                setMeterNoDataShow(data);
                                setTimeout(() => {
                                  setReloadList(false);
                                }, 1000);
                              }}
                              onIncrease={() => {
                                setReloadList(true);

                                var array = MeterNoDataShow;
                                var materials = MeterNoData.filter(
                                  objj => objj.Matnr.includes(item.Matnr),
                                  //   ,
                                  // ).map((objj, index) => {
                                  //   array.push({
                                  //     Consumer: '',
                                  //     Matnr: objj.Matnr,
                                  //     MeterNo: '',
                                  //   });
                                  // }
                                );
                                console.log(materials);
                                if (materials.length > 0) {
                                  array.push({
                                    Consumer: '',
                                    Matnr: item.Matnr,
                                    MeterNo: '',
                                  });
                                }
                                console.log(array);
                                setMeterNoDataShow(array);
                                setTimeout(() => {
                                  setReloadList(false);
                                }, 1000);
                              }}
                            />
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
            {MeterNoDataShow.length != 0 ? (
              <Text style={{fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>
                Meter Number
              </Text>
            ) : (
              <View />
            )}
            {reloadlist ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                style={{flex: 1, width: '100%'}}
                data={MeterNoDataShow}
                extraData={MeterNoDataShow}
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
                        height: 180,
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
                          <TextInput
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
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.45,
                            position: 'absolute',
                            right: 0,
                            // top: 60,
                            bottom: 40,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            // marginBottom: 6,
                          }}>
                          <View
                            style={{
                              // backgroundColor: '#0A8FCF',
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              height: 60,
                              width: 140,
                              borderRadius: 15,
                            }}>
                            <Text style={{fontWeight: 'bold'}}>Meter No</Text>
                            <SearchableDropdown
                              keyboardShouldPersistTaps="handled"
                              onItemSelect={items => {
                                //  alert(JSON.stringify(item));
                                // console.log(indexx);
                                // setReloadList(true);
                                // setIndexer(indexx);
                                // setLoader(true);
                                var data = MeterNoDataShow;
                                // settableData([]);
                                data[index].MeterNo = items.name.toString();
                                setMeterNoDataShow(data);
                                console.log(data);
                                // setTimeout(() => {
                                //   setReloadList(false);
                                // }, 1000);
                                // setSelectedWBS(item);
                              }}
                              // onRemoveItem={(item, index) => {
                              //   setSelectedFeeder(null);
                              // }}
                              selectedItems={MeterNoDataShow[index]}
                              multi={false}
                              containerStyle={{padding: 5, width: 120}}
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
                              items={MeterNoData}
                              // defaultIndex={2}
                              resetValue={false}
                              textInputProps={{
                                placeholder:
                                  MeterNoDataShow[index].MeterNo == ''
                                    ? 'Meter No'
                                    : MeterNoDataShow[index].MeterNo,
                                underlineColorAndroid: 'transparent',
                                placeholderTextColor:
                                  MeterNoDataShow[index].MeterNo == ''
                                    ? 'rgba(0,0,0,0.2)'
                                    : 'black',
                                style: {
                                  padding: 6,
                                  borderWidth: 0.8,
                                  borderColor: '#F6921E',
                                  backgroundColor: 'rgba(246,146,30,0.1)',
                                  borderRadius: 4,
                                  fontSize: 13,
                                  // borderRadius: 5,
                                },
                                // onTextChange: text => alert(text)
                              }}
                              listProps={{
                                nestedScrollEnabled: true,
                              }}
                            />
                            {/* <TextInput
                              placeholder={'Meter No'}
                              onSubmitEditing={event => {
                                console.log(event);
                                setRefresh(true);

                                var materials = MeterNoData.filter(objj =>
                                  objj.Sernr.includes(
                                    event.nativeEvent.text.toLocaleUpperCase(),
                                  ),
                                );
                                if (materials.length > 0) {
                                  var data = MeterNoDataShow;
                                  // settableData([]);
                                  data[
                                    index
                                  ].MeterNo = event.nativeEvent.text.toLocaleUpperCase();
                                  setMeterNoDataShow(data);
                                } else {
                                  alert('Enter Valid Meter Number');
                                }
                                console.log(materials);
                                setRefresh(false);

                                // if (item.MeterNo != text) {
                                //   alert('Enter Valid Meter Number');
                                // }
                              }}
                              style={{borderBottomWidth: 1, width: 100}}
                            /> */}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
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
                  // setLoader(true);
                  setError('');
                  setPassword('');
                  setAuthModalVisible(true);
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
                <Text style={{color: 'white', fontSize: 18}}>Save</Text>
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
                  setPinModalVisible(true);

                  
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>Send to PQC</Text>
              </TouchableOpacity>
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
              // setTimeout(() => {
              navigation.goBack();
              // }, 1000);
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
            height: 200,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}}>
            Are you sure?
          </Text>

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

                // if (Password != User.ImPassword) {
                //   setError('Password Incorrect');
                //   return;
                // } else {
                var datas;
                AsyncStorage.getItem('Workorders')
                  .then(items => {
                    // alert(JSON.stringify(items))

                    let data = JSON.parse(items);

                    // alert(JSON.stringify(data[route.params.index]));
                    // setSelectedValue(detail.Dts);
                    // setSelectedFeeder(detail.Fdr);
                    //               setSelectedPQC(detail.Pqc);
                    //               setSelectedProject(detail.Project);
                    //               setSelectedsub(detail.SubProj);
                    //               settableData(detail.WO_MATERIALSSet);
                    //               setPMT(detail.PmtName);
                    //               setDate(detail.Date);
                    // Date: date,
                    //     PmtName: PMT,
                    //     Dts: selectedValue,
                    //     Fdr: selectedFeeder,
                    //     Pqc: selectedPQC,
                    //     Approver: selectedAprrover,
                    //     Wbs: selectedWBS,
                    //     Project: selectedProject,
                    //     SubProj: selectedsub,
                    //     WO_MATERIALSSet: tableData,
                    //     WO_MAPPINGSSet: MeterNoDataShow,
                    data[route.params.index].Fdr = selectedFeeder;
                    data[route.params.index].Dts = selectedValue;
                    data[route.params.index].Pqc = selectedPQC;
                    data[route.params.index].Approver = selectedAprrover;
                    data[route.params.index].Wbs = selectedWBS;
                    data[route.params.index].Project = selectedProject;
                    data[route.params.index].SubProj = selectedsub;
                    data[route.params.index].WO_MATERIALSSet = tableData;
                    data[route.params.index].WO_MAPPINGSSet = MeterNoDataShow;
                    data[route.params.index].PmtName = PMT;
                    data[route.params.index].Date = date;
                    data[route.params.index].SDate = Date.now();

                    AsyncStorage.setItem('Workorders', JSON.stringify(data));
                    // items.map(item => {
                    //   if (PMT == item.name) {
                    //     AsyncStorage.setItem(
                    //       'Workorders',
                    //       JSON.stringify({
                    //         name: PMT,
                    //         dts: selectedValue,
                    //         feeder: selectedFeeder,
                    //         pqc: selectedPQC,
                    //         project: selectedProject,
                    //         subproject: selectedsub,
                    //         materails: tableData,
                    //       }),
                    //     );
                    route.params.refresher();
                    // navigation.goBack();
                    // setSuccessModalVisible(true);
                    setAuthModalVisible(!isAuthModalVisible);

                    //   }
                    // });
                  })
                  .then(() => {
                    setSuccessModalVisible(!isSuccessModalVisible);
                    setError('');
                    // setTimeout(() => {
                    //   navigation.goBack();
                    // }, 1000);
                  })
                  .catch(err => {
                    // alert(JSON.stringify(err));
                    setError(JSON.stringify(err));
                    setModalVisible(true);
                  });
              }}
              // }
            />

            <Button
              title=" No "
              color="red"
              onPress={() => {
                setAuthModalVisible(!isAuthModalVisible);
                // setError('');
                // navigation.goBack();
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        isVisible={isPinModalVisible}>
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
            <SearchableDropdown
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
                placeholder: 'Select Approver',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 6,
                  borderWidth: 0.8,
                  borderColor: '#F6921E',
                  backgroundColor: 'rgba(246,146,30,0.1)',
                  borderRadius: 4,
                  fontSize: 13,
                  // borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
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
                  console.log(
                    JSON.stringify({
                      d: {
                        LoggedId: User.ImUser,
                        DtsId: selectedValue.dts_id,
                        FdrId: selectedValue.feeder_id,
                        Pqc: selectedPQC.v_id,
                        PqcName: selectedPQC.name,
                        ProjId: selectedProject.projid,
                        ProjectName: selectedProject.name,
                        SubProj: 'P03',
                        AeName: User.ImUser,
                        FdrName: selectedValue.feeder_desc,
                        PmtName: PMT,
                        ApproverId: selectedAprrover.name,
                        Wbs: selectedWBS.name,
                        CaseId: '1234',
                        GridName: 'Test Grid',
                        SDate: Moment(Date.now())
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        CDate: Moment(date)
                          .format('YYYY-MM-DD')
                          .split('-')
                          .join(''),
                        Return: '',
                        WO_MATERIALSSet: tableData,
                        WO_MAPPINGSSet: meterData,
                      },
                    }),
                  );
                  
                }}
                // }
              />
              <Button
                title=" Cancel "
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

export default UpdateDetails1;
