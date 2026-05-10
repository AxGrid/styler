import { Activity, BarChart3, CreditCard, Settings2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

const TEAM = [
  { name: 'Anna Karenina', email: 'anna@ax-styler.dev', role: 'admin', status: 'active', last: '2m', img: 'https://i.pravatar.cc/64?img=47' },
  { name: 'Marco Liano', email: 'marco@ax-styler.dev', role: 'editor', status: 'active', last: '14m', img: 'https://i.pravatar.cc/64?img=12' },
  { name: 'Yuki Sato', email: 'yuki@ax-styler.dev', role: 'editor', status: 'invited', last: '—', img: 'https://i.pravatar.cc/64?img=32' },
  { name: 'Ravi Patel', email: 'ravi@ax-styler.dev', role: 'viewer', status: 'suspended', last: '4d', img: '' },
] as const

export function DataDisplayDemo() {
  const { t } = useI18n()

  return (
    <div className="grid gap-6">
      <Demo label="Cards">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Monthly revenue</CardDescription>
                <BarChart3 className="size-4 text-fg-muted" />
              </div>
              <CardTitle className="text-3xl">$24,320</CardTitle>
              <Badge variant="success" size="sm" dot>+12.4%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-fg-muted">vs. previous period</div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="brand-gradient h-24" />
            <CardHeader>
              <CardTitle>Pro plan</CardTitle>
              <CardDescription>
                Unlock advanced analytics, priority support and custom themes.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Upgrade</Button>
              <Button variant="ghost">Learn more</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-[var(--radius-md)] bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-accent">
                  <Activity className="size-4" />
                </span>
                <div>
                  <CardTitle className="text-base">Live activity</CardTitle>
                  <CardDescription className="text-xs">12 events in the last hour</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-fg-muted">User signup</span>
                <Badge variant="success" size="sm">+3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-muted">Failed payments</span>
                <Badge variant="danger" size="sm">+1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-muted">Plan upgrades</span>
                <Badge variant="brand" size="sm">+2</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Demo>

      <Demo label="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview"><Activity /> {t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="activity"><BarChart3 /> {t('tabs.activity')}</TabsTrigger>
            <TabsTrigger value="settings"><Settings2 /> {t('tabs.settings')}</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard /> {t('tabs.billing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.overview')}</CardTitle>
                <CardDescription>
                  High-level metrics and KPIs across your workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Active users', value: '1,284' },
                  { label: 'Sessions', value: '8,910' },
                  { label: 'Conversion', value: '3.2%' },
                ].map((m) => (
                  <div key={m.label} className="rounded-[var(--radius-md)] bg-surface p-4">
                    <div className="text-xs uppercase tracking-wider text-fg-muted">{m.label}</div>
                    <div className="mt-1 text-2xl font-bold">{m.value}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.activity')}</CardTitle>
                <CardDescription>Recent events across your team.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    'Anna pushed v2.3.0 to production',
                    'Marco invited 3 members to the workspace',
                    'Yuki resolved 5 incidents',
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.settings')}</CardTitle>
                <CardDescription>Manage workspace preferences here.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.billing')}</CardTitle>
                <CardDescription>Plans, invoices and payment methods.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo label="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.col.user')}</TableHead>
              <TableHead>{t('table.col.role')}</TableHead>
              <TableHead>{t('table.col.status')}</TableHead>
              <TableHead className="text-right">{t('table.col.lastSeen')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM.map((p) => (
              <TableRow key={p.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={p.img} alt={p.name} />
                      <AvatarFallback>{p.name.split(' ').map(s => s[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-fg-muted">{p.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-fg-muted">{t(`role.${p.role}`)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.status === 'active' ? 'success' :
                      p.status === 'invited' ? 'info' : 'danger'
                    }
                    size="sm"
                    dot
                  >
                    {t(`status.${p.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-fg-muted text-xs font-mono">{p.last}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>
    </div>
  )
}
