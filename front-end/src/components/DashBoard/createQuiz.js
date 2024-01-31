import styles from "../../styles/Dashboard/createQuiz.module.css";
import React, { useState, useEffect } from "react";
import cross from "../Assets/Cross.png";
import api from "../../services/api";
import { useQuizContext } from "../../context/quizContext";
const CreateQuiz = ({ closeQuiz }) => {
  const { quizInfo } = useQuizContext();
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [selectedTextOptionIndex, setSelectedTextOptionIndex] = useState(null);
  const [selectedImageOptionIndex, setSelectedImageOptionIndex] =
    useState(null);
  const [selectedTextImageOptionIndex, setSelectedTextImageOptionIndex] =
    useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [selectedOptionType, setSelectedOptionType] = useState("Text");
  const [selectedTimerOption, setSelectedTimerOption] = useState("off");
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", ""],
      imageOptions: ["", "", "", ""],
      textImageOptions: [
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
      ],
      correctOption: "",
      timer: "",
    },
  ]);

  useEffect(() => {
    setSelectedQuestion((prevSelected) =>
      prevSelected > totalQuestions ? totalQuestions : prevSelected
    );
  }, [totalQuestions]);

  const clearTextOptions = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === selectedQuestion - 1
          ? {
              ...question,
              options: ["", "", "", ""],
              imageOptions: ["", "", "", ""],
            }
          : question
      )
    );
  };

  const clearImageOptions = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === selectedQuestion - 1
          ? {
              ...question,
              textImageOptions: [
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
              ],
              options: ["", "", "", ""],
            }
          : question
      )
    );
  };

  const clearTextImageOptions = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === selectedQuestion - 1
          ? {
              ...question,
              textImageOptions: [
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
              ],
            }
          : question
      )
    );
  };

  const addQuestion = () => {
    if (totalQuestions < 5) {
      setTotalQuestions((prevCount) => prevCount + 1);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          text: "",
          options: ["", "", "", ""],
          imageOptions: ["", "", "", ""],
          textImageOptions: [
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
          ],
        },
      ]);
      setSelectedTextOptionIndex(null);
      setSelectedImageOptionIndex(null);
      setSelectedTextImageOptionIndex(null);
    }
  };
  const handleTextImageOptionChange = (
    questionIndex,
    optionIndex,
    subOptionIndex,
    value
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].textImageOptions[optionIndex][
        subOptionIndex
      ] = value;
      return updatedQuestions;
    });
  };
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };
  const handleImageOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].imageOptions[optionIndex] = value;
      return updatedQuestions;
    });
  };

  const removeQuestion = (id) => {
    if (id > 1 && id <= totalQuestions) {
      setTotalQuestions((prevCount) => prevCount - 1);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index + 1 !== id)
      );
      setSelectedQuestion((prevSelected) =>
        prevSelected > totalQuestions - 1 ? totalQuestions : prevSelected
      );
    }
  };

  const handleQuestionNameChange = (questionIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].text = value;
      return updatedQuestions;
    });
  };
  const handleCorrectOptionChange = (
    questionIndex,
    correctOptionIndex,
    optionType
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];

      if (optionType === "options") {
        updatedQuestions[questionIndex].correctOption =
          updatedQuestions[questionIndex].options[correctOptionIndex];
      } else if (optionType === "imageOptions") {
        updatedQuestions[questionIndex].correctOption =
          updatedQuestions[questionIndex].imageOptions[correctOptionIndex];
      } else if (optionType === "textImageOptions") {
        updatedQuestions[questionIndex].correctOption =
          updatedQuestions[questionIndex].textImageOptions[
            correctOptionIndex
          ][0];
      }

      return updatedQuestions;
    });
  };

  const handleTimerOption = (timerValue) => {
    const updatedQuestions = questions.map((question) => ({
      ...question,
      timer: timerValue,
    }));

    setQuestions(updatedQuestions);
    setSelectedTimerOption(timerValue);
  };
  const selectQuestion = (index) => {
    setSelectedQuestion(index);
  };
  const handleCancil = () => {
    closeQuiz();
  };
  const submitQuiz = async () => {
    try {
      const response = await api.post("http://localhost:4000/createQuiz", {
        title: quizInfo.quizName,
        type: quizInfo.quizType,
        questions: questions,
      });

      if (response.status === 200) {
        console.log("Quiz created successfully:", response.data);
      } else {
        console.error("Failed to create quiz:", response.data);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
    closeQuiz();
  };
  return (
    <div className={styles.body}>
      <div className={styles.questionBody}>
        <div className={styles.createQuestion}>
          <div className={styles.Questions}>
            <div className={styles.setBody}>
              <div className={styles.totalQuestions}>
                {[...Array(totalQuestions)].map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.questionContainer} ${
                      selectedQuestion === index + 1 && styles.selectedQuestion
                    }`}
                    onClick={() => selectQuestion(index + 1)}
                  >
                    <div className={styles.allQuestions}>
                      {index + 1}
                      {index + 1 > 1 && index + 1 <= 5 && (
                        <div
                          className={styles.crossIcon}
                          onClick={() => removeQuestion(index + 1)}
                        >
                          <img src={cross} alt="cross" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {totalQuestions < 5 && (
                  <div className={styles.add} onClick={addQuestion}>
                    +
                  </div>
                )}
              </div>
              <div className={styles.totalQuestionsText}>
                <p>Max 5 questions</p>
              </div>
            </div>

            <input
              className={styles.questionName}
              value={questions[selectedQuestion - 1]?.text || ""}
              type="text"
              aria-label="question"
              placeholder="Question"
              onChange={(e) =>
                handleQuestionNameChange(selectedQuestion - 1, e.target.value)
              }
            />

            <div className={styles.selectOptionType}>
              <div className={styles.optionType}>
                <p>Option type</p>
              </div>

              <label>
                <input
                  type="radio"
                  name="optionType"
                  value="text"
                  checked={selectedOptionType === "Text"}
                  onChange={() => {
                    setSelectedOptionType("Text");
                    clearImageOptions(selectedQuestion - 1);
                    clearTextImageOptions(selectedQuestion - 1);
                  }}
                ></input>
                Text
              </label>
              <label>
                <input
                  type="radio"
                  name="optionType"
                  value="image"
                  checked={selectedOptionType === "image"}
                  onChange={() => {
                    setSelectedOptionType("image");
                    clearTextOptions(selectedQuestion - 1);
                    clearTextImageOptions(selectedQuestion - 1);
                  }}
                ></input>
                Image URL
              </label>
              <label>
                <input
                  type="radio"
                  name="optionType"
                  value="textImage"
                  checked={selectedOptionType === "textImage"}
                  onChange={() => {
                    setSelectedOptionType("textImage");
                    clearTextOptions(selectedQuestion - 1);
                    clearImageOptions(selectedQuestion - 1);
                  }}
                ></input>
                Text & Image URL
              </label>
            </div>
            <div className={styles.multipleOptions}>
              <div>
                <div
                  className={styles.text}
                  style={{
                    display: selectedOptionType === "Text" ? "block" : "none",
                  }}
                >
                  {questions[selectedQuestion - 1] &&
                    selectedOptionType === "Text" &&
                    [...Array(4)].map((_, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          name={`ansOption_${selectedQuestion}`}
                          onClick={() => {
                            handleCorrectOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              "options"
                            );
                            setSelectedTextOptionIndex(optionIndex);
                          }}
                        />
                        <input
                          className={`${styles.optionBox} ${
                            selectedOptionType === "Text" &&
                            selectedTextOptionIndex === optionIndex
                              ? styles.selectedOption
                              : ""
                          }`}
                          placeholder={`Option ${optionIndex + 1}`}
                          value={
                            questions[selectedQuestion - 1].options[
                              optionIndex
                            ] || ""
                          }
                          type="text"
                          name={`optionText_${selectedQuestion}_${
                            optionIndex + 1
                          }`}
                          onChange={(e) =>
                            handleOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
                <div
                  className={styles.image}
                  style={{
                    display: selectedOptionType === "image" ? "block" : "none",
                  }}
                >
                  {selectedOptionType === "image" &&
                    [...Array(4)].map((_, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          name={`ansOption_${selectedQuestion}`}
                          onClick={() => {
                            handleCorrectOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              "imageOptions"
                            );
                            setSelectedImageOptionIndex(optionIndex);
                          }}
                        />
                        <input
                          className={`${styles.optionBox} ${
                            selectedOptionType === "image" &&
                            selectedImageOptionIndex === optionIndex
                              ? styles.selectedOption
                              : ""
                          }`}
                          value={
                            questions[selectedQuestion - 1].imageOptions[
                              optionIndex
                            ] || ""
                          }
                          type="url"
                          name={`imageText_${optionIndex + 1}`}
                          placeholder="ImageUrl"
                          onChange={(e) =>
                            handleImageOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
                <div
                  className={styles.textImage}
                  style={{
                    display:
                      selectedOptionType === "textImage" ? "block" : "none",
                  }}
                >
                  {selectedOptionType === "textImage" &&
                    questions[selectedQuestion - 1] &&
                    questions[selectedQuestion - 1].textImageOptions &&
                    [...Array(4)].map((_, optionIndex) => (
                      <div key={optionIndex}>
                        <input
                          type="radio"
                          name={`ansOption_${selectedQuestion}`}
                          onClick={() => {
                            handleCorrectOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              "textImageOptions"
                            );
                            setSelectedTextImageOptionIndex(optionIndex);
                          }}
                        />
                        <input
                          className={`${styles.optionBox} ${
                            selectedOptionType === "textImage" &&
                            selectedTextImageOptionIndex === optionIndex
                              ? styles.selectedOption
                              : ""
                          }`}
                          value={
                            questions[selectedQuestion - 1].textImageOptions[
                              optionIndex
                            ][0] || ""
                          }
                          type="text"
                          name={`textOption_${selectedQuestion}_${
                            optionIndex + 1
                          }`}
                          placeholder={`Text Option ${optionIndex + 1}`}
                          onChange={(e) =>
                            handleTextImageOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              0,
                              e.target.value
                            )
                          }
                        />
                        <input
                          className={styles.optionBoxImg}
                          value={
                            questions[selectedQuestion - 1].textImageOptions[
                              optionIndex
                            ][1] || ""
                          }
                          type="url"
                          name={`imageText_${selectedQuestion}_${
                            optionIndex + 1
                          }`}
                          placeholder="ImageUrl"
                          onChange={(e) =>
                            handleTextImageOptionChange(
                              selectedQuestion - 1,
                              optionIndex,
                              1,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.timer}>
                <div className={styles.hello}>
                  <p>Timer</p>
                </div>
                <div className={styles.timerbuttons}>
                  <button
                    className={
                      selectedTimerOption === "off"
                        ? `${styles.setTime} ${styles.selected}`
                        : styles.setTime
                    }
                    onClick={() => handleTimerOption("off")}
                  >
                    OFF
                  </button>
                  <button
                    className={
                      selectedTimerOption === "5"
                        ? `${styles.setTime} ${styles.selected}`
                        : styles.setTime
                    }
                    onClick={() => handleTimerOption("5")}
                  >
                    5 sec
                  </button>
                  <button
                    className={
                      selectedTimerOption === "10"
                        ? `${styles.setTime} ${styles.selected}`
                        : styles.setTime
                    }
                    onClick={() => handleTimerOption("10")}
                  >
                    10 sec
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.submitCancil}>
              <button className={styles.cancil} onClick={handleCancil}>
                Cancil
              </button>
              <button className={styles.submit} onClick={submitQuiz}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
