import React from 'react';
import useCustomerData from '../hooks/useCustomerdata';
import Table from './Table';


const CustomerDataTable = ({ setShowPopup, setId }) => {
      let [customerData, refetch,isLoading] = useCustomerData();
      if(isLoading){
            return <h2>loadin...</h2>
      }

      // customerData = customerData.slice(0, 10)
      return (
           
            <div className="overflow-x-auto">
                  <table className="table ">

                        <thead>
                              <tr className=' bg-slate-800  text-white'>
                                    <th>#</th>
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
                                    index={index}
                                    ></Table>)
                              }

                        </tbody>
                  </table>
            </div>
      );
};

export default CustomerDataTable;