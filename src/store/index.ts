import { create } from 'zustand';
import { WorkoutWithExercises } from '../types/models';

import { immer } from 'zustand/middleware/immer';
import { createExercise } from '../services/exerciseService';
import { finishWorkout, newWorkout } from '../services/workoutService';

type State = {
	currentWorkout: WorkoutWithExercises | null;
	workouts: WorkoutWithExercises[];
};
type Actions = {
	startWorkout: () => void;
	finishWorkout: () => void;
	addExercise: (name: string) => void;
};
export const useWorkouts = create<State & Actions>()(
	immer((set, get) => ({
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
			const finishedWorkout = finishWorkout(currentWorkout);
			set((state) => {
				state.currentWorkout = null;
				state.workouts.unshift(finishedWorkout);
			});
		},
		addExercise: (name: string) => {
			const { currentWorkout } = get();
			if (!currentWorkout) {
				return;
			}

			const newExercise = createExercise(name, currentWorkout.id);

			set((state) => {
				state.currentWorkout?.exercises.push(newExercise);
			});
		},
	})),
);
