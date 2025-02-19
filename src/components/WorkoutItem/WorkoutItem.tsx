import React from 'react';
import { Workout } from '../../types';
import pencilIcon from '../../assets/img/pencil-for-editing.svg';
import deleteIcon from '../../assets/img/cancel_close_delete_exit.svg';

interface WorkoutItemProps {
  workout: Workout;
  onDelete: (id: string) => void;
  onEdit: (workout: Workout) => void;
}

export const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onDelete, onEdit }) => {
  return (
    <tr className="workout-item">
      <td>{workout.date}</td>
      <td>{workout.distance}</td>
      <td className="workout-actions">
        <button
          className="action-button edit-button"
          onClick={() => onEdit(workout)}
          title="Редактировать"
        >
          <img src={pencilIcon} alt="Редактировать" />
        </button>
        <button
          className="action-button delete-button"
          onClick={() => onDelete(workout.id)}
          title="Удалить"
        >
          <img src={deleteIcon} alt="Удалить" />
        </button>
      </td>
    </tr>
  );
};
