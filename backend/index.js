const express = require('express')
var auth = require('./auth')
const database = require('./database')
 
// creating an express instance

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session())

let exampleShow = {
    name: "test name",
    creator: "test creatr",
    category: "test category",
    thumbnailURL: "test thumbnail",
    desc: "test description",
    creatorDesc: "test creator description",
    twitterURL: "",
    facebookURL: "",
    instagramURL: "",
    featureShow: false
}

let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
]

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "User does not exist", info]);
    }

    req.login(user, err => {
      res.send("Logged in");
    });
  })(req, res, next);
});

app.get("/api/logout", function(req, res) {
  req.logout();
  console.log("logged out")
  return res.send();
});


const authMiddleware = (req, res, next) => {
  console.log('Authentication request recieved...')
  if (!auth.isAuthenticated()) {
    console.log('...request failed authentication.')
    res.status(401).send('You are not authenticated')
  } else {
    console.log('...request successfully authenticated.')
    return next()
  }
}

app.get("/api/user", authMiddleware, (req, res) => {
  let user = auth.getUserObject()

  res.send({ user: user })
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
        let user = auth.authenticate(username, password, 
            function(callback) {
                if(callback) {
                    console.log("Successfuly auth'd with firebase")
                    done(null, user)
                } else {
                    console.log("105 error" + error)
                    done(null, false, { message: 'Incorrect username or password'})
                }   
            })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

app.post("/api/addshow", (req, res) => {
    console.log("Recieved POST from api/addshow")
    
    database.addShow(req.body)
    
    res.status(200).send("Ayo we got the data chief.")
})

app.post("/api/updateshow", (req, res) => {
    console.log("Recieved POST from api/updateshow")
    
    database.updateShow(req.body)
    
    res.status(200).send("Ayo we got the data to update chief.")
})

app.get("/api/getshows", (req, res) => {
    console.log("Recieved GET from api/getshows")
    
    database.getShows().then(function(shows) {
        res.status(200).send({shows: shows})
    }).catch((error) => {
        res.status(401).send(error)
    })
})

app.post("/api/addtrack", (req, res) => {
    console.log("Recieved POST from api/addtrack")
    database.addTrack(req.body.showUID, req.body)
    
    res.status(200).send("Ayo we sent the track")
})

app.post("/api/removetrack", (req, res) => {
    console.log("Received POST from api/removetrack")
    database.removeTrack(req.body)
    
    res.status(200).send("Ayo we removed the track")
})

app.post("/api/trackplay", (req, res) => {
    console.log("Received POST from api/trackplay")
    database.updateTrackPlayCount(req.body)
    
    res.status(200).send("Ayo we updated the play count")
})

app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})
