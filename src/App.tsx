import { useEffect, useState } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { getVersion } from '@tauri-apps/api/app';

function App() {
    const [ version, setVersion ] = useState<string | null>( null );
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

        getVersion().then( setVersion );

        performUpdate();
    }, [] );

    return (
        <main className="container">
            <h1>BIENVENUE</h1>
            <p>Version { version }</p>
        </main>
    );
}

export default App;