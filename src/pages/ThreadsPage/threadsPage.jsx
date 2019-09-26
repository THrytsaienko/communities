import React from 'react';
import '../emptyPage.scss';
import noResultsImage from '../../assets/images/no-threads.png';

const ThreadsPage = () => (
    <div className='empty-page'>
        <p className='empty-page__title'>Here you can see all your threads, but now, unfortunately, you have no threads</p>
        <div className='empty-page__image-block'>
            <img className='empty-page__image' src={noResultsImage} alt="No Results"/>
        </div>
    </div>
);

export default ThreadsPage;
