export const parseBearer = (value: string = '') => {
  const data = value.split(' ');
  return data[1];
};

export const getInitials = (value: string) => {
  const names = value.split(' ');
  const first = names[0];

  if (names.length > 1) {
    const second = names[1];
    return `${first.charAt(0).toUpperCase()} ${second.charAt(0).toUpperCase()}`;
  }
  return first.charAt(0).toUpperCase();
};
