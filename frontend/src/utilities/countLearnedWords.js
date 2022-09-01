export const countLearnedWords = (lessons) => {
  let count = 0;
  if (Array.isArray(lessons)) {
    lessons.forEach((lesson) => {
      count += lesson.learned_words.length;
    });
  } else {
    lessons.learned_words.forEach((word) => {
      count += word.choice.is_correct ? 1 : 0;
    });
  }
  return count;
};
