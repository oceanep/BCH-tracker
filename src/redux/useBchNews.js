import { useReducer, createContext, useContext, useCallback, useEffect } from 'react'
import { XMLParser } from 'fast-xml-parser'

import api from './utils.js'


const ACTIONS = {
  LOADING: 'loading',
  FETCHED: 'fetched',
  ERROR: 'error'
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'fetched':
      return { ...state, loading: false, news: action.payload, error: undefined };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state
  }
}

const UseBchNewsContext = createContext()

export function useBchNewsState() {
  return useContext(UseBchNewsContext)
}

function UseBchNewsProvider ({children}) {

  const initialState = {
    news: [],
    loading: true,
    error: undefined
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const parseXML = useCallback( async (input) => {
    const parser = new XMLParser()
    const xml = parser.parse(input)
    // const articles = xml.getElementsByTagName('item').slice(0, 4)
    return xml.rss.channel.item.slice(0,4)
  }, [])

  const getNews = useCallback( async () => {
    dispatch({type: ACTIONS.LOADING})
    try {
      const res = await api.getNews()
      const newNews = await parseXML(res.data)
      console.log('newNews: ', newNews)
      dispatch({ payload: newNews, type: ACTIONS.FETCHED })
    } catch (err){
      console.log(err)
      dispatch({ payload: 'Cannot Fetch News', type: ACTIONS.ERROR })
    }
  }, [parseXML])

  useEffect(() => {
    getNews()
  }, [getNews])

  return (
    <UseBchNewsContext.Provider value={state}>
      {children}
    </UseBchNewsContext.Provider>
  )
}

export default UseBchNewsProvider
