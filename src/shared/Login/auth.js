const url = 'https://aspnet-mongo.azurewebsites.net/auth/login';

export async function login(email, password) {
    const data = {
        "email": email,
        "password": password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Manually parse the JSON response
        
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
