// Generated by https://quicktype.io

export interface IMeResponse {
    results: IMe[];
}

export interface IMe {
    client_id:                 string;
    credentials_id:            string;
    consent_status:            string;
    consent_status_updated_at: string;
    consent_created_at:        string;
    consent_expires_at:        string;
    provider:                  Provider;
    scopes:                    string[];
    privacy_policy:            string;
}

export interface Provider {
    display_name: string;
    logo_uri:     string;
    provider_id:  string;
}
