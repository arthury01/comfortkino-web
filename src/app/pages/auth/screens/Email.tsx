import { StepProps } from "../../../../components/Stepper"
import { AuthData } from "../../../../types/steps/auth"

export default function Email({}: StepProps<AuthData>) {
    return <div className="flex flex-col items-center gap-4 border">Email</div>
}
