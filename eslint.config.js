const globals = require('globals');

module.exports = [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.jest,
                cds: true,
                SELECT: true,
                INSERT: true,
                UPDATE: true,
                DELETE: true
            }
        },
        rules: {
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['warn'],
            'no-console': ['warn', {
                'allow': ['log', 'warn', 'error', 'info']
            }]
        },
        ignores: [
            'gen/**',
            'node_modules/**',
            'coverage/**',
            '*.cds'
        ]
    }
];