export interface SkyDiveEventStatus {
  title: string;
  reservable: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkyDiveEvent {
  code: string;
  title: string;
  location: string;
  image: string;
  startDate: string;
  endDate: string;
  capacity: number;
  subjecToVAT: boolean;
  isActive: boolean;
  voidable: boolean;
  termsAndConditions: string;
  statusTitle: string;
  days: SkyDiveInlineEventDay[];
  id: string;
  createdAt: string;
  updatedAt: string;
  duration: string;
}

export interface SkyDiveInlineEventDay {
  date: string;
  id: string;
}

export interface SkyDiveEventDay {
  date: string;
  emptyCapacity: number;
  flightQty: number;
  userTicketQty: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}


export interface FlightOfDayInfo {
  date: string
  dateDisplay: string
  flights: Flight[]
  qty: number
}

export interface Flight {
  flightNumber: number
  flightId: string
  tickets: Ticket[]
}

export interface Ticket {
  ticketType: string
  amount: number
  qty: number
}
export interface LastCode {
  lastCode: string;
}