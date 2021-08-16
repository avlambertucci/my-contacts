const { v4 } = require('uuid');
const db = require('../../app/database')

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

  async create({name,email,phone,category_id}) {
    // Using $1 instead of interpolation to get rid of sql injections
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row
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


