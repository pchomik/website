import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Paweł Chomicki',
    tagline: 'Software developer, creator of tools and themes.',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://your-docusaurus-site.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'pchomik', // Usually your GitHub org/user name.
    projectName: 'website', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    stylesheets: [
        {
            href: 'https://unpkg.com/aos@2.3.4/dist/aos.css',
            type: 'text/css',
        },
    ],
    scripts: [
        {
            src: 'https://unpkg.com/aos@2.3.4/dist/aos.js',
            async: true,
        },
    ],
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/pchomik',
                },
                // blog: {
                //     showReadingTime: true,
                //     feedOptions: {
                //         type: ['rss', 'atom'],
                //         xslt: true,
                //     },
                //     // Please change this to your repo.
                //     // Remove this to remove the "edit this page" links.
                //     editUrl:
                //         'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                //     // Useful options to enforce blogging best practices
                //     onInlineTags: 'warn',
                //     onInlineAuthors: 'warn',
                //     onUntruncatedBlogPosts: 'warn',
                // },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            disableSwitch: true,
        },
        navbar: {
            title: 'PCHOMIK',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'pytestSpecSidebar',
                    position: 'left',
                    label: 'pytest-spec',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'tiloSidebar',
                    position: 'left',
                    label: 'tilo',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'darkPrismSidebar',
                    position: 'left',
                    label: 'dark-prism',
                },
                // { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/pchomik',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            // links: [
            //     {
            //         title: 'Docs',
            //         items: [
            //             {
            //                 label: 'Tutorial',
            //                 to: '/docs/intro',
            //             },
            //         ],
            //     },
            //     {
            //         title: 'About me',
            //         items: [
            //             {
            //                 label: 'Github',
            //                 href: 'https://github.com/pchomik',
            //             },
            //             {
            //                 label: 'LinkedIn',
            //                 href: 'https://www.linkedin.com/in/pchomicki/',
            //             },
            //         ],
            //     },
            // {
            //     title: 'More',
            //     items: [
            //         {
            //             label: 'Blog',
            //             to: '/blog',
            //         },
            //         {
            //             label: 'GitHub',
            //             href: 'https://github.com/facebook/docusaurus',
            //         },
            //     ],
            // },
            // ],
            copyright: `Copyright © ${new Date().getFullYear()} Paweł Chomicki`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
    plugins: [require.resolve('docusaurus-plugin-search-local')],
};

export default config;
