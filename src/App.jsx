import React, { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import './App.css'

const App = () => {

  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <div className='flex'>
        <ExpenseForm expenses={expenses} setExpenses={setExpenses} />
      </div>

    </>
  )
}

export default App
