var express = require('express');
var router = express.Router();
var axios = require('axios');

const record = [];

router.get('/global', (req, res) => {

  axios.get("http://api.coronatracker.com/v3/stats/custom-debug")
    .then(response => {
      console.log(response.data)
      const cases = response.data.map(country => country.confirmed).reduce((a, b) => a + b)
      record.push({ type: "global", input: "N/A", cases })
      res.render('global', { cases, title: "Global coronavirus confirmed cases" })
    })

})

router.post('/country', (req, res, next) => {

  axios.get("http://api.coronatracker.com/v3/stats/custom-debug")
    .then(response => {
      const country = response.data.find((e => e.countryCode.toLowerCase() == req.body.country.toLowerCase())
        || (e.countryName.toLowerCase() == req.body.country.toLowerCase()))
      if (!country)
        return next(new Error("Country name or code dose not exist"))
      record.push({ type: "country", input: country.countryCode, cases: country.confirmed })
      res.render('country', { cases: country.confirmed, title: `${req.body.country.toUpperCase()} coronavirus confirmed cases` })
    })

})

router.post('/state', (req, res, next) => {
  axios.get("https://coronavirus-us-api.p.rapidapi.com/api/state/all", {
    headers: {
      "x-rapidapi-key": "ec4d2a1fb9msh524ccc9136d8aa2p1ad74ajsnc9a65e48254f",
      "x-rapidapi-host": "coronavirus-us-api.p.rapidapi.com",
      "useQueryString": true
    }
  }).then(response => {
    let state = response.data.locations.find(s => s.state.toLowerCase() == req.body.state.toLowerCase())
    if (!state)
      return next(new Error("State name dose not exist"))
    record.push({ type: "state", input: state.state, cases: state.latest.confirmed })
    res.render("state", { title: `${req.body.state.toUpperCase()} coronavirus confirmed cases`, cases: state.latest.confirmed })
  })
})

router.get('/records', (req, res, next) => {
  res.render("records", { title: `User input records:`, records: record })
})





module.exports = router;
