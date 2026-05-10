import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationRange,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function PaginationDemo() {
  const { t } = useI18n()

  return (
    <div className="grid gap-6">
      <NumberedPagination />
      <div className="grid gap-6 lg:grid-cols-2">
        <CompactPagination />
        <CursorPagination />
      </div>
      <PageSizePagination />
      <Demo label="Helper">
        <div className="grid gap-2 text-sm font-mono text-fg-muted">
          <div>paginationRange(7, 20, 1)  → [1, 'ellipsis', 6, 7, 8, 'ellipsis', 20]</div>
          <div>paginationRange(2, 20, 1)  → [1, 2, 3, 4, 5, 'ellipsis', 20]</div>
          <div>paginationRange(19, 20, 1) → [1, 'ellipsis', 16, 17, 18, 19, 20]</div>
          <div>paginationRange(3, 5, 1)   → [1, 2, 3, 4, 5]</div>
        </div>
        <p className="mt-3 text-xs text-fg-muted">
          {t('pagination.helperHint')}
        </p>
      </Demo>
    </div>
  )
}

function NumberedPagination() {
  const [page, setPage] = useState(7)
  const totalPages = 20
  const items = paginationRange(page, totalPages, 1)
  return (
    <Demo label="Numbered (smart range)">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-disabled={page === 1}
              className={page === 1 ? 'pointer-events-none opacity-40' : ''}
            />
          </PaginationItem>
          {items.map((item, i) =>
            item === 'ellipsis' ? (
              <PaginationItem key={`e-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={page === item}
                  onClick={() => setPage(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-disabled={page === totalPages}
              className={page === totalPages ? 'pointer-events-none opacity-40' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Demo>
  )
}

function CompactPagination() {
  const { t } = useI18n()
  const [page, setPage] = useState(3)
  const totalPages = 12
  return (
    <Demo label="Compact">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-fg-muted">
          {t('pagination.pageOf', { current: page, total: totalPages })}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous"
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Demo>
  )
}

function CursorPagination() {
  const { t } = useI18n()
  const [shown, setShown] = useState(20)
  const total = 142
  const remaining = total - shown
  return (
    <Demo label="Cursor / load more">
      <div className="grid gap-3">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface/40 p-3 text-sm text-fg-muted">
          {t('pagination.shownOf', { shown, total })}
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            disabled={remaining === 0}
            onClick={() => setShown((s) => Math.min(total, s + 20))}
            leftIcon={<Plus />}
          >
            {remaining === 0 ? t('pagination.allLoaded') : t('pagination.loadMore', { n: Math.min(20, remaining) })}
          </Button>
        </div>
      </div>
    </Demo>
  )
}

function PageSizePagination() {
  const { t } = useI18n()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const totalItems = 287
  const totalPages = Math.ceil(totalItems / pageSize)
  const items = paginationRange(page, totalPages, 1)
  const fromItem = (page - 1) * pageSize + 1
  const toItem = Math.min(page * pageSize, totalItems)

  function changePageSize(v: string) {
    const n = Number(v)
    setPageSize(n)
    // Keep the user roughly at the same position
    const newTotal = Math.ceil(totalItems / n)
    setPage((p) => Math.min(p, newTotal))
  }

  return (
    <Demo label="With page size + total counter">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
          <span>{t('pagination.rowsPerPage')}</span>
          <Select value={String(pageSize)} onValueChange={changePageSize}>
            <SelectTrigger className="h-9 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="font-mono text-xs">
            {t('pagination.itemsRange', { from: fromItem, to: toItem, total: totalItems })}
          </span>
        </div>
        <Pagination className="lg:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                showLabel={false}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? 'pointer-events-none opacity-40' : ''}
              />
            </PaginationItem>
            {items.map((item, i) =>
              item === 'ellipsis' ? (
                <PaginationItem key={`e-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={page === item}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                showLabel={false}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={page === totalPages}
                className={page === totalPages ? 'pointer-events-none opacity-40' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Demo>
  )
}
