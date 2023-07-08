import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import services from 'services';

const SubscriptionsTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionsPerPage] = useState(5);

  useEffect(() => {
    getSubscriptions();
  }, []);

  // const fetchSubscriptions = () => {
  //   axios
  //     .get('http://127.0.0.1:8000/subscriptions') // Replace with the actual route URL for fetching subscriptions
  //     .then(response => {
  //       setSubscriptions(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
  const getSubscriptions = async () => {
    // setIsLoading(true);
    try {
      const response = await services.getSubscriptions();
      console.log('response get getSubscriptions', response);
      setSubscriptions(response.data);
      console.log('response get getMultiProducts', response.data.products);
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
      console.error('error========', error);
    }
  };
  const indexOfLastSubscription = currentPage * subscriptionsPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionsPerPage;
  const currentSubscriptions = subscriptions.slice(indexOfFirstSubscription, indexOfLastSubscription);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
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
          {currentSubscriptions.map((subscription, index) => (
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
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(subscriptions.length / subscriptionsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default SubscriptionsTable;

