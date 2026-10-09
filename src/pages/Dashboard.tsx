import { useEffect, useState } from "react";
import "./Dashboard.css";
import showroomBackground from "../assets/empty-car-showroom 1.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/LoginHeader";
import Footer from "../components/Footer";

const heroCars = [
  {
    name: "Luxury Sedan",
    image:
      "https://pngimg.com/uploads/mercedes/mercedes_PNG80137.png",
  },
  {
    name: "Sports Car",
    image:
      "https://pngimg.com/uploads/audi/audi_PNG1716.png",
  },
  {
    name: "Premium SUV",
    image:
      "https://pngimg.com/uploads/toyota/toyota_PNG1910.png",
  },
  {
    name: "Modern SUV",
    image:
      "https://pngimg.com/uploads/jeep/jeep_PNG4.png",
  },
];

interface Booking {
  userEmail: string;

  vehicle: {
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
  };

  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;

  mobileNumber: string;
  withDriver: boolean;
  paymentMethod: string;

  totalDays: number;
  rentalPrice?: number;
  driverPrice?: number;
  totalPrice: number;

  bookingDate?: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const savedBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    const userBookings = savedBookings
      .filter(
        (booking: Booking) =>
          booking.userEmail === currentUser.email
      )
      .reverse();

    setBookings(userBookings);
  }, [navigate]);

  const formatDate = (date: string, time: string) => {
    if (!date || !time) {
      return "Not available";
    }

    const dateObject = new Date(`${date}T${time}`);

    return dateObject.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatBookingDate = (bookingDate?: string) => {
    if (!bookingDate) {
      return "Not available";
    }

    const dateObject = new Date(bookingDate);

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

  const getRentalPrice = (booking: Booking) => {
    if (booking.rentalPrice !== undefined) {
      return booking.rentalPrice;
    }

    return booking.totalPrice;
  };

  const getDriverPrice = (booking: Booking) => {
    if (booking.driverPrice !== undefined) {
      return booking.driverPrice;
    }

    return 0;
  };

  return (
    <>
      <main className="dashboard-page">
        <Header />

        {/* HERO */}

        <section className="dashboard-hero">
          <div
            className="dashboard-hero-background"
            style={{ backgroundImage: `url("${showroomBackground}")` }}
          />
          <div className="dashboard-car-container">
            {heroCars.map((car, index) => (
              <div
                className="dashboard-car"
                key={car.name}
                style={{
                  animationDelay: `${index * 4}s`,
                }}
              >
                <img
                  src={car.image}
                  alt={car.name}
                />
              </div>
            ))}
          </div>

          <button
            className="dashboard-add-button"
            onClick={() => navigate("/vehicles")}
            aria-label="Browse vehicles"
          >
            +
          </button>
        </section>

        {/* BOOKINGS */}

        <section className="dashboard-bookings">
          <div className="dashboard-bookings-header">
            <p>YOUR BOOKINGS</p>

            <h2>BOOKED VEHICLES</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="dashboard-bookings-empty">
              <span>NO BOOKINGS YET</span>
            </div>
          ) : (
            <div className="dashboard-bookings-list">
              {bookings.map((booking, index) => {
                const rentalPrice =
                  getRentalPrice(booking);

                const driverPrice =
                  getDriverPrice(booking);

                return (
                  <article
                    className="dashboard-invoice"
                    key={`${booking.vehicle.id}-${index}`}
                  >
                    {/* INVOICE HEADER */}

                    <div className="invoice-header">
                      <div>
                        <span className="invoice-label">
                          RENTAL INVOICE
                        </span>

                        <h3>BOOKING CONFIRMED</h3>
                      </div>

                      <div className="invoice-number">
                        <span>BOOKED ON</span>

                        <strong>
                          {formatBookingDate(
                            booking.bookingDate
                          )}
                        </strong>
                      </div>
                    </div>

                    {/* VEHICLE */}

                    <div className="invoice-vehicle">
                      <div className="invoice-vehicle-image">
                        <img
                          src={booking.vehicle.image}
                          alt={booking.vehicle.name}
                        />
                      </div>

                      <div className="invoice-vehicle-info">
                        <span>VEHICLE</span>

                        <h4>
                          {booking.vehicle.name}
                        </h4>

                        <p>
                          {booking.vehicle.brand} ·{" "}
                          {booking.vehicle.type}
                        </p>

                        <small>
                          {booking.vehicle.year} ·{" "}
                          {booking.vehicle.color}
                        </small>
                      </div>

                      <div className="invoice-vehicle-specs">
                        <div>
                          <span>FUEL</span>

                          <strong>
                            {booking.vehicle.fuelType}
                          </strong>
                        </div>

                        <div>
                          <span>TRANSMISSION</span>

                          <strong>
                            {booking.vehicle.transmission}
                          </strong>
                        </div>

                        <div>
                          <span>SEATS</span>

                          <strong>
                            {booking.vehicle.seats}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-divider"></div>

                    {/* BOOKING DETAILS */}

                    <div className="invoice-details">
                      <div className="invoice-detail">
                        <span>PICKUP</span>

                        <strong>
                          {formatDate(
                            booking.pickupDate,
                            booking.pickupTime
                          )}
                        </strong>
                      </div>

                      <div className="invoice-detail">
                        <span>RETURN</span>

                        <strong>
                          {formatDate(
                            booking.returnDate,
                            booking.returnTime
                          )}
                        </strong>
                      </div>

                      <div className="invoice-detail">
                        <span>DURATION</span>

                        <strong>
                          {booking.totalDays}{" "}
                          {booking.totalDays === 1
                            ? "DAY"
                            : "DAYS"}
                        </strong>
                      </div>

                      <div className="invoice-detail">
                        <span>DRIVER</span>

                        <strong>
                          {booking.withDriver
                            ? "WITH DRIVER"
                            : "WITHOUT DRIVER"}
                        </strong>
                      </div>

                      <div className="invoice-detail">
                        <span>PAYMENT</span>

                        <strong>
                          {booking.paymentMethod ===
                          "esewa"
                            ? "eSewa"
                            : booking.paymentMethod ===
                              "khalti"
                            ? "Khalti"
                            : "Cash on Delivery"}
                        </strong>
                      </div>
                    </div>

                    <div className="invoice-divider"></div>

                    {/* PRICE BREAKDOWN */}

                    <div className="invoice-bottom">
                      <div className="invoice-contact">
                        <span>
                          CUSTOMER CONTACT
                        </span>

                        <strong>
                          {booking.mobileNumber}
                        </strong>

                        <small>
                          Vehicle rental services
                        </small>
                      </div>

                      <div className="invoice-prices">
                        <div className="invoice-price-row">
                          <div>
                            <span>
                              VEHICLE RENTAL
                            </span>

                            <small>
                              {booking.totalDays}{" "}
                              {booking.totalDays === 1
                                ? "day"
                                : "days"}
                            </small>
                          </div>

                          <strong>
                            {formatCurrency(
                              rentalPrice
                            )}
                          </strong>
                        </div>

                        <div className="invoice-price-row">
                          <div>
                            <span>
                              DRIVER CHARGE
                            </span>

                            <small>
                              {booking.withDriver
                                ? "Driver included"
                                : "Without driver"}
                            </small>
                          </div>

                          <strong>
                            {formatCurrency(
                              driverPrice
                            )}
                          </strong>
                        </div>

                        <div className="invoice-total">
                          <span>TOTAL AMOUNT</span>

                          <strong>
                            {formatCurrency(
                              booking.totalPrice
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}

                    <div className="invoice-footer">
                      <span>
                        VEHICLE RENTAL SERVICES
                      </span>

                      <span>
                        BOOKING CONFIRMED
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;


