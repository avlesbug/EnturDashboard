interface Props {
    lable: string;
    checked: boolean;
    onChange: () => void;
}

export const Checkbox = (props: Props) => {
    return (
        <div>{props.lable}<input type="checkbox" onChange={props.onChange} checked={props.checked}/></div>
    )
}