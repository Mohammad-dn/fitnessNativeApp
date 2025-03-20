import { create } from "zustand";
import { WorkoutWithExercises } from "../types/models";

type State = {
	currentWorkout: WorkoutWithExercises | null;
};
type Actions = {
	startWorkout: () => void;
};
export const useWorkouts = create<State & Actions>()((set) => ({
	currentWorkout: null,
	startWorkout: () => {
		const newWorkout: WorkoutWithExercises = {
			id: "1",
			createdAt: new Date(),
			finishedAt: null,
			exercises: [],
		};
		set({
			currentWorkout: newWorkout,
		});
	},
}));
