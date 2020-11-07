const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const CONFIG = require('../configs/openapi');

router.route('/current')
    // .get(async (req, res, next) => {
    //  let result = await fetch(CONFIG.url + '?q='+ req.body.city+ '&units=metric&appid=' + CONFIG.key);
    //let weather = await result.json()
    //res.render('ps4',{title: "Weather!", city: weather.name, temperature: weather.main.temp});
    // res.render('ps4', {title: 'Today in Weather!', city: weather.name, temperature: weather.main.temp});

    //})
    .get(async (req, res, next) => {
        let result2 = await fetch(CONFIG.url + '/global');
        let confirm2 = await result2.json()
        res.render('global', {title: "Welcome!", cases: confirm2.totalConfirmed});
    })
    .post(async (req, res, next) => {

        let result = await fetch(CONFIG.url + '/country?countryCode=' + req.body.countryCode);
        let confirm = await result.json()
        res.render('country', {title: "Welcome!", cases2: confirm[0].totalConfirmed});

    })
module.exports = router;
