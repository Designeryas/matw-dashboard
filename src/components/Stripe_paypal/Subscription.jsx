import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionsTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
    const interval = setInterval(fetchSubscriptions, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchSubscriptions = () => {
    axios
      .get('/subscriptions') // Replace with the actual route URL for fetching subscriptions
      .then(response => {
        setSubscriptions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <table id="subscriptions-table">
      <thead>
        <tr>
          <th>Database User ID</th>
          <th>Stripe ID</th>
          <th>PayPal ID</th>
          <th>Email</th>
          <th>Subscription Interval</th>
          <th>Number of Payments</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((subscription, index) => (
          <tr key={index}>
            <td>{subscription.user.id}</td>
            <td>{subscription.user.stripe_id}</td>
            <td>{subscription.user.paypal_id}</td>
            <td>{subscription.user.email}</td>
            <td>{subscription.subscription_interval}</td>
            <td>{subscription.num_payments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubscriptionsTable;
