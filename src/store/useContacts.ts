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
    },
    deleteContactTag(tagId: string, contactId: string) {
      const indexOfContact = this.contacts?.findIndex((contact) => contact.id === contactId)
      const indexOfTagInContact = this.contacts[indexOfContact].tags?.findIndex((tag) => tag.id === tagId)

      // Start of filtered list
      const start = this.contacts[indexOfContact]?.tags.slice(0, indexOfTagInContact)
      // End of filtered list
      const end = this.contacts[indexOfContact].tags.slice(indexOfTagInContact + 1)
      // merging start and end
      this.contacts[indexOfContact].tags = [...start, ...end]
    }
  },
  getters: {
    filteredContacts: (state) => {
      return (searchData: any | TagsDataType[] | [] | string, type: string) => {
          if(searchData && searchData.length > 0 && type) {
            switch (type) {
              case 'name':
              case 'email':
              case 'phone':
                return state.contacts.filter((item:ContactDataType)=>{
                  return item[type].toLowerCase().includes(searchData.toLowerCase())
              });
              case 'tags':
                return state.contacts.filter((item: ContactDataType)=> {
                  return item.tags.some((userTag: TagsDataType)=>
                      {
                        console.log(userTag, searchData)
                        return searchData.some((searchTag: {id: string}) => {
                          return searchTag.id === userTag.id})
                      }
                  )
                });
              default:
                return state.contacts
            }
          } else {
            return state.contacts
          }
        }
      },
    getContactById: (state) => {
      return (userId: string) => {
        return state.contacts.find((listItem: ContactDataType)=> listItem.id === userId)
      }
    },
  }
});
