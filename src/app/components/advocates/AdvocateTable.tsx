"use client";

import { Advocate } from "../../../types";
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
      className: 'w-40 min-w-[10rem]',
      headerClassName: 'w-40 min-w-[10rem]',
      render: (advocate: Advocate) => {
        const formatPhoneNumber = (phone: number): string => {
          const phoneStr = phone.toString();
          return phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        };
        
        const handlePhoneClick = () => {
          alert(`This would call ${advocate.firstName} ${advocate.lastName} at ${formatPhoneNumber(advocate.phoneNumber)}.`);
        };
        
        return (
          <button
            onClick={handlePhoneClick}
            className="text-primary-600 hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded underline cursor-pointer"
            aria-label={`Call ${advocate.firstName} ${advocate.lastName}`}
          >
            {formatPhoneNumber(advocate.phoneNumber)}
          </button>
        );
      }
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
      className={`mr-3 ${className}`}
      keyExtractor={(advocate, index) => advocate.id || `advocate-${index}`}
    />
  );
}
