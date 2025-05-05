import { FaStoreAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatPhoneNumber } from "@/utils/helpers";

function BannerInfo({ title, infoData = [], showApplyButton }) {
  return (
    <div className="grow">
      <h2 className="mb-4 text-black">{title}</h2>
      <ul className="fs-6 mb-4 flex flex-col space-y-2 text-[#6F6F6F]">
        {infoData.map(({ label, value, type }) => {
          const defaultValue = value || (
            <span className="italic text-[#9b9a9a]">{`（未提供，請於會員頁面更新${label}）`}</span>
          );
          return (
            <li key={label}>
              {label}：
              {type === "email" && (
                <a href={`mailto:${value}`}>{defaultValue}</a>
              )}
              {type === "tel" && (
                <a href={`tel:${value}`}>
                  {value ? `${formatPhoneNumber(value)}` : defaultValue}
                </a>
              )}
              {type === "address" && (
                <a
                  href={`https://www.google.com/maps/search/?q=${encodeURIComponent(value)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {defaultValue}
                </a>
              )}
              {!type && defaultValue}
            </li>
          );
        })}
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
