global.window = require("jsdom")
                .jsdom()
                .createWindow();
				
global.jQuery = require("jquery");

//Test framework
var jasmine=require('jasmine-node');
for(var key in jasmine) {
  global[key] = jasmine[key];
}

//What we're testing
require("../src/jquery.uxbar.js")

jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){  
    process.exit(runner.results().failedCount?1:0);
}, true, true);