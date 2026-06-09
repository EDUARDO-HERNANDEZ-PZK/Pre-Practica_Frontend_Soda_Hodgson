export default interface DailyExpense {
  id: string;
  session_id: string;
  description: string;
  amount: number;
  expense_time: Date;
}
