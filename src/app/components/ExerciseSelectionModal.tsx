import { View, Text, Modal } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useWorkoutStore } from "store/workout-store";

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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Text></Text>
    </Modal>
  );
};

export default ExerciseSelectionModal;
