

// import React from "react";
// import CountDown from '../../components/timer/timer.jsx';
// import { Error } from "../../components/error"
// import { Loader } from "../../components/loader"
// import { Question } from "../../components/question"
// import { useTestPage } from "./useTestsPage"
// import NavStyle from "./test.module.css"

// export const TestPage = () => {
//   const { loading, tests, error } = useTestPage()

//   return (
//     <div className={NavStyle.content}>
//       {loading ? <Loader /> : null}
//       {loading ? null : (
//         <div className={NavStyle.bigContainer}>
//           <h1>Онлайн-тест ПДД КР 2023</h1>
//           <CountDown minutes={20} seconds={0} isOver={false} resultInfo={{ errors: 0 }} />
//           {error && <Error />}
//           {
//             tests.map((e) => (
//               <Question key={e.id} data={e} />
//             ))
//           }
//           <div className={NavStyle.btnContainer}>
//             <button className={NavStyle.check} >Проверить</button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



// import { Error } from "../../components/error"
// import { Loader } from "../../components/loader"
// import { Question } from "../../components/question"
// import { useTestPage } from "./useTestsPage"
// import NavStyle from "./test.module.css"
// import { CountDown} from '../../components/timer/timer.jsx'


// export const TestPage = () => {
//   const { loading, tests, error } = useTestPage()

//   return (
//     <div className={NavStyle.content}>
//       {loading ? <Loader /> : null}
//       {loading ? null : (
//         <div className={NavStyle.bigContainer}>
//           <h1>Онлайн-тест ПДД КР 2023</h1>

//             <div>{ CountDown } </div>
//           {/* {error && <Error />} */}
//           {
//             tests.map((e) => (
//               <Question key={e.id} data={e} />
//             ))
//           }
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import CountDown from '../../components/timer/timer.jsx';
import { Error } from "../../components/error"
import { Loader } from "../../components/loader"
import { Question } from "../../components/question"
import { useTestPage } from "./useTestsPage"
import NavStyle from "./test.module.css"
import Style from "./test.module.css"
import data from '../../components/question/index.jsx'


const ResultsModal = ({ onClose }) => {
  // logic to display the results
  return (
    <div className={Style.modal}>
      <h2>Результаты теста:</h2>
      <p>Вы ответили правильно на 15 из {data.length} вопросов.</p>
      <button className={Style.btnClose} onClick={onClose}>Закрыть</button>
    </div>
  );
};

export const TestPage = () => {
  
  const { loading, tests, error } = useTestPage()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(19);
  const lastQuestion = tests.length


  function handleChangeId() {
    setQuestionNumber(prev => prev + 1)
    // написать код который сохраняет все ваши ответы на вопросы
    setIsModalVisible(true);
  }

  const endTest = () => {
    // написать код который отправляет все ваши ответы на 20 вопросов в бэк

  }

  return (
    <div className={NavStyle.content}>
      {loading ? <Loader /> : null}
      {loading ? null : (
        <div className={NavStyle.bigContainer}>
          <h1>Онлайн-тест ПДД КР 2023</h1>
          <CountDown minutes={5} seconds={0} isOver={false} />
          {error && <Error />}
          {tests.map((e, idx) => {
            if (questionNumber !== e.questionNumber) {
              return
            }
            return (
              <Question
                key={idx}
                data={e}
                handleChangeId={handleChangeId}
                lastQuestion={lastQuestion}
                questionNumber={questionNumber}
                endTest={endTest}
              />
            )
          })
          }
          <div className={NavStyle.btnContainer}>
          </div>
        </div>
      )}
      {isModalVisible && <ResultsModal onClose={() => setIsModalVisible(false)} />}
    </div>
  );
};

