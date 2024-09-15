import API from './API'

export const getAllMembers = async (token: string) => {
  try {
    const response = await API.get(`/membro`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const removeMember = async (memberId: string, token: string) => {
  try {
    const response = await API.delete(`/membro/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}