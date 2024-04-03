import { useEffect, useState } from "react";
import { StopBoard } from "./StopBoard"
import axios from "axios";
import { RouteResponse } from "./types";
import { Bars } from 'react-loader-spinner'
import { useParams } from "react-router-dom";

export interface TransportMode {
    bus: boolean;
    tram: boolean;
}

export enum ToggleOption {
    TRIKK,
    BUSS,
    BEGGE
  }

  interface Props {
    busStopId: string
  }

export const BoardOverview = (props: Props) => {

    const params = useParams<{busStopId: string}>();

    const busStopId = params.busStopId;

    const [routeInfo, setRouteInfo] = useState<RouteResponse>();

    const [toggleOption, setToggleOption] = useState<ToggleOption>(
        ToggleOption.BEGGE
    );

    const changeTransportMode = (transportMode: ToggleOption) => {
        setToggleOption(transportMode);
    }
    
    useEffect(() => {

    const modes = [];
      if (toggleOption === ToggleOption.BEGGE){
        modes.push('bus');
        modes.push('tram');
      } else if(toggleOption === ToggleOption.BUSS){
        modes.push('bus');
    } else if(toggleOption === ToggleOption.TRIKK){
          modes.push('tram');
      }

      const query =`{stopPlace(id: "NSR:StopPlace:${props.busStopId}"){
            name
            id
            estimatedCalls(numberOfDepartures: 20, whiteListedModes: [${modes.join(',')}]) {
            expectedDepartureTime
            aimedDepartureTime
            destinationDisplay {
                frontText
            }
            serviceJourney {
                line {
                publicCode
                transportMode
                }
            }
            }
        }
        }`;

        console.log(query)

        const getBussInfo = () => {
            axios
                .post(
                    'https://api.entur.io/journey-planner/v2/graphql',
                    JSON.stringify({ query }),
                    {
                    headers: {
                        'ET-Client-Name': 'awesomecompany-awesomeapp',
                        'Content-Type': 'application/json',
                    },
                    }
                )
                .then((response) => {
                    if (response && response.data) {
                    setRouteInfo(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching bus info:', error);
            });
    };

    getBussInfo();

    // Fetch data every 5 seconds
    const intervalId = setInterval(getBussInfo, 5000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [toggleOption,params]);

    return (
        <div className="bussboard-container">
            {routeInfo && <StopBoard toggleOptions={toggleOption} onChangeTransport={changeTransportMode} routeInfo={routeInfo.data.stopPlace}/>}
            <div className="loading-bar"><Bars
                color="#444"
                ariaLabel="bars-loading"
                visible={!routeInfo}
                /></div>
        </div>
    
    );
}