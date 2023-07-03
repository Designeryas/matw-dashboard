import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubscriptionTable = () => {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionsPerPage] = useState(5);

  const fetchSubscriptionData = () => {
    axios
      .get('http://127.0.0.1:8000/subscriptions/data')
      .then(response => {
        setSubscriptionData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchSubscriptionData();
    const interval = setInterval(fetchSubscriptionData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = subscriptionData.slice(indexOfFirstSubscription, indexOfLastSubscription);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
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
          {currentSubscriptions.map((subscription, index) => (
            <tr key={index}>
              <td>{subscription.amount}</td>
              <td>{subscription.counts.daily}</td>
              <td>{subscription.counts.weekly}</td>
              <td>{subscription.counts.monthly}</td>
              <td>{subscription.counts.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(subscriptionData.length / subscriptionsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default SubscriptionTable;
