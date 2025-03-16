import { useState, useEffect } from "react";
import TicketDetails from "./TicketDetails";
import './index.css';

export default function App() {
  const [isBooked, setIsBooked] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isLoadingBookAnother, setIsLoadingBookAnother] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberOfTickets: 1,
    ticketType: "",
    dates: "",
    payment: "",
    price: 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    numberOfTickets: "",
    ticketType: "",
    dates: "",
    payment: "",
  });

  const [showInfo, setShowInfo] = useState(false);

  const ticketPrices = {
    "Standard": 500,
    "VIP": 1000,
    "Premium": 1500,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    let updatedErrors = { ...formErrors };

    if (value === "") {
      updatedErrors[name] = "This field is required";
    } else {
      updatedErrors[name] = "";
    }

    // Name length validation
    if (name === "name" && value.length > 50) {
      updatedErrors[name] = "Name must be less than 50 characters";
    }

    // Email validation (allowing any valid email)
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(value)) {
        updatedErrors[name] = "Please enter a valid email address";
      } else {
        updatedErrors[name] = "";
      }
    }

    // Limit tickets to max 10
    if (name === "numberOfTickets" && value > 10) {
      updatedErrors[name] = "You can only buy a maximum of 10 tickets";
    }

    // Calculate price
    if (name === "ticketType" || name === "numberOfTickets") {
      if (updatedData.ticketType && updatedData.numberOfTickets) {
        updatedData.price = ticketPrices[updatedData.ticketType] * updatedData.numberOfTickets;
      } else {
        updatedData.price = 0;
      }
    }

    setFormData(updatedData);
    setFormErrors(updatedErrors);
  };

  const handleBooking = () => {
    let errors = { ...formErrors };
    let formValid = true;

    // Check if email is valid before proceeding
    if (!formData.email || formErrors.email) {
      errors.email = "Please enter a valid email address";
      formValid = false;
    }

    Object.keys(formData).forEach((field) => {
      if (formData[field] === "") {
        errors[field] = "This field is required";
        formValid = false;
      }
    });

    if (!formValid) {
      setFormErrors(errors);
      return;
    }

    setIsLoadingSave(true);
    setTimeout(() => {
      setIsBooked(true);
      setIsLoadingSave(false);
    }, 1500);
  };

  const resetForm = () => {
    setIsLoadingBookAnother(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        numberOfTickets: 1,
        ticketType: "",
        dates: "",
        payment: "",
        price: 0,
      });
      setFormErrors({
        name: "",
        email: "",
        numberOfTickets: "",
        ticketType: "",
        dates: "",
        payment: "",
      });
      setIsBooked(false);
      setIsLoadingBookAnother(false);
    }, 1500);
  };

  useEffect(() => {
    if (showInfo) {
      const timer = setTimeout(() => {
        setShowInfo(false); // Hide info
      }, 1000);

      // Cleanup timer when the component unmounts or showInfo changes
      return () => clearTimeout(timer);
    }
  }, [showInfo]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-Poppins bg-cover bg-center"
      style={{ backgroundImage: "url('./bg.jpg')" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border border-gray-300">
        {/* Info icon in the top-right corner */}
        <div
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-red-600 text-white cursor-pointer rounded-full hover:bg-red-800 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12a9 9 0 10-18 0 9 9 0 0018 0z"
            />
          </svg>
        </div>

        {/* Info message box that appears when showInfo is true */}
        {showInfo && (
          <div className="absolute top-14 right-2 bg-red-700 text-white text-sm p-2 rounded-md shadow-lg">
            You can only buy a maximum of 10 tickets per purchase.
          </div>
        )}
        <h1 className="text-3xl font-bold text-red-600 text-center mb-1">
          Enchanted Trails
        </h1>
        <p className="text-gray-500 italic font-thin text-sm mb-6 pl-5 pr-5 text-center">
          Adventure Awaits: Ticket Booking
        </p>

  
        {!isBooked ? (
          <form className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full p-2 border ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={`w-full p-2 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Number of Tickets</label>
              <input
                type="number"
                name="numberOfTickets"
                value={formData.numberOfTickets}
                onChange={handleChange}
                min="1"
                max="10"
                step="1"
                className={`w-full p-2 border ${
                  formErrors.numberOfTickets ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              />
              {formErrors.numberOfTickets && (
                <p className="text-red-500 text-xs mt-1">{formErrors.numberOfTickets}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Ticket Type</label>
              <select
                name="ticketType"
                value={formData.ticketType}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  formErrors.ticketType ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              >
                <option value="" disabled>Select Ticket Type</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Premium">Premium</option>
              </select>
              {formErrors.ticketType && (
                <p className="text-red-500 text-xs mt-1">{formErrors.ticketType}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Visit Date</label>
              <input
                type="date"
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} 
                className={`w-full p-2 border ${
                  formErrors.dates ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              />
              {formErrors.dates && (
                <p className="text-red-500 text-xs mt-1">{formErrors.dates}</p>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  formErrors.payment ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring focus:ring-red-500`}
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="GCash">GCash</option>
                <option value="PayMaya">PayMaya</option>
              </select>
              {formErrors.payment && (
                <p className="text-red-500 text-xs mt-1">{formErrors.payment}</p>
              )}
            </div>
  
            <div className="col-span-2">
              <label className="block font-medium text-red-700 mb-1">Total Price</label>
              <input
                type="text"
                value={formData.price ? `₱${formData.price}` : ""}
                placeholder="Select ticket type & number of tickets"
                disabled
                className={`w-full p-2 border border-red-300 rounded-md bg-red-50 ${
                  formData.price ? "text-gray-900" : "text-gray-500"
                }`}
              />
            </div>
  
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleBooking}
                className={`w-full p-2 h-10 text-sm ${
                  isLoadingSave ? "bg-red-600 opacity-70" : "bg-red-600"
                } text-white font-semibold rounded-md hover:bg-red-700 transition duration-200 flex justify-center items-center`}
                disabled={isLoadingSave}
              >
                {isLoadingSave ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <div className="animate-spin border-4 border-t-4 border-t-white border-transparent rounded-full w-6 h-6 mr-2"></div>
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4 pl-5 pr-5 text-justify">
              The payment method and details are sent to your email. Please pay the amount indicated before receiving the ticket.
            </p>

            <TicketDetails formData={formData} onReset={resetForm} />

            <button
              onClick={resetForm}
              className={`w-full p-2 h-10 ${
                isLoadingBookAnother ? "bg-red-600 opacity-70" : "bg-red-600"
              } text-white text-sm font-semibold rounded-md hover:bg-red-700 transition duration-200 flex justify-center items-center`}
              disabled={isLoadingBookAnother}
            >
              {isLoadingBookAnother ? (
                <>
                  <span className="mr-2">Loading</span>
                  <div className="animate-spin border-4 border-t-4 border-t-white border-transparent rounded-full w-6 h-6 mr-2"></div>
                </>
              ) : (
                "Book Another Ticket"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
