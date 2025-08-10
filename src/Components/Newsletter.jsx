import React, { useState } from 'react';
import newsletter from '../assets/newsletter.png';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Simple email regex validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubscribeClick = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setShowModal(true);
  };

  const handleConfirmSubscription = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://a-11-knowhive-srver.vercel.app/subscribe', { email });

      if (response.status === 200 && response.data.message) {
        setShowModal(false);
        setSuccessMsg(response.data.message); // show backend message
        setEmail('');
        setError('');
      } else {
        setError('Subscription failed, please try again.');
      }
    } catch (error) {
      setError('Subscription failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mx-auto min-w-sm">
      <h1 className="text-4xl text-center mb-5">Newsletter</h1>
      <div className="flex flex-col md:flex-row justify-center items-center rounded-lg shadow-md border mb-5">
        <div className="w-auto h-full md:w-1/2">
          <img src={newsletter} className="w-auto p-4" alt="newsletter" />
        </div>
        <section className="w-full md:w-1/2 my-12 p-6 flex flex-col gap-8 text-center">
          <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
          <p>Get the latest updates and offers right in your inbox.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleSubscribeClick} className="btn btn-primary px-6" disabled={loading}>
              Subscribe
            </button>
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
          {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
                <h3 className="text-xl font-semibold mb-4">Confirm Subscription</h3>
                <p>
                  Subscribe <strong>{email}</strong> to our newsletter?
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleConfirmSubscription} disabled={loading}>
                    {loading ? 'Subscribing...' : 'Confirm'}
                  </button>
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Newsletter;
