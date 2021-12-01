const { Router } = require('express');

const router = new Router();

router.get('/test', (req, res) => {
    const data = {
        name: 'Alkemy',
        website: 'test.alkemy'
    };
    res.json(data);
});  

module.exports = router;