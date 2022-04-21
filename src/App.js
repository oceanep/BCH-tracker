import './App.scss';

import UseBchNewsProvider from './redux/useBchNews'
import UseBchPriceProvider from './redux/useBchPrice'

import NewsFeed from './components/NewsFeed'
import PriceChart from './components/PriceChart'
import BchPrice from './components/BchPrice'

function App() {
  return (
    <div className="App-container">
      <UseBchPriceProvider>
        <div className="container">
          <BchPrice glow/>
          <PriceChart glow/>
        </div>
      </UseBchPriceProvider>
      <UseBchNewsProvider>
        <NewsFeed glow/>
      </UseBchNewsProvider>
    </div>
  );
}

export default App;
