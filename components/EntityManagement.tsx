
import React from 'react';
import { MOCK_ENTITIES } from '../constants';
import { EntityFilter, EntityFilterType } from '../types';

interface EntityManagementProps {
    filters: EntityFilter;
    onFilterChange: (entityId: string, filterType: EntityFilterType) => void;
}

const EntityManagement: React.FC<EntityManagementProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Entität</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Aktion</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {MOCK_ENTITIES.map((entity) => (
                        <tr key={entity.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{entity.name}</div>
                                <div className="text-sm text-slate-500">{entity.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <fieldset>
                                    <div className="flex items-center space-x-4">
                                        {(Object.values(EntityFilterType)).map((filterType) => (
                                            <div key={filterType} className="flex items-center">
                                                <input
                                                    id={`${entity.id}-${filterType}`}
                                                    name={`${entity.id}-filter`}
                                                    type="radio"
                                                    checked={(filters[entity.id] || EntityFilterType.DEFAULT) === filterType}
                                                    onChange={() => onFilterChange(entity.id, filterType)}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                                />
                                                <label htmlFor={`${entity.id}-${filterType}`} className="ml-2 block text-sm text-slate-700 capitalize">
                                                    {filterType === 'default' ? 'Standard' : filterType === 'include' ? 'Einschließen' : 'Ausschließen'}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntityManagement;
