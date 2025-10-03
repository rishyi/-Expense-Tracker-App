
import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'


const index = () => {
    // const router = useRouter()
    // useEffect(() => {
    //     setTimeout(() => {
    //         router.replace('/(auth)/welcome')
    //     }, 2000)
    // }, [])

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                resizeMode="contain"
                source={require("../assets/images/splashImage.png")}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333c3fff',
  },
  logo: {
    height: '20%',
    aspectRatio: 1,
  },
});
