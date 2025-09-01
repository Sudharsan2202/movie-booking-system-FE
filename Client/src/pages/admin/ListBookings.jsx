import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/dateFormat'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBookings()
  }, [])

  return !isLoading ? (
    <> 
      <Title text1="List" text2="Bookings"/> 
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-red-500/20 text-left text-gray-800">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
  {bookings.map((item) => (
    <tr 
      key={item.id || item.show.id} 
      className="border-b border-red-500/10 bg-red-500/5 even:bg-red-500/10">
      <td className="p-2 pl-5 min-w-[180px]">{item.user.title}</td>
      <td className="p-2">{item.show.movie.title}</td>
      <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
      <td className="p-2">{Object.values(item.bookingSeats ?? {}).join(", ")}</td>
      <td className="p-2">{currency} {item.amount}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  ) : (
    <Loading/>
  )
}

export default ListBookings
