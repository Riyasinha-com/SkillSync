export interface EducationEntry {
  id: string
  school: string
  degree: string
  year: string
}

export interface SocialLinks {
  linkedin: string
  twitter: string
  github: string
  website: string
}

export interface PortfolioLink {
  id: string
  title: string
  url: string
}

export interface EditProfileFormData {
  name: string
  username: string
  location: string
  timezone: string
  bio: string
  education: EducationEntry[]
  skills: string[]
  languages: string[]
  social: SocialLinks
  portfolio: PortfolioLink[]
}

export const INITIAL_EDIT_PROFILE: EditProfileFormData = {
  name: 'Alex Rivera',
  username: 'alexrivera',
  location: 'Denver, USA',
  timezone: 'GMT-7',
  bio: 'Frontend engineer who teaches React and Excel in exchange for design and language practice. Big believer in learning by doing.',
  education: [
    { id: 'edu-1', school: 'University of Colorado', degree: 'B.S. Computer Science', year: '2018' },
  ],
  skills: ['React', 'Python', 'Photoshop', 'Excel', 'Canva'],
  languages: ['English', 'Spanish'],
  social: {
    linkedin: 'linkedin.com/in/alexrivera',
    twitter: '',
    github: 'github.com/alexrivera',
    website: '',
  },
  portfolio: [
    { id: 'pf-1', title: 'SkillSync Frontend', url: 'github.com/alexrivera/skillsync' },
  ],
}
