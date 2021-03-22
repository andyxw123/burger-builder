export const SET = 'SET_VALUE';

export const set = (path, value) => {
  return {
    type: SET,
    path: path,
    value: value !== undefined ? value : null,
  };
};
