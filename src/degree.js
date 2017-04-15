var degrees = {

    getFriends: function(set, peopleList) {

        var friends = [];

        //with a set of people ids, give me all the friends of the people with those ids
        set.forEach(function(id) {

            var pfil = peopleList.filter(function(person) {

                return person.id == id

            })

            if (pfil && pfil.length > 0 && !(id in friends)) {

                pfil[0].friends.forEach(function(friendid) {

                    friends.push(friendid)

                })

            }

        })

        return friends;
    },

    getDegreesBetween: function(p1, p2, peopleList) {
        var count = 1;
        var foundInterSection = false

        var set1 = p1.friends;

        if (p1.id == p2.id)
            return { count: 0 };

        // if the second person is not in the current set of friends,
        // keep looking for that second person in the friends of the people, in the current set of friends
        while (set1.indexOf(p2.id) == -1) {

            count++
            set1 = this.getFriends(set1, peopleList);
            if (count > peopleList.length * 2) {
                count = -1;
                break
            }

        }
        return { count: count  }
    },

    demo: function(peopleList) {

        // get two random people from a list of people
        var dex = Math.floor(Math.random() * peopleList.length)

        var dex2 = Math.floor(Math.random() * peopleList.length)

        var p1 = peopleList[dex]

        var p2 = peopleList[dex2]

        console.log("person 1", p1)

        console.log("person 2", p2)

        // calculate DOS

        var degreesBetween = this.getDegreesBetween(p1, p2, peopleList);

        console.log("degrees of seperation beteen  " + p1.name + " and " + p2.name + " :: " + (degreesBetween.count >-1 ? degreesBetween.count : " not connected"  ));
    }

}


module.exports.degrees = degrees;


var list = [{
    id: 0,
    name: 'John',
    age: 10,
    job: 'None',
    friends: [1]
}, {
    id: 1,
    name: 'seth',
    age: 10,
    job: 'None',
    friends: [0]
}, {
    id: 2,
    name: 'bob',
    age: 10,
    job: 'None',
    friends: [1]
}, {
    id: 3,
    name: 'sally',
    age: 10,
    job: 'None',
    friends: [2, 0]
}, {
    id: 4,
    name: 'frank',
    age: 10,
    job: 'None',
    friends: [3]
}]

//degrees.demo(list);
