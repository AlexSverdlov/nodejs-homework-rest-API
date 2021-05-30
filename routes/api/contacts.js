const express = require('express')
const router = express.Router()
const contacts= require('../../model')
const {ValidationNewContact, ValidationEditContact} = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const result=await contacts.listContacts() 
    res.json({ status: 'success', code : 200, data:{result}  })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result=await contacts.getContactById(req.params.contactId) 
    if (result){
      return res.json({ status: 'success', code : 200, data:{result}  })
    }
    return res.json({ status: 'error', code : 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', ValidationNewContact, async (req, res, next) => {
  try {
    const result=await contacts.addContact(req.body) 
    res.status(201).json({ status: 'success', code : 201 , data:{result} })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result=await contacts.removeContact(req.params.contactId)
    if (result){
    return res.status(201).json({ status: 'success', code : 200 , data:{result} })
    }
    return res.json({ status: 'error', code : 404, message: 'Not found' }) 
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', ValidationEditContact, async (req, res, next) => {
  try {
    const result=await contacts.updateContact(req.params.contactId,req.body) 
    console.log(result);
    if (result){
      return res.status(201).json({ status: 'success', code : 200 , data:{result} })
      }
      return res.json({ status: 'error', code : 404, message: 'Not found' }) 
    } catch (error) {
    next(error)
  }
})

module.exports = router