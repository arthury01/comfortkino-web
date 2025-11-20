import { Stepper } from "../../../components/Stepper"
import { Cinemas, Cities } from "./screens"
import { LocationData } from "../../../types/steps/location"

export default function Location() {
    const steps = [
        { id: "cities", title: "Выбор города", component: Cities },
        { id: "cinemas", title: "Выбор кинотеатра", component: Cinemas }
    ]

    return <Stepper<LocationData> steps={steps} />
}
