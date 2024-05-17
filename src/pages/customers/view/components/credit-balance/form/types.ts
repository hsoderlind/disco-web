import { CreditBalance } from "../../../../../../services/customer/CreditBalance"

export type CreditBalanceFormProps = {
	onAfterAdjustment?: (creditBalance: CreditBalance) => void;
	onCancel?: () => void;
}
