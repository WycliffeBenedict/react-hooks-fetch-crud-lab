import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDeleteQuestion(deletedId) {
    fetch (`http://localhost:4000/questions/${deletedId}`, { method: "DELETE"})
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== deletedId));
      });
  }

  function handleUpdateQuestion(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then(() => {
        setQuestions(
          questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      });
  }


 return (
  <section>
    <h1>Quiz Questions</h1>
    <ul>
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion} 
        />
      ))}
    </ul>
  </section>
 )
}  

export default QuestionList;
