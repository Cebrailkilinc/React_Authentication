import * as yup from "yup";

const validationsRegister = yup.object().shape({
    email: yup
        .string()
        .email("Geçerli bir email giriniz.")
        .required("Zorunlu Alan"),
    password: yup
        .string().min(6, "Parolanız e az 6, en fazla 20 karakter olmalıdır")
        .max(20, "Parolanız e az 6, en fazla 20 karakter olamalıdır.")
        .required("Zorunlu Alan"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Parolalar uyuşmuyor")
        .required("Zorunlu Alan"),

})

export default validationsRegister;