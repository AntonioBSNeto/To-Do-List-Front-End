import API from './API'

export const getAllTasks = async (token: string) => {
  try {
    const response = await API.get(`/tarefa`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}