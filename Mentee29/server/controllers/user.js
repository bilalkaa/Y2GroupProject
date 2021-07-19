const bcrypt = require('bcrypt');
var User = require('../models/user.js');
var register = async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var jobRole = req.body.jobRole;
  var hashedPassword = await bcrypt.hash(password, 10);
  var params = {
    email: email,
    password: hashedPassword,
    name: name,
    jobRole: jobRole,
  };
  var newUser = new User(params);

  try {
    res.json(newUser.register());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var login = async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var params = {
    email: email,
    password: password,
  };
  var user = new User(params);

  try {
    res.json(await user.login());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var createProfile = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var jobRole = req.body.jobRole;
  var id = req.body.id;
  var profileType = req.body.profileType;
  var profilePicture = req.body.profilePicture;
  var primarySkills = req.body.primarySkills;
  var desiredSkills = req.body.desiredSkills;
  var bio = req.body.body;
  var requests = [];
  var requested = [];
  var mentoringPair = [];
  var params = {
    email: email,
    password: password,
    name: name,
    jobRole: jobRole,
    id: id,
    profileType: profileType,
    profilePicture: profilePicture,
    primarySkills: primarySkills,
    desiredSkills: desiredSkills,
    bio: bio,
    requests: requests,
    requested: requested,
    mentoringPair: mentoringPair,
  };

  var user = new User(params);
  try {
    res.json(user.createProfile(params));
    console.log('Success');
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var searchMentor = function (req, res, next) {
  var text = req.body.text;
  var searchBy = req.body.searchBy;
  var params = {
    text: text,
    searchBy: searchBy,
  };
  var mentee = new User({});

  try {
    res.json(mentee.searchMentor(params));
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var viewMentors = function (req, res, next) {
  var mentee = new User(req.body);

  try {
    res.json(mentee.viewMentors());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var viewMentees = function (req, res, next) {
  var mentor = new User(req.body);

  try {
    res.json(mentor.viewMentees());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var viewMentorRequests = function (req, res, next) {
  var mentor = new User(req.body);

  try {
    res.json(mentor.viewMentorRequests());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var viewRequestedMentors = function (req, res, next) {
  var mentee = new User(req.body);

  try {
    res.json(mentee.viewRequestedMentors());
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var requestMentor = function (req, res, next) {
  const { mentor, mentee } = req.body;
  var newMentee = new User(mentee);

  try {
    res.json(newMentee.requestMentor(mentor));
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
var respondToMentee = function (req, res, next) {
  const { mentor, menteeId, response } = req.body;
  var newMentor = new User(mentor);
  var params = {
    menteeId: menteeId,
    response: response,
  };

  try {
    res.json(newMentor.respondToMentee(params));
    // do other things...
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  register: register,
  login: login,
  createProfile: createProfile,
  searchMentor: searchMentor,
  viewMentors: viewMentors,
  viewMentees: viewMentees,
  viewMentorRequests: viewMentorRequests,
  viewRequestedMentors: viewRequestedMentors,
  requestMentor: requestMentor,
  respondToMentee: respondToMentee,
};
