module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm exec next start -p 3100',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      url: ['http://127.0.0.1:3100/'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
}
