import { create } from "zustand";
import { WorkoutWithExercises } from "../types/models";

import { newWorkout } from "../services/workoutService";

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
		set({
			currentWorkout: newWorkout(),
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
