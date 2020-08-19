import React, {useDebugValue, useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';

export default class History extends React.Component{
    state={
        result:[],
        funds:[],
        url:[],
        scheme_name:[],
        current_value:[]

    };

     allFunds=event => {
            axios.
            get(`http://127.0.0.1:5000/mf/all_funds`)
            .then(res =>{
                console.log(res.data)
                this.setState({funds :res.data.data})
            });
    }

    handleSubmit =event => {
        event.preventDefault(); //prevent default action, stops browser from reloading the page
        //let amount=event.target.value;
        this.setState({ [event.target.name]: event.target.value });

    };
     callApi=event =>{
        let fund_name=this.state.scheme_name
        let amount=this.state.amount
        let date= this.state.date
        axios
            .get(`http://127.0.0.1:5000/mf/calculate?fund_name=${fund_name}&amount=${amount}&date=${date}}`)
            .then(res => {
                    this.setState({current_value: res.data.data})
                });

    };

    handleChange=event=>{

        let search_query=event.target.value
        this.setState({scheme_name:event.target.value});

         axios
        .get(`http://127.0.0.1:5000/mf/search?search_query=${search_query}`)
        .then(res =>{
                console.log(res.data)
                this.setState({result :res.data.data})
    });
    };

    handleDifferntDate() {
        if (this.state.current_value.length === 0) {
           {alert("please select some other date, Markets are only open from Mon-Fri ")}
        }
    }
    render() {
        console.log(this.state.result);
        return <div>
            <label htmlFor="fund-select">Filter by Fund Name:</label>

            <select name="funds" id="fund-select" onClick={this.allFunds} onChange= {(e)=> this.handleChange(e)} required>
                <option value="">--Please choose an option--</option>
             {this.state.funds.map(data =>
                    <option value={data.scheme_name}>
                        {data.scheme_name}
                        </option>
                    )}
            </select>

            {this.state.result.length>0 && (
                <div>
            <table>
                <colgroup span="3"></colgroup>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>NAV</th>
                </tr>
                {this.state.result.map(data =>
                    <tr>
                        <td key={data.date}>{data.date}</td>
                        <td key={data.name}>{data.scheme_name}</td>
                        <td key={data.nav}>{data.nav}</td>
                    </tr>
                )}
            </table>
                    <div class="calculate">
                        <p> Check and see if you would have invested in the above mutual fund how much you would have got</p>
                        <label htmlFor="amount">Enter Amount</label>
                        <input type="text" id="amount" name="amount" required
                               minLength="4" maxLength="10" size="10"  onChange={this.handleSubmit}>
                        </input>
                        <label htmlFor="date">Enter Date in specified format </label>
                        <input type="text" id="name" name="date" placeholder="15-Oct-2018 format" required
                               minLength="4" maxLength="12" size="10"  onChange={this.handleSubmit} >
                        </input>
                        <input type="submit" value="Calculate" required onClick={this.callApi}></input>
                    </div>

                        )}
                </div>

            )}

                        <div class="investment-report">
                        {this.state.current_value.map(data =>
                    <div>
                        <p>Your investment would have been <strong>{data.current_value}Rs. on current date WOWWW</strong> </p>
                        <p>You would have got<strong>{data.units} Units</strong> </p>
                        <p>You should start investing now if not already investing</p>
                    </div>
                    )}
                        </div>
                </div>


    }

    }

