import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GoogleSignIn from "../components/GoogleSignIn";
import Logo from "../../../imgs/livefit-logo-1.png";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/* Header section */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              {/* <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name="fitness" size={40} color="white" />
              </View> */}
              <Image source={Logo} className="w-20 h-20 mb-4" />
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Live Fit App
              </Text>
              <Text className="text-lg text-gray-600 text-center">
                Track your fitness journey {"\n"} and reach your goals
              </Text>
            </View>

            {/* Sign in form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Chào mừng quay lại
              </Text>
              {/* Email input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color={"#6B7280"} />
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter your email"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={setEmailAddress}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>
              {/* Password input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Mạt khẩu
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={"#6B7280"}
                  />
                  <TextInput
                    secureTextEntry={true}
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={setPassword}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>

            {/* Sign in button */}
            <TouchableOpacity
              className={`rounded-xl py-4 shadow-sm mb-4 ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
              onPress={onSignInPress}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <Ionicons name="refresh" size={20} color={"white"} />
                ) : (
                  <Ionicons name="log-in-outline" size={20} color={"white"} />
                )}
                <Text className="text-white font-semibold text-lg ml-2">
                  {isLoading ? "Đăng nhập..." : "Đăng nhập"}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Divider */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="px-4 text-gray-500 text-sm">hoặc</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Google sign in */}
            <GoogleSignIn />
          </View>
          {/* Sign up link */}
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-600">Bạn chưa có tài khoản?</Text>
            <Link href={"/sign-up"} asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Đăng ký</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer */}
          <View className="pb-6">
            <Text className="text-center text-gray-500 text-sm">
              Start your fitness journey today
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
