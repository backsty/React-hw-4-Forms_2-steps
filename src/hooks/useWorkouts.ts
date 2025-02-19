import { useState, useEffect } from 'react';
import { Workout } from '../types';
import { workoutService } from '../services/workoutService';
import { sortWorkoutsByDate } from '../utils/helpers';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const savedWorkouts = workoutService.getWorkouts();
    setWorkouts(savedWorkouts);
  }, []);

  const addWorkout = (date: string, distance: number) => {
    const existingWorkoutIndex = workouts.findIndex((w) => w.date === date);

    if (existingWorkoutIndex !== -1) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[existingWorkoutIndex].distance += distance;
      workoutService.saveWorkouts(updatedWorkouts);
      setWorkouts(updatedWorkouts);
    } else {
      const newWorkout: Workout = {
        id: Date.now().toString(),
        date,
        distance,
      };
      const newWorkouts = [...workouts, newWorkout].sort((a, b) =>
        sortWorkoutsByDate(a.date, b.date),
      );

      workoutService.saveWorkouts(newWorkouts);
      setWorkouts(newWorkouts);
    }
  };

  const deleteWorkout = (id: string) => {
    workoutService.deleteWorkout(id);
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const editWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
  };

  const updateWorkout = (id: string, date: string, distance: number) => {
    const updatedWorkout = { id, date, distance };
    workoutService.updateWorkout(updatedWorkout);

    setWorkouts(workouts.map((workout) => (workout.id === id ? updatedWorkout : workout)));
    setEditingWorkout(null);
  };

  return {
    workouts,
    editingWorkout,
    addWorkout,
    deleteWorkout,
    editWorkout,
    updateWorkout,
    setEditingWorkout,
  };
};
