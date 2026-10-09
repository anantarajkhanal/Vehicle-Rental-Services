import "./AboutUs.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Service {
  number: string;
  title: string;
  description: string;
}

interface Vehicle {
  name: string;
  description: string;
  image: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "Wide Range of Vehicles",
    description:
      "Choose from a variety of cars, SUVs, and vans to match your travel needs.",
  },
  {
    number: "02",
    title: "Safe and Reliable",
    description:
      "Our vehicles are maintained and inspected to provide a safe and comfortable journey.",
  },
  {
    number: "03",
    title: "Flexible Rental Plans",
    description:
      "Choose rental durations that suit your schedule, whether for a day or a longer trip.",
  },
  {
    number: "04",
    title: "Customer Support",
    description:
      "Our team is here to assist you with bookings, vehicle selection, and rental enquiries.",
  },
];

const vehicles: Vehicle[] = [
  {
    name: "Comfortable Cars",
    description:
      "Perfect for city drives, business trips, and everyday travel.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Premium SUVs",
    description:
      "Extra space and comfort for family trips and longer journeys.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Luxury Vehicles",
    description:
      "Enjoy a premium driving experience for special occasions and business travel.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Vans",
    description:
      "Spacious vehicles for group travel, family outings, and extra luggage.",
    image:
      "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?auto=format&fit=crop&w=900&q=85",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Ram Khatri",
    role: "FOUNDER",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85",
    description:
      "Ananta founded the company with a vision of making vehicle rentals simple, reliable, and accessible. He focuses on the company's direction, customer experience, and continued growth.",
  },
  {
    name: "Hari Bhandari",
    role: "OPERATIONS MANAGER",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85",
    description:
      "Responsible for coordinating vehicle availability, rental operations, and customer bookings to ensure a smooth experience from pickup to return.",
  },
  {
    name: "Sita Sharma",
    role: "CUSTOMER RELATIONS",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85",
    description:
      "Works closely with customers to answer questions, assist with reservations, and make sure every customer receives friendly and helpful service.",
  },
];

function AboutUs(){
  return (
    <>
      <Header />

      <main className="about-page">
        {/* TEAM BANNER */}

        <section className="about-team-banner">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=90"
            alt="Our team working together"
          />

          <div className="about-banner-overlay">
            <span>VEHICLE RENTAL SERVICES</span>
            <h1>THE PEOPLE BEHIND YOUR JOURNEY</h1>
          </div>
        </section>

        {/* ABOUT US */}

        <section className="about-intro">
          <span className="about-section-label">
            GET TO KNOW US
          </span>

          <h2>ABOUT US</h2>

          <div className="about-intro-content">
            <p>
              At Vehicle Rental Services, we believe that
              every journey should be comfortable,
              convenient, and memorable. Our goal is to
              make renting a vehicle simple and accessible
              for everyone, whether you are travelling for
              business, going on a family trip, or exploring
              somewhere new.
            </p>

            <p>
              We offer a range of vehicles to suit different
              travel needs and budgets. From comfortable
              cars for everyday use to spacious SUVs and
              vans for longer journeys, we aim to provide
              a rental experience that puts our customers
              first.
            </p>

            <p>
              Our focus is on reliable vehicles, transparent
              pricing, and a straightforward booking
              process. We want you to spend less time
              worrying about transportation and more time
              enjoying the journey ahead.
            </p>
          </div>
        </section>

        {/* SERVICES */}

        <section className="about-services">
          <div className="about-section-heading">
            <span className="about-section-label">
              WHAT WE OFFER
            </span>

            <h2>OUR SERVICES</h2>

            <p>
              Everything you need for a smooth and
              comfortable rental experience.
            </p>
          </div>

          <div className="about-services-grid">
            {services.map((service) => (
              <article
                className="about-service-card"
                key={service.number}
              >
                <span className="about-service-number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* VEHICLE TYPES */}

        <section className="about-vehicles">
          <div className="about-section-heading">
            <span className="about-section-label">
              FIND YOUR RIDE
            </span>

            <h2>TYPES OF VEHICLES</h2>

            <p>
              The right vehicle for every road, occasion,
              and adventure.
            </p>
          </div>

          <div className="about-vehicles-grid">
            {vehicles.map((vehicle) => (
              <article
                className="about-vehicle-card"
                key={vehicle.name}
              >
                <div className="about-vehicle-image">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                  />
                </div>

                <div className="about-vehicle-info">
                  <h3>{vehicle.name}</h3>

                  <p>{vehicle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* TEAM MEMBERS */}

        <section className="about-members">
          <div className="about-section-heading about-members-heading">
            <span className="about-section-label">
              MEET THE PEOPLE
            </span>

            <h2>TEAM MEMBERS</h2>

            <p>
              The people who work together to make
              every journey better.
            </p>
          </div>

          <div className="about-members-list">
            {teamMembers.map((member) => (
              <article
                className="about-member-card"
                key={member.name}
              >
                <div className="about-member-image">
                  <img
                    src={member.image}
                    alt={member.name}
                  />
                </div>

                <div className="about-member-info">
                  <span className="about-member-role">
                    {member.role}
                  </span>

                  <h3>{member.name}</h3>

                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;
