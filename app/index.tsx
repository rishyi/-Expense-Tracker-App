// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
// import React, { useEffect } from "react"
// import { useRouter } from "expo-router"
// import { useAuth } from "@/context/AuthContext"

// const Index = () => {
//   const router = useRouter()
//   const { user, loading } = useAuth()
//   console.log("User data : ", user)

//   useEffect(() => {
//     if (!loading) {
//       if (user) router.replace("/Login")
//     //   else router.replace("/")
//     }
//   }, [user, loading])

//   if (loading) {
//     return (
//       <View className="flex-1 w-full justify-center align-items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   return null
// }

// export default Index


import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'


const index = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/welcome')
        }, 2000)
    }, [])

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
