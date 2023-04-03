function Card(props) {
  return (
    <div className="outerTemplate">
      <div className="previewImage">
        <div className="image"></div>
        <div className="directoryStructure">Directory structure</div>
      </div>
      <div className="content">
        <p className="title">{props.title}</p>
        <div className="details">
          <p>
            {props.settings1} <br />
            {props.settings2}
            <br />
            {props.settings3}
          </p>
        </div>
        <div className="status">status</div>
      </div>
    </div>
  );
}

export default Card;
