// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WebsiteGenerator',
  tagline: 'Make a Website in just 5 Minutes!',
  url: 'https://docs.generator.byzero.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.jpg',
  organizationName: 'byZeroOfficial', // Usually your GitHub org/user name.
  projectName: 'WebsiteGenerator', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/byZeroOfficial/WebsiteGenerator/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/byZeroOfficial/WebsiteGenerator/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'WebsiteGenerator',
        logo: {
          alt: 'WebsiteGenerator-Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://demo.generator.byzero.dev',
            label: 'Demo',
            position: 'left',
          },
          {
            href: 'https://github.com/byZeroOfficial/WebsiteGenerator/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/WebGenerat0r',
              },
              {
                label: 'Matrix',
                href: 'https://matrix.to/#/#generator:envs.net',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/byZeroOfficial/WebsiteGenerator/',
              },
              // Make a field for an imprint via href redirecting to https://byzero.dev/imprint
              {
                label: 'Imprint',
                href: 'https://byzero.dev/imprint',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} byZero. `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
