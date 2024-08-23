import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./button.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function Button({ icon }: { icon: IconDefinition }) {
  return (
    <div className="btn-action">
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </div>
  );
}

export default Button;
