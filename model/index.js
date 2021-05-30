const fs = require('fs/promises')
const path =require('path')
const {v4: uuid} =require('uuid')

const readData = async() =>{
  const data =await fs.readFile(path.join(__dirname,'contacts.json'), 'utf8');
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (contactId) => {
  const data = await readData()
  const [contact]= data.filter(contacts=>String(contacts.id) === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const data = await readData()
  const newContacts= data.filter(contacts=>String(contacts.id) !== contactId)
  if (newContacts.length !== data.length){
    await fs.writeFile(path.join(__dirname,'contacts.json'), JSON.stringify(newContacts));
    return `Contact ${contactId} deleted`
  }
  return false
}

const addContact = async (body) => {
  const id=uuid()
  const contact={id, ...body} 
  const data = await readData()
  data.push(contact)
  await fs.writeFile(path.join(__dirname,'contacts.json'), JSON.stringify(data));
  return contact

}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const [contact]= data.filter(contacts=>String(contacts.id) === contactId)
  if (contact){
    Object.assign(contact, body)
    await fs.writeFile(path.join(__dirname,'contacts.json'), JSON.stringify(data));
    return contact
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
