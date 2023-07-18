import moment from 'moment';
import React from 'react';

const ModalTable = ({ data,index }) => {
      console.log(data);
      return (
            <tr>
                  <td>{index+1}</td>
                  <td>{data['Order ID']}</td>
                  <td>{data['Item Name']}</td>
                  <td>{moment(data['Order Date']).format("DD / MM / YYYY")}</td>
                  <td>${data['Unit Price']}</td>
                  <td>{data['Quantity']}</td>
            </tr>
      );
};

export default ModalTable;