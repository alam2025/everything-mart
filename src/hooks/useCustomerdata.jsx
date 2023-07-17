import { useQuery } from "@tanstack/react-query"

const useCustomerData=()=>{
      const {data:customerData=[], refetch}= useQuery({
            queryKey:['data'],
            queryFn:async()=>{
                  const res= await fetch(`http://localhost:4000/customer_info`)
                  return res.json()
            }
      })
      return [customerData,refetch];
}

export default useCustomerData