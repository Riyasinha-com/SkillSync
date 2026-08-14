import { useEffect, useState } from "react"
import api from "@/api/api"
import { Button } from "@/components/ui/Button"

interface Skill {
  _id: string
  title: string
  type: "Teach" | "Learn"
}

interface Teacher {
  _id: string
  name: string
}

interface Props {
  open: boolean
  teacher: Teacher | null
  onClose: () => void
  onSuccess: () => void
}

export default function RequestSwapModal({
  open,
  teacher,
  onClose,
  onSuccess,
}: Props) {
  const [mySkills, setMySkills] = useState<Skill[]>([])
  const [theirSkills, setTheirSkills] = useState<Skill[]>([])

  const [senderSkillId, setSenderSkillId] = useState("")
  const [receiverSkillId, setReceiverSkillId] = useState("")

  const [message, setMessage] = useState(
    "I'd like to swap skills with you!"
  )

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !teacher) return

    async function loadSkills() {
  try {
    const [mine, theirs] = await Promise.all([
      api.get("/skills"),
      api.get(`/skills/user/${teacher!._id}`)
    ])

    console.log("My Skills:", mine.data)
    console.log("Teacher Skills:", theirs.data)

    const myTeach = mine.data.filter(
      (skill: Skill) => skill.type === "Teach"
    )

        const theirLearn = theirs.data.filter(
          (skill: Skill) => skill.type === "Learn"
        )

        setMySkills(myTeach)
        setTheirSkills(theirLearn)

        if (myTeach.length)
          setSenderSkillId(myTeach[0]._id)

        if (theirLearn.length)
          setReceiverSkillId(theirLearn[0]._id)
      } catch (err) {
        console.error(err)
      }
    }

    loadSkills()
  }, [open, teacher])

  async function sendRequest() {
    if (!senderSkillId || !receiverSkillId) return

    try {
      setLoading(true)

      await api.post("/matches", {
        senderSkillId,
        receiverSkillId,
        message,
      })

      alert("Match request sent!")

      onSuccess()
      onClose()
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Unable to send request."
      )
    } finally {
      setLoading(false)
    }
  }

  if (!open || !teacher) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="glass-panel rounded-3xl p-6 w-full max-w-lg">

        <h2 className="font-display text-2xl mb-6">
          Request Skill Swap
        </h2>

        <div className="space-y-5">

          <div>
            <label className="text-sm font-medium">
              Your Teach Skill
            </label>

            <select
              className="w-full mt-2 rounded-xl p-3 bg-surface"
              value={senderSkillId}
              onChange={(e) =>
                setSenderSkillId(e.target.value)
              }
            >
              {mySkills.map((skill) => (
                <option
                  key={skill._id}
                  value={skill._id}
                >
                  {skill.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              {teacher.name}'s Learn Skill
            </label>

            <select
              className="w-full mt-2 rounded-xl p-3 bg-surface"
              value={receiverSkillId}
              onChange={(e) =>
                setReceiverSkillId(e.target.value)
              }
            >
              {theirSkills.map((skill) => (
                <option
                  key={skill._id}
                  value={skill._id}
                >
                  {skill.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Message
            </label>

            <textarea
              rows={4}
              className="w-full mt-2 rounded-xl p-3 bg-surface"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />
          </div>

          <div className="flex justify-end gap-3">

            <Button
              variant="glass"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="magical"
              loading={loading}
              onClick={sendRequest}
            >
              Send Request
            </Button>

          </div>

        </div>
      </div>
    </div>
  )
}