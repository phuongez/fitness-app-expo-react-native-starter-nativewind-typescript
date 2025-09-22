import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Exercise } from "@/lib/sanity/types";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500";
    case "Intermediate":
      return "bg-yellow-500";
    case "Advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "Intermediate":
      return "Intermediate";
    case "Advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

interface ExerciseCardProps {
  item: Exercise;
  onPress: () => void;
  showChevron: boolean;
}

const ExerciseCard = ({
  item,
  onPress,
  showChevron = false,
}: ExerciseCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
    >
      <Text>Exercise Card</Text>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
