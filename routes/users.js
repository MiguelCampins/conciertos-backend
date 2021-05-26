const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

/**
 * Crear usuario
 */
router.post("/", (req, res) => {
  // primero generamos la contraseña en hash
  const {password} = req.body.user; 

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // creamos el usuario
      const newUser = {...req.body.user,password: hashedPassword};
      User.create(newUser)
        .then((createdUser) => {
          // el usuario ha sido creado
          res.json(createdUser);
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 *Registrar usuario 
 */

 router.post("/register", (req, res) => {
  // primero generamos la contraseña en hash
  const {password} = req.body.user; 

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // creamos el usuario
      const newUser = {...req.body.user,password: hashedPassword};
      User.create(newUser)
        .then((createdUser) => {
          // el usuario ha sido creado
          res.json(createdUser);
        })
        .catch((err) => {
          //Guardamos el mensaje de error como objeto para despues acceder a las propiedades del error
          const {message} = err;
          res.status(500).json({ message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Show users
 */

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Show user by id
 */

 router.get("/:userId", (req, res) => {
  const _id = req.params.userId; 
  User.findById(_id, { useFindAndModify: false })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Delete users
 */

router.delete("/:userId", (req, res) => {
  const _id = req.params.userId;
  User.findByIdAndRemove(_id, { useFindAndModify: false })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

/**
 * Update user
 */
router.put("/:userId", (req, res) => {
  const _id = req.params.userId;
  const user = req.body;
  User.findByIdAndUpdate(_id, user, { new: true, useFindAndModify: false })
    .then((updateUser) => {
      res.json(updateUser);
    })
    .catch((err) => {
      const {message} = err;
      res.status(500).json({ message });
    });
});

/**
 * Login con jwt
 */
router.post("/login", (req, res) => {
  // miramos los parámetros
  if (req.body.email && req.body.password) {
    // buscamos si el usuario existe
    User.findOne({ email: req.body.email }).populate('userRoleId')
      .then((foundUser) => {
        if (foundUser) {
          // comparamos el password enviado y el de la base de datos
          bcrypt
            .compare(req.body.password, foundUser.password)
            .then((same) => {
              // comprobamos si es igual
              if (same) {
                // la contraseña es correcta así que creamos el jwt con expiración de una semana
                const token = jwt.sign(foundUser._doc, process.env.SECRET, {
                  expiresIn: constants.ONE_WEEK_EXPIRATION,
                });
                res.json({ user: foundUser, token });
              } else {
                res.status(500).json({ message: "Wrong password sent" });
              }
            })
            .catch((err) => {
              res.status(500).json({ message: err });
            });
        } else {
          res.status(500).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(500).json({ message: "Email or password not sent" });
  }
});

/**
 * Auto login
 */

router.post("/autoLogin", (req, res) => {
  const userId = req.body.userId;
  //Buscamos el usuario con esa Id en la base de datos
  User.findById(userId).then((foundUser) => {
    //Si encontramos el usuario en la base de datos desencriptar token
    if (foundUser) {
      const authHeader = req.get("Authorization");
      //Comprobamos que exista autorizacion
      if (authHeader) {
        //Si existe autorizacion cogemos el token
        const token = authHeader.split(" ")[1];
        //Decodificamos el token para descifrar el usuario
        jwt.verify(token, process.env.SECRET, (err, user) => {
          // si hay un error lo devolvemos
          if(err) {
            res.status(500).json({ message: err });
          }
          else if (user && user._id === userId) {
            //Si coninciden los id mandamos un ok
            res.json({ message: "ok" });
          } else {
            // no conciden los ids
            res.status(500).json({ message: "No authenticated" });
          }
        });
      } else {
        res.status(500).json({ message: "No authenticated" });
      }
    } else {
      //Si no se encuentra el usuario mandamos un error
      res.status(500).json({ message: "User not found" });
    }
  });
});

module.exports = router;
