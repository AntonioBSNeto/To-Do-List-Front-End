import { useEffect, useState } from "react"
import { Subheader } from "../components/header/subheader"
import { TaskCard } from "../components/taskCard"
import { Tarefa } from "../utils/types/tarefa"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentAccessToken, selectCurrentUserId } from "../redux/features/auth/authSlice"
import { getAllTasks } from "../service/api/taskService"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const [tasks, setTasks] = useState<Tarefa[]>([])

  const navigate = useNavigate()

  const accessToken = useAppSelector(selectCurrentAccessToken)
  const userId = useAppSelector(selectCurrentUserId)

  useEffect(() => {
    const getTasks = async () => {
      return await getAllTasks(accessToken)
    }

    try {
      getTasks()
        .then(tasks => {
          setTasks(tasks)
        })
    } catch (error) { }

  }, [])

  const renderTasks = () => {
    return tasks.map(task => {
      const readonly = task.membroId !== userId
      return (
        <TaskCard key={task.id} task={task} readonly={readonly} deleteTask={removeTask} />
      )
    })
  }

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl px-10">
          <Subheader />
        </div>
      </div>
      <div className="w-full flex-grow flex flex-col pb-14 px-4 pt-7 bg-[#f3f3f3]">

        <div className="w-full flex flex-col max-w-7xl mx-auto gap-y-3">
          <button className="bg-blue-regular text-white rounded-lg px-2 py-1 w-40 ml-auto" onClick={() => navigate('adicionar')}>Adicionar</button>
          {
            (tasks.length > 0) ? renderTasks() : <p className="text-center">Crie tarefas para aparecerem aqui</p>
          }
        </div>
      </div>
    </>
  )
}