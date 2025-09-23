import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { client, urlFor } from "@/lib/sanity/client";
import { Exercise } from "@/lib/sanity/types";
import { defineQuery } from "groq";

const singleExerciseQuery = defineQuery(
  `*[_type == "exercise" && _id == $id][0]`
);

const ExerciseDetail = () => {
  const [excercise, setExcercise] = React.useState<Exercise | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [aiGuidance, setAIGuidance] = React.useState("");
  const [aiLoading, setAILoading] = React.useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;
      try {
        const exerciseData = await client.fetch(singleExerciseQuery, { id });
        setExcercise(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor={"#000000"} />
      {/* Header with close button */}
      <View className="absolute top-12 left-0 right-0 z-10 px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View className="h-80 bg-white relative">
          {excercise?.image ? (
            <Image
              source={{ uri: urlFor(excercise.image?.asset._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={80} color="white" />
            </View>
          )}
          {/* Gradient overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetail;
