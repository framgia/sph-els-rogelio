import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required("Name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Repeat Password is required"),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const lessonValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const wordChoiceValidationSchema = yup.object().shape({
  word: yup.string().required("Word is required"),
  usage: yup.string().required("Input a sample usage of the word"),
  choices: yup
    .array()
    .of(
      yup.object().shape({
        choice: yup.string().required("Choice is required"),
        is_correct: yup.boolean(),
      })
    )
    .min(2, "Create at least 2 choices")
    .required("Choices for the words are required"),
  is_correct: yup.number().min(1, "Choose at least 1 correct answer"),
});

export const wordChoiceEditValidationSchema = yup.object().shape({
  word: yup.string().required("Word is required"),
  usage: yup.string().required("Input a sample usage of the word"),
  choices: yup
    .array()
    .of(
      yup.object().shape({
        choice: yup.string().required("Choice is required"),
        is_correct: yup.boolean(),
        id: yup.number(),
      })
    )
    .min(2, "Create at least 2 choices")
    .required("Choices for the words are required"),
  is_correct: yup.number().min(1, "Choose at least 1 correct answer"),
});

export const lessonQuizValidationSchema = yup.object().shape({
  words: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      choice_id: yup
        .number()
        .positive("Choose an answer")
        .required("Choose an answer"),
    })
  ),
});

export const generalInfoValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required("Name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
});
