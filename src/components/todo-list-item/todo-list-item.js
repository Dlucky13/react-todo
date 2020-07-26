import React from 'react';
import './todo-list-item.css';

export default (props) => {

   const {
      label, onDeleted,
      onToggleImportant, onToggleDone,
      important, done
   } = props;

   let itemStyles = 'todo-list-item';

   if (done) {
      itemStyles += ' done';
   }

   if (important) {
      itemStyles += ' important'
   }

   return (
      <span className={itemStyles}>
            <span
               className="todo-list-item-label"
               onClick={onToggleDone}>
             {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}
            >
              <i className="fa fa-exclamation"/>
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
               <i className="fa fa-trash-o"/>
            </button>
         </span>
   );

}

