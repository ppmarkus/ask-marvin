import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarvinLogo() {
  return (
    <div className="flex w-64 flex-row items-center leading-none text-white dark:text-slate-300 md:w-32">
      <div>
        <FontAwesomeIcon
          className="h-8 w-8 md:h-16 md:w-16 "
          icon={faUserAstronaut}
        />
      </div>
      <div className="pl-4 text-[36px]">Ask Marvin</div>
    </div>
  );
}
