import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          title: "Tasks",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
