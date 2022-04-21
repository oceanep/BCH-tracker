import { useState, useEffect, useCallback } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from 'recharts'

import { useBchPriceState } from '../redux/useBchPrice'

const PriceChart = ({glow}) => {
  const { month_prices, week_prices, day_prices, loading, error } = useBchPriceState()

  const [displayPrices, setDisplayPrices] = useState(month_prices)

  useEffect(() => {
    console.log('month prices: ', month_prices)
    console.log('week prices: ', week_prices)
    console.log('day prices: ', day_prices)
    if (!displayPrices.length > 0) setDisplayPrices(month_prices)
  }, [month_prices, week_prices, day_prices])

  const timeframeClick = useCallback((time_frame) => {
    setDisplayPrices(time_frame)
  }, [month_prices, week_prices, day_prices, setDisplayPrices])

  return (
    <div className="chart-container" style={{ boxShadow: glow ? ' 0px 0px 25px 5px rgba(249,75,72,0.4)' : ''}}>
      {
        !loading ?
          <ResponsiveContainer width="99%" height={250}>
            <AreaChart
              width='99%'
              height={250}
              data={displayPrices}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}`} domain={[0,500]} />
              <Tooltip formatter={(value, name) => [`$${value}`, 'USD']} />
              <Area type="monotone" label="date" dataKey="usd" stroke="#4d4d4d" fill="#141414" />
            </AreaChart>
          </ResponsiveContainer>
        :
          null
      }
      <div className='buttons-container'>
        <button className='chart-button' onClick={() => timeframeClick(month_prices)}>Month</button>
        <button className='chart-button' onClick={() => timeframeClick(week_prices)}>Week</button>
        <button className='chart-button' onClick={() => timeframeClick(day_prices)}>Day</button>
      </div>
    </div>
  )
}

PriceChart.defaultProps = {
  glow: false
}
export default PriceChart
