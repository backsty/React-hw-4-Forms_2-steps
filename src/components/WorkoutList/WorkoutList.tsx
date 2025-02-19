import React from 'react';
import { Workout } from '../../types';
import { WorkoutItem } from '../WorkoutItem/WorkoutItem';

interface WorkoutListProps {
  workouts: Workout[];
  onDelete: (id: string) => void;
  onEdit: (workout: Workout) => void;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onDelete, onEdit }) => {
  if (workouts.length === 0) {
    return <div className="no-data">Нет данных о тренировках</div>;
  }

  return (
    <div className="list-section">
      <div className="table-container">
        <table className="workout-list">
          <thead>
            <tr>
              <th className="date-column">Дата</th>
              <th className="distance-column">Пройдено км</th>
              <th className="actions-column">Действия</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
