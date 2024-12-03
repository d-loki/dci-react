import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button.tsx';

interface SalesRepInfo {
    name: string;
    email: string;
    phone: string;
    company: string;
}

function SettingsPage() {
    const [ apiKey, setApiKey ]             = React.useState( '' );
    const [ quotesPath, setQuotesPath ]     = React.useState( '' );
    const [ salesRepInfo, ] = React.useState<SalesRepInfo>( {
                                                                                name:    'John Doe',
                                                                                email:   'john.doe@example.com',
                                                                                phone:   '+33 6 12 34 56 78',
                                                                                company: 'ACME Corp',
                                                                            } );

    const handleSaveSettings = () => {
        console.log( 'Saving settings:', { apiKey, quotesPath } );
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Paramètres</h1>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>
                            Configurez vos paramètres d'application
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="apiKey">Clé API</Label>
                            <Input
                                id="apiKey"
                                value={ apiKey }
                                onChange={ ( e ) => setApiKey( e.target.value ) }
                                placeholder="Entrez votre clé API"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quotesPath">Dossier des devis</Label>
                            <Input
                                id="quotesPath"
                                value={ quotesPath }
                                onChange={ ( e ) => setQuotesPath( e.target.value ) }
                                placeholder="Chemin vers le dossier des devis"
                            />
                        </div>
                        <div className="space-y-2">
                            <Button
                                variant="default"
                                onClick={ handleSaveSettings }
                            >
                                Enregistrer
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mes informations</CardTitle>
                        <CardDescription>
                            Informations depuis l'ERP
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground">Nom</Label>
                                    <p className="text-sm font-medium">{ salesRepInfo.name }</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Email</Label>
                                    <p className="text-sm font-medium">{ salesRepInfo.email }</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground">Téléphone</Label>
                                    <p className="text-sm font-medium">{ salesRepInfo.phone }</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default SettingsPage;