import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Colors from '@/constants/Colors';
import { dbName } from '@/db';
import { useWorkouts } from '@/store';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);
// SQLite.deleteDatabaseSync(dbName);

export default function RootLayout() {
	const colorScheme = useColorScheme();
	useDrizzleStudio(db);

	const loadWorkouts = useWorkouts((state) => state.loadWorkouts);

	useEffect(() => {
		loadWorkouts();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name='index' options={{ title: 'Home' }} />
					<Stack.Screen name='workout/current' options={{ title: 'Workout' }} />
					<Stack.Screen name='workout/[id]' options={{ title: 'Workout' }} />
				</Stack>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
