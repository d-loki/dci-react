import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileEdit, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Quote } from '@/types/quote';

const statusStyles = {
    draft:    { variant: 'secondary', label: 'Brouillon' },
    sent:     { variant: 'default', label: 'Envoyé' },
    accepted: { variant: 'outline', label: 'Accepté' },
    rejected: { variant: 'destructive', label: 'Rejeté' },
} as const;

export const columns: ColumnDef<Quote>[] = [
    {
        accessorKey: 'reference',
        header:      'Référence',
        cell:        ( { row } ) => <div className="font-medium">{ row.getValue( 'reference' ) }</div>,
    },
    {
        accessorKey: 'clientName',
        header:      'Client',
    },
    {
        accessorKey: 'date',
        header:      'Date',
        cell:        ( { row } ) => {
            const date = row.getValue( 'date' ) as Date;
            return format( date, 'dd MMMM yyyy', { locale: fr } );
        },
    },
    {
        accessorKey: 'status',
        header:      'Statut',
        cell:        ( { row } ) => {
            const status             = row.getValue( 'status' ) as keyof typeof statusStyles;
            const { variant, label } = statusStyles[ status ];
            return <Badge variant={ variant }>{ label }</Badge>;
        },
    },
    {
        accessorKey: 'amount',
        header:      'Montant',
        cell:        ( { row } ) => {
            const amount = row.getValue( 'amount' ) as number;
            return new Intl.NumberFormat( 'fr-FR', {
                style:    'currency',
                currency: 'EUR',
            } ).format( amount );
        },
    },
    {
        id:   'actions',
        cell: ( { row } ) => {
            const quote = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={ () => console.log( 'Edit:', quote ) }>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={ () => console.log( 'Delete:', quote ) }
                                          className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];