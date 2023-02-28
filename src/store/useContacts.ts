import { ref, Ref, reactive } from "vue";
import { defineStore } from "pinia";
import { Contact } from "@/typing/types/contacts";
import {leaveOnlyId, phoneMaskClean, saveToLocal} from "@/helpers";

export const useContactsStore = defineStore("contactsStore", () => {
  const contacts: Ref<Contact[] | [] | any> = ref([]);
  const status = reactive({
    loading: false,
    error: false,
  });
  function initialize() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'))
    if(localContacts) {
      contacts.value = localContacts
    }
  }
  function updateContacts() {
    initialize();
  }
  function addContact(data: Contact) {
    contacts.value.push({...data, id: crypto.randomUUID(), phone: phoneMaskClean(data.phone), tags: leaveOnlyId(data.tags)});
    saveToLocal('contacts', contacts.value)
  }
  function deleteContact(id: string) {
    const index = contacts.value.findIndex((item) => item.id ===id)
    contacts.value.splice(index, 1)
    saveToLocal('contacts', contacts.value)
  }

  return { contacts, initialize, updateContacts, addContact, status, deleteContact };
});
