import PradaLogo from "../Images/BrandLogos/Prada_Logo.png";
import RolexLogo from "../Images/BrandLogos/Rolex_Logo.jpg";
import BrandItem from "../Data/BrandItem";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

function ClothingBrandsLink() {
  return (
    <div className="container">
      <div className="columns">
        <ul>
          <li>
            <div className="column">
              <Link to="/prada">
                <BrandItem image={PradaLogo} />
              </Link>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div className="column">
              <Link to="/rolex">
                <BrandItem image={RolexLogo} />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ClothingBrandsLink;
