<template>
  <div class="flex flex-col gap-4">

    <div class="flex flex-col text-white">
      <div class="text-white">
        Name: {{contactData.name}}
      </div>
      <div class="text-white">
        Phone: {{contactData.phone}}
      </div>
      <div class="text-white">
        email: {{contactData.email}}
      </div>
      <div class="text-white">
        tags: {{contactData.tags}}
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
const contactData = ref({})
onBeforeMount(()=> {
  init()
})
function init() {
  const user: any = contactsStore.getContactById(props.contactId)
  contactData.value = {...user}
  multiselectValue.value = tagsStore.transformUserTags(user.tags) || []
}


</script>