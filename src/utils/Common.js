// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr;
  // if (userStr) return JSON.parse(userStr);
  // else return null;
};

export const getPassword = () => {
  const password = localStorage.getItem('password');
  if (password) return JSON.parse(password);
  else return null;
};

//   // return the token from the session storage
//   export const getToken = () => {
//     return sessionStorage.getItem('token') || null;
//   }

// remove the token and user from the session storage
export const removeUserSession = () => {
  // sessionStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('password');
};

// set the token and user from the session storage
export const setUserSession = (user, password) => {
  // sessionStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('password', JSON.stringify(password));
};
