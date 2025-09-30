import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { useAuth } from '@/context/AuthContext'
import Typo from '@/components/typo'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import { accountOptionType } from '@/types'
import * as Icons from 'phosphor-react-native'
import index from '..'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

const Profile = () => {
  const {user} = useAuth();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: 'Edit Profile',
      icon: <Icons.User size={26} color={colors.white} weight='fill' /> ,
      bgColor: "#003f91f6",
      routeName: '/(modals)/profileModal'
      
    },

    {
      title: 'Settings',
      icon: <Icons.GearSix size={26} color={colors.white} weight='fill' /> ,
      bgColor: "#029126ff", 
      // routeName: '/(modals)/profileModal'
    },

    {
      title: 'Privacy Policy',
      icon: <Icons.Lock size={26} color={colors.neutral350} weight='fill' /> ,
      bgColor: "#777777ff", 
      // routeName: '/(modals)/profileModal'
    },

    {
      title: 'Logout',
      icon: <Icons.Power size={26} color={colors.white} weight='fill' /> ,
      bgColor: "#f00b0bff", 
      // routeName: '/(modals)/profileModal'
    }
  ];

  const handlePress = async(item: accountOptionType) => {
    if(item.routeName) router.push(item.routeName);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='profile' style={{ marginVertical: spacingY._10}} />

      {/* user info */}
        <View style = {styles.userInfo}>
          {/* avtar */}
          <View>
            {/* user image */}
            <Image 
            source={getProfileImage(user?.image)} 
            style={styles.avatar} 
            contentFit='cover' 
            transition={100} 
            />
          </View>
          {/*name and Email  */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>{user?.name}</Typo>
            <Typo size={15} fontWeight={"200"} color={colors.neutral400}>{user?.email}</Typo>
          </View>
        </View>
        {/* acoount options */}
        <View style={styles.accountOptions}>
          {
            accountOptions.map((item,index) =>  {
              return (
                <Animated.View 
                key={index.toString()}
                entering={FadeInDown.delay(index*50).springify().damping(14)} style={styles.listItem}>
                  <TouchableOpacity style={styles.flexRow} onPress={() => handlePress(item)}>
                    {/* icon */}
                    <View style = {[styles.listIcon,{backgroundColor: item?.bgColor,}]}>
                      {item.icon && item.icon}
                    </View>
                    <Typo size={16} style={{flex: 1}} fontWeight={"500"}>
                      {item.title}
                    </Typo>
                    <Icons.CaretRight
                      size={verticalScale(20)}
                      weight='bold'
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )
            })  
          }
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },

  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },

  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },

  avatar: {
    alignSelf: 'center',
    backgroundColor: 'gray',
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },

  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral300,
    shadowColor: colors.black,
    shadowOffset: {width:0, height:0},
    shadowOpacity: 0.25,
    elevation: 4,
    padding: 5,
  },

  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },

  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
  },

  listItem: {
    marginBottom: verticalScale(17),
  },

  accountOptions: {
    marginTop: spacingY._35,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  }
  
})