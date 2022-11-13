import axios from "axios";

export const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export const busca = async (url: string, setDados: any) => {
  const resposta = await api.get(url)
  if(('erro' in resposta.data)) {
    alert('cep inválido')
  } else {
    setDados(resposta.data)
  }
}