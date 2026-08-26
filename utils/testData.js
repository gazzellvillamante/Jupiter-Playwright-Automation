import { faker } from '@faker-js/faker';

/**
 * Generates a realistic, isolated set of Contact form data.
 * Individual fields can be overridden, e.g. to test a specific value
 */

export function generateContactData(overrides = {}) {
  const forename = overrides.forename ?? faker.person.firstName();

  return {
    forename,
    email: overrides.email ?? faker.internet.email({ firstName: forename }),
    message: overrides.message ?? faker.lorem.paragraph(),
  };
}
