import {
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { use } from "react";
import { useStopwatch } from "react-timer-hook";
import { useWorkoutStore } from "store/workout-store";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ExerciseSelectionModal from "@/app/components/ExerciseSelectionModal";

const ActiveWorkout = () => {
  const [showExerciseSelection, setShowExerciseSelection] =
    React.useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      // Only reset if we have no exercises (indicates a new workout)
      if (workoutExercises.length === 0) {
        reset();
      }
    }, [workoutExercises.length, reset])
  );

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

  const addExercise = () => {
    setShowExerciseSelection(true);
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
      />
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
              <Text className="text-white font-medium">Kết thúc buổi tập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content area with white background */}
      <View className="flex-1 bg-white">
        {/* Workout Progress */}
        <View className="px-6 mt-4">
          <Text className="text-center text-gray-600 mb-2">
            {workoutExercises.length} bài tập
          </Text>
        </View>
        {/* If no exericses, show a message */}
        {workoutExercises.length === 0 && (
          <View className="bg-gray-50 rounded-2xl p-8 items-center mx-6">
            <Ionicons name="barbell-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-600 text-lg text-center mt-4 font-medium">
              Chưa có bài tập
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Bắt đầu buổi tập bằng cách chọn bài tập đầu tiên
            </Text>
          </View>
        )}

        {/* All exercises */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-6 mt-4">
            {workoutExercises.map((exercise) => (
              <View className="mb-8" key={exercise.id}></View>
            ))}
            {/* Add exercise button */}
            <TouchableOpacity
              onPress={addExercise}
              className="bg-blue-600 rounded-2xl py-4 items-center mb-8 active:bg-blue-700"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="add"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white font-semibold text-lg">
                  Thêm bài tập
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {/* Exercise Selection Modal */}
      <ExerciseSelectionModal
        visible={showExerciseSelection}
        onClose={() => setShowExerciseSelection(false)}
      />
    </View>
  );
};

export default ActiveWorkout;
