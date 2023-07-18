import React from 'react';

const InvoiceTable = ({item,index}) => {
      const amount = parseFloat(item.Quantity) * parseFloat(item['Unit Price'])
      return (
            <tr key={index} className=' '>
                  <td >{index + 1}</td>
                  <td className=' '>{item['Item Name']}</td>
                  <td>{item['Quantity']}</td>
                  <td>${parseFloat(item['Unit Price']).toFixed(2)}</td>
                  <td>${amount.toFixed(2)}</td>
            </tr>
      );
};

export default InvoiceTable;