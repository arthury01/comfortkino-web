import { City } from "../entities/city";
import { StepsData } from "./steps";

export interface LocationData extends StepsData {
    newCity?: City
}
