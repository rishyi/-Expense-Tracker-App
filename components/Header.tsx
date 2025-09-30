import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './typo'
import { HeaderProps } from '@/types'

const Header = ({ title = "", leftIcon , style}: HeaderProps) => {
  return (
    <View style = {[styles.container, style]}>
      {leftIcon && <View style = {styles.leftIcon} > {leftIcon} </View>}
      {
        title && (
          <Typo
            size={32}
            fontWeight={"600"}
            style={{
              textAlign: 'center',
              width: leftIcon ? "82%" : "100%"
            }} children={undefined}          >

          </Typo>
        )

        
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },

    leftIcon:{
      alignItems: 'flex-start',
      
    }
})