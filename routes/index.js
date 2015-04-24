var express = require('express');
var router = express.Router();
var Q = require('q');
var mongoose = require('mongoose');

var UserSchema = mongoose.model('User');
var GroupSchema = mongoose.model('Group');
var EventSchema = mongoose.model('Event');
var PaymentSchema = mongoose.model('Payment');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

//Common response method for all the responses
function respondData(data){
	else{
		res.json({
			type: true,
			data: data
		});
	}
}

//Login, to get all the user details
router.post('/user/login', function(req, res){
	UserSchema.findOne({userid:req.body.userid}, function(err, user){
		if(err) {
			console.log(err);
		}
		else{
			//if exists
			if(user){
				respondData(user);
			}
			//if does not exist
			else{
				var newUser = new UserSchema();
				newUser.userid = req.body.userid;
				newUser.name = req.body.name;
				newUser.email = req.body.email;
				newUser.groups = [];
				newUser.events = [];
				newUser.payments = [];

				newUser.save(function(err, user){
					if(err){
						console.log(err);
					}
					else{
						respondData(user);
					}
				});
			}
		}
	});
});
/*********************************************** USER REQUEST START*************************************/
//to request the admin of a particular group to join this group
router.post('/user/:userid/group/:groupid/join', function(req, res){
	findUser(req.params.userid).then(function(user){
		findGroup(req.params.groupid).then(function(group){
			var ownerid = group.admin;
			findUser(ownerid).then(function(user){
				user.notify.push();
			}).fail();
		}).fail(function(err){
			console.log(err);
		});	
	}).fail(function(err){
		console.log(err);
	});
});

//to register out from a particular group
router.get('/user/:userid/group/:groupid/getout', function(req, res){

});
/*********************************************** USER REQUEST END*************************************/


/*********************************************** GROUP START*************************************/
//To create a group with this user as the admin
router.post('/user/:userid/groups', function(req, res){
	findUser(req.params.userid).then(function(user){
		var newGroup = new GroupSchema();
		newGroup.groupid = req.body.groupid;
		newGroup.name = req.body.name;
		newGroup.created_at = req.body.created_at;
		newGroup.admin = req.body.userid;
		newGroup.users = [];
		newGroup.events = [];
		newGroup.save(function(err, group){
			if(err){
				console.log(err);
			}
			else{
				if(group){
					UserSchema.update({userid : user.userid}, {$push : {groups: group.groupid}}, function(err, user){
						if(err){
							console.log(err);
						}
						else{
							if(user){
								respondData(group);
							}
						}
					});
				}
			}
		});
	}).fail(function(err){
		console.log(err);
	});
});

//to get all the groups of this user
router.get('/user/:userid/groups', function(req, res){

	findUser(req.params.userid).then(function(user){
		GroupSchema.find({groupid : {$in : user.groups}}, function(err, groups){
			if(err){
				console.log(err)
			}
			else{
				respondData(groups);
			}
		});

	}).fail(function(err){
		console.log(err)
	});

});

//to get all the details of a particular group
router.get('/user/:userid/group/:groupid', function(req, res){

	UserSchema.findOne({userid : req.params.userid, 'userid.groups' : req.params.groupid}, function(err, user){
		if(err){
			console.log(err);
		}
		else{
			if(user){
				findGroup(req.params.groupid).then(function(group){
					respondData(group);
				}).fail(function(err){
					console.log(err);
				});
			}
			else{
				//ERROR
			}
		}
	});
});
/*********************************************** GROUP END*************************************/


/*********************************************** EVENTS START*************************************/
//to create events inside a particular group
router.post('/user/:userid/group/:groupid/events', function(req, res){
	findUser(req.params.userid).then(function(user){
		findGroup(req.params.groupid).then(function(group){

			EventSchema newEvent = new EventSchema();
			newEvent.eventid = req.body.eventid;
			newEvent.name = req.body.name;
			newEvent.owner = user.userid;
			newEvent.users = group.users;
			newEvent.money_required = req.body.money_required;
			newEvent.created_at = req.body.created_at;
			newEvent.group = req.body.groupid;
			newEvent.save(function(err, event){
				if(err){
					console.log(err);
				}
				else{
					if(event){
						respondData(event);
					}
					else{

					}
				}
			});

		}).fail(function(err){
			console.log(err);
		});

	}).fail(function(err){
		console.log(err);
	});

});

//To get all the events inside a particular group
router.get('/user/:userid/group/:groupid/events', function(req, res){
	findUser(req.params.userid).then(function(user){
		findGroup().then(function(group){
			EventSchema.find({eventid : {$in : user.events}}, function(err, events){
				if(err){
					console.log(err);
				}
				else{
					respondData(events);
				}
			});
		}).fail(function(err){
			console.log(err);
		});
	}).fail(function(err){
		console.log(err);
	});
});

//to get the details of one single event inside that group
router.get('/user/:userid/group/:groupid/event/:eventid', function(req, res){
	findUser(req.params.userid).then(function(user){
		findEvent(req.params.eventid).then(function(event){
			respondData(event);
		}).fail(function(err){
			console.log(err);
		});
	}).fail(function(err){
		console.log(err);
	});
});
/*********************************************** EVENTS END*************************************/

function findUser(userid){
	var deferred = Q.defer();
	UserSchema.findOne({userid: userid}, function(err, user){
		if(err){
			deferred.reject(err);
		}
		else{
			if(user){
				deferred.resolve(user);
			}
			else{
				deferred.reject("No user found");
			}
		}
	});

	return deferred.promise;
}

function findGroup(groupid){
	var deferred = Q.defer();
	GroupSchema.findOne({groupid: groupid}, function(err, group){
		if(err){
			deferred.reject(err);
		}
		else{
			if(group){
				deferred.resolve(group);
			}
			else{
				deferred.reject("No group found");
			}
		}
	});

	return deferred.promise;
}

function findEvent(eventid){
	var deferred = Q.defer();
	EventSchema.findOne({eventid: eventid}, function(err, event){
		if(err){
			deferred.reject(err);
		}
		else{
			if(group){
				deferred.resolve(event);
			}
			else{
				deferred.reject("No event found");
			}
		}
	});

	return deferred.promise;
}

module.exports = router;