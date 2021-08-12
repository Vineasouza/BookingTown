import firebase from "firebase";

export const USER_LOGIN = "USER_LOGIN";
const userLogin = (user: any) => ({
  type: USER_LOGIN,
  user,
});

export const fazerLogin = (usuario) => (dispatch) => {
  const { email, senha } = usuario;

  const db = firebase.database().ref();

  return firebase
    .auth()
    .signInWithEmailAndPassword(email.value, senha.value)
    .then((dadosDoLogin: any) => {
      return db
        .child("usuarios")
        .orderByChild("uid")
        .equalTo(dadosDoLogin?.user.uid)
        .once("value")
        .then((snapshot) => {
          const usuarioRecuperado: any = Object.values(snapshot.val())[0];
          const action = userLogin(usuarioRecuperado);
          dispatch(action);
          return usuarioRecuperado.tipo;
        });
    });
};

export const USER_LOGOUT = "USER_LOGOUT";
const userLogout = () => ({
  type: USER_LOGOUT,
});

export const fazerLogout = () => (dispatch) =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(userLogout);
    });

export const fazerCadastro = (usuario) => (dispatch) => {
  const { email, senha, nome, n_apartamento } = usuario;

  const db = firebase.database().ref("usuarios");

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, senha.value)
    .then((cadastro) =>
      db.push({
        uid: cadastro.user?.uid,
        nome: nome.value,
        n_apartamento: n_apartamento.value,
        email: email.value,
        tipo: "usuario",
      })
    );
};
