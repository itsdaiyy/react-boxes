import PropTypes from "prop-types";
SellingBoxesCard.propTypes = {
  size: PropTypes.string,
  count: PropTypes.number,
};

function SellingBoxesCard({ size, count }) {
  return (
    <div className="flex w-1/4 flex-col gap-1 rounded-md bg-second-100 p-2 text-center text-second-400">
      <h4>{count}</h4>
      <p className="fs-7">{size}紙箱</p>
    </div>
  );
}

export default SellingBoxesCard;
