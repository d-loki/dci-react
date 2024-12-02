import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileEdit, Trash2 } from 'lucide-react';
import type { Quote } from '@/types/quote';

interface QuotesTableProps {
    quotes: Quote[];
    onEdit: ( quote: Quote ) => void;
    onDelete: ( quote: Quote ) => void;
}

const statusColors = {
    draft:    'bg-gray-100 text-gray-800',
    sent:     'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

const statusLabels = {
    draft:    'Brouillon',
    sent:     'Envoyé',
    accepted: 'Accepté',
    rejected: 'Rejeté',
};

export function QuotesTable( { quotes, onEdit, onDelete }: QuotesTableProps ) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { quotes.map( ( quote ) => (
                    <TableRow key={ quote.id }>
                        <TableCell className="font-medium">{ quote.reference }</TableCell>
                        <TableCell>{ quote.clientName }</TableCell>
                        <TableCell>
                            { format( quote.date, 'dd MMMM yyyy', { locale: fr } ) }
                        </TableCell>
                        <TableCell>
              <span className={ `px-2 py-1 rounded-full text-xs font-medium ${ statusColors[ quote.status ] }` }>
                { statusLabels[ quote.status ] }
              </span>
                        </TableCell>
                        <TableCell>
                            { new Intl.NumberFormat( 'fr-FR',
                                                     { style: 'currency', currency: 'EUR' } ).format( quote.amount ) }
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={ () => onEdit( quote ) }>
                                <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={ () => onDelete( quote ) }>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ) ) }
                { quotes.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={ 6 } className="text-center py-8 text-muted-foreground">
                            Aucun devis trouvé
                        </TableCell>
                    </TableRow>
                ) }
            </TableBody>
        </Table>
    );
}