import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../type/hooks';
import Article from '../Article/Article';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { fetchSoloArticle } from '../../store/articleSlice';

const ArticlePage = () => {
  const articleLoading = useAppSelector((state) => state.article.articleLoading);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  React.useEffect(() => {
    if (slug) {
      dispatch(fetchSoloArticle(slug));
    }
  }, [slug]);

  return <>{articleLoading ? <LoadingIndicator /> : <Article />}</>;
};

export default ArticlePage;
