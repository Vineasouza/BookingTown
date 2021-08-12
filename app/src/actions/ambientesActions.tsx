import firebase from "firebase";

export const CRIAR_AMBIENTE = "CRIAR_AMBIENTE";
const criarAmbienteAction = (ambiente: any) => ({
  type: CRIAR_AMBIENTE,
  ambiente,
});

export const LISTAR_AMBIENTE = "LISTAR_AMBIENTE";
const listarAmbientesAction = (ambiente: any) => ({
  type: LISTAR_AMBIENTE,
  ambiente,
});

export const ATUALIZAR_AMBIENTE = "ATUALIZAR_AMBIENTE";
const atualizarAmbienteAction = (ambiente: any) => ({
  type: ATUALIZAR_AMBIENTE,
  ambiente,
});

export const DELETAR_AMBIENTE = "DELETAR_AMBIENTE";
const deletarAmbienteAction = (ambienteID: any) => ({
  type: DELETAR_AMBIENTE,
  ambienteID,
});

export const criarAmbiente = (ambiente: any) => (dispatch) => {
  const db = firebase.database().ref("ambientes");

  return db
    .push(ambiente)
    .then(() => dispatch(criarAmbienteAction(ambiente)))
    .catch(() => {});
};

export const listarAmbiente = () => (dispatch) => {
  const db = firebase.database().ref("ambientes");

  return db
    .get()
    .then((snapshot) =>
      dispatch(
        listarAmbientesAction(
          Object.values(snapshot.val()).map((ambiente: any, idx: any) => ({
            ...ambiente,
            // descricao: Object.values(ambiente.descricao),
            // lotacaoMaxima: Object.values(ambiente.lotacaoMaxima),
            id: Object.keys(snapshot.val())[idx],
          }))
        )
      )
    )
    .catch(() => {});
};

export const atualizarAmbiente = (novosDadosDoAmbiente: any) => (dispatch) => {
  const ambienteAtual = firebase
    .database()
    .ref(`ambientes/${novosDadosDoAmbiente.id}`);

  return ambienteAtual
    .update(novosDadosDoAmbiente)
    .then(() => dispatch(atualizarAmbienteAction(novosDadosDoAmbiente)));
};

export const deletarAmbiente = (IDambiente: any) => (dispatch) => {
  const ambientes = firebase.database().ref(`ambientes/${IDambiente}`);

  return ambientes.remove().then(dispatch(deletarAmbienteAction(IDambiente)));
};
