import { Stepper } from "../../../components/Stepper"
import { BuyData } from "../../../types/steps/buy"
import { Pay, Seats } from "./screens"

export default function Buy() {
    const steps = [
        { id: "seats", title: "Выбрать места", component: Seats },
        { id: "pay", title: "Оплатить", component: Pay }
    ]

    return <Stepper<BuyData> steps={steps} />
}
