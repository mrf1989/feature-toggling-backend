export interface VetAdscription {
  id: number,
  vetId: number,
  customerId: number,
  dates: {
    id: number,
    date: Date,
  }[]
}