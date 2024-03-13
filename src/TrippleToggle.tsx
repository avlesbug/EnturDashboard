import { ToggleOption } from './BoardOverview'

interface Props {
    options: ToggleOption;
    onChange: (toggelOption: ToggleOption) => void;
}


export const TrippleToggle = (props: Props) => {


    return (<div className='stop-header-button'>
            <button className={props.options === ToggleOption.TRIKK ? 'active' : 'inactive'}onClick={() => (
                props.onChange(ToggleOption.TRIKK)
            )}>{'Trikk'}</button>
            <button className={props.options === ToggleOption.BUSS ? 'active' : 'inactive'} onClick={() => (
                props.onChange(ToggleOption.BUSS)
            )}>{'Buss'}</button>
            <button className={props.options === ToggleOption.BEGGE ? 'active' : 'inactive'} onClick={() => (
                props.onChange(ToggleOption.BEGGE)
            )}>{'Begge'}</button>
    </div>)
}