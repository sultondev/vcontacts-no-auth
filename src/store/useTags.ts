import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { TagsDataType } from "@/typing/types/tags";
export const useTagsStore = defineStore("useTagsStore", () => {
  const tags: Ref<TagsDataType[] | [] | any> = ref([]);
  function initialize() {
    const localTags = JSON.parse(localStorage.getItem('tags'))
    if(localTags) {
      tags.value = localTags
    }
  }
  function findTagById(id: number | string) {
    return tags.value.find((element: TagsDataType) => element.id == id).title;
  }
  function createTag(title: string) {
    const newTag = {title, id: crypto.randomUUID()}
    tags.value.push(newTag)
    localStorage.setItem('tags', JSON.stringify(tags.value))
  }

  return { tags, initialize, findTagById, createTag };
});
