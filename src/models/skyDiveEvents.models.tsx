export interface SkyDiveEventStatus{
    title: string
    reservable: boolean
    id: string
    createdAt: string
    updatedAt: string
}

export interface SkyDiveEvent {
    code: string
    title: string
    location: string
    image: string
    startDate: string
    endDate: string
    capacity: number
    subjecToVAT: boolean
    isActive: boolean
    voidable: boolean
    termsAndConditions: string
    statusTitle: string
    days: SkyDiveEventDay[]
    id: string
    createdAt: string
    updatedAt: string
  }
  
  export interface SkyDiveEventDay {
    date: string
    id: string
  }
  