import { AccountableItem } from "./acountable-item.model";

export interface CompensationRights {
    forewarningNotice: AccountableItem,
    proportionalFourteenthMonthRight: AccountableItem,
    proportionalThirteenthMonthRight: AccountableItem,
    proportionalVacation: AccountableItem,
    unemploymentAid: AccountableItem,
    unemploymentAidProportional: AccountableItem
}
