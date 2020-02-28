
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

config.user = "hvbpycwqycclkj";
config.password = "00da7250cf91e7529efa9db013ea09163d45692e2dd0f8031ccd75bd181d1775";
config.database = "d1ha0feb33cd3r";

module.exports = {
    CONST_page_limit: 10,
    dbPool: config
};