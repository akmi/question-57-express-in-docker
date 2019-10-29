var express = require('express');
var router = express.Router();

let data = {};

/* GET home page. */
router.get('/:product_id', function (req, res, next) {
  if (!data.hasOwnProperty(req.params.product_id)) {
    res.status(400).send('Not Found');
    return;
  }
  const resData = {
    data: data[req.params.product_id]
  };
  res.send(resData);
});

router.post('/products', function (req, res, next) {
  console.log(req.body);
  const reqData = req.body;
  const prevIds = Object.keys(data);
  const id = prevIds.length ? 1 + parseInt(prevIds[prevIds.length - 1]) : 1;
  // console.log('id ', id, Object.keys(data), Object.keys(data)[data.length - 1]) ;
  // if (!data) {
  //   id = 1;
  // } else {
  //   id = Object.keys(data)[data.length - 1] + 1;
  // }
  data[id] = {id: id, ...reqData};
  res.send(data[id]);
});

router.delete('/products/:product_id', function (req, res, next) {
  if (!data.hasOwnProperty(req.params.product_id)) {
    res.status(400).send('Product does not exist');
  }
  delete data[req.params.product_id];
  res.status(200).send('Deleted successfully');
});

router.put('/products/:product_id', function (req, res, next) {
  const id = req.params.product_id;
  if (!data.hasOwnProperty(id)) {
    res.status(400).send('Product does not exist');
  } else {
    data[id] = {...data[id], ...req.body};
    res.send({status: 'success'});
  }
});

module.exports = router;
