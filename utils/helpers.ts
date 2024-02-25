export const formatDate = (dateUTC: Date | undefined) => {
    if (!dateUTC) return undefined;
    return new Date(dateUTC).toLocaleDateString();
}
