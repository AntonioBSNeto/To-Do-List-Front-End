import { useEffect, useState } from "react"
import { Subheader } from "../components/header/subheader"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentAccessToken, selectCurrentUserId } from "../redux/features/auth/authSlice"
import { Membro } from "../utils/types/membro"
import { MemberCard } from "../components/memberCard"
import { getAllMembers } from "../service/api/memberService"

export const Members = () => {
  const [members, setMembers] = useState<Membro[]>([])

  const accessToken = useAppSelector(selectCurrentAccessToken)
  const userId = useAppSelector(selectCurrentUserId)

  useEffect(() => {
    const getTasks = async () => {
      return await getAllMembers(accessToken)
    }

    try {
      getTasks()
        .then(members => {
          setMembers(members)
        })
    } catch (error) { }

  }, [])

  const renderMembers = () => {
    return members.map(member => {
      const readonly = member.id !== userId
      return (
        <MemberCard key={member.id} member={member} readonly={readonly} deleteMember={removeMember} />
      )
    })
  }

  const removeMember = (memberId: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId))
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
          {
            (members.length > 0) && renderMembers()
          }
        </div>
      </div>
    </>
  )
}