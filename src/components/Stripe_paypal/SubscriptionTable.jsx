import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionTable = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);

  const fetchSubscriptionData = () => {
    axios
      .get('/subscriptions/data')
      .then(response => {
        updateTable(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateTable = data => {
    setSubscriptionData(data);
  };

  useEffect(() => {
    fetchSubscriptionData();
    const interval = setInterval(fetchSubscriptionData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array since fetchSubscriptionData doesn't change

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Daily</th>
          <th>Weekly</th>
          <th>Monthly</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {subscriptionData.map((subscription, index) => (
          <tr key={index}>
            <td>{subscription.amount}</td>
            <td>{subscription.counts.daily}</td>
            <td>{subscription.counts.weekly}</td>
            <td>{subscription.counts.monthly}</td>
            <td>{subscription.counts.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubscriptionTable;
