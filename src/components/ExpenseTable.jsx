import React, { useEffect, useState } from 'react'
import ContextMenu from './ContextMenu';

const ExpenseTable = ({ expenses, setExpenses, setData, setIsEdit }) => {

    const [filterCategory, setFilterCategory] = useState(expenses);
    const [menuPosition, setMenuPosition] = useState({})
    const [rowId, setRowId] = useState('');


    useEffect(() => {
        setFilterCategory(expenses);
    }, [expenses]);

    function filter(e) {
        const selectedCategory = e.target.value;

        setFilterCategory(
            selectedCategory === "" ? expenses : expenses.filter(expense => expense.category === selectedCategory)
        );
    }

    const totalAmount = filterCategory.reduce((sum, e) => sum + Number(e.amount), 0);


    return (
        <>
            <ContextMenu menuPosition={menuPosition} setMenuPosition={setMenuPosition} setExpenses={setExpenses} rowId={rowId} expenses={expenses} setData={setData} setIsEdit={setIsEdit} />
            <div className='expenseTable' onClick={() => {
                setMenuPosition({});
            }}>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div className='compare-column'>
                                    <span>Title</span>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        <button onClick={function () {
                                            const sortedExpenses = [...filterCategory].sort((a, b) => a.title.localeCompare(b.title));
                                            setFilterCategory(sortedExpenses);
                                            // localStorage.setItem('expenses', JSON.stringify(sortedExpenses));
                                        }} title="Sort Ascending">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 22.0003L11.0002 22.0004L11.0002 5.82845L7.05044 9.77817L5.63623 8.36396L12.0002 2L18.3642 8.36396L16.9499 9.77817L13.0002 5.8284L13.0001 22.0003Z"></path></svg>
                                        </button>
                                        <button onClick={function () {
                                            const sortedExpenses = [...filterCategory].sort((a, b) => b.title.localeCompare(a.title));
                                            setFilterCategory(sortedExpenses);
                                            // localStorage.setItem('expenses', JSON.stringify(sortedExpenses));
                                        }} title="Sort Descending">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 1.99974L11.0002 1.9996L11.0002 18.1715L7.05044 14.2218L5.63623 15.636L12.0002 22L18.3642 15.636L16.9499 14.2218L13.0002 18.1716L13.0001 1.99974Z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <select style={{ border: 'none', fontWeight: 'bold', fontSize: '16px' }} onChange={filter} >
                                    <option value="">All</option>
                                    <option value="Others">Others</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Education">Education</option>
                                    <option value="Medicine">Medicine</option>
                                </select>
                            </th>
                            {/* <th>
                                Date
                            </th> */}
                            <th>
                                <div className='compare-column'>
                                    <span>Amount</span>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        <button onClick={function () {
                                            const sortedExpenses = [...filterCategory].sort((a, b) => a.amount - b.amount);
                                            setFilterCategory(sortedExpenses);
                                            // localStorage.setItem('expenses', JSON.stringify(sortedExpenses));
                                        }} title="Sort Ascending">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 22.0003L11.0002 22.0004L11.0002 5.82845L7.05044 9.77817L5.63623 8.36396L12.0002 2L18.3642 8.36396L16.9499 9.77817L13.0002 5.8284L13.0001 22.0003Z"></path></svg>
                                        </button>
                                        <button onClick={function () {
                                            const sortedExpenses = [...filterCategory].sort((a, b) => b.amount - a.amount);
                                            setFilterCategory(sortedExpenses);
                                            // localStorage.setItem('expenses', JSON.stringify(sortedExpenses));
                                        }} title="Sort Descending">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 1.99974L11.0002 1.9996L11.0002 18.1715L7.05044 14.2218L5.63623 15.636L12.0002 22L18.3642 15.636L16.9499 14.2218L13.0002 18.1716L13.0001 1.99974Z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterCategory.map(function (e) {
                            return <tr key={e.id} onContextMenu={(event) => {
                                event.preventDefault();
                                setMenuPosition({ top: event.clientY + 5, left: event.clientX + 5 });
                                setRowId(e.id)
                            }} >
                                <td>{e.title.charAt(0).toUpperCase() + e.title.slice(1)}</td>
                                <td>{e.category}</td>
                                {/* <td>{e.date}</td> */}
                                <td>₹{e.amount}</td>
                            </tr>
                        })}
                        <tr>
                            <td style={{ color: 'green', fontWeight: 'bold' }}>Total</td>
                            <td onClick={function () {
                                setFilterCategory(expenses);
                            }} className='clear-sort'>Clear Sort</td>
                            <td style={{ color: 'green' }}><strong>₹{totalAmount}/-</strong></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default ExpenseTable
