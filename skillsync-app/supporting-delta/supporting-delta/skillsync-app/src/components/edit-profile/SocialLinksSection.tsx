import { Briefcase, AtSign, FolderGit2, Globe } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type { SocialLinks } from '@/data/editProfileMock'

const FIELDS: { key: keyof SocialLinks; label: string; icon: typeof Briefcase; placeholder: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', icon: Briefcase, placeholder: 'linkedin.com/in/username' },
  { key: 'twitter', label: 'X / Twitter', icon: AtSign, placeholder: 'x.com/username' },
  { key: 'github', label: 'GitHub', icon: FolderGit2, placeholder: 'github.com/username' },
  { key: 'website', label: 'Website', icon: Globe, placeholder: 'yoursite.com' },
]

export function SocialLinksSection({
  links,
  onChange,
}: {
  links: SocialLinks
  onChange: (links: SocialLinks) => void
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
        <Input
          key={key}
          label={label}
          icon={<Icon className="w-4 h-4" />}
          value={links[key]}
          onChange={(e) => onChange({ ...links, [key]: e.target.value })}
          placeholder={placeholder}
        />
      ))}
    </div>
  )
}
