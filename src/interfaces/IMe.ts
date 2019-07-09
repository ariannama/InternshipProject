export interface IMe{ 
    credentials_id: string,
    consent_status: string,
    consent_status_updated_at?: string,
    consent_expires_at?: string,
    provider: {
        display_name: string
    }
}