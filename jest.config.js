const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	modulePaths: ['<rootDir>'],
	testRegex: '.e2e-spec.ts$',
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
};
