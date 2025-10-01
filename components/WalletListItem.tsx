import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typo from './typo'
import { WalletType } from '@/types'
import { Router } from 'expo-router'
import { verticalScale } from '@/utils/styling'
import { colors, spacingX } from '@/constants/theme'
import * as Icons from "phosphor-react-native"
import Animated, { FadeInDown } from 'react-native-reanimated'


const WalletListItem = ({
    item,
    index,
    router
}: {
    item: WalletType,
    index: number,
    router: Router
}) => {

  const openWallet = () => {
    router.push({
      pathname: "/(modals)/walletModal",
      params: {
        id: item?.id,
        name: item?.name
      },
    });
   }

  return (
    <Animated.View entering={FadeInDown.duration(1000).delay(index * 200).springify().damping(22)}>
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.nameContainer}>
            <Typo size={18} fontWeight="600">{item.name}</Typo>
            <Typo size={14} color={colors.neutral400}>${item.amount}</Typo>
        </View>

        <Icons.CaretRight 
            size={verticalScale(20)}
            weight="bold"
            color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default WalletListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(17),
    },

    nameContainer: {
        flex: 1,
        gap: 2,
        marginLeft: spacingX._10,
    },
})