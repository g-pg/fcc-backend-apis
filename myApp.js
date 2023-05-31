require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person.js')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: 'Teste',
    age: 17,
    favoriteFoods: ['abacate', 'cebola']
  })

  newPerson.save((error, savedPerson) => {
    if (error) {
      console.error('Error saving person:', error);
      return done(error);
    }
    console.log('New person saved:', savedPerson);
    done(null, savedPerson);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
      console.error('Error creating people:', error);
      return done(error);
    }
    console.log('People created:', createdPeople);
    done(null, createdPeople);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, peopleFound) => {
    if (error) {
      console.error('Error finding people:', error);
      return done(error);
    }
    console.log('People found:', peopleFound);
    done(null, peopleFound);
  });
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound) {
    if (err) {
      console.log(err)
    } else {
    console.log('found: ', personFound)
    done(null, personFound);
    
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, found) {
    if (err) {
      console.log(err);
      return done(err);
    }

    console.log('found: ' + found);
    return found;
    return done(null, found)
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) {
      console.error('Error finding person:', error);
      return done(null, error);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((error, updatedPerson) => {
      if (error) {
        console.error('Error saving person:', error);
        return done(error);
      }
      console.log('Person updated:', updatedPerson);
      return done(null, updatedPerson);
    });
  });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},
   function(err, doc) {
     if (err) {
       console.log(err)
       return done(null, err);
     } else {
       console.log('edited: '+ doc)
       return done(null, doc)
     }
   })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, deleted) {
    if (err) {
      console.log('error', err)
      return done(null, err)
    } else {
      console.log('deleted', deleted);
      return done(null, deleted)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removed) => {
    if (err) {
      console.log(err);
      return done(null, err)
    } else {
      console.log("removed", removed);
      return done(null, removed)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((error, data) => {
      if (error) {
        console.error('Error executing query:', error);
        return done(null, error);
      }
      console.log('Query result:', data);
      return done(null, data);
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
