import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAVehicle.css";
import Header from "../components/LoginHeader";
import Footer from "../components/Footer";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  type: string;
  color: string;
  fuelType: string;
  transmission: string;
  seats: number;
  year: number;
  image: string;
  prices: {
    oneDay: number;
    threeDay: number;
    fiveDay: number;
  };
}

function BookAVehicle() {
  const navigate = useNavigate();

  const selectedVehicle: Vehicle | null = JSON.parse(
    localStorage.getItem("selectedVehicle") || "null"
  );

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!selectedVehicle) {
    return (
      <>
        <main className="book-page">
          <Header />

          <div className="book-no-vehicle">
            <h1>NO VEHICLE SELECTED</h1>

            <button onClick={() => navigate("/vehicles")}>
              VIEW VEHICLES
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const DRIVER_DAILY_RATE = 1000;

  const getTotalDays = () => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
      return 0;
    }

    const pickup = new Date(`${pickupDate}T${pickupTime}`);
    const returned = new Date(`${returnDate}T${returnTime}`);

    const difference = returned.getTime() - pickup.getTime();

    if (difference <= 0) {
      return 0;
    }

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const totalDays = getTotalDays();

  const getRentalPrice = () => {
    if (totalDays <= 0) {
      return 0;
    }

    if (totalDays <= 1) {
      return selectedVehicle.prices.oneDay;
    }

    if (totalDays <= 3) {
      return selectedVehicle.prices.threeDay;
    }

    if (totalDays <= 5) {
      return selectedVehicle.prices.fiveDay;
    }

    const extraDays = totalDays - 5;
    const dailyPrice = selectedVehicle.prices.fiveDay / 5;

    return (
      selectedVehicle.prices.fiveDay +
      extraDays * dailyPrice
    );
  };

  const rentalPrice = getRentalPrice();

  const driverPrice =
    withDriver && totalDays > 0
      ? DRIVER_DAILY_RATE * totalDays
      : 0;

  const totalPrice = rentalPrice + driverPrice;

  const isValidDuration =
    !!pickupDate &&
    !!pickupTime &&
    !!returnDate &&
    !!returnTime &&
    totalDays > 0;

  const formatDate = (
    date: string,
    time: string
  ) => {
    if (!date || !time) {
      return "Not selected";
    }

    const dateObject = new Date(
      `${date}T${time}`
    );

    return dateObject.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString("en-IN")}`;
  };

  const vehicleInfo = [
    ["NAME", selectedVehicle.name],
    ["BRAND", selectedVehicle.brand],
    ["TYPE", selectedVehicle.type],
    ["COLOR", selectedVehicle.color],
    ["FUEL TYPE", selectedVehicle.fuelType],
    ["TRANSMISSION", selectedVehicle.transmission],
    ["SEATS", selectedVehicle.seats.toString()],
    ["YEAR", selectedVehicle.year.toString()],
  ];

  const handleBookNow = () => {
    if (
      !pickupDate ||
      !pickupTime ||
      !returnDate ||
      !returnTime ||
      !mobileNumber ||
      !paymentMethod
    ) {
      alert("Please fill all booking details");
      return;
    }

    if (totalDays <= 0) {
      alert(
        "Return date and time must be after pickup date and time"
      );
      return;
    }

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const booking = {
      userEmail: currentUser.email,
      vehicle: selectedVehicle,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      mobileNumber,
      withDriver,
      paymentMethod,
      totalDays,
      rentalPrice,
      driverPrice,
      totalPrice,
      bookingDate: new Date().toISOString(),
    };

    const bookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    bookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
    );

    localStorage.removeItem("selectedVehicle");

    navigate("/dashboard");
  };

  return (
    <>
      <main className="book-page">
        <Header />

        <section className="book-content">
          <h1 className="book-title">
            BOOK A VEHICLE
          </h1>

          <section className="book-vehicle-section">
            <div className="book-vehicle-details">
              {vehicleInfo.map(([label, value]) => (
                <div
                  className="book-spec"
                  key={label}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="book-vehicle-image">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
              />
            </div>
          </section>

          <section className="booking-details">
            <div className="booking-left">
              <div className="booking-field-group">
                <label>
                  PICKUP DAY AND TIME
                </label>

                <div className="booking-input-row">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) =>
                      setPickupDate(e.target.value)
                    }
                  />

                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) =>
                      setPickupTime(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="booking-field-group">
                <label>
                  RETURN DAY AND TIME
                </label>

                <div className="booking-input-row">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) =>
                      setReturnDate(e.target.value)
                    }
                  />

                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) =>
                      setReturnTime(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="booking-field-group mobile-field">
                <label>MOBILE NUMBER</label>

                <input
                  className="mobile-input"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(e.target.value)
                  }
                />
              </div>

              <label className="driver-option">
                <input
                  type="checkbox"
                  checked={withDriver}
                  onChange={(e) =>
                    setWithDriver(e.target.checked)
                  }
                />

                <span>WITH DRIVER</span>
              </label>
            </div>

            {/* RENTAL BILL */}

            <div className="booking-bill">
              <div className="bill-header">
                <div>
                  <span className="bill-label">
                    RENTAL INVOICE
                  </span>

                  <h2>BOOKING SUMMARY</h2>
                </div>

                <span className="bill-icon">
                  VR
                </span>
              </div>

              <div className="bill-vehicle">
                <div className="bill-vehicle-image">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                  />
                </div>

                <div className="bill-vehicle-info">
                  <h3>
                    {selectedVehicle.name}
                  </h3>

                  <p>
                    {selectedVehicle.brand} ·{" "}
                    {selectedVehicle.type}
                  </p>

                  <span>
                    {selectedVehicle.year} ·{" "}
                    {selectedVehicle.color}
                  </span>
                </div>
              </div>

              <div className="bill-divider"></div>

              <div className="bill-date-section">
                <div className="bill-date-row">
                  <span>PICKUP</span>

                  <strong>
                    {formatDate(
                      pickupDate,
                      pickupTime
                    )}
                  </strong>
                </div>

                <div className="bill-date-row">
                  <span>RETURN</span>

                  <strong>
                    {formatDate(
                      returnDate,
                      returnTime
                    )}
                  </strong>
                </div>

                <div className="bill-date-row">
                  <span>DURATION</span>

                  <strong>
                    {isValidDuration
                      ? `${totalDays} ${
                          totalDays === 1
                            ? "DAY"
                            : "DAYS"
                        }`
                      : "Not selected"}
                  </strong>
                </div>

                <div className="bill-date-row">
                  <span>DRIVER</span>

                  <strong>
                    {withDriver
                      ? "Included"
                      : "Not required"}
                  </strong>
                </div>
              </div>

              <div className="bill-divider"></div>

              <div className="bill-price-section">
                <div className="bill-price-row">
                  <div>
                    <span>
                      VEHICLE RENTAL
                    </span>

                    <small>
                      {isValidDuration
                        ? `${totalDays} ${
                            totalDays === 1
                              ? "day"
                              : "days"
                          }`
                        : "Select rental dates"}
                    </small>
                  </div>

                  <strong>
                    {formatCurrency(
                      rentalPrice
                    )}
                  </strong>
                </div>

                <div className="bill-price-row">
                  <div>
                    <span>
                      DRIVER CHARGE
                    </span>

                    <small>
                      {withDriver
                        ? `${totalDays} ${
                            totalDays === 1
                              ? "day"
                              : "days"
                          } × ${formatCurrency(
                            DRIVER_DAILY_RATE
                          )}`
                        : "Without driver"}
                    </small>
                  </div>

                  <strong>
                    {formatCurrency(
                      driverPrice
                    )}
                  </strong>
                </div>
              </div>

              <div className="bill-total">
                <span>TOTAL AMOUNT</span>

                <strong>
                  {formatCurrency(totalPrice)}
                </strong>

                <p>
                  {isValidDuration
                    ? "FINAL RENTAL ESTIMATE"
                    : "SELECT VALID DATES TO CALCULATE"}
                </p>
              </div>

              <div className="bill-footer">
                <span>
                  VEHICLE RENTAL SERVICES
                </span>

                <span>THANK YOU</span>
              </div>
            </div>
          </section>

          <section className="payment-section">
            <div className="payment-heading">
              <span></span>

              <h2>PAYMENT METHOD</h2>

              <span></span>
            </div>

            <div className="payment-options">
              <button
                className={
                  paymentMethod === "esewa"
                    ? "payment-option selected"
                    : "payment-option"
                }
                onClick={() =>
                  setPaymentMethod("esewa")
                }
              >
                <strong>eSewa</strong>
              </button>

              <button
                className={
                  paymentMethod === "khalti"
                    ? "payment-option selected"
                    : "payment-option"
                }
                onClick={() =>
                  setPaymentMethod("khalti")
                }
              >
                <strong>Khalti</strong>
              </button>

              <button
                className={
                  paymentMethod === "cash"
                    ? "payment-option selected"
                    : "payment-option"
                }
                onClick={() =>
                  setPaymentMethod("cash")
                }
              >
                <strong>CASH</strong>

                <span>ON DELIVERY</span>
              </button>
            </div>

            <div className="book-now-wrapper">
              <button
                className="book-now-button"
                onClick={handleBookNow}
              >
                BOOK NOW
              </button>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default BookAVehicle;


