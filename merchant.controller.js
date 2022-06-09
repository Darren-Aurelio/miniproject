let Validator = require('validatorjs');
const models = require('../models/index')

function insertMerchant(req, res){
    let data = req.body
    models.Merchant.create(data)

    return res.send({ message: 'Data has been inserted', data: data})
}

async function listMerchant(req,res) {
    const result = await models.Merchant.findAll()
    if(result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

async function detailMerchant(req,res) {
    const result = await models.Merchant.findOne({ where: { id: req.params.id } })
    if (!result) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

function updateMerchant(req,res) {
    let data = req.body
    models.Merchant.update(data, { where: { id: req.params.id } })

    return res.send({ message: 'Data has been updated', data: req.body })
}

function deleteMerchant(req,res) {
    models.Merchant.destroy({ where: { id: req.params.id } })
    return res.send({ message: 'Data has been deleted' })
}

let data = {
    password: 'felix123',
    name: 'felix',
    address: 'jakarta jln loren',
    join_date: '21/07/07',
    phone_number: '0823189043'
};

let rules={
    password: 'required',
    name: 'required|min:3|max:50',
    address: 'required',
    join_date: 'required',
    phone_number: 'required'
  };
  
  let validation = new Validator(data, rules);
  
  if(validation.passes()) {
    console.log("Success!")
  } else {
    console.error("Error", validation.errors.all())
  }

module.exports = {
    insertMerchant,
    listMerchant,
    detailMerchant,
    updateMerchant,
    deleteMerchant
}