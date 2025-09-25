import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Typo from '@/components/typo'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const Login = () => {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {login: loginUser} = useAuth();

  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const response = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if(!response.success) {
      Alert.alert("Login", response.msg );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight="800">
            Hey,
          </Typo>
          <Typo size={30} fontWeight="600">
            Welcome Back
          </Typo>
        </View>

        {/* form */}

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login now to track all yopur expenses
          </Typo>
          <Input 
            placeholder='Enter your email' 
            onChangeText={(value) => emailRef.current = value}
          />
          <Input 
            placeholder='Enter your password' 
            secureTextEntry
            onChangeText={(value) => passwordRef.current = value}
          />
        </View>

          <Typo size={14} color={colors.textLighter} style={{alignSelf: 'flex-end'}} >
            Forgot Password?
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit} >
            <Typo size={18} color={colors.black} fontWeight="800">
              Login
            </Typo>
          </Button>

        {/* footer */}
        
        <View style={styles.footer}>
          <Typo size={15}> Don't have an account? </Typo>
          <Pressable onPress={() => router.navigate('/(auth)/register')} >
            <Typo fontWeight="600" size={15} color={colors.primary}>
              Sign Up
            </Typo>
          </Pressable>
        </View> 

      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        color: colors.text,
    },
    form: {
        gap: spacingY._20,
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: '500',
        color: colors.text,
    },  
    footer: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: colors.text,
        fontSize: verticalScale(15),
    },
});