import "./LandingPage.css";
import landingcar from"../assets/landingpage-car.png"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const brandLogos = [
  {
    name: "Toyota",
    url: "https://cdn.simpleicons.org/toyota",
  },
  {
    name: "BMW",
    url: "https://cdn.simpleicons.org/bmw",
  },
  {
    name: "Mercedes-Benz",
    url: "https://cdn.simpleicons.org/mercedes",
  },
  {
    name: "Audi",
    url: "https://cdn.simpleicons.org/audi",
  },
  {
    name: "Ford",
    url: "https://cdn.simpleicons.org/ford",
  },
  {
    name: "Honda",
    url: "https://cdn.simpleicons.org/honda",
  },
  {
    name: "Nissan",
    url: "https://cdn.simpleicons.org/nissan",
  },
  {
    name: "Volkswagen",
    url: "https://cdn.simpleicons.org/volkswagen",
  },
  {
    name: "Porsche",
    url: "https://cdn.simpleicons.org/porsche",
  },
  {
    name: "Volvo",
    url: "https://cdn.simpleicons.org/volvo",
  },
];

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

const vehicleCategories = [
  {
    type: "CAR",
    title: "Comfortable Cars",
    description:
      "Choose from comfortable and stylish cars for city trips, business travel, family journeys and everyday transportation.",
    image:
      "https://pngimg.com/uploads/mercedes/mercedes_PNG80137.png",
  },
  {
    type: "SUV",
    title: "Premium SUVs",
    description:
      "Spacious SUVs designed for longer journeys, family trips and comfortable travel across different roads.",
    image:
      "https://pngimg.com/uploads/toyota/toyota_PNG1910.png",
  },
  {
    type: "SCORPIO",
    title: "Mahindra Scorpio",
    description:
      "Powerful and practical vehicles suitable for travelling with more passengers and exploring challenging routes.",
    image:
      "https://pngimg.com/uploads/jeep/jeep_PNG4.png",
  },
  {
    type: "VAN",
    title: "Vans",
    description:
      "Spacious vans for group travel, family outings, events and trips where additional passenger space is needed.",
    image:
      "https://pngimg.com/uploads/mercedes/mercedes_PNG80164.png",
  },
];

function BrandMarquee() {
  const logos = [...brandLogos, ...brandLogos];

  return (
    <section className="brand-section">
      <div className="brand-track">
        {logos.map((brand, index) => (
          <div className="brand-item" key={`${brand.name}-${index}`}>
            <img src={brand.url} alt={brand.name} />
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="landing-page">
      <Header />
      <section className="hero">
        <div className="hero-background" />

        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-small-text">Vehicle Rental Services</p>

            <h1>
              RENT A VEHICLE
            </h1>
                <br />
            <button className="primary-button" 
            onClick={() => navigate("/signup")}>EXPLORE</button>
          </div>

          <div className="hero-car-container">
            {heroCars.map((car, index) => (
              <div
                className="hero-car"
                key={car.name}
                style={{
                  animationDelay: `${index * 4}s`,
                }}
              >
                <img src={car.image} alt={car.name} />
              </div>
            ))}
          </div>
        </div>

     
      </section>

      <BrandMarquee />

      <section className="rental-intro">
        <div className="intro-content">
          <p className="section-label">MOVE WITHOUT LIMITS</p>

          <h2>
             <span>Book a Vehicle</span>
          </h2>

          <p className="intro-description">
            Whether you are planning a short city trip, a family journey or
            an adventure across Nepal, find a vehicle that fits your journey.
            Browse vehicles, compare options and book the ride you need.
          </p>

          <button className="primary-button dark-button" onClick={() => navigate("/signup")}>
            BOOK NOW
          </button>
        </div>
          <img
            src={landingcar}
            alt="Premium vehicle"
            className="intro-image"
          />
      </section>

      <BrandMarquee />

      <section className="vehicles-section">
        <div className="vehicles-header">
          <h2>
            OUR VEHICLES
          </h2>
        </div>

        <div className="vehicle-grid">
          {vehicleCategories.map((vehicle) => (
            <article className="vehicle-card" key={vehicle.type}>
              <div className="vehicle-image-wrapper">
                <img src={vehicle.image} alt={vehicle.title} />
              </div>

              <div className="vehicle-card-content">
                <h3>{vehicle.title}</h3>
                <span>{vehicle.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default LandingPage;
