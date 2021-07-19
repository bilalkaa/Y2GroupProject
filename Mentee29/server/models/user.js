const bcrypt = require('bcrypt');
const fs = require('fs');

class User {
  constructor(params) {
    this.id = params.id;
    this.accountType = 'user';
    this.name = params.name;
    this.email = params.email;
    this.jobRole = params.jobRole;
    this.password = params.password;
    this.profilePicture = params.profilePicture;
    this.mentor = params.mentor;
    this.mentee = params.mentee;
  }

  async register() {
    this.id = Date.now().toString();
    fs.readFile('./database/user.json', (err, data) => {
      var json = JSON.parse(data);
      console.log(json);
      json.push(this);

      fs.writeFile('./database/user.json', JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
    });
    return this;
  }

  async login() {
    var data = fs.readFileSync('./database/user.json');
    var users = JSON.parse(data);
    var user;
    // var parsedUsers = users.map((user) => JSON.parse(user));
    users.map((i) => {
      i.email.toLowerCase() === this.email.toLowerCase() && (user = i);
    });

    if (user == null) {
      console.log('No user with that email');
      return;
    }

    try {
      if (await bcrypt.compare(this.password, user.password)) {
        console.log(user);
        return user;
      } else {
        console.log('Password incorrect');
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  createProfile(params) {
    if (params.profileType === 'mentor') {
      this.mentor = {
        primarySkills: params.primarySkills,
        requests: [],
        mentoringPair: [],
      };
      fs.readFile('./database/user.json', (err, data) => {
        var json = JSON.parse(data);
        console.log(json);
        json.map(
          (user) => user.id === params.id && (user.mentor = this.mentor)
        );

        fs.writeFile('./database/user.json', JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      });
    } else if (params.profileType === 'mentee') {
      this.mentee = {
        desiredSkills: params.desiredSkills,
        requested: [],
        mentoringPair: [],
      };
      fs.readFile('./database/user.json', (err, data) => {
        var json = JSON.parse(data);
        console.log(json);
        json.map(
          (user) => user.id === params.id && (user.mentee = this.mentee)
        );
        fs.writeFile('./database/user.json', JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      });
    }
    return this;
  }

  searchMentor(params) {
    const { text, searchBy } = params;
    const results = [];
    const data = fs.readFileSync('./database/user.json');
    const users = JSON.parse(data);
    searchBy === 'name'
      ? users.map((i) => {
          i.name.toLowerCase() === text.toLowerCase() &&
            i.mentor !== undefined &&
            results.push(i);
        })
      : searchBy === 'jobRole'
      ? users.map((i) => {
          i.jobRole === text && i.mentor !== undefined && results.push(i);
        })
      : users.map((i) => {
          i.mentor &&
            i.mentor.primarySkills.map(
              (skill) =>
                skill === text && i.mentor !== undefined && results.push(i)
            );
        });
    console.log(results);
    return results;
  }

  viewMentors() {
    const results = [];
    const data = fs.readFileSync('./database/user.json');
    const users = JSON.parse(data);
    users.map((user) =>
      this.mentee.mentoringPair.map(
        (pair) => pair.mentorId === user.id && results.push(user)
      )
    );
    console.log(results);
    return results;
  }

  viewMentees() {
    const results = [];
    const data = fs.readFileSync('./database/user.json');
    const users = JSON.parse(data);
    users.map((user) =>
      this.mentor.mentoringPair.map(
        (pair) => pair.menteeId === user.id && results.push(user)
      )
    );
    console.log(results);
    return results;
  }

  viewMentorRequests() {
    const results = [];
    const data = fs.readFileSync('./database/user.json');
    const users = JSON.parse(data);
    users.map((user) =>
      this.mentor.requests.map((id) => id === user.id && results.push(user))
    );
    console.log(results);
    return results;
  }

  viewRequestedMentors() {
    const results = [];
    const data = fs.readFileSync('./database/user.json');
    const users = JSON.parse(data);
    users.map((user) =>
      this.mentee.requested.map((id) => id === user.id && results.push(user))
    );
    console.log(results);
    return results;
  }

  requestMentor(params) {
    const data = fs.readFileSync('./database/user.json');
    var json = JSON.parse(data);
    console.log(json);
    console.log(this);
    console.log(params);
    json.map(
      (user) => (
        user.id === params.mentor.id && user.mentor.requests.push(this.id),
        user.id === this.id &&
          (user.mentee.requested.push(params.mentor.id),
          this.mentee.requested.push(params.mentor.id))
      )
    );

    fs.writeFile('./database/user.json', JSON.stringify(json), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
    return this;
  }

  respondToMentee(params) {
    const data = fs.readFileSync('./database/user.json');
    var json = JSON.parse(data);
    // console.log(json);
    let index;
    params.response === 'accept'
      ? json.map(
          (user) => (
            user.id === params.menteeId &&
              (user.mentee.mentoringPair.push({
                mentorId: this.id,
                menteeId: params.menteeId,
              }),
              (index = user.mentee.requested.indexOf(this.id)),
              user.mentee.requested.splice(index, 1)),
            user.id === this.id &&
              (user.mentor.mentoringPair.push({
                mentorId: this.id,
                menteeId: params.menteeId,
              }),
              (index = user.mentor.requests.indexOf(params.menteeId)),
              user.mentor.requests.splice(index, 1),
              this.mentor.mentoringPair.push({
                mentorId: this.id,
                menteeId: params.menteeId,
              }),
              this.mentor.requests.splice(index, 1))
          )
        )
      : json.map(
          (user) => (
            user.id === params.menteeId &&
              ((index = user.mentee.requested.indexOf(this.id)),
              user.mentee.requested.splice(index, 1)),
            user.id === this.id &&
              ((index = user.mentor.requests.indexOf(params.menteeId)),
              user.mentor.requests.splice(index, 1),
              this.mentor.requests.splice(index, 1))
          )
        );

    fs.writeFile('./database/user.json', JSON.stringify(json), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });

    return this;
  }
}

module.exports = User;
