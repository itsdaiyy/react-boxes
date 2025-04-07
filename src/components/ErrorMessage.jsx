import PropTypes from "prop-types";

function ErrorMessage({ errorMessage }) {
  return (
    <div className="my-10 flex items-center justify-center">
      <p className="italic text-second-300">
        載入發生錯誤 ☹️，Error Message：{errorMessage}
      </p>
    </div>
  );
}
ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
