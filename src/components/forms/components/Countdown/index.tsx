import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { timeFormater } from "../../../../helpers/format";

export enum COMMAND {
    START,
    PAUSE,
    RESUME,
    STOP,
    RESTART,
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
    seed?: number;
    command?: COMMAND;
    callback?: () => void;
}

const Countdown: FC<IProps> = (props): JSX.Element => {
    const {
        seed = 0,
        callback = () => void 0,
        command = COMMAND.STOP,
        className = "",
        ...rest
    } = props;

    const timer = useRef<number>();
    const deadLine = useRef<number>(0);
    const pausedAt = useRef<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        if (command === COMMAND.START) start();
        else if (command === COMMAND.RESTART) restart();
        else if (command === COMMAND.PAUSE) pause();
        else if (command === COMMAND.RESUME) resume();
        else if (command === COMMAND.STOP) stop();
    }, [command]);

    const start = () => {
        deadLine.current = Date.now() + seed;
        setTimeLeft(seed);
        startTimer();
    }
    const restart = () => {
        killTimer();
        start();
    }
    const pause = () => {
        if (Number(timeLeft) > 0) {
            pausedAt.current = Number(timeLeft);
            killTimer();
        }
    }
    const resume = () => {
        startTimer();
    }
    const stop = () => {
        killTimer();
        deadLine.current = 0;
        pausedAt.current = 0;
        setTimeLeft(0);
    }
    const startTimer = () => {
        killTimer();
        timer.current = window.setInterval(timeTeak, 250)
    }
    const killTimer = () => {
        if (timer.current)
            window.clearInterval(timer.current);
        timer.current = undefined;
    }
    
    const timeTeak = () => {
        const left = deadLine.current - Date.now();
        if (left > 0) {
            setTimeLeft(left);
        } else {
            stop();
            callback();
        }
    }

    return <div className={`countdown ${className}`} {...rest}>
        {timeFormater(timeLeft)}
    </div>
}

export default Countdown;