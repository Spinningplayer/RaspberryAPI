var env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 27017,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'DashboardDB',
    outletAddress: '192.168.1.104'
}

// var link = process.env.NODE_ENV === 'production' ?
//     'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
//     'mongodb://localhost/' + env.dbDatabase;

// var link = 'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase;
 var link = 'mongodb://' + env.dbHost + ':' + env.dbPort;

module.exports = {
    env: env,
    link: link
};