
import "./CustomModal.css";
import { useQuery } from "@tanstack/react-query";
import ModalTable from "./ModalTable";

const CustomModal = ({ setShowPopup, id, setId }) => {

      const { data: customerData = [] } = useQuery({
            queryKey: ['customerData'],
            queryFn: async () => {
                  const res = await fetch(`https://everything-mart-server.vercel.app/customer_info/${id}`);
                  return res.json();
            }
      })

      

      return (
            <div className="modalBackground ">
                  <div className=" bg-white px-6 py-10 rounded-lg shadow-lg w-[90%] md:w-3/4 z-10">
                        <div className="  flex justify-end items-end">
                              <button className="btn btn-sm btn-secondary z-20 font-bold" onClick={() => [setShowPopup(false), setId('')]}>X</button>
                        </div>
                        <h1 className="text-center text-xl font-bold mb-6">{customerData[0]?.Customer} Details</h1>

                        <div className="overflow-x-auto overflow-y-auto h-[300px]">
                              <table className="table ">
                                    {/* head */}
                                    <thead>
                                          <tr className=' bg-slate-900  text-white'>
                                                <th className=' '>#</th>
                                                <th className=' '>Order Id</th>
                                                <th>Item Name</th>
                                                <th>Order Date</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                
                                          </tr>
                                    </thead>
                                    <tbody className=" bg-gray-700 text-white">
                                          {
                                               customerData?.map((data,index)=><ModalTable
                                               key={index}
                                               data={data}
                                               index={index}
                                               ></ModalTable>) 
                                          }

                                    </tbody>
                              </table>
                        </div>


                  </div>
            </div>
      );
};

export default CustomModal;