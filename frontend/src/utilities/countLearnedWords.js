export const countLearnedWords = (lessons) => {
  let count = 0;
  lessons.forEach((lesson) => {
    count += lesson.learned_words.length;
  });
  return count;
};
