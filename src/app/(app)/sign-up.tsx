import * as React from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../imgs/livefit-logo-1.png";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      Alert.alert("Có lỗi", "Vui lòng điền đủ thông tin");
      return;
    }

    setIsLoading(true);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    if (!code) {
      Alert.alert("Có lỗi", "Vui lòng nhập mã xác nhận");
      return;
    }

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 px-6 min-h-screen">
            <View className="flex-1 justify-center">
              <View className="items-center mb-8">
                <Image source={Logo} className="w-20 h-20 mb-4" />
                <Text className="text-3xl font-bold text-gray-900 mb-2">
                  Kiểm tra Email của bạn
                </Text>
                <Text className="text-lg text-gray-600 text-center">
                  Chúng tôi đã gửi mã xác nhận tới {"\n "}
                  {emailAddress}
                </Text>
              </View>
              {/* Verification form */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Nhập mã xác nhận
                </Text>
                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Mã xác nhận
                  </Text>

                  <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mb-4 border-collapse border-gray-200">
                    <Ionicons name="key-outline" size={20} color="#6B7280" />
                    <TextInput
                      className="flex-1 ml-3 text-gray-900 text-center text-lg tracking-widest"
                      value={code}
                      placeholder="Nhập mã 6 số xác nhận"
                      placeholderTextColor={"#9CA3AF"}
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!isLoading}
                    />
                  </View>
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={onVerifyPress}
                    className={`rounded-xl py-4 shadow-sm mb-4  ${
                      isLoading ? "bg-gray-400" : "bg-green-600"
                    }`}
                    activeOpacity={0.8}
                  >
                    <View className="flex-row items-center justify-center">
                      {isLoading ? (
                        <Ionicons name="refresh" size={20} color={"white"} />
                      ) : (
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={20}
                          color={"white"}
                        />
                      )}
                      <Text className="text-white font-semibold text-lg ml-2">
                        {isLoading ? "Đang xác nhận..." : "Xác nhận Email"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* Resend code */}
                  <TouchableOpacity className="py-2">
                    <Text className="text-blue-600 font-medium text-center">
                      Không nhận được mã? Gửi lại
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Footer */}
              <View className="pb-6">
                <Text className="text-center text-gray-500 text-sm">
                  Gần hoàn thành rồi! Chỉ một bước nữa thôi
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 px-6 min-h-screen">
          {/* Main */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-8">
              <Image source={Logo} className="w-20 h-20 mb-4" />
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Đăng ký Live Fit App
              </Text>
            </View>
            {/* Sign up form */}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Tạo tài khoản
              </Text>
              {/* Email input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Nhập email của bạn"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={setEmailAddress}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Password input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6B7280"
                  />
                  <TextInput
                    value={password}
                    placeholder="Tạo mật khẩu của bạn"
                    placeholderTextColor={"#9CA3AF"}
                    onChangeText={setPassword}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                    secureTextEntry={true}
                  />
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  Cần tối thiểu 8 kí tự
                </Text>
              </View>

              {/* Sign up button */}
              <TouchableOpacity
                onPress={onSignUpPress}
                className={`rounded-xl py-4 shadow-sm mb-4 ${
                  isLoading ? "bg-gray-400" : "bg-yellow-500/90"
                }`}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color={"white"} />
                  ) : (
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={"white"}
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? "Tạo tài khoản..." : "Tạo tài khoản"}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Term */}
              <Text className="text-xs text-gray-500 text-center mb-4">
                Khi đăng ký, bạn cần đồng ý với Điều khoản sử dụng
              </Text>
            </View>
            {/* Sign in link */}
            <View className="flex-row items-center justify-center mb-6">
              <Text className="text-gray-600">Bạn đã có tài khoản? </Text>
              <Link href={"/sign-in"} asChild>
                <TouchableOpacity>
                  <Text className="text-yellow-500/90 font-semibold">
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Footer */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
