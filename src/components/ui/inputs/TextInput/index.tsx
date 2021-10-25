import React, { FC, CSSProperties, ReactElement, useRef, KeyboardEvent, KeyboardEventHandler, MouseEventHandler, FocusEventHandler, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import IMask, { InputMask, AnyMaskedOptions} from "imask";

import { eventKey, clearJoin } from "../../../../helpers";

import "./inputs.scss";

export interface InputProps {
    id?: string
    fieldName: string
    type?: string
    label?: string
    placeholder?: string
    defaultValue?: string
    value?: string
    readOnly?: boolean
    required?: boolean
    disabled?: boolean
    hidden?: boolean
    regEx?: RegExp
    length?: number
    maxLength?: number
    minLength?: number
    fieldMask?: string
    validator?: IValidator
    bonus?: number
    showLabel?: boolean
    error?: string
    onEnter?: () => void
    onFocus?: FocusEventHandler
    onBackspaceOrDelete?: () => void
    style?: CSSProperties
    maskOptions?: AnyMaskedOptions
}    
export type ValidatorInputData = {
    valid: boolean
    name: string
    value: string | number | boolean | object
    dirty?: boolean
}    
export interface IValidator {(data: ValidatorInputData): void}

const InputText: FC<InputProps> = (props): ReactElement => {
    const {
        fieldName,
        id = uuidv4(),
        type = "text",
        label = "",
        placeholder = label,
        defaultValue = "",
        readOnly = false,
        required = true,
        // по умолчанию допускаются любые символы
        regEx = /.*/, 
        // строго заданный размер строки
        length, 
        // максимальный размер строки
        maxLength = length, 
        minLength = length, 
        validator = () => void 0,
        onEnter = () => void 0,
        onFocus = () => void 0,
        error = "",
        hidden = false, 
        style = {},
        maskOptions,
    } = props;
    console.log({label})

    const ref = useRef<HTMLInputElement>(null);
    const mask = useRef<InputMask<AnyMaskedOptions>>();

    // значение валидно
    // 1. если отвечает маске
    // 2. если поле обязательное и значение не пустое
    // 3. если строго задана длина строки и она равна длине значения
    const isValid = (value: string) =>
        regEx.test(value) &&
        !(required && value.length === 0) &&
        !(maxLength && value.length > maxLength) &&
        !(minLength && value.length < minLength);

    const validate = (value: string): void => {
        const valid = isValid(value);
        validator({
            valid,
            value,
            name: fieldName,
            dirty: value !== defaultValue
        });
    };

    const onKey: KeyboardEventHandler = () => {
        validate(ref.current?.value || "");
    };

    const onKeyDown: KeyboardEventHandler = (e: KeyboardEvent) => {
        const code = eventKey(e);
        const { value = "", selectionStart, selectionEnd } = ref.current || {};
        // фильтрация ввода
        // пропускаются только символы, отвечающие regEx
        // и символы Enter, Backspace, Tab, ArrowLeft, ArrowRight
        if (regEx.test(code) && code.length === 1) {
            // ограничение длины строки если задан maxLength или length
            // условие не выполняется если в поле выделен хотя бы
            // один символ (будет выполняться замещение символов)
            if (
                maxLength &&
                value.length >= maxLength &&
                selectionStart === selectionEnd
            )
                e.preventDefault();
        } else if (/^enter$/i.test(code)) {
            e.preventDefault();
            if (isValid(value)) onEnter();
        } else if (!/^enter|backspace|arrow(?:left|right)|tab$/i.test(code)) {
            e.preventDefault();
        }
    };

    const onLabelClick: MouseEventHandler = () => {
        ref.current?.focus();
    };

    const cls = [
        "input_group",
        hidden ? " hidden" : "",
        error ? "error" : "",
    ];

    useEffect(() => {
        if (maskOptions) {
            mask.current = IMask(ref.current as HTMLElement, maskOptions);
        }
    }, [maskOptions]);

    return (
        <div
            className={clearJoin( ...cls )}
            style={style}
        >
            {!!label && <label
                htmlFor={fieldName}
                onClick={onLabelClick}
            >
                {label}
            </label>}
            <input
                ref={ref}
                defaultValue={defaultValue}
                className="control"
                type={type}
                id={id}
                name={fieldName}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                readOnly={readOnly}
                onKeyDown={onKeyDown}
                onKeyUp={onKey}
                onFocus={onFocus}
            />
            {!!error && <div className="input_error">{error}</div>}
        </div>
    );
};

export default InputText;
