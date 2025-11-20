import { Stepper } from "../../../components/Stepper"
import { Code, Email, Phone, Telegram } from "./screens"
import { AuthData } from "../../../types/steps/auth"

export default function Auth() {
    const steps = [
        { id: "phone", title: "Войти", component: Phone },
        { id: "code", title: "Код", component: Code },
        { id: "telegram", title: "Telegram", component: Telegram },
        { id: "email", title: "Email", component: Email }
    ]

    return <Stepper<AuthData> steps={steps} />
}
