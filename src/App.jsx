import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error from 'layouts/Pages/Error/Error';
import Placeholder from 'layouts/Pages/Placeholder/Placeholder';

import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import Catalog from './layouts/Pages/Catalog/Catalog';
import Home from './layouts/Pages/Home/Home';
import Movie from './layouts/Pages/Movie/Movie';
import Profile from './layouts/Pages/Profile/Profile';
import Registration from './layouts/Pages/Registration/Registration';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import ScrollToTop from './utils/ScrollToTop';

import module from './App.module.scss';

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className={module.layout}>
      <Router basename="/frontend-cinema-app">
        <ScrollToTop />
        <Header t={t} />
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/catalog" element={<Catalog t={t} />} />
          <Route path="/movie/:id" element={<Movie t={t} />} />
          <Route path="/registration" element={<Registration t={t} />} />
          <Route path="/profile" element={<Profile t={t} />} />
          <Route path="/placeholder" element={<Placeholder t={t} />} />
          <Route path="*" element={<Error t={t} />} />
        </Routes>
        <Footer t={t} />
      </Router>
    </div>
  );
};

export default App;
