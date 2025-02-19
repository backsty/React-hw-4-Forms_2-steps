export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU');
};

export const validateDistance = (distance: string): boolean => {
  const num = parseFloat(distance);
  return !isNaN(num) && num > 0;
};

export const sortWorkoutsByDate = (date1: string, date2: string): number => {
  return new Date(date2).getTime() - new Date(date1).getTime();
};
