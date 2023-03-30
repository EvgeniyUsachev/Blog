import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom';
import moment from 'moment';

import { fetchSoloArticle } from '../../store/articleSlice';
import { useAppDispatch, useAppSelector } from '../type/hooks';

import classes from './Article.module.scss';

const Article = () => {
  const dispatch = useAppDispatch();
  //   const { slug } = useParams();

  //   React.useEffect(() => {
  //     if (slug) {
  //       dispatch(fetchSoloArticle(slug));
  //     }
  //   }, [slug]);

  function setDate(date: string) {
    if (date) {
      const format = moment(date).format('MMMM D, YYYY');
      return format;
    }
  }

  const currentArticle = useAppSelector((state) => state.article.currentArticle);
  console.log('from article', currentArticle);

  return (
    <>
      {/* <p>{currentArticle.slug}</p> */}
      <div className={classes.Article}>
        <div className={classes.wrapper}>
          <div className={classes.title}>
            <p className={classes.title__text}>{currentArticle?.title} </p>
            <label>
              <input type="checkbox" className={classes.like} />
              <span>{currentArticle?.favoritesCount}</span>
            </label>
          </div>
          <ul className={classes.tag__list}>
            {currentArticle?.tagList?.map((tag: string | number, index: number) => {
              return (
                <li key={index}>
                  <button className={classes.tag}>{tag}</button>
                </li>
              );
            })}
          </ul>

          <p className={classes.description}>{currentArticle?.description}</p>
          <div>
            <ReactMarkdown>{currentArticle?.body}</ReactMarkdown>
          </div>
        </div>
        <div className={classes.user}>
          <div className={classes.user__wrapper}>
            <p className={classes.user__name}>{currentArticle?.author?.username}</p>
            <p className={classes.user__date}>{setDate(currentArticle?.updatedAt)}</p>
          </div>
          <img className={classes.user__avatar} src={currentArticle?.author?.image} alt="user_avatar" />
        </div>
      </div>
    </>
  );
};

export default Article;
