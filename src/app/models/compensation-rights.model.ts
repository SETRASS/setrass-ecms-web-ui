import { AcountableItem } from "./acountable-item.model";

export interface CompensationRights {
    forewarningNotice: AcountableItem,
    proportionalFourteenthMonthRight: AcountableItem,
    proportionalThirteenthMonthRight: AcountableItem,
    proportionalVacation: AcountableItem,
    unemploymentAid: AcountableItem,
    unemploymentAidProportional: AcountableItem
}