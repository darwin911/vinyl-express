import React from 'react';
import github from '../assets/github.svg';
import linkedIn from '../assets/linkedin.svg';

const Footer = () => {
  return (
    <footer>
      <a
        href='https://github.com/darwin911/vinyl-express'
        target='_blank'
        rel='noopener noreferrer'>
        <img className='github' src={github} alt='github' />
      </a>
      <a
        href='https://www.linkedin.com/in/darwinpsmith/'
        target='_blank'
        rel='noopener noreferrer'>
        <img className='linkedin' src={linkedIn} alt='linkedIn' />
      </a>
      <p>
        &copy;{' '}
        <a
          href='http://www.darwinpsmith.com'
          target='_blank'
          rel='noopener noreferrer'>
          Darwin Smith 2019
        </a>{' '}
        – General Assembly
      </p>
    </footer>
  );
};

export default Footer;
