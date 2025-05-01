import PropTypes from "prop-types";

function EmptyDataMessage({ message }) {
  return (
    <div className="py-6">
      <p className="italic text-zinc-500">{message}</p>
    </div>
  );
}

EmptyDataMessage.propTypes = {
  message: PropTypes.string,
};

export default EmptyDataMessage;
