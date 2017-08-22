import cv from './converter';
import dc from './dateConverter';
import { STARS } from '../types/questions';

const processQuiz = (quiz) => {
  quiz = [...quiz.rows];

  const res = {};
  res.id = quiz[0].id;
  res.title = quiz[0].title;
  res.isAnon = cv.strToBool(quiz[0].isAnon);
  res.isRand = cv.strToBool(quiz[0].isRand);
  res.date = dc.getDDMMYYYY(quiz[0].date);

  const questions = [];

  quiz.forEach((item) => {
    if (!itemExist(questions, item.question_id)) {
      const question = {};
      question.title = item.question_title;
      question.type = item.type;
      question.isRequired = cv.strToBool(item.isRequired);
      question.id = item.question_id;
      question.options = item.type < STARS ? [] : null;
      questions.push(question);
    }
  });

  quiz.forEach((item) => {
    if (item.type < STARS) {
      questions[indexOfById(questions, item.question_id)].options.push({
        id: item.option_id, value: item.text,
      });
    }
  });

  res.questions = questions;

  return res;
};

const itemExist = (arr, id) => arr.find(item => item.id === id);

const indexOfById = (arr, id) => arr.findIndex(item => item.id === id);

export default processQuiz;
export {
  itemExist,
  indexOfById,
};
