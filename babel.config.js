// babel.config.js
module.exports = (api) => {
	api.cache(true);
	return {
		presets: [
			['babel-preset-expo', { jsxImportSource: 'nativewind' }],
			'nativewind/babel',
		],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
					root: ['./'],
					alias: {
						'@assets': './assets',
					},
				},
			],
			'react-native-reanimated/plugin', // sempre por último
		],
	};
};
