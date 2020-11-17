module.exports = {
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            statements: 85,
            branches: 85,
            functions: 85,
            lines: 85,
        },
    },
    coverageReporters: ['text', 'cobertura'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'json', 'html'],
    reporters: ['default', 'jest-junit'],
    setupFiles: [require.resolve('@thoughtspot/setup-modules/jest-setup.js')],
    resolver: require.resolve('@thoughtspot/setup-modules/jest-resolver.js'),
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.(ts|tsx|spec.tsx)?$': 'ts-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!react-syntax-highlighter|@storybook|(?!deck.gl))',
    ],
    testRegex: [
        '/src/.*.spec.(ts|tsx)?$',
        '.storybook/storyshots.test.ts$',
    ],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}'
    ],
};
