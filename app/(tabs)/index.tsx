import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticalScale } from '@/utils/styling'
import * as Icons from "phosphor-react-native";
import HomeCard from '@/components/HomeCard'
import { Transaction } from 'firebase/firestore'
import TransactionList from '@/components/TransactionList'

const Home = () => {

  const {user} = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <View style={{gap: 4}}>
            <Typo size={16} color={colors.neutral400}>
              Hello,
            </Typo>
            <Typo size={20} fontWeight={"600"}> 
              {user?.name}
            </Typo>
          </View>  
          <TouchableOpacity style={styles.searchIcon}>
            <Icons.MagnifyingGlassIcon
              size={verticalScale(22)}
              color={colors.neutral200}
              weight='bold'
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* card */}
          <View>
            <HomeCard />
          </View>

          <TransactionList 
          data={[1, 2, 3, 4, 5, 6 ]} 
          loading={false} 
          emptyListMessage="No transactions found"
          title= "Recent Transactions"
          />
        </ScrollView>

        <Button style={styles.floatingButton} onPress={()=> router.push('/(modals)/transactionModal')}>
          <Icons.Plus color={colors.black} weight='bold' size={verticalScale(24)} />
        </Button>
      </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8)
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10
  },

  searchIcon: {
    backgroundColor: colors.neutral800,
    padding: spacingX._10,
    borderRadius: 50,
  },

  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: 'absolute',
    bottom: verticalScale(30),
    right: verticalScale(30),
  },

  scrollViewStyle: {
    marginTop: spacingY._10,
    marginBottom: verticalScale(100),
    gap: spacingY._25
  },
})