import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView, {Marker } from "react-native-maps";

import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
const SettingsScreen = () => {
const [newregion, setNewRegion] = useState([]);

const [region, setRegion] = useState();
/* const [region, setRegion] = useState({
    latitude: 24.8491138,
    longitude: 67.0178555,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
 */

    const getAsyncData =  () => {
    var data1 = [];
    let data;
    let cDdate = new Date();
    cDdate = Moment(cDdate).format("DD-MM-YYYY");
      
    AsyncStorage.getItem('SIRDigitizationLocation')
    .then(items => {

      data1 = items ? JSON.parse(items) : [];
    


   
   
//    console.log("data1.latitude", data1[0].latitude);
data = data1.filter(x => x.EntryDate == cDdate); //

//console.log("data", data)
  setRegion({"latitude": data[0].latitude,  "longitude" : data[0].longitude, "latitudeDelta" : 0.01,  "longitudeDelta" : 0.01});
 setNewRegion(data);

  });

  //console.log("newregion", newregion)

}

   
useEffect(() => {
  getAsyncData();
//  console.log(region);
/*

  setTimeout(async () => {
     let userToken;
  
     
  
    }, 3000);
*/

}, []);
    



  
 

      return (
        <View style={styles.container}>

           <MapView 
            style={styles.map}
            initialRegion={region} 
            //your region data goes here.
          >
            {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
           
         
            {newregion.map((l, i) => (

             <Marker coordinate={{
              "latitude": l.latitude,
              "longitude": l.longitude,
            }}
            
            
            />
          ))}
         


          </MapView>
         </View>
      ); 
};



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  text:{
    color:'black',
  }
});

export default SettingsScreen;

 
