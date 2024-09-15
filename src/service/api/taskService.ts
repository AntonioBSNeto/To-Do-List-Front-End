import { Tarefa } from '../../utils/types/tarefa';
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

export const getTaskById = async (taskId: string, token: string) => {
  try {
    const response = await API.get(`/tarefa/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const createTask = async (task: Tarefa, token: string) => {
  try {
    const response = await API.post(`/tarefa`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const updateTask = async (task: Partial<Tarefa>, taskId: string, token: string) => {
  try {
    const response = await API.patch(`/tarefa/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const removeTask = async (taskId: string, token: string) => {
  try {
    const response = await API.delete(`/tarefa/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}