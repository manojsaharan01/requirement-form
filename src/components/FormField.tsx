import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (section: string, name: string, value: any) => void;
  error?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  tooltip?: string;
  required?: boolean;
  section?: string;
  min?: number;
  max?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  options,
  tooltip,
  required = false,
  section = '',
  min,
  max
}) => {
  const handleChange = (e) => {
    const val = type === 'checkbox' 
      ? e.target.checked 
      : type === 'number' 
        ? parseInt(e.target.value, 10) 
        : e.target.value;
    
    onChange(section, name, val);
  };
  
  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange(section, name, selectedOptions);
  };
  
  const handleCheckboxGroupChange = (option) => {
    const newValue = Array.isArray(value) ? [...value] : [];
    
    if (newValue.includes(option)) {
      onChange(section, name, newValue.filter(item => item !== option));
    } else {
      onChange(section, name, [...newValue, option]);
    }
  };
  
  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {tooltip && (
          <Tooltip content={tooltip}>
            <HelpCircle size={16} className="ml-1 text-gray-400 cursor-help" />
          </Tooltip>
        )}
      </div>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          rows={4}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select an option</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'multiselect' ? (
        <select
          id={name}
          name={name}
          value={value || []}
          onChange={handleMultiSelectChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          multiple
          size={Math.min(options?.length || 4, 4)}
        >
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'checkbox-group' ? (
        <div className="mt-2 space-y-2">
          {options?.map(option => (
            <div key={option.value} className="flex items-center">
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="checkbox"
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={() => handleCheckboxGroupChange(option.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : type === 'radio-group' ? (
        <div className="mt-2 space-y-2">
          {options?.map(option => (
            <div key={option.value} className="flex items-center">
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : type === 'range' ? (
        <div className="mt-2">
          <input
            id={name}
            name={name}
            type="range"
            min={min || 1}
            max={max || 5}
            value={value || min || 1}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            error ? 'border-red-300 border' : 'border-gray-300 border'
          }`}
        />
      )}
      
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600">
          <AlertCircle size={16} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;