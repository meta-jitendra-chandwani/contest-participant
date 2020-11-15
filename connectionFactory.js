const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./application.properties');

class ConnectionFactory {
    static host = properties.get("host")
    static port = properties.get("port")
    static user = properties.get("user")
    static password = properties.get("password")
    static databaseName = properties.get("database")
    static connectionTimeout = properties.get("connection_timeout")
    static maxConnection = properties.get("pool_max_connection")
}
module.exports = ConnectionFactory
