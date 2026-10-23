import { useEffect, useState } from "react";
import "./Dashboard.css";
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
  const [userName, setUserName] = useState("Driver");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUserName(currentUser.name || currentUser.fullName || currentUser.email?.split("@")[0] || "Driver");

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

  const now = new Date();
  const activeBookings = bookings.filter((booking) => {
    const pickup = new Date(`${booking.pickupDate}T${booking.pickupTime || "00:00"}`);
    const returned = new Date(`${booking.returnDate}T${booking.returnTime || "23:59"}`);
    return !Number.isNaN(pickup.getTime()) && !Number.isNaN(returned.getTime()) && pickup <= now && returned >= now;
  });
  const upcomingBookings = bookings.filter((booking) => {
    const pickup = new Date(`${booking.pickupDate}T${booking.pickupTime || "00:00"}`);
    return !Number.isNaN(pickup.getTime()) && pickup > now;
  });
  const completedBookings = bookings.filter((booking) => {
    const returned = new Date(`${booking.returnDate}T${booking.returnTime || "23:59"}`);
    return !Number.isNaN(returned.getTime()) && returned < now;
  });
  const totalSpent = bookings.reduce((sum, booking) => sum + (Number(booking.totalPrice) || 0), 0);
  const formatShortDate = (date: Date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

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

        {/* DASHBOARD HERO */}
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-copy">
            <span className="dashboard-eyebrow">YOUR RENTAL SPACE</span>
            <h1>Welcome back, <span>{userName}</span></h1>
            <p>Everything about your rides, bookings, and rental plans in one place.</p>
            <button className="dashboard-primary-action" onClick={() => navigate("/vehicles")}>
              <span>＋</span> Browse vehicles
            </button>
          </div>
          <div className="dashboard-welcome-visual" aria-label="Featured rental vehicles">
            <div className="dashboard-visual-label"><span className="dashboard-live-dot" /> READY FOR YOUR NEXT TRIP</div>
            <div className="dashboard-car-container">
              {heroCars.map((car, index) => (
                <div className="dashboard-car" key={car.name} style={{ animationDelay: `${index * 4}s` }}>
                  <img src={car.image} alt={car.name} />
                </div>
              ))}
            </div>
            <div className="dashboard-visual-index">01 <span>/ 04</span></div>
          </div>
        </section>

        <section className="dashboard-overview">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-eyebrow">AT A GLANCE</span>
              <h2>Your overview</h2>
            </div>
            <span className="dashboard-date">{now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "long", year: "numeric" })}</span>
          </div>

          <div className="dashboard-stats-grid">
            <article className="dashboard-stat-card stat-bookings">
              <div className="dashboard-stat-top"><span>Total bookings</span><span className="dashboard-stat-icon">▤</span></div>
              <strong>{bookings.length}</strong>
              <small>All your reservations</small>
              <div className="dashboard-stat-bottom"><span className="stat-dot" /> Booking history</div>
            </article>
            <article className="dashboard-stat-card stat-active">
              <div className="dashboard-stat-top"><span>Currently rented</span><span className="dashboard-stat-icon">↗</span></div>
              <strong>{activeBookings.length}</strong>
              <small>{activeBookings.length === 1 ? "vehicle on rent right now" : "vehicles on rent right now"}</small>
              <div className="dashboard-stat-bottom"><span className="stat-dot" /> Active rentals</div>
            </article>
            <article className="dashboard-stat-card stat-upcoming">
              <div className="dashboard-stat-top"><span>Upcoming pickups</span><span className="dashboard-stat-icon">◷</span></div>
              <strong>{upcomingBookings.length}</strong>
              <small>Reservations ahead</small>
              <div className="dashboard-stat-bottom"><span className="stat-dot" /> Next pickup {upcomingBookings[0] ? formatShortDate(new Date(`${upcomingBookings[0].pickupDate}T${upcomingBookings[0].pickupTime || "00:00"}`)) : "—"}</div>
            </article>
            <article className="dashboard-stat-card stat-spending">
              <div className="dashboard-stat-top"><span>Total rental spend</span><span className="dashboard-stat-icon">Rs</span></div>
              <strong className="dashboard-spend-value">{formatCurrency(totalSpent)}</strong>
              <small>Across all your bookings</small>
              <div className="dashboard-stat-bottom"><span className="stat-dot" /> {completedBookings.length} completed rentals</div>
            </article>
          </div>

          <div className="dashboard-lower-grid">
            <div className="dashboard-status-panel">
              <div className="dashboard-panel-heading"><div><span className="dashboard-eyebrow">RENTAL STATUS</span><h3>Your rentals</h3></div><span className="dashboard-status-count">{bookings.length} TOTAL</span></div>
              <div className="dashboard-status-row">
                <span className="dashboard-status-symbol status-symbol-active">↗</span>
                <div className="dashboard-status-text"><strong>Active rentals</strong><small>Vehicles currently in your rental period</small></div>
                <strong className="dashboard-status-number">{activeBookings.length}</strong>
              </div>
              <div className="dashboard-status-row">
                <span className="dashboard-status-symbol status-symbol-upcoming">◷</span>
                <div className="dashboard-status-text"><strong>Upcoming rentals</strong><small>Bookings with a future pickup date</small></div>
                <strong className="dashboard-status-number">{upcomingBookings.length}</strong>
              </div>
              <div className="dashboard-status-row">
                <span className="dashboard-status-symbol status-symbol-complete">✓</span>
                <div className="dashboard-status-text"><strong>Completed rentals</strong><small>Bookings whose return date has passed</small></div>
                <strong className="dashboard-status-number">{completedBookings.length}</strong>
              </div>
            </div>
            <div className="dashboard-next-panel">
              <span className="dashboard-eyebrow">YOUR NEXT STEP</span>
              <div className="dashboard-next-icon">＋</div>
              <h3>Planning another trip?</h3>
              <p>Explore available vehicles and find a ride that fits your plans.</p>
              <button onClick={() => navigate("/vehicles")}>Explore vehicles <span>↗</span></button>
            </div>
          </div>
        </section>

        {/* BOOKINGS */}

        <section className="dashboard-bookings">
          <div className="dashboard-bookings-header">
            <p>YOUR ACTIVITY</p>

            <h2>YOUR BOOKINGS</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="dashboard-bookings-empty">
              <div className="dashboard-empty-content"><span className="dashboard-empty-icon">＋</span><h3>No bookings yet</h3><p>Your reservations will appear here once you book a vehicle.</p><button onClick={() => navigate("/vehicles")}>Find a vehicle <span>↗</span></button></div>
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


