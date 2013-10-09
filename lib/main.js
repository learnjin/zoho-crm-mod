var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*.crm.zoho.com",
    contentScriptWhen: 'end',
    contentScriptFile: data.url("contentScript.js")
});

