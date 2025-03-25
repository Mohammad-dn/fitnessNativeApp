import { create } from 'zustand';
import { ExerciseSet, WorkoutWithExercises } from '../types/models';

import { current } from 'immer';
import { immer } from 'zustand/middleware/immer';
import { createExercise } from '../services/exerciseService';
import { createSet, updateSet } from '../services/setService';
import { finishWorkout, newWorkout } from '../services/workoutService';

type State = {
	currentWorkout: WorkoutWithExercises | null;
	workouts: WorkoutWithExercises[];
};
type Actions = {
	startWorkout: () => void;
	finishWorkout: () => void;
	addExercise: (name: string) => void;
	addSet: (exerciseId: string) => void;
	updateSet: (setId: string, updatedFileds: Pick<ExerciseSet, 'reps' | 'weight'>) => void;
	deleteSet: (setId: string) => void;
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
		addSet: (exerciseId: string) => {
			const newSet = createSet(exerciseId);

			set(({ currentWorkout }) => {
				const exercise = currentWorkout?.exercises.find((e) => e.id === exerciseId);
				exercise?.sets.push(newSet);
			});
		},
		updateSet: (setId, updatedFileds) => {
			set(({ currentWorkout }) => {
				if (!currentWorkout) {
					return null;
				}

				const exercise = currentWorkout.exercises.find((exercise) =>
					exercise.sets.some((set) => set.id === setId),
				);

				const setIndex = exercise?.sets?.findIndex((set) => set.id === setId);

				if (!exercise || setIndex === undefined || setIndex === -1) {
					return;
				}

				const udpatedSet = updateSet(current(exercise.sets[setIndex]), updatedFileds);

				exercise.sets[setIndex] = udpatedSet;
			});
		},
		deleteSet: (setId) => {
			set(({ currentWorkout }) => {
				const exercise = currentWorkout?.exercises.find((exercise) =>
					exercise.sets.some((set) => set.id === setId),
				);
				if (!exercise) {
					return;
				}

				exercise.sets = exercise.sets.filter((set) => set.id !== setId);

				if (exercise.sets.length === 0 && currentWorkout) {
					currentWorkout.exercises = currentWorkout?.exercises.filter((ex) => ex.id !== exercise.id);
				}
			});
		},
	})),
);
