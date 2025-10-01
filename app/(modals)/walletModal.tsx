import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/ScreenWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { Image } from 'expo-image'
import { getProfileImage } from '@/services/imageService'
import * as Icons from "phosphor-react-native";
import Typo from '@/components/typo'
import Input from '@/components/Input'
import { UserDataType, WalletType } from '@/types'
import * as ImagePicker from "expo-image-picker"
import { useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { updateUser } from '@/services/userService'
import { createdrUpdateWallet, deleteWallet } from '@/services/walletService'

const walletModal = () => {

    const {user, updateUserData} = useAuth()
   const [wallet, setWallet] = useState<WalletType>({
    name:  "",
   });
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const oldWallet: {name: string, id: string} = useLocalSearchParams();
   
   useEffect(() => {
    if(oldWallet?.id){
        setWallet({
            name: oldWallet?.name,
        })
    }
   }, [])
   
   const onSubmit = async () => {
    let {name } = wallet;
    if(!name.trim()){
        Alert.alert("Wallet", "please fill all the blanks");
        return;
    }
    
    const data: WalletType = {
        name,
        uid: user?.uid,
    };

    if(oldWallet?.id) data.id = oldWallet?.id
    

    setLoading(true);
    const res = await createdrUpdateWallet(data);
    setLoading(false)
    console.log("goo", res);
    if(res.success){
        router.back();
    }else{
        Alert.alert("Wallet", res.msg)
    }
   }
   
   const onDelete = async () =>{
       if(!oldWallet?.id) return;
       setLoading(true);
       const res = await deleteWallet(oldWallet?.id);
       setLoading(false);
       if(res.success) {
        router.back();
       }else{
        Alert.alert("Wallet", res.msg)
       }
   }

   const showDeleteAlert = () =>{
       Alert.alert("Wallet", "Do you want to delete this wallet?", 
        [
            {
                text: "Cancel",
                onPress:() => console.log("cancel"),
                style: "cancel"
            }, 

            {
                text: "Delete",
                onPress:() => onDelete(),
                style: "destructive"
            }, 
        ])
   }
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header 
            title={oldWallet?.id ? "Update Wallet" : "New Wallet" }
            leftIcon={<BackButton/>} 
            style={{marginBottom: spacingY._10}} 
        /> 

        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>

            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}>
                    Wallet Name
                </Typo>
                <Input 
                placeholder="Salary" 
                value={wallet.name} 
                onChangeText={(value) => setWallet({...wallet, name: value})} />
            </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {
            oldWallet?.id && (
                <Button onPress={showDeleteAlert} style={{backgroundColor: colors.rose, padding: spacingX._15,}}>
                    <Icons.Trash size={verticalScale(20)} weight="bold" color={colors.white} />
                </Button>
            )
        }
        <Button onPress={onSubmit} loading={loading} style={{flex: 1}}>
            <Typo color={colors.black} fontWeight={"700"}>
               {oldWallet?.id ? "Update Wallet" : "Add Wallet"}
            </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default walletModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacingX._20
    },

    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1,
    },

    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },

    avatarContainer: {
        position: "relative",
        alignSelf: "center"
    },

    avatr: {
        alignSelf: "center",
       backgroundColor: colors.neutral300,
       height: verticalScale(135),
       width: verticalScale(135),
       borderRadius: 200,
       borderWidth: 1,
       borderColor: colors.neutral500 
    },

    editIcon: {
        position: "absolute",
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7
    },

    inputContainer: {
        gap: spacingY._10 
    }

})