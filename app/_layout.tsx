import React from "react"
import "./../global.css"
import { Slot, Stack } from "expo-router"
import { AuthProvider } from "@/context/AuthContext"

const RootLayout = () => {
  return (

    <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen 
        name="(modals)/profileModal"
        options={{
          presentation: "modal"
        }} 
        />

      <Stack.Screen 
        name="(modals)/walletModal"
        options={{
          presentation: "modal"
        }} 
        />
    </Stack>
  );
}


export default function RootLayoutNav() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  )
}
