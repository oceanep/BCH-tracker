import { useCallback } from 'react'

import { useBchNewsState } from '../redux/useBchNews'

const NewsFeed = ({glow}) => {
  const { news, loading, error } = useBchNewsState()



  const htmlDecode = (input, element) => {
    let e = document.createElement(element);
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  const regexCheck = useCallback((string) => {
    console.log('checking news feed: ', string)
    const regex1 = /(%20)/
    const regex2 = /(&#\d*)/
    return regex1.test(string) || regex2.test(string)
  }, [])

  const renderArticle = useCallback(() => {
    console.log('full news feed: ', news)
    return (
      news.map( (item, i) => {
        //RSS feed titles come in inconsistently, some require multiple decodes
        //This will break ones that come in as normal strings
        //regex check before deciding how to handle
        const title = regexCheck(item.title) ? htmlDecode(decodeURIComponent(item.title), 'span') : item.title
        const link = item.link
        const author = item['dc:creator']
        const date = item.pubDate.split('+')[0]
        const thumbnail = item['bnmedia:post-thumbnail']['bnmedia:url']
        const img_style = {
          backgroundImage: `url(${thumbnail})`
        }
        console.log(thumbnail)
        return (
          <div className="article-container" key={title + i}>
            <div className='article-img' style={img_style} />
            <div className="article-content">
              <div className='article-field'><strong>{title}</strong></div>
              <div className='article-field'>{author}</div>
              <div className='article-field'>{date}</div>
              <div className='article-field'><a href={link} target="_blank" rel="noreferrer">Full Article</a></div>
            </div>
          </div>
        )
      })
    )
  }, [news, regexCheck])

  return (
    <div className="feed-container" style={{ boxShadow: glow ? ' 0px 0px 25px 5px rgba(249,75,72,0.4)' : ''}}>
      <div className="feed-header">News Feed</div>
      <div className='articles-container'>
        {
          !loading ?
            renderArticle()
          :
            null
        }
        {
          !error ?
            null
          :
            <span>Error Loading Article Feed</span>
        }
      </div>
      <div className="feed-footer"/>
    </div>
  )
}

NewsFeed.defaultProps = {
  glow: false
}

export default NewsFeed
