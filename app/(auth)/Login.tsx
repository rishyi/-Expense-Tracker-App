import { login } from "@/services/authService"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView
} from "react-native"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false)

  const handleLogin = async () => {
    if (isLoading) return
    
    // Simple validation
    if (!email) {
      Alert.alert("Error", "Please enter your email")
      return
    }
    
    if (!password) {
      Alert.alert("Error", "Please enter your password")
      return
    }
    
    setIsLoading(true)
    await login(email, password)
      .then((res) => {
        console.log(res)
        router.push("/")
      })
      .catch((err) => {
        console.error(err)
        Alert.alert("Login failed", "Invalid email or password")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header with Logo */}
          <View className="items-center mb-10">
            <View className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-600/30">
              <Text className="text-white text-3xl font-bold">✓</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
            <Text className="text-gray-500 mt-2">Sign in to continue</Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <TextInput
              placeholder="Enter your email"
              className={`bg-gray-50 rounded-xl px-5 py-4 mb-5 text-gray-800 border ${
                isEmailFocused ? 'border-blue-500' : 'border-gray-200'
              }`}
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <TextInput
              placeholder="Enter your password"
              className={`bg-gray-50 rounded-xl px-5 py-4 mb-2 text-gray-800 border ${
                isPasswordFocused ? 'border-blue-500' : 'border-gray-200'
              }`}
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            
            <TouchableOpacity
              className={`bg-blue-600 p-4 rounded-xl shadow-lg shadow-blue-600/30 ${
                isLoading ? "opacity-80" : ""
              }`}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center text-lg font-semibold text-white">Login</Text>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-500">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>
          
          {/* Social Login Options */}
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity 
              className="p-3 bg-gray-100 rounded-xl flex-1 items-center"
              onPress={() => Alert.alert("Google Login", "Feature coming soon!")}
            >
              <Text className="text-gray-700 font-medium">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="p-3 bg-gray-100 rounded-xl flex-1 items-center"
              onPress={() => Alert.alert("Apple Login", "Feature coming soon!")}
            >
              <Text className="text-gray-700 font-medium">Apple</Text>
            </TouchableOpacity>
          </View>
          
          {/* Sign up redirect */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Pressable onPress={() => router.push("/register")}>
              <Text className="text-blue-600 font-semibold">Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login