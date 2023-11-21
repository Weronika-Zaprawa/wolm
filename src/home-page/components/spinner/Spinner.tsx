import "./Spinner.scss";

function Spinner() {
  return (
    <div className="is-loading">
      <div className="loading-spinner">
        <div className="spin">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
