// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: './coverage',

    coverage: true,

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/lib/',
    ],

    // An array of file extensions your modules use
    moduleFileExtensions: [
        'ts',
        'js'
    ],

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        './src'
    ],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: [
        '/node_modules/',
        '/lib/',
    ],
};
