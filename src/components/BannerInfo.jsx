import { FaStoreAlt } from "react-icons/fa";

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
        <button className="btn flex items-center gap-1 text-main-200">
          <FaStoreAlt className="text-white" />
          申請成為轉運站站長
        </button>
      )}
    </div>
  );
}

export default BannerInfo;
