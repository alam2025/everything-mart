import moment from 'moment/moment';
import React from 'react';

const Table = ({data}) => {
      const {ID,customerName,totalAmount, orderDate}= data;
      return (
            <tr>
                  <td>{ID}</td>
                  <td>{customerName}</td>
                  <td>{totalAmount.toFixed(2)}</td>
                  <td>{moment(orderDate).format("DD / MM / YYYY")}</td>
                 
                  <td>
                        <button className=' btn btn-sm '>Invoice</button>
                  </td>
            </tr>
      );
};

export default Table;