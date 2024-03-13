import { MdTram } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";
import './bussboard.css'

interface Props {
    routeNumber: string;
    routeName: string;
    expectedDepartureTime: string;
}

function formatTime(date: string): string {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date input');
    }
    const hours: string = ('0' + parsedDate.getHours()).slice(-2);
    const minutes: string = ('0' + parsedDate.getMinutes()).slice(-2);
    const seconds: string = ('0' + parsedDate.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  }

  function calculateMinutesFromNow(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    const now = new Date();
    const differenceInMilliseconds = date.getTime() - now.getTime();
    const timeDifference = Math.round(differenceInMilliseconds / (1000 * 60));
    if(differenceInMilliseconds < 63000 && differenceInMilliseconds > 57000){
      return 'Ca 1 minutt'
    }
    if(differenceInMilliseconds < 57000){
      return 'Mindre enn 1 minutt'
    }
    if(timeDifference === 1){
      return '1 minutt'
    }
    return `${timeDifference} minutter`;

  }

  const isTram = (routeNumber: string) => {
    return routeNumber.length === 2 && routeNumber.startsWith('1')
  }

export const RouteCard = (props: Props) => {
    return (
    <div className='route-info'>
    <div className={ isTram(props.routeNumber) ? 'route-info-header tram' : 'route-info-header bus'}>{`${props.routeNumber} - ${props.routeName}`}
    {isTram(props.routeNumber) ? <MdTram size={25}/> : <FaBusSimple size={20}/>}
    </div>
    <div className="route-info-body">
        <div>{formatTime(props.expectedDepartureTime)}</div>
        <div>{calculateMinutesFromNow(props.expectedDepartureTime)}</div>
    </div>
  </div>);
}