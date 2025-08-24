// 'use client';
// import { Badge } from '@/components/ui/badge';
// import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
// import { Product } from '@/constants/data';
// import { Column, ColumnDef } from '@tanstack/react-table';
// import {
//   // CheckCircle2,
//   Text
//   //  XCircle
// } from 'lucide-react';
// // import Image from 'next/image';
// import { CellAction } from './cell-action';
// // import { CATEGORY_OPTIONS } from './options';

// export const columns: ColumnDef<Product>[] = [
//   {
//     accessorKey: 'photo_url',
//     header: 'IMAGE',
//     cell: ({ row }) => {
//       return (
//         <div className='relative aspect-square'>
//           <Image
//             src={row.getValue('photo_url')}
//             alt={row.getValue('name')}
//             fill
//             className='rounded-lg'
//           />
//         </div>
//       );
//     }
//   },
//   {
//     id: 'name',
//     accessorKey: 'name',
//     header: ({ column }: { column: Column<Product, unknown> }) => (
//       <DataTableColumnHeader column={column} title='Name' />
//     ),
//     cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
//     meta: {
//       label: 'Name',
//       placeholder: 'Search clients...',
//       variant: 'text',
//       icon: Text
//     },
//     enableColumnFilter: true
//   },
//   {
//     id: 'category',
//     accessorKey: 'category',
//     header: ({ column }: { column: Column<Product, unknown> }) => (
//       <DataTableColumnHeader column={column} title='Category' />
//     ),
//     cell: ({ cell }) => {
//       const status = cell.getValue<Product['category']>();
//       const Icon = status === 'active' ? CheckCircle2 : XCircle;

//       return (
//         <Badge variant='outline' className='capitalize'>
//           <Icon />
//           {status}
//         </Badge>
//       );
//     },
//     enableColumnFilter: false,
//     meta: {
//       label: 'categories',
//       variant: 'multiSelect',
//       options: CATEGORY_OPTIONS
//     }
//   },
//   {
//     accessorKey: 'price',
//     header: 'PRICE'
//   },
//   {
//     accessorKey: 'description',
//     header: 'DESCRIPTION'
//   },

//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
// ];

'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text, CheckCircle2, Clock3, XCircle, HelpCircle } from 'lucide-react';
import { CellAction } from './cell-action';

/** Map status -> icon + color + normalized label */
function getStatusMeta(raw: unknown) {
  const s = String(raw ?? '')
    .trim()
    .toLowerCase();
  switch (s) {
    case 'active':
      return { Icon: CheckCircle2, color: 'text-green-600', label: 'Active' };
    case 'pending':
    case 'in progress':
      return { Icon: Clock3, color: 'text-yellow-600', label: 'Pending' };
    case 'inactive':
    case 'blocked':
      return { Icon: XCircle, color: 'text-red-600', label: 'Inactive' };
    default:
      return {
        Icon: HelpCircle,
        color: 'text-muted-foreground',
        label: raw ? String(raw) : 'Unknown'
      };
  }
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'surname',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Surname' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Product['surname']>()}</div>,
    meta: {
      label: 'Surname',
      placeholder: 'Search by surname...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'forenames',
    header: 'Forenames',
    cell: ({ cell }) => <div>{cell.getValue<Product['forenames']>()}</div>
  },
  {
    accessorKey: 'date_of_birth',
    header: 'Date of Birth',
    cell: ({ cell }) => (
      <div>
        {new Date(
          cell.getValue<Product['date_of_birth']>()
        ).toLocaleDateString()}
      </div>
    )
  },
  {
    accessorKey: 'client_status',
    header: 'Status',
    cell: ({ cell }) => {
      const raw = cell.getValue<Product['client_status']>();
      const { Icon, color, label } = getStatusMeta(raw);

      return (
        <Badge
          variant='outline'
          className='inline-flex items-center gap-2 capitalize'
        >
          <Icon className={`h-4 w-4 ${color}`} aria-hidden />
          <span>{label}</span>
        </Badge>
      );
    }
  },
  {
    accessorKey: 'adviser_name',
    header: 'Adviser',
    cell: ({ cell }) => <div>{cell.getValue<Product['adviser_name']>()}</div>
  },
  {
    accessorKey: 'fact_find_completed_date',
    header: 'Fact Find Date',
    cell: ({ cell }) => (
      <div>
        {new Date(
          cell.getValue<Product['fact_find_completed_date']>()
        ).toLocaleDateString()}
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
