import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import GenerateInvoice from './GenerateInvoice';




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



   


      return (
            <div id='ab'>

                  {/* className=' px-[10%] md:px-[20%] mx-auto my-16' */}


                  {/* <button onClick={handleDownload}>Download</button> */}
                  <GenerateInvoice  customerData={customerData}></GenerateInvoice>
                  



            </div>
      );
};

export default Invoice;