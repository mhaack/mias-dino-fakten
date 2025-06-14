import { getCollection } from 'astro:content'
import type { BlogPostData } from '@/types/config'
import I18nKey from '@i18n/i18nKey'
import { i18n } from '@i18n/translation'

export async function getSortedPosts(): Promise<
  { body: string; data: BlogPostData; slug: string }[]
> {
  const allBlogPosts = (await getCollection('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })) as unknown as { body: string; data: BlogPostData; slug: string }[]

  const sorted = allBlogPosts.sort(
    (a: { data: BlogPostData }, b: { data: BlogPostData }) => {
      const dateA = new Date(a.data.published)
      const dateB = new Date(b.data.published)
      return dateA > dateB ? -1 : 1
    },
  )

  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug
    sorted[i].data.nextTitle = sorted[i - 1].data.title
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug
    sorted[i].data.prevTitle = sorted[i + 1].data.title
  }

  return sorted
}

export async function getAlphabeticalPosts(): Promise<
  { body: string; data: BlogPostData; slug: string }[]
> {
  const allBlogPosts = (await getCollection('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })) as unknown as { body: string; data: BlogPostData; slug: string }[]

  const sorted = allBlogPosts.sort(
    (a: { data: BlogPostData }, b: { data: BlogPostData }) => {
      return a.data.title
        .toLowerCase()
        .localeCompare(b.data.title.toLowerCase())
    },
  )

  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug
    sorted[i].data.nextTitle = sorted[i - 1].data.title
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    sorted[i].data.prevSlug = sorted[i + 1].slug
    sorted[i].data.prevTitle = sorted[i + 1].data.title
  }

  return sorted
}

export async function getDinosOfTheMonth(): Promise<
  { month: Date; data: BlogPostData; slug: string; id: string }[]
> {
  const allDinos = (await getCollection('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })) as unknown as {
    body: string
    data: BlogPostData
    slug: string
    id: string
  }[]

  const dinosOfTheMonth = new Array()
  for (const post of allDinos) {
    for (const date of post.data.dotm || []) {
      dinosOfTheMonth.push({
        month: date.month,
        data: post.data,
        slug: post.slug,
        id: post.id,
      })
    }
  }

  const sorted = dinosOfTheMonth.sort(
    (a: { month: Date }, b: { month: Date }) => {
      return a.month > b.month ? -1 : 1
    },
  )
  return sorted
}

export type Tag = {
  name: string
  slug: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const allBlogPosts = await getCollection<'dinos'>('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const countMap: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { tags: string[] } }) => {
    post.data.tags.map((tag: string) => {
      if (!countMap[tag]) countMap[tag] = 0
      countMap[tag]++
    })
  })

  // sort tags
  const keys: string[] = Object.keys(countMap).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  return keys.map(key => ({
    name: key,
    slug: key.toLowerCase(),
    count: countMap[key],
  }))
}

export type Category = {
  name: string
  slug: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const allBlogPosts = await getCollection<'dinos'>('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })
  const count: { [key: string]: number } = {}
  allBlogPosts.map((post: { data: { category: string | number } }) => {
    if (!post.data.category) {
      const ucKey = i18n(I18nKey.uncategorized)
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1
      return
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1
  })

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })

  const ret: Category[] = []
  for (const c of lst) {
    ret.push({ name: c, slug: c.toLowerCase(), count: count[c] })
  }
  return ret
}

export type DinoCountry = {
  iso: string
  dinos: {
    name: string
    slug: string
  }[]
}

export async function getDinoCountryList(): Promise<Map<string, DinoCountry>> {
  const allDinos = await getCollection<'dinos'>('dinos', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const countryMap = new Map()

  for (const dino of allDinos) {
    const countries = dino.data.locations

    for (const iso of countries) {
      let country = countryMap.get(iso)
      if (!country) {
        country = { dinos: [] }
      }
      country.dinos.push({ name: dino.data.title, slug: dino.slug })
      countryMap.set(iso, country)
    }
  }
  return countryMap
}
