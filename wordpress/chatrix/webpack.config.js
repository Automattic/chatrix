const defaults = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	entry: {
		settings: './src/Admin/Settings/index.js',
	},
};
