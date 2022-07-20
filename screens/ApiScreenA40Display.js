import React, { useState, useRef, useEffect, createRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView, Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import {
     DefaultTheme, configureFonts,

    

    DataTable,
} from 'react-native-paper';


import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import openMap from 'react-native-open-maps';

let current = 100;

const ApiScreenA40Display = ({ route, navigation }) => {
    const scrollRef = useRef(null);
    const [pos, setPos] = React.useState(0);
    const [tab, setTab] = useState('Consumer Detail');
    const [loader, setLoader] = useState(false);
    const sign = createRef();
    const [signaturePreview, setSign] = useState(null);



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


    let onSelectedItemsChange = selectedItems => {
       null
    };

    const [list, setList] = useState([
        {
            id: 1,
            name: 'Consumer Detail',
            active: true,
        },


        {
            id: 3,
            name: 'Status of Postal Order/Seal',
            active: false,
        },
        {
            id: 4,
            name: 'Testing By Time Power Method',
            active: false,
        },
        {
            id: 2,
            name: 'Metering Equipment Detail',
            active: false,
        },
        {
            id: 5,
            name: 'Discrepancy and Findings',
            active: false,
        },


        {
            id: 6,
            name: 'Customer Acknowlegment',
            active: false,
        },

        {
            id: 7,
            name: 'SIR Pictures',
            active: false,
        },


    ]);


    
    const [images, setImages] = useState([]);  
    const [images1, setImages1] = useState([]);  
    const [indexSelected, setIndexSelected] = useState(0);
    const [imageview, setimageview] = useState(false);
    const [indexer1, setindexer1] = useState(0);
    const { width } = Dimensions.get('window');
 

 
    /* Consumer Detail */
    const [tableData, settableData] = useState([]);

    const [consumerStatus, setConsumerStatus] = useState("");
    const [industryType, setIndustryType] = useState("");
    const [tariff, setTariff] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [sizeofService, setSizeofService] = useState("");
    const [fedFromPMTSS, setFedFromPMTSS] = useState("");
    const [pmtSSCode, setPMTSSCode] = useState("");
    const [connectedLoad, setConnectedLoad] = useState("");
    const [contractLoad, setContractLoad] = useState("");
    const [connectedLoadKW, setConnectedLoadKW] = useState("");
    const [runningLoadKW, setRunningLoadKW] = useState("");
    /* Conumer Detail ------------ End  */

   
    const [currentAmp, setCurrentAmp] = useState("");
    const [voltageKV, setVoltageKV] = useState("");
    const [powerFactor, setPowerFactor] = useState("");
    const [kto, setKto] = useState("");
    const [perError, setPerError] = useState("");

    const [powerCalculated, setPowerCalculated] = useState("");
    const [powerObserved, setPowerObserved] = useState("");



 

    
    /* Meter Testing Result ------------ Start */
  
    const [meterInstalled1, setMeterInstalled1] = useState("");
    const [meterInstalled2, setMeterInstalled2] = useState("");
    const [meterInstalled, setMeterInstalled] = useState("");
 
    /* Meter Testing Result ------------ End */

    /* Discrepancy and Findings ------------ Start */
    const [discrepancyfindingsRemarks, setdiscrepancyfindingsRemarks] = useState("");
    const [DiscrepancyFinding, setDiscrepancyFinding] = useState([]);
    /* Discrepancy and Findings ------------ End */

    /* Customer Acknowlegment ------------ Start */

    const [consumerName, setConsumerName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [consumerNameCNIC, setconsumerNamecNIC] = useState("");
    const [consumerRemarks, setConsumerRemarks] = useState("");
    const [consumerRefuseYN, setConsumerRefuseYN] = useState("");
    const [consumerSign, setConsumerSign] = useState("");

    /* Customer Acknowlegment ------------ End */

    const [SIR, setSIR] = useState("");
    const [cosnumerno, setCosnumerno] = useState("");

    const [clusterIBC, setClusterIBC] = useState("");
    const [consumernameBilling, setConsumernameBilling] = useState("");
    const [accountno, setAccountno] = useState("");
    const [address, setAddress] = useState("");
    const [assigndate, setAssigndate] = useState("");
    const [assignto, setAssignto] = useState("");
    const [isSignature, setIsSignature] = useState("N");

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
            animated: true
        });
    };

    const [CaseType, setCaseType] = useState();

    const [meteringEquipment, setMeteringEquipment] = useState([ ]);
    const [postalOrderSeal, setPostalOrderseal] = useState([]);
    const [meterInstalled3, setMeterInstalled3] = useState("");
    const [latitude, setlatitude] = useState("");
    const [longitude, setlongitude] = useState("");


    useEffect(() => {
        // getApiData();
        setLoader(true);
        // console.log("route.params.index", route.params.data);

        let Allimages = []
        let Postingdata = route.params.data;
        let consSign1 = route.params.data.ConsumerSignature;
        let consumerImg = route.params.data.ConsumerImages;
        let sirImg = route.params.data.SIRImages;
        let caseStatus = Postingdata.CaseType + "-" + Postingdata.SIRType;
        settableData([Postingdata]);

       
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
        setMeteringEquipment(Postingdata.MeteringEquipment);
        setPostalOrderseal(Postingdata.PostalOrderSeal);
        setMeterInstalled1(Postingdata.Meterinstalled1);
        setMeterInstalled2(Postingdata.Meterinstalled2);
        setMeterInstalled(Postingdata.Meterinstalled);
        setMeterInstalled3(Postingdata.MeterInstalled3);
        setPowerFactor(Postingdata.PowerFactor);
        setKto(Postingdata.Kto);
        setPerError(Postingdata.PerError);
        setPowerCalculated(Postingdata.PowerCalculated);
        setPowerObserved(Postingdata.PowerObserved);
        setCurrentAmp(Postingdata.Amperes);
        setVoltageKV(Postingdata.Volts);
        setCheckBoxList(Postingdata.FindingItems);
        setConsumerName(Postingdata.ConsumerName);
        setMobileNo(Postingdata.MobileNo);
        setconsumerNamecNIC(Postingdata.ConsumerCNIC);
        setConsumerRemarks(Postingdata.ConsumerRemarks);
        setConsumerRefuseYN(Postingdata.ConsumerRefuseYN);
        setConsumerSign(Postingdata.ConsumerSign);
        setIsSignature("Y");
        if (Postingdata.IsSignature == "Y") {
            setSign(consSign1[0].consSign);
        }

        if (Postingdata.SIRImageFlag == "Y") {
            setImages1(consumerImg[0].base64);
        }

        setCaseType(Postingdata.CaseType + "-" + Postingdata.SIRType);

        if (Postingdata.SIRImageFlag == "Y") {
        sirImg.map((i) => {
            Allimages.push({
                uri: i.uri,
                url: i.url
            })
            setImages(Allimages);
        })
    }

       /* if (caseStatus != "Planned-Below 40") {
            list.splice(1, 1);
        }*/
        

    }, [route.params.index]);




    const showLocation = (latitude1, longitude1) => {
        const loaction11 = { latitude: longitude1, longitude: latitude1 };
    
        openMap({ ...loaction11 }); 
        //,  zoom: 30,  provider: 'google',  start: 'Karachi',  end: 'Karachi'
    
      }



    const widerCell = {

        // width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        backgroundColor: '#8C52FF',
        color: 'black',
        borderColor: '#fff'
    };
    const meteringEquipCell = {

        // width: 300,
        marginLeft: 10,
        minWidth: 70,
        borderRightWidth: 2,
        height: 45,
        borderColor: 'white'
    };
    const meteringEquipCelltext = {

        color: 'white',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 14
    };
    const meteringEquipCellvalue = {

        // width: 300,
        marginLeft: 10,
        minWidth: 100,
        borderRightWidth: 2,
        height: 45,
        borderColor: 'white'
    };




    const theme = {
        ...DefaultTheme,

        animation: {
            scale: 1.0,
        },
        roundness: 4,
        colors: {
            ...DefaultTheme.colors,
            text: 'white',
        },

    };

    const borderCell = {

        minWidth: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        fontWeight: 'bold',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50


    };


    const borderCell1 = {
        borderRightWidth: 2,
        // minWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        borderRightColor: 'white',
        height: 50

    };

    const dataCell1 = {
        borderWidth: .5,
        minWidth: 112,
        padding: 3,
        marginLeft: -20,
        justifyContent: 'center',
        alignItems: 'center'
    };

    const dataCell2 = {
        borderWidth: .5,
        minWidth: 122,
        padding: 3,
        // marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell3 = {
        borderWidth: .5,
        minWidth: 142,
        padding: 3,
        // marginLeft:20,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell4 = {
        borderWidth: .5,
        minWidth: 163,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell5 = {
        borderWidth: .5,
        minWidth: 117,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };
    const dataCell6 = {
        borderWidth: .5,
        minWidth: 167,
        padding: 3,
        // marginLeft:-1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
    };

    const borderCell2 = {

        minWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50

    };



    const borderCell3 = {

        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
    };
    const borderCell4 = {

        minWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
    };
    const borderCell5 = {

        minWidth: 58,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 2,
        borderRightColor: 'white',
        height: 50
    };


    let onChangeTabHandler = (name, id) => {
        setTab(name);
        console.log(pos);
        if (id == 1) {
            scrollRef.current.scrollTo({ x: pos });
        } else if (id == list.length - 1) {
            scrollRef.current.scrollTo({ x: pos - 120 });
        } else {
            scrollRef.current.scrollTo({ x: pos + 120 });
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
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

                        <View style={{ paddingTop: 20 }}></View>
                        <View style={{ padding: 5, marginBottom: 10 }}></View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
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

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                           
                         <TouchableOpacity
                         style={{
                            flexDirection: 'row',
                            marginHorizontal: 8,
                            padding: 5,
                          }}
                      
                             onPress={() => showLocation(longitude, latitude)// showLocationNew([item.longitude1, item.latitude1]) 


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
                                       <Icon name="location-pin" size={30} color="orange"   />  
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
                                                { color: li.active == true ? '#fff' : '#000' },
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



                                        <View style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: -80 }}>

                                            <View style={{ marginLeft: 2, flex: 2, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    Consumer Status
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', flex: 2.5, width: '50%' }}>


                                                <Text style={styles.MeterSystem}> {consumerStatus} </Text>
                                            </View>


                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                                            <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Premise/Industry Type  </Text>
                                            </View>

                                            <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Tariff </Text>

                                            </View>
                                        </View>


                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>

                                                <Text style={styles.MeterSystem}> {industryType} </Text>
                                            </View>

                                            <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>

                                                <Text style={styles.MeterSystem}> {tariff} </Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>

                                            <Text style={styles.text_left}>Service Detail</Text>

                                        </View>


                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Service Type </Text>
                                            </View>

                                            <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Size of Service </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>


                                                <Text style={styles.MeterSystem}> {serviceType} </Text>

                                            </View>

                                            <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>


                                                <Text style={styles.MeterSystem}> {sizeofService} </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                                            <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Fed From PMT/SS </Text>
                                            </View>

                                            <View style={{ flex: 0.5, alignItems: 'flex-start', marginLeft: 20 }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> PMT/SS Code </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>

                                                <Text style={styles.MeterSystem}> {fedFromPMTSS} </Text>
                                            </View>

                                            <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>

                                                <Text style={styles.MeterSystem}> {pmtSSCode} </Text>
                                            </View>
                                        </View>


                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>

                                            <Text style={styles.text_left}>Load Detail</Text>

                                        </View>



                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Connected Load </Text>
                                            </View>

                                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Sanction Load (KW) </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>

                                                <Text style={styles.MeterSystem}> {connectedLoad} </Text>
                                            </View>

                                            <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>

                                                <Text style={styles.MeterSystem}> {contractLoad} </Text>
                                            </View>
                                        </View>



                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 20 }}>
                                            <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Connected Load (KW) </Text>
                                            </View>

                                            <View style={{ flex: 0.5, alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}> Running Load (KW)</Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{ flexDirection: 'row', flex: 1, width: '88%', marginTop: 10 }}>
                                            <View style={{ flex: 2.5, alignItems: 'flex-start' }}>

                                                <Text style={styles.MeterSystem}> {connectedLoadKW} </Text>
                                            </View>

                                            <View style={{ flex: 2.4, alignItems: 'flex-start', marginLeft: 20 }}>

                                                <Text style={styles.MeterSystem}> {runningLoadKW} </Text>
                                            </View>
                                        </View>




                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )}                   
                    {tab == 'Metering Equipment Detail' && (
                        <ScrollView
                            horizontal={true}>


                            <View style={styles.container1}>

                                <View style={styles.footerInputMeterInstalled}>

                                    <View style={{ flex: 0.9, width: 380, alignItems: 'flex-start' }}>

                                        <LinearGradient
                                            colors={['#1565C0', '#64b5f6']}
                                            style={styles.otherMeterInstalled}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}> Other Meter Installed </Text>
                                        </LinearGradient>
                                    </View>

                                    <View
                                        style={{
                                            //   flexDirection: 'column',
                                            // flex: 8,
                                            width: '20%',
                                            marginTop: -2,
                                            marginLeft: 20,
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                flex: 2,
                                                //  width: '96%',
                                                marginTop: 4,
                                            }}>
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    1 - {' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,

                                                    }}>
                                                    <Text style={styles.MeterSystem}> {meterInstalled} </Text>
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
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    2 -{' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                      <Text style={styles.MeterSystem}> {meterInstalled1} </Text>
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
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    3 -{' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                     <Text style={styles.MeterSystem}> {meterInstalled2} </Text>
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
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                    4 - {' '}
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
                                                        marginTop: -5,
                                                        marginLeft: -100,
                                                    }}>
                                                      <Text style={styles.MeterSystem}> {meterInstalled3} </Text>
                                                </View>
                                            </View>
                                        </View>




                                    </View>
                                </View>

                                <View style={styles.mainbox}>
                                    <View
                                        style={{
                                            //                    marginTop: 3,  //footerInputPower2
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        <View style={styles.footerInputPower2}>

                                            <DataTable>
                                                <DataTable.Header style={widerCell}  >
                                                    <DataTable.Cell style={meteringEquipCell}  >
                                                        <Text style={meteringEquipCelltext} > Register</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >KE No </Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Reading</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >M.F</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >MDI</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Make</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >MC</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Meter CT ratio</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Meter CT ratio</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Blng Mode</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={meteringEquipCell} >
                                                        <Text style={meteringEquipCelltext} >Remarks</Text>
                                                    </DataTable.Cell>
                                                </DataTable.Header>
                                                {meteringEquipment.map((l, i) => (
                                                    <DataTable.Row style={styles.databeBox} key={i}>
                                                        <View >
                                                            <TextInput
                                                                style={{ width: 130, borderRightColor: 'black', borderRightWidth: 1., borderLeftColor: 'black', borderLeftWidth: 1, marginLeft: -20, textAlign: 'center' }}
                                                                // onChangeText={t => updateCurrentTypeLoadDetail(t, i)}
                                                                placeholder="Register"
                                                                editable={false}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                color='black'
                                                                value={l.Register}  
                                                                
                                                                selectTextOnFocus={false}
                                                            />

                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 124, borderRightColor: 'black', borderRightWidth: 1 ,color:'black'}}
                                                                onChangeText={t => updateKENo(t, i)}
                                                                placeholder="KE No"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.KENo}
                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateReading(t, i)}
                                                                placeholder="Reading"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Reading}
                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMF(t, i)}
                                                                placeholder="M.F"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MF}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMDI(t, i)}
                                                                placeholder="MDI"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MDI}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 120, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMake(t, i)}
                                                                placeholder="Make"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Make}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMC(t, i)}
                                                                placeholder="MC"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MC}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMeterCTratio1(t, i)}
                                                                placeholder="Meter CT ratio"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MeterCTratio1}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 120, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateMeterCTratio2(t, i)}
                                                                placeholder="Meter CT ratio"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.MeterCTratio2}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateBlngMode(t, i)}
                                                                placeholder="Blng Mode"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.BlngMode}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={meteringEquipCellvalue}>
                                                            <TextInput
                                                                style={{ width: 122, borderRightColor: 'black', borderRightWidth: 1, color:'black' }}
                                                                onChangeText={t => updateRemarks(t, i)}
                                                                placeholder="Remarks"
                                                                placeholderTextColor="black"
                                                                fontSize={12}
                                                                value={l.Remarks}                                                                
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                    </DataTable.Row>
                                                ))}
                                            </DataTable>
                                        </View>
                                    </View>


                                </View>
                            </View>
                        </ScrollView>
                    )}
                    {tab == 'Status of Postal Order/Seal' && (
                        <ScrollView
                            horizontal={true}>
                                


                            <View style={styles.container1}>
                                <View style={styles.mainbox}>
                                    
                                    <View
                                        style={{
                                            //                    marginTop: 3,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={styles.footerInputPower1}>

                                            <DataTable>
                                                <DataTable.Header style={widerCell} textStyle={{ fontWeight: 'bold' }}>
                                                    <DataTable.Cell style={borderCell1} >
                                                        <Text style={meteringEquipCelltext} >Meter</Text>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell2}>
                                                        <Text style={meteringEquipCelltext} > Main Cover</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell}>
                                                        <Text style={meteringEquipCelltext} > Terminal Cover</Text>


                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell}>
                                                        <Text style={meteringEquipCelltext} >  At B/CT Chamber</Text>


                                                    </DataTable.Cell>

                                                    <DataTable.Cell style={borderCell3}>
                                                        <Text style={meteringEquipCelltext} >   PT Fuse And PT Side</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell4}>
                                                        <Text style={meteringEquipCelltext} >    Panel Door</Text>

                                                    </DataTable.Cell>
                                                    <DataTable.Cell style={borderCell5}>
                                                        <Text style={meteringEquipCelltext} >     Main Cover Plate and Terminal Seal</Text>


                                                    </DataTable.Cell>
                                                </DataTable.Header>
                                                {postalOrderSeal.map((l, i) => (
                                                    <DataTable.Row style={styles.databeBox} key={i}>
                                                        <View style={dataCell1}>
                                                            <TextInput
                                                                style={{ color: 'black' }}
                                                                placeholder="Meter"
                                                                editable={false}
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.Meter}
                                                            />

                                                        </View>
                                                        <View style={dataCell2}>
                                                            <TextInput
                                                                style={styles.input}
                                                               // onChangeText={t => updateMainCover(t, i)}
                                                                placeholder="Main Cover"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.MainCover}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={dataCell3}>
                                                            <TextInput
                                                                style={styles.input}
                                                              //  onChangeText={t => updateTerminalCover(t, i)}
                                                                placeholder="Terminal Cover"
                                                                keyboardType={'email-address'}
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.TerminalCover}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={dataCell3}>
                                                            <TextInput
                                                                style={styles.input}
                                                               // onChangeText={t => updateChamber(t, i)}
                                                                placeholder="At B/CT Chamber"
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.Chamber}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={dataCell4}>
                                                            <TextInput
                                                                style={styles.input}
                                                              //  onChangeText={t => updatePTfuse(t, i)}
                                                                placeholder="PT Fuse And PT Side"
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.PTfuse}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>

                                                        <View style={dataCell5}>
                                                            <TextInput
                                                                style={styles.input}
                                                             //   onChangeText={t => updatePanelDoor(t, i)}
                                                                placeholder="Panel Door"
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.PanelDoor}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                        <View style={dataCell6}>
                                                            <TextInput
                                                                style={styles.input}
                                                              //  onChangeText={t => updateCoverPlate(t, i)}
                                                                placeholder="Main Cover Plate"
                                                                placeholderTextColor="black"
                                                                fontSize={10}
                                                                value={l.MainCoverPlate}
                                                                editable={false}
                                                                selectTextOnFocus={false}
                                                            />
                                                        </View>
                                                    </DataTable.Row>
                                                ))}
                                            </DataTable>
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
                                                style={{ flexDirection: 'row', flex: 1, width: '88%' }}>
                                                <View style={{ flex: 2.5, flexDirection: 'column' }}>

                                                    {checkBoxList.map(data => {
                                                        return (
                                                            <View style={{ flexDirection: 'column' }}>
                                                                <CheckBox
                                                                    title={data.name}

                                                                    checked={true}
                                                                    containerStyle={{ backgroundColor: 'white', borderColor: 'white', padding: .1, fontWeight: 'bold' }}
                                                                //  onPress={() => onSelectCheckBox(data.name)}

                                                                />
                                                            </View>
                                                        )
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
                                                        justifyContent: 'center'
                                                    }}>





                                                    <LinearGradient
                                                        colors={['#1565C0', '#64b5f6']}
                                                        style={styles.signIn}
                                                    >
                                                        <Text style={[styles.textSign, {
                                                            color: '#fff'
                                                        }]}>  Discrepancy</Text>
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
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <View style={styles.multiSelectContainer}>
                                                        <MultiSelect
                                                             items={items}
                                                             uniqueKey="id"
                                                             onSelectedItemsChange={e => onSelectedItemsChange(e)}
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
                                                             searchInputStyle={{ color: 'black' }}
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
                                                        justifyContent: 'center'
                                                    }}>


                                                    <LinearGradient
                                                        colors={['#1565C0', '#64b5f6']}
                                                        style={styles.signIn}
                                                    >
                                                        <Text style={[styles.textSign, {
                                                            color: '#fff'
                                                        }]}>   Remarks{' '}</Text>
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
                                                    <View style={{ flex: 2, alignItems: 'flex-start' }}>
                                                        <Text style={styles.MeterSystem}> {discrepancyfindingsRemarks} </Text>
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
                                                        flexDirection: 'row',
                                                        flex: 1,
                                                        width: '88%',
                                                        alignSelf: 'center',
                                                    }}>
                                                    <View style={{ flex: 2, alignItems: 'flex-start' }}>
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
                                                        flexDirection: 'row',
                                                        flex: 1,
                                                        width: '88%',
                                                        alignSelf: 'center',
                                                    }}>
                                                    <View style={{ flex: 2, alignItems: 'flex-start' }}>
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
                                                        flexDirection: 'row',
                                                        flex: 1,
                                                        width: '88%',
                                                        alignSelf: 'center',
                                                    }}>
                                                    <View style={{ flex: 2, alignItems: 'flex-start' }}>
                                                     </View>
                                                </View>
                                            </View>




                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                    {tab == 'Testing By Time Power Method' && (
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
                                                    marginTop: -20,
                                                    marginLeft: 2,
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        flex: 2,
                                                        width: '96%',
                                                        //  marginTop: 20,
                                                    }}>
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Current (AMP){' '}
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
                                                                <Text style={styles.MeterSystem}> {currentAmp} </Text>
 
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Voltage (KV){' '}
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
                                                          <Text style={styles.MeterSystem}> {voltageKV} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Power Factor{' '}
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
                                                             <Text style={styles.MeterSystem}> {powerFactor} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Kto{' '}
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
                                                             <Text style={styles.MeterSystem}> {kto} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            % Error ={' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            (KWo)(KWc)/KWc x 100 ={' '}
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
                                                            <Text style={styles.MeterSystem}> {perError} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Power Calculated/ {' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            KWo{' '}
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
                                                            <Text style={styles.MeterSystem}> {powerCalculated} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
                                                            Power Observed/{' '}
                                                        </Text>
                                                        <Text style={{ fontWeight: 'normal', color: 'black', fontSize: 10 }}>
                                                            KWo{' '}
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
                                                            <Text style={styles.MeterSystem}> {powerObserved} </Text>
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
                                                    <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                        <Text style={{ fontWeight: 'normal', color: 'black' }}>
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
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'normal', color: 'black' }}>
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
                                                        <Text style={styles.MeterSystem}> {consumerName} </Text>
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
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'normal', color: 'black' }}>
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


                                            <View style={{
                                                flexDirection: 'row',
                                                flex: 2,
                                                width: '96%',
                                                marginTop: 20,
                                            }}>
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'normal', color: 'black' }}>
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
                                                        <Text style={styles.MeterSystem}> {consumerNameCNIC} </Text>
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
                                                <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                    <Text style={{ fontWeight: 'normal', color: 'black' }}>
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
                                                    <View style={{ flex: 2, alignItems: 'flex-start' }}>
                                                        <Text style={styles.MeterSystem}> {consumerRemarks} </Text>
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
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
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


                                                    <Text style={styles.MeterSystem}> {consumerRefuseYN} </Text>
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
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
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

                                                    <Text style={styles.MeterSystem}> {consumerSign} </Text>
                                                </View>
                                            </View>
                                        </View>




                                        <View style={[styles.container1]}>
                                            <View style={{ flexDirection: 'row', flex: 0.2, width: '96%' }}>
                                                <View style={{ flex: 1, alignItems: 'flex-start' }}>

                                                    <Text style={styles.text_left}>Picture (Optional)</Text>

                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>



                                                    <Image
                                                        resizeMode={"contain"}
                                                        style={{ width: 114, height: 114 }}

                                                        source={{
                                                            uri: 'data:image/png;base64,' + images1,
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            flex: 2,
                                            width: '96%',
                                            marginTop: 10,
                                        }}>
                                            <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                                <Text style={{ fontWeight: 'normal', color: 'black' }}>
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
                                                                        resizeMode={"contain"}
                                                                        style={{ width: 114, height: 114 }}
                                                                        //source={{ base64: signaturePreview}}
                                                                        source={{
                                                                            uri: 'data:image/png;base64,' + signaturePreview,
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
                                            }}>
                                        </View>










                                        <LinearGradient
                                            colors={['#1565C0', '#64b5f6']}
                                            style={styles.signIn}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}> Photos of Surveyed Meter</Text>
                                        </LinearGradient>




                                        <View
                                            style={{
                                                flex: 2, alignItems: 'center',
                                                justifyContent: 'center',
                                                // height: 50,
                                                flexDirection: 'row',
                                                marginVertical: 10,
                                                marginLeft: 30,
                                                // paddingHorizontal: 110,  
                                            }}>


                                            <Carousel

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
                                                onSnapToItem={index => onSelect(index)}
                                            />
                                        </View>
                                        <Pagination
                                            inactiveDotColor='gray'
                                            dotColor={'orange'}
                                            activeDotIndex={indexSelected}
                                            dotsLength={images.length}
                                            animatedDuration={150}
                                            inactiveDotScale={1}
                                        />
                                        <Modal visible={imageview} transparent={true}
                                            closeOnClick={true}
                                        >




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

                                                        routes: [{ name: 'Planned Saved SIR' }],
                                                    });

                                                }}>


                                                <LinearGradient
                                                    colors={['#1565C0', '#64b5f6']}
                                                    style={styles.submit}
                                                >
                                                    <Text style={[styles.textSign, {
                                                        color: '#fff'
                                                    }]}>Ok</Text>
                                                </LinearGradient>



                                            </TouchableOpacity>

                                        </View>
                                        <View style={{ flex: 6, flexDirection: 'row' }}>
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
                                                    <View style={{ flex: 2 }}>
                                                        <Text
                                                            style={{
                                                                fontWeight: 'normal',
                                                                color: 'black',
                                                                fontSize: 12,
                                                            }}>

                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{ flex: 2, widht: '100%', marginTop: -10 }}>



                                                    </View>
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

export default ApiScreenA40Display;

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
        height: 180,
        marginTop: 10,
        justifyContent: 'center',
        // borderWidth: .5,

        borderColor: 'black',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
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

    footerInputMeterInstalled: {
        //  flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        width: 1500,
        marginLeft: 8
        // height: 200,

    },


    footerInputPower1: {
        // flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        marginLeft:-5,
        width: 1000,
        height:550,
        // minWidth: 150,

    },

    footerInputPower2: {
        // flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 70,
        width: 1500,
        // minWidth: 150,

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
        //width:500,
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
        margin: 2,
        textAlign: 'left',
        color: 'black',

    },
    databeHeader1: {
        margin: 2,
        marginTop: -30,
        textAlign: 'left',
        color: 'white',
        flexWrap: 'wrap',
        paddingHorizontal: 0,
        backgroundColor: 'lightgreen',
        height: 100,

    },
    input: {
        width: 80,
        padding: 4,
        color: 'black',
    },

    inputMeteringEquipvalue: {
        minWidth: 70,
        padding: 4,
        color: 'black',
    },

    inputLoadDetail: {
        color: 'black',
        borderBottomWidth: 0.5,
        width: 150
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
        paddingVertical: 10
        //padding: 15,
    },

    signIn: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    otherMeterInstalled: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: -50
    },

    submit: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },


    signatureSubmit: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },


    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    checkboxChecked: {
        backgroundColor: 'black',
    },

    checkboxInput: {
        flexDirection: "row",

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

        backgroundColor: 'black',//'transparent',

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },


    label: {
        margin: 8,
        fontSize: 16,
        color: 'black'
    },

    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
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
        height: 535
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: -10,
        marginLeft: -100
    },
    previewText: {
        color: "red",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10,
    },


});