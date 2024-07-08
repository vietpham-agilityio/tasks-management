/**
 * Generates a slug based on the given prefix and a random ID.
 *
 * @param {string} prefix - The prefix to be used for generating the slug.
 * @returns {string} - The generated slug in the format 'prefix-randomId'.
 */

export const generateSlug = (prefix: string): string => {
  const slugId = crypto.getRandomValues(new Uint32Array(1))[0];
  const slug = `${prefix.replace(/\s+/g, '-').toLowerCase()}-${slugId}`;
  return slug;
};
