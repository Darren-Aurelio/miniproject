let Validator = require('validatorjs');
const models = require('../models/index') 

function insertProdinfo(req, res) {
    let form = req.body
    models.prodinfos.create(form)

    return res.send({ message: 'Data has been created', data: form })
}

async function listProdinfo(req, res) {
    const result = await models.prodinfos.findAll()
    if (result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

async function detailProdinfo(req, res) {
    const result = await models.prodinfos.findOne({ where: { id: req.params.id } })
    if (!result) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

function updateProdinfo(req, res) {
    let data = req.body
    models.prodinfos.update(data, { where: { id: req.params.id } })
    
    return res.send({ message: 'Data has been updated', data: req.body })
}

function deleteProdinfo(req, res) {
    models.prodinfos.destroy({ where: { id: req.params.id } })
    return res.send({ message: 'Data has been deleted' })
}


let data = {
    name: 'banana',
    quantity: '2',
    price: '20000'
};

let rules={
    name: 'required|min:3|max:50',
    quantity: 'required|numeric|min:1',
    price: 'required|numeric|min:10000'
  };
  
  let validation = new Validator(data, rules);
  
  if(validation.passes()) {
    console.log("Success!")
  } else {
    console.error("Error", validation.errors.all())
  }

module.exports = {
    insertProdinfo,
    listProdinfo,
    detailProdinfo,
    updateProdinfo,
    deleteProdinfo
}