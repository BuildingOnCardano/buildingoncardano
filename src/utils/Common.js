export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr;
};

export const getPassword = () => {
  return localStorage.getItem('password');
};

export const getIsLoggedIn = () => {
  return localStorage.getItem('loggedin');
};


export const removeUserSession = () => {
  localStorage.setItem('loggedin', false);
};


export const setUserSession = (user, password) => {
  localStorage.setItem('loggedin', true);
  localStorage.setItem('user', user);
  localStorage.setItem('password', password);
};