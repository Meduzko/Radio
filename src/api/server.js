export const server = {
    fetch: async (body) => {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error('Failed to fetch from server');
        }

        return res.json();
    }
};