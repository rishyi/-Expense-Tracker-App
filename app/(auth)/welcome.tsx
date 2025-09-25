import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/button'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

const welcome = () => {
  return (
    <ScreenWrapper>
        <View style={styles.container}>
            {/* loggin bytton & Image */}
            <View>
                <TouchableOpacity style={styles.loginButton} >
                    <Typo fontWeight="500"> Sign In </Typo>
                </TouchableOpacity>

                <Animated.Image
                entering={FadeIn.duration(800)}
                 source={require('../../assets/images/welcome.png')}
                 style={styles.welcomeImage} 
                 resizeMode='contain'
                 />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Animated.View entering={FadeInDown.duration(1000).springify().damping(22)} style={{alignItems: "center"}}>
                    <Typo size={20} fontWeight="800" >
                           Always Take Control
                    </Typo>
                    <Typo size={20} fontWeight="800" >
                        of your finances
                    </Typo>
                </Animated.View>

                 <Animated.View entering={FadeInDown.duration(1000).delay(100).springify().damping(22)} style={{alignItems: "center", gap: (2)}}>
                    <Typo size={14} color={colors.textLight} >
                           Finances must be arranged to set a better
                    </Typo>
                    <Typo size={14} color={colors.textLight} >
                        Llifestyle in future
                    </Typo>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(1000).delay(200).springify().damping(22)} style={styles.buttonContainer}> 
                    <Button>
                        <Typo size={16} color={colors.neutral900} fontWeight="500">
                            Get Started
                        </Typo>
                    </Button>
                </Animated.View>
                
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacingY._7,
    },
    welcomeImage: {
        width: '100%',
        height: verticalScale(200),
        marginTop: spacingY._50,
        alignSelf: 'center',
    },
    loginButton: {
        alignSelf: 'flex-end',
        marginRight: spacingX._20,
    },
    footer: {
        backgroundColor: '#2b3235ff',
        alignItems: 'center',
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(40),
        gap: spacingY._20,
        shadowColor: "#ffffffff",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: spacingX._25,
    },
});