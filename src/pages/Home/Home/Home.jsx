import { useState } from "react";
import useCustomerData from "../../../hooks/useCustomerdata";
import CustomModal from "../../../components/Modal/CustomModal";
import CustomerDataTable from "../../Customer-data-table/CustomerDataTable";
import Loader from "../../../components/Loader";
import Papa from "papaparse";

const Home = () => {
      const [customerData, , isLoading] = useCustomerData();
      const [selectedFile, setSelectedFile] = useState(null);
      const [error, setError] = useState('');
      const [isPending, setPending] = useState(false);
      const [showPopup, setShowPopup] = useState(false);
      const [id, setId] = useState('');
      const [searchText, setSearchText] = useState('');
      const [isAll, setAll] = useState(true)
      if (isLoading) {
            return <Loader />
      }





      const handleFileChange = (event) => {
            // setSelectedFile(event.target.files[0]);
            const file= event.target.files[0];

            const reader = new FileReader();

            reader.onload = (e) => {
                  const csvData = e.target.result;
                  Papa.parse(csvData, {
                        header: true,
                        complete: (results) => {
                              const jsonData = results.data;
                              // Do something with the converted JSON data
                           
                              setSelectedFile(jsonData)
                        },
                        error: (error) => {
                              console.error("Error parsing CSV:", error);
                        },
                  });
            };

            reader.readAsText(file);
      }

      const handleSubmit = (event) => {
            event.preventDefault(); // Prevent the default form submission
            setPending(true);
            // Handle the file upload here
            if (selectedFile) {
                  

                  // Make the API request to upload the file
                  fetch('https://everything-mart-server.vercel.app/data/upload', {
                        method: 'POST',
                        headers:{
                              'Content-Type':'application/json'
                        },
                        body: JSON.stringify(selectedFile),
                  })
                        .then((response) => {
                              if (response.ok) {
                                    setPending(false);
                                    alert('Data Are inserted success')
                                    event.target.reset();

                                    // Reset the form if needed
                                    setSelectedFile(null);
                              } else {
                                    console.error('Error uploading file:', response.statusText);
                              }
                        })
                        .catch((error) => {
                              console.error('Error uploading file:', error);
                        });
            } else {
                  setError('Please input your file.')
            }
      };

      const handleSearch = (event) => {
            setSearchText(event.target.value)

      }


      let filteredData = customerData.filter((customer) =>
            customer.customerName.toLowerCase().includes(searchText.toLowerCase())
      );


      filteredData = isAll ? filteredData = filteredData.slice(0, 10) : filteredData;
      return (
            <>
                  {/* show modal after click on customer Id  */}
                  {
                        showPopup &&
                        <CustomModal setShowPopup={setShowPopup} id={id} setId={setId}></CustomModal>
                  }
                  <div className=" mb-20">

                        <form onSubmit={handleSubmit} className=' flex  md:flex-row   w-1/2 mx-auto mt-12 justify-center items-center '>
                              <div className=' relative'>

                                    <input type="file" accept=".csv" onChange={handleFileChange} required />
                                    {error &&
                                          <p className=' text-red-500 absolute'>{error}</p>}
                              </div>
                              {
                                    isPending ? <button className="btn btn-secondary  px-20">
                                          <span className="loading loading-spinner z-10"></span>
                                    </button>
                                          :
                                          <button className='btn btn-secondary px-10 '> Upload</button>
                              }

                        </form>

                        {/* search field  */}
                        <div className="form-control my-10 md:w-1/3 mx-auto">
                              <input type="text"
                                    placeholder="Search by Customer Name"
                                    className="input input-bordered w-auto"
                                    onChange={handleSearch}
                                    value={searchText}
                              />
                        </div>

                        {/* all data show in table format  */}

                        <div className=' md:w-3/4 border mx-auto my-8'>
                              <CustomerDataTable
                                    customerData={filteredData}
                                    setShowPopup={setShowPopup}
                                    setId={setId}
                              ></CustomerDataTable>
                        </div>
                        <div className={`flex justify-center items-center ${!isAll && 'hidden'}`}>
                              <button onClick={() => setAll(!isAll)} className="btn btn-sm btn-secondary">Show More</button>
                        </div>
                  </div>
            </>
      );
};

export default Home;