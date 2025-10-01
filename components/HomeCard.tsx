import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './typo'
import { scale, verticalScale } from '@/utils/styling'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { ImageBackground } from 'expo-image'
import * as Icons from "phosphor-react-native";

const HomeCard = () => {
  return (
    <ImageBackground 
    source={require("../assets/images/card.png")}
    resizeMode='stretch' 
    style={styles.bgImage}
    >

        <View style={styles.container}>
            <View>
                {/* total balnce */}
                <View style={styles.totalBalanceRow}>
                    <Typo size={16} color={colors.neutral700} fontWeight={"700"}> 
                        Total Balance
                    </Typo>
                    <Icons.DotsThreeOutline
                        size={verticalScale(23)}
                        color={colors.black}
                        weight='fill'
                    />
                </View>
                <Typo color={colors.black} size={26} fontWeight={"bold"}>
                    $2,500
                </Typo>
            </View>

            {/* total expenses and income */}
            <View style={styles.stats}>
                {/* income */}
                <View style={{gap: verticalScale(5)}}>
                     <View style={styles.incomeExpemses}>
                        <View style={styles.statsIcon}>
                            <Icons.ArrowDown 
                                size={verticalScale(15)}
                                color={colors.black}
                                weight='bold'
                            />
                        </View> 
                        <Typo size={16} color={colors.neutral700} fontWeight={"700"}>
                            Income
                        </Typo>
                     </View>
                    <View style={{alignSelf: "center"}}>
                        <Typo size={16} color={colors.green} fontWeight={"700"}>
                            $2,500
                        </Typo>
                    </View>
                </View>
                {/* Expenses */}
                <View style={{gap: verticalScale(5)}}>
                     <View style={styles.incomeExpemses}>
                        <View style={styles.statsIcon}>
                            <Icons.ArrowUp 
                                size={verticalScale(15)}
                                color={colors.black}
                                weight='bold'
                            />
                        </View> 
                        <Typo size={16} color={colors.neutral700} fontWeight={"700"}>
                            Expenses
                        </Typo>
                     </View>
                    <View style={{alignSelf: "center"}}>
                        <Typo size={16} color={colors.rose} fontWeight={"700"}>
                            $1,500
                        </Typo>
                    </View>
                </View>
            </View>

        </View>
    </ImageBackground>
  )
}

export default HomeCard

const styles = StyleSheet.create({
    bgImage: {
        height: scale(210),
        width: "100%",
    },

    container: {
        padding: spacingX._20,
        paddingHorizontal: scale(23),
        height: "87%",
        width: "100%",
        justifyContent: "space-between",
    },

    totalBalanceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statsIcon: {
        backgroundColor: colors.neutral350,
        padding: spacingY._5,
        borderRadius: 50
    },

    incomeExpemses: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: spacingY._7
    }
})