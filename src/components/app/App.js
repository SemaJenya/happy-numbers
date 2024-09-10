
import './App.css';
import { useEffect, useRef, useState } from 'react';
import s from 'classnames';

function App() {



  const [counter, setCounter] = useState(1)
  const [myInput, setMyInput] = useState({
    id: 1,
    firstNum: 4,
    secondNum: 1,
    answer: null,
    isRightAnswer: null
  })

  const [myArray, setMyArray] = useState([myInput]);
  const [inputValue, setInputValue] = useState(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const inputRef = useRef(null); 

  useEffect(() => {
    inputRef.current.focus(); 
  }, [myArray]);


  const handleChange = (e) => {
    setInputValue(e.target.value)
    setMyInput({
      ...myInput,
      answer: e.target.value
    })
    setIsDisabledButton(false);
  }



  const handleClickButton = (e) => {
    e.preventDefault();
  }

  const handleMouseOver = () => {
    setIsMouseOver(true);
  }

  const handleMouseOut = () => {
    setIsMouseOver(false);
  }

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsMouseDown(true);
    if (inputValue == myArray[counter - 1].firstNum * myArray[counter - 1].secondNum) {
      setIsCorrectAnswer(true);
    }
  }


  const handleMouseUp = (e) => {
    e.preventDefault();

    if (inputValue == myArray[counter - 1].firstNum * myArray[counter - 1].secondNum) {

      setMyArray([...myArray.map(item => {
        if (item.id == counter) {
          return { ...item, isRightAnswer: true, answer: inputValue }
        }
        return item
      }), {
        id: counter + 1,
        firstNum: 4,
        secondNum: counter + 1,
        answer: null,
        isRightAnswer: null
      }])

      setCounter(counter + 1);
      setInputValue('');
    }

    else {
      console.log('uncorrect answer bbbbb');
      setMyArray(myArray.map((item) => {
        if (item.id == counter) {
          return { ...item, isRightAnswer: false }
        }
        return item
      }))
    }

    setIsMouseDown(false);
    setIsCorrectAnswer(false);
  }

  console.log(isMouseOver, 'isMouseOver');


  return (
    <div className="App">
      <form className='form'>

        {myArray?.map((element, index) => {
          return (
            <div className={myArray.length > 1 ? 'example_new ' : 'example'} key={index}>
              <p className='multiplication'>{`${element.firstNum} x ${element.secondNum} = ${element.isRightAnswer ?
                (element.firstNum * element.secondNum) : ''}`}</p>
              <input
                className={element.isRightAnswer ? 'answer_input__inactive' : 'answer_input'}
                type='number'
                id={element.id}
                onChange={(e) => handleChange(e)}
                ref={inputRef}

              >
              </input >
            </div>)

        })}

        <button className={isDisabledButton || !inputValue ?
          "button_disabled" :
          isMouseDown && isCorrectAnswer ?
            s('button', 'button_right') :
            isMouseDown && !isCorrectAnswer ?
              s('button', 'button_wrong') :
              isMouseOver ?
                s('button', 'button_over') :
                'button'}
          disabled={(isDisabledButton || !inputValue) ? true : false}
          // style={buttonColor}
          type='submit'
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClickButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Done
        </button>

      </form>
    </div>
  );
}

export default App;
