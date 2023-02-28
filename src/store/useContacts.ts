import { defineStore } from "pinia";
import {Contact, ContactDataType} from "@/typing/types/contacts";
import {leaveOnlyId, phoneMaskClean, saveToLocal} from "@/helpers";
import {TagsDataType} from "@/typing/types/tags";

interface StoreTypes {
  contacts: ContactDataType[] | []
}
export const useContactsStore: any = defineStore("contactsStore",  {
  state: () => ({
    contacts: [] as ContactDataType[]
  }),
  actions: {
      initialize() {
      const localContacts = localStorage.getItem('contacts')
      if(localContacts) {
        this.contacts = JSON.parse(localContacts)
      }
    },
    putContact(data: ContactDataType | any) {
      const index = this.contacts.findIndex((item: {id: string})=>{
        return item.id === data.id
      })
      this.contacts.splice(index, 1, data)
    },
    addContact(data: ContactDataType) {
      this.contacts.push({...data, id: crypto.randomUUID(), phone: phoneMaskClean(data.phone), tags: leaveOnlyId(data.tags)});
      saveToLocal('contacts',this.contacts)
    },
    deleteContact(id: string) {
      const index = this.contacts.findIndex((item) => item.id === id)
      this.contacts.splice(index, 1)
      saveToLocal('contacts', this.contacts)
    },
    saveContacts() {
        saveToLocal('contacts', this.contacts)
    }
  },
  getters: {
  filteredContacts: (state) => {
    return (searchTags: TagsDataType[] | []) => state.contacts.filter((item: ContactDataType)=> {
    if(searchTags && searchTags.length > 0) {
      return item.tags && item.tags.some((userTag: TagsDataType)=>
          {
            console.log(userTag, searchTags)
            return searchTags.some((searchTag) => {
              return searchTag.id === userTag.id})
          }
      )
    }
    return item
  })},
    getContactById: (state) => {
      return (userId: string) => {
        return state.contacts.find((listItem: ContactDataType)=> listItem.id === userId)
      }
    },
  }
});
