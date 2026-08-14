export interface AccountSettings {
  email: string
  username: string
}

export const INITIAL_ACCOUNT: AccountSettings = {
  email: 'alex.rivera@example.com',
  username: 'alexrivera',
}

export interface NotificationPrefs {
  email: boolean
  push: boolean
  sessionReminders: boolean
  matchAlerts: boolean
  weeklyDigest: boolean
}

export const INITIAL_NOTIFICATION_PREFS: NotificationPrefs = {
  email: true,
  push: true,
  sessionReminders: true,
  matchAlerts: true,
  weeklyDigest: false,
}

export interface PrivacyPrefs {
  publicProfile: boolean
  showOnlineStatus: boolean
  showRating: boolean
}

export const INITIAL_PRIVACY_PREFS: PrivacyPrefs = {
  publicProfile: true,
  showOnlineStatus: true,
  showRating: true,
}

export interface ConnectedAccounts {
  google: boolean
  github: boolean
}

export const INITIAL_CONNECTED_ACCOUNTS: ConnectedAccounts = {
  google: true,
  github: false,
}
