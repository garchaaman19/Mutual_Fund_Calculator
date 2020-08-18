import React, {useEffect, useState} from 'react';
import './App.css';

function About() {
    useEffect(() => {
        fetchItems();
        fetchDropDown()
    }, []);

    const [items, setItems] = useState([]);
    const [list,setList]=useState([]);
    const fetchItems = async () => {
        //const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
        const data = await fetch('http://127.0.0.1:5000/mf/search?search_query=14192');
        const items = await data.json();
        //console.log(items.data);
        setItems(items.data);
    };

 const fetchDropDown=async ()=>{
      const all_funds=await fetch('http://127.0.0.1:5000/mf/all_funds');
      const list=await all_funds.json();
      setList(list.result);

  }


    return (
        <div>
            <label htmlFor="fund-select">Filter by Fund Name:</label>

            <select name="pets" id="pet-select">
                <option value="">--Please choose an option--</option>
            {list.map(result => (
                <option value={result.scheme_name}>{result.scheme_name}</option>
                ))}
            </select>

            <table>
                <colgroup span="3"></colgroup>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>NAV</th>
                </tr>
                {items.map(data => (
                    <tr>
                        <td>{data.date}</td>
                        <td>{data.scheme_name}</td>
                        <td>{data.nav}</td>
                    </tr>
                ))}
            </table>


        </div>
    );
}
export default About;
