import { departmentsTable } from '@/db/schema/departments';
import { employeesTable, userStatusEnum } from '@/db/schema/employees';
import {
  jobOpeningStatusEnum,
  jobOpeningsTable,
} from '@/db/schema/job-openings';
import {
  leaveManagementTable,
  leaveRequestStatusEnum,
  leaveTypeEnum,
} from '@/db/schema/leave-management';
import { currencyEnum, payrollTable } from '@/db/schema/payroll';
import { positionsTable } from '@/db/schema/positions';

/**
 * Helper function to stringify enums.
 * Converts an enum object into a readable string format.
 */
function stringifyEnum(enumValues: string[], enumName: string): string {
  const values = enumValues.join(', ');
  return `Enum: ${enumName}\nValues: [ ${values} ]`;
}

/**
 * Function to stringify all schemas and enums.
 * Aggregates all schema definitions and enums into a single string.
 */
export function getSchemaAsString(): string {
  const schemas = [
    { name: 'departmentsTable', schema: departmentsTable },
    { name: 'employeesTable', schema: employeesTable },
    { name: 'jobOpeningsTable', schema: jobOpeningsTable },
    { name: 'leaveManagementTable', schema: leaveManagementTable },
    { name: 'payrollTable', schema: payrollTable },
    { name: 'positionsTable', schema: positionsTable },
  ];

  const enums = [
    { name: 'userStatusEnum', enum: userStatusEnum },
    { name: 'jobOpeningStatusEnum', enum: jobOpeningStatusEnum },
    { name: 'leaveRequestStatusEnum', enum: leaveRequestStatusEnum },
    { name: 'leaveTypeEnum', enum: leaveTypeEnum },
    { name: 'currencyEnum', enum: currencyEnum },
  ];

  const schemaStrings = schemas
    .map(({ name, schema }) => `Schema: ${name}\n${schema.toString()}`)
    .join('\n\n');

  const enumStrings = enums
    .map(({ name, enum: enumObj }) => stringifyEnum(enumObj.enumValues, name))
    .join('\n\n');

  return `${schemaStrings}\n\n${enumStrings}`;
}
