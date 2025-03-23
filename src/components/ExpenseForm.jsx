import React, { useEffect, useState } from 'react'
import ExpenseTable from './ExpenseTable'

const ExpenseForm = ({ setExpenses, expenses }) => {

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);
    }, [setExpenses]);

    const [data, setData] = useState({
        title: "",
        category: "",
        amount: ""
    })

    const [errors, setErrors] = useState({
        title: '',
        category: '',
        amount: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: value && '' }));
        setData(prev => ({ ...prev, [name]: value }))
    }

    function handlesubmit(e) {
        e.preventDefault();

        let error = {};

        if (!e.target.title.value) {
            error.title = 'Title must be required!'
        }
        if (!e.target.category.value) {
            error.category = 'Please choose a category!'
        }
        if (!e.target.amount.value) {
            error.amount = 'Amount must be required!'
        } else if (!/^-?(0|[1-9]\d*)$/.test(e.target.amount.value)) {
            error.amount = 'Please enter a valid field!';
        }


        setErrors(error);

        if (Object.keys(error).length > 0) return;

        const data = {
            id: crypto.randomUUID(),
            title: e.target.title.value,
            category: e.target.category.value,
            // date: e.target.date.value,
            amount: e.target.amount.value,
        }

        setExpenses((prevExpenses) => {
            const updatedExpenses = [...prevExpenses, data];
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            return updatedExpenses;
        });

        handleInputReset()

    }

    const handleInputReset = () => {
        setData({ title: "", category: "", amount: "" })
    }

    return (
        <>
            <div className='expenseForm'>
                <h1>TRACK YOUR EXPENSES</h1>
                <div>
                    <form onSubmit={handlesubmit}>
                        <div>
                            <label style={{ fontWeight: 'bold' }} htmlFor="title">Title</label>
                            <input type="text" id="title" name='title' value={data.title} onChange={handleChange} />
                            {errors.title && <p className='error'>{errors.title}</p>}
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bold' }} htmlFor="category">Category</label>
                            <select id='select' name='category' value={data.category} onChange={handleChange} >
                                <option value="" hidden>Select Category</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Bills">Bills</option>
                                <option value="Education">Education</option>
                                <option value="Medicine">Medicine</option>
                            </select>
                            {errors.category && <p className='error'>{errors.category}</p>}
                        </div>
                        {/* <div>
                            <label style={{ fontWeight: 'bold' }} htmlFor="date">Date</label>
                            <input type="date" name='date' />
                        </div> */}
                        <div>
                            <label style={{ fontWeight: 'bold' }} htmlFor="amount">Amount</label>
                            <input type="text" id="amount" name='amount' value={data.amount} onChange={handleChange} />
                            {errors.amount && <p className='error'>{errors.amount}</p>}
                        </div>
                        <button onClick={function () {
                            setIsEdit(false)
                        }}>{isEdit ? 'Save' : 'Add'}</button>
                    </form>
                    <ExpenseTable expenses={expenses} setExpenses={setExpenses} setData={setData} setIsEdit={setIsEdit} />
                </div>
            </div>
        </>
    )
}

export default ExpenseForm
