import moment from 'moment/moment';
import React from 'react';

const Table = ({data,setShowPopup,setId}) => {
      const {ID,customerName,totalAmount, orderDate}= data;
      return (
            <tr>
                  <td onClick={()=>[setShowPopup(true), setId(ID)]} title='Click for Details' className='hover:font-bold cursor-pointer bg-gray-50'>{ID} -</td>
                  <td>{customerName}</td>
                  <td>${totalAmount.toFixed(2)}</td>
                  <td>{moment(orderDate).format("DD / MM / YYYY")}</td>
                 
                  <td>
                        <button className=' btn btn-sm '>Invoice</button>
                  </td>
            </tr>
      );
};

export default Table;