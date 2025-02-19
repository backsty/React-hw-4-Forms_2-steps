import { Workout } from '../types';

const STORAGE_KEY = 'workouts';

export const workoutService = {
  getWorkouts(): Workout[] {
    const workouts = localStorage.getItem(STORAGE_KEY);
    return workouts ? JSON.parse(workouts) : [];
  },

  saveWorkouts(workouts: Workout[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  },

  addWorkout(workout: Workout): void {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    this.saveWorkouts(workouts);
  },

  deleteWorkout(id: string): void {
    const workouts = this.getWorkouts();
    const filteredWorkouts = workouts.filter((w) => w.id !== id);
    this.saveWorkouts(filteredWorkouts);
  },

  updateWorkout(updatedWorkout: Workout): void {
    const workouts = this.getWorkouts();
    const index = workouts.findIndex((w) => w.id === updatedWorkout.id);
    if (index !== -1) {
      workouts[index] = updatedWorkout;
      this.saveWorkouts(workouts);
    }
  },
};
