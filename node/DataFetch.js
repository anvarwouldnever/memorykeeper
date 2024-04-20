
class DataFetch {
    async getCurrent(req, res) {
        try {
            const { lat, lon } = req.query;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7`);
        const data = await response.json();
        const current = data.current.temperature_2m;
        const highestT = data.daily.temperature_2m_max;
        const lowestT = data.daily.temperature_2m_min;
        
        res.json({ current, highestT, lowestT });
        } catch (error) {
            console.log(error)
        }
    };

    async getOne() {

    }
}

export default new DataFetch;