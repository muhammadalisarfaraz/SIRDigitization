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
          'async:getItem:sapData: ' +
            typeof sapData +
            ' length: ' +
            sapData.length,
        );
        console.log(
          'after filter :data : ' + typeof data + ' length: ' + data.length,
        );

        sapData.forEach(parent => {
          data.forEach(child => {
            if (child.Vertrag == parent.Vertrag) {
              flag = true;
            }
          });
          if (flag == false) {
            data.push({
              SANCTION_LOAD: singleResult.SANCTION_LOAD,
              CONNECTED_LOAD: singleResult.CONNECTED_LOAD,
              Ibc: singleResult.Ibc,
              Mio: singleResult.Mio,
              Mandt: singleResult.Mandt,
              Sirnr: singleResult.Sirnr,
              Begru: singleResult.Begru,
              Vkont: singleResult.Vkont,
              Vertrag: singleResult.Vertrag,
              Erdat: singleResult.Erdat,
              Ertim: singleResult.Ertim,
              Ernam: singleResult.Ernam,
              SirStatus: singleResult.SirStatus,
              AssignMio: singleResult.AssignMio,
              Dp: singleResult.Dp,
              Random: singleResult.Random,
              SirFormat: singleResult.SirFormat,
              NAME: singleResult.NAME,
              ADDRESS: singleResult.ADDRESS,
              CLUSTER: singleResult.CLUSTER,
              MIO_NAME: singleResult.MIO_NAME,
              CONSUMER_NO: singleResult.CONSUMER_NO,
              OnsiteMeterDetail: [],
              ApplianceDetail: [],
              DescripancyDetail: [],
              PowerMeter: [],
              LightMeter: [],
              Status: '',
            });
            getSystemMeter(singleResult.Vertrag);
            console.log('singleResult.Sirnr: ' + singleResult.Sirnr);
            console.log('New Addded' + parent);
          }
          flag = false;
        });
      })
      .then(res => {
        console.log('final:data: ' + typeof data + ' length: ' + data.length);
        AsyncStorage.setItem('SIRDigitization', JSON.stringify(MIOData));
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
