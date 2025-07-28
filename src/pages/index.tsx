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
    githubUrl: 'https://github.com/pchomik/pytest-spec',
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
      'A simple tiling window manager for Windows written in Python. Currently inactive - repository is private.',
    link: '/docs/tilo/about',
    githubUrl: null, // Disabled - repository is private
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
      'The Visual Studion Code theme especially designed for Python developers.',
    link: '/docs/dark-prism/about',
    githubUrl: 'https://github.com/pchomik/dark-prism',
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

function ProjectCard({title, description, link, githubUrl, icon, index}: (typeof projects)[0] & {index: number}) {
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
          <div className={styles.projectButtons}>
            <Link to={link} className="button button--primary">
              See More Details
            </Link>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['button--github']}
                aria-label="View on GitHub">
                <svg
                  className="github-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
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
