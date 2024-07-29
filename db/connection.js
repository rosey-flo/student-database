const {Pool} = require('pg');
const is_prod = process.env.NODE_ENV === 'production';
    
    const localConnection = {
    user:'postgres',
    password: 'pass', 
    database: 'students_app_db',
    multi_statements: true 
};

const renderConnection = {
    connectionString:process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
}

const connectObj = is_prod ? renderConnection : localConnection;

const client = new Pool(connectObj)
module.exports = client;