import { client } from "@/lib/sanity/client";
import { useUser } from "@clerk/clerk-expo";
import { defineQuery } from "groq";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export const getWorkoutsQuery =
  defineQuery(`*[_type == "workout" && user._ref == $userId] | order(date desc) {
  _id,
  date,
  duration,
  exercises[] {
    exercise -> {
    _id,
    name
    },
    sets[] {
    reps,
    weight,
    weightUnit,
    _type,
    _key
    },
    _type,
    _key
  },
}`);

export default function HistoryPage() {
  const { user } = useUser();
  const [workouts, setWorkouts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchWorkouts = async () => {
    if (!user?.id) return;
    try {
      const results = await client.fetch(getWorkoutsQuery, { userId: user.id });
      setWorkouts(results);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  return (
    <SafeAreaView className="flex flex-1">
      <Text>History</Text>
    </SafeAreaView>
  );
}
