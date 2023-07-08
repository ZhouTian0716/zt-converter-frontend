import { useState } from "react";
import swapIcon from "../assets/converter-swap-icon.png";
import { useAppDispatch } from "../redux/hooks";
import { switchCurrency } from "../redux/reducers/convertFormSlice";

const SwitchBtn = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const iconClass = active ? "switch-icon active" : "switch-icon";
  const handleSwitch = () => {
    setActive(!active);
    dispatch(switchCurrency());
  };
  return (
    <button onClick={handleSwitch} className="switch-btn" type="button">
      <img src={swapIcon} alt="swapIcon" className={iconClass} />
    </button>
  );
};

export default SwitchBtn;
