import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TransactionItemProps, TransactionListType } from '@/types'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from './typo'
import { FlashList } from "@shopify/flash-list";
import index from '@/app'
import Loading from './Loading'
import { expenseCategories } from '@/constants/data'
import Animated, { FadeInDown } from 'react-native-reanimated'
 

const TransactionList = ({
    
    data,
    title,
    loading,
    emptyListMessage
}: TransactionListType) => {

    const handleClick = () => {

    }

  return (
    <View style={styles.container}>
      {
        title && (
                <Typo size={18} fontWeight={"600"}>
                    {title}
                </Typo>
        )
      }
      <View style={styles.list}>
        <FlashList
            data={data}
            renderItem={({ item , index }) => <TransactionItem item={item}  index={index} handleClick={handleClick}/>}
            // estimatedItemSize={6}
        />
      </View>
    {
        !loading && data.length === 0 && (
            <Typo 
                 size={15} 
                 color={colors.neutral400} 
                 style={{ textAlign: "center", marginTop: spacingY._15 }}
            >
                 {emptyListMessage}
            </Typo>
         )
    }

    {
        loading && (
            <View style={{ top: verticalScale(100) }}>
                 <Loading />
            </View>
        )
    }

    </View>
  )
}

const TransactionItem = ({
    item,
    index,
    handleClick
}: TransactionItemProps) => {

    let category = expenseCategories["utilities"];
    const IconComponent = category.icon;
    
        return (
        <Animated.View entering={FadeInDown.delay(index*80).springify().damping(40)}>
            <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
                <View style={[styles.icon, {backgroundColor: category.bgColor}]}>
                    {IconComponent &&  (
                        <IconComponent
                        size={verticalScale(26)}
                        weight="fill"
                        color={colors.white}
                        />  
                    )}
                </View>

                <View style={styles.categoryDes}>
                    <Typo size={17}> {category.label} </Typo>
                    <Typo 
                        size={12} 
                        color={colors.neutral400} 
                        textProps={{numberOfLines: 1}}
                    > 
                    Paid wifi bills
                    </Typo>
                </View>

                <View style={styles.amountDate}>
                    <Typo fontWeight={"700"}color={colors.rose} >
                        + $ 1,500
                    </Typo>
                    <Typo size={12} color={colors.neutral400} >
                        jan 12
                    </Typo>
                </View>

            </TouchableOpacity>
        </Animated.View>
        )
}


export default TransactionList

const styles = StyleSheet.create({
    container: {
        gap: spacingY._17,
    },

    list: {
        minHeight: 3
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: spacingX._12,
        marginBottom: spacingY._12,

        backgroundColor: colors.neutral800,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17,
    },

    icon: {
        height: verticalScale(44),
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: radius._12,
        borderCurve: "continuous"
    },

    categoryDes: {
        flex: 1,
        gap: 2.5,
    },

    amountDate: {
        alignItems: "flex-end",
        gap: 3
    }
})