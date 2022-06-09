const models = require('../../models/index')

function insertTodo(req, res){
    let data = req.body
    models.Todo.create(data)

    return res.send({ message: 'Data has been inserted', data: data})
}

async function listTodo(req,res) {
    const result = await models.Todo.findAll()
    if(result.length < 1) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

async function detailTodo(req,res) {
    const result = await models.Todo.findOne({ where: { id: req.params.id } })
    if (!result) {
        return res.status(204).send({ message: 'Data is empty' })
    }
    return res.send({ message: 'Data is found', data: result })
}

function updateTodo(req,res) {
    let data = req.body
    models.Todo.update(data, { where: { id: req.params.id } })

    return res.send({ message: 'Data has been updated', data: req.body })
}

function deleteTodo(req,res) {
    models.Todo.destroy({ where: { id: req.params.id } })
    return res.send({ message: 'Data has been deleted' })
}

module.exports = {
    insertTodo,
    listTodo,
    detailTodo,
    updateTodo,
    deleteTodo
}