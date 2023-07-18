import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../pages/Shared/Header';
import useCustomerData from '../hooks/useCustomerdata';
import Loader from '../components/Loader';

const Main = () => {
      const [customerData, , isLoading] = useCustomerData();
      if(isLoading){
            return <Loader/>
      }
      return (
            <div>
                  <Header/>
                  <Outlet/>
            </div>
      );
};

export default Main;