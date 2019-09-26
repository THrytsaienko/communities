import React from 'react';
import '../emptyPage.scss';
import noResultsImage from '../../assets/images/no-comments.png';

const CommentsPage = () => (
    <div className='empty-page'>
        <p className='empty-page__title'>Here you can see all your comments, but now, unfortunately, you have no comments</p>
        <div className='empty-page__image-block'>
            <img className='empty-page__image' src={noResultsImage} alt="No Results"/>
        </div>
    </div>
);

export default CommentsPage;
