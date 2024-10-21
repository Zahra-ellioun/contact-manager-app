import { object, string, number } from "yup";

export let addContactValidationSchema = object({
  full: string().required("نام و نام خانوادگی الزامی می باشد "),
  photo: string().url("لینک درست نمی باشد"),
  mobile: number()
    .required("شماره موبایل الزامی می باشد ")
    .positive()
    .integer(),
  email: string()
    .required("ایمیل الزامی می باشد ")
    .email("ایمیل معتبر نمی باشد"),
  job: string().nullable(),
  group: string().required("انتخاب گروه الزامی می باشد"),
});
