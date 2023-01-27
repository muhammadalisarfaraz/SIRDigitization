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

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64';

const DownloadMasterData = ({navigation}) => {
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
  const [oldMIOData, setOldMIOData] = useState([]);

  const [oldSIRDigitizationData, setOldSIRDigitizationData] = useState([]);

  useEffect(() => {
    console.log('Screen:Download Master Data:');
    getAppliances();
    getMRNote();
    getPremiseType();
    getTariff();
  }, []);

  const getLoginCredentials = () => {
    AsyncStorage.getItem('LoginCredentials')
      .then(items => {
        var data1 = [];
        data1 = items ? JSON.parse(items) : [];
        setMio(data1[0].pernr);
        setIbc(data1[0].begru);
        getMIOData(data1[0].pernr, data1[0].begru);
        getDISCREPANCY(data1[0].pernr, data1[0].begru);
      })
      .then(res => {
        console.log('Mio:: ', Mio);
        console.log('Ibc:: ', Ibc);
        getAppliances();
        getMRNote();
        getPremiseType();
        getTariff();
      });
  };
  const getMIOData = (mio, ibc) => {
    setLoader(true);

    var MIOData = oldMIOData;
    console.log('mio::' + mio);
    console.log('ibc::' + ibc);
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
          _storeData(res.data.d.results);
        }
      })
      .catch(error => {
        console.error('axios:error:getMIOData: ' + error.message);
      });
  };

  const _storeData = async sapData => {
    var data = [],
      flag = false;
    console.log(
      '_storeData:sapData: ' + typeof sapData + ' length: ' + sapData.length,
    );

    try {
      await AsyncStorage.getItem('SIRDigitization')
        .then(items => {
          data = items ? JSON.parse(items) : [];

          console.log(
            'after filter :data : ' + typeof data + ' length: ' + data.length,
          );

          sapData.forEach(parent => {
            console.log('parent loop' + parent.Sirnr);
            data.forEach(child => {
              console.log('child loop' + child.Sirnr);
              if (child.Sirnr == parent.Sirnr) {
                flag = true;
              }
            });
            if (flag == false) {
              console.log('parent flag' + flag);
              data.push({
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
                OnsiteMeterDetail: [],
                ApplianceDetail: [],
                DescripancyDetail: [],
                PowerMeter: [],
                LightMeter: [],
                Status: '',
              });
              getSystemMeter(parent.Vertrag);
              console.log('parent.Sirnr: ' + parent.Sirnr);
              console.log('New Addded' + parent);
            }
            flag = false;
          });
        })
        .then(res => {
          console.log('final:data: ' + typeof data + ' length: ' + data.length);
          AsyncStorage.setItem('SIRDigitization', JSON.stringify(data));
          setSIRDigitizationData(
            'final:SIRDigitization: ' +
              typeof MIOData +
              ' length: ' +
              MIOData.length,
          );
        });
    } catch (error) {
      // Error saving data
    }
  };

  const getSystemMeter = contract => {
    console.log('contract: ', contract);
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
            console.log(
              'contract: ' + contract + ' Anlage: ' + singleResult.Anlage,
            );
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
    var DISCREPANCYData = [];
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
        <View style={{flex: 1, backgroundColor: '#1565C0', marginTop: 70}}>
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
          <Text style={{color: 'white', fontSize: 15}}>MRNote: {MRNote}</Text>
          <Text style={{color: 'white', fontSize: 15}}>
            PremiseType: {PremiseType}
          </Text>
          <Text style={{color: 'white', fontSize: 15}}>Tariff: {Tariff}</Text>
          <Text style={{color: 'white', fontSize: 15}}>
            DISCREPANCY: {DISCREPANCY}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default DownloadMasterData;
