import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const initialQuestion = {
  question: "",
  type: "text",
  options: ["", "", "", ""],
  expectedAnswer: [],
  rubric: "",
  rubricMaxScore: 10,
};

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([initialQuestion]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    const oldOption = updated[qIndex].options[optIndex];
    updated[qIndex].options[optIndex] = value;

    if (
      updated[qIndex].expectedAnswer.includes(oldOption) &&
      value.trim() !== oldOption
    ) {
      updated[qIndex].expectedAnswer = updated[qIndex].expectedAnswer.filter(
        (ans) => ans !== oldOption
      );
    }

    setQuestions(updated);
  };

  const toggleExpectedAnswer = (qIndex, optionValue) => {
    const updated = [...questions];
    const isSelected = updated[qIndex].expectedAnswer.includes(optionValue);
    updated[qIndex].expectedAnswer = isSelected
      ? updated[qIndex].expectedAnswer.filter((a) => a !== optionValue)
      : [...updated[qIndex].expectedAnswer, optionValue];
    setQuestions(updated);
  };

  const setSingleExpectedAnswer = (qIndex, optionValue) => {
    const updated = [...questions];
    updated[qIndex].expectedAnswer = [optionValue];
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...initialQuestion }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const validateQuiz = () => {
    if (!quizTitle.trim() || !dueDate || !dueTime || !duration) {
      alert("Please fill in all required quiz fields.");
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        alert(`Please fill in question ${i + 1}.`);
        return false;
      }
      if (q.type !== "text" && q.options.some((opt) => !opt.trim())) {
        alert(`Please complete all options in question ${i + 1}.`);
        return false;
      }
      if (q.expectedAnswer.length === 0) {
        alert(
          `Please mark at least one expected answer for question ${i + 1}.`
        );
        return false;
      }
      if (!q.rubric.trim()) {
        alert(`Please fill in the rubric for question ${i + 1}.`);
        return false;
      }
      if (!q.rubricMaxScore || q.rubricMaxScore <= 0) {
        alert(`Please set a valid max score for question ${i + 1}.`);
        return false;
      }
    }

    return true;
  };
  const saveQuiz = (status) => {
    const quizData = {
      title: quizTitle,
      description,
      dueDate,
      dueTime,
      duration,
      questions,
      status,
    };
    console.log("Saving quiz:", quizData);
    // Replace this with an API call
  };

  return (
    <div className=" mx-auto">
      <div className="bg-blue-50 px-6 py-12 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create New Quiz
        </h2>
        <p className="text-sm text-gray-600">
          Fill in the details below to design your quiz. AI will assist in
          evaluating student responses later.
        </p>
      </div>

      <div className="mx-32 mt-8 px-12 py-8 rounded-4xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Quiz Title</h2>
          <div className="relative group">
            <AiOutlineQuestionCircle
              className="text-gray-500 cursor-pointer"
              data-tooltip-id="quiz-title-tip"
            />
            <Tooltip
              id="quiz-title-tip"
              place="right"
              content="This is the name of your quiz shown to students."
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="e.g. Introduction to Philosophy Quiz"
          className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-xl"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Description (optional)</h2>
          <div className="relative group">
            <AiOutlineQuestionCircle
              className="text-gray-500 cursor-pointer"
              data-tooltip-id="quiz-description-tip"
            />
            <Tooltip
              id="quiz-description-tip"
              place="right"
              content="You can explained the details of the quiz"
            />
          </div>
        </div>
        <textarea
          placeholder="Write a short description about this quiz..."
          className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border  border-gray-200 rounded-xl"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Time
            </label>
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Questions</h2>

        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-blue-50 border rounded-4xl border-orange-200 p-8 mb-6"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              placeholder="Write your question here..."
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-xl"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            <label className="block text-sm font-semibold  text-gray-700 mb-1">
              Answer Type
            </label>
            <select
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-xl"
              value={q.type}
              onChange={(e) =>
                handleQuestionChange(index, "type", e.target.value)
              }
            >
              <option value="text">Text</option>
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
            </select>

            {(q.type === "single" || q.type === "multiple") && (
              <div className="space-y-2 mb-3">
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Answer Options
                </label>
                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type={q.type === "single" ? "radio" : "checkbox"}
                      name={`expected-${index}`}
                      className="accent-blue-600"
                      checked={q.expectedAnswer.includes(opt)}
                      onChange={() =>
                        q.type === "single"
                          ? setSingleExpectedAnswer(index, opt)
                          : toggleExpectedAnswer(index, opt)
                      }
                    />
                    <input
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      className="w-full px-3 py-2 border rounded"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, i, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {q.type === "text" && (
              <>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Example Answer (optional)
                </label>
                <textarea
                  placeholder="Expected answer(s), comma-separated"
                  className="w-full mb-3 px-3 py-2 border rounded"
                  value={q.expectedAnswerRaw || ""}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "expectedAnswerRaw",
                      e.target.value
                    )
                  }
                />
              </>
            )}

            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Focus Point
            </label>
            <textarea
              placeholder="Rubric for this question..."
              className="w-full mb-3 px-3 py-2 border rounded"
              value={q.rubric}
              onChange={(e) =>
                handleQuestionChange(index, "rubric", e.target.value)
              }
            />

            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Max Score
            </label>
            <input
              type="number"
              min="1"
              placeholder="Maximum score for this question"
              className="w-full mb-3 px-3 py-2 border rounded"
              value={q.rubricMaxScore}
              onChange={(e) =>
                handleQuestionChange(
                  index,
                  "rubricMaxScore",
                  parseInt(e.target.value)
                )
              }
            />

            <div className="text-right mt-3">
              <button
                onClick={() => removeQuestion(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove Question
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="text-blue-600 border border-blue-600 px-4 py-2 rounded mb-6 hover:bg-blue-50"
        >
          + Add Question
        </button>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              console.log("questions: ", questions);
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            CHECK
          </button>
          <button
            onClick={() => {
              if (validateQuiz()) {
                saveQuiz("published");
              }
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Publish Quiz
          </button>

          <button
            onClick={() => {
              saveQuiz("published");
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
