
import { useState } from 'react';
import './App.css'
import CustomerDataTable from './Customer-data-table/CustomerDataTable';
import CustomModal from './components/Modal/CustomModal';



function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [isPending, setPending] = useState(false);
  const [showPopup,setShowPopup]= useState(false);
  const [id,setId]=useState('')


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

      console.log(formData);


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
    {
      showPopup &&
      <CustomModal setShowPopup={setShowPopup} id={id} setId={setId}></CustomModal>
    }
      <div>
        <form onSubmit={handleSubmit} className=' flex flex-col md:flex-row   w-1/2 mx-auto '>
          <div className=' relative'>

            <input type="file" accept=".csv" onChange={handleFileChange} />
            {error &&
              <p className=' text-red-500 absolute'>{error}</p>}
          </div>
          {
            isPending ? <button className="btn btn-secondary  px-20">
              <span className="loading loading-spinner z-10"></span>
            </button>
              :
              <button className='btn btn-secondary px-20 '> Submit</button>
          }

        </form>

        <div className=' md:w-3/4 border mx-auto mt-8'>
          <CustomerDataTable setShowPopup={setShowPopup} setId={setId}></CustomerDataTable>
        </div>
      </div>
    </>
  )
}

export default App
