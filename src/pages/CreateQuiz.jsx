import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { creatQuizWithQuestions } from "../services/quiz";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const initialQuestion = {
  question: "",
  type: "text",
  options: ["", "", "", ""],
  expectedAnswer: [],
  rubric: "",
  rubricMaxScore: 10,
};

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([initialQuestion]);
  const [overallNotes, setOverallNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];

    if (field === "type") {
      updated[index].type = value;
      updated[index].expectedAnswer = [];
      updated[index].options = ["", "", "", ""];
    } else {
      updated[index][field] = value;
    }

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
    const newQuestion = {
      question: "",
      type: "text",
      options: ["", "", "", ""],
      expectedAnswer: [],
      rubric: "",
      rubricMaxScore: 10,
    };
    setQuestions([...questions, newQuestion]);
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
      if (
        (q.type === "text" &&
          (!q.expectedAnswer || q.expectedAnswer.trim() === "")) ||
        ((q.type === "single" || q.type === "multiple") &&
          (!Array.isArray(q.expectedAnswer) || q.expectedAnswer.length === 0))
      ) {
        alert(`Please fill the expected answer for question ${i + 1}.`);
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
  const saveQuiz = async () => {
    setIsLoading(true);
    const end_time = new Date(`${dueDate}T${dueTime}`).toISOString();

    const start_time = new Date().toISOString();

    const transformedQuestions = questions.map((q) => ({
      text: q.question,
      type:
        q.type === "text"
          ? "text"
          : q.type === "single"
          ? "single_choice"
          : "multi_choice",
      options:
        q.type === "text" ? [] : q.options.filter((opt) => opt.trim() !== ""),
      expected_answer:
        q.type === "text" ? [q.expectedAnswer || ""] : q.expectedAnswer,
      rubric: q.rubric,
      rubric_max_score: q.rubricMaxScore,
    }));

    const payload = {
      title: quizTitle,
      description: description,
      start_time: start_time,
      end_time: end_time,
      duration: parseInt(duration),
      questions: transformedQuestions,
      completed: false,
      lecturer_overall_notes: overallNotes,
    };
    try {
      const createResponse = await creatQuizWithQuestions(payload);
      console.log("createResponse: ", createResponse);
      if (createResponse.status == 200) {
        const quiz_id = createResponse.data.quiz_id;
        navigate(`/success-create/${quiz_id}`);
      }
    } catch (error) {
      console.log("error :", error);
    } finally {
      setIsLoading(false);
    }
    // console.log("Saving quiz:", payload);
  };

  const checkPayload = () => {
    const end_time = new Date(`${dueDate}T${dueTime}`).toISOString();

    const start_time = new Date().toISOString();

    const transformedQuestions = questions.map((q) => ({
      text: q.question,
      type:
        q.type === "text"
          ? "text"
          : q.type === "single"
          ? "single_choice"
          : "multi_choice",
      options:
        q.type === "text" ? [] : q.options.filter((opt) => opt.trim() !== ""),
      expected_answer:
        q.type === "text" ? [q.expectedAnswer || ""] : q.expectedAnswer,
      rubric: q.rubric,
      rubric_max_score: q.rubricMaxScore,
    }));

    const payload = {
      title: quizTitle,
      description: description,
      start_time: start_time,
      end_time: end_time,
      duration: parseInt(duration),
      questions: transformedQuestions,
      completed: false,
      lecturer_overall_notes: overallNotes,
    };

    console.log("payload: ", payload);
  };

  if (isLoading) return <LoadingScreen />;

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

        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-semibold">Focus Point Quiz</h2>
          <div className="relative group">
            <AiOutlineQuestionCircle
              className="text-gray-500 cursor-pointer"
              data-tooltip-id="quiz-focus-tip"
            />
            <Tooltip
              id="quiz-focus-tip"
              place="right"
              content={`You can add the focus point that will analyze by AI\n Example: Participants can explain their answers in detail using concise and fundamental language.`}
            />
          </div>
        </div>
        <textarea
          placeholder="Write a short description the focus point."
          className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-xl"
          value={overallNotes}
          onChange={(e) => setOverallNotes(e.target.value)}
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
                  placeholder="Expected answer(s), paragraph supported"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl overflow-hidden resize-none"
                  value={q.expectedAnswer || ""}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                    handleQuestionChange(
                      index,
                      "expectedAnswer",
                      e.target.value
                    );
                  }}
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
                className="text-red-500 text-sm hover:underline cursor-pointer"
              >
                Remove Question
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="text-blue cursor-pointer border border-blue px-4 py-2 rounded mb-6 hover:bg-blue-50"
        >
          + Add Question
        </button>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              if (validateQuiz()) {
                saveQuiz("published");
              }
            }}
            className="px-4 py-2 rounded bg-blue text-white hover:bg-blue-600 cursor-pointer"
          >
            Publish Quiz
          </button>

          {/* <button
            onClick={() => {
              checkPayload();
            }}
            className="px-4 py-2 rounded bg-blue text-white hover:bg-blue-600"
          >
            Check
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
