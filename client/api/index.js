import axios from 'axios';
import { apiPrefix } from '../../etc/config.json';


export default {
    listPortfolios() {
        return axios.get(`${apiPrefix}/portfolios`);
    },

    createPortfolio(data) {
        return axios.post(`${apiPrefix}/portfolios`, data);
    },

    deletePortfolio(portfolioId) {
    	console.log(portfolioId);
        return axios.delete(`${apiPrefix}/portfolios/${portfolioId}`);
    }
}
