const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if (err.code == 'PROTOCOL_CONECCTION_LOST'){
            console.error('La conexion fue fue cerrada')
        }    
        if (err.code == 'ECONNREFUSED'){
            console.error('Error en la conexion con la base de datos')
        }
    }
    if(conn) conn.release();
    console.log('La conexion con la base de datos fue exitosa');
    return;
})

pool.query =  promisify (pool.query);

module.exports = pool;