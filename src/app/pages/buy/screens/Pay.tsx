import { StepProps } from "../../../../components/Stepper"
import Payments from "../../../../features/buy/Payments"
import { userStore } from "../../../../store/userStore"
import { BuyData } from "../../../../types/steps/buy"

export default function Pay({ params }: StepProps<BuyData>) {
    const { payInfo } = params
    // const [bonusPay, setBonusPay] = useState(0)
    const { user } = userStore()

    const orderBody = {
        session_id: payInfo.selectedSession,
        seats: payInfo.selectedSeats.map(item => item.id),
        bonus_pay: 0,
        phone: user?.phone,
        email: user?.email
    }

    return <Payments payInfo={payInfo} orderBody={orderBody} />
}
