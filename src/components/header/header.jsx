import React from 'react';
import './header.scss';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Menu from '../menu/menu';

const Header = () => (
    <div className='header'>
        <div className='header__container'>
            <a href="/" className='header__link'>
                <div className='header__image-block'>
                    <Logo className='header__logo' />
                </div>
            </a>
            <Menu></Menu>
        </div>
    </div>
);

export default Header;
