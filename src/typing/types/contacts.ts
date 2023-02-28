import {TagsDataType} from "@/typing/types/tags";
import {MultiselectTypes} from "@/typing/types/global";

export type Contact = {
  id: string;
  name: string;
  phone: string;
};

export type ContactDataType = {
  id: string;
  name: string;
  phone: string;
  email: string;
  tags: TagsDataType[] | []
};

export type ContactSearchType = {
  data: string | any,
  type: string | any
  options: MultiselectTypes[]

}