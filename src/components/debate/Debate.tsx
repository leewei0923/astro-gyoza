import React from 'react'
import clsx from 'clsx'

export interface DebateProps {
  children: React.ReactNode
  className?: string
}

export const Debate: React.FC<DebateProps> = ({ children, className }) => {
  return <div className={clsx('flex flex-col gap-6 my-8', className)}>{children}</div>
}

export interface DebateMessageProps {
  speaker: string
  avatar?: string
  align?: 'left' | 'right'
  children: React.ReactNode
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray'
}

const SpeakerAvatar: React.FC<{ speaker: string; avatar?: string; className?: string }> = ({
  speaker,
  avatar,
  className,
}) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={speaker}
        className={clsx('w-10 h-10 rounded-full object-cover border border-primary', className)}
      />
    )
  }

  // Generate initials
  const initials = speaker.slice(0, 2).toUpperCase()
  return (
    <div
      className={clsx(
        'w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border border-primary shrink-0',
        'bg-card text-primary',
        className,
      )}
    >
      {initials}
    </div>
  )
}

export const DebateMessage: React.FC<DebateMessageProps> = ({
  speaker,
  avatar,
  align,
  children,
  color,
}) => {
  // Determine alignment and color based on speaker if not provided
  const isUser = speaker.toLowerCase() === 'user' || speaker.toLowerCase() === 'me'
  const effectiveAlign = align || (isUser ? 'right' : 'left')

  let effectiveColor = color
  if (!effectiveColor) {
    const lowerSpeaker = speaker.toLowerCase()
    if (lowerSpeaker.includes('gemini')) effectiveColor = 'blue'
    else if (lowerSpeaker.includes('chatgpt') || lowerSpeaker.includes('gpt'))
      effectiveColor = 'green'
    else if (lowerSpeaker.includes('doubao')) effectiveColor = 'orange'
    else if (isUser) effectiveColor = 'gray'
    else effectiveColor = 'purple'
  }

  const bubbleClasses = clsx(
    'relative px-4 py-3 rounded-2xl max-w-[100%] sm:max-w-[85%] shadow-sm',
    effectiveAlign === 'left' ? 'rounded-tl-none' : 'rounded-tr-none',
    {
      'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100': effectiveColor === 'blue',
      'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100':
        effectiveColor === 'green',
      'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100':
        effectiveColor === 'orange',
      'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100': effectiveColor === 'red',
      'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100':
        effectiveColor === 'purple',
      'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100': effectiveColor === 'gray',
    },
  )

  return (
    <div
      className={clsx(
        'flex gap-3',
        effectiveAlign === 'right' ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <SpeakerAvatar speaker={speaker} avatar={avatar} className="hidden sm:flex" />
      <div className={clsx('flex flex-col min-w-0 flex-1', effectiveAlign === 'right' ? 'items-end' : 'items-start')}>
        <span className="text-xs text-secondary mb-1 px-1">{speaker}</span>
        <div className={bubbleClasses}>
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export interface DebateDividerProps {
  children: React.ReactNode
}

export const DebateDivider: React.FC<DebateDividerProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-primary/20"></div>
      </div>
      <div className="relative z-10 bg-primary px-4 text-xs uppercase tracking-wider text-primary-content rounded-full py-1 font-bold">
        {children}
      </div>
    </div>
  )
}
