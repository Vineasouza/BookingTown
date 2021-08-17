export const SET_NOVO_AMBIENTE = "SET_NOVO_AMBIENTE";
export const setNovoAmbiente = (campo: any, valor: any) => ({
  type: SET_NOVO_AMBIENTE,
  campo,
  valor,
});
