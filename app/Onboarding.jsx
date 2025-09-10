import { StyleSheet, Text, View,Image,Dimensions } from 'react-native'
import React from 'react'
import DashinScreen from '../assets/images/DashinSplash.jpg'
const { width, height } = Dimensions.get('window');
export default function Onboarding() {
    return (
    <View >
        <Image source={DashinScreen} style={styles.logo}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: width,      // Full screen width
    height: height,    // Full screen height
  },
});