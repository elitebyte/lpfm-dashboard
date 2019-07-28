const { db, fbauth } = require('./admin')


function addShow(show){
    console.log("Adding a new show titled: " + show.name)
    db.ref('shows').push(show).catch(function(error) {
        console.log("Failed to add show with error: " + error)
    })
}

function addTrack(showUID, track){
    console.log("Adding a new track titled: " + track.name)
    
    var ref = db.ref('shows').child(showUID).child('tracks').push(track)  
    
    console.log("Reference key: " + ref.key)
    
    track['trackUID'] = ref.key
    
    ref.set(track)
}

function removeTrack(trackData){
    let trackRefString = 'shows/' + trackData.showUID + '/tracks/' + trackDa 
    ta.trackUID
    console.log("Removing a track at location: " + trackRefString)

    db.ref(trackRefString).remove()
        .catch(function(error) {
        console.log("Failed to add track with error: " + error)
        })
}

function removeShow(showUID){
    
}

function updateShow(show) {
    console.log("Updating show with UID: " + show.showUID)
    db.ref('shows').child(show.showUID).update(show).then(function() {
        console.log("Successfully updated show.")
    }).catch(function(error) {
        console.log("Failed to update show with error: " + error)
    })
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

function updateTrackPlayCount(trackData) {
    let trackRefString = 'shows/' + trackData.showUID + '/tracks/' + trackData.trackUID + '/plays'
    console.log("Updating play count of track at location: " + trackRefString)

    db.ref(trackRefString).once('value')
        .then(function(dataSnapshot) {
        db.ref(trackRefString).set(dataSnapshot.val() + 1)
            .then(function() {
            console.log("Successfully updated play count.")
            }).catch(function() {
            console.log("Failed to update play count.")
        })
    })
}


module.exports = {

	addShow: addShow,
    addTrack: addTrack,
    removeTrack: removeTrack,
    remoteShow: removeShow,
    updateShow: updateShow,
    getShows: getShows,
    removeTrack: removeTrack,
    updateTrackPlayCount: updateTrackPlayCount

}