import './bussboard.css'
import { RouteCard } from './RouteCard';
import { StopPlace } from './types'
import { ToggleOption, TransportMode } from './BoardOverview'
import { TrippleToggle } from './TrippleToggle';

interface Props {
  routeInfo: StopPlace;
  toggleOptions: ToggleOption;
  onChangeTransport: (transportMode: ToggleOption) => void;
}

export const StopBoard = (props: Props) => {

  function calculateMinutesFromNow(dateString: string): number {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    const now = new Date();
    const differenceInMilliseconds = date.getTime() - now.getTime();
    return Math.round(differenceInMilliseconds / (1000 * 60));
  }

  const routesInFourMinutes = props.routeInfo.estimatedCalls.filter(
      (route) => calculateMinutesFromNow(route.expectedDepartureTime) > 3
  );

  return (
    <div>
          <div className="stop-header">{props.routeInfo.name}
          <TrippleToggle options={props.toggleOptions} onChange={props.onChangeTransport}/>
          </div>
          <div className="route-info-container">
            {routesInFourMinutes.map((item, index) => (
              <RouteCard routeName={item.destinationDisplay.frontText} routeNumber={item.serviceJourney.line.publicCode} expectedDepartureTime={item.expectedDepartureTime}/>
              ))}
              </div>
        </div>
      );
    };

