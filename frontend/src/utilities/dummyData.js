export const dummyLessons = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    id: 2,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    id: 3,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
];

export const dummyWordsChoices = [
  {
    id: 1,
    word: "Sample",
    usage: "Sample",
    choices: [
      {
        id: 1,
        choice: "Choice 1",
        is_correct: false,
      },
      {
        id: 2,
        choice: "Choice 2",
        is_correct: true,
      },
      {
        id: 3,
        choice: "Choice 2",
        is_correct: false,
      },
      {
        id: 4,
        choice: "Choice 2",
        is_correct: false,
      },
    ],
  },
  {
    id: 2,
    word: "Sample",
    usage:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    choices: [
      {
        id: 1,
        choice: "Choice 1",
        is_correct: false,
      },
      {
        id: 2,
        choice: "Choice 2",
        is_correct: true,
      },
      {
        id: 3,
        choice: "Choice 2",
        is_correct: false,
      },
      {
        id: 4,
        choice: "Choice 2",
        is_correct: false,
      },
    ],
  },
];

export const dummyWordsChoicesResult = {
  id: 1,
  title: "Lorem Ipsum",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
  learned_words: [
    {
      word_question: {
        id: 1,
        word: "Sample 1",
        choices: [
          {
            id: 1,
            choice: "Choice 1",
            is_correct: true,
          },
          {
            id: 2,
            choice: "Choice 2",
            is_correct: false,
          },
        ],
      },
      choice: {
        id: 1,
        choice: "Choice 1",
        is_correct: true,
      },
    },
    {
      word_question: {
        id: 2,
        word: "Sample 2",
        choices: [
          {
            id: 1,
            choice: "Choice 1",
            is_correct: true,
          },
          {
            id: 2,
            choice: "Choice 2",
            is_correct: true,
          },
        ],
      },
      choice: {
        id: 2,
        choice: "Choice 2",
        is_correct: true,
      },
    },
    {
      word_question: {
        id: 1,
        word: "Sample 3",
        choices: [
          {
            id: 1,
            choice: "Choice 1",
            is_correct: true,
          },
          {
            id: 2,
            choice: "Choice 2",
            is_correct: false,
          },
        ],
      },
      choice: {
        id: 2,
        choice: "Choice 2",
        is_correct: false,
      },
    },
    {
      word_question: {
        id: 1,
        word: "Sample 4",
        choices: [
          {
            id: 1,
            choice: "Choice 1",
            is_correct: true,
          },
          {
            id: 2,
            choice: "Choice 2",
            is_correct: true,
          },
        ],
      },
      choice: {
        id: 2,
        choice: "Choice 2",
        is_correct: true,
      },
    },
  ],
};
