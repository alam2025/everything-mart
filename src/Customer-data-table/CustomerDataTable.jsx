import React from 'react';
import useCustomerData from '../hooks/useCustomerdata';
import Table from './Table';


const CustomerDataTable = ({setShowPopup,setId}) => {
     const [customerData, refetch]= useCustomerData()
      
     
      return (
            <div className="overflow-x-auto">
                  <table className="table ">
                        {/* head */}
                        <thead>
                              <tr className=' bg-slate-800  text-white'>
                                    <th className=' '>Order Id</th>
                                    <th>Customer Name</th>
                                    <th>Total Amount</th>
                                    <th>Order Date</th>
                                    <th>Generate Invoice</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    customerData.map((data,index)=><Table
                                    key={index}
                                    data={data}
                                    setShowPopup={setShowPopup}
                                    setId={setId}
                                    ></Table>)
                              }
                              
                        </tbody>
                  </table>
            </div>
      );
};

export default CustomerDataTable;