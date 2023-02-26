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
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import base64 from 'react-native-base64';

const LoadingScreenforDataDownload = ({navigation}) => {
  const [Mio, setMio] = useState('');
  const [Ibc, setIbc] = useState('');
  const [loader, setLoader] = useState(false);
  const [MIOData, setMIOData] = useState('');
  const [SIRDigitizationData, setSIRDigitizationData] = useState('');
  const [MRNote, setMRNote] = useState('');
  const [PremiseType, setPremiseType] = useState('');
  const [Tariff, setTariff] = useState('');
  const [DISCREPANCY, setDISCREPANCY] = useState('');
  const [systemmeter, setSystemMeter] = useState([]);
  var SystemMeterData = [];
  var DISCREPANCYData = [];
  const [oldMIOData, setOldMIOData] = useState([]);
  const [oldMIOData2, setOldMIOData2] = useState([
    {
      SANCTION_LOAD: '              4.0000000',
      CONNECTED_LOAD: '              4.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006127',
      Begru: '118',
      Vkont: '400000012295',
      Vertrag: '300045850',
      Erdat: '20221111',
      Ertim: 'PT00H00M00S',
      Ernam: 'MUHSHOAIB',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: 'ZB85,ZB43',
      Random: '',
      SirFormat: 'A40',
      NAME: 'AWAIS  TESTING CL LESS SL',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'AL825469',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
    {
      SANCTION_LOAD: '              1.0000000',
      CONNECTED_LOAD: '              1.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006332',
      Begru: '118',
      Vkont: '400000161126',
      Vertrag: '300070598',
      Erdat: '20221226',
      Ertim: 'PT00H00M00S',
      Ernam: 'DPOCA_118',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: '17',
      Random: '',
      SirFormat: 'B40',
      NAME: 'MR MUHAMMED ASLAM  .',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'AL659699',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
    {
      SANCTION_LOAD: '              1.0000000',
      CONNECTED_LOAD: '              1.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006337',
      Begru: '118',
      Vkont: '',
      Vertrag: '',
      Erdat: '20221226',
      Ertim: 'PT00H00M00S',
      Ernam: 'DPOCA_118',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: '',
      Random: 'X',
      SirFormat: '',
      NAME: 'MR MUHAMMED ASLAM  .',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'AL659699',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
    {
      SANCTION_LOAD: '              4.0000000',
      CONNECTED_LOAD: '              4.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006339',
      Begru: '118',
      Vkont: '400000012228',
      Vertrag: '300045808',
      Erdat: '20221227',
      Ertim: 'PT00H00M00S',
      Ernam: 'MUHSHOAIB',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: 'ZB85',
      Random: '',
      SirFormat: 'ORD',
      NAME: 'M/S ALAM ASSOCIATES  .',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'AL825470',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
    {
      SANCTION_LOAD: '              4.0000000',
      CONNECTED_LOAD: '              4.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006340',
      Begru: '118',
      Vkont: '400000012295',
      Vertrag: '300045850',
      Erdat: '20221227',
      Ertim: 'PT00H00M00S',
      Ernam: 'MUHSHOAIB',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: 'ZB43,ZB85',
      Random: '',
      SirFormat: 'ORD',
      NAME: 'AWAIS  TESTING CL LESS SL',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'AL825469',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
    {
      SANCTION_LOAD: '              2.0000000',
      CONNECTED_LOAD: '              2.0000000',
      Ibc: '',
      Mio: '00000000',
      Mandt: '210',
      Sirnr: '900000006341',
      Begru: '118',
      Vkont: '400000548608',
      Vertrag: '300060511',
      Erdat: '20221227',
      Ertim: 'PT00H00M00S',
      Ernam: 'MUHSHOAIB',
      SirStatus: 'GR',
      AssignMio: '80012777',
      Dp: '23',
      Random: '',
      SirFormat: 'ORD',
      NAME: 'MR. MUHAMMAD DAWOOD  .',
      ADDRESS: 'A/3 A FLAT NO 49 7TH FLOOR DEFENCE CHS',
      CLUSTER: 'C1',
      MIO_NAME: 'Muhammad Asim Khan ITG',
      CONSUMER_NO: 'LB060617',
      OnsiteMeterDetail: [],
      ApplianceDetail: [],
      DescripancyDetail: [],
      PowerMeter: [],
      LightMeter: [],
      Status: '',
    },
  ]);
  const [oldSIRDigitizationData, setOldSIRDigitizationData] = useState([]);

  useEffect(() => {
    console.log('Screen:LoadingScreenforDataDownload:');

    AsyncStorage.getItem('SIRDigitization')
      .then(items => {
        const SIRdata = items ? JSON.parse(items) : [];
        setOldSIRDigitizationData(SIRdata);
        //       console.log('Screen:SIRdata.length: ' + SIRdata.length);
      })
      .then(item => {
        getSystemMeterStoreInDevice();
      });
  }, []);

  const getSystemMeterStoreInDevice = () => {
    AsyncStorage.getItem('SystemMeter')
      .then(items => {
        SystemMeterData = items ? JSON.parse(items) : [];
      })
      .then(res => {
        getLoginCredentials();
      });
  };
  const getLoginCredentials = () => {
    var data1 = [];
    AsyncStorage.getItem('LoginCredentials')
      .then(items => {
        data1 = items ? JSON.parse(items) : [];
        setMio(data1[0].pernr);
        setIbc(data1[0].begru);
        getMIOData(data1[0].pernr, data1[0].begru);
        getDISCREPANCY(data1[0].pernr, data1[0].begru);
      })
      .then(res => {
        //        console.log('Mio:: ', Mio);
        //        console.log('Ibc:: ', Ibc);
      });
  };

  const getMIOData = (mio, ibc) => {
    setLoader(true);

    var MIOData = oldMIOData;
    //   console.log('mio::' + mio);
    //   console.log('ibc::' + ibc);
    axios({
      method: 'get',
      url:
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DOWNLOAD_ASSIGND_MIO_DATA_SRV/ITABSet?$filter=Mio%20eq%20%27' +
        mio +
        '%27%20and%20Ibc%20eq%20%27' +
        ibc +
        '%27&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          _storeData(res.data.d.results, ibc);
        }
      })
      .catch(error => {
        console.error('axios:error:getMIOData: ' + error.message);
      });
  };

  const _storeData = async (sapData, ibc) => {
    var data = [];
    var SIRData = [];
    let count = 0;
    var flag = false;
    var SirnrNo;

    console.log(
      '_storeData:sapData: ' + typeof sapData + ' length: ' + sapData.length,
    );

    try {
      await AsyncStorage.getItem('SIRDigitization')
        .then(items => {
          data = items ? JSON.parse(items) : [];
          //          console.log('SIR DATA***');
          //          console.log(data.length);
          if (data.length == 0) {
            getAppliances();
            getMRNote();
            getPremiseType();
            getTariff();
          }
          /*
          console.log(
            'after filter :data : ' + typeof data + ' length: ' + data.length,
          );
*/
          sapData.forEach(parent => {
            console.log('parent loop' + parent.Sirnr);
            SirnrNo = parent.Sirnr;
            data.forEach((child, index) => {
              console.log('child loop' + child.Sirnr);
              if (child.Sirnr == parent.Sirnr) {
                //                console.log('parent.Sirnr' + parent.Sirnr);
                //                console.log('parent.SirStatus' + parent.SirStatus);
                //               console.log('data[index].Status' + data[index].Status);
                if (parent.SirStatus == 'REVW') {
                  count++;
                  data[index].Status = 'Save';
                  data[index].SirStatus = parent.SirStatus;
                  data[index].REMARKS = parent.REMARKS;
                  //                  console.log('data[index].Status' + data[index].Status);
                  //                  console.log('data.Status' + data.Status);
                }
                flag = true;
              }
            });
            console.log('parent flag' + flag);
            if (flag == false) {
              console.log('parent flag' + flag);
              count++;

              SIRData.push({
                SANCTION_LOAD: parent.SANCTION_LOAD,
                CONNECTED_LOAD: parent.CONNECTED_LOAD,
                Ibc: parent.Ibc,
                Mio: parent.Mio,
                Mandt: parent.Mandt,
                Sirnr: parent.Sirnr,
                Begru: parent.Begru,
                Vkont: parent.Vkont,
                Vertrag: parent.Vertrag,
                Erdat: parent.Erdat,
                Ertim: parent.Ertim,
                Ernam: parent.Ernam,
                SirStatus: parent.SirStatus,
                AssignMio: parent.AssignMio,
                Dp: parent.Dp,
                Random: parent.Random,
                SirFormat: parent.SirFormat,
                NAME: parent.NAME,
                ADDRESS: parent.ADDRESS,
                CLUSTER: parent.CLUSTER,
                MIO_NAME: parent.MIO_NAME,
                CONSUMER_NO: parent.CONSUMER_NO,
                TARIFF: parent.TARIFF,
                IBCNAME: parent.IBCNAME,
                REMARKS: parent.REMARKS,
                CELL_NUMBER: parent.CELL_NUMBER,
                OnsiteMeterDetail: [],
                ApplianceDetail: [],
                DescripancyDetail: [],
                Appliancelist: [],
                PowerMeter: [],
                LightMeter: [],
                Status: '',
              });

              data.push({
                Sirnr: parent.Sirnr,
                Vkont: parent.Vkont,
                Vertrag: parent.Vertrag,
                Erdat: parent.Erdat,
                SirStatus: parent.SirStatus,
                SirFormat: parent.SirFormat,
                REMARKS: parent.REMARKS,
                Status: '',
                Random: parent.Random,
                MIO_NAME: parent.MIO_NAME,
                AssignMio: parent.AssignMio,
                Erdat: parent.Erdat,
                CLUSTER: parent.CLUSTER,
                IBCNAME: parent.IBCNAME,
                NAME: parent.NAME,
                ADDRESS: parent.ADDRESS,
                TARIFF: parent.TARIFF,
                CONSUMER_NO: parent.CONSUMER_NO,
                CELL_NUMBER: parent.CELL_NUMBER,
                Ibc: ibc,
              });

              getSystemMeter(parent.Vertrag);
              AsyncStorage.setItem(SirnrNo, JSON.stringify(SIRData));
            }
            flag = false;
          });
        })
        .then(res => {
          //          console.log('final:data: ' + typeof data + ' length: ' + data.length);
          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data));

          setSIRDigitizationData(count);
        });
    } catch (error) {
      // Error saving data
    }
  };

  const getSystemMeter = contract => {
    //    console.log('contract: ', contract);
    axios({
      method: 'get',
      url:
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DEVICE_METER_REGISTER_SRV/ITABSet?$filter=CONTRACT%20eq%20%270' +
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
            if (
              SystemMeterData.filter(x => x.CONTRACT == contract).length == 0
            ) {
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
              });
              console.log('SystemMeterData ADDED' + contract);
            }
            /*            console.log(
              'contract: ' + contract + ' Anlage: ' + singleResult.Anlage,
            );
*/
          });
        }
      })
      .then(res => {
        //systemMeterObject.contract = SystemMeterData;
        //systemmeter.push(SystemMeterData);
        /*
        console.log(
          'final:SystemMeterData: ' +
            typeof SystemMeterData +
            ' length: ' +
            SystemMeterData.length,
        );*/
        AsyncStorage.setItem('SystemMeter', JSON.stringify(SystemMeterData));
      })
      .catch(error => {
        console.error('axios:error:getSystemMeter: ' + error);
      });
  };

  const getMRNote = () => {
    var MRNoteData = [];
    axios({
      method: 'get',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DG_SRV/GET_MRNOTESet?$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            MRNoteData.push({
              id: singleResult.Ablhinw,
              name: singleResult.Tablhinw,
            });
          });
        }
      })
      .then(res => {
        /*
        console.log(
          'final:MRNoteData: ' +
            typeof MRNoteData +
            ' length: ' +
            MRNoteData.length,
        );*/
        AsyncStorage.setItem('MRNote', JSON.stringify(MRNoteData));
        setMRNote(
          'final:MRNoteData: ' +
            typeof MRNoteData +
            ' length: ' +
            MRNoteData.length,
        );
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const getPremiseType = () => {
    var PremiseTypeData = [];
    axios({
      method: 'get',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DG_SRV/ZGET_PREMISE_TYPESet?$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            PremiseTypeData.push({
              label: singleResult.Vbsarttext,
              value: singleResult.Vbsart,
            });
          });
        }
      })
      .then(res => {
        /*
        console.log(
          'final:PremiseTypeData: ' +
            typeof PremiseTypeData +
            ' length: ' +
            PremiseTypeData.length,
        );*/
        AsyncStorage.setItem('PremiseType', JSON.stringify(PremiseTypeData));
        setPremiseType(
          'final:PremiseTypeData: ' +
            typeof PremiseTypeData +
            ' length: ' +
            PremiseTypeData.length,
        );
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const getAppliances = () => {
    var AppliancesData = [];
    axios({
      method: 'get',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DG_SRV/GET_APPLIANCESet?$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        let count = 0;
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            AppliancesData.push({
              label: singleResult.Zzsiraname,
              value: singleResult.Zzsiraname,
              RATING: singleResult.RATING,
            });
            count++;
          });
        }
      })
      .then(res => {
        /*
        console.log(
          'final:AppliancesData: ' +
            typeof AppliancesData +
            ' length: ' +
            AppliancesData.length,
        );*/
        AsyncStorage.setItem('Appliances', JSON.stringify(AppliancesData));
        setPremiseType(
          'final:AppliancesData: ' +
            typeof AppliancesData +
            ' length: ' +
            AppliancesData.length,
        );
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const getTariff = () => {
    var TariffData = [];
    axios({
      method: 'get',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DG_SRV/get_tariffSet?$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            TariffData.push({
              label: singleResult.Ttypbez,
              value: singleResult.Tariftyp,
            });
          });
        }
      })
      .then(res => {
        /*
        console.log(
          'final:TariffData: ' +
            typeof TariffData +
            ' length: ' +
            TariffData.length,
        );*/
        AsyncStorage.setItem('Tariff', JSON.stringify(TariffData));
        setTariff(
          'final:TariffData: ' +
            typeof TariffData +
            ' length: ' +
            TariffData.length,
        );
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const getDISCREPANCY = (mio, ibc) => {
    axios({
      method: 'get',
      url:
        'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZSIR_DOWNLOAD_ASSIGND_MIO_DATA_SRV/IT_DISCREPANCYSet?$filter=Mio%20eq%20%27' +
        mio +
        '%27%20and%20Ibc%20eq%20%27' +
        ibc +
        '%27&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('fioriqa:sapsap2'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            DISCREPANCYData.push({
              Code: singleResult.Code,
              Priority: singleResult.Priority,
              Id: singleResult.Id,
              Des: singleResult.Des,
              SIR: singleResult.SIR,
            });
            console.log('DISCREPANCY ADDED' + singleResult.SIR);
          });
        }
      })
      .then(res => {
        /*
        console.log(
          'final:DISCREPANCY: ' +
            typeof DISCREPANCYData +
            ' length: ' +
            DISCREPANCYData.length,
        );*/
        AsyncStorage.setItem('DISCREPANCY', JSON.stringify(DISCREPANCYData));
        setDISCREPANCY(
          'final:DISCREPANCY: ' +
            typeof DISCREPANCYData +
            ' length: ' +
            DISCREPANCYData.length,
        );
        setLoader(false);
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#1565C0',
            marginTop: 70,
            paddingLeft: 20,
          }}>
          <ActivityIndicator
            size="large"
            style={{transform: [{scaleX: 5}, {scaleY: 5}]}}
            color="white"
          />
        </View>
      ) : (
        <>
          <Text style={{color: 'white', fontSize: 15}}>IBC: {Ibc}</Text>
          <Text style={{color: 'white', fontSize: 15}}>MIO: {Mio}</Text>
          <Text style={{color: 'white', fontSize: 15}}>
            Total SIR cases downloaded : {SIRDigitizationData}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1565C0',
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default LoadingScreenforDataDownload;
