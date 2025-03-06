import React from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { DataCategory } from '../types';

interface DataCardProps {
  title: string;
  category: DataCategory;
  data: any[];
  meta: Array<{ name: string; type: string }>;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCellClick: (column: string, value: string) => void;
  selectedFilter: { column: string; value: string } | null;
  isLoading: boolean;
  error: string | null;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  category,
  data,
  meta,
  page,
  totalPages,
  onPageChange,
  onCellClick,
  selectedFilter,
  isLoading,
  error,
}) => {
  // Only show the card if:
  // 1. It's loading
  // 2. It has data and no error
  // 3. It has the column we're filtering on (if we're filtering) and no error
  const shouldShow = isLoading || 
    (data.length > 0 && !error) || 
    (selectedFilter && meta.some(m => m.name === selectedFilter.column) && !error);

  if (!shouldShow) return null;

  const columns = meta.map(m => m.name);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className={`px-6 py-4 ${
        selectedFilter 
          ? 'bg-gradient-to-r from-purple-600 to-purple-800'
          : 'bg-gradient-to-r from-blue-600 to-blue-800'
      }`}>
        <h3 className="text-xl font-semibold text-white flex items-center">
          {title}
          {selectedFilter && (
            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">Filtered</span>
          )}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((column) => {
                    const value = row[column]?.toString() || '-';
                    const isFilterable = ['_id', 'id'].some(suffix => column.endsWith(suffix));
                    return (
                      <td 
                        key={column} 
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isFilterable 
                            ? 'text-blue-600 hover:text-blue-800 cursor-pointer' 
                            : 'text-gray-500'
                        }`}
                        onClick={() => {
                          if (isFilterable && value !== '-') {
                            onCellClick(column, value);
                          }
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default DataCard;