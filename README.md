# React Native TPL Maps 

**React Native TPL Maps** Android, iOS pacakge for React Native. It will help you to add maps in your application. The API automatically handles access to our TPL Maps servers, data downloading, map display, and response to map gestures. You can do add markers, shapes, POIs show/hide point of interests, custom map styles and much more.

### Maintainers

**TPL Maps** 
- Daniyal Ahmed Khan - Manager & Team Lead (Android Development) - daniyal.khan@tplmaps.com
- Abdul Basit - Head of Analytics & Data Services – Information Technology (IT) - Abdul.Basit@tplmaps.com


### Disclaimer

Maintaining Mapping SDK is very complex, because it is often used for many different usecases (rendering tiles, icons, pois, and much more).  
**we will prioritize updating and feature enhancement in future.**  

### Platform Compatibility  

This project is compatible with **Android** , **iOS** 
This project is compatible with Android Minimum SDK 21.

### Getting Started

Please follow the below steps:

1- **npm install react-native-tpl-maps-view**  
2- **Use the latest version of Package v{latest} in Package.json file**  
3- **Add your TPL Maps Key in Android Manifest File like below**  
```tsx
 <meta-data android:name="com.tplmaps.android.sdk.API_KEY"
            android:value="YOUR_API_KEY" />
```

4- **Make Sure to Add in Gradle in AllProject under buildscript tag**
```tsx
 buildscript {
    ext.safeExtGet = {prop ->
        rootProject.ext.has(prop) ? rootProject.ext.get(prop) : project.properties['ReactNativeWebView_' + prop]
    }
    repositories {
        google()
        gradlePluginPortal()
    }
    dependencies {
       // classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${safeExtGet('kotlinVersion')}")
        classpath("com.android.tools.build:gradle:7.0.4")
        classpath("com.facebook.react:react-native-gradle-plugin")
    }
    allprojects {

        repositories {
            jcenter()
            google()
            maven { url 'https://jitpack.io'}
            maven { url "http://api.tplmaps.com:8081/artifactory/example-repo-local/"
                allowInsecureProtocol = true}

        }
    }
}
```

4- **Add tplservices.config file in iOS project (Download from api.tplmaps.com follow iOS guide.)**  

5- **Add MyPacakge() in your Android MainApplication Class ArrayList inside getPackages method**  

### Usage

Import the `MyViewManager2` component from `react-native-tpl-maps-view` and use it like so to load Base Map:

```tsx
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
import { NativeModules , NativeEventEmitter } from "react-native"
import { DeviceEventEmitter } from 'react-native';



const createFragment = (viewId: any) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    "1", [viewId],
  );

const App = () => {


  const ref = useRef(null);
  if (Platform.OS === 'android') {

    useEffect(() => {
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId);

      const YourModuleEvents = new NativeEventEmitter(NativeModules.MyModule);

  
     YourModuleEvents.addListener('onReady', (string) => {


// You will recevice Lat;Lng here in String from which call the URL for Address on the basis of LatLng to show to the user on Search Bar

      // => /search/point  Get results around provided point. on api.tplmaps.com under rest api.
        if(string === "MapReady"){
          // Perform any task on First Time Map Ready
              _SetCameraAnimation()
        }else{
          console.log('Received string from Android:', string);
        }
        
      });

    }, []);
  }else{

     useEffect(() => {
     

  const YourModuleEvents = new NativeEventEmitter(NativeModules.RNEventEmitter);

    
    const eventListener = YourModuleEvents.addListener('onReady', (string) => {
      

      // You will recevice Lat;Lng here in String from which call the URL for Address on the basis of LatLng to show to the user on Search Bar

       // => /search/point   Get results around provided point. on api.tplmaps.com under rest api.
      console.log('Received Lat Lng string from iOS on Map Move:', string);
    });

    
    }, []);

  }



  return (


    <View style={{ flex: 1 }}>



      <MyViewManager
        ref={ref} />


      <View style={{alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}}>
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Text style={{fontSize: 20 , color: '#000' , margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_SetCameraAnimation}>Zoom on Loc</Text>

          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarker}>Add Marker on Loc</Text>

          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarkerRider}>Add Rider Marker on Loc</Text>

          <Text style={{fontSize: 20 , color: '#ed0707', margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}} onPress={_AddMarkerOther}>Add Customer Marker on Loc</Text>

          {/*<Text style={{fontSize: 20 , color: '#34ff30' , margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}}onPress={_CameraCallback}>Get Lat Long on Camera Move</Text>*/}

          <Text style={{fontSize: 20 , color: '#211091' , margin: 10 , alignItems: 'flex-start' , alignSelf: 'flex-start', justifyContent: 'flex-start' , alignContent: 'flex-start'}}onPress={_SetPolyLine}>Add Polyline</Text>
        </View>
      </View>

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
  AddCustomMarker("67.124412;24.820288;rider")
  
}

const _AddMarkerOther = () => {

  // Use the same format for passing arguments.
  AddCustomMarker("67.083189;24.866864;other")
  
}

const _SetPolyLine = () => {

  // Use the same format for passing arguments.

  //Multiple Destination LatLng 
  const destinationTasks = ['24.866864;67.083189'];

  // Passing Current Location LatLng , Desitnation LatLng and ApiKey
  SetPolyLine("24.820288;67.124412" , destinationTasks,  "")
}




export default App;
```


**Add Marker on Map with LatLng**


```tsx
import {AddMarker} from 'react-native-tpl-maps-view'


AddMarker("67.125973;24.820649")
```


**Camera Zoom on Map with LatLng and Zoom Level**


```tsx
import {AddMarker} from 'react-native-tpl-maps-view'


SetCameraAnimation("67.125973;24.820649" , "15")
```

**Add Custom Marker**


```tsx
import {AddCustomMarker} from 'react-native-tpl-maps-view'


 AddCustomMarker("67.083189;24.866864;branch;60;60;branch1;Test Decription")
 //Lng, Lat, icon name, width, height, info window title, info windoe description

  AddCustomMarker("67.083189;24.866864;rider;60;60;branch1;Test Decription")
 //Lng, Lat, icon name, width, height, info window title, info windoe description

  AddCustomMarker("67.083189;24.866864;branch;60;60;branch1;Test Decription")
 //Lng, Lat, icon name, width, height, info window title, info windoe description
```

#### Contributing

Please report your issues and bugs on daniyal.khan@tplmaps.com

### License

MIT
