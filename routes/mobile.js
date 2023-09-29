var express = require('express');
var router = express.Router();


//render ra form nhập liệu bằng method GET
router.get('/add', (req, res) => {
    res.render('mobile/add'); //render filr "views/mobile/add.hbs"
})

router.post('/view', (req, res) => {
    //lưu dữ liệu nhập từ form
    var data = req.body;
    //render ra file view và gửi kèm dữ liệu nhập từ form
    res.render('mobile/view', {
        mobile : data
    });
})

module.exports = router;