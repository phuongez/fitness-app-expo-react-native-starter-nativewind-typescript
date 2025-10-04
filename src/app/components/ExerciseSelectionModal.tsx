import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useWorkoutStore } from "store/workout-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ExerciseCard from "./ExerciseCard";
import { Exercise } from "@/lib/sanity/types";
import { client } from "@/lib/sanity/client";
import { exerciseQuery } from "../(app)/(tabs)/exercises";

interface ExerciseSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const ExerciseSelectionModal = ({
  visible,
  onClose,
}: ExerciseSelectionModalProps) => {
  const router = useRouter();
  const { addExerciseToWorkout } = useWorkoutStore();
  const [exercises, setExercises] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredExercises, setFilteredExercises] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (visible) {
      fetchExercises();
    }
  }, [visible]);

  useEffect(() => {
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, exercises]);

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

  const handleExercisePress = (exercise: Exercise) => {
    addExerciseToWorkout({ name: exercise.name, sanityId: exercise._id });
    onClose();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExercises();
    setRefreshing(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        {/* Header */}
        <View className="bg-white px-4 pt-4 pb-6 shadow-sm border-b border-gray-100">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              Thêm bài tập
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <Text className="mb-4 text-gray-600">
            Chọn bài tập để thêm vào buổi tập
          </Text>
          {/* Search bar */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-800"
              placeholder="Tìm kiếm bài tập"
              placeholderTextColor={"#9CA3AF"}
              value={searchQuery}
              onChangeText={setSearchQuery}
            >
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#6b7280" />
                </TouchableOpacity>
              )}
            </TextInput>
          </View>
        </View>
        {/* Exercise List */}
        <FlatList
          data={filteredExercises}
          renderItem={({ item }) => (
            <ExerciseCard
              item={item}
              onPress={() => handleExercisePress(item)}
              showChevron={false}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 32,
            paddingTop: 16,
            paddingHorizontal: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3b82f6"]}
              tintColor={"#3b82f6"}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons name="fitness-outline" size={64} color="#D1D5DB" />
              <Text className="text-lg font-semibold text-gray-400 mt-4">
                {searchQuery ? "Thử đổi từ khoá tìm kiếm" : "Xin chờ giây lát"}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseSelectionModal;
