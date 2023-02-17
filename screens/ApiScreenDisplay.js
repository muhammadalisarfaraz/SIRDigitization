import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  PermissionsAndroid,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  Provider,
  Appbar,
  Card,
  IconButton,
  Avatar,
  DataTable,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import Moment from 'moment';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import openMap from 'react-native-open-maps';
let current = 100;
const ApiScreen = ({route, navigation}) => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Discrepancy Recorded');
  const [loader, setLoader] = useState(false);

  const sign = createRef();
  const [signaturePreview, setSign] = useState([]);
  const [consumerSignature, setConsumerSignature] = useState();
  const [isSignature, setIsSignature] = useState('N');

  const {width} = Dimensions.get('window');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const [CaseType, setCaseType] = useState();

  const items2 = [
    {
      id: '92iijs7yta',
      name: 'Ondo',
    },
    {
      id: 'a0s0a8ssbsd',
      name: 'Ogun',
    },
    {
      id: '16hbajsabsd',
      name: 'Calabar',
    },
    {
      id: 'nahs75a5sg',
      name: 'Lagos',
    },
    {
      id: '667atsas',
      name: 'Maiduguri',
    },
    {
      id: 'hsyasajs',
      name: 'Anambra',
    },
    {
      id: 'djsjudksjd',
      name: 'Benue',
    },
    {
      id: 'sdhyaysdj',
      name: 'Kaduna',
    },
    {
      id: 'suudydjsjd',
      name: 'Abuja',
    },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecteditems, setIsSelecteditems] = useState('N');

  const SPACING = 10;
  const THUMB_SIZE = 80;

  const carouselRef = useRef();
  const flatListRef = useRef();
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const [list, setList] = useState([]);
  const [plannedList, setPlannedList] = useState([
    {
      id: 1,
      name: 'Discrepancy Recorded',
      active: true,
    },
    {
      id: 2,
      name: 'Load Detail',
      active: false,
    },
    {
      id: 3,
      name: 'Discrepancy and Findings',
      active: false,
    },
    {
      id: 4,
      name: 'Appliance Detail',
      active: false,
    },
    {
      id: 5,
      name: 'Meter Detail - System',
      active: false,
    },
    {
      id: 6,
      name: 'Meter Detail - Onsite',
      active: false,
    },
    {
      id: 7,
      name: 'Customer Acknowlegment',
      active: false,
    },

    {
      id: 8,
      name: 'SIR Pictures',
      active: false,
    },
  ]);
  const [unplannedList, setUnplannedList] = useState([
    {
      id: 1,
      name: 'Load Detail',
      active: false,
    },
    {
      id: 2,
      name: 'Discrepancy and Findings',
      active: false,
    },
    {
      id: 3,
      name: 'Appliance Detail',
      active: false,
    },
    {
      id: 4,
      name: 'Meter Detail - Onsite',
      active: false,
    },
    {
      id: 5,
      name: 'Customer Acknowlegment',
      active: false,
    },

    {
      id: 6,
      name: 'SIR Pictures',
      active: false,
    },
  ]);

  const [apiRes, setApiRes] = useState([]);

  const [images, setImages] = useState([]);

  const [images1, setImages1] = useState([]);
  const [consumerImages, setConsumerImages] = useState([]);

  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');

  const [tableData, settableData] = useState([]);

  const [SIR, setSIR] = useState();
  const [cosnumerno, setCosnumerno] = useState();

  const [clusterIBC, setClusterIBC] = useState();
  const [consumernameBilling, setConsumernameBilling] = useState();

  const [accountno, setAccountno] = useState();
  const [address, setAddress] = useState();

  const [assigndate, setAssigndate] = useState();
  const [assignto, setAssignto] = useState();

  const [tableList, setTableList] = useState([]);

  /* Load Detail ------------ Start */
  const [sanctionLoad, setSanctionLoad] = useState('');
  const [meterTesting, setMeterTesting] = useState('');
  const [agediff, setAgediff] = useState('');
  const [meterPer, setMeterPer] = useState('');
  const [meterSlow, setMeterSlow] = useState('');
  const [connectedLoad, setConnectedLoad] = useState('');
  const [runningLoad, setRunningLoad] = useState('');

  /* Load Detail ------------ End */

  /* Meter Detail on System ------------ Start */
  const [systemmeterNo, setSystemMeterNo] = useState('');
  const [systemmcurrentReading, setSystemCurrentReading] = useState('');
  const [systemmpeakReading, setSystemPeakReading] = useState('');

  const [systemmake, setSystemMake] = useState('');
  const [systemamperes, setSystemAmperes] = useState('');
  const [systemvolts, setSystemVolts] = useState('');
  const [systemmeterConstant, setSystemMeterConstant] = useState('');
  const [systemsecuritySlipNo, setSystemSecuritySlipNo] = useState('');
  const [systemmultiplyingFactor, setSystemMultiplyingFactor] = useState('');

  /* Meter Detail on System ------------ End */

  /* Meter Detail on Site ------------ Start */
  const [meterNo, setMeterNo] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [peakReading, setPeakReading] = useState('');

  const [make, setMake] = useState('');
  const [amperes, setAmperes] = useState('');
  const [volts, setVolts] = useState('');
  const [meterConstant, setMeterConstant] = useState('');
  const [securitySlipNo, setSecuritySlipNo] = useState('');
  const [multiplyingFactor, setMultiplyingFactor] = useState('');

  /* Meter Detail on Site ------------ End */

  /* Discrepancy and Findings ------------ Start */
  const [serviceType, setServiceType] = useState('');
  const [tarif, setTarif] = useState('');
  const [premiseType, setPremiseType] = useState('');
  const [premiseCategory, setPremiseCategory] = useState('');

  const [remarks, setRemarks] = useState('');

  const [DiscrepancyFinding, setDiscrepancyFinding] = useState([]);

  /* Discrepancy and Findings ------------ End */

  /* Customer Acknowlegment ------------ Start */

  const [consumerName, setConsumerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [consumerNameCNIC, setconsumerNamecNIC] = useState('');
  const [consumerRemarks, setConsumerRemarks] = useState('');
  const [consumerRefuseYN, setConsumerRefuseYN] = useState('');
  const [consumerSign, setConsumerSign] = useState('');

  /* Customer Acknowlegment ------------ End */

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  useEffect(() => {
    // getApiData();
    setLoader(true);
    // console.log("route.params.index", route.params.data);

    let Allimages = [];
    let Postingdata = route.params.data;
    let consSign1 = route.params.data.ConsumerSignature;
    let consumerImg = route.params.data.ConsumerImages;
    let sirImg = route.params.data.SIRImages;
    let caseStatus = Postingdata.CaseType + '-' + Postingdata.SIRType;
    settableData([Postingdata]);
    setApiRes(Postingdata.DiscrepancyRecord);
    setTableList(Postingdata.ApplianceDetail);
    setDiscrepancyFinding(Postingdata.Discrepancyitems);
    setSelectedItems(Postingdata.Discrepancyitems);
    setSIR(Postingdata.SIRNo);
    setCosnumerno(Postingdata.ConsumerNo);
    setClusterIBC(Postingdata.ClusterIBC);
    setConsumernameBilling(Postingdata.ConsumerNameBilling);
    setAccountno(Postingdata.AccountNo);
    setAddress(Postingdata.Address);
    setAssigndate(Postingdata.AssignDate);
    setAssignto(Postingdata.AssignTo);
    setSanctionLoad(Postingdata.SanctionLoad);
    setMeterTesting(Postingdata.MeterTesting);
    setAgediff(Postingdata.Agediff);
    setMeterPer(Postingdata.MeterPer);
    setMeterSlow(Postingdata.MeterSlow);
    setConnectedLoad(Postingdata.ConnectedLoad);
    setRunningLoad(Postingdata.RunningLoad);
    setServiceType(Postingdata.ServiceType);
    setTarif(Postingdata.Tariff);
    setPremiseType(Postingdata.PremiseType);
    setPremiseCategory(Postingdata.PremiseCategory);
    setRemarks(Postingdata.Remarks);

    setSystemMeterNo(Postingdata.SystemMeterNo);
    setSystemCurrentReading(Postingdata.SystemCurrentReading);
    setSystemPeakReading(Postingdata.SystemPeakReading);
    setSystemMake(Postingdata.SystemMake);
    setSystemAmperes(Postingdata.SystemAmperes);
    setSystemVolts(Postingdata.SystemVolts);
    setSystemMeterConstant(Postingdata.SystemMeterConstant);
    setSystemSecuritySlipNo(Postingdata.SystemSecuritySlipNo);
    setSystemMultiplyingFactor(Postingdata.SystemMultiplyingFactor);

    setMeterNo(Postingdata.MeterNo);
    setCurrentReading(Postingdata.CurrentReading);
    setPeakReading(Postingdata.PeakReading);
    setMake(Postingdata.Make);
    setAmperes(Postingdata.Amperes);
    setVolts(Postingdata.Volts);
    setMeterConstant(Postingdata.MeterConstant);
    setSecuritySlipNo(Postingdata.SecuritySlipNo);
    setMultiplyingFactor(Postingdata.MultiplyingFactor);
    setConsumerName(Postingdata.ConsumerName);
    setMobileNo(Postingdata.MobileNo);
    setconsumerNamecNIC(Postingdata.ConsumerCNIC);
    setConsumerRemarks(Postingdata.ConsumerRemarks);
    setConsumerRefuseYN(Postingdata.ConsumerRefuseYN);
    setConsumerSign(Postingdata.ConsumerSign);
    setIsSignature('Y');
    if (Postingdata.IsSignature == 'Y') {
      setSign(consSign1[0].consSign);
    }

    if (Postingdata.SIRImageFlag == 'Y') {
      setImages1(consumerImg[0].base64);
    }

    setCaseType(Postingdata.CaseType + '-' + Postingdata.SIRType);

    navigation.addListener('focus', payload => {
      if (caseStatus != 'Planned-Ordinary') {
        setList(unplannedList);
        setTab('Load Detail');
      } else {
        setList(plannedList);
        setTab('Discrepancy Recorded');
      }
    });

    sirImg.map(i => {
      Allimages.push({
        uri: i.uri,
        url: i.url,
      });

      setImages(Allimages);
    });

    setlongitude(Postingdata.longitude);
    setlatitude(Postingdata.latitude);
  }, [route.params.index]);

  const showLocation = (latitude1, longitude1) => {
    const loaction11 = {latitude: longitude1, longitude: latitude1};

    openMap({...loaction11});
    //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'
  };

  const [loadDetail1, setLoadDetail] = useState(null);

  let onChangeTabHandler = (name, id) => {
    setTab(name);
    console.log(pos);
    if (id == 1) {
      scrollRef.current.scrollTo({x: pos});
    } else if (id == list.length - 1) {
      scrollRef.current.scrollTo({x: pos - 120});
    } else {
      scrollRef.current.scrollTo({x: pos + 120});
    }

    setList(
      list.map((li, index) =>
        li.name == name
          ? {
              ...li,
              active: true,
            }
          : {
              ...li,
              active: false,
            },
      ),
    );
    // setList(update);
    // console.log(list);
  };

  // console.log('data response', apiRes);

  return (
    <ScrollView
      // nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled">
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          //</View> nestedScrollEnabled={true}
        >
          <View style={styles.footer}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  // flex: 0.45,
                  paddingLeft: 10,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    // marginLeft: 5,
                    fontSize: 13,
                    // fontWeight: 'bold',
                    color: 'black', //'#FFFFFF',
                    //     marginBottom: 4,
                  }}>
                  {'SIR No: ' + SIR}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Consumer No: ' + cosnumerno}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Name: ' + consumernameBilling}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Address: ' + address}
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign Date: ' + assigndate}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {'Assign To: ' + assignto}
                </Text>
              </View>
            </View>

            <View style={{paddingTop: 20}}></View>
            <View style={{padding: 5, marginBottom: 10}}></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  // flex: 0.45,
                  paddingTop: 5,
                  //   flexDirection: 'row',
                  //  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: -79,
                    fontSize: 13,
                    // fontWeight: 'bold',
                    color: 'black', //'#FFFFFF',
                    //     marginBottom: 4,
                  }}>
                  {'Cluster / IBC: ' + clusterIBC}
                </Text>

                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: 4,
                    color: 'black',
                    fontSize: 13,
                  }}>
                  {'Account No: ' + accountno}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 8,
                  padding: 5,
                }}
                onPress={
                  () => showLocation(longitude, latitude) // showLocationNew([item.longitude1, item.latitude1])
                }>
                <View
                  style={{
                    // flex: 0.45,
                    paddingTop: 5,
                    //   flexDirection: 'row',
                    //  justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 330,
                      marginTop: -30,
                      fontSize: 10,
                      // fontWeight: 'bold',
                      color: 'black', //'#FFFFFF',
                      //     marginBottom: 4,
                    }}>
                    <Icon name="location-pin" size={30} color="orange" />
                  </Text>
                  <Text
                    style={{
                      flex: 2.5,
                      marginLeft: 330,
                      marginTop: -5,
                      fontSize: 12,

                      fontWeight: 'bold',
                      color: 'blue', //'#FFFFFF',
                      //     marginBottom: 4,
                    }}>
                    View
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* </Animatable.View> */}
        </ScrollView>
        <ScrollView
          horizontal={true}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          onScroll={e => setPos(e.nativeEvent.contentOffset.x)}>
          <View style={styles.container}>
            {list.map(li => {
              return (
                <View
                  style={[
                    styles.sub_container,
                    {
                      backgroundColor: li.active == true ? '#8C52FF' : '#fff',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => onChangeTabHandler(li.name, li.id)}>
                    <Text
                      style={[
                        styles.text_style,
                        {color: li.active == true ? '#fff' : '#000'},
                      ]}>
                      {li.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View>
          {tab == 'Discrepancy Recorded' && CaseType == 'Planned-Ordinary' && (
            <ScrollView
              horizontal={true}
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <Card>
                    <DataTable>
                      <DataTable.Header style={styles.databeHeader}>
                        <DataTable.Title style={{flex: 1, color: 'black'}}>
                          DiscrepancyType
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Ticket
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 8, color: 'black'}}>
                          Description
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 5, color: 'black'}}>
                          Priority
                        </DataTable.Title>
                      </DataTable.Header>
                      {apiRes.length !== 0 &&
                        apiRes.map((l, i) => (
                          <DataTable.Row style={styles.databeBox} key={i}>
                            <View style={{flex: 5}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDiscrepancy(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.name}
                                editable={false}
                                selectTextOnFocus={false}
                              />
                              {/* {l.test} */}
                            </View>
                            <View style={{flex: 6}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateTicket(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.username}
                                editable={false}
                                selectTextOnFocus={false}
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updateDescription(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.email}
                                editable={false}
                                selectTextOnFocus={false}
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <TextInput
                                style={styles.input}
                                onChangeText={t => updatePriority(t, i)}
                                placeholder="Please Enter"
                                placeholderTextColor="black"
                                fontSize={10}
                                value={l.email}
                                editable={false}
                                selectTextOnFocus={false}
                              />
                            </View>
                          </DataTable.Row>
                        ))}
                    </DataTable>
                  </Card>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Load Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View style={{flex: 6}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          //  flex: 8,
                          width: '90%',
                          marginTop: -50,
                          //  marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Sanction Load
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (KW from DB)
                            </Text>
                          </View>

                          <View style={{flex: 2, widht: '100%'}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {sanctionLoad}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 20,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Meter Testing Result
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (MTV, Ammeter)
                            </Text>
                          </View>

                          <View style={{flex: 2, widht: '100%'}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterTesting}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 1.5,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %age Diff
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}> {agediff} </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %= Meter
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}> {meterPer} </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              %= Slow
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterSlow}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Connected Load
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {connectedLoad}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              Running Load
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {runningLoad}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}></Text>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              widht: '100%',
                              marginTop: -10,
                            }}></View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
          {tab == 'Discrepancy and Findings' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -90,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Service Type{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {serviceType}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Tarif{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {tarif} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Premise Type{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {premiseType}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Premise Category{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {premiseCategory}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View
                          style={{
                            height: 35,
                            width: '100%',
                            // position: 'absolute',
                            backgroundColor: '#1565C0',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <LinearGradient
                            colors={['#1565C0', '#64b5f6']}
                            style={styles.signIn}>
                            <Text
                              style={[
                                styles.textSign,
                                {
                                  color: '#fff',
                                },
                              ]}>
                              {' '}
                              Discrepancy
                            </Text>
                          </LinearGradient>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <View style={styles.multiSelectContainer}>
                            <MultiSelect
                              items={items2}
                              uniqueKey="id"
                              //onSelectedItemsChange={e => onSelectedItemsChange(e)}
                              selectedItems={selectedItems}
                              selectText="Search Items..."
                              searchInputPlaceholderText="Search Items..."
                              searchPlaceholderTextColor="red"
                              tagRemoveIconColor="white"
                              tagBorderColor="#000"
                              tagTextColor="#000"
                              selectedItemTextColor="#1565C0"
                              selectedItemIconColor="#000"
                              itemTextColor="#000"
                              hideSubmitButton={true}
                              hideDropdown={true}
                              searchInputStyle={{color: 'black'}}
                              submitButtonColor="#000"
                              submitButtonText="Submit"
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View
                          style={{
                            height: 35,
                            width: '100%',
                            // position: 'absolute',
                            backgroundColor: '#1565C0',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <LinearGradient
                            colors={['#1565C0', '#64b5f6']}
                            style={styles.signIn}>
                            <Text
                              style={[
                                styles.textSign,
                                {
                                  color: '#fff',
                                },
                              ]}>
                              {' '}
                              Remarks{' '}
                            </Text>
                          </LinearGradient>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View style={{flex: 2, alignItems: 'flex-start'}}>
                            <Text style={styles.MeterSystem}> {remarks} </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Appliance Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={false}
              horizontal={true}
              keyboardShouldPersistTaps="handled">
              <View style={styles.container1}>
                <View style={styles.mainboxAppliance}>
                  <Card>
                    <DataTable>
                      <DataTable.Header style={styles.databeHeaderAppliance}>
                        <DataTable.Title style={{flex: 20, color: 'black'}}>
                          Load Detail
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Quantity
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Rating (W)
                        </DataTable.Title>
                        <DataTable.Title style={{flex: 2, color: 'black'}}>
                          Total Watts
                        </DataTable.Title>
                      </DataTable.Header>
                      {tableList.map((l, i) => (
                        <DataTable.Row
                          style={styles.databeBoxAppliance}
                          key={i}>
                          <View style={{flex: 15}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold',
                                padding: 7,
                                textAlign: 'left',
                                justifyContent: 'flex-start',
                              }}>
                              {l.LoadDetail}
                            </Text>
                          </View>
                          <View style={{flex: 6}}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateQuantity(t, i)}
                              placeholder="Quantity"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}
                              editable={false}
                              selectTextOnFocus={false}
                              value={l.Quantity}
                            />
                          </View>
                          <View style={{flex: 5}}>
                            <TextInput
                              style={styles.input}
                              onChangeText={t => updateRating(t, i)}
                              placeholder="Rating"
                              keyboardType={'numeric'}
                              placeholderTextColor="black"
                              fontSize={14}
                              value={l.Rating}
                              editable={false}
                              selectTextOnFocus={false}
                            />
                          </View>
                          <View style={{flex: 5}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 14,
                                fontWeight: 'bold',
                                padding: 7,
                                textAlign: 'right',
                                justifyContent: 'flex-end',
                              }}>
                              {l.TotalWatts}
                            </Text>
                          </View>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </Card>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Meter Detail - System' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Meter No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmeterNo}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Current/off-Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmcurrentReading}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmpeakReading}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Make{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmake}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Amperes{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemamperes}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Volts{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemvolts}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Meter Constant{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmeterConstant}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Security Slip No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemsecuritySlipNo}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Multiplying Factor{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {systemmultiplyingFactor}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            {' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}></View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Meter Detail - Onsite' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Meter No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {meterNo} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Current/off-Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {currentReading}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Peak Reading{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {peakReading}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Make{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {make} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Amperes{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {amperes} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Volts{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {volts} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Meter Constant{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterConstant}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Security Slip No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {securitySlipNo}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 30,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Multiplying Factor{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {multiplyingFactor}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Customer Acknowlegment' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -100,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Consumer Name{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {consumerName}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Mobile No{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}> {mobileNo} </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            CNIC #{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              flex: 2,
                              alignItems: 'flex-start',
                              marginTop: -10,
                            }}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {consumerNameCNIC}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 2,
                          width: '96%',
                          marginTop: 20,
                        }}>
                        <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                          <Text style={{fontWeight: 'normal', color: 'black'}}>
                            Consumer Remarks{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            width: '88%',
                            alignSelf: 'center',
                          }}>
                          <View style={{flex: 2, alignItems: 'flex-start'}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {consumerRemarks}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          Refuse to Sign on Notice{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginTop: -10,
                          }}>
                          <Text style={styles.MeterSystem}>
                            {' '}
                            {consumerRefuseYN}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          Signed / Delivered Notice{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            marginTop: -10,
                          }}>
                          <Text style={styles.MeterSystem}>
                            {' '}
                            {consumerSign}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.container1]}>
                      <View
                        style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          <Text style={styles.text_left}>
                            Picture (Optional)
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                          }}>
                          <Image
                            resizeMode={'contain'}
                            style={{width: 114, height: 114}}
                            source={{
                              uri: 'data:image/png;base64,' + images1,
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 2,
                        width: '96%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          Consumer Signature {''}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          width: '88%',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            flex: 2,
                            alignItems: 'flex-start',
                            //  marginTop: -10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 2,
                              width: '96%',
                            }}>
                            <View
                              style={{
                                //    flexDirection: 'row',
                                flex: 1,
                                // width: '88%',
                                alignSelf: 'center',
                                marginLeft: -10,
                              }}>
                              <View
                                style={{
                                  flex: 2,
                                  alignItems: 'flex-start',
                                  marginLeft: -10,
                                }}>
                                <View style={styles.preview}>
                                  <Image
                                    resizeMode={'contain'}
                                    style={{width: 114, height: 114}}
                                    //source={{ base64: signaturePreview}}
                                    source={{
                                      uri:
                                        'data:image/png;base64,' +
                                        signaturePreview,
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'SIR Pictures' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    marginTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.footerInput}>
                    <View
                      style={{
                        //   flexDirection: 'column',
                        // flex: 8,
                        width: '90%',
                        marginTop: -70,
                        marginLeft: 2,
                      }}></View>

                    <LinearGradient
                      colors={['#1565C0', '#64b5f6']}
                      style={styles.signIn}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        {' '}
                        Photos of Surveyed Meter
                      </Text>
                    </LinearGradient>

                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // height: 50,
                        flexDirection: 'row',
                        marginVertical: 10,
                        marginLeft: 30,
                        // paddingHorizontal: 110,
                      }}>
                      <Carousel
                        layout="default"
                        data={images}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={({item, index}) => {
                          return (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  // onTouchThumbnail(index);
                                  setindexer1(index);
                                  setimageview(true);
                                }}
                                activeOpacity={0.9}>
                                <Image
                                  source={{uri: item.uri}}
                                  style={{height: 200, width: 300}}></Image>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        onSnapToItem={index => onSelect(index)}
                      />
                    </View>
                    <Pagination
                      inactiveDotColor="gray"
                      dotColor={'orange'}
                      activeDotIndex={indexSelected}
                      dotsLength={images.length}
                      animatedDuration={150}
                      inactiveDotScale={1}
                    />
                    <Modal
                      visible={imageview}
                      transparent={true}
                      closeOnClick={true}>
                      <ImageViewer
                        renderHeader={() => {
                          return (
                            <View
                              style={{
                                width: '100%',
                                height: 50,
                                // backgroundColor: 'green',
                                // alignItems: 'center',
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

                    <View
                      style={{
                        marginTop: 50,
                        // marginLeft: 8,

                        // marginBottom: 20,
                        //    width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          //    backgroundColor: '#1565C0',
                          //   padding: 15
                        }}
                        onPress={() => {
                          navigation.reset({
                            index: 0,

                            routes: [{name: 'Planned Saved SIR'}],
                          });
                        }}>
                        <LinearGradient
                          colors={['#1565C0', '#64b5f6']}
                          style={styles.submit}>
                          <Text
                            style={[
                              styles.textSign,
                              {
                                color: '#fff',
                              },
                            ]}>
                            Ok
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: 30,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            widht: '100%',
                            flexDirection: 'row',
                          }}>
                          <View style={{flex: 2}}>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}></Text>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              widht: '100%',
                              marginTop: -10,
                            }}></View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ApiScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#F5FCFF'
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  container3: {
    flex: 1,
    backgroundColor: 'white',
  },

  sub_container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    height: 40,
    // backgroundColor: 'white',
    elevation: 2,
    padding: 5,
    marginTop: 10,
    marginLeft: 2,
    marginBottom: 10,
  },
  text_style: {
    color: '#000',
  },

  dashboad: {
    height: 80,
    marginLeft: 10,
    width: '30%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    elevation: 10,
  },

  footer: {
    backgroundColor: 'white',
    //  alignSelf: 'center',
    borderRadius: 15,
    marginLeft: 5,
    marginHorizontal: 2,
    marginVertical: 3,
    width: 400,
    height: 170,
    marginTop: 10,
    justifyContent: 'center',
    // borderWidth: .5,

    borderColor: 'black',
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },

  footerInput: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 100,
    width: 400,
    // height: 470,
  },

  dashboad: {
    height: 80,
    marginLeft: 10,
    width: '30%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    elevation: 10,
  },

  title: {
    margin: 10,
    fontSize: 15,
    fontSize: 35,
    textAlign: 'left',
  },
  mainbox: {
    textAlign: 'center',
    //margin: 8,
    marginLeft: 2,
    //height:500,
    //width:500,
    //flex: 1,
    justifyContent: 'space-between',
    color: 'black',
  },
  mainboxAppliance: {
    textAlign: 'center',
    //margin: 8,
    marginLeft: 2,
    //height:500,
    //width:500,
    //flex: 1,
    justifyContent: 'space-between',
    color: 'black',
  },

  databeBox: {
    margin: 5,
    width: 398,
    textAlign: 'center',
    color: 'black',
  },
  databeHeader: {
    margin: 10,
    textAlign: 'left',
    color: 'black',
  },

  databeBoxAppliance: {
    margin: 5,
    width: 398,
    textAlign: 'center',
    color: 'black',
  },

  databeHeaderAppliance: {
    margin: 10,
    textAlign: 'left',
    color: 'black',
  },

  input: {
    width: 80,
    padding: 4,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
  },

  inputLoadDetail: {
    color: 'black',
    borderBottomWidth: 0.5,
  },

  MeterSystem: {
    width: '100%',
    borderBottomWidth: 0.5,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: 'black',
  },
  multiSelectContainer: {
    height: 'auto',
    width: 345,
  },
  imageStyle: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    // margin: 5,
  },

  formheader: {
    flex: 1,
    //    justifyContent:'space-between',
    //   paddingBottom: 50,
    //        backgroundColor: "red",
  },
  text_left: {
    color: '#111012',

    fontSize: 15,
    textAlign: 'center',

    paddingVertical: 10,
    //padding: 15,
  },

  signIn: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  submit: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signatureSubmit: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'red',
    margin: 10,
  },

  signature: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 10,
    height: 482,
  },
  buttonStyle: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'red',
    margin: 10,
  },
  preview: {
    width: 335,
    //height: 204,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: -100,
  },
  previewText: {
    color: 'red',
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#69B2FF',
    width: 120,
    textAlign: 'center',
    marginTop: 10,
  },
});
