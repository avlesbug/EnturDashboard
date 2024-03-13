interface DestinationDisplay {
    frontText: string;
}

interface Line {
    publicCode: string;
    transportMode: string;
}

interface ServiceJourney {
    line: Line;
}

interface EstimatedCall {
    expectedDepartureTime: string;
    aimedDepartureTime: string;
    destinationDisplay: DestinationDisplay;
    serviceJourney: ServiceJourney;
}

export interface StopPlace {
    name: string;
    id: string;
    estimatedCalls: EstimatedCall[];
}

interface Data {
    stopPlace: StopPlace;
}

export interface RouteResponse {
    data: Data;
}

export {};