import {
  Activity, BarChart3, Bell, CreditCard, Folder, MessageCircle, Settings, Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function TabsDemo() {
  const { t } = useI18n()

  return (
    <div className="grid gap-6">
      <Demo label='variant="default" — segmented'>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="activity">{t('tabs.activity')}</TabsTrigger>
            <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
            <TabsTrigger value="billing">{t('tabs.billing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Sample title={t('tabs.overview')} /></TabsContent>
          <TabsContent value="activity"><Sample title={t('tabs.activity')} /></TabsContent>
          <TabsContent value="settings"><Sample title={t('tabs.settings')} /></TabsContent>
          <TabsContent value="billing"><Sample title={t('tabs.billing')} /></TabsContent>
        </Tabs>
      </Demo>

      <Demo label='variant="underline"'>
        <Tabs defaultValue="overview" variant="underline">
          <TabsList>
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="activity">{t('tabs.activity')}</TabsTrigger>
            <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
            <TabsTrigger value="billing">{t('tabs.billing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Sample title={t('tabs.overview')} /></TabsContent>
          <TabsContent value="activity"><Sample title={t('tabs.activity')} /></TabsContent>
          <TabsContent value="settings"><Sample title={t('tabs.settings')} /></TabsContent>
          <TabsContent value="billing"><Sample title={t('tabs.billing')} /></TabsContent>
        </Tabs>
      </Demo>

      <Demo label='variant="pills"'>
        <Tabs defaultValue="overview" variant="pills">
          <TabsList>
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="activity">{t('tabs.activity')}</TabsTrigger>
            <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
            <TabsTrigger value="billing">{t('tabs.billing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Sample title={t('tabs.overview')} /></TabsContent>
          <TabsContent value="activity"><Sample title={t('tabs.activity')} /></TabsContent>
          <TabsContent value="settings"><Sample title={t('tabs.settings')} /></TabsContent>
          <TabsContent value="billing"><Sample title={t('tabs.billing')} /></TabsContent>
        </Tabs>
      </Demo>

      <Demo label='variant="subtle" — tinted background on active'>
        <Tabs defaultValue="overview" variant="subtle">
          <TabsList>
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="activity">{t('tabs.activity')}</TabsTrigger>
            <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
            <TabsTrigger value="billing">{t('tabs.billing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><Sample title={t('tabs.overview')} /></TabsContent>
          <TabsContent value="activity"><Sample title={t('tabs.activity')} /></TabsContent>
          <TabsContent value="settings"><Sample title={t('tabs.settings')} /></TabsContent>
          <TabsContent value="billing"><Sample title={t('tabs.billing')} /></TabsContent>
        </Tabs>
      </Demo>

      <Demo label="With icons + counts">
        <Tabs defaultValue="inbox" variant="underline">
          <TabsList>
            <TabsTrigger value="inbox">
              <MessageCircle /> Inbox
              <Badge size="sm" variant="brand">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell /> Alerts
              <Badge size="sm" variant="danger">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="archive">
              <Folder /> Archive
            </TabsTrigger>
            <TabsTrigger value="trash" disabled>
              Trash
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inbox"><Sample title="Inbox" /></TabsContent>
          <TabsContent value="alerts"><Sample title="Alerts" /></TabsContent>
          <TabsContent value="archive"><Sample title="Archive" /></TabsContent>
          <TabsContent value="trash"><Sample title="Trash" /></TabsContent>
        </Tabs>
      </Demo>

      <Demo label='orientation="vertical" + variant="underline"'>
        <Tabs defaultValue="profile" orientation="vertical" variant="underline">
          <div className="flex gap-6">
            <TabsList>
              <TabsTrigger value="profile"><Users /> Profile</TabsTrigger>
              <TabsTrigger value="activity"><Activity /> Activity</TabsTrigger>
              <TabsTrigger value="reports"><BarChart3 /> Reports</TabsTrigger>
              <TabsTrigger value="billing"><CreditCard /> Billing</TabsTrigger>
              <TabsTrigger value="settings"><Settings /> Settings</TabsTrigger>
            </TabsList>
            <div className="flex-1 min-w-0">
              <TabsContent value="profile" className="mt-0"><Sample title="Profile" /></TabsContent>
              <TabsContent value="activity" className="mt-0"><Sample title="Activity" /></TabsContent>
              <TabsContent value="reports" className="mt-0"><Sample title="Reports" /></TabsContent>
              <TabsContent value="billing" className="mt-0"><Sample title="Billing" /></TabsContent>
              <TabsContent value="settings" className="mt-0"><Sample title="Settings" /></TabsContent>
            </div>
          </div>
        </Tabs>
      </Demo>
    </div>
  )
}

function Sample({ title }: { title: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface/40 p-5">
      <div className="text-sm font-semibold text-fg">{title}</div>
      <p className="mt-1 text-sm text-fg-muted">
        Preview of the “{title.toLowerCase()}” tab. Swap with the real panel content.
      </p>
    </div>
  )
}
