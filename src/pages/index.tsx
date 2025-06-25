import React, {useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import AOS from 'aos';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="/img/logo.svg" alt="logo" width="150" />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

const projects = [
  {
    title: 'pytest-spec',
    description:
      'A pytest plugin that transforms test output into a human-readable specification format. It enhances readability by grouping tests, coloring outcomes, and cleaning up test names.',
    link: '/docs/pytest-spec/about',
    image: '/img/pytest-spec.gif',
  },
  {
    title: 'Tilo',
    description:
      'TILO is a Python-based Tiling Windows Manager for Windows OS. It offers a convenient way to manage windows using only your keyboard, inspired by projects like komorebi and JigsawWM.',
    link: '/docs/tilo/about',
    image: '/img/tilo.png',
  },
  {
    title: 'Dark Prism',
    description:
      'Dark Prism is a clear and aesthetically pleasing VS Code theme. Inspired by Railscasts and Tomorrow Night, it enhances readability with distinct colors and italicized elements, especially for Python developers.',
    link: '/docs/dark-prism/about',
    image: '/img/dark-prism.png',
  },
];

function ProjectCard({title, description, link, image, index}: (typeof projects)[0] & {index: number}) {
  return (
    <div
      className={clsx(
        'row',
        'margin-bottom--xl',
        styles.projectContainer,
        index % 2 === 0 ? styles.projectBg0 : styles.projectBg1,
      )}
      data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
      <div className="col col--4">
        <div className="text--center">
          <img src={image} alt={title} className={styles.projectImage} />
        </div>
      </div>
      <div className={clsx('col', 'col--8', styles.projectDetails)}>
        <div>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
        <div>
          <Link to={link} className="button button--primary">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className={styles.projectsSection}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <Heading as="h2" className="text--center margin-bottom--lg">
                  My Projects
                </Heading>
                <hr className={styles.separator} />
              </div>
            </div>
            {projects.map((project, idx) => (
              <ProjectCard key={idx} index={idx} {...project} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}