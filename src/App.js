import logo from './logo.svg';
import './App.css';

import UseBchNewsProvider from './redux/useBchNews'
import UseBchPriceProvider from './redux/useBchPrice'

import NewsFeed from './components/NewsFeed'
import PriceChart from './components/PriceChart'

function App() {
  return (
    <div className="App">
      <UseBchNewsProvider>
        <NewsFeed/>
      </UseBchNewsProvider>
      <UseBchPriceProvider>
        <PriceChart/>
      </UseBchPriceProvider>
    </div>
  );
}

export default App;
