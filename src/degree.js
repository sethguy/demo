module.exports.degrees = {

    getFriends: function(set, peopleList) {

        var friends = [];

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
            return 0;

        while (set1.indexOf(p2.id) == -1) {
            count++

            set1 = this.getFriends(set1, peopleList);

            if (count > peopleList * 2) {
                count = -1;
                break
            }

        }

        return count
    }

}



var list = [{
    id: 0,
    name: 'John',
    age: 10,
    job: 'None',
    friends: [1]
}, {
    id: 1,
    name: 'Jane',
    age: 10,
    job: 'None',
    friends: [0, 2]
}, {
    id: 2,
    name: 'Joe',
    age: 10,
    job: 'None',
    friends: [1, 3]
}, {
    id: 3,
    name: 'Joe',
    age: 10,
    job: 'None',
    friends: [2, 4]
}, {
    id: 4,
    name: 'Joe',
    age: 10,
    job: 'None',
    friends: [3]
}]