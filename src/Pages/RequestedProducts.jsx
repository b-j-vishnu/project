import axios from 'axios'
import { useEffect, useState } from 'react'
import icon from '../../Images/mobileIcon.png'
import { Link } from 'react-router-dom'
const AdminPage = () => {
    const [allCustomerRequests,setAllCustomerRequests]=useState([])
    const [update,setUpdate]=useState(false)
    useEffect(() => {
        const getCustomerRequests = async () => {
            const data = await axios.get('http://localhost:4500/getCustomerRequest', { withCredentials: true })
            setAllCustomerRequests(data.data)
            console.log(data.data)
        }

        getCustomerRequests()
    }, [update])

    const handleDelivery = async() => {
    try{ 
        let temp = []
       allCustomerRequests.forEach((item)=>{
            item.Requested_products.forEach((each)=>{
                if(each.status =='new'){
                    temp.push(each)
                }
            })
        })
        const data = await axios.post('http://localhost:4500/deliverProducts',temp,{
       headers:{"Content-Type":"application/json"},
       withCredentials:true})
       console.log(data);
       setTimeout(()=>{
        setUpdate(!update)

       },2000)
        setAllCustomerRequests([])
       }
       catch(err){
        console.log(err.response)
       }
    }
  return (
    <div className='w-full flex flex-col items-center'>

        <nav className="w-full max-h-16  sm:px-24 sm:py-[0.3rem] fixed flex flex-row items-center justify-between px-7  top-0 bg-sky-700  text-white">
            <div className='sm:w-28 h-10 max-sm:w-10'>
                <Link to='/'>
                    <img src={icon} className=' block sm:w-1/2  bg-white h-10 '></img>
                </Link>
            </div>
            <div className='flex sm:basis-1/2 justify-evenly max-sm:flex flex-row max-sm:justify-between'>
                <Link to='/' className='hover:text-black font-bold hidden sm:inline-block  focus:text-white focus:bg-green-500 focus:rounded-lg focus:py-1 focus:px-2 '>Home</Link>
        </div>

    </nav>
    
    <ul className='w-1/2 flex flex-col mt-12 ' >
            {allCustomerRequests && allCustomerRequests.length?
                allCustomerRequests.map((item)=>(
                <div className='flex justify-around flex-col w-full  mt-5 border-b-2 pb-4' key={1}>
                    <li className='flex w-full justify-between m t-5'>
                        <p>{`NAME : ${item.Requested_name}`}</p>
                        <p>{`EMAIL : ${item.Requested_email}`}</p>
                        <p>{`NUMBER : ${item.Requested_number}`}</p>
                    </li>
                    
                    <li className=''>
                            {item.Requested_products.map((product)=>(
                                <div className='flex max-w-full justify-between mt-6' key={product.product_id}>
                                    <img src={product.product_image} className='h-16'></img>
                                    <p className='w-1/2'>{product.product_name}</p>
                                    <p>{product.count}</p>
                                    <p>RS. {product.product_price}</p>
                                    <p>STATUS :
                                        <mark className='bg-green-600 px-2 py-1 rounded ml-2 '>{product.status}</mark>
                                    </p>
                                </div>
                            ))}
                    </li>
                </div>

                ))
            :<p className='text-3xl my-48 mx-auto'>Customer has not ordered yet</p>}
    </ul>

    
    {allCustomerRequests &&allCustomerRequests.length?
    <div className='bg-black w-[60%] p-2 flex fixed bottom-0 justify-center rounded-t-3xl'>
        <button onClick={handleDelivery} className='button px-2 bg-green-700 py-1 text-white' disabled={allCustomerRequests?false:true}>Deliver These Products</button>
    </div>
    :null
    }
    </div>
    

  )
}

export default AdminPage