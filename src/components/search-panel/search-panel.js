import React from 'react';
import './search-panel.css';

const SearchPanel = ({value,setSearchValue}) => {

  // const [value, setValue] = useState('')

  return <input className='form-control search-input'
                placeholder='search'
                value={value}
                onChange={(evt)=> {setSearchValue(evt.target.value)}}/>
};

export default SearchPanel;