import { useState } from "react";
import "./Vehicles.css";
import Header from "../components/LoginHeader";
import Footer from "../components/Footer";
import VehicleCard from "../components/VehicleCard";

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

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Sedan",
    color: "White",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2025,
    image: "https://pngimg.com/uploads/toyota/toyota_PNG1910.png",
    prices: {
      oneDay: 4500,
      threeDay: 12000,
      fiveDay: 19000,
    },
  },
  {
    id: 2,
    name: "Honda Civic",
    brand: "Honda",
    type: "Sedan",
    color: "Black",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    image: "https://pngimg.com/uploads/honda/honda_PNG10290.png",
    prices: {
      oneDay: 5000,
      threeDay: 13500,
      fiveDay: 22000,
    },
  },
  {
    id: 3,
    name: "Toyota RAV4",
    brand: "Toyota",
    type: "SUV",
    color: "Silver",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    image: "https://pngimg.com/uploads/toyota/toyota_PNG1910.png",
    prices: {
      oneDay: 6500,
      threeDay: 17500,
      fiveDay: 28000,
    },
  },
  {
    id: 4,
    name: "Mahindra Scorpio-N",
    brand: "Mahindra",
    type: "SUV",
    color: "Black",
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 7,
    year: 2025,
    image: "https://pngimg.com/uploads/jeep/jeep_PNG4.png",
    prices: {
      oneDay: 7500,
      threeDay: 20000,
      fiveDay: 32000,
    },
  },
  {
    id: 5,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    type: "Luxury",
    color: "Black",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    image: "https://pngimg.com/uploads/mercedes/mercedes_PNG80137.png",
    prices: {
      oneDay: 12000,
      threeDay: 33000,
      fiveDay: 52000,
    },
  },
  {
    id: 6,
    name: "Audi R8",
    brand: "Audi",
    type: "Sports",
    color: "Red",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 2,
    year: 2023,
    image: "https://pngimg.com/uploads/audi/audi_PNG1716.png",
    prices: {
      oneDay: 18000,
      threeDay: 48000,
      fiveDay: 75000,
    },
  },
];

const filterOptions = {
  type: ["Sedan", "SUV", "Luxury", "Sports"],
  brand: ["Toyota", "Honda", "Mahindra", "Mercedes-Benz", "Audi"],
  color: ["Black", "White", "Silver", "Red"],
  fuelType: ["Petrol", "Diesel"],
  transmission: ["Automatic", "Manual"],
  seats: ["2", "5", "7"],
};

function Vehicles() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
    color: "",
    fuelType: "",
    transmission: "",
    seats: "",
  });

  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);

  const updateFilter = (name: string, value: string) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const search = searchText.toLowerCase().trim();

    const result = vehicles.filter((vehicle) => {
      const matchesSearch =
        !search ||
        vehicle.name.toLowerCase().includes(search) ||
        vehicle.brand.toLowerCase().includes(search);

      return (
        matchesSearch &&
        (!filters.type || vehicle.type === filters.type) &&
        (!filters.brand || vehicle.brand === filters.brand) &&
        (!filters.color || vehicle.color === filters.color) &&
        (!filters.fuelType || vehicle.fuelType === filters.fuelType) &&
        (!filters.transmission ||
          vehicle.transmission === filters.transmission) &&
        (!filters.seats ||
          vehicle.seats.toString() === filters.seats)
      );
    });

    setFilteredVehicles(result);
  };

  const filterFields = [
    {
      label: "VEHICLE TYPE",
      name: "type",
      options: filterOptions.type,
      defaultLabel: "ALL TYPES",
    },
    {
      label: "BRAND",
      name: "brand",
      options: filterOptions.brand,
      defaultLabel: "ALL BRANDS",
    },
    {
      label: "COLOR",
      name: "color",
      options: filterOptions.color,
      defaultLabel: "ALL COLORS",
    },
    {
      label: "FUEL TYPE",
      name: "fuelType",
      options: filterOptions.fuelType,
      defaultLabel: "ALL FUEL TYPES",
    },
    {
      label: "TRANSMISSION",
      name: "transmission",
      options: filterOptions.transmission,
      defaultLabel: "ALL TRANSMISSIONS",
    },
    {
      label: "SEATS",
      name: "seats",
      options: filterOptions.seats,
      defaultLabel: "ANY",
    },
  ];

  return (
    <>
      <main className="vehicles-page">
        <Header />

        <section className="vehicles-content">

          <div className="vehicles-search-section">
            <div className="vehicles-search-input">
              <input 
                type="text"
                placeholder="Search vehicle by name or brand"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>

            <button
              className="vehicles-search-button"
              onClick={handleSearch}
            >
              SEARCH
            </button>
          </div>

          <div className="vehicles-layout">

            <aside className="vehicles-filter">

              <div className="filter-heading">
                <div className="filter-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <h2>FILTER</h2>
              </div>

              <div className="filter-line"></div>

              <div className="filter-fields">
                {filterFields.map((field) => (
                  <div className="filter-field" key={field.name}>
                    <label>{field.label}</label>

                    <select
                      value={filters[field.name as keyof typeof filters]}
                      onChange={(e) =>
                        updateFilter(field.name, e.target.value)
                      }
                    >
                      <option value="">
                        {field.defaultLabel}
                      </option>

                      {field.options.map((option) => (
                        <option value={option} key={option}>
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <button
                className="filter-search"
                onClick={handleSearch}
              >
                SEARCH
              </button>

            </aside>

            <section className="vehicles-results">

              {filteredVehicles.length > 0 ? (
                <div className="vehicles-grid">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                    />
                  ))}
                </div>
              ) : (
                <div className="vehicles-no-results">
                  <h2>NO VEHICLES FOUND</h2>
                  <p>
                    Try changing your search or filter options
                  </p>
                </div>
              )}

            </section>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Vehicles;