import React from 'react';

import './item-status-filter.css';



export default class ItemStatusFilter extends React.Component {

   buttons = [
      {name: 'all', label: 'All'},
      {name: 'active', label: 'Active'},
      {name: 'done', label: 'Done'}
   ]

   buttonsClasses = {
         btnAll: ['btn', 'btn-info'],
         btnActive: ['btn', 'btn-outline-secondary'],
         btnDone: ['btn', 'btn-outline-secondary']
      }


   render () {

      const { filterState, onFilterChange } = this.props

      const buttons = this.buttons.map(( {name, label} ) => {
         const isActive = filterState === name;
         const addedClass = isActive ? 'btn-info' : 'btn-outline-secondary'
         return (
            <button type="button"
                    className={`btn ${addedClass}`}
                    key = {name}
                    onClick={() => onFilterChange(name)}
            >{label}
            </button>
         )
      })

      return (
         <div className="btn-group">
            { buttons }
         </div>
      );
   }
}

