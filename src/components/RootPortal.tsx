import { createPortal } from 'react-dom'

export function RootPortal({
  to,
  children,
}: {
  to?: HTMLElement
  children: React.ReactNode
}) {
  if (typeof document === 'undefined') return null

  return createPortal(children, to ?? document.body)
}
