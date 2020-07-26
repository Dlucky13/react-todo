import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import TodoList from "../todo-list/todo-list";
import React, { Component} from "react";
import './app.css'
import {ItemAddForm} from "../item-add-form/item-add-form";

export default class App extends Component {

   id = 1;

   createTodoItem = (label) => {
      return {
         label,
         important: false,
         done: false,
         id: this.id++,
      }
   }

   state = {
      todoData: [
         this.createTodoItem('drink coffee'),
         this.createTodoItem('make awesome app'),
         this.createTodoItem('have a lunch'),
      ],
      searchValue: '',
      filterState: ''
   };

   deleteItem = (id) => {
     this.setState(({ todoData }) => {
        return {
           todoData: todoData.filter((task) => task.id !== id)
        }
     }
  )}

   onItemAdded = (label) => {
      const newTask = this.createTodoItem(label)

      this.setState(( {todoData} ) => {
         return {
            todoData: [...todoData, newTask]
         }
      });
   };

   onToggleDone = (id) => {
      const index = this.state.todoData.findIndex(item => item.id === id )

      const items = [...this.state.todoData]
      const item = {...items[index]}
      item.done = !item.done;
      items[index] = item;

      this.setState(({todoData}) => {
         return {
            todoData: items
         }
      })
   };

   toggleProperty(arr, id, propName) {
         const index = arr.findIndex(item => item.id === id )
         const oldItem = {...arr[index]};
         const newItem = {...oldItem, [propName]: !oldItem[propName]};

         return [...arr.slice(0, index),
                  newItem,
                  ...arr.slice(index+1)
               ]
   }

   setSearchValue = (value) => {
      this.setState( ({searchValue}) => {
         return {
            searchValue: value
         }
      })
   }

   onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
         return {
            todoData: this.toggleProperty(todoData, id, 'important')
         }
      })
   };

   filterToggle = (activeFilter) => {
      this.setState(
        {
            filterState: activeFilter
         }
      )
   }

   filter (items, filterProp) {

      switch (filterProp) {
         case 'all' :
            return items;
         case 'done' :
            return items.filter(task=> task.done);
         case 'active' :
            return items.filter(task=> !task.done);
         default :
            return items;
      }
   }

   search(items, searchProp) {
      return items.filter((todoItem) => {
         return ~(todoItem.label.toLowerCase()
            .indexOf(searchProp.toLowerCase()));
      })
   }


   render() {
      const { todoData, searchValue, filterState } = this.state;

      let filteredTodos = this.filter(this.search(todoData, searchValue),filterState)

      const doneCount = todoData
                        .filter((item) => item.done).length;

      const todoCount = todoData.length - doneCount;

      return (
         <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
               <SearchPanel value={searchValue} setSearchValue={this.setSearchValue}/>
               <ItemStatusFilter filterState={filterState} onFilterChange={this.filterToggle}/>
            </div>

            <TodoList
               todos={filteredTodos}
               onDeleted = { this.deleteItem }
               onToggleImportant = { this.onToggleImportant }
               onToggleDone = { this.onToggleDone }
            />
            <ItemAddForm addTask={this.onItemAdded} />
         </div>
      );
   }

}

