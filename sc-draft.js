// simple-todos.js
SCvalues = new Mongo.Collection("sc");
if(Meteor.isServer){
    console.log(JSON.stringify(process.env.MONGO_URL));
    console.log("done");
    // This code only runs on the server
    //Meteor.publish("sc", function () {
//	return Tasks.find();
  //  });
}

if (Meteor.isClient) {
    Session.setDefault("plotted", false);
    Meteor.subscribe("sc");

    // This code only runs on the client
    Template.body.helpers({
	
      scvalues: function () {
	  var sort = {"time": -1};
	  var find = {};
	  console.log(SCvalues.find());
	  console.log("here");
	  
	  var doc = SCvalues.findOne(find, {sort:sort});
	  if(doc == null)
	      return;
	  fields = [];
	  values = [];
	  for(var n=0; n<doc['sensors'].length;n+=1){
	      fields.push(doc['sensors'][n]['name']);
	  }
	  fields.sort();
	  for(var n=0; n<fields.length; n+=1){
	      for(var m=0; m<doc['sensors'].length;m+=1){
		  if(doc['sensors'][m]['name'] == fields[n])
		      values.push(doc['sensors'][m]['value']);
	      }
	  }
	  // Make dict
	  retdict = {"sensors":[], "time": doc['time']}
	  for(var n=0; n<fields.length; n+=1){
	      retdict['sensors'].push({"index": n, "name": fields[n], "value": values[n]});
	  }
	  return retdict;//SCvalues.findOne(find,{sort:sort});
	  
      },

    });

    function MakePlots(){
	// Get data
	var sort = {"time": -1};
	var find = {};
	doc = SCvalues.findOne(find, {sort:sort});
	cursor = SCvalues.find(find,{sort:sort, limit:5000});

	if (cursor.count()<1)
	    return;

	// Get list of field names
	fields = [];
	for(var n=0; n<doc['sensors'].length;n+=1){
	    fields.push(doc['sensors'][n]['name']);
	}
	fields.sort();
	console.log(fields);
	// Make that into a list of data
	data_dict = {};
	for(var n=0; n<fields.length; n+=1){
	    data_dict[fields[n]] = {"data":[], "ymax": -100000000000, "ymin": 10000000000};
	}
	console.log(data_dict);
	
	// Fill plots
	mintime = null;
	maxtime = null;
	console.log("Before each");
	cursor.forEach(function(doc){
	    // do times
	    if(mintime == null)
		mintime = doc['time'];
	    if(maxtime == null)
		maxtime = doc['time'];
	    if(doc['time'] < mintime)
		mintime = doc['time'];
	    if(doc['time'] > maxtime)
		maxtime = doc['time'];
	    
	    for(var n=0; n<doc['sensors'].length; n+=1){
		
		if(Object.keys(data_dict).indexOf(doc['sensors'][n]['name'])<0)
		    continue;
		var name = doc['sensors'][n]['name'];
		data_dict[name]['data'].push([doc['time'],
					     doc['sensors'][n]['value']]);
//		data_dict[name]['y'].push(doc['sensors'][n]['value']);
		if(doc['sensors'][n]['value'] > data_dict[name]['ymax'])
		    data_dict[name]['ymax']=doc['sensors'][n]['value']
		if(doc['sensors'][n]['value'] < data_dict[name]['ymin'])
		    data_dict[name]['ymin']=doc['sensors'][n]['value']		
		    
	    }
	});

	var dom_start = "#flot-";


	for(var index=0; index<fields.length; index+=1){

	    key = fields[index];
	    console.log(key);
	    var dom_name = dom_start + index.toString();

	    var yaxismin = .9*data_dict[key]['ymin'];
	    var yaxismax = 1.1*data_dict[key]['ymax'];
	    if(data_dict[key]['ymin']<0)
		yaxismin = 1.1*data_dict[key]['ymin'];
	    if(data_dict[key]['ymax']<0)
		yaxismax = .9*data_dict[key]['ymax'];
	    var a = $.plot($(dom_name), [
		{data: data_dict[key]['data']},
//		{data: data_dict[key]['y'], label: key}
	    ],
			   {
			       series: {
				   lines: {show: true, lineWidth: 1},
				   points: {show: false}
			       },
			       grid: {
				   hoverable: false, clickable: false
			       },
			       xaxis: { mode: "time",minTickSize: [1, "minute"],
					min: mintime,
					max: maxtime
				      },
			       yaxis: { min:yaxismin, max: yaxismax},
			       zoom: {
				   interactive: false
			       },
			       pan: {
				   interactive: false
			       },
			       selection: { mode: "x"},
			   }
			  )
	}
    };
	Template.text.rendered=function(){
	    MakePlots();
	}
    // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
    Template.body.events({

	"click .get-data-1": function(event){
	    console.log("HERE");
	    return {"EVENT":1};
	},
	"click #refresh": function(){
	    MakePlots();
	}
    });


}

//Meteor.methods({

//});
