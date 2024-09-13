import API from './API'

export const login = async (email: string, password: string) => {
  try {
    const response = await API.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await API.post(`/membro`, { nome: name, email, senha: password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}
