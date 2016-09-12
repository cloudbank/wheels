var config = {}

config.cloudant = {};
config.cloudant.dbname = 'onwheelsusers';
config.cloudant.account = 'onwheelsanubis.cloudant.com';
config.cloudant.password = 'topcoder';

config.admin_user = 'admin';
config.admin_pass = 'welcome';
config.index_field = 'username';
config.port = process.env.PORT || 3000;

module.exports = config;
