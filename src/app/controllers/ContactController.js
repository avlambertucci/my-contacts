const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // List all
  async index(request, response) {
    const contacts = await ContactRepository.findAll();
    response.json(contacts);
  }
  // List One.
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not found' });
    }
    response.json(contact);
  }

  async store(request,response) {
    const {name, email, phone, category_id} = request.body;

    if(!name){
      return response.status(400).json({error: 'Name is required'})

    }
    const contactExists = await ContactRepository.findByEmail(email)

    if(contactExists) {
      return response.status(400).json({error: 'Contact email has already been taken'})
    }

    const contact = await ContactRepository.create({name,email,phone,category_id,})
    response.json(contact);

  }

  async update(request,response) {
    const { id } = request.params
    const {name, email, phone, category_id} = request.body;

    // look for the contact with same ID in REPOSITORY
    const contactExists = await ContactRepository.findById(id)
    if (!contactExists) {
      return response.status(401).json({ error: 'User not found' });
    }
    if(!name){
      return response.status(400).json({error: 'name is required!'})
    }

    const contactByEmail = await ContactRepository.findByEmail(email)

    if(contactByEmail && contactByEmail.id !== id){
      return response.status(400).json({error: 'this email is in use'})
    }
    const contact = await ContactRepository.update(id,
      {name, email, phone, category_id
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    // console.log(contact)
    if (!contact) {
      return response.status(401).json({ error: 'User not found' });
    }
    await ContactRepository.deleteById(id);
    response.sendStatus(204);
  }
}
// Singleton
module.exports = new ContactController();
