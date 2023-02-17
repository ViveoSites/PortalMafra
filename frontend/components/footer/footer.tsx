import React from 'react'

import Grid from '~/components/grid'

const Footer = () => {
  return (
    <footer>
      <Grid className="container py-20 bg-black bg-opacity-20">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <p className="mt-4">&copy; Copyright FutureBrand</p>
        </div>
      </Grid>
    </footer>
  )
}

export default Footer
