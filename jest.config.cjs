module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['**/test/**/*.test.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage/',
        '/gen/'
    ],
    setupFiles: ['<rootDir>/test/jest.setup.js'],
    testTimeout: 10000,
    globals: {
        'cds.env.requires.db.kind': 'sqlite',
        'cds.env.requires.auth.kind': 'mock'
    }
}; 