import React from 'react'

import Form from '~/components/form'
import Grid from '~/components/grid'

const Newsletter = () => {
  return (
    <Grid className="newsletter container py-20 bg-black bg-opacity-80 text-white">
      <div className="col-span-12 lg:col-span-10 lg:col-start-2">
        <h3 className="heading-sm mb-10">
          Olá, eu sou uma newsletter.
          <br />
          Me preencha ;)
        </h3>
        <Form formId="5" />
      </div>
    </Grid>
  )
}

export default Newsletter
