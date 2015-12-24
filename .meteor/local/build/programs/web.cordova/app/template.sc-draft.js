(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw('<header class="navbar navbar-fixed-top emo-navbar">\n    <div class="navbar-header" style="height:40px">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n	<span class="icon-bar"></span>                      \n	<span class="icon-bar"></span>                           \n	<span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand toggle-sidebar" style="cursor\\\n						    :pointer;">\n	XENON1T Slow Control Viewer\n      </a>\n    </div>\n    <ul class="nav navbar-nav navbar-right" style="margin-right:10px;margin-top:10px;">\n\n    </ul>\n  </header>\n  '), HTML.DIV({
    "class": "container"
  }, "\n", HTML.Raw("<br>"), "    \n    ", HTML.Raw('<div class="col-xs-3"><strong>Updated: </strong></div>'), "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, Blaze.View("lookup:scvalues.time", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("scvalues"), "time"));
  })), "\n    ", HTML.Raw('<div class="col-xs-3"><button class="btn btn-info" id="refresh">Refresh</button></div>'), "\n    ", HTML.DIV({
    "class": "row"
  }, "\n      ", HTML.DIV({
    "class": "col-md-12 col-sm-12 col-xs-12"
  }, "\n        ", HTML.UL("\n	  ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("scvalues"), "sensors"));
  }, function() {
    return [ "\n	  ", Spacebars.include(view.lookupTemplate("text")), "\n	  " ];
  }), "\n	"), "      \n      "), "\n\n      ", HTML.DIV({
    "class": "col-md-8 col-sm-8 col-xs-12"
  }, "\n	", Spacebars.include(view.lookupTemplate("plot_0")), "\n      "), "\n    "), "\n  ") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("text");
Template["text"] = new Template("Template.text", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", HTML.STRONG(Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  }), ":", HTML.Raw("&nbsp;")), "\n    "), "\n    ", HTML.DIV({
    "class": "col-xs-6"
  }, "\n      ", Blaze.View("lookup:value", function() {
    return Spacebars.mustache(view.lookup("value"));
  }), "\n    "), "    \n  "), "\n  ", HTML.DIV({
    id: function() {
      return [ "flot-", Spacebars.mustache(view.lookup("index")) ];
    },
    "class": "flot",
    style: "height:150px"
  }) ];
}));

Template.__checkName("plot_0");
Template["plot_0"] = new Template("Template.plot_0", (function() {
  var view = this;
  return HTML.Raw('<!--  <div id="flot-0" class=\'flot\' style="height:150px"></div>\n  <div id="flot-1" class=\'flot\' style="height:150px"></div>\n  <div id="flot-2" class=\'flot\' style="height:150px"></div>\n  <div id="flot-3" class=\'flot\' style="height:150px"></div>\n  <div id="flot-4" class=\'flot\' style="height:150px"></div>\n  <div id="flot-5" class=\'flot\' style="height:150px"></div>\n  <div id="flot-6" class=\'flot\' style="height:150px"></div>\n  <div id="flot-7" class=\'flot\' style="height:150px"></div>\n  <div id="flot-8" class=\'flot\' style="height:150px"></div>\n  <div id="flot-9" class=\'flot\' style="height:150px"></div>\n  <div id="flot-10" class=\'flot\' style="height:150px"></div>\n  -->');
}));

})();
