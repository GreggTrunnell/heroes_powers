const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const searchQuery = req.query.q || '';
  const queryText = `
SELECT heroes.name AS "hero", heroes.alias AS "alias", super_powers.name AS "super power",
super_powers.description AS "description", heroes_powers.power_level AS "power_level"
FROM super_powers
JOIN heroes_powers ON super_powers.id = heroes_powers.super_power_id
JOIN heroes ON heroes.id = heroes_powers.hero_id
WHERE heroes.name ILIKE $1
OR heroes.alias ILIKE $1
OR super_powers.name ILIKE $1
OR (CAST(heroes_powers.power_level AS TEXT) ILIKE $1);
`;

const values = [`%${searchQuery}%`];

  pool.query(queryText, values)
    .then((result) => {
      console.log('Query successful:', result.rows);
      res.json(result.rows); 
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.sendStatus(500);
    });
});

  router.post('/', (req, res)=>{
    let playerData = req.body;
    console.log('Adding todo POST in router', playerData);
    let queryText= `INSERT INTO players ("first_name","last_name","playing_hand","raquet_brand")
    VALUES ( $1, $2, $3, $4 );`
    pool.query(queryText, [ playerData.first_name, playerData.last_name, playerData.playing_hand, playerData.raquet_brand])
    .then(result=>{
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error POST router`, error)
        res.sendStatus(500);
    })
})
module.exports = router;