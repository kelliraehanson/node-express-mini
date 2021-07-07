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
      res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
  });

  server.get("/api/users/:id", (req, res) => {
    const id  = req.params.id; //or could be db.findById(req.params.id)
    db.findById(id)
    .then(user => {
        // this says to either return the user id or the 404 message
        if (user) {
            res.status(200).json(user);
        } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." }) // If there is a user send the user/response.
        }
    })
    .catch(err =>
    res.status(500)
    .json({ error: "The users information could not be retrieved." })
    )
})

//======================================================================== End GET requests


// ============================ DELETE requests

server.delete("/api/users/:id", (req, res) => {
    userId = req.params.id;
    db.remove(userId)
      .then(deleted => {
        if (deleted) {
          db.find()
            .then(users => res.status(200).json(users))
            .catch(() => res.status(500).json({ error: "Error" }));
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The user could not be removed." });
      });
  });

  // ================================================================== End DELETE requests

  // =========================================== PUT requests

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      db.update(id, changes)
        .then(user => {
          if (user) {
            db.find()
              .then(users => res.status(200).json(users))
              .catch(() => res.status(500).json({ error: "Error" }));
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
          }
        })
        .catch(() =>
          res
            .status(500)
            .json({ error: "The user information could not be modified." })
        );
    }
  });

//======================================================================== End PUT requests

server.listen(4000, () => {
    console.log('\n** Running on port 4000 **\n')
});

// You could do this:
// server.listen(port, () => {
//     console.log('\n** Running on port 4000 **\n', port)
// });