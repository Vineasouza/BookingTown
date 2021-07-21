export const USER_LOGIN = "USER_LOGIN";
const userLogin = (user: any) => ({
  type: USER_LOGIN,
  user,
});

export const USER_LOGOUT = "USER_LOGOUT";
const userLogout = () => ({
  type: USER_LOGOUT,
});
