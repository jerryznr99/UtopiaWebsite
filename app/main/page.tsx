"use client"

import {useEffect} from 'react';

let address = "0xa70b638B70154EdfCbb8DbbBd04900F328F32c35";

const About = () => {

    const handleFetchData = async () => {
        // const response = await fetch("http://localhost:3000/api/example");
        const response = await fetch("http://localhost:3000/api/example?" + new URLSearchParams({input: address}));
        console.log(response)
        const data = await response.json();
        console.log(data);
    }
    
    function getAddress(){
        address = document.getElementById('address').value;
        handleFetchData();
    }
    // useEffect(() => {
    //     handleFetchData();        
    // },[])

    return(
        <div className="App">
            <h1>How much gas can you save using Utopia?</h1>

            <div className = "search">
                <input 
                    placeholder = 'Enter your address'
                    id = 'address'
                />
            </div><br></br>
        
            <button onClick={getAddress}>Submit</button>
        </div>
    );
}

export default About;