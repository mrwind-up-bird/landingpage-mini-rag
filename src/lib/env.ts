function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  airtable: {
    apiKey: () => required("AIRTABLE_API_KEY"),
    baseId: () => required("AIRTABLE_BASE_ID"),
    tableName: () => process.env.AIRTABLE_TABLE_NAME ?? "Leads",
  },
};
