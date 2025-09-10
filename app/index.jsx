import { Image } from 'expo-image';
import { Platform, StyleSheet,View ,Text} from 'react-native';
import First from './firstTimeLogInCheck';
import { useEffect } from 'react';
export default function HomeScreen() {
  
  return (
    <View className="flex-1 items-center justify-center bg-white  ">
      <First/>
    </View>
  );
}

