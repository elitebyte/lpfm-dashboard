const { db, fbauth } = require('./admin')


function addShow(show){
    console.log("Adding a new show titled: " + show.name)
    db.ref('shows').push(show).catch(function(error) {
        console.log("Failed to add show with error: " + error)
    })
}

function addTrack(showUID, track){
     
}

function removeTrack(trackID){
    
}

function removeShow(showUID){
    
}

function getShows() {
    console.log("Fetching all shows in the /shows Firebase ref")
    return new Promise(function(resolve, reject) {
        db.ref('shows').once('value').then(function(snapshot) {
            if (snapshot.val() == null) {
                reject("The /shows database node was empty, please contact server admin this is a big problemo.")
            }
            
            console.log("Successfully fetched shows: ")
            var finalObj = new Array()
            var index = 0
            for(const [key, value] of Object.entries(snapshot.val())) {
                value["showUID"] = key
                finalObj[index] = value
                index++
            }
            
            resolve(finalObj)
        }).catch(function(error) {
            console.log('An error occured whilst fetching shows, error: ' + error)
            reject(error)
        })
    })
}


module.exports = {

	addShow: addShow,
    addTrack: addTrack,
    removeTrack: removeTrack,
    remoteShow: removeShow,
    getShows: getShows

}