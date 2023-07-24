import { NextResponse } from "next/server";
import { URL } from "url";
import { Decimal } from "decimal.js";

type GasCheckerResponse = {
  totalGasSpent: string;
  utopiaGasSpent: string;
  gasSpent: string;
  // totalUtopia: string
};

export async function GET(request: Request) {
  // totalGasSpent

  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  const dotenv = require("dotenv");
  dotenv.config();

  const res = await fetch(
    "https://api.etherscan.io/api?module=account&action=txlist&address=" +
      input +
      "&apikey=" +
      process.env.yourApiKeyToken,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  const transactions = data.result;

  let totalGasSpent = new Decimal(0);

  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].from === input?.toLowerCase()) {
      const gasUsed = new Decimal(transactions[i].gasUsed);
      let gasPrice = new Decimal(transactions[i].gasPrice);
      gasPrice = gasPrice.dividedBy(new Decimal(10 ** 18));

      const gasFee = gasUsed.times(gasPrice);
      totalGasSpent = totalGasSpent.add(gasFee);
    }
  }

  // utopiaGasSpent

  const utopiaAddress = [
    "0xa727C953FFE3E461573736fDe77D20cFDce9fCa3",
    "0xeFb0bB57EC47C8D15460DE30Cbe1EDe13DC99379",
    "0x8A7a705Bf63Fd09166fb2167c296FC554443b393",
    "0x7D5Fa3820426f448031F16488621bb4e32b62898",
  ];

  let utopiaGasSpent = new Decimal(0);

  for (const val of utopiaAddress) {
    const res = await fetch(
      "https://api.etherscan.io/api?module=account&action=txlist&address=" +
        val +
        "&apikey=" +
        process.env.yourApiKeyToken,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    const transactions = data.result;

    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].to === input?.toLowerCase()) {
        let gasUsed = new Decimal(transactions[i].gasUsed);
        let gasPrice = new Decimal(transactions[i].gasPrice);
        gasPrice = gasPrice.dividedBy(new Decimal(10 ** 18));

        const gasFee = gasUsed.times(gasPrice);
        utopiaGasSpent = utopiaGasSpent.add(gasFee);
      }
    }
  }

  //gasSpent

  let gasSpent = totalGasSpent.minus(utopiaGasSpent);

  //conversion from eth to usd

  const ethusd = new Decimal(await getEtherPrice());
  totalGasSpent = totalGasSpent.times(ethusd);
  utopiaGasSpent = utopiaGasSpent.times(ethusd);
  gasSpent = gasSpent.times(ethusd);
  const newTotalGasSpent = totalGasSpent.toFixed(2);
  const newUtopiaGasSpent = utopiaGasSpent.toFixed(2);
  const newGasSpent = gasSpent.toFixed(2);

  return NextResponse.json({
    totalGasSpent: "$" + newTotalGasSpent,
    utopiaGasSpent: "$" + newUtopiaGasSpent,
    gasSpent: "$" + newGasSpent,
  });
}

const getEtherPrice = async () => {
  const res = await fetch(
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
      process.env.yourApiKeyToken,
    {
      method: "GET",
    }
  );

  const data = await res.json();
  const price = data.result.ethusd;

  return price;
};
