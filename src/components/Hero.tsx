// components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import styles from '../styling/Hero.module.css';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
        <h1 className={styles['hero-title']}>Sole Market</h1>
      </div>
  );
};

export default Hero;
