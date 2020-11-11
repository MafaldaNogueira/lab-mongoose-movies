
const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');


router.get('/celebrities', (req,res) => {
  Celebrity.find()
  .then((celebritiesFromDB) => {
    res.render('celebrities/index.hbs', {celebrities: celebritiesFromDB})
  })
  .catch((err) =>  {
    res.render('error', {err});
  })
});


router.post('/celebrities', (req,res) => {
  let { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  }).then(() => {
    res.redirect('celebrities/')
  })
  .catch((err) =>  {
    res.render('error', {err});
  })
});


router.get('/celebrities/new', (req,res) => {
    res.render('celebrities/new');
  });




router.get('/celebrities/:celebrityId', (req,res) => {
  let celebrityId = req.params.celebrityId;
  Celebrity.findById(celebrityId)
  .then((theCelebrityFound) => {
      res.render('celebrities/show', {celebrity: theCelebrityFound});
    })
  .catch((err) => {
    res.render('error',{err});
  })
  });



  router.post('/celebrities/:celebrityId/delete', (req,res) => {
    let celebrityId = req.params.celebrityId;
    Celebrity.findByIdAndDelete(celebrityId)
  .then(() => {
      res.redirect('/celebrities');
    });
  });

  router.get('/celebrities/:celebrityId/edit', (req,res) => {
    let celebrityId = req.params.celebrityId;
    Celebrity.findById(celebrityId)
    .then((theCelebrityFound) => {
        res.render('celebrities/edit', {celebrity: theCelebrityFound});
      })
    })

    router.post('/celebrities/:celebrityId/edit', (req,res) => {
      let celebrityId = req.params.celebrityId;
      let { name, occupation, catchPhrase } = req.body;
      Celebrity.findByIdAndUpdate(celebrityId, {
       name,
       occupation,
       catchPhrase
      }).then(() => {
        res.redirect('/celebrities');
      });
    });

module.exports = router;

