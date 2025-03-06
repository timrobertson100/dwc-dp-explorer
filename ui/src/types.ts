export interface Event {
  event_id?: string;
  parent_event_id?: string;
  preferred_event_name?: string;
  event_type?: string;
  event_type_iri?: string;
  event_type_vocabulary?: string;
  dataset_name?: string;
  dataset_id?: string;
  field_number?: string;
  event_conducted_by?: string;
  event_conducted_by_id?: string;
  event_date?: string;
  event_time?: string;
  start_day_of_year?: string;
  end_day_of_year?: string;
  year?: string;
  month?: string;
  day?: string;
  verbatim_event_date?: string;
  verbatim_locality?: string;
  verbatim_elevation?: string;
  verbatim_depth?: string;
  verbatim_coordinates?: string;
  verbatim_latitude?: string;
  verbatim_longitude?: string;
  verbatim_coordinate_system?: string;
  verbatim_srs?: string;
  georeference_verification_status?: string;
  habitat?: string;
  sample_size_value?: string;
  sample_size_unit?: string;
  event_effort?: string;
  field_notes?: string;
  event_citation?: string;
  event_remarks?: string;
  location_id?: string;
  higher_geography?: string;
  higher_geography_id?: string;
  continent?: string;
  water_body?: string;
  island_group?: string;
  island?: string;
  country?: string;
  country_code?: string;
  state_province?: string;
  county?: string;
  municipality?: string;
  locality?: string;
  minimum_elevation_in_meters?: string;
  maximum_elevation_in_meters?: string;
  vertical_datum?: string;
  minimum_depth_in_meters?: string;
  maximum_depth_in_meters?: string;
  minimum_distance_above_surface_in_meters?: string;
  maximum_distance_above_surface_in_meters?: string;
  location_remarks?: string;
  decimal_latitude?: string;
  decimal_longitude?: string;
  geodetic_datum?: string;
  coordinate_uncertainty_in_meters?: string;
  coordinate_precision?: string;
  point_radius_spatial_fit?: string;
  footprint_wkt?: string;
  footprint_srs?: string;
  footprint_spatial_fit?: string;
  georeferenced_by?: string;
  georeferenced_by_id?: string;
  georeferenced_date?: string;
  georeference_protocol?: string;
  georeference_protocol_id?: string;
  georeference_sources?: string;
  georeference_remarks?: string;
  information_withheld?: string;
  data_generalizations?: string;
  preferred_spatial_representation?: string;
}

export interface EventAssertion {
  assertion_id?: string;
  event_id?: string;
  assertion_type?: string;
  assertion_type_iri?: string;
  assertion_type_vocabulary?: string;
  assertion_made_date?: string;
  assertion_effective_date?: string;
  assertion_value?: string;
  assertion_value_iri?: string;
  assertion_value_vocabulary?: string;
  assertion_value_numeric?: string;
  assertion_unit?: string;
  assertion_unit_iri?: string;
  assertion_unit_vocabulary?: string;
  assertion_by?: string;
  assertion_by_id?: string;
  assertion_protocol?: string;
  assertion_protocol_id?: string;
  assertion_citation?: string;
  assertion_remarks?: string;
}

export interface GeneticSequence {
  genetic_sequence_id?: string;
  event_id?: string;
  derived_from_material_entity_id?: string;
  genetic_sequence_type?: string;
  genetic_sequence_type_iri?: string;
  genetic_sequence_type_vocabulary?: string;
  genetic_sequence?: string;
  genetic_sequence_citation?: string;
  genetic_sequence_remarks?: string;
}

export interface Identification {
  identification_id?: string;
  identification_based_on_occurrence_id?: string;
  identification_based_on_material_entity_id?: string;
  identification_based_on_genetic_sequence_id?: string;
  identification_based_on_media_id?: string;
  identification_type?: string;
  identification_type_iri?: string;
  identification_type_vocabulary?: string;
  verbatim_identification?: string;
  is_accepted_identification?: string;
  taxon_formula?: string;
  type_status?: string;
  type_designation_type?: string;
  identified_by?: string;
  identified_by_id?: string;
  date_identified?: string;
  identification_references?: string;
  identification_verification_status?: string;
  identification_verification_status_iri?: string;
  identificationverificationstatusvocabulary?: string;
  identification_remarks?: string;
  taxon_id?: string;
  kingdom?: string;
  scientific_name?: string;
  taxon_rank?: string;
  taxon_remarks?: string;
}

export interface Material {
  material_entity_id?: string;
  event_id?: string;
  material_category?: string;
  material_entity_type?: string;
  material_entity_type_iri?: string;
  material_entity_type_vocabulary?: string;
  institution_code?: string;
  institution_id?: string;
  owner_institution_code?: string;
  owner_institution_id?: string;
  collection_code?: string;
  collection_id?: string;
  catalog_number?: string;
  other_catalog_numbers?: string;
  collected_by?: string;
  collected_by_id?: string;
  record_number?: string;
  preparations?: string;
  disposition?: string;
  verbatim_label?: string;
  associated_sequences?: string;
  material_citation?: string;
  information_withheld?: string;
  data_generalizations?: string;
  material_entity_remarks?: string;
  evidence_for_occurrence_id?: string;
  derived_from_material_entity_id?: string;
  derivation_event_id?: string;
  derivation_type?: string;
  derivation_type_iri?: string;
  derivation_type_vocabulary?: string;
  part_of_material_entity_id?: string;
  verbatim_identification?: string;
  taxon_formula?: string;
  identified_by?: string;
  identified_by_id?: string;
  date_identified?: string;
  identification_references?: string;
  identification_verification_status?: string;
  identification_verification_status_iri?: string;
  identificationverificationstatusvocabulary?: string;
  identification_remarks?: string;
  taxon_id?: string;
  kingdom?: string;
  scientific_name?: string;
  taxon_rank?: string;
  taxon_remarks?: string;
}

export interface Occurrence {
  occurrence_id?: string;
  event_id?: string;
  survey_target_id?: string;
  recorded_by?: string;
  recorded_by_id?: string;
  organism_quantity?: string;
  organism_quantity_type?: string;
  organism_quantity_type_iri?: string;
  organism_quantity_type_vocabulary?: string;
  occurrence_remarks?: string;
}

export interface OccurrenceAssertion {
  assertion_id?: string;
  occurrence_id?: string;
  assertion_type?: string;
}

export interface Survey {
  survey_id?: string;
  event_id?: string;
}

export type DataCategory = 
  | 'event'
  | 'event_assertion'
  | 'genetic_sequence'
  | 'identification'
  | 'material'
  | 'occurrence'
  | 'occurrence_assertion'
  | 'survey';

export interface QueryParams {
  category: DataCategory;
  page: number;
  itemsPerPage: number;
  filters?: Record<string, string>;
}

export interface QueryResponse {
  data: any[];
  meta: Array<{
    name: string;
    type: string;
  }>;
  totalRows: number;
}