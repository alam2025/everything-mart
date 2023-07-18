
import { useState } from 'react';
import './App.css'
import CustomerDataTable from './Customer-data-table/CustomerDataTable';
import CustomModal from './components/Modal/CustomModal';
import useCustomerData from './hooks/useCustomerdata';



function App() {
  const [,,isLoading]= useCustomerData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isPending, setPending] = useState(false);
  const [showPopup,setShowPopup]= useState(false);
  const [id,setId]=useState('')
 if(isLoading){
  return <h2>Loading...</h2>
 }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setPending(true);
    // Handle the file upload here
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make the API request to upload the file
      fetch('http://localhost:4000/data/upload', {
        method: 'POST',
        body: formData,
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

  return (
    <>
    {/* show modal after click on customer Id  */}
    {
      showPopup &&
      <CustomModal setShowPopup={setShowPopup} id={id} setId={setId}></CustomModal>
    }
      <div>
        <form onSubmit={handleSubmit} className=' flex flex-col md:flex-row   w-1/2 mx-auto mt-12'>
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
              <button className='btn btn-secondary px-20 '> Upload</button>
          }

        </form>

        {/* all data show in table format  */}

        <div className=' md:w-3/4 border mx-auto my-8'>
          <CustomerDataTable setShowPopup={setShowPopup} setId={setId}></CustomerDataTable>
        </div>
      </div>
    </>
  )
}

export default App
