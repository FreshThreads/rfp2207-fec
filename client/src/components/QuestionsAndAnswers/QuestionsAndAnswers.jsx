import React from 'react';
import {useState, useEffect} from 'react';
import Header from "./QAHeader.jsx";
import {qaDummyData} from "./qaDummyData.js";
import QAEntry from "./QAEntry.jsx";
import QuestionModal from "./QuestionModal.jsx";
import AnswerModal from "./AnswerModal.jsx"
import http from "./httpReqsForQA.js";

function QuestionsAndAnswers({id}) {
  const [mainQA, setQA] = useState([]); // stores the data that currently is dummyData

  // initial get request to get all questions for a specified product id
  useEffect(() => {
    http.getQuestions(id)
      .then((res) => {setQA(res.data.results)})
      .catch((err) => {console.error(err)})
  }, [])





  // hook for toggling question modal
  const [openModal, setOpenModal] = useState(false);

  // hook for toggling accordion
  const [clicked, setClicked] = useState("0")
  // update state if a particular question is clicked
  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  }

  // state hook for showing more questions
  // increment by 2 every time you click the "more answered questions" button
  const [questionsCount, incrementQuestions] = useState(2)

  return (
    <div>

      <ul className="qa-accordion">
        <Header />
        <div>{console.log('in div with results: ', mainQA)}</div>
        {mainQA.slice(0, questionsCount).map((question, index) => (
          <QAEntry
            product_id={id}
            question={question}
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            />
        ))}

      </ul>
      {qaDummyData.slice(questionsCount).length > 0
        &&
        <button className="qa-moreQuestions"
          onClick={() => incrementQuestions(questionsCount + 2)}
        >
          More Answered Questions
        </button>
        }
        <button
        className="qa-newQuestionBtn"
        onClick= {() => {setOpenModal(true)}}
        >
        Add a question
        </button>
        {openModal && <QuestionModal closeModal={setOpenModal} />}
    </div>
  )

}

export default QuestionsAndAnswers