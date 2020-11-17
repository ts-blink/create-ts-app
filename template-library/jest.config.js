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
    moduleFileExtensions: ['ts', 'js', 'json'],
    reporters: ['default', 'jest-junit'],
    setupFiles: [require.resolve('@thoughtspot/setup-modules/jest-setup.js')],
    resolver: require.resolve('@thoughtspot/setup-modules/jest-resolver.js'),
    transform: {
        '^.+\\.(js)?$': 'babel-jest',
        '^.+\\.(ts|spec.ts)?$': 'ts-jest',
    },
    testRegex: [
        '/src/.*.spec.(ts|tsx)?$'
    ],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}'
    ],
};
