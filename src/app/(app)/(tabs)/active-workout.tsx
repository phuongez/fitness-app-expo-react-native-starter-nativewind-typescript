import {
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { use } from "react";
import { useStopwatch } from "react-timer-hook";
import { useWorkoutStore } from "store/workout-store";
import { useRouter } from "expo-router";

const ActiveWorkout = () => {
  const {
    workoutExercises,
    setWorkoutExercises,
    resetWorkout,
    weightUnit,
    setWeightUnit,
  } = useWorkoutStore();
  const router = useRouter();

  const { seconds, minutes, hours, totalSeconds, reset } = useStopwatch({
    autoStart: true,
  });
  const getWorkoutDuration = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const cancelWorkout = () => {
    Alert.alert("Huỷ buổi tập", "Bạn có chắc rằng muốn huỷ buổi tập?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Kết thúc",

        onPress: () => {
          resetWorkout(), router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor={"#1F2937"} />
      {/* Top Safe Area */}
      <View
        className="bg-gray-800"
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      >
        {/* Header */}
        <View className="bg-gray-800 px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-xl font-semibold">
                Buổi tập hiện tại
              </Text>
              <Text className="text-gray-300">{getWorkoutDuration()}</Text>
            </View>
            <View className="flex-row items-center space-x-3 gap-2">
              {/* Weight Unit Toggle */}
              <View className="flex-row bg-gray-700 rounded-lg p-1">
                <TouchableOpacity
                  onPress={() => setWeightUnit("kg")}
                  className={`px-3 py-1 rounded ${
                    weightUnit === "kg" ? "bg-blue-600" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      weightUnit === "kg" ? "text-white" : "text-gray-300"
                    }`}
                  >
                    kg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setWeightUnit("lb")}
                  className={`px-3 py-1 rounded ${
                    weightUnit === "lb" ? "bg-blue-600" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      weightUnit === "lb" ? "text-white" : "text-gray-300"
                    }`}
                  >
                    lb
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={cancelWorkout}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">
                  Kết thúc buổi tập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActiveWorkout;
