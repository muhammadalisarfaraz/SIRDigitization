import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Card, DataTable} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import openMap from 'react-native-open-maps';

let current = 100;

const ApiScreenB40Display = ({route, navigation}) => {
  const scrollRef = useRef(null);
  const [pos, setPos] = React.useState(0);
  const [tab, setTab] = useState('Consumer Detail');
  const [loader, setLoader] = useState(false);
  const sign = createRef();
  const [signaturePreview, setSign] = useState(null);

  const [checkBoxselectedList, setcheckBoxSelectedList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [checkBoxList, setCheckBoxList] = useState([]);

  const items = [
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

  let onSelectedItemsChange = selectedItems => {
    null;
  };

  const [list, setList] = useState([
    {
      id: 1,
      name: 'Consumer Detail',
      active: true,
    },
    {
      id: 2,
      name: 'Discrepancy Recorded',
      active: false,
    },

    {
      id: 3,
      name: 'Power Meter Detail',
      active: false,
    },
    {
      id: 4,
      name: 'Light Meter Detail',
      active: false,
    },
    {
      id: 5,
      name: 'Meter Testing Result',
      active: false,
    },
    {
      id: 6,
      name: 'Discrepancy and Findings',
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

  const [apiRes, setApiRes] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [filePath1, setFilePath1] = useState([]);
  const [images1, setImages1] = useState([]);
  const [consumerImages, setConsumerImages] = useState([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isImage, setIsImage] = useState('N');
  const [IsImage1, setIsImage1] = useState('N');
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const {width} = Dimensions.get('window');
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);
  const [image1Show, setImage1Show] = useState(false);
  const [visible1, setIsVisible1] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  /* Consumer Detail */
  const [tableData, settableData] = useState([]);

  const [consumerStatus, setConsumerStatus] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [tariff, setTariff] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [sizeofService, setSizeofService] = useState('');
  const [fedFromPMTSS, setFedFromPMTSS] = useState('');
  const [pmtSSCode, setPMTSSCode] = useState('');
  const [connectedLoad, setConnectedLoad] = useState('');
  const [contractLoad, setContractLoad] = useState('');
  const [connectedLoadKW, setConnectedLoadKW] = useState('');
  const [runningLoadKW, setRunningLoadKW] = useState('');
  /* Conumer Detail ------------ End  */

  /* Power Meter ------------ Start */

  const [powerKENo, setPowerKENo] = useState('');
  const [powerMeterMake, setPowerMeterMake] = useState('');
  const [powerMC, setPowerMC] = useState('');
  const [powerReading, setPowerReading] = useState('');
  const [powerMDIOnReading, setPowerMDIOnReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [peakReading, setPeakReading] = useState('');

  /* Power Meter ------------ End */

  /* Light Meter ------------ Start */
  const [lightKENo, setLightKENo] = useState('');
  const [lightMeterMake, setLightMeterMake] = useState('');
  const [lightMC, setLightMC] = useState('');
  const [lightReading, setLightReading] = useState('');
  const [lightMDIOnReading, setLightMDIOnReading] = useState('');
  const [lightPeakReading, setLightPeakReading] = useState('');
  const [lightCurrentReading, setLightCurrentReading] = useState('');
  const [lightConsumerNo, setLightConsumerNo] = useState('');

  /* Light Meter ------------ End */
  /* Meter Testing Result ------------ Start */
  const [meterTestingResultTC, setMeterTestingResultTC] = useState('');
  const [meterTestingperError, setMeterTestingperError] = useState('');
  const [meterTestingTo, setMeterTestingTo] = useState('');
  const [meterInstalled1, setMeterInstalled1] = useState('');
  const [meterInstalled2, setMeterInstalled2] = useState('');
  const [meterInstalled, setMeterInstalled] = useState('');
  const [fmrNo, setFMRNo] = useState('');
  const [statusPostalorder, setStatusPostalorder] = useState('');
  const [metertestingResultremarks, setmetertestingResultremarks] =
    useState('');
  /* Meter Testing Result ------------ End */

  /* Discrepancy and Findings ------------ Start */
  const [discrepancyfindingsRemarks, setdiscrepancyfindingsRemarks] =
    useState('');
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

  const [SIR, setSIR] = useState('');
  const [cosnumerno, setCosnumerno] = useState('');

  const [clusterIBC, setClusterIBC] = useState('');
  const [consumernameBilling, setConsumernameBilling] = useState('');
  const [accountno, setAccountno] = useState('');
  const [address, setAddress] = useState('');
  const [assigndate, setAssigndate] = useState('');
  const [assignto, setAssignto] = useState('');
  const [isSignature, setIsSignature] = useState('N');

  const [tableList, setTableList] = useState([]);
  const SPACING = 10;
  const THUMB_SIZE = 80;
  const flatListRef = useRef();
  const carouselRef = useRef();

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

  const [date1, setDate] = useState();
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const [CaseType, setCaseType] = useState();

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
    setdiscrepancyfindingsRemarks(Postingdata.Remarks);
    setSelectedItems(Postingdata.Discrepancyitems);
    setSIR(Postingdata.SIRNo);
    setCosnumerno(Postingdata.ConsumerNo);
    setClusterIBC(Postingdata.ClusterIBC);
    setConsumernameBilling(Postingdata.ConsumerNameBilling);
    setAccountno(Postingdata.AccountNo);
    setAddress(Postingdata.Address);
    setAssigndate(Postingdata.AssignDate);
    setAssignto(Postingdata.AssignTo);
    setConsumerStatus(Postingdata.ConsumerStatus);
    setIndustryType(Postingdata.IndustryType);
    setTariff(Postingdata.Tariff);
    setServiceType(Postingdata.ServiceType);
    setSizeofService(Postingdata.SizeofService);
    setFedFromPMTSS(Postingdata.FedFromPMTSS);

    setPMTSSCode(Postingdata.PmtSSCode);
    setConnectedLoad(Postingdata.ConnectedLoad);
    setContractLoad(Postingdata.ContractLoad);
    setConnectedLoadKW(Postingdata.ConnectedLoadKW);
    setRunningLoadKW(Postingdata.RunningLoadKW);

    setPowerKENo(Postingdata.Powerkeno);
    setPowerMeterMake(Postingdata.Powermetermake);
    setPowerMC(Postingdata.Powermc);
    setPowerReading(Postingdata.Powerreading);
    setPowerMDIOnReading(Postingdata.Powermdionreading);
    setCurrentReading(Postingdata.CurrentReading);
    setPeakReading(Postingdata.PeakReading);

    setLightKENo(Postingdata.Lightkeno);
    setLightMeterMake(Postingdata.Lightmetermake);
    setLightMC(Postingdata.Lightmc);
    setLightReading(Postingdata.Lightreading);
    setLightMDIOnReading(Postingdata.Lightmdionreading);
    setLightPeakReading(Postingdata.Lightpeakreading);
    setLightCurrentReading(Postingdata.Lightcurrentreading);
    setLightConsumerNo(Postingdata.Lightconsumerno);

    setMeterTestingResultTC(Postingdata.MeterTestingResultTC);
    setMeterTestingperError(Postingdata.MeterTestingperError);
    setMeterTestingTo(Postingdata.Metertestingto);
    setMeterInstalled1(Postingdata.Meterinstalled1);
    setMeterInstalled2(Postingdata.Meterinstalled2);
    setMeterInstalled(Postingdata.Meterinstalled);
    setFMRNo(Postingdata.Fmrno);
    setStatusPostalorder(Postingdata.Statuspostalorder);
    setmetertestingResultremarks(Postingdata.Metertestingresultremarks);
    setDate(Postingdata.Date1);

    if (Postingdata.PowermeterdetailFlag == 'Y') {
      setPowermeterDetail(Postingdata.Powermeterdetail);
    }

    if (Postingdata.LightmeterdetailFlag == 'Y') {
      setLightmeterdetail(Postingdata.Lightmeterdetail);
    }

    setCheckBoxList(Postingdata.FindingItems);

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

    sirImg.map(i => {
      Allimages.push({
        uri: i.uri,
        url: i.url,
      });
      setImages(Allimages);
    });

    if (caseStatus != 'Planned-Below 40') {
      list.splice(1, 1);
    }
  }, [route.params.index]);

  const showLocation = (latitude1, longitude1) => {
    const loaction11 = {latitude: longitude1, longitude: latitude1};

    openMap({...loaction11});
    //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'
  };

  const [powermeterdetail, setPowermeterDetail] = useState([]);

  const [lightmeterdetail, setLightmeterdetail] = useState([]);

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
  };

  return (
    <ScrollView>
      <View>
        {/* <Animatable.View animation="fadeInRightBig"> */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
          {tab == 'Consumer Detail' && (
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
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: -80,
                      }}>
                      <View
                        style={{
                          marginLeft: 2,
                          flex: 2,
                          alignItems: 'flex-start',
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          Consumer Status
                        </Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', flex: 2.5, width: '50%'}}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {consumerStatus}{' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 20,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Premise/Industry Type{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Tariff{' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <Text style={styles.MeterSystem}> {industryType} </Text>
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.MeterSystem}> {tariff} </Text>
                      </View>
                    </View>

                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text style={styles.text_left}>Service Detail</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Service Type{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Size of Service{' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <Text style={styles.MeterSystem}> {serviceType} </Text>
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {sizeofService}{' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 20,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Fed From PMT/SS{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          PMT/SS Code{' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <Text style={styles.MeterSystem}> {fedFromPMTSS} </Text>
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.MeterSystem}> {pmtSSCode} </Text>
                      </View>
                    </View>

                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <Text style={styles.text_left}>Load Detail</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Connected Load{' '}
                        </Text>
                      </View>

                      <View style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Sanction Load (KW){' '}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {connectedLoad}{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.MeterSystem}> {contractLoad} </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 20,
                      }}>
                      <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Connected Load (KW){' '}
                        </Text>
                      </View>

                      <View style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'normal', color: 'black'}}>
                          {' '}
                          Running Load (KW)
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {connectedLoadKW}{' '}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 2.4,
                          alignItems: 'flex-start',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {runningLoadKW}{' '}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Discrepancy Recorded' && (
            <ScrollView
              horizontal={true}
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
                                keyboardType={'numeric'}
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
          {tab == 'Meter Testing Result' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View
                  style={{
                    //marginTop: 3,
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
                          marginTop: -75,
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
                                marginLeft: 35,
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              TC
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              3600 / (MC x To) =
                            </Text>
                          </View>

                          <View style={{flex: 2, widht: '100%'}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterTestingResultTC}{' '}
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
                          marginTop: -15,
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
                                fontWeight: 'bold',
                                marginLeft: 25,
                                fontSize: 12,
                              }}>
                              % Error
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'normal',
                                color: 'black',
                                fontSize: 12,
                              }}>
                              (Tc - To) / To x 100 =
                            </Text>
                          </View>

                          <View style={{flex: 2, widht: '100%'}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterTestingperError}{' '}
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
                              To =
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterTestingTo}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

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
                        Meter Installed{' '}
                      </Text>
                    </LinearGradient>

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
                              1 )
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterInstalled1}{' '}
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
                              2 )
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {meterInstalled2}{' '}
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
                          marginTop: 25,
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
                                marginTop: 12,
                                fontWeight: 'bold',
                              }}>
                              Action Required
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 2.5,
                              width: '88%',
                              marginTop: 10,
                              marginLeft: 30,
                            }}>
                            <View style={{flex: 2.5, alignItems: 'flex-start'}}>
                              <Text style={styles.MeterSystem}>
                                {' '}
                                {meterInstalled}{' '}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, textAlign: 'right'}}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            color: 'black',
                            marginTop: 15,
                            textAlign: 'left',
                          }}>
                          {' '}
                          Status of Postal Order/ Seal
                        </Text>
                      </View>
                      <View style={{flex: 0.5, marginTop: 20}}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {statusPostalorder}{' '}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        width: '88%',
                        marginTop: 10,
                      }}>
                      <View style={{flex: 0.5, textAlign: 'right'}}>
                        <Text
                          style={{
                            fontWeight: 'normal',
                            color: 'black',
                            marginTop: 15,
                            textAlign: 'left',
                          }}>
                          {' '}
                          Remarks
                        </Text>
                      </View>
                      <View style={{flex: 0.5}}>
                        <Text style={styles.MeterSystem}>
                          {' '}
                          {metertestingResultremarks}{' '}
                        </Text>
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
                              FMR No
                            </Text>
                          </View>

                          <View
                            style={{flex: 2, widht: '100%', marginTop: -10}}>
                            <Text style={styles.MeterSystem}> {fmrNo} </Text>
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
                              Date
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 2,
                              widht: '100%',
                              marginTop: 2,
                              marginLeft: 30,
                            }}>
                            <Text style={{color: 'black'}}>{date1}</Text>
                          </View>
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
                        marginTop: -80,
                        marginLeft: 2,
                      }}>
                      <View
                        style={{flexDirection: 'row', flex: 1, width: '88%'}}>
                        <View style={{flex: 2.5, flexDirection: 'column'}}>
                          {checkBoxList.map(data => {
                            return (
                              <View style={{flexDirection: 'column'}}>
                                <CheckBox
                                  title={data.name}
                                  checked={true}
                                  containerStyle={{
                                    backgroundColor: 'white',
                                    borderColor: 'white',
                                    padding: 0.1,
                                    fontWeight: 'bold',
                                  }}
                                  //  onPress={() => onSelectCheckBox(data.name)}
                                />
                              </View>
                            );
                          })}
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
                              items={items}
                              uniqueKey="id"
                              onSelectedItemsChange={e =>
                                onSelectedItemsChange(e)
                              }
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
                            <Text style={styles.MeterSystem}>
                              {' '}
                              {discrepancyfindingsRemarks}{' '}
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

          {tab == 'Power Meter Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <View
                    style={{
                      //                    marginTop: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.footerInputPower}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: -40,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 2,
                            width: '96%',
                            //  marginTop: 20,
                          }}>
                          <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              KE No{' '}
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
                                {powerKENo}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                {powerMeterMake}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio{' '}
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
                                {powerMC}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              MDI/MDI-Off Reading{' '}
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
                                {powerReading}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              MDI-On Reading{' '}
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
                                {powerMDIOnReading}{' '}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 2,
                            width: '96%',
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              flex: 0.9,
                              alignItems: 'flex-start',
                            }}></View>

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

                      <Card>
                        <DataTable>
                          <DataTable.Header style={styles.databeHeader}>
                            <DataTable.Title
                              style={{
                                flex: 5,
                                color: 'black',
                                textAlign: 'left',
                              }}>
                              CurrentType
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              AMP
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              VOLT
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              PF
                            </DataTable.Title>
                          </DataTable.Header>
                          {powermeterdetail.map((l, i) => (
                            <DataTable.Row style={styles.databeBox} key={i}>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                  placeholder="Current Type"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  value={l.CurrentType}
                                  editable={false}
                                  selectTextOnFocus={false}
                                />
                                {/* {l.test} */}
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateAmp(t, i)}
                                  placeholder="Amp"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  value={l.AMP}
                                />
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateVolt(t, i)}
                                  placeholder="Volt"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  value={l.VOLT}
                                />
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updatePF(t, i)}
                                  placeholder="P.F"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  value={l.PF}
                                />
                              </View>
                            </DataTable.Row>
                          ))}
                        </DataTable>
                      </Card>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {tab == 'Light Meter Detail' && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container1}>
                <View style={styles.mainbox}>
                  <View
                    style={{
                      //                    marginTop: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.footerInputPower}>
                      <View
                        style={{
                          //   flexDirection: 'column',
                          // flex: 8,
                          width: '90%',
                          marginTop: -40,
                          marginLeft: 2,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 2,
                            width: '96%',
                            //  marginTop: 20,
                          }}>
                          <View style={{flex: 0.9, alignItems: 'flex-start'}}>
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              KE No{' '}
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
                                {lightKENo}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                {lightMeterMake}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Meter CT Ratio{' '}
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
                                {lightMC}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                {lightCurrentReading}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
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
                                {lightPeakReading}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              MDI/MDI-Off Reading{' '}
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
                                {lightReading}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              MDI-On Reading{' '}
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
                                {lightMDIOnReading}{' '}
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
                            <Text
                              style={{fontWeight: 'normal', color: 'black'}}>
                              Consumer No{' '}
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
                                {lightConsumerNo}{' '}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <Card>
                        <DataTable>
                          <DataTable.Header style={styles.databeHeader}>
                            <DataTable.Title
                              style={{
                                flex: 5,
                                color: 'black',
                                textAlign: 'left',
                              }}>
                              CurrentType
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              AMP
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              VOLT
                            </DataTable.Title>
                            <DataTable.Title style={{flex: 5, color: 'black'}}>
                              PF
                            </DataTable.Title>
                          </DataTable.Header>
                          {lightmeterdetail.map((l, i) => (
                            <DataTable.Row style={styles.databeBox} key={i}>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                  placeholder="Current Type"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  value={l.CurrentType}
                                  editable={false}
                                  selectTextOnFocus={false}
                                />
                                {/* {l.test} */}
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLAmp(t, i)}
                                  placeholder="Amp"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  value={l.AMP}
                                  editable={false}
                                  selectTextOnFocus={false}
                                />
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLVolt(t, i)}
                                  placeholder="Volt"
                                  keyboardType={'numeric'}
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  value={l.VOLT}
                                />
                              </View>
                              <View style={{flex: 5}}>
                                <TextInput
                                  style={styles.input}
                                  onChangeText={t => updateLPF(t, i)}
                                  placeholder="P.F"
                                  placeholderTextColor="black"
                                  fontSize={10}
                                  editable={false}
                                  selectTextOnFocus={false}
                                  value={l.PF}
                                />
                              </View>
                            </DataTable.Row>
                          ))}
                        </DataTable>
                      </Card>
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

export default ApiScreenB40Display;

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
    width: 405,
  },

  footerInputPower: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 70,
    width: 400,
    // height: 200,
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
    margin: 8,
    //height:500,
    width: 407,
    marginLeft: 2,
    //flex: 1,
    justifyContent: 'space-between',
    color: 'black',
  },
  databeBox: {
    margin: 5,
    // width:60,
    textAlign: 'center',
    color: 'black',
  },
  databeHeader: {
    margin: 10,
    textAlign: 'left',
    color: 'black',
  },
  input: {
    width: 80,
    padding: 4,
    color: 'black',
  },

  inputLoadDetail: {
    color: 'black',
    borderBottomWidth: 0.5,
    width: 150,
    // marginTop: -5,
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
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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

  checkboxChecked: {
    backgroundColor: 'black',
  },

  checkboxInput: {
    flexDirection: 'row',

    borderRadius: 7,
    fontSize: 16,
    marginLeft: 10,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',

    backgroundColor: 'black', //'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    margin: 8,
    fontSize: 16,
    color: 'black',
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
    height: 535,
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
