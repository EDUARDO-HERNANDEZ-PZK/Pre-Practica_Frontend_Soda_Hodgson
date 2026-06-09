export default interface CashSession {
  user_id: string;
  open_time: Date;
  close_time: Date;
  opening_balance: number;
  closing_balance_real: number;
  expected_closing_balance: number;
  cash_difference: number;
  status: string;
}
