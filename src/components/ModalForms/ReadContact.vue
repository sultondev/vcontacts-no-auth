<template>
  <div class="flex flex-col gap-4 px-2 min-w-[320px]">
    <div class="flex flex-col gap-2 text-white">
      <div class="p-2 text-white">
        Name: {{contactData?.name}}
      </div>
      <div class="p-2 text-white">
        Phone: {{contactData?.phone}}
      </div>
      <div class="p-2 text-white">
        email: {{contactData?.email}}
      </div>
      <div class="p-2 flex gap-2 text-white w-full">
        <span>
        tags:
        </span>
        <span class="flex gap-2 flex-wrap max-w-[300px] " v-if="contactData.tags.length">
          <span v-for="item in contactData?.tags" class="hashtag my-1 w-fit">
            {{ tagsStore.findTagById(item.id) }}
          </span>
        </span>
        <span class="" v-else>
          Empty
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { minLength, required, email } from "@vuelidate/validators";
import {onBeforeMount, ref, Ref} from 'vue'
import {useContactsStore} from "@/store/useContacts";
import {useTagsStore} from "@/store/useTags";
import {leaveOnlyId} from "@/helpers";
import {TagsDataType} from "@/typing/types/tags";


interface Props {
  contactId: string
  modalKey?: string
  fieldsList?: []
}

interface Emits {
  (e: 'closeModal', value?: string): void
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const contactsStore = useContactsStore()
const tagsStore = useTagsStore()
const multiselectValue: Ref<TagsDataType[] | []> = ref([])
const contactData: any = ref({})
onBeforeMount(()=> {
  init()
})
function init() {
  const user: any = contactsStore.getContactById(props.contactId)
  contactData.value = {...user}
  multiselectValue.value = tagsStore.transformUserTags(user.tags) || []
}


</script>