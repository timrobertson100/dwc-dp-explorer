import type { DataCategory } from './types';

const mockEvents = [
  {
    event_id: "e1",
    parent_event_id: "",
    preferred_event_name: "Spring Survey 2024",
    event_type: "Survey",
    event_date: "2024-03-15"
  },
  {
    event_id: "e2",
    parent_event_id: "e1",
    preferred_event_name: "Forest Plot A",
    event_type: "Sampling",
    event_date: "2024-03-15"
  }
];

const mockEventAssertions = [
  {
    assertion_id: "ea1",
    event_id: "e1",
    assertion_type: "Weather",
    assertion_value: "Sunny"
  },
  {
    assertion_id: "ea2",
    event_id: "e2",
    assertion_type: "Habitat",
    assertion_value: "Dense forest"
  }
];

const mockGeneticSequences = [
  {
    genetic_sequence_id: "gs1",
    event_id: "e2",
    derived_from_material_entity_id: "m1",
    genetic_sequence_type: "DNA barcode"
  },
  {
    genetic_sequence_id: "gs2",
    event_id: "e2",
    derived_from_material_entity_id: "m2",
    genetic_sequence_type: "RNA sequence"
  }
];

const mockIdentifications = [
  {
    identification_id: "i1",
    identification_based_on_occurrence_id: "o1",
    identification_type: "Morphological",
    verbatim_identification: "Quercus robur"
  },
  {
    identification_id: "i2",
    identification_based_on_material_entity_id: "m1",
    identification_type: "DNA-based",
    verbatim_identification: "Picea abies"
  }
];

const mockMaterials = [
  {
    material_entity_id: "m1",
    event_id: "e2",
    material_category: "Tissue",
    material_entity_type: "Leaf sample"
  },
  {
    material_entity_id: "m2",
    event_id: "e2",
    material_category: "Specimen",
    material_entity_type: "Whole plant"
  }
];

const mockOccurrences = [
  {
    occurrence_id: "o1",
    event_id: "e2",
    recorded_by: "John Smith",
    organism_quantity: "1",
    organism_quantity_type: "Individual count"
  },
  {
    occurrence_id: "o2",
    event_id: "e2",
    recorded_by: "Jane Doe",
    organism_quantity: "5",
    organism_quantity_type: "Individual count"
  }
];

const mockOccurrenceAssertions = [
  {
    assertion_id: "oa1",
    occurrence_id: "o1",
    assertion_type: "Life stage",
    assertion_value: "Adult"
  },
  {
    assertion_id: "oa2",
    occurrence_id: "o2",
    assertion_type: "Behavior",
    assertion_value: "Feeding"
  }
];

const mockSurveys = [
  {
    survey_id: "s1",
    event_id: "e1",
    site_count: 3,
    site_nesting_description: "Nested plots"
  },
  {
    survey_id: "s2",
    event_id: "e2",
    site_count: 1,
    site_nesting_description: "Single plot"
  }
];

export const mockData: Record<DataCategory, any[]> = {
  event: mockEvents,
  event_assertion: mockEventAssertions,
  genetic_sequence: mockGeneticSequences,
  identification: mockIdentifications,
  material: mockMaterials,
  occurrence: mockOccurrences,
  occurrence_assertion: mockOccurrenceAssertions,
  survey: mockSurveys
};

export const getRelatedIds = (category: DataCategory, row: any): Record<DataCategory, string[]> => {
  const relatedIds: Record<DataCategory, string[]> = {
    event: [],
    event_assertion: [],
    genetic_sequence: [],
    identification: [],
    material: [],
    occurrence: [],
    occurrence_assertion: [],
    survey: []
  };

  // Helper function to add IDs if they exist
  const addId = (category: DataCategory, id: string | undefined) => {
    if (id) relatedIds[category].push(id);
  };

  // Extract related IDs based on the category
  switch (category) {
    case 'event':
      addId('event', row.event_id);
      addId('event', row.parent_event_id);
      break;
    case 'event_assertion':
      addId('event', row.event_id);
      break;
    case 'genetic_sequence':
      addId('event', row.event_id);
      addId('material', row.derived_from_material_entity_id);
      break;
    case 'identification':
      addId('occurrence', row.identification_based_on_occurrence_id);
      addId('material', row.identification_based_on_material_entity_id);
      break;
    case 'material':
      addId('event', row.event_id);
      addId('occurrence', row.evidence_for_occurrence_id);
      addId('material', row.derived_from_material_entity_id);
      break;
    case 'occurrence':
      addId('event', row.event_id);
      break;
    case 'occurrence_assertion':
      addId('occurrence', row.occurrence_id);
      break;
    case 'survey':
      addId('event', row.event_id);
      break;
  }

  return relatedIds;
};

export const filterDataByRelatedIds = (
  category: DataCategory,
  data: any[],
  relatedIds: Record<DataCategory, string[]>
): any[] => {
  if (!relatedIds[category].length) return data;

  return data.filter(row => {
    switch (category) {
      case 'event':
        return relatedIds.event.includes(row.event_id) || 
               relatedIds.event.includes(row.parent_event_id);
      case 'event_assertion':
        return relatedIds.event.includes(row.event_id);
      case 'genetic_sequence':
        return relatedIds.event.includes(row.event_id) || 
               relatedIds.material.includes(row.derived_from_material_entity_id);
      case 'identification':
        return relatedIds.occurrence.includes(row.identification_based_on_occurrence_id) || 
               relatedIds.material.includes(row.identification_based_on_material_entity_id);
      case 'material':
        return relatedIds.event.includes(row.event_id) || 
               relatedIds.material.includes(row.material_entity_id) ||
               relatedIds.material.includes(row.derived_from_material_entity_id);
      case 'occurrence':
        return relatedIds.event.includes(row.event_id);
      case 'occurrence_assertion':
        return relatedIds.occurrence.includes(row.occurrence_id);
      case 'survey':
        return relatedIds.event.includes(row.event_id);
      default:
        return true;
    }
  });
};