export const ADD_USER = 'ADD_USER';
export const CLEAR_USER = 'CLEAR_USER';

export function addUser(userId, role) {
  return {
    type: ADD_USER,
  };
}

export function cleanUser() {
  return {
    type: CLEAR_USER,
  };
}
