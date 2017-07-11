import axios from 'axios';
import { apiPrefix } from '../../etc/config.json';


export default {
  listPortfolios() {
    return axios.get(`${apiPrefix}/portfolios`);
  },

  createPortfolio(data) {
    return axios.post(`${apiPrefix}/portfolios`, data);
  },

  updatePortfolio(portfolio) {
    return axios.post(`${apiPrefix}/portfolios/${portfolio.id}`, { portfolio });
  },

  deletePortfolio(portfolioId) {
    return axios.delete(`${apiPrefix}/portfolios/${portfolioId}`);
  },
};
