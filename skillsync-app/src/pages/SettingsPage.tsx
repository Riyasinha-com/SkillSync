import { useEffect, useState } from 'react'
import api from '@/api/api'
import { SettingsTabs, type SettingsTab } from '@/components/settings/SettingsTabs'
import { AccountSection } from '@/components/settings/AccountSection'
import { AppearanceSection } from '@/components/settings/AppearanceSection'
import { NotificationSettingsSection } from '@/components/settings/NotificationSettingsSection'
import { PrivacySection } from '@/components/settings/PrivacySection'
import { SecuritySection } from '@/components/settings/SecuritySection'
import { ConnectedAccountsSection } from '@/components/settings/ConnectedAccountsSection'
import {
  INITIAL_NOTIFICATION_PREFS,
  INITIAL_PRIVACY_PREFS,
  INITIAL_CONNECTED_ACCOUNTS,
  type NotificationPrefs,
  type PrivacyPrefs,
  type ConnectedAccounts,
} from '@/data/settingsMock'

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('account')

  const [account, setAccount] = useState({
    name: '',
    email: '',
  })

  const [accountLoading, setAccountLoading] = useState(true)
  const [accountSaving, setAccountSaving] = useState(false)

  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPrefs>(INITIAL_NOTIFICATION_PREFS)

  const [privacyPrefs, setPrivacyPrefs] =
    useState<PrivacyPrefs>(INITIAL_PRIVACY_PREFS)

  const [connectedAccounts, setConnectedAccounts] =
    useState<ConnectedAccounts>(INITIAL_CONNECTED_ACCOUNTS)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await api.get('/profile')

        setAccount({
          name: data.name || '',
          email: data.email || '',
        })
      } catch (error) {
        console.error('Unable to load account settings:', error)
      } finally {
        setAccountLoading(false)
      }
    }

    void loadProfile()
  }, [])

  const saveAccount = async () => {
    try {
      setAccountSaving(true)

      await api.put('/profile', {
        name: account.name,
      })

      alert('Account details updated successfully.')
    } catch (error) {
      console.error('Unable to update account:', error)
      alert('Unable to update account details.')
    } finally {
      setAccountSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Settings
        </h1>

        <p className="text-on-surface-variant">
          Manage your account, preferences and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        <SettingsTabs value={tab} onChange={setTab} />

        <div className="min-w-0">
          {tab === 'account' && (
            <AccountSection
              account={account}
              onChange={setAccount}
              onSave={saveAccount}
              saving={accountSaving || accountLoading}
            />
          )}

          {tab === 'appearance' && <AppearanceSection />}

          {tab === 'notifications' && (
            <NotificationSettingsSection
              prefs={notificationPrefs}
              onChange={setNotificationPrefs}
            />
          )}

          {tab === 'privacy' && (
            <PrivacySection
              prefs={privacyPrefs}
              onChange={setPrivacyPrefs}
            />
          )}

          {tab === 'security' && <SecuritySection />}

          {tab === 'connected' && (
            <ConnectedAccountsSection
              accounts={connectedAccounts}
              onChange={setConnectedAccounts}
            />
          )}
        </div>
      </div>
    </div>
  )
}