import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import Catalog from './layouts/Pages/Catalog/Catalog';
import Home from './layouts/Pages/Home/Home';
import Movie from './layouts/Pages/Movie/Movie';
import Profile from './layouts/Pages/Profile/Profile';
import Registration from './layouts/Pages/Registration/Registration';
import ScrollToTop from './utils/ScrollToTop';

import module from './App.module.scss';
import Placeholder from 'layouts/Pages/Placeholder/Placeholder';
import Error from 'layouts/Pages/Error/Error';

const App = () => {
  const { t } = useTranslation();
  return (
    <div className={module.layout}>
      <Router>
        <ScrollToTop />
        <Header t={t} />
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/catalog" element={<Catalog t={t} />} />
          <Route path="/movie/:id" element={<Movie t={t} />} />
          <Route path="/registration" element={<Registration t={t} />} />
          <Route path="/profile" element={<Profile t={t} />} />
          <Route path="/placeholder" element={<Placeholder t={t} />} />
          <Route path="*" element={<Error t={t} />}/>
        </Routes>
        <Footer t={t} />
      </Router>
    </div>
  );
};

export default App;
