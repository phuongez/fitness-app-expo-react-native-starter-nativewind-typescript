import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>ExerciseDetail</Text>
    </SafeAreaView>
  );
};

export default ExerciseDetail;
