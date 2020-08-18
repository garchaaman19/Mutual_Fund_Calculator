import React, {useEffect, useState} from 'react';
import './App.css';

function About() {
    useEffect(() => {
        fetchItems();
        },[]);

    const [items,setItems]=useState([]);
  const fetchItems= async ()=> {
      //const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
        const data = await fetch('http://127.0.0.1:5000/mf/search?search_query=14192');
      const items= await data.json();
      console.log(items.data);
      setItems(items.data);
  };

    return (
    <div>

            <table>
                <colgroup span="3"></colgroup>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Nav</th>
                </tr>
                 {items.map(data =>(
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
