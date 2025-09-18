import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="active-workout"
        options={{
          headerShown: false,
          title: "Acive Workout",
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          headerShown: false,
          title: "Profile",
          //   tabBarIcon: ({ color, size }) => (
          //     <Image
          //       source={user?.imageUrl ?? user?.externalAccounts[0]?.imageUrl}
          //       className="rounded-full"
          //       style={{ width: 28, height: 28, borderRadius: 100 }}
          //     />
          //   ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
