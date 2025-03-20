import Colors from "@/constants/Colors";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";

import { dbName } from "@/db";
import { GestureHandlerRootView } from "react-native-gesture-handler";

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);

// SQLite.deleteDatabaseSync(dbName);

export default function RootLayout() {
	const colorScheme = useColorScheme();
	useDrizzleStudio(db);

	// const loadWorkouts = useWorkouts((state) => state.loadWorkouts);

	// useEffect(() => {
	// 	loadWorkouts();
	// }, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<Stack>
					<Stack.Screen name="index" options={{ title: "Home" }} />
					<Stack.Screen
						name="workout/current"
						options={{ title: "Workout" }}
					/>
					<Stack.Screen
						name="workout/[id]"
						options={{ title: "Workout" }}
					/>
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
