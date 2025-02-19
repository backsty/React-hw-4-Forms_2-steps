import React from 'react';
import { WorkoutForm } from './components/WorkoutForm/WorkoutForm';
import { WorkoutList } from './components/WorkoutList/WorkoutList';
import { useWorkouts } from './hooks/useWorkouts';
import { workoutService } from './services/workoutService';

function App() {
  const {
    workouts,
    editingWorkout,
    addWorkout,
    deleteWorkout,
    editWorkout,
    updateWorkout,
    setEditingWorkout,
  } = useWorkouts();

  const handleSubmit = (date: string, distance: number) => {
    try {
      if (editingWorkout) {
        updateWorkout(editingWorkout.id, date, distance);
      } else {
        addWorkout(date, distance);
      }
    } catch (error) {
      console.error('Ошибка при сохранении тренировки:', error);
    }
  };

  const handleCancel = () => {
    setEditingWorkout(null);
  };

  React.useEffect(() => {
    // Загрузка начальных данных
    const initialWorkouts = workoutService.getWorkouts();
    if (initialWorkouts.length === 0) {
      // Можно добавить демо-данные для примера
      const demoWorkouts = [
        { id: '1', date: '2024-02-20', distance: 5.2 },
        { id: '2', date: '2024-02-19', distance: 3.8 },
      ];
      demoWorkouts.forEach((workout) => addWorkout(workout.date, workout.distance));
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Учёт тренировок</h1>
      </header>

      <main className="app-main">
        <section className="form-section">
          <WorkoutForm
            onSubmit={handleSubmit}
            editingWorkout={editingWorkout}
            onCancel={handleCancel}
          />
        </section>

        <section className="list-section">
          {workouts.length > 0 ? (
            <WorkoutList workouts={workouts} onDelete={deleteWorkout} onEdit={editWorkout} />
          ) : (
            <p className="no-data">Нет данных о тренировках</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
