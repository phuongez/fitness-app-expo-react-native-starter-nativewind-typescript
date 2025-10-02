import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Workout from "@/app/(app)/(tabs)/workout";
import workout from "sanity/schemaTypes/workout";

export interface WorkoutSet {
  id: string;
  reps: string;
  weight: string;
  weightUnit: "kg" | "lb";
  isCompleted: boolean;
}

interface WorkoutExercise {
  id: string;
  sanityId: string;
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutStore {
  // State variables
  workoutExercises: WorkoutExercise[];
  weightUnit: "kg" | "lb";
  //   Actions

  addExerciseToWorkout: (exercise: { name: string; sanityId: string }) => void;
  setWorkoutExercises: (
    exercises:
      | WorkoutExercise[]
      | ((prev: WorkoutExercise[]) => WorkoutExercise[])
  ) => void;
  setWeightUnit: (unit: "kg" | "lb") => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      // State variables
      workoutExercises: [],
      weightUnit: "kg",
      //   Actions
      addExerciseToWorkout: (exercise) =>
        set((state) => {
          const newExercise: WorkoutExercise = {
            id: Math.random().toString(),
            sanityId: exercise.sanityId,
            name: exercise.name,
            sets: [],
          };
          return {
            workoutExercises: [...state.workoutExercises, newExercise],
          };
        }),
      setWorkoutExercises: (exercises) =>
        set((state) => ({
          workoutExercises:
            typeof exercises === "function"
              ? exercises(state.workoutExercises)
              : exercises,
        })),

      setWeightUnit: (unit) => set({ weightUnit: unit }),
      resetWorkout: () => set({ workoutExercises: [] }),
    }),
    {
      name: "workout-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        weightUnit: state.weightUnit,
      }),
    }
  )
);
