import React from 'react'

import { default as CallToActionBanner } from '~/components/call-to-action-banner'
import { default as CallToActionBox } from '~/components/call-to-action-box'
import { default as CardsList } from '~/components/cards-list'
import { default as ContactForm } from '~/components/contact-form'
import { default as CustomerCare } from '~/components/customer-care'
import { default as Documents } from '~/components/documents'
import { default as FooterHighlight } from '~/components/footer-highlight'
import { default as GalleryWithCaptions } from '~/components/gallery-with-captions'
import { default as Diferentials } from '~/components/icon-cards-list'
import { default as IntegratedTech } from '~/components/integrated-tech'
import { default as InternalHighlights } from '~/components/internal-highlights'
import { default as Highlights } from '~/components/main-highlight'
import { default as OurAddresses } from '~/components/our-addresses'
import { default as OurBrands } from '~/components/our-brands'
import { default as OurLocations } from '~/components/our-locations'
import { default as ProductCategories } from '~/components/product-categories'
import { default as ServiceChannels } from '~/components/service-channels'
import { default as TextWithImage } from '~/components/text-with-image'
import { default as TextWithTitle } from '~/components/text-with-title'
import { default as Video } from '~/components/video'
import { default as VmiForm } from '~/components/vmi-form'
import { camelize } from '~/utils/global'

const Blocks = {
  CallToActionBox,
  CardsList,
  CallToActionBanner,
  ContactForm,
  CustomerCare,
  Documents,
  FooterHighlight,
  GalleryWithCaptions,
  TextWithTitle,
  Diferentials,
  TextWithImage,
  InternalHighlights,
  Highlights,
  OurAddresses,
  OurBrands,
  OurLocations,
  ProductCategories,
  IntegratedTech,
  ServiceChannels,
  Video,
  VmiForm,
}

const RenderBlocks = ({ blocks }) => {
  return blocks.map(({ blockName, ...component }, componentIndex) => {
    const blockNameFormatted = camelize(blockName.replace('acf/', ''))

    const componentName =
      blockNameFormatted.charAt(0).toUpperCase() + blockNameFormatted.slice(1)

    const Block = Blocks[componentName]

    if (!Block) {
      throw new Error(`Block ${componentName} not found`)
    }

    return <Block key={`block-template-${componentIndex}`} {...component} />
  })
}

export default RenderBlocks
