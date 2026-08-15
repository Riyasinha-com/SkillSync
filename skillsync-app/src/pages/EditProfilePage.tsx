import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MapPin, Clock, User } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { AvatarUploadCard } from '@/components/edit-profile/AvatarUploadCard'
import { FormSection } from '@/components/edit-profile/FormSection'
import { TagInput } from '@/components/edit-profile/TagInput'
import { EducationList } from '@/components/edit-profile/EducationList'
import { SocialLinksSection } from '@/components/edit-profile/SocialLinksSection'
import { PortfolioLinksInput } from '@/components/edit-profile/PortfolioLinksInput'
import { INITIAL_EDIT_PROFILE, type EditProfileFormData } from '@/data/editProfileMock'
import { TIMEZONES } from '@/data/exploreMock'
import api from '@/api/api'

// Backend (GET/PUT /api/profile) only persists these fields today.
// "location" in this form maps to the backend's "city" field.

export default function EditProfilePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<EditProfileFormData>(INITIAL_EDIT_PROFILE)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function loadProfile() {
      try {
        const res = await api.get('/profile')
        if (!active) return
        const data = res.data
        setForm((f) => ({
          ...f,
          name: data.name ?? f.name,
          bio: data.bio ?? f.bio,
          timezone: data.timezone || f.timezone,
          location: data.city ?? f.location,
        }))
      } catch {
        if (active) setError('Could not load your profile. Showing defaults.')
      } finally {
        if (active) setLoading(false)
      }
    }
    loadProfile()
    return () => {
      active = false
    }
  }, [])

  function setField<K extends keyof EditProfileFormData>(key: K, value: EditProfileFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave() {
    setStatus('saving')
    setError(null)
    try {
      await api.put('/profile', {
        name: form.name,
        bio: form.bio,
        timezone: form.timezone,
        city: form.location,
      })
      setStatus('saved')
      setTimeout(() => navigate('/profile'), 900)
    } catch {
      setStatus('idle')
      setError('Could not save your profile. Please try again.')
    }
  }

  const saving = status === 'saving'
  const saved = status === 'saved'

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">Edit Profile</h1>
        <p className="text-on-surface-variant">Update your details, skills and links.</p>
      </div>

      {loading && <Alert variant="info">Loading your profile&hellip;</Alert>}
      {error && <Alert variant="error">{error}</Alert>}
      {saved && (
        <Alert variant="success">Profile saved. Taking you back to your profile&hellip;</Alert>
      )}

      <AvatarUploadCard name={form.name} />

      <FormSection title="Personal Information">
        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="Full name"
            icon={<User className="w-4 h-4" />}
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
          />
          <Input
            label="Location"
            icon={<MapPin className="w-4 h-4" />}
            value={form.location}
            onChange={(e) => setField('location', e.target.value)}
          />
          <label className="flex flex-col gap-2 text-left">
            <span className="text-sm font-medium text-on-surface-variant">Timezone</span>
            <span className="relative flex items-center">
              <Clock className="absolute left-4 w-4 h-4 text-on-surface-variant/70 pointer-events-none" />
              <select
                value={form.timezone}
                onChange={(e) => setField('timezone', e.target.value)}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-11 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all [&>option]:bg-surface-container"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </FormSection>

      <FormSection title="Bio" description="A short introduction shown on your public profile.">
        <Textarea
          value={form.bio}
          onChange={(e) => setField('bio', e.target.value)}
          rows={4}
          maxLength={280}
        />
        <p className="text-[11px] text-on-surface-variant/60 -mt-2 text-right">{form.bio.length}/280</p>
      </FormSection>

      <FormSection title="Education">
        <EducationList entries={form.education} onChange={(v) => setField('education', v)} />
      </FormSection>

      <FormSection title="Skills" description="Skills you can teach on SkillSync.">
        <TagInput label="" values={form.skills} onChange={(v) => setField('skills', v)} placeholder="Add a skill…" />
      </FormSection>

      <FormSection title="Languages">
        <TagInput label="" values={form.languages} onChange={(v) => setField('languages', v)} placeholder="Add a language…" />
      </FormSection>

      <FormSection title="Social Links">
        <SocialLinksSection links={form.social} onChange={(v) => setField('social', v)} />
      </FormSection>

      <FormSection title="Portfolio Links">
        <PortfolioLinksInput links={form.portfolio} onChange={(v) => setField('portfolio', v)} />
      </FormSection>

      <div className="flex gap-3 sticky bottom-4">
        <Button variant="magical" size="md" className="flex-1" loading={saving} disabled={saved} onClick={handleSave}>
          {saving ? 'Saving…' : saved ? 'Saved' : 'Save Changes'}
        </Button>
        <Link to="/profile" className="flex-1">
          <Button variant="glass" size="md" className="w-full" disabled={saving || saved}>
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  )
}