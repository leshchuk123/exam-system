import { ChangeEvent, InputHTMLAttributes, useRef } from "react"

interface IDefferedInput<T> extends InputHTMLAttributes<T> {
    delay?: number;
}

const DefferedInput = (props: IDefferedInput<HTMLInputElement>) => {
    const {
        delay = 2000,
        onChange = () => void 0,
        ...rest
    } = props;

    const last = useRef<string>();
    const timer = useRef<number | null>(null);
    const ref = useRef<HTMLInputElement>(null);

    const onChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
        if (timer.current === null) {
            onChange.call(ref.current, e);
            timer.current = window.setTimeout(() => {
                timer.current = null;
                if (last.current !== undefined) {
                    ref.current?.dispatchEvent(new Event("change"));
                }
            }, delay);
            last.current = undefined;
        } else {
            last.current = ref.current?.value;
        }
    };

    return <input type="text" onChange={onChangeWrapper} {...rest} ref={ref} />
};

export default DefferedInput;
