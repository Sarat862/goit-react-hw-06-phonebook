import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import { addContact, removeContact } from "redux/contacts/contacts-slice";
import { setFilter } from "redux/filter/filter-slice";

export const App = () => {

  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const formSubmitHandler = (contact) => {
    if (isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }

    const action = addContact(contact);
    dispatch(action);
    // setContacts((prev) => {
    //   const newContact = {
    //     id: nanoid(),
    //     ...contact
    //   }
    //   return [...prev, newContact]
    // })
  }

  const onRemoveContact = (id) => {
    const action = removeContact(id);
    dispatch(action);
    // setContacts((prev) => {
    //   const newContacts = prev.filter((contact) => contact.id !== id);
    //   return newContacts;
    // })
  }

  const handleChange = (e) => {
    const {value} = e.target;
    dispatch(setFilter(value));
  }

  function isDublicate({ name }) {
    const result = contacts.find((contact) => contact.name === name);
    return result;
  }
  
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleChange} />
        <ContactList items={contacts} onRemoveContact={onRemoveContact} />
      </div>
    );
}