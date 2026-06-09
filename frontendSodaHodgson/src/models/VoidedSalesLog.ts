export default interface VoidedSalesLog {
  id: string;
  sale_id: string;
  reason: string;
  voided_time: Date;
  user_voided: number;
}
