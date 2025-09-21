import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilePage() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc rằng muốn đăng xuất?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex flex-1">
      <Text>Profile</Text>
      {/* Sign out */}
      <View className="px-6 mb-8">
        <TouchableOpacity
          className="bg-red-600 rounded-2xl p-4 shadow-sm"
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className="text-white text-lg ml-2 font-semibold">
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
