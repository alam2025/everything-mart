import React, { useState } from 'react';
import InvoiceTable from './InvoiceTable';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const GenerateInvoice = ({ customerData }) => {
      const navigate = useNavigate()
      const [loader, setLoader] = useState(false);


      const totalPrice = customerData.reduce((accumulator, product) => {
            return accumulator + (parseFloat(product['Quantity']) * parseFloat(product['Unit Price']));
      }, 0);

      //handle download
      const handleInvoice = () => {
            const capture = document.querySelector('.invoice');

            setLoader(true);
            html2canvas(capture).then((canvas) => {
                  const imgData = canvas.toDataURL('img/png');
                  const doc = new jsPDF('p', 'mm', 'a4');

                  // Set the page width and height
                  const pageWidth = doc.internal.pageSize.getWidth();
                  const pageHeight = doc.internal.pageSize.getHeight();

                  // Calculate the aspect ratio of the captured image
                  const aspectRatio = canvas.width / canvas.height;

                  // Calculate the desired width and height of the image in the PDF
                  let imgWidth, imgHeight;
                  if (aspectRatio >= 1) {
                        imgWidth = pageWidth;
                        imgHeight = pageWidth / aspectRatio;
                  } else {
                        imgHeight = pageHeight;
                        imgWidth = pageHeight * aspectRatio;
                  }

                  // Add the image to the PDF
                  doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                  setLoader(false);
                  doc.save('invoice.pdf');
                  navigate('/')
            });
      }

      const handlePrint = () => {
            window.print()
      }


      return (<div className='invoice w-[1200px]  px-[20%] py-28'>
            <div className='flex flex-col gap-6 '>

                  <div className=' flex justify-between'>
                        <h1 className='text-4xl font-bold text-purple-700 '>Invoice</h1>
                        <div>
                              <button
                                    onClick={handleInvoice}
                                    className='btn btn-sm'
                                    disabled={!(loader === false)}
                              >
                                    {loader ? (
                                          <span>Downloading</span>
                                    ) : (
                                          <span>Download</span>
                                    )}
                              </button>
                              <button onClick={handlePrint} className=' btn btn-sm'>Print</button>
                        </div>
                  </div>

                  <div>

                        <div className=' text-lg font-semibold'>
                              <h3>Invoice No #  <span className=' text-purple-800'>{customerData[0]['Order ID']}</span></h3>
                              <h3>Invoice Date #  <span className='text-purple-800'>{moment(customerData[0]['Order Date']).format('MMM DD, YYYY')}</span></h3>
                              <h3>Due Date #  <span className=' text-purple-800'>{moment(customerData[0]['Order Date']).add(10, 'days').format('MMM DD, YYYY')}</span></h3>
                        </div>

                  </div>

                  {/* address  */}
                  <div className=' flex   md:flex-row justify-center gap-8 w-full'>
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


            {/* table  */}
            <div className="overflow-x-auto mt-6 rounded-t-md">
                  <table className="table table-zebra">
                        <thead className='rounded-t-md'>
                              <tr className=' bg-blue-700 text-white'>
                                    <th>#</th>
                                    <th className=''>Item</th>

                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>

                              </tr>
                        </thead>
                        <tbody>
                              {
                                    customerData.map((item, index) => <InvoiceTable
                                          key={index}
                                          index={index}
                                          item={item}
                                    />)
                              }
                        </tbody>
                  </table>
            </div>

            {/* total price  */}
            <div className='w-3/4 md:w-1/2 flex justify-between ms-auto px-10 text-2xl font-semibold text-purple-800 border-y-2 mt-4 py-2'>
                  <h1>Total (USD)</h1>
                  <p>${totalPrice.toFixed(2)}</p>
            </div>
      </div>

      );
};

export default GenerateInvoice;