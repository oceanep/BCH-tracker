import axios from 'axios'

const headers = {
    "Content-type": "application/json"
}

const api = {
  async getNews() {
    try {
      const res = await axios.get('https://news.bitcoin.com/feed/', {
		      "Content-Type": "application/xml; charset=utf-8"
	       })
      return res
    } catch (err){
      console.log(err)
    }
  },
  async getPrices() {
    try {
      const res = await axios.get('https://index-api.bitcoin.com/api/v0/cash/history', headers)
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

export default api
