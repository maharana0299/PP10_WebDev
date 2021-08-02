import React from 'react'
import "./App.css";
import { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux';
import { decNumber, incNumber } from './actions';

const App = () => {

  // it alternative to the useContext hooks in react / consumer from context API
  const myState = useSelector((state: RootState) => state.changeNumber);
  const dispatch = useDispatch();
  return (
    <>
      <div className="main-div">


        <div className="container">

          <h1>Increment/Decrement counter</h1>
          <h4>using React and Redux</h4>

          <div className="quantity">
            <a className="quantity__minus" title="Decrement" href="#" 
            onClick={()=>dispatch(decNumber())}><span>-</span></a>
            <input name="quantity" type="text" className="quantity__input" value= {myState} />
            <a className="quantity__plus" title="Increment" href="#"
              onClick={() => dispatch(incNumber())}><span>+</span></a>
          </div>

        </div>
      </div>
    </>
  )
}

export default App