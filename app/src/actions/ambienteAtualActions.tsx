export const SELECIONAR_AMBIENTE = "SELECIONAR_AMBIENTE";
const selecionarAmbienteAction = (ambiente: any) => ({
  type: SELECIONAR_AMBIENTE,
  ambiente,
});

export const SET_AMBIENTE_ATUAL = "SET_AMBIENTE_ATUAL";
export const setAmbienteAtual = (campo: any, valor: any) => ({
  type: SET_AMBIENTE_ATUAL,
  campo,
  valor,
});

export const selecionarAmbienteAtual = (ambiente: any) => (dispatch: any) => {
  dispatch(selecionarAmbienteAction(ambiente));
};
