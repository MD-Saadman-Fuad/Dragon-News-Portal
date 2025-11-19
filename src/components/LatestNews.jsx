import React from 'react';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useLoaderData } from 'react-router';
const LatestNEws = () => {
  // const news = useLoaderData();

  // console.log('LatestNews loaded news:', news);

  const [breakingNews, setBreakingNews] = useState([]);

  // useEffect(() => {
  //     const filterNews = news.filter((news) => news.others.is_today_pick == true);
  //     setBreakingNews(filterNews);
  // }, [news]);

  useEffect(() => {
    fetch('/news.json')
      .then(res => res.json())
      .then(data => {
        console.log("OKKK??")
        console.log('Fetched news data:', data);
        const filterNews = data.filter((news) => news.others.is_today_pick == true);
        setBreakingNews(filterNews);
      });
  }, []);



  return (
    <div className='flex items-center gap-5 bg-base-200 p-3'>
      <h1 className='text-base-100 bg-secondary px-3 py-2'>Latest</h1>
      <Marquee className='flex gap-5' pauseOnHover={true} speed={50} gradient={false}>
        {
          breakingNews.map((newsItem) => (
            <p key={newsItem.id} className='font-semibold mr-5'>{newsItem.title}.  </p>
          ))
        }
      </Marquee>

    </div>
  );
};

export default LatestNEws;