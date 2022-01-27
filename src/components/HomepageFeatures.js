import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/Logo.svg').default,
    description: (
      <>
        The WebsiteGenerator makes it easy to create a website with a few clicks. 
      </>
    ),
  },
  {
    title: 'Powerful tool',
    Svg: require('../../static/img/Logo.svg').default,
    description: (
      <>
        The WebsiteGenerator lets you set your pronouns, your name, a description, an image, some cards and social media icons.
      </>
    ),
  },
  {
    title: 'Open Source',
    Svg: require('../../static/img/Logo.svg').default,
    description: (
      <>
        The WebsiteGenerator is open source and you can contribute to it if you found a bug or want to implement your own idea.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
