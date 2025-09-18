import "../global.css";
import { Slot, Stack, Tabs } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>
  );
}
