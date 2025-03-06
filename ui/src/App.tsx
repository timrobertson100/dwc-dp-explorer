import React, { useState, useEffect } from 'react';
import { Database, Dna, FileSpreadsheet, Leaf, Microscope, Mountain, ScrollText, Table } from 'lucide-react';
import DataCard from './components/DataCard';
import type { DataCategory, QueryResponse } from './types';
import { fetchData } from './api';

const ITEMS_PER_PAGE = 10;

const categoryIcons = {
  event: <Mountain className="w-6 h-6" />,
  event_assertion: <ScrollText className="w-6 h-6" />,
  genetic_sequence: <Dna className="w-6 h-6" />,
  identification: <Microscope className="w-6 h-6" />,
  material: <Database className="w-6 h-6" />,
  occurrence: <Leaf className="w-6 h-6" />,
  occurrence_assertion: <Table className="w-6 h-6" />,
  survey: <FileSpreadsheet className="w-6 h-6" />,
};

function App() {
  const [activeCategory, setActiveCategory] = useState<DataCategory>('event');
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<{ column: string; value: string } | null>(null);
  const [categoryData, setCategoryData] = useState<Record<DataCategory, QueryResponse>>({
    event: { data: [], meta: [], totalRows: 0 },
    event_assertion: { data: [], meta: [], totalRows: 0 },
    genetic_sequence: { data: [], meta: [], totalRows: 0 },
    identification: { data: [], meta: [], totalRows: 0 },
    material: { data: [], meta: [], totalRows: 0 },
    occurrence: { data: [], meta: [], totalRows: 0 },
    occurrence_assertion: { data: [], meta: [], totalRows: 0 },
    survey: { data: [], meta: [], totalRows: 0 }
  });
  const [loading, setLoading] = useState<Record<DataCategory, boolean>>({
    event: false,
    event_assertion: false,
    genetic_sequence: false,
    identification: false,
    material: false,
    occurrence: false,
    occurrence_assertion: false,
    survey: false
  });
  const [errors, setErrors] = useState<Record<DataCategory, string | null>>({
    event: null,
    event_assertion: null,
    genetic_sequence: null,
    identification: null,
    material: null,
    occurrence: null,
    occurrence_assertion: null,
    survey: null
  });

  const categories = Object.keys(categoryIcons) as DataCategory[];

  useEffect(() => {
    const loadData = async () => {
      // Reset errors when starting a new fetch
      setErrors({
        event: null,
        event_assertion: null,
        genetic_sequence: null,
        identification: null,
        material: null,
        occurrence: null,
        occurrence_assertion: null,
        survey: null
      });

      const filters: Record<string, string> = {};
      if (selectedFilter) {
        filters[selectedFilter.column] = selectedFilter.value;
      }

      const promises = categories.map(async (category) => {
        setLoading(prev => ({ ...prev, [category]: true }));
        try {
          const response = await fetchData({
            category,
            page,
            itemsPerPage: ITEMS_PER_PAGE,
            filters
          });
          setCategoryData(prev => ({ ...prev, [category]: response }));
        } catch (err) {
          setErrors(prev => ({
            ...prev,
            [category]: err instanceof Error ? err.message : 'An error occurred while fetching data'
          }));
          // Clear the data for this category since the fetch failed
          setCategoryData(prev => ({
            ...prev,
            [category]: { data: [], meta: [], totalRows: 0 }
          }));
        } finally {
          setLoading(prev => ({ ...prev, [category]: false }));
        }
      });

      await Promise.all(promises);
    };

    loadData();
  }, [page, selectedFilter]);

  const handleCellClick = (column: string, value: string) => {
    if (selectedFilter?.column === column && selectedFilter.value === value) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter({ column, value });
      setPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dwc DP Explorer</h1>
          {selectedFilter && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500">
                Filtering by {selectedFilter.column.replace(/_/g, ' ')}:{' '}
                <span className="font-medium">{selectedFilter.value}</span>
              </span>
              <button
                onClick={() => setSelectedFilter(null)}
                className="ml-2 text-sm text-red-600 hover:text-red-800"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

        <div className="space-y-6">
          {categories.map((category) => (
            <DataCard
              key={category}
              title={category.replace(/_/g, ' ')}
              category={category}
              data={categoryData[category].data}
              meta={categoryData[category].meta}
              page={page}
              totalPages={Math.ceil(categoryData[category].totalRows / ITEMS_PER_PAGE)}
              onPageChange={setPage}
              onCellClick={handleCellClick}
              selectedFilter={selectedFilter}
              isLoading={loading[category]}
              error={errors[category]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;