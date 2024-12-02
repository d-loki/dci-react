import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface QuotesFiltersProps {
  onFilterChange: (filters: QuotesFilters) => void;
}

export interface QuotesFilters {
  status: string;
  search: string;
}

export function QuotesFilters({ onFilterChange }: QuotesFiltersProps) {
  const [filters, setFilters] = React.useState<QuotesFilters>({
    status: 'all',
    search: '',
  });

  const handleFilterChange = (key: keyof QuotesFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-4">
      <div className="w-[200px]">
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="sent">Envoyé</SelectItem>
            <SelectItem value="accepted">Accepté</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input
        placeholder="Rechercher..."
        className="max-w-[300px]"
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />
    </div>
  );
}