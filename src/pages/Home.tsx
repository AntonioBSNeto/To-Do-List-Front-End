import { useEffect, useState } from "react"
import { Subheader } from "../components/header/subheader"
import { TaskCard } from "../components/taskCard"
import { Tarefa } from "../utils/types/tarefa"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentAccessToken, selectCurrentUserId } from "../redux/features/auth/authSlice"
import { getAllTasks } from "../service/api/taskService"
import { Spinner } from "../components/spinner"

export const Home = () => {
  const [tasks, setTasks] = useState<Tarefa[]>([])

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
        <TaskCard key={task.id} task={task} readonly={readonly} />
      )
    })
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl px-10">
          <Subheader />
        </div>
      </div>
      <div className="w-full flex-grow flex flex-col pb-14 px-4 pt-7 bg-[#f3f3f3]">
        <button className="bg-blue-regular text-white rounded-lg px-2 py-1 ml-auto">Adicionar</button>
        <div className="mx-auto mb-6">
        </div>
        <div className="w-full flex flex-col-reverse max-w-7xl mx-auto">
            {
              (tasks.length > 0) ? renderTasks() : <p className="text-center">Crie tarefas para aparecerem aqui</p>
            }
        </div>
      </div>
    </>
  )
}