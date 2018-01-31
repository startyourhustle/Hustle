require('dotenv').config()

const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../modules/pool.js');
const path = require('path');
const nodemailer = require('nodemailer');
const Chance = require('chance')
                chance = new Chance();

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
              type: 'OAuth2',
              clientId: '360485416428-s79cfmrp2mgkkphdih1uc1oumc9j4su8.apps.googleusercontent.com',
              clientSecret: 'JFjG6jMjHRmP-CtPNrPWfo5c'
          
    }
  });

  //Put for placing reset code into 
router.put('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
            done();
        } 
        user = result.rows[0];
        if (!user) {
            done();
            res.sendStatus(404);
        } else {
            let code = chance.string({length: 15, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});

            
            client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
});

router.put('/', function (req, res) {
    
console.log(email);

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            done();
        } else {
            client.query("SELECT * FROM users WHERE email = $1", [req.body.email], function (errorMakingDatabaseQuery, result) {
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    done();
                }

                user = result.rows[0];

                if (!user) {
                    done();
                    res.sendStatus(404);
                } else {
                    var code = chance.string({ length: 16, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

                    client.query('UPDATE users SET code = $1 WHERE email = $2;', [code, req.body.email], function (err, result) {
                        done();
                        if (err) {
                            console.log('query err ', err);
                            res.sendStatus(500);
                        } else {
                            let mailOptions = {
                                from: '"Hustle" <startyourhustle@gmail.com>', 
                                to: req.body.email,
                                subject: `HUSTLE: Password Reset`, 
                                html:  `<h1>Hello!!</h1><h3>Use the following link to reset your password:</h3>
                                <ul><a href="http://localhost:5000/#/reset/password/${code}">Click Here</a></ul>
                                    <p>Thank you</p>`,                              
                                auth: {
                                    user: 'startyourhustle@gmail.com',
                                    refreshToken: process.env.NODEMAILER_REFRESHTOKEN,
                                    accessToken: process.env.NODEMAILER_ACCESSTOKEN
                                }
                            };
                            
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.send(error);
                                }
                                console.log('Email sent: ', info.response);
                                res.sendStatus(200);
                            });
                            res.sendStatus(200);
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;
