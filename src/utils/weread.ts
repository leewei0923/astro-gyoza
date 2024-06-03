import { getCollection } from 'astro:content'
// 获取所有读书列表
async function getAllBooks() {
  const allPosts = await getCollection('books', ({ data }) => {
    return data
  })

  return allPosts
}

// 获取所有图书，最后阅读时间降序
export async function getSortedBooks() {
  const allBooks = await getAllBooks()

  return allBooks.sort((a, b) => {
    return b.data.lastReadDate.valueOf() - a.data.lastReadDate.valueOf()
  })
}

export async function getAllSummary() {
  const allBooks = await getSortedBooks()

  const list: {
    cover: string
    author: string
    progress: string
    lastReadDate: Date
    readingTime: string
    totalReadDay: number
    isbn: number
    id: string
    slug: string
  }[] = []

  allBooks.map((item) => {
    list.push({
      id: item.id,
      slug: item.slug,
      cover: item.data.cover,
      author: item.data.author,
      progress: item.data.progress,
      lastReadDate: item.data.lastReadDate,
      readingTime: item.data.readingTime,
      totalReadDay: item.data.totalReadDay,
      isbn: item.data.isbn,
    })
  })

  return list
}

// 获取所有图书分类
export async function getCatagories() {
  const allBooks = await getAllBooks()

  const catagoriesMap = new Map<string, number>()

  allBooks.forEach((item) => {
    if ('slug' in item && typeof item.slug == 'string') {
      const catagory = item.slug.split('/')[0]
      const curTagCount = catagoriesMap.get(catagory)
      if (typeof curTagCount == 'undefined') {
        catagoriesMap.set(catagory, 1)
      } else {
        catagoriesMap.set(catagory, curTagCount + 1)
      }
    }
  })

  const catagoriesList: { name: string; slug: string; count: number }[] = []

  Array.from(catagoriesMap.entries()).flatMap((item) => {
    catagoriesList.push({
      name: item[0],
      slug: '',
      count: item[1],
    })
  })

  return Array.from(catagoriesList)
}
