import { useNavigate } from "react-router-dom";
import "./VehicleCard.css";

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

interface VehicleCardProps {
  vehicle: Vehicle;
}

function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem(
      "selectedVehicle",
      JSON.stringify(vehicle)
    );

    navigate("/book-vehicle");
  };

  const vehicleInfo = [
    ["COLOR", vehicle.color],
    ["SEATS", vehicle.seats],
    ["YEAR", vehicle.year],
    ["FUEL", vehicle.fuelType],
    ["TRANSMISSION", vehicle.transmission],
  ];

  const prices = [
    ["1 DAY", vehicle.prices.oneDay],
    ["3 DAYS", vehicle.prices.threeDay],
    ["5 DAYS", vehicle.prices.fiveDay],
  ];

  return (
    <article className="vehicle-card">

      <div className="vehicle-card-image">
        <img
          src={vehicle.image}
          alt={vehicle.name}
        />
      </div>

      <div className="vehicle-card-details">

        <div className="vehicle-card-heading">
          <h3>{vehicle.name}</h3>
          <p>{vehicle.brand}</p>
        </div>

        <div className="vehicle-card-info">
          {vehicleInfo.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

      </div>

      <button
        className="vehicle-card-continue"
        onClick={handleContinue}
      >
        CONTINUE
      </button>

      <div className="vehicle-card-prices">
        {prices.map(([days, price]) => (
          <div
            className="vehicle-price-box"
            key={days}
          >
            <span>{days}</span>

            <strong>
              Rs. {Number(price).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

    </article>
  );
}

export default VehicleCard;