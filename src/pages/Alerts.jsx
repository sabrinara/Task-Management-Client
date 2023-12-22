// Alerts.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerts = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
};

export default Alerts;
