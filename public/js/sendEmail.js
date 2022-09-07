import axios from 'axios';
import { showAlert } from './alerts';

export const sendEmail = async data => {
  try {
    const url = '/';
    const res = await axios({
      method: 'POST',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Message sent successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
