import Head from 'next/head'
import {
  NextSeo,
  NextSeoProps,
  WebPageJsonLd,
  WebPageJsonLdProps,
} from 'next-seo'
import React from 'react'

type SeoSchema = {
  '@type'?: string
  '@context'?: string
  author?: string
  isPartOf?: string
  breadcrumb?: string
} & Partial<WebPageJsonLdProps>

interface SeoData {
  title?: string
  description?: string
  og_locale?: string
  og_title?: string
  og_description?: string
  og_site_name?: string
  og_type?: string
  robots?: string
  url?: string
  schema?: {
    '@graph'?: SeoSchema[]
  }
}

interface SeoProperties {
  data: SeoData
  url: string
  postType: string
}

const formatSeoData = (data: SeoData): NextSeoProps => {
  const {
    title,
    description,
    og_locale,
    og_title,
    og_description,
    og_site_name,
    og_type,
    robots,
    url,
  } = data

  return {
    title: title || og_title,
    description: description || og_description,
    canonical: url,
    robotsProps: {
      maxSnippet: robots?.['max-snippet'],
      maxImagePreview: robots?.['max-image-preview'],
      maxVideoPreview: robots?.['max-video-preview'],
    },
    openGraph: {
      type: og_type,
      locale: og_locale || '',
      url,
      title: title || og_title,
      description: description || og_description,
      site_name: og_site_name || '',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
  }
}

//structuredDatas: schema?.['@graph'] || [],

const siteUrl = process.env.siteUrl
const cmsBaseUrl = process.env.cmsBaseUrl

const formatUrlsInStructuredData = (data: SeoSchema): SeoSchema => {
  let result = JSON.stringify(data)
  let regex = new RegExp(cmsBaseUrl, 'g')

  result = result.replace(regex, siteUrl)

  return JSON.parse(result)
}

const renderStructuredData = (data: SeoSchema, index: number) => {
  const formattedData = formatUrlsInStructuredData(data)

  switch (data['@type']) {
    case 'WebSite':
      return (
        <Head key={`structured-data-${index}`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                ...formattedData,
                '@context': 'https://schema.org',
              }),
            }}
          />
        </Head>
      )
    case 'WebPage':
      delete formattedData.isPartOf
      delete formattedData.breadcrumb
      delete formattedData.author
      return (
        <WebPageJsonLd
          key={`structured-data-${index}`}
          {...(formattedData as WebPageJsonLdProps)}
        />
      )
    default:
      return ''
  }
}

const Seo: React.FC<SeoProperties> = ({ data = {}, url = '' }) => {
  const formattedSeoData = formatSeoData({ ...data, url })
  const structuredDatas = data.schema?.['@graph'] || []

  return (
    <>
      <NextSeo {...formattedSeoData} />
      {structuredDatas?.map((item, itemIndex) =>
        renderStructuredData(item, itemIndex)
      )}
    </>
  )
}

export default Seo
