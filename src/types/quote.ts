export interface Quote {
    id: string;
    reference: string;
    clientName: string;
    date: Date;
    status: 'draft' | 'sent' | 'accepted' | 'rejected';
    amount: number;
}