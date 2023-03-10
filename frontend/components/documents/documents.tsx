/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames'
import React, { useState } from 'react'

import Grid from '~/components/grid'
import Link from '~/components/link'
import ArrowDown from '~/icons/arrow-accordion-down.svg'
import Download from '~/icons/download.svg'

interface Properties {
  title: string
  description: string
  documents: any
}

const Documents: React.FC<Properties> = ({ title, description, documents }) => {
  const [selected, setSelected] = useState(0)

  const toggle = (index) => {
    if (selected === index) {
      return setSelected(0)
    }
    setSelected(index)
  }

  return (
    <div className="bg-institucionalLight py-20">
      <Grid className="container">
        <div className="md:col-span-5">
          <h2 className="text-5xl">{title}</h2>
          <p className="mt-6">{description}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ul>
            {documents &&
              documents.map((item, index) => (
                <li
                  className={classNames('py-8 rounded-[24px]', {
                    'bg-white': selected == index,
                  })}
                  onClick={() => toggle(index)}
                  key={`item-${index}`}
                >
                  <div className="h-[76px] border-b-8 border-white">
                    <div className="flex px-8 items-center">
                      <span className="text-3xl">{item['shop-city']}</span>
                      <ArrowDown
                        className={classNames('w-11 h-11 ml-auto', {
                          'rotate-180': selected == index,
                        })}
                      />
                    </div>
                  </div>
                  <div
                    className={classNames('flex row w-full flex-wrap px-8', {
                      hidden: selected != index,
                    })}
                  >
                    <p className="text-3xl block">{item['shop-name']}</p>
                    <p className="text-base mt-4 block">{item['shop-cnpj']}</p>
                    <ul className="mt-8">
                      {item['shop-documents'] &&
                        item['shop-documents'].map(
                          (itemDocument, indexDocument) => (
                            <li
                              className="flex mb-8 items-center"
                              key={`item-${indexDocument}`}
                            >
                              <span className="text-xl pr-3">
                                {itemDocument['document-name']}
                              </span>
                              <Link
                                isExternal={true}
                                href={itemDocument['document-file']}
                                className="bg-darkness text-white h-[58px] px-8 text-base rounded-[100px] flex items-center"
                              >
                                Download
                                <Download className="ml-2" />
                              </Link>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Grid>
    </div>
  )
}

export default Documents
