import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../type/hooks';
import { fetchArticles } from '../../store/articleSlice';
import AllArticles from '../AllArticles/AllArticles';
import Article from '../Article/Article';
import Layout from '../Layout/Layout';
import ArticlePage from '../ArticlePage/ArticlePage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import { setsIsLoggedIn } from '../../store/userSlice';
import Profile from '../Profile/Profile';

import classes from './App.module.scss';

function App() {
  const articlesData = useAppSelector((state) => state.article.articlesData);
  const currentPage: number = useAppSelector((state) => state.article.currentPage);

  console.log(articlesData);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('somethong from app');
      dispatch(setsIsLoggedIn());
    }
  }, []);

  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllArticles />} />
          <Route path="articles" element={<AllArticles />} />

          {/* <Route path={`articles?page=${currentPage}`} element={<AllArticles />} /> */}
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
