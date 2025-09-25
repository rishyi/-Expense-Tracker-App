import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/typo'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import ScreenWrapper from '@/components/ScreenWrapper'

const Home = () => {

  const {user} = useAuth();

  console.log("user :" , user);
  
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      <Button onPress={() => router.navigate('/(auth)/welcome')}>
        <Typo color={colors.black} fontWeight="600">
          Logout
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})