import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout( { children }: { children: React.ReactNode } ) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main>
                    <div className="min-h-screen bg-background p-8">
                        <div className="container mx-auto">
                            { children }
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
