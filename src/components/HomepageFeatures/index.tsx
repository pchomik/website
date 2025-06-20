import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'pytest-spec',
    description: (
      <>
        A pytest plugin that transforms test output into a human-readable specification format. It enhances readability by grouping tests, coloring outcomes, and cleaning up test names.
      </>
    ),
  },
  {
    title: 'Tilo',
    description: (
      <>
        TILO is a Python-based Tiling Windows Manager for Windows OS. It offers a convenient way to manage windows using only your keyboard, inspired by projects like komorebi and JigsawWM.
      </>
    ),
  },
  {
    title: 'Dark Prism',
    description: (
      <>
        Dark Prism is a clear and aesthetically pleasing VS Code theme. Inspired by Railscasts and Tomorrow Night, it enhances readability with distinct colors and italicized elements, especially for Python developers.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
