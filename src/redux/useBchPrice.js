import { useReducer, createContext, useContext, useCallback, useMemo, useEffect } from 'react'

import api from './utils.js'


const ACTIONS = {
  LOADING: 'loading',
  PRICES_FETCHED: 'prices fetched',
  PRICE_FETCHED: 'price fetched',
  ERROR: 'error'
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'prices fetched':
      return { ...state, loading: false, month_prices: action.payload.month_prices, week_prices: action.payload.week_prices, day_prices: action.payload.day_prices, error: undefined };
    case 'price fetched':
      return { ...state, loading: false, current_price: action.payload, error: undefined}
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state
  }
}

const UseBchPriceContext = createContext()
const UseBchPriceDispatchContext = createContext()

export function useBchPriceState() {
  return useContext(UseBchPriceContext)
}

export function useBchPriceDispatch() {
  return useContext(UseBchPriceDispatchContext)
}

function UseBchPriceProvider ({children}) {

  const initialState = {
    month_prices: [],
    week_prices: [],
    day_prices: [],
    current_price: '',
    loading: true,
    error: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const monthDays = useMemo(() => {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  },[])

  const buildGraphData = (arr) => {
    const mapped = arr.map(price => ({
      date: price[0].split('T')[0],
      usd: parseFloat(price[1] / 100).toFixed(2),
      uv: price[1] /100
    }))
    return mapped
  }

  const getPrices = useCallback( async () => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await api.getPrices()
      const month_split_res = res.data.slice(0, monthDays)
      const month_prices = buildGraphData(month_split_res)
      const week_split_res = res.data.slice(0, 7)
      const week_prices = buildGraphData(week_split_res)
      const day_split_res = res.data.slice(0,2)
      const day_prices = buildGraphData(day_split_res)
      dispatch({ payload: { month_prices, week_prices, day_prices }, type: ACTIONS.PRICES_FETCHED })
    } catch (err){
      console.log(err)
      dispatch({ payload: 'Cannot Fetch Prices', type: ACTIONS.ERROR })
    }
  }, [monthDays])

  const getCurrentPrice = useCallback( async () => {
    try {
      const res = await api.getCurrentPrice()
      dispatch({ payload: res.data.price, type: ACTIONS.PRICE_FETCHED})
    } catch (err){
      console.log(err)
      dispatch({ payload: 'Cannot Fetch Current Price', type: ACTIONS.ERROR })
    }
  }, [])


  useEffect(() => {
    getPrices()
  }, [getPrices])

  return (
    <UseBchPriceContext.Provider value={state}>
      <UseBchPriceDispatchContext.Provider value={{ getCurrentPrice }}>
        {children}
      </UseBchPriceDispatchContext.Provider>
    </UseBchPriceContext.Provider>
  )
}

export default UseBchPriceProvider
