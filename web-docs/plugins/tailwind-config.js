// Adds Tailwind CSS to the PostCSS pipeline and the "@/" alias used by shadcn/ui.
const path = require('path');

module.exports = function tailwindPlugin() {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require('@tailwindcss/postcss'),
        ...postcssOptions.plugins,
      ];
      return postcssOptions;
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {'@': path.resolve(__dirname, '../src')},
        },
      };
    },
  };
};
