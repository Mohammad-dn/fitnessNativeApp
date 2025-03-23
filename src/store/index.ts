import { create } from "zustand";
import { WorkoutWithExercises } from "../types/models";

import * as Crypto from "expo-crypto";

type State = {
	currentWorkout: WorkoutWithExercises | null;
	workouts: WorkoutWithExercises[];
};
type Actions = {
	startWorkout: () => void;
	finishWorkout: () => void;
};
export const useWorkouts = create<State & Actions>()((set, get) => ({
	currentWorkout: null,
	workouts: [],
	startWorkout: () => {
		const newWorkout: WorkoutWithExercises = {
			id: Crypto.randomUUID(),
			createdAt: new Date(),
			finishedAt: null,
			exercises: [],
		};
		set({
			currentWorkout: newWorkout,
		});
	},
	finishWorkout: () => {
		const { currentWorkout } = get();
		if (!currentWorkout) {
			return;
		}
		const finishedWorkout: WorkoutWithExercises = {
			...currentWorkout,
			finishedAt: new Date(),
		};
		set((state) => ({
			currentWorkout: null,
			workouts: [finishedWorkout, ...state.workouts],
		}));
	},
}));
