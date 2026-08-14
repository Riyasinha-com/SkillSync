import { useState } from "react"
import api from "@/api/api"
import Modal from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSkillAdded: () => void
}

export default function AddSkillModal({
  isOpen,
  onClose,
  onSkillAdded,
}: Props) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("Beginner")
  const [yearsOfExperience, setYearsOfExperience] = useState(0)
  const [description, setDescription] = useState("")
  const [type, setType] = useState("Teach")

  const handleSubmit = async () => {
  try {
    await api.post("/skills", {
      title,
      category,
      level,
      yearsOfExperience,
      description,
      type,
    })

    alert("Skill added successfully!")

onSkillAdded()

onClose()

  } catch (error) {
    console.error(error)
    alert("Failed to add skill.")
  }
}
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Skill"
    >
      <div className="space-y-5">

        {/* Skill Title */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Skill Title
          </label>
          <Input
            placeholder="React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Category
          </label>
          <Input
            placeholder="Programming"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Level
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-xl bg-[#24203d] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Years of Experience
          </label>

          <Input
            type="number"
            placeholder="0"
            value={yearsOfExperience}
            onChange={(e) =>
              setYearsOfExperience(Number(e.target.value))
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Description
          </label>

          <Textarea
            placeholder="Describe what you can teach..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">
            Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl bg-[#24203d] border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Teach">Teach</option>
            <option value="Learn">Learn</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="glass"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
          >
            Save Skill
          </Button>
        </div>

      </div>
    </Modal>
  )
}