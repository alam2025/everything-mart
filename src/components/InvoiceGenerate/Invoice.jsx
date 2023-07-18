import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import GenerateInvoice from './GenerateInvoice';
import moment from 'moment';

const Invoice = () => {
      const { id } = useParams()

      const { data: customerData = [], isLoading } = useQuery({
            queryKey: ['customerData'],
            queryFn: async () => {
                  const res = await fetch(`http://localhost:4000/customer_info/${id}`);
                  return res.json();
            }
      })

      if (isLoading) {
            return <h2>loding....</h2>
      }

      const totalPrice = customerData.reduce((accumulator, product) => {
            return accumulator + (parseFloat(product['Quantity']) * parseFloat(product['Unit Price']));
      }, 0);



      return (
            <div className=' w-[90%] md:w-[70%] mx-auto my-16'>
                  <div className='flex flex-col gap-6'>
                        <h1 className='text-4xl font-bold text-purple-700 '>Invoice</h1>
                        <div>

                              <div className=' text-lg font-semibold'>
                                    <h3>Invoice No #  <span className=' text-purple-800'>{customerData[0]['Order ID']}</span></h3>
                                    <h3>Invoice Date #  <span className='text-purple-800'>{moment(customerData[0]['Order Date']).format('MMM DD, YYYY')}</span></h3>
                                    <h3>Due Date #  <span className=' text-purple-800'>{moment(customerData[0]['Order Date']).add(10, 'days').format('MMM DD, YYYY')}</span></h3>
                              </div>

                        </div>
                        <div className=' flex flex-col md:flex-row justify-center gap-8 w-full'>
                              <div className=' bg-purple-200 p-6 rounded-lg w-full'>
                                    <h1 className=' text-xl font-semibold text-purple-700'>Billed By</h1>
                                    <h4 className=' font-semibold text-purple-900'>Alam Hossain</h4>
                                    <address className=' text-purple-700'>
                                          55 Esk Street, Invercargill 9010, <br />
                                          United States of America (USA)

                                    </address>
                              </div>
                              <div className='bg-purple-200 p-6 rounded-lg w-full'>
                                    <h1 className=' text-xl font-semibold text-purple-700'>Billed To</h1>
                                    <h4 className=' font-semibold text-purple-900'>{customerData[0].Customer}</h4>
                                    <address className=' text-purple-700'>
                                          United States of America (USA)
                                    </address>
                              </div>
                        </div>
                  </div>

                  {/* table that show all info of product  */}
                  <div className="overflow-x-auto mt-6 rounded-t-md">
                        <table className="table table-zebra">
                              <thead className='rounded-t-md'>
                                    <tr className=' bg-blue-700 text-white flex px-2 md:px-10 gap-6'>
                                          <th>#</th>
                                          <th className=' flex-grow'>Item</th>
                                          <th>Quantity</th>
                                          <th>Rate</th>
                                          <th>Amount</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          customerData.map((item, index) => <GenerateInvoice
                                                key={index}
                                                index={index}
                                                item={item}
                                          />)
                                    }
                              </tbody>
                        </table>
                  </div>
                  <div className='w-3/4 md:w-1/2 flex justify-between ms-auto px-10 text-2xl font-semibold text-purple-800 border-y-2 mt-4 py-2'>
                        <h1>Total (USD)</h1>
                        <p>${totalPrice.toFixed(2)}</p>
                  </div>
            </div>
      );
};

export default Invoice;