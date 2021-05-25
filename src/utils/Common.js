// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

  export const getPassword = () => {
    const password = sessionStorage.getItem('password');
    if (password) return JSON.parse(password);
    else return null;
  }
   
//   // return the token from the session storage
//   export const getToken = () => {
//     return sessionStorage.getItem('token') || null;
//   }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    // sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('password');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (user, password) => {
    // sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('password', JSON.stringify(password));
  }