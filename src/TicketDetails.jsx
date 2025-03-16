export default function TicketDetails({ formData, onReset }) {
    return (
      <div className="relative max-w-md mx-auto text-center">
        {/* Ticket Shape */}
        <div className="relative bg-white border-4 border-red-600 rounded-xl shadow-lg p-5 text-gray-900 
                        before:absolute before:w-8 before:h-8 before:bg-white before:rounded-full before:-left-4 before:top-1/2 before:-translate-y-1/2 
                        after:absolute after:w-8 after:h-8 after:bg-white after:rounded-full after:-right-4 after:top-1/2 after:-translate-y-1/2 mb-5">
          <h2 className="text-3xl font-bold text-red-600 tracking-wider uppercase mb-3">
            🎡 Carnival Park 🎠
          </h2>

          {/* Ticket Details */}
          <div className="border-t border-dashed border-gray-400 pt-4 text-left">
            <p className="text-sm">
              <strong>Name:</strong> 
              <span className="block break-words whitespace-normal" >{formData.name}</span>
            </p>
            <p className="text-sm">
              <strong>Email:</strong> 
              <span className="block break-words whitespace-normal">{formData.email}</span>
            </p>
            <p className="text-sm"><strong>Tickets:</strong> {formData.numberOfTickets}</p>
            <p className="text-sm"><strong>Type:</strong> {formData.ticketType}</p>
            <p className="text-sm"><strong>Visit Date:</strong> {formData.dates}</p> {/* Added visit date */}
            <p className="text-sm"><strong>Total Price:</strong> ₱{formData.price}</p>
          </div>

          {/* Barcode */}
          <div className="mt-4 flex justify-center">
            <div className="h-10 w-40 bg-black rounded-md flex items-center justify-center">
              <div className="h-full w-1 bg-white mx-1"></div>
              <div className="h-full w-2 bg-white mx-1"></div>
              <div className="h-full w-1 bg-white mx-1"></div>
              <div className="h-full w-3 bg-white mx-1"></div>
              <div className="h-full w-1 bg-white mx-1"></div>
              <div className="h-full w-2 bg-white mx-1"></div>
            </div>
          </div>
        </div>

        {/* Button */}
        {/* <button
          onClick={onReset}
          className="mt-5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          🎢 Book Another Ticket
        </button> */}
      </div>
    );
}
