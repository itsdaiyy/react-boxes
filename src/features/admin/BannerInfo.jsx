import { FaStoreAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BannerInfo({ title, infoData = [], showApplyButton }) {
  return (
    <div className="grow">
      <h2 className="mb-4 text-black">{title}</h2>
      <ul className="fs-6 mb-4 flex flex-col space-y-2 text-[#6F6F6F]">
        {infoData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {showApplyButton && (
        <Link
          className="btn inline-flex items-center gap-1"
          to="/stationSignup"
        >
          <FaStoreAlt />
          申請成為轉運站站長
        </Link>
      )}
    </div>
  );
}

BannerInfo.propTypes = {
  title: PropTypes.string.isRequired,
  infoData: PropTypes.arrayOf(PropTypes.string),
  showApplyButton: PropTypes.bool,
};

export default BannerInfo;
