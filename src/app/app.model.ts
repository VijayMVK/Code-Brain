export interface SpaceXModel {
    flight_number: number;
    mission_name: string;
    mission_id: string[];
    launch_year: string;
    launch_success: boolean;
    land_success: boolean;
}

export interface YearModel {
    value: number,
    isActive: boolean
}
