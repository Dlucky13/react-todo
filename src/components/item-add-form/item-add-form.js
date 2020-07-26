import React, {useState} from "react";

export const ItemAddForm =({ addTask }) => {

   const [inputState, setInputState] = useState('')

   const onFormSubmit = (evt) => {
      evt.preventDefault();
      addTask(inputState);
      setInputState('')
   };


   return (
      <form className='item-add-form d-flex'
            style ={{ marginTop: '5px'}}
            onSubmit={onFormSubmit}
      >
         <input
            style={{marginRight: '3px'}}
            type = 'text'
            className='form-control'
            placeholder='what need to be done'
            value ={inputState}
            onChange={ (evt) => setInputState(evt.target.value)}
         />
         <button
            className = 'btn btn-outline-secondary'
         >Add task
         </button>
      </form>
   )
};

