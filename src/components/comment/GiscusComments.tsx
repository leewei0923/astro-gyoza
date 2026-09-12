import Giscus, { type Repo, type Theme } from '@giscus/react'
import { useAtomValue } from 'jotai'
import { themeAtom } from '@/store/theme'

interface Props {
  repo: string
  repoId: string
  category: string
  categoryId: string
  term: string
}

export function GiscusComments({ repo, repoId, category, categoryId, term }: Props) {
  const siteTheme = useAtomValue(themeAtom)
  const theme: Theme = siteTheme === 'system' ? 'preferred_color_scheme' : siteTheme

  return (
    <Giscus
      id="comments"
      repo={repo as Repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
