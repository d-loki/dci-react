import { useEffect } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { getVersion } from '@tauri-apps/api/app';
import './App.css';
import { Button } from '@/components/ui/button.tsx';
import { PlusCircle } from 'lucide-react';
import { Quote } from '@/types/quotes.ts';
import { DataTable } from '@/components/quotes/data-table.tsx';
import { columns } from '@/components/quotes/columns.tsx';

// Sample data
const sampleQuotes: Quote[] = [
    {
        id:         '1',
        reference:  'DEV-2024-001',
        clientName: 'Entreprise ABC',
        date:       new Date( '2024-02-15' ),
        status:     'draft',
        amount:     1500.00,
    },
    {
        id:         '2',
        reference:  'DEV-2024-002',
        clientName: 'Société XYZ',
        date:       new Date( '2024-02-20' ),
        status:     'sent',
        amount:     2750.50,
    },
    {
        id:         '3',
        reference:  'DEV-2024-003',
        clientName: 'Company 123',
        date:       new Date( '2024-02-25' ),
        status:     'accepted',
        amount:     4200.75,
    },
    // Add more sample data for pagination
    ...Array.from( { length: 10 }, ( _, i ) => ( {
        id:         `${ i + 4 }`,
        reference:  `DEV-2024-00${ i + 4 }`,
        clientName: `Client ${ i + 4 }`,
        date:       new Date( 2024, 1, i + 1 ),
        status:     [ 'draft', 'sent', 'accepted', 'rejected' ][ Math.floor( Math.random() * 4 ) ] as Quote['status'],
        amount:     Math.random() * 10000,
    } ) ),
];

function App() {
    useEffect( () => {
        const performUpdate = async () => {
            const update = await check();
            if ( update ) {
                console.log(
                    `found update ${ update.version } from ${ update.date } with notes ${ update.body }`,
                );
                let downloaded                        = 0;
                let contentLength: number | undefined = 0;
                // alternatively we could also call update.download() and update.install() separately
                await update.downloadAndInstall( ( event ) => {
                    switch ( event.event ) {
                        case 'Started':
                            contentLength = event.data.contentLength;
                            console.log( `started downloading ${ event.data.contentLength } bytes` );
                            break;
                        case 'Progress':
                            downloaded += event.data.chunkLength;
                            console.log( `downloaded ${ downloaded } from ${ contentLength }` );
                            break;
                        case 'Finished':
                            console.log( 'download finished' );
                            break;
                    }
                } );

                console.log( 'update installed' );
                await relaunch();
            }
        };

        performUpdate();
    }, [] );

    const handleCreateQuote = () => {
        console.log( 'Create new quote' );
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Devis</h1>
                    <Button onClick={ handleCreateQuote }>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nouveau devis
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <DataTable columns={ columns } data={ sampleQuotes } />
                </div>
            </div>
        </div>
    );
}

export default App;