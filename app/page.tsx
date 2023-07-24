"use client";

import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import RingLoader from "react-spinners/RingLoader";
import MoonLoader from "react-spinners/MoonLoader";

// 0xa70b638B70154EdfCbb8DbbBd04900F328F32c35

type GasCheckerResponse = {
  totalGasSpent: string;
  utopiaGasSpent: string;
  gasSpent: string;
  // totalUtopia: string
};

//TO-DO:
//catch bad responses

const App: FunctionComponent<GasCheckerResponse> = ({ totalGasSpent }) => {
  const handleFetchData = async () => {
    setLoading(true);
    setToggle(false);
    setError(null);

    try {
      const response = await fetch(
        "/api/gas?" + new URLSearchParams({ input: address })
      );
      const data = await response.json();
      setForm({
        totalGasSpent: data.totalGasSpent as string,
        utopiaGasSpent: data.utopiaGasSpent as string,
        gasSpent: data.gasSpent as string,
      });
      setToggle(true);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const [address, setAddress] = useState<string>("");
  const [form, setForm] = useState<GasCheckerResponse | undefined>();
  const [toggle, setToggle] = useState(false);
  const [card, setCard] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cardLoading, setcardLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCardValue = async () => {
      setcardLoading(true);
      const response = await fetch("/api/utopia");
      const data = await response.json();
      setCard("$" + data.result);
      setcardLoading(false);
    };

    handleCardValue();
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <div className="w-[1512px] h-[66px] p-4 bg-white border-b border-zinc-200 justify-start items-start gap-4 inline-flex">
        <div className="grow shrink basis-0 h-9 justify-start items-start gap-4 flex">
          <div className="py-0.5 flex-col justify-start items-start gap-2 inline-flex" />
          <img src="/Vector.svg" width={44} height={32} />
        </div>
      </div>

      {/* Form */}
      <div className="absolute flex w-[1512px] px-[456px] flex-col items-center gap-[24px] mx-auto pt-[191px]">
        <img className="w-48 h-24" src="/Cloud@2x.png" />
        <div className="flex w-[400px] flex-col justify-center items-center gap-[8px]">
          <div className="flex flex-col justify-center self-stretch text-stone-700 text-center text-[28px] font-semibold leading-[32px]">
            How much money have you spent on gas?
          </div>
          <div className="flex flex-col justify-center self-stretch text-stone-500 text-center text-[16px] font-normal leading-[24px]">
            Insert your safe address below to check how much money you’ve spent
            on gas.
          </div>
        </div>
        <div className="flex w-[536px] items-start gap-[8px]">
          <div className="flex flex-row items-start flex-1 rounded-md">
            <div className="w-16 h-[38px] bg-zinc-100 rounded-tl rounded-bl flex-col justify-start items-start inline-flex">
              <div className="h-[38px] rounded-tl rounded-bl border-l border-t border-b border-zinc-200 justify-start items-start inline-flex">
                <div className="px-4 py-2 justify-start items-center gap-4 flex">
                  <div className="flex text-zinc-500 text-sm font-normal">
                    ETH:
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start w-[377px] border rounded-tr rounded-br border-stone-200">
              <input
                className="flex px-[16px] py-[8px] items-start gap-[16px] flex-1 text-stone-500 text-sm font-normal leading-[20px]"
                placeholder="Safe Address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleFetchData}
            className="flex px-[12px] py-[8px] justify-center items-center gap-[4px] rounded-md bg-earth-700 text-stone-white text-sm font-medium leading-[20px]"
            style={{
              background: "var(--earth-700, #4C7064)",
              color: "var(--stone-white, #FFF)",
            }}
          >
            Calculate
          </button>
        </div>

        {/* Response */}
        {!loading && toggle && (
          <div className="Box w-[536px] h-[158px] flex-col justify-start items-center inline-flex">
            <div className="self-stretch h-[52px] p-4 bg-teal-50 rounded-tl rounded-tr border border-zinc-200 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-700 text-sm font-semibold leading-tight">
                  Total gas fees incurred
                </div>
                <div className="grow shrink basis-0 h-5" />
                <div className="justify-start items-start gap-0.5 flex">
                  <div className="text-zinc-700 text-sm font-normal leading-tight">
                    {form?.totalGasSpent}
                  </div>
                  <div className="justify-start items-start flex">
                    <img className="w-5 h-5 relative" src="/Fiat.svg" />
                    <div className="text-zinc-700 text-sm font-normal leading-tight">
                      USD
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[106px] p-4 bg-teal-50 rounded-bl rounded-br border-l border-r border-b border-zinc-200 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-700 text-sm font-semibold leading-tight">
                  Gas fees paid by Utopia
                </div>
                <div className="grow shrink basis-0 h-5 justify-end items-end gap-1 flex">
                  <div className="justify-start items-start gap-0.5 flex">
                    <div className="text-zinc-700 text-sm font-normal leading-tight">
                      {form?.utopiaGasSpent}
                    </div>
                    <div className="justify-start items-start flex">
                      <img className="w-5 h-5 relative" src="/Fiat.svg" />
                      <div className="text-zinc-700 text-sm font-normal leading-tight">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-700 text-sm font-semibold leading-tight">
                  Gas fees paid by you
                </div>
                <div className="grow shrink basis-0 h-5 justify-end items-end gap-1 flex">
                  <div className="justify-start items-start gap-0.5 flex">
                    <div className="text-zinc-700 text-sm font-normal leading-tight">
                      {form?.gasSpent}
                    </div>
                    <div className="justify-start items-start flex">
                      <img className="w-5 h-5 relative" src="/Fiat.svg" />
                      <div className="text-zinc-700 text-sm font-normal leading-tight">
                        USD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-right text-zinc-500 text-xs font-normal leading-[18px]">
                USD in present value. Results are limited to the last 10k TX.*
              </div>
            </div>
          </div>
        )}
        {loading && (
          <RingLoader loading={loading} size={100} className="mt-[24px]" />
        )}
        {!loading && error && (
          <p className="text-red-700">Please enter a valid address.</p>
        )}
      </div>

      {/* Card */}
      <div
        className="flex w-[160px] p-[12px] flex-col justify-end items-start gap-[12px] ml-[1336px] mt-[18px] rounded-md border border-sea-200 bg-sea-50"
        style={{
          borderColor: "var(--sea-200, #B2D8EB)",
          background: "var(--sea-50, #EBF8FF)",
        }}
      >
        <div className="flex flex-col items-start gap-[4px] self-stretch">
          <div className="self-stretch justify-start items-start gap-1 inline-flex">
            <img src="/local_gas_station.svg" width={18} height={18} />
            <div className="grow shrink basis-0 text-slate-500 text-xs font-semibold leading-none">
              TOTAL GAS SPENT BY ALL OF UTOPIA
            </div>
          </div>
          <div className="px-6 flex-col justify-start items-start gap-2.5 flex">
            <div className="justify-end items-end gap-1 inline-flex">
              <div className="justify-start items-start gap-0.5 flex">
                {!cardLoading && (
                  <div className="text-zinc-700 text-xs font-normal leading-tight">
                    {card}
                  </div>
                )}
                {cardLoading && <MoonLoader loading={cardLoading} size={10} />}
                <div className="justify-start items-start flex">
                  <div className="w-[15px] h-[15px] relative">
                    <img src="/Fiat.svg" width={15} height={15} />
                  </div>
                  <div className="text-zinc-700 text-xs font-normal leading-tight">
                    USD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
