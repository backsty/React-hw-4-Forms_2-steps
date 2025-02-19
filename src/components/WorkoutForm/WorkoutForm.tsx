import React, { useState, useEffect } from 'react';
import { Workout } from '../../types';
import checkmarkIcon from '../../assets/img/checkmark.svg';
import cancelIcon from '../../assets/img/cancel.svg';

interface WorkoutFormProps {
  onSubmit: (date: string, distance: number) => void;
  editingWorkout: Workout | null;
  onCancel?: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, editingWorkout, onCancel }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (editingWorkout) {
      setDate(editingWorkout.date);
      setDistance(editingWorkout.distance.toString());
    }
  }, [editingWorkout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && distance) {
      onSubmit(date, parseFloat(distance));
      setDate('');
      setDistance('');
    }
  };

  return (
    <div className="workout-form">
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          step="0.1"
          min="0"
          placeholder="Километры"
          required
        />
        <button type="submit" className="submit-button">
          <img src={checkmarkIcon} alt="Подтвердить" />
          {editingWorkout ? 'Сохранить' : 'Добавить'}
        </button>
        {editingWorkout && onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            <img src={cancelIcon} alt="Отменить" />
            Отменить
          </button>
        )}
      </form>
    </div>
  );
};
