import { NextResponse } from 'next/server';
import { URL } from 'url';
import { Decimal } from 'decimal.js';
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');

    const dotenv = require('dotenv');
    dotenv.config();

    const res = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=' + input + '&apikey=' + process.env.yourApiKeyToken,
        {
          method: "GET"
        }
      );
    const data = await res.json();
    const transactions = data.result;

    let totalGasSpent = new Decimal(0);

    for (var i = 0; i < transactions.length; i++){
        const gasUsed = new Decimal(transactions[i].gasUsed);
        let gasPrice = new Decimal(transactions[i].gasPrice);
        gasPrice = gasPrice.dividedBy(new Decimal(10**18))

        const gasFee = gasUsed.times(gasPrice);
        totalGasSpent = totalGasSpent.add(gasFee);
    };

    return NextResponse.json({ transactions: totalGasSpent });
}