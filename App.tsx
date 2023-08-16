import React, { useEffect, useRef } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  findNodeHandle,
} from 'react-native';

import MyViewManager from 'react-native-tpl-maps-view';
import { AddMarker, CameraCallback, SetCameraAnimation, SetPolyLine, AddCustomMarker } from 'react-native-tpl-maps-view'
import { Platform } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { NativeModules , NativeEventEmitter } from "react-native"

import {useWindowDimensions} from 'react-native';



const createFragment = (viewId: any) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    "1", [viewId]
  );

const App = () => {


   const ref = useRef(null);
  if (Platform.OS === 'android') {

    useEffect(() => {
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId);

      const YourModuleEvents = new NativeEventEmitter(NativeModules.MyModule);

  
     YourModuleEvents.addListener('onReady', (string) => {


        
        if(string === "MapReady"){
              _SetCameraAnimation()
        }else{
          console.log('Received string from Android:', string);
        }
        
      });

    }, []);
  }else{

  }

  const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;

  return (

    

    <View style={{marginTop: 40 , flex: 1 , flexDirection: 'row'}}>

<Text style={{fontSize: 20 , color: '#000' , marginLeft: 100,  alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start' , position: 'absolute'}}onPress={_SetPolyLine}>dadasd</Text>


      <MyViewManager 
       
        ref={ref} 
          customWidth = {PixelRatio.getPixelSizeForLayoutSize(windowWidth)}
          customHeight = {PixelRatio.getPixelSizeForLayoutSize(windowHeight/1.1)}
        />





<View style={{alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start' , position: 'absolute'}}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Text style={{fontSize: 20 , color: '#000' , margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_SetCameraAnimation}>Zoom on Loc</Text>
          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarker}>Add Marker on Loc</Text>
          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarkerRider}>Add Rider Marker on Loc</Text>
          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarkerOther}>Add Customer Marker on Loc</Text>
          <Text style={{fontSize: 20 , color: '#34ff30' , margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}}onPress={_CameraCallback}>Get Lat Long on Camera Move</Text>
       
         
       
        </View>


      
      </View>


    

      <Text style={{fontSize: 20 , color: '#FFF' , marginLeft: 100,  alignItems: 'flex-end' , alignSelf: 'flex-end', justifyContent: 'flex-end' , alignContent: 'flex-end' , position: 'absolute'}}onPress={_SetPolyLine}>Footer Add Polyline</Text>
   

    </View>



  );
};

const _SetCameraAnimation = () => {

  // Use the same format for passing arguments.
  SetCameraAnimation("67.125973;24.820649", "15")
 
}

const _AddMarker = () => {

  // Use the same format for passing arguments.
  AddMarker("67.125973;24.820649")
 
  
}

const _AddMarkerRider = () => {

  // Use the same format for passing arguments.
  AddCustomMarker("67.124412;24.820288;rider;60;60")
  
}

const _AddMarkerOther = () => {

  // Use the same format for passing arguments.
  AddCustomMarker("67.083189;24.866864;branch;60;60;branch1;Test Decription")
  
}



const _CameraCallback = () => {
  
  CameraCallback()
 
}

const _SetPolyLine = () => {

  // Use the same format for passing arguments.

  //Multiple Destination LatLng 
  const destinationTasks = ['24.866864;67.083189'];

  // Passing Current Location LatLng , Desitnation LatLng and ApiKey
  SetPolyLine("24.820288;67.124412" , destinationTasks,  "")
}




export default App;

