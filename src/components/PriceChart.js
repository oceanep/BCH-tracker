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

const PriceChart = () => {
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
    <div className="chart-container">
      {
        !loading ?
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              width={500}
              height={300}
              data={displayPrices}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}`} domain={[0,500]} />
              <Tooltip formatter={(value, name) => [`$${value}`, 'USD']} />
              <Area type="monotone" dataKey="usd" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        :
          null
      }
      <div>
        <button onClick={() => timeframeClick(month_prices)}>Month</button>
        <button onClick={() => timeframeClick(week_prices)}>Week</button>
        <button onClick={() => timeframeClick(day_prices)}>Day</button>
      </div>
    </div>
  )
}

export default PriceChart
