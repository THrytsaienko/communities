import React from 'react';
import menuList from './menuList';
import './menu.scss';

const Menu = () => (
    <nav className='menu'>
        {
            menuList.map(item => (
                <div className='menu__item' key={item.title}>
                    <a className='menu__link' href={item.link}>{item.title}</a>
                </div>
                )
           )
        }
    </nav>
);

export default Menu;
