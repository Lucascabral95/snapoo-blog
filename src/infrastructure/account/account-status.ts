export const ACTIVE_ACCOUNT_FILTER = {
  accountStatus: { $nin: ["suspended", "deactivated"] },
};
