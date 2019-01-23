module.exports = {
    apps: [{
        name: 'be',
        script: '/root/node-apps/rest/rest.bundle.js',
        instances: 1,
        args: ['-i max'],
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production'
        }
    },
        {
            name: 'responsive-images',
            script: 'grunt',
            instances: 1,
            cwd: '/root/node-apps/responsive-images',
            args: ['watch'],
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'salsa-today',
            script: '/var/www/html/dist/server.js',
            instances: 1,
            args: ['-i max'],
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'cal-sync',
            script: '/root/node-apps/cal-sync/src/sync.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_production: {
                NODE_ENV: 'production'
            }
        }]
};

