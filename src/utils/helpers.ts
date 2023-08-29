export const parseBearer = (value: string = '') => {
  const data = value.split(' ');
  return data[1];
};
