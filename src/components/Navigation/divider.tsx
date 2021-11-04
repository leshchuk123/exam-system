import { FC } from "react";
import { IUIComponent } from "../../interfaces/components";

const Divider: FC<IUIComponent> = ({className="",style={}}): JSX.Element => {
    return <div className={`divider ${className}`} style={style} />;
}

export default Divider;