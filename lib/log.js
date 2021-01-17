const log = (type, message) => {
    console.log(`${new Date().toISOString()} - ${type} - ${message}`);
}

module.exports = log;