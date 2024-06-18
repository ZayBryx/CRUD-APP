import { View, Text, Button } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <Button title="Add" onPress={() => router.push("/create")} />
          ),
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add Post",
          presentation: "formSheet",
        }}
      />

      <Stack.Screen
        name="edit/[itemId]"
        options={{
          headerTitle: "Add Post",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
