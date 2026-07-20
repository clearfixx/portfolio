'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ChevronDown, Copy, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import {
  siFacebook,
  siInstagram,
  siPinterest,
  siTelegram,
  siWhatsapp,
  siX,
} from 'simple-icons/icons'

import styles from '@/app/(frontend)/blog/[slug]/article.module.scss'
import type { BlogFeedbackCounts } from '@/lib/cms'

type BlogArticleActionsProps = {
  initialCounts?: BlogFeedbackCounts
  mode?: 'actions' | 'progress'
  slug: string
  title: string
}

type ActionIconName = 'copy' | 'share' | 'thumb-down' | 'thumb-up'
type BrandIconName = 'facebook' | 'instagram' | 'pinterest' | 'telegram' | 'whatsapp' | 'x'

type FeedbackVote = 'helpful' | 'not-helpful'
type ShareTarget = 'facebook' | 'instagram' | 'pinterest' | 'telegram' | 'whatsapp' | 'x'

const feedbackStorageEvent = 'portfolio-blog-feedback-change'

function feedbackStorageKey(slug: string) {
  return `blog-feedback:${slug}`
}

function readStoredFeedback(slug: string): FeedbackVote | null {
  const savedFeedback = window.localStorage.getItem(feedbackStorageKey(slug))

  return savedFeedback === 'helpful' || savedFeedback === 'not-helpful' ? savedFeedback : null
}

function getServerFeedbackSnapshot(): FeedbackVote | null {
  return null
}

function useStoredFeedback(slug: string): FeedbackVote | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const storageKey = feedbackStorageKey(slug)

      const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) {
          onStoreChange()
        }
      }

      const handleLocalChange = (event: Event) => {
        if (event instanceof CustomEvent && event.detail === storageKey) {
          onStoreChange()
        }
      }

      window.addEventListener('storage', handleStorage)
      window.addEventListener(feedbackStorageEvent, handleLocalChange)

      return () => {
        window.removeEventListener('storage', handleStorage)
        window.removeEventListener(feedbackStorageEvent, handleLocalChange)
      }
    },
    [slug],
  )

  const getSnapshot = useCallback(() => readStoredFeedback(slug), [slug])

  return useSyncExternalStore(subscribe, getSnapshot, getServerFeedbackSnapshot)
}

const brandIconMap = {
  facebook: siFacebook,
  instagram: siInstagram,
  pinterest: siPinterest,
  telegram: siTelegram,
  whatsapp: siWhatsapp,
  x: siX,
} satisfies Record<BrandIconName, { path: string; title: string }>

function ActionIcon({ name }: { name: ActionIconName }) {
  const iconProps = {
    'aria-hidden': true,
    size: 18,
    strokeWidth: 1.9,
  } as const

  switch (name) {
    case 'copy':
      return <Copy {...iconProps} />
    case 'share':
      return <Share2 {...iconProps} />
    case 'thumb-down':
      return <ThumbsDown {...iconProps} />
    case 'thumb-up':
      return <ThumbsUp {...iconProps} />
  }
}

function BrandIcon({ name }: { name: BrandIconName }) {
  const icon = brandIconMap[name]

  return (
    <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <path d={icon.path} />
    </svg>
  )
}

function getFeedbackClientId(): string {
  const storageKey = 'portfolio-blog-feedback-client'
  const existingId = window.localStorage.getItem(storageKey)

  if (existingId) {
    return existingId
  }

  const nextId =
    typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random()
          .toString(36)
          .slice(2)}`

  window.localStorage.setItem(storageKey, nextId)
  return nextId
}

function openShareWindow(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer,width=720,height=680')
}

export function BlogArticleActions({
  initialCounts = {
    helpful: 0,
    notHelpful: 0,
  },
  mode = 'actions',
  slug,
  title,
}: BlogArticleActionsProps) {
  const shareMenuRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [counts, setCounts] = useState(initialCounts)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)
  const feedback = useStoredFeedback(slug)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setProgress(Math.min(100, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    return () => window.removeEventListener('scroll', updateProgress)
  }, [slug])

  useEffect(() => {
    if (!shareMenuOpen) {
      return
    }

    const closeOnPointer = (event: PointerEvent) => {
      if (!shareMenuRef.current?.contains(event.target as Node)) {
        setShareMenuOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShareMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnPointer)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnPointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [shareMenuOpen])

  if (mode === 'progress') {
    const roundedProgress = Math.round(progress)
    const isComplete = roundedProgress >= 99

    return (
      <div
        className={`${styles.progressMeter} ${isComplete ? styles.progressMeterComplete : ''}`}
        aria-label={isComplete ? 'Reading completed' : `${roundedProgress}% read`}
      >
        <div>
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>{isComplete ? 'Completed ✓' : `${roundedProgress}% complete`}</strong>
      </div>
    )
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setShareMenuOpen(false)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const shareArticle = async (target: ShareTarget) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    const ogImage =
      document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? ''

    setShareMenuOpen(false)

    if (target === 'instagram') {
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            text: title,
            url: window.location.href,
          })
          return
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return
          }

          throw error
        }
      }

      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      openShareWindow('https://www.instagram.com/')
      window.setTimeout(() => setCopied(false), 1800)
      return
    }

    const targets: Record<Exclude<ShareTarget, 'instagram'>, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://www.pinterest.com/pin/create/button/?url=${url}&description=${text}${
        ogImage ? `&media=${encodeURIComponent(ogImage)}` : ''
      }`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      x: `https://x.com/intent/post?text=${text}&url=${url}`,
    }

    openShareWindow(targets[target])
  }

  const saveFeedback = async (vote: FeedbackVote) => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setFeedbackError(null)

    try {
      const response = await fetch('/api/blog-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: getFeedbackClientId(),
          slug,
          vote,
        }),
      })

      const result = (await response.json()) as {
        counts?: BlogFeedbackCounts
        message?: string
        ok?: boolean
        vote?: FeedbackVote
      }

      if (!response.ok || !result.ok || !result.counts || !result.vote) {
        throw new Error(result.message || 'Unable to save feedback.')
      }

      const storageKey = feedbackStorageKey(slug)

      window.localStorage.setItem(storageKey, result.vote)
      window.dispatchEvent(new CustomEvent(feedbackStorageEvent, { detail: storageKey }))
      setCounts(result.counts)
    } catch {
      setFeedbackError('Could not save feedback. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const shareItems: Array<{
    icon: BrandIconName
    label: string
    target: ShareTarget
  }> = [
    { icon: 'facebook', label: 'Share on Facebook', target: 'facebook' },
    { icon: 'instagram', label: 'Share on Instagram', target: 'instagram' },
    { icon: 'x', label: 'Share on X', target: 'x' },
    { icon: 'whatsapp', label: 'Send via WhatsApp', target: 'whatsapp' },
    { icon: 'telegram', label: 'Send via Telegram', target: 'telegram' },
    { icon: 'pinterest', label: 'Share on Pinterest', target: 'pinterest' },
  ]

  return (
    <section className={styles.actions} aria-label="Article actions">
      <div className={styles.actionsIntro}>
        <strong>Was this article useful?</strong>
        <span>
          {feedbackError ||
            (feedback ? 'Thanks for the feedback.' : 'Your feedback helps improve future notes.')}
        </span>
      </div>

      <div className={styles.feedbackButtons}>
        <button
          aria-pressed={feedback === 'helpful'}
          className={styles.feedbackPositive}
          disabled={isSubmitting}
          onClick={() => saveFeedback('helpful')}
          type="button"
        >
          <ActionIcon name="thumb-up" />
          Helpful
          <span className={styles.feedbackCount}>{counts.helpful}</span>
        </button>

        <button
          aria-pressed={feedback === 'not-helpful'}
          className={styles.feedbackNegative}
          disabled={isSubmitting}
          onClick={() => saveFeedback('not-helpful')}
          type="button"
        >
          <ActionIcon name="thumb-down" />
          Not helpful
          <span className={styles.feedbackCount}>{counts.notHelpful}</span>
        </button>
      </div>

      <div className={styles.shareMenu} ref={shareMenuRef}>
        <button
          aria-expanded={shareMenuOpen}
          aria-haspopup="menu"
          className={styles.shareMenuTrigger}
          onClick={() => setShareMenuOpen((current) => !current)}
          type="button"
        >
          <ActionIcon name="share" />
          Share article
          <ChevronDown
            aria-hidden="true"
            className={styles.shareChevron}
            size={15}
            strokeWidth={1.9}
          />
        </button>

        {shareMenuOpen ? (
          <div className={styles.shareDropdown} role="menu">
            <div className={styles.shareDropdownHeader}>
              <strong>Share article</strong>
              <span>Choose a destination</span>
            </div>

            <div className={styles.shareDropdownList}>
              {shareItems.map((item) => (
                <button
                  data-share-target={item.target}
                  key={item.target}
                  onClick={() => shareArticle(item.target)}
                  role="menuitem"
                  type="button"
                >
                  <BrandIcon name={item.icon} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.shareDropdownFooter}>
              <button onClick={copyLink} role="menuitem" type="button">
                <ActionIcon name="copy" />
                <span>{copied ? 'Link copied' : 'Copy link'}</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
