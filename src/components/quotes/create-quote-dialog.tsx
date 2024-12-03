import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"
import { FormEvent, useState } from 'react';

export function CreateQuoteDialog() {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
                                                       projectType: "",
                                                       clientName: "",
                                                       disableAllBonuses: false,
                                                       disableCEEBonus: false,
                                                       disableMaPrimeRenov: false,
                                                   })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nouveau devis
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Créer un nouveau dossier</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="projectType">
                                Type de chantier <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.projectType}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, projectType: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un chantier..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="isolation">Isolation</SelectItem>
                                    <SelectItem value="chauffage">Chauffage</SelectItem>
                                    <SelectItem value="renovation">Rénovation</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="clientName">
                                Client <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="clientName"
                                placeholder="Nom Prénom"
                                value={formData.clientName}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, clientName: e.target.value }))
                                }
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="disableAllBonuses"
                                    checked={formData.disableAllBonuses}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            disableAllBonuses: checked as boolean
                                        }))
                                    }
                                />
                                <Label htmlFor="disableAllBonuses">Désactiver les primes</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="disableCEEBonus"
                                    checked={formData.disableCEEBonus}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            disableCEEBonus: checked as boolean
                                        }))
                                    }
                                />
                                <Label htmlFor="disableCEEBonus">Désactiver la prime CEE</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="disableMaPrimeRenov"
                                    checked={formData.disableMaPrimeRenov}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            disableMaPrimeRenov: checked as boolean
                                        }))
                                    }
                                />
                                <Label htmlFor="disableMaPrimeRenov">Désactiver MaPrimeRenov</Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Valider</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}