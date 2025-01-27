const cds = require('@sap/cds');

// Mock authentication
process.env.CDS_ENV = JSON.stringify({
    requires: {
        auth: { kind: 'mock' },
        db: { kind: 'sqlite', impl: 'cds-sqlite' }
    }
});

global.cds = cds; 