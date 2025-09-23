import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import exercise from "sanity/schemaTypes/exercise";
import Exercise from "sanity/schemaTypes/exercise";
import { useRouter } from "expo-router";
import { defineQuery } from "groq";
import { client } from "@/lib/sanity/client";
import ExerciseCard from "@/app/components/ExerciseCard";

export const exerciseQuery = defineQuery(`*[_type == "exercise"] {
  ...
  }`);

const Exercises = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [exercises, setExercises] = React.useState([]);
  const router = useRouter();
  const [filteredExercises, setFilteredExercises] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const fetchExercises = async () => {
    try {
      // Fetch exercises from Sanity
      const exercises = await client.fetch(exerciseQuery);
      setExercises(exercises);
      setFilteredExercises(exercises);
    } catch (error) {
      console.log("Có lỗi khi tải bài tập:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, exercises]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExercises();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Thư viện bài tập
        </Text>
        <Text className="text-gray-600 mt-1">
          Khám phá và thành thục các bài tập mới
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Tim kiếm bài tập"
            placeholderTextColor={"#9CA3AF"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={24} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <ExerciseCard
            item={item}
            onPress={() => router.push(`/exercise-detail?id=${item._id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
            title="Kéo để làm mới danh sách bài tập"
            titleColor="#6B7280"
          />
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="fitness-outline" size={64} color="#9CA3AF" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              {searchQuery ? "Không tìm thấy bài tập" : "Tải bài tập..."}
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              {searchQuery
                ? "Thử tìm bài tập khác"
                : "Bìa tập sẽ xuất hiện ở đây"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Exercises;
