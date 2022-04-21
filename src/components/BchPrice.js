import { useEffect } from 'react'
import { useBchPriceState, useBchPriceDispatch } from '../redux/useBchPrice'

const BchPrice = ({glow}) => {
  const { current_price, loading, error } = useBchPriceState()
  const { getCurrentPrice } = useBchPriceDispatch()

  useEffect(() => {
    getCurrentPrice()
  }, [getCurrentPrice])

  return (
    <div className='price-container' style={{ boxShadow: glow ? ' 0px 0px 25px 5px rgba(249,75,72,0.4)' : ''}}>
      <div className='price-label'>Current BCH Price</div>
      <div className='price'><strong>
      {
        current_price != '' ?
          `$${parseFloat(current_price/100).toFixed(2)}`

        :
          'loading...'
      }
      </strong></div>
    </div>
  )
}

BchPrice.defaultProps = {
  glow: false
}

export default BchPrice
