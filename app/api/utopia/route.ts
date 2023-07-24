import { NextResponse } from 'next/server';
import { URL } from 'url';
import { Decimal } from 'decimal.js';

export async function GET(request: Request) {

  console.log("success")

  const dotenv = require('dotenv');
  dotenv.config();

  const utopiaAddress = ["0xa727C953FFE3E461573736fDe77D20cFDce9fCa3", "0xeFb0bB57EC47C8D15460DE30Cbe1EDe13DC99379","0x8A7a705Bf63Fd09166fb2167c296FC554443b393","0x7D5Fa3820426f448031F16488621bb4e32b62898"]

  let cardValue = new Decimal(0);

  for(const val of utopiaAddress){

      const res = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=' + val + '&apikey=' + process.env.yourApiKeyToken,
          {
              method: "GET"
          }
      );
  
      const data = await res.json();
      const transactions = data.result;

      for (var i = 0; i < transactions.length; i++){
          const gasUsed = new Decimal(transactions[i].gasUsed);
          let gasPrice = new Decimal(transactions[i].gasPrice);
          gasPrice = gasPrice.dividedBy(new Decimal(10**18))
  
          const gasFee = gasUsed.times(gasPrice);
          cardValue = cardValue.add(gasFee);
      }

  }

  const ethusd = new Decimal(await getEtherPrice());
  cardValue = cardValue.times(ethusd)
  const newCardValue = cardValue.toFixed(2)

  return NextResponse.json({result: newCardValue})
}

const getEtherPrice = async () => {
  const res = await fetch('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=' + process.env.yourApiKeyToken,
      {
          method: "GET"
      }
  );

  const data = await res.json();
  const price = data.result.ethusd;

  return price;
} 