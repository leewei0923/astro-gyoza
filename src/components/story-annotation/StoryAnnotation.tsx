import React, { useState, useRef, useEffect, useCallback } from 'react'
import clsx from 'clsx'

export interface StorySectionProps {
  children: React.ReactNode
  className?: string
}

/** 一个段落容器，用于包裹故事的每个段落 */
export const StorySection: React.FC<StorySectionProps> = ({ children, className }) => {
  return <div className={clsx('markdown my-5', className)}>{children}</div>
}

export interface AnnProps {
  /** 划线文本的解读/注释内容 */
  note: React.ReactNode
  /** 划线颜色主题 */
  color?: 'amber' | 'rose' | 'sky' | 'emerald' | 'violet'
  children: React.ReactNode
}

const colorMap = {
  amber: {
    underline: 'decoration-amber-400/70 dark:decoration-amber-500/60',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-300 dark:border-amber-700',
    dot: 'bg-amber-400 dark:bg-amber-500',
    text: 'text-amber-900 dark:text-amber-100',
  },
  rose: {
    underline: 'decoration-rose-400/70 dark:decoration-rose-500/60',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-300 dark:border-rose-700',
    dot: 'bg-rose-400 dark:bg-rose-500',
    text: 'text-rose-900 dark:text-rose-100',
  },
  sky: {
    underline: 'decoration-sky-400/70 dark:decoration-sky-500/60',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-300 dark:border-sky-700',
    dot: 'bg-sky-400 dark:bg-sky-500',
    text: 'text-sky-900 dark:text-sky-100',
  },
  emerald: {
    underline: 'decoration-emerald-400/70 dark:decoration-emerald-500/60',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-300 dark:border-emerald-700',
    dot: 'bg-emerald-400 dark:bg-emerald-500',
    text: 'text-emerald-900 dark:text-emerald-100',
  },
  violet: {
    underline: 'decoration-violet-400/70 dark:decoration-violet-500/60',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-300 dark:border-violet-700',
    dot: 'bg-violet-400 dark:bg-violet-500',
    text: 'text-violet-900 dark:text-violet-100',
  },
}

/** 划线标注组件 —— PC端鼠标悬停显示，移动端点击切换 */
export const Ann: React.FC<AnnProps> = ({ note, color = 'amber', children }) => {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const colors = colorMap[color]

  const close = useCallback(() => setOpen(false), [])

  // 点击外部关闭（移动端）
  useEffect(() => {
    if (!open) return
    const handler = (e: TouchEvent) => {
      const target = e.target as Node
      if (wrapperRef.current?.contains(target)) return
      if (popoverRef.current?.contains(target)) return
      close()
    }
    document.addEventListener('touchstart', handler)
    return () => document.removeEventListener('touchstart', handler)
  }, [open, close])

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <span
      ref={wrapperRef}
      className="relative inline"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={clsx(
          'underline decoration-wavy decoration-2 cursor-pointer transition-all duration-200',
          'hover:opacity-80 active:opacity-70',
          colors.underline,
          open && 'opacity-90',
        )}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
      >
        {children}
      </span>

      {open && (
        <div
          ref={popoverRef}
          className={clsx(
            'absolute z-50 left-1/2 -translate-x-1/2 mt-3 w-[min(320px,80vw)]',
            'rounded-xl border shadow-lg p-4',
            'animate-fade-in',
            colors.bg,
            colors.border,
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 小三角箭头 */}
          <div
            className={clsx(
              'absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t',
              colors.bg,
              colors.border,
            )}
          />
          <div className={clsx('relative flex items-start gap-2.5', colors.text)}>
            <span className={clsx('mt-1.5 w-2 h-2 rounded-full shrink-0', colors.dot)} />
            <div className="text-sm leading-relaxed">{note}</div>
          </div>
        </div>
      )}
    </span>
  )
}

/** 故事段落标题 */
export interface StoryHeadingProps {
  children: React.ReactNode
  className?: string
}

export const StoryHeading: React.FC<StoryHeadingProps> = ({ children, className }) => {
  return (
    <h3
      className={clsx(
        'text-lg font-bold mt-10 mb-4 text-primary border-l-4 border-accent pl-3',
        className,
      )}
    >
      {children}
    </h3>
  )
}

/** 解读区块标签 */
export interface AnnTagProps {
  label: string
  color?: 'amber' | 'rose' | 'sky' | 'emerald' | 'violet'
}

export const AnnTag: React.FC<AnnTagProps> = ({ label, color = 'amber' }) => {
  const colors = colorMap[color]
  return (
    <span
      className={clsx(
        'inline-block text-xs font-semibold px-2 py-0.5 rounded-full mr-1',
        colors.bg,
        colors.text,
        colors.border,
        'border',
      )}
    >
      {label}
    </span>
  )
}
