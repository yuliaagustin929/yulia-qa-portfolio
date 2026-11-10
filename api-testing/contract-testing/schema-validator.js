/**
 * Contract testing utility script using AJV.
 * Demonstrates how QA verifies API responses against OpenAPI / JSON schemas.
 */
const fs = require('fs');
const path = require('path');

try {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);

  const schemaPath = path.join(__dirname, 'user-schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

  const validate = ajv.compile(schema);

  // Sample API Response payload
  const mockApiResponse = {
    name: 'Yulia Agustin',
    job: 'Senior QA Engineer',
    id: '88412',
    createdAt: new Date().toISOString()
  };

  const isValid = validate(mockApiResponse);

  if (isValid) {
    console.log('✅ Contract Validation Passed: API response strictly conforms to schema.');
  } else {
    console.error('❌ Contract Validation Failed:', validate.errors);
    process.exit(1);
  }
} catch (e) {
  console.log('Note: To execute schema validation script, ensure ajv & ajv-formats are installed (npm i ajv ajv-formats).');
}
