import React from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../type/hooks';
import ShortArticle from '../ShortArticle/ShortArticle';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { fetchArticles } from '../../store/articleSlice';

import classes from './AllArticles.module.scss';

const AllArticles = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const searchPage = Number(searchParams.get('page')) || 1;

  const articlesData = useAppSelector((state) => state.article.articlesData);
  const loading: boolean = useAppSelector((state) => state.article.loading);

  const total: number = useAppSelector((state) => state.article.total);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setsearchParams({ page: searchPage.toString() || '1' });
    const offset = searchPage ? searchPage * 5 - 5 : 1;
    dispatch(fetchArticles(offset));
  }, [searchPage]);

  const handlePagignationChange = (page: any) => {
    setsearchParams({ page: page });
  };

  return loading ? (
    <LoadingIndicator />
  ) : (
    <>
      <ul className={classes.list}>
        {articlesData.map((item: any, index: number) => (
          <li key={index}>
            <ShortArticle article={item} />
          </li>
        ))}
      </ul>

      <Pagination
        total={total}
        style={{ textAlign: 'center', marginBottom: '15px' }}
        pageSize={5}
        showSizeChanger={false}
        onChange={(page) => handlePagignationChange(page)}
        current={searchPage}
      />
    </>
  );
};

export default AllArticles;
