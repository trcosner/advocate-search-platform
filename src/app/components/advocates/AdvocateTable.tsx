"use client";

import { Advocate } from "../../../types/api";
import DataTable, { TableColumn } from "../shared/table/DataTable";

interface AdvocateTableProps {
  advocates: Advocate[];
  currentSort?: string;
  currentOrder?: 'asc' | 'desc';
  onSort: (field: string) => void;
  loading?: boolean;
  className?: string;
}

export default function AdvocateTable({
  advocates,
  currentSort,
  currentOrder,
  onSort,
  loading = false,
  className = ""
}: AdvocateTableProps) {
  
  const columns: TableColumn<Advocate>[] = [
    {
      key: 'firstName',
      label: 'First Name',
      sortable: true
    },
    {
      key: 'lastName',
      label: 'Last Name',
      sortable: true
    },
    {
      key: 'city',
      label: 'City',
      sortable: true
    },
    {
      key: 'degree',
      label: 'Degree',
      sortable: true
    },
    {
      key: 'specialties',
      label: 'Specialties',
      sortable: false,
      render: (advocate: Advocate) => (
        <div className="space-y-1">
          {advocate.specialties.map((specialty: string, index: number) => (
            <div 
              key={`specialty-${index}`} 
              className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full inline-block mr-1 mb-1"
            >
              {specialty}
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'yearsOfExperience',
      label: 'Experience',
      sortable: true,
      render: (advocate: Advocate) => `${advocate.yearsOfExperience} years`
    },
    {
      key: 'phoneNumber',
      label: 'Phone',
      sortable: false,
      render: (advocate: Advocate) => advocate.phoneNumber.toString()
    }
  ];

  return (
    <DataTable
      data={advocates}
      columns={columns}
      currentSort={currentSort}
      currentOrder={currentOrder}
      onSort={onSort}
      loading={loading}
      emptyMessage="No advocates found"
      className={className}
      keyExtractor={(advocate, index) => advocate.id || `advocate-${index}`}
    />
  );
}
