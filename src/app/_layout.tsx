import Colors from '@/constants/Colors';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

// SQLite.deleteDatabaseSync(dbName);

export default function RootLayout() {
	const colorScheme = useColorScheme();

	// const loadWorkouts = useWorkouts((state) => state.loadWorkouts);

	// useEffect(() => {
	// 	loadWorkouts();
	// }, []);

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
