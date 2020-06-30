module.exports = (globalVariables) => {
  if(!globalVariables.Discord) globalVariables.Discord = require("discord.js");
  if(!globalVariables.client) globalVariables.client = globalVariables.bot = new globalVariables.Discord.Client({disableEveryone: true});
  if(!globalVariables.fs) globalVariables.fs = require("fs");
  if(!globalVariables.getFiles) globalVariables.getFiles = (dir, files_) => {
    files_ = files_ || [];
    if(globalVariables.fs.existsSync(dir)) {
      var files = globalVariables.fs.readdirSync(dir);
      for(var i in files) {
        var name = dir + '/' + files[i];
        if(globalVariables.fs.statSync(name).isDirectory()) {
          globalVariables.getFiles(name, files_);
        } else {
          files_.push(name);
        }
      }
    }
    return files_;
  }
  if(!globalVariables.listeners) globalVariables.listeners = [];
  if(!globalVariables.moment) {
    const moment = require("moment");
    require("moment-duration-format");
    globalVariables.moment = moment;
  }
  if(!globalVariables.ms) globalVariables.ms = require("ms");
  if(!globalVariables.hash) globalVariables.hash = require("string-hash");
  
  //configuration
  globalVariables.prefix = "b!";
  globalVariables.ownerID = "251455597738721280";
}
