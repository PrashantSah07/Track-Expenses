import React from 'react';

const ContextMenu = ({ menuPosition, setMenuPosition, setExpenses, rowId, expenses, setData, setIsEdit }) => {
    if (!menuPosition.top) {
        return;
    }


    const handleEditMode = () => {
        const currentExpense = expenses.find(expense => expense.id === rowId);
        if (currentExpense) {
            setData(currentExpense)
            setExpenses((prevState) => prevState.filter(expense => expense.id !== rowId));
        }
    };


    return (
        <div className='context-menu' style={menuPosition}>
            <button onClick={() => {
                setMenuPosition({});
                handleEditMode()
                setIsEdit(true)
            }} >Edit</button>
            <button onClick={() => {
                const updatedExpenses = expenses.filter(expense => expense.id !== rowId);
                setExpenses(updatedExpenses);
                localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
                setMenuPosition({});
            }} >Delete</button>
        </div>
    );
};

export default ContextMenu;
