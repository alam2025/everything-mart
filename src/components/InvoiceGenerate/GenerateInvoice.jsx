import React from 'react';

const GenerateInvoice = ({index, item}) => {
     
      const amount= parseFloat(item.Quantity) * parseFloat(item['Unit Price'])
     
      return (
            <tr className=' flex px-2 md:px-10 gap-6'>
                  <td >{index+1}</td>
                  <td className=' flex-grow'>{item['Item Name']}</td>
                  <td>{item['Quantity']}</td>
                  <td>${parseFloat(item['Unit Price']).toFixed(2)}</td>
                  <td>${amount.toFixed(2)}</td>
            </tr>
      );
};

export default GenerateInvoice;