import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaProcessing from "./mediaProcessing";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function MediaProcessingPage() {
  return (
    <div>
      <a href="http://localhost:3000" className="w-[100px] h-[100px]">
        <FontAwesomeIcon
          className="text-black absolute left-2 top-2 text-[300%]"
          icon={faArrowLeft}
        />
      </a>
      <MediaProcessing />
    </div>
  );
}
