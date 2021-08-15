const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Armando',
    email: 'armando@example.com',
    category_id: v4(),
    phone: '9999',

  },
  {
    id: v4(),
    name: 'Ciclano',
    email: 'ciclano@example.com',
    category_id: v4(),
    phone: '222',

  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) =>  resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  create({name,email,phone,category_id}) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      }
      contacts.push(newContact)
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, category_id
  }){
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact)=>{
        return contact.id === id ? updatedContact : contact
      })
      resolve(updatedContact);

    });
  }
}

module.exports = new ContactRepository()


