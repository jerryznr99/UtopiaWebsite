"use client"

import React from 'react';
import {useEffect} from 'react';
import Image from 'next/image'

let address = "0xa70b638B70154EdfCbb8DbbBd04900F328F32c35";

const App = () => {

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

            <div className="Navigation w-[1440px] h-[66px] p-4 bg-white border border-zinc-200 justify-start items-start gap-4 inline-flex">
                <div className="Left grow shrink basis-0 h-9 justify-start items-start gap-4 flex">
                    <div className="ElementLogo py-0.5 flex-col justify-start items-start gap-2 inline-flex" />
                    <Image 
                        src = "/Vector.svg"
                        width = {44} 
                        height = {32}
                    />
                </div>
            </div>

            <div className="EmptyState w-96 h-72 px-96 flex-col justify-start items-center gap-6 inline-flex">
                <img className="Cloud2x w-48 h-24" src="/Cloud@2x.png" />
                <div className="Content h-28 flex-col justify-center items-center gap-2 flex">
                    <div className="Prompt self-stretch text-center text-zinc-700 text-3xl font-semibold leading-loose">How much money have you spent on gas?</div>
                    <div className="InsertSafeAddress self-stretch text-center text-zinc-500 text-base font-normal leading-normal">Insert your safe address below to check how much money you’ve spent on gas.</div>
                </div>
                <div className="Row w-96 justify-start items-start gap-2 inline-flex">
                    <div className="FieldTagSelect grow shrink basis-0 rounded flex-col justify-start items-start inline-flex">
                        <div className="FormFieldAction self-stretch rounded border border-zinc-200 justify-start items-start inline-flex">
                            <input 
                                className="SelectOption"
                                placeholder="Safe Address"
                                id='address'
                            />
                        </div>
                    </div>
                    <button onClick={getAddress} className="Button">Calculate</button>
                </div>
            </div>

            <div className="Card">
                <div className="Text">
                    <div className="Frame427319277 self-stretch justify-start items-start gap-1 inline-flex">
                        <Image 
                            src = "/local_gas_station.svg"
                            width = {18} 
                            height = {18}
                        />
                        <div className="TotalGasSpentByAllOfUtopia grow shrink basis-0 text-slate-500 text-xs font-semibold leading-none">TOTAL GAS SPENT BY ALL OF UTOPIA</div>
                    </div>
                    <div className="Frame427319278 px-6 flex-col justify-start items-start gap-2.5 flex">
                        <div className="Frame11 justify-end items-end gap-1 inline-flex">
                            <div className="Frame12 justify-start items-start gap-0.5 flex">
                                <div className="00 text-zinc-700 text-sm font-normal leading-tight">0.00</div>
                                <div className="Token justify-start items-start flex">
                                    <div className="Fiat w-5 h-5 relative">
                                        <Image 
                                            src = "/Fiat.svg"
                                            width = {20} 
                                            height = {20}
                                        />
                                    </div>
                                    <div className="Usd text-zinc-700 text-sm font-normal leading-tight">USD</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <h1>How much gas can you save using Utopia?</h1>

            <div className = "search">
                <input 
                    placeholder = 'Enter your address'
                    id = 'address'
                />
            </div><br></br>
        
            <button onClick={getAddress}>Submit</button> */}

        </div>
    );
}

export default App;