import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { TagsDataType } from "@/typing/types/tags";
import {saveToLocal} from "@/helpers";
import {useContactsStore} from "@/store/useContacts";

export const useTagsStore = defineStore("useTagsStore", {
  state: ()=> ({
   tags: [] as TagsDataType[]
  }),
  getters: {
    tagOptions: (state) => {
      return state.tags.map((item: any) => ({ id: item.id, name: item.title })) || []
    },
  transformUserTags: (state): any => {
    return (tagsList: TagsDataType[]) => {
        return state.tags.filter((item: TagsDataType) => {
            return tagsList.some((tag) => tag.id === item.id)
        }).map(item=> ({id: item.id, name: item.title}))
    }
  }
  },
 actions: {
    initialize() {
    const localTags = localStorage.getItem('tags')
    if(localTags) {
      this.tags = JSON.parse(localTags)
    }
  },
  findTagById(id: number | string, contactId?: string) {
    const res = this.tags.find((element: TagsDataType) => element.id === id)?.title || false;
    if(res) {
        return res
    } else {
        const contactStore = useContactsStore()
        contactStore.deleteContactTag(id, contactId)
    }
  },
  createTag(title: string) {
    const newTag = {title, id: crypto.randomUUID()}
    this.tags.push(newTag)
    localStorage.setItem('tags', JSON.stringify(this.tags))
  },
  deleteTag(id: string | any) {
    const index = this.tags.findIndex((item: TagsDataType) => item.id ===id)
    this.tags.splice(index, 1)
    saveToLocal('tags', this.tags)
  }
 }
});
