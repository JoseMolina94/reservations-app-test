'use client'

import { useContext } from "react"
import { ReservationContext } from "@/contexts/ReservationsContext"

export default function UserListPagination() {
  const {
    currentPage,
    totalPages,
    handlePageChange,
  } = useContext(ReservationContext)

  return (
    <div>
      <div className="flex gap-8 items-center justify-center px-4 py-6 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="font-bold text-2xl"
        >
          {"<"}
        </button>

        <span className="font-medium text-sm" >Página {currentPage} de {totalPages}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="font-bold text-2xl"
        >
          {">"}
        </button>
      </div>
    </div>
  )
}