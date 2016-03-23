var init ={}
var q = require('q');

init.initiate = function(req,res,next)
{

configure = require('../configure')
//default setters
config = configure.app()
$arr = {
  config : config
}
next();

};

module.exports = init;