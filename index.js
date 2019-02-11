// implement your API here

const express = require('express') // this is the same as import express from 'express'

const db = require('./data/db.js');

const server = express(); // this creates the server

// const port = 4000; you could do this 

server.use(express.json()); // middleware

server.get("/", (req, res) => {
    res.send("<h1>Node Express Mini!</h1>") // routes === endpoints
});


// ======================== Getting User Info!


//===================================== POST requests

server.post("/api/users", (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
      db.insert(user)
        .then(idInfo => {
          db.findById(idInfo.id).then(user => {
            res.status(201).json(user); 
          }); 
        })
        .catch(err => {
          res.status(500).json({ error: "There was an error while saving the user to the database" });
        });
    } else {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
  });

//======================================================= End POST requests



//========================================= GET requests

server.get("/api/users", (req, res) => {
    db.find()
    .then(users => {
      res.json(users)
    })
    .catch(() => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
  });

  server.get("/api/users/:id", (req, res) => {
    const id  = req.params.id; //or could be db.findById(req.params.id)
    db.findById(id)
    .then((user) => {
        // this says to either return the user id or the 404 message
        if (user.length === 0) {
            return res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else
        console.log(user);
        res.status(200).json(user); // If there is a user send the user/response.
    })
    .catch(() =>
    res.status(404)
    .json({ message: "The user with the specified ID does not exist." })
    )
})

//======================================================================== End GET requests


// ============================ DELETE requests

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(user => {
          if(!user) {
              res.status(404)
              .json({ message: "The user with the specified ID does not exist." })
          } else {
              res.json("Deleted")
          }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
  });

  // ================================================================== End DELETE requests

  // =========================================== PUT requests

//   When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If the request body is missing the `name` or `bio` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

// - If there's an error when updating the _user_:

//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The user information could not be modified." }`.

// - If the user is found and the new information is valid:

//   - update the user document in the database using the new information sent in the `reques body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _user document_.

// server.put('/api/users/:id', (req,res) => {
//     const { id } = req.params;
//     const {name, bio} = req.body;
//     const user = { name, bio };
//     db.update(id , user)
//     .then(count => {

//     })
    
// })

//======================================================================== End PUT requests

server.listen(4000, () => {
    console.log('\n** Running on port 4000 **\n')
});

// You could do this:
// server.listen(port, () => {
//     console.log('\n** Running on port 4000 **\n', port)
// });