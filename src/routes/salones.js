const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLogin}=require('../lib/seguridad');

router.get('/salones',isLogin, async (req, res) => {

    const salones = await pool.query('SELECT * FROM salons ORDER BY id ASC');
    console.log(salones);

    res.json(salones);
});

module.exports = router;

