import { useState, useCallback } from 'react'

import { useBchNewsState } from '../redux/useBchNews'

const NewsFeed = () => {
  const { news, loading, error } = useBchNewsState()

  const htmlDecode = (input, element) => {
    let e = document.createElement(element);
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  }

  const renderArticle = useCallback(() => {
    return (
      news.map( (item, i) => {
        const title = htmlDecode(decodeURIComponent(item.children[0]['value']), 'span')
        const link = item.children[1]['value']
        const author = item.children[2]['value'].split('>')[0]
        const date = item.children[3]['value'].split('+')[0]
        const thumbnail_obj = item.children.find( child => child.name == 'bnmedia:post-thumbnail')
        const thumbnail = thumbnail_obj.children[0]['value']
        const img_style = {
          backgroundImage: `url(${thumbnail})`,
          backgroundPostition: 'center',
          backgroundSize: 'cover',
          width: '100px',
          height: '100px'
        }
        console.log(thumbnail)
        return (
          <div className="article-container" key={title + i}>
            <div>{title}</div>
            <div><a href={link} target="_blank" >Full Article</a></div>
            <div>{author}</div>
            <div>{date}</div>
            <div style={img_style} />
          </div>
        )
      })
    )
  }, [news])

  return (
    <div>
      {
        !loading ?
          renderArticle()
        :
          null
      }
    </div>
  )
}

export default NewsFeed
