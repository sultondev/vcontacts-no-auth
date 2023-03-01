<template>
  <form @submit.prevent="updateContact" class="flex flex-col gap-4">
    <FormGroup title="Name" class="text-white">
      <Input
          :text="formData.values.name"
          @input-change="handleInputChange"
          :error="formData.$v?.value.name.$error"
          class="py-1 px-2 rounded-md border-2 bg-white text-black"
          max="30"
          min="3"
          field-key="name"
          placeholder="Enter your name"
      />
    </FormGroup>
    <FormGroup title="Phone" class="text-white">
      <Input
          :text="formData.values.phone"
          @input-change="handleInputChange"
          :error="formData.$v?.value.phone.$error"
          prefix-classes="mr-1"
          class="py-1 px-2 rounded-md border-2 bg-white text-black"
          prefix="+998"
          maskaOptions="## ###-##-##"
          placeholder="00 000-00-00"
          field-key="phone"
      />
    </FormGroup>
    <FormGroup title="Email" class="text-white">
      <Input
          :text="formData.values.email"
          @input-change="handleInputChange"
          :error="formData.$v?.value.email.$error"
          prefix-classes="mr-1"
          class="py-1 px-2 rounded-md border-2 bg-white text-black"
          field-key="email"
          placeholder="Enter username or email"
      />
    </FormGroup>
    <FormGroup title="Tags" header-classes="text-white mb-2">
      <Multiselect v-model="multiselectValue" placeholder="Search or add a tag"
     label="name" track-by="id" class="max-w-[315px]" :options="tagsStore?.tagOptions" :multiple="true">
      </Multiselect>
    </FormGroup>

    <Button
        type="submit"
        :loading="false"
        aria-label="Submit"
        spinner-color="#cdcdcd"
        class="bg-[#2A0096] transition-all duration-600 hover:bg-[#0080D0] text-white py-2 rounded-xl text-center disabled:opacity-50"
        :disabled="
        formData.$v?.value.phone.$error || formData.$v.value.name.$error
      "
    >
      Update
    </Button>
  </form>
</template>

<script setup lang="ts">
import { minLength, required, email } from "@vuelidate/validators";
import {onBeforeMount, ref, Ref} from 'vue'
import {useContactsStore} from "@/store/useContacts";
import Input from "@/components/UI/Input.vue";
import Multiselect from 'vue-multiselect'
import FormGroup from "@/components/UI/FormGroup.vue";
import {useForm} from "@/composables/useForm";
import {useTagsStore} from "@/store/useTags";
import {leaveOnlyId} from "@/helpers";
import {TagsDataType} from "@/typing/types/tags";


interface Props {
  contactId: string
  modalKey?: string
}

interface Emits {
  (e: 'closeModal', value?: string): void
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()
const contactsStore = useContactsStore()
const tagsStore = useTagsStore()
const multiselectValue: Ref<TagsDataType[] | []> = ref([])
const formData: any = useForm({
  name: "",
  phone: "",
  email: "",
  tags: []
}, {
  name: {
    required,
    minLength: minLength(2),
  },
  phone: {
    required,
    minLength: minLength(12)
  },
  email: {
    required,
    email,
  }})

onBeforeMount(()=> {
  init()
})
function init() {
  const user: any = contactsStore.getContactById(props.contactId)
  formData.values.name = user.name
  formData.values.email = user.email
  formData.values.phone = user.phone
  formData.values.tags = []
  multiselectValue.value = tagsStore.transformUserTags(user.tags) || []
}

function handleInputChange(value: string, key: string) {
  formData.values[key] = value;
}

function updateContact() {
  formData.$v.value.$touch();
  if(!formData.$v.value.$invalid) {
    formData.values.tags = leaveOnlyId(multiselectValue.value)
    contactsStore.putContact({...formData.values, id: props.contactId})
    contactsStore.saveContacts()
    emits('closeModal', props.modalKey || "")
  }
}

</script>