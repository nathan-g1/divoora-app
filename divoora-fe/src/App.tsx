import LandingPage from './views/landingPage';
import SearchPage from './views/searchPage';
import { Routes, Route } from 'react-router-dom';
import ResultPage from './views/resultPage';
import { atom } from 'recoil';
import DetailsPage from './views/detailsPage';

export const queryAtom = atom({
  key: 'query',
  default: '',
});

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/result" element={<ResultPage/>} />
        <Route path="/detail" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
