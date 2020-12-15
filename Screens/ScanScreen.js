import React from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Text} from 'react-native';
//import {Header} from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class Scanscreen extends React.Component{
    consturctor(){
        super();
        this.state={
            hasCamerPermission:'null',
            scanned:'false',
            buttonState:'normal',
            ScannedData:''
        }
    }
    getCameraPermission=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCamerPermission:status==='granted',
            scanned:false,
            buttonState:'clicked'
        });
    }

    handleBarCodeScanned=async({data,type})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }

    render(){
        const hasCamerPermission=this.state.hasCamerPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState === 'clicked' && hasCamerPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned
                    ?undefined
                    :this.handleBarCodeScanned}/>
            )
        }
        else if(buttonState==='normal'){

        
        return(
          <View
          style={design.forView}>

              <Text>
                  {hasCamerPermission===true
                  ?this.state.scannedData
                  :'Request Camera Permission'}
              </Text>

              <Image
    style={design.imageIcon}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />

              <TouchableOpacity
              onPress={this.getCameraPermission}
              style={design.forTouchableOpacity}
              title="Barcode Scanner">

              <Text
              style={design.forText}>
                  Scan QR Code
              </Text>

              </TouchableOpacity>
          </View>  
        );
       }
    }
}
const design=StyleSheet.create({
    forText:{
        color:'black',
        fontSize:20
    },
    forTouchableOpacity:{
        justifyContent:'center',
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
        alignSelf:'center'
    },
    forView:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    imageIcon:{
        height:50,
        width:50
    }
})