import { useCallback } from 'react'

import { useBchNewsState } from '../redux/useBchNews'

const NewsFeed = ({glow}) => {
  const { news, loading } = useBchNewsState()



  const htmlDecode = (input, element) => {
    let e = document.createElement(element);
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  const regexCheck = useCallback((string) => {
    const regex1 = /(%20)/
    const regex2 = /(&#\d*)/
    return regex1.test(string) || regex2.test(string)
  }, [])

  const renderArticle = useCallback(() => {
    return (
      news.map( (item, i) => {
        //RSS feed titles come in inconsistently, some require multiple decodes
        //This will break ones that come in as normal strings
        //regex check before deciding how to handle
        const title = regexCheck(item.children[0]['value']) ? htmlDecode(decodeURIComponent(item.children[0]['value']), 'span') : item.children[0]['value']
        const link = item.children[1]['value']
        const author = item.children[2]['value'].split('>')[0]
        const date = item.children[3]['value'].split('+')[0]
        const thumbnail_obj = item.children.find( child => child.name === 'bnmedia:post-thumbnail')
        const thumbnail = thumbnail_obj?.children[0]['value'] || ''
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
      </div>
      <div className="feed-footer"/>
    </div>
  )
}

NewsFeed.defaultProps = {
  glow: false
}

export default NewsFeed
