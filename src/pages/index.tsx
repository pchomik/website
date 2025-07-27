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
      <div className="container text--center">
        <h1 className={styles.heroTitle}>
          Building the Future, One Line of Code at a Time
        </h1>
        <p className={styles.heroSubtitle}>
          Passionate programmer exploring the world of software development.
        </p>
      </div>
    </header>
  );
}

const projects = [
  {
    title: 'pytest-spec',
    description:
      'A pytest plugin to display test results in a spec-like format.',
    link: '/docs/pytest-spec/about',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    title: 'Tilo',
    description:
      'A simple and efficient command-line tool for task management.',
    link: '/docs/tilo/about',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="12" x2="12" y2="22.08"></line>
      </svg>
    ),
  },
  {
    title: 'Dark Prism',
    description:
      'A sleek, dark theme for the Prism syntax highlighter.',
    link: '/docs/dark-prism/about',
    icon: (
      <svg
        className="w-12 h-12 text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
  },
];

function ProjectCard({title, description, link, icon, index}: (typeof projects)[0] & {index: number}) {
  return (
    <div
      className={clsx('col', 'col--4')}
      data-aos="fade-up"
      data-aos-delay={index * 100}>
      <div className={styles.projectCard}>
        <div className={styles.projectLogo}>
          {icon}
        </div>
        <div className={styles.projectInfo}>
          <Heading as="h3" className={styles.projectTitle}>
            {title}
          </Heading>
          <p className={styles.projectDescription}>{description}</p>
          <Link to={link} className="button button--primary">
            See More Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Passionate programmer exploring the world of software development.">
      <HomepageHeader />
      <main>
        <section className={styles.projectsSection}>
          <div className="container">
            <div className="row">
              <div className="col col--12 text--center">
                <Heading as="h2" className={styles.projectsTitle}>
                  Featured Projects
                </Heading>
              </div>
            </div>
            <div className="row">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} index={idx} {...project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
