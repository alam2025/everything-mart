import moment from 'moment';
import React from 'react';

const ModalTable = ({ data }) => {
      console.log(data);
      return (
            <tr>
                  <td>{data['Order ID']}</td>
                  <td>{data['Item Name']}</td>
                  <td>{moment(data['Order Date']).format("DD / MM / YYYY")}</td>
                  <td>{data['Unit Price']}</td>
                  <td>{data['Quantity']}</td>
            </tr>
      );
};

export default ModalTable;